import React, { useState, useRef, useEffect } from 'react';
import { Thread } from '../types';
import { ChatMessage } from './ChatMessage';
import { MenuIcon, SendIcon, AlertIcon, MemryLogo } from './icons/Icons';

interface ChatWindowProps {
  activeThread: Thread | null;
  onSendMessage: (threadId: string, content: string) => void;
  onStartNewConversation: (content: string) => void;
  onToggleSidebar: () => void;
  isSending: boolean;
  isLoadingMessages: boolean;
  hasConfig: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  activeThread,
  onSendMessage,
  onStartNewConversation,
  onToggleSidebar,
  isSending,
  isLoadingMessages,
  hasConfig,
}) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeThread?.messages, isLoadingMessages, isSending]);

  useEffect(() => {
    if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSend = () => {
    const trimmedInput = input.trim();
    if (trimmedInput) {
      if (activeThread) {
        onSendMessage(activeThread.id, trimmedInput);
      } else {
        onStartNewConversation(trimmedInput);
      }
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const WelcomeScreen = () => (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
        <MemryLogo className="w-20 h-20 text-gray-400 dark:text-gray-600 mb-4"/>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Welcome to MEMRY</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-md">
            Start a new conversation by typing your message below. Your chats will be saved and can be continued later.
        </p>
    </div>
  );

  const NoConfigScreen = () => (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <AlertIcon className="w-16 h-16 text-yellow-500 mb-4" />
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Configuration Required</h2>
      <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-md">
        Please configure your API Base URL in the settings to start using the application.
      </p>
    </div>
  );
  
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
      <header className="flex items-center p-3 border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white dark:bg-gray-900 z-10">
        <button onClick={onToggleSidebar} className="p-2 mr-2 md:hidden rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
          <MenuIcon className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-semibold truncate text-gray-900 dark:text-white">
          {activeThread ? activeThread.title : 'New Chat'}
        </h2>
      </header>

      <main className="flex-1 overflow-y-auto">
        {!hasConfig ? <NoConfigScreen /> :
         !activeThread ? <WelcomeScreen /> :
         isLoadingMessages ? <LoadingSpinner /> :
         (
          <div>
            {activeThread.messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      <footer className="p-3 md:p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={!hasConfig ? "Please configure settings first" : "Type your message here..."}
            className="w-full pl-4 pr-12 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            rows={1}
            style={{ maxHeight: '200px' }}
            disabled={isSending || !hasConfig}
          />
          <button
            onClick={handleSend}
            disabled={isSending || input.trim() === ''}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
            aria-label="Send message"
          >
            {isSending ? (
                 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
                <SendIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </footer>
    </div>
  );
};