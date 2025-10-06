import { Settings, Message } from '../types';

async function callBackend(apiBase: string, path: string, method = "GET", body: any = null) {
  if (!apiBase) throw new Error("API Base URL is not configured.");

  const resp = await fetch(`${apiBase}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!resp.ok) throw new Error(`Backend error: ${await resp.text()}`);
  
  const text = await resp.text();
  // Handle cases where the response body is empty but content-type is json
  return text ? JSON.parse(text) : {};
}

export const listThreads = async (settings: Settings) => callBackend(settings.apiBase, "/threads", "GET");
export const createThread = async (settings: Settings) => callBackend(settings.apiBase, "/threads", "POST");
export const fetchMessagesForThread = async (threadId: string, settings: Settings) => callBackend(settings.apiBase, `/threads/${threadId}/messages`);
export const sendMessage = async (threadId: string, message: Message, settings: Settings) =>
  callBackend(settings.apiBase, `/threads/${threadId}/messages`, "POST", { role: message.role, content: message.content });
export const deleteThread = async (threadId: string, settings: Settings) => callBackend(settings.apiBase, `/threads/${threadId}`, "DELETE");
export const runAgent = async (threadId: string, settings: Settings) => callBackend(settings.apiBase, `/threads/${threadId}/run`, "POST");
export const getRunStatus = async (threadId: string, runId: string, settings: Settings) =>
  callBackend(settings.apiBase, `/threads/${threadId}/run/${runId}`);
