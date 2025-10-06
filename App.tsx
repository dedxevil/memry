import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ThemeProvider } from './hooks/useTheme';
import { useLocalStorage } from './hooks/useLocalStorage';
import * as agentService from './services/azureAgentService';
import { Thread, Settings, Message } from './types';
import { Sidebar } from './components/Sidebar';
import { ChatWindow } from './components/ChatWindow';
import { SettingsModal } from './components/SettingsModal';

const transformBackendMessage = (backendMsg: any): Message => {
  const contentText = backendMsg.content?.[0]?.type === 'text' 
    ? backendMsg.content[0].text.value 
    : '[Unsupported content type]';
    
  return {
    id: backendMsg.id,
    role: backendMsg.role,
    content: contentText,
    createdAt: backendMsg.created_at * 1000,
  };
};

const App: React.FC = () => {
  const [settings, setSettings] = useLocalStorage<Settings>('memry-settings', {
    apiBase: '',
  });

  const [threads, setThreads] = useState<Thread[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isLoadingThreads, setIsLoadingThreads] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useLocalStorage('sidebar-collapsed', false);

  const hasConfig = useMemo(() => {
    return settings.apiBase && settings.apiBase.trim() !== '';
  }, [settings]);

  useEffect(() => {
    const loadThreads = async () => {
      if (hasConfig) {
        setIsLoadingThreads(true);
        try {
          const result = await agentService.listThreads(settings);
          const loadedThreadsData = result?.data || (Array.isArray(result) ? result : (result?.threads || []));

          if (!Array.isArray(loadedThreadsData)) {
            throw new Error("Unexpected response format when listing threads.");
          }
          
          const sortedThreadsData = loadedThreadsData.sort((a: any, b: any) => a.created_at - b.created_at);
          const dailyCounts: { [key: string]: number } = {};

          const loadedThreads: Thread[] = sortedThreadsData.map((t: any) => {
            const createdAtDate = new Date(t.created_at ? t.created_at * 1000 : Date.now());
            
            const month = createdAtDate.toLocaleString('en-US', { month: 'short' });
            const day = String(createdAtDate.getDate()).padStart(2, '0');
            const year = String(createdAtDate.getFullYear()).slice(-2);
            const dateKey = `${month}_${day}_${year}`;

            const dayDateKey = createdAtDate.toLocaleDateString('en-CA');
            dailyCounts[dayDateKey] = (dailyCounts[dayDateKey] || 0) + 1;
            
            const title = `Chat_${dateKey}_${dailyCounts[dayDateKey]}`;
            
            return {
              id: t.id,
              azureThreadId: t.id,
              title: (t.metadata?.title) || title,
              messages: [], 
              createdAt: createdAtDate.getTime(),
            };
          });
          
          setThreads(loadedThreads.reverse());

          if (loadedThreads.length > 0) {
             const currentActiveThreadExists = loadedThreads.some(t => t.id === activeThreadId);
             if (!currentActiveThreadExists) {
                setActiveThreadId(loadedThreads[0].id); 
             }
          } else {
              setActiveThreadId(null);
          }
        } catch (error) {
          console.error("Failed to load threads:", error);
          alert(`Failed to load threads: ${(error as Error).message}`);
          setThreads([]);
        } finally {
          setIsLoadingThreads(false);
        }
      } else {
        setThreads([]);
        setActiveThreadId(null);
        setIsLoadingThreads(false);
      }
    };
    loadThreads();
  }, [settings, hasConfig]);

  const handleNewThread = useCallback(async () => {
    if (!hasConfig) {
      setIsSettingsOpen(true);
      return;
    }
    setActiveThreadId(null);
    setIsSidebarOpen(false);
  }, [hasConfig]);

  const handleDeleteThread = useCallback(async (threadIdToDelete: string) => {
    const threadToDelete = threads.find(t => t.id === threadIdToDelete);
    if (!threadToDelete) return;
    
    if (window.confirm(`Are you sure you want to delete "${threadToDelete.title}"?`)) {
      try {
        await agentService.deleteThread(threadToDelete.azureThreadId, settings);
        
        const updatedThreads = threads.filter(t => t.id !== threadIdToDelete);
        setThreads(updatedThreads);
        
        if (activeThreadId === threadIdToDelete) {
          setActiveThreadId(updatedThreads.length > 0 ? updatedThreads[0].id : null);
        }
      } catch (error) {
        console.error("Failed to delete thread:", error);
        alert(`Failed to delete thread: ${(error as Error).message}`);
      }
    }
  }, [threads, activeThreadId, settings]);
  
  const handleSelectThread = useCallback(async (threadId: string) => {
    setActiveThreadId(threadId);
    setIsSidebarOpen(false);

    const thread = threads.find(t => t.id === threadId);
    if (thread && thread.messages.length === 0) {
        setIsLoadingMessages(true);
        try {
            const result = await agentService.fetchMessagesForThread(thread.azureThreadId, settings);
            const backendMessages = result?.data || (Array.isArray(result) ? result : []);

            if (!Array.isArray(backendMessages)) {
              throw new Error("Invalid message format received from server.");
            }
            
            const formattedMessages = backendMessages.map(transformBackendMessage).sort((a, b) => a.createdAt - b.createdAt);

            setThreads(prevThreads => prevThreads.map(t => 
                t.id === threadId ? { ...t, messages: formattedMessages } : t
            ));
        } catch (error) {
            console.error("Failed to fetch messages:", error);
            alert(`Error fetching messages: ${(error as Error).message}`);
        } finally {
            setIsLoadingMessages(false);
        }
    }
  }, [threads, settings]);

  const handleSendMessage = useCallback(async (threadId: string, content: string) => {
    const userMessage: Message = {
      id: `msg_user_${Date.now()}`,
      role: 'user',
      content,
      createdAt: Date.now(),
    };

    setThreads(prevThreads =>
      prevThreads.map(t =>
        t.id === threadId
          ? { ...t, messages: [...t.messages, userMessage] }
          : t
      )
    );
    setIsSending(true);
    
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

    try {
      const targetThread = threads.find(t => t.id === threadId);
      if (!targetThread) throw new Error("Target thread not found.");

      await agentService.sendMessage(targetThread.azureThreadId, userMessage, settings);
      const run = await agentService.runAgent(targetThread.azureThreadId, settings);
      
      if (!run || !run.id) throw new Error("Failed to start agent run.");
      
      const pollRunStatus = async (retries = 30): Promise<void> => {
        if (retries <= 0) throw new Error("Run timed out waiting for assistant response.");
        const statusResult = await agentService.getRunStatus(targetThread.azureThreadId, run.id, settings);

        switch (statusResult.status) {
            case 'completed': {
                const messagesResult = await agentService.fetchMessagesForThread(targetThread.azureThreadId, settings);
                const backendMessages = messagesResult?.data || (Array.isArray(messagesResult) ? messagesResult : []);
                if (!Array.isArray(backendMessages)) throw new Error("Invalid message format received after run completion.");
                const formattedMessages = backendMessages.map(transformBackendMessage).sort((a, b) => a.createdAt - b.createdAt);
                setThreads(prevThreads => prevThreads.map(t => t.id === threadId ? { ...t, messages: formattedMessages } : t));
                return;
            }
            case 'queued':
            case 'in_progress':
                await delay(2000);
                return pollRunStatus(retries - 1);
            default:
                throw new Error(`Run failed with status: ${statusResult.status}`);
        }
      };
      await pollRunStatus();
    } catch (error) {
      console.error("Failed to send message and get response:", error);
      alert(`Error: ${(error as Error).message}`);
      setThreads(prevThreads => prevThreads.map(t => t.id === threadId ? { ...t, messages: t.messages.filter(m => m.id !== userMessage.id) } : t));
    } finally {
        setIsSending(false);
    }
  }, [settings, threads]);
  
  const handleStartNewConversation = useCallback(async (content: string) => {
    if (!hasConfig) {
      setIsSettingsOpen(true);
      return;
    }
    setIsSending(true);
    let newThreadId: string | null = null;
    
    try {
        const newThreadData = await agentService.createThread(settings);
        if (!newThreadData || !newThreadData.id) throw new Error("API response for creating a thread was invalid.");
        
        newThreadId = newThreadData.id;
        const createdAt = newThreadData.created_at ? newThreadData.created_at * 1000 : Date.now();
        const today = new Date(createdAt);
        
        const month = today.toLocaleString('en-US', { month: 'short' });
        const day = String(today.getDate()).padStart(2, '0');
        const year = String(today.getFullYear()).slice(-2);
        const dateKey = `${month}_${day}_${year}`;

        const threadsFromToday = threads.filter(t => {
            const threadDate = new Date(t.createdAt);
            return threadDate.getFullYear() === today.getFullYear() &&
                   threadDate.getMonth() === today.getMonth() &&
                   threadDate.getDate() === today.getDate();
        });

        const newTitle = `Chat_${dateKey}_${threadsFromToday.length + 1}`;

        const newThread: Thread = {
          id: newThreadData.id, 
          azureThreadId: newThreadData.id, 
          title: newTitle, 
          messages: [], 
          createdAt: createdAt,
        };

        setThreads(prevThreads => [newThread, ...prevThreads]);
        setActiveThreadId(newThread.id);
        
        await handleSendMessage(newThread.id, content);

    } catch (error) {
        console.error("Failed to start new conversation:", error);
        alert(`Error: ${(error as Error).message}`);
        if (newThreadId) {
            setThreads(prev => prev.filter(t => t.id !== newThreadId));
            const remainingThreads = threads.filter(t => t.id !== newThreadId);
            setActiveThreadId(remainingThreads.length > 0 ? remainingThreads[0].id : null);
        }
    } finally {
        setIsSending(false);
    }
  }, [hasConfig, settings, threads, handleSendMessage]);

  const handleSaveSettings = (newSettings: Settings) => {
    setSettings(newSettings);
  };

  const activeThread = useMemo(() => {
    return threads.find(t => t.id === activeThreadId) || null;
  }, [threads, activeThreadId]);

  return (
    <div className="flex h-screen overflow-hidden text-gray-800 dark:text-gray-200">
      <Sidebar
        threads={threads}
        activeThreadId={activeThreadId}
        onNewThread={handleNewThread}
        onSelectThread={handleSelectThread}
        onDeleteThread={handleDeleteThread}
        onOpenSettings={() => setIsSettingsOpen(true)}
        isOpen={isSidebarOpen}
        isLoadingThreads={isLoadingThreads}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(prev => !prev)}
      />
      <div className="flex-1 flex flex-col relative">
        {isSidebarOpen && <div onClick={() => setIsSidebarOpen(false)} className="absolute inset-0 bg-black bg-opacity-50 z-10 md:hidden"></div>}
        <ChatWindow
          activeThread={activeThread}
          onSendMessage={handleSendMessage}
          onStartNewConversation={handleStartNewConversation}
          onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
          isSending={isSending}
          isLoadingMessages={isLoadingMessages}
          hasConfig={hasConfig}
        />
      </div>
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSave={handleSaveSettings}
        currentSettings={settings}
      />
    </div>
  );
};

const AppWrapper = () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);

export default AppWrapper;