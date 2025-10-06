import React from 'react';
import { Message } from '../types';
import { UserIcon, BotIcon } from './icons/Icons';

interface ChatMessageProps {
  message: Message;
}

const renderInlineFormatting = (text: string) => {
    const parts = text.split(/(\*\*.+?\*\*)/g).filter(Boolean);
    return (
        <>
            {parts.map((part, index) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={index}>{part.slice(2, -2)}</strong>;
                }
                return part;
            })}
        </>
    );
};

// Helper to format keys from camelCase/snake_case to Title Case
const formatKey = (key: string): string => {
  const result = key.replace(/([A-Z])/g, " $1").replace(/_/g, " ");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

const JsonViewer: React.FC<{ data: any }> = ({ data }) => {
  if (data === null || typeof data !== 'object') {
    return <p>{String(data)}</p>;
  }

  if (Array.isArray(data)) {
    if (data.length === 0) {
      return <p className="italic text-gray-500">(Empty list)</p>;
    }
    return (
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="border-t border-gray-200 dark:border-gray-700 pt-3 first:border-t-0 first:pt-0">
            {typeof item === 'object' && item !== null ? <JsonViewer data={item} /> : <p>{String(item)}</p>}
          </div>
        ))}
      </div>
    );
  }
  
  if (Object.keys(data).length === 0) {
    return <p className="italic text-gray-500">(Empty object)</p>;
  }

  return (
    <div className="space-y-3">
      {Object.entries(data).map(([key, value]) => (
        <div key={key}>
          <p className="font-bold text-gray-900 dark:text-gray-100">{formatKey(key)}</p>
          <div className="pl-3">
            {value === null ? (
              <p className="italic text-gray-500">Not provided</p>
            ) : typeof value === 'object' ? (
              <div className="mt-1 border-l-2 border-gray-300 dark:border-gray-600 pl-3">
                <JsonViewer data={value} />
              </div>
            ) : (
              <p className="text-gray-700 dark:text-gray-300">{String(value)}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const renderFormattedContent = (content: string) => {
    const trimmedContent = content.trim();
    if ((trimmedContent.startsWith('{') && trimmedContent.endsWith('}')) || (trimmedContent.startsWith('[') && trimmedContent.endsWith(']'))) {
        try {
            const jsonObj = JSON.parse(content);
            return (
                <div className="bg-gray-100 dark:bg-gray-900/50 p-4 rounded-lg my-2 text-sm">
                    <JsonViewer data={jsonObj} />
                </div>
            );
        } catch (e) {
            // It looked like JSON but wasn't valid. Fall through to normal markdown rendering.
        }
    }

    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let listItems: React.ReactNode[] = [];

    const flushList = () => {
        if (listItems.length > 0) {
            elements.push(<ul key={`ul-${elements.length}`} className="list-disc list-inside space-y-1 my-2">{listItems}</ul>);
            listItems = [];
        }
    };

    lines.forEach((line, index) => {
        const key = `line-${index}`;
        
        if (line.trim().startsWith('* ')) {
            const listItemContent = line.trim().substring(2);
            listItems.push(<li key={key}>{renderInlineFormatting(listItemContent)}</li>);
            return;
        }

        flushList();
        
        if (line.startsWith('### ')) {
            elements.push(<h3 key={key} className="text-lg font-semibold mt-4 mb-2">{renderInlineFormatting(line.substring(4))}</h3>);
            return;
        }
        
        if (line.trim() !== '') {
            elements.push(<p key={key} className="my-1">{renderInlineFormatting(line)}</p>);
        }
    });

    flushList();

    return <>{elements}</>;
};

const formatTimestamp = (timestamp: number) => {
  return new Date(timestamp).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
};

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex items-start gap-4 p-4 md:p-6 animate-slideInFade ${isUser ? '' : 'bg-gray-50 dark:bg-gray-800/50'}`}>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'bg-blue-500' : 'bg-gray-600'}`}>
            {isUser ? <UserIcon className="w-5 h-5 text-white" /> : <BotIcon className="w-5 h-5 text-white" />}
        </div>
        <div className="flex-1 space-y-1">
            <div className="flex items-baseline gap-2">
                <p className="font-semibold text-gray-900 dark:text-white">{isUser ? 'You' : 'MEMRY Assistant'}</p>
                <time className="text-xs text-gray-500 dark:text-gray-400">
                    {formatTimestamp(message.createdAt)}
                </time>
            </div>
            <div className="prose prose-sm max-w-full dark:prose-invert text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {renderFormattedContent(message.content)}
            </div>
        </div>
    </div>
  );
};