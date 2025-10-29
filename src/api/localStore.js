function getClientKey() {
  const idKey = 'mv-client-id';
  let id = localStorage.getItem(idKey);
  if (!id) {
    id = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(idKey, id);
  }
  return `mv-memories-${id}`;
}

function readAll() {
  const key = getClientKey();
  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch {
    return [];
  }
}

function writeAll(list) {
  const key = getClientKey();
  localStorage.setItem(key, JSON.stringify(list));
}

export const MemoryAPI = {
  add: async ({ content, tags }) => {
    const list = readAll();
    const item = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      content,
      tags: Array.isArray(tags) ? tags : [],
      createdAt: new Date().toISOString(),
    };
    list.unshift(item);
    writeAll(list.slice(0, 500));
    return item;
  },
  search: async (query) => {
    const q = (query || '').toLowerCase();
    const list = readAll();
    if (!q) return list;
    const rx = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    return list.filter((m) => rx.test(m.content) || (m.tags || []).some((t) => rx.test(t)));
  },
  update: async (id, payload) => {
    const list = readAll();
    const idx = list.findIndex((m) => m.id === id);
    if (idx === -1) return null;
    if (typeof payload.content === 'string') list[idx].content = payload.content;
    if (Array.isArray(payload.tags)) list[idx].tags = payload.tags;
    writeAll(list);
    return list[idx];
  },
  remove: async (id) => {
    const list = readAll();
    const next = list.filter((m) => m.id !== id);
    writeAll(next);
    return { ok: true };
  },
  tags: async () => {
    const list = readAll();
    const set = new Set();
    list.forEach((m) => (m.tags || []).forEach((t) => set.add(t)));
    return Array.from(set).sort();
  },
  clearAll: async () => {
    writeAll([]);
    return { ok: true };
  },
};

export const ChatAPI = {
  respond: async (message) => {
    const list = await MemoryAPI.search('');
    const latest = list.slice(0, 5);
    const recentTags = Array.from(new Set(latest.flatMap((m) => m.tags || []))).slice(0, 5);
    const suggestions = recentTags.length ? `I notice your recent tags: ${recentTags.map((t) => `#${t}`).join(' ')}.` : '';
    const q = (message || '').toString().trim();
    let content = '';
    if (!q) {
      content = `Hey! I'm MindVault. Tell me something you'd like to remember, and I'll help you save and find it later.`;
    } else if (/hello|hi|hey/i.test(q)) {
      content = `Hi! What would you like to capture today? ${suggestions}`;
    } else if (/suggest|idea|help/i.test(q)) {
      content = `You could jot down a quick thought, add a couple of tags, and I'll make it easy to find later. ${suggestions}`;
    } else if (/search|find|look up/i.test(q)) {
      content = `Try the search above. You can search by keyword or tag (e.g., type a tag like #work). ${suggestions}`;
    } else {
      const hits = list.filter((m) => (m.content || '').toLowerCase().includes(q.toLowerCase())).slice(0, 3);
      if (hits.length) {
        content = `I found ${hits.length} related note${hits.length > 1 ? 's' : ''}. For example: "${hits[0].content.slice(0, 120)}"${hits[0].content.length > 120 ? '…' : ''}`;
      } else {
        content = `Got it! I've got your back. If it's important, consider saving it as a memory with a tag. ${suggestions}`;
      }
    }
    return { role: 'assistant', content, ts: new Date().toISOString() };
  },
};


