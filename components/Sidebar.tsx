import React from 'react';
import { Thread } from '../types';
import { PlusIcon, CogIcon, TrashIcon, MemryLogo, ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChatBubbleOvalLeftEllipsisIcon } from './icons/Icons';
import { ThemeToggle } from './ThemeToggle';

interface SidebarProps {
  threads: Thread[];
  activeThreadId: string | null;
  onNewThread: () => void;
  onSelectThread: (threadId: string) => void;
  onDeleteThread: (threadId: string) => void;
  onOpenSettings: () => void;
  isOpen: boolean;
  isLoadingThreads: boolean;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const ThreadSkeleton: React.FC<{ isCollapsed: boolean }> = ({ isCollapsed }) => (
    <div className={`p-2 ${isCollapsed ? 'flex justify-center' : ''}`}>
        <div className={`h-8 bg-gray-300 dark:bg-gray-800 rounded-md animate-pulse ${isCollapsed ? 'w-8' : 'w-full'}`}></div>
    </div>
);


export const Sidebar: React.FC<SidebarProps> = ({
  threads,
  activeThreadId,
  onNewThread,
  onSelectThread,
  onDeleteThread,
  onOpenSettings,
  isOpen,
  isLoadingThreads,
  isCollapsed,
  onToggleCollapse
}) => {
  return (
    <aside className={`absolute md:relative z-20 md:z-auto bg-gray-200 dark:bg-gray-950 h-screen flex flex-col transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-64 md:w-72'} ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className={`p-3 border-b border-gray-300 dark:border-gray-800 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
            <div className="flex items-center gap-2">
                <MemryLogo className="w-8 h-8 flex-shrink-0"/>
                <span className={`font-semibold text-lg text-gray-800 dark:text-white ${isCollapsed ? 'hidden' : 'inline'}`}>MEMRY</span>
            </div>
            <button
                onClick={onNewThread}
                className={`p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-800 ${isCollapsed ? 'hidden' : 'inline-flex'}`}
                aria-label="New Chat"
            >
                <PlusIcon className="w-5 h-5" />
            </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-2 space-y-1">
            {isLoadingThreads ? (
                <>
                    <ThreadSkeleton isCollapsed={isCollapsed} />
                    <ThreadSkeleton isCollapsed={isCollapsed} />
                    <ThreadSkeleton isCollapsed={isCollapsed} />
                </>
            ) : (
                threads.map((thread) => (
                    <div key={thread.id} className="group relative">
                        <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); onSelectThread(thread.id); }}
                            className={`flex items-center gap-2 py-2 text-sm font-medium rounded-md truncate ${
                                isCollapsed ? 'justify-center px-2' : 'pl-3 pr-10'
                            } ${
                                activeThreadId === thread.id
                                ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-800'
                            }`}
                            title={isCollapsed ? thread.title : ''}
                        >
                            <ChatBubbleOvalLeftEllipsisIcon className={`w-5 h-5 flex-shrink-0 ${isCollapsed ? 'block' : 'hidden'}`} />
                            <span className={isCollapsed ? 'hidden' : 'block'}>{thread.title}</span>
                        </a>
                        <button
                            onClick={(e) => { e.stopPropagation(); onDeleteThread(thread.id); }}
                            className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-gray-300 dark:hover:bg-gray-700 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity ${isCollapsed ? 'hidden' : 'block'}`}
                            aria-label={`Delete chat ${thread.title}`}
                        >
                            <TrashIcon className="w-4 h-4" />
                        </button>
                    </div>
                ))
            )}
        </nav>
        <div className="p-2 border-t border-gray-300 dark:border-gray-800">
            <div className={`flex items-center ${isCollapsed ? 'flex-col gap-2' : 'justify-between'}`}>
                <button
                    onClick={onOpenSettings}
                    className={`flex items-center gap-2 p-2 text-sm font-medium text-gray-600 dark:text-gray-400 rounded-md hover:bg-gray-300 dark:hover:bg-gray-800 w-full text-left ${isCollapsed ? 'justify-center' : ''}`}
                    aria-label="Settings"
                >
                    <CogIcon className="w-5 h-5 flex-shrink-0" />
                    <span className={isCollapsed ? 'hidden' : 'inline'}>Settings</span>
                </button>
                <div className={`${isCollapsed ? 'w-full flex justify-center' : ''}`}>
                    <ThemeToggle />
                </div>
            </div>
             <button
                onClick={onToggleCollapse}
                className="mt-2 w-full flex items-center gap-2 p-2 text-sm font-medium text-gray-600 dark:text-gray-400 rounded-md hover:bg-gray-300 dark:hover:bg-gray-800"
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
                {isCollapsed ? 
                    <ChevronDoubleRightIcon className="w-5 h-5 mx-auto" /> : 
                    <>
                        <ChevronDoubleLeftIcon className="w-5 h-5" />
                        <span>Collapse</span>
                    </>
                }
            </button>
        </div>
    </aside>
  );
};