function getClientId() {
  const key = 'mv-client-id';
  let id = localStorage.getItem(key);
  if (!id) {
    id = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(key, id);
  }
  return id;
}

function getUserName() {
  return localStorage.getItem('mv-user-name') || '';
}

// Frontend-only mode: swap real network calls for localStorage-backed APIs
import { MemoryAPI as LocalMemoryAPI, ChatAPI as LocalChatAPI } from './localStore.js';

export const MemoryAPI = LocalMemoryAPI;

export const ChatAPI = LocalChatAPI;


