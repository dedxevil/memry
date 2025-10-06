export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: number;
}

export interface Thread {
  id:string; // Local unique ID
  azureThreadId: string; // ID from Foundry API
  title: string;
  messages: Message[];
  createdAt: number;
}

export interface Settings {
  apiBase: string;
}
