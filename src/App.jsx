import { useEffect, useState } from 'react';
import { AuthProvider } from './context/AuthContext.jsx';
import ChatBox from './components/ChatBox.jsx';
import MessageList from './components/MessageList.jsx';
import SearchBar from './components/SearchBar.jsx';
import DarkModeToggle from './components/DarkModeToggle.jsx';
import TagFilter from './components/TagFilter.jsx';
import Toast from './components/Toast.jsx';
import { MemoryAPI } from './api/client.js';
import NamePrompt from './components/NamePrompt.jsx';
import ChatThread from './components/ChatThread.jsx';
import { ChatAPI } from './api/client.js';
import Sidebar from './components/Sidebar.jsx';
import RecentList from './components/RecentList.jsx';
import SessionList from './components/SessionList.jsx';
function sortedByPin(items, pinnedMap) {
  if (!items) return [];
  const copy = [...items];
  copy.sort((a, b) => {
    const ap = pinnedMap[a.id] ? 1 : 0;
    const bp = pinnedMap[b.id] ? 1 : 0;
    if (bp !== ap) return bp - ap; // pinned first
    const at = new Date(a.createdAt).getTime();
    const bt = new Date(b.createdAt).getTime();
    return bt - at; // newest first within group
  });
  return copy;
}
import SettingsModal from './components/SettingsModal.jsx';

function AppShell() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [toast, setToast] = useState({ message: '', type: 'info' });
  const [name, setName] = useState('');
  const [chat, setChat] = useState([]);
  const [sessions, setSessions] = useState(()=>loadSessions());
  const [activeSessionId, setActiveSessionId] = useState(()=>sessions[0]?.id || createNewSessionId());
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [pinnedIds, setPinnedIds] = useState({});

  useEffect(() => {
    const fetchInitial = async () => {
      setLoading(true);
      try {
        const [list, tagList] = await Promise.all([
          MemoryAPI.search(''),
          MemoryAPI.tags(),
        ]);
        setMessages(list || []);
        setTags(tagList || []);
      } catch (e) {
        setToast({ message: 'Failed to load memories', type: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchInitial();
  }, []);

  const handleAdd = async (content, tags) => {
    const created = await MemoryAPI.add({ content, tags });
    setMessages((m) => [created, ...m]);
    const tagList = await MemoryAPI.tags();
    setTags(tagList || []);
    setToast({ message: 'Saved', type: 'success' });
    // send to assistant as well
    setChat((c) => [...c, { role: 'user', content }]);
    try {
      const resp = await ChatAPI.respond(content);
      setChat((c) => {
        const next = [...c, resp];
        saveActiveSession(next);
        return next;
      });
    } catch (_e) {
      setToast({ message: 'Assistant unavailable', type: 'error' });
    }
    if (!currentSession()?.title && content) updateSessionTitle(content);
  };

  const handleSearch = async (q) => {
    setQuery(q);
    const res = await MemoryAPI.search(q);
    setMessages(res || []);
  };

  const handleSelectTag = async (tag) => {
    setSelectedTag(tag);
    setQuery(tag ? tag : '');
    const res = await MemoryAPI.search(tag || '');
    setMessages(res || []);
  };

  const handleEdit = async (id, payload) => {
    const updated = await MemoryAPI.update(id, payload);
    setMessages((list) => list.map((m) => (m.id === id ? updated : m)));
    const tagList = await MemoryAPI.tags();
    setTags(tagList || []);
    setToast({ message: 'Updated', type: 'success' });
  };

  const handleDelete = async (id) => {
    await MemoryAPI.remove(id);
    setMessages((list) => list.filter((m) => m.id !== id));
    const tagList = await MemoryAPI.tags();
    setTags(tagList || []);
    setToast({ message: 'Deleted', type: 'success' });
  };

  const togglePin = (id) => {
    setPinnedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  function createNewSessionId() {
    return `s-${Date.now()}-${Math.random().toString(36).slice(2,6)}`;
  }

  function loadSessions() {
    try { return JSON.parse(localStorage.getItem('mv-sessions') || '[]'); } catch { return []; }
  }

  function saveSessions(list) {
    localStorage.setItem('mv-sessions', JSON.stringify(list));
  }

  function currentSession() {
    return sessions.find((s) => s.id === activeSessionId);
  }

  function saveActiveSession(nextMessages) {
    setSessions((prev) => {
      const title = (currentSession()?.title) || '';
      const updated = prev.filter((s) => s.id !== activeSessionId).concat([{ id: activeSessionId, title, messages: nextMessages }]);
      saveSessions(updated);
      return updated;
    });
  }

  function updateSessionTitle(firstUserText) {
    setSessions((prev) => {
      const s = prev.find((x) => x.id === activeSessionId);
      const title = (firstUserText || '').slice(0, 40) || 'New Chat';
      const updated = prev.filter((x) => x.id !== activeSessionId).concat([{ id: activeSessionId, title, messages: s?.messages || [] }]);
      saveSessions(updated);
      return updated;
    });
  }

  function persistCurrentSession() {
    saveActiveSession(chat);
  }

  const isEmptyChat = chat.length === 0;

  return (
    <div className="min-h-screen relative text-gray-100 bg-gray-950">
      {!name && <NamePrompt onSave={setName} />}
      <header className="sticky top-0 z-10">
        <div className="mv-glass mv-shadow border border-white/20 dark:border-white/10">
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="font-semibold text-lg tracking-wide">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-500">MindVault</span>
              {name ? ` · Hey ${name}!` : ''}
            </div>
            <div className="flex items-center gap-3">
              <button onClick={async ()=>{ await MemoryAPI.clearAll(); setMessages([]); setChat([]); setTags([]); setSelectedTag(''); setQuery(''); setToast({message:'Cleared', type:'success'}); }}
                className="px-3 py-1.5 rounded-xl border border-white/20 dark:border-white/10 mv-glass mv-shadow hover:opacity-95">Clear Page</button>
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-[18rem_1fr] gap-6">
        <Sidebar
          name={name}
          onNewChat={() => { persistCurrentSession(); setActiveSessionId(createNewSessionId()); setChat([]); }}
          search={query}
          onSearch={handleSearch}
          tagsNode={<TagFilter tags={tags} selected={selectedTag} onSelect={handleSelectTag} />}
          recentNode={<SessionList sessions={sessions} activeId={activeSessionId} onOpen={(id)=>{ persistCurrentSession(); setActiveSessionId(id); setChat(sessions.find(s=>s.id===id)?.messages || []); }} />}
          onOpenSettings={() => setSettingsOpen(true)}
        />
        <main className="min-h-[calc(100vh-120px)] flex flex-col">
          {isEmptyChat ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full max-w-2xl space-y-6 text-center">
                <div className="text-3xl font-semibold">🧠 MindVault</div>
                <div className="opacity-80">Capture a thought to get started.</div>
                <ChatBox onSubmit={handleAdd} />
              </div>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <SearchBar query={query} onSearch={handleSearch} />
              </div>
              <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                <ChatThread messages={chat} />
              </div>
              <div className="sticky bottom-4 mt-4">
                <div className="max-w-3xl mx-auto">
                  <ChatBox onSubmit={handleAdd} />
                </div>
              </div>
            </>
          )}
        </main>
      </div>
      <SettingsModal
        open={settingsOpen}
        name={name}
        onClose={() => setSettingsOpen(false)}
        onSaveName={setName}
        onToggleTheme={() => document.documentElement.classList.toggle('dark')}
      />
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'info' })} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  );
}


