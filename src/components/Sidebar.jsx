export default function Sidebar({ name, onNewChat, search, onSearch, tagsNode, recentNode, onOpenSettings }) {
  return (
    <aside className="hidden md:flex md:w-64 md:flex-col gap-3 p-3 h-[calc(100vh-56px)] sticky top-14">
      <div className="mv-glass mv-shadow rounded-xl border border-white/20 dark:border-white/10 p-4">
        <div className="text-sm opacity-80 mb-2"> MindVault</div>
        <div className="font-semibold">{name || 'Guest'}</div>
      </div>
      <button onClick={onNewChat} className="mv-glass mv-shadow rounded-xl border border-white/20 dark:border-white/10 p-3 text-left hover:opacity-95 flex items-center gap-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        New Chat
      </button>
      <div className="mv-glass mv-shadow rounded-xl border border-white/20 dark:border-white/10 p-3">
        <input value={search} onChange={(e)=>onSearch(e.target.value)} placeholder="Search your memories..." className="w-full rounded-lg bg-white/70 dark:bg-gray-900/50 p-2"/>
      </div>
      <div className="mv-glass mv-shadow rounded-xl border border-white/20 dark:border-white/10 p-3">
        <div className="font-semibold mb-2">Explore</div>
        <ul className="text-sm space-y-1">
          <li><a className="opacity-80 hover:opacity-100" href="#">Prompts</a></li>
          <li><a className="opacity-80 hover:opacity-100" href="#">Tips</a></li>
        </ul>
      </div>
      <div className="mv-glass mv-shadow rounded-xl border border-white/20 dark:border-white/10 p-3">
        <div className="font-semibold mb-2">Tags</div>
        {tagsNode}
      </div>
      <div className="mv-glass mv-shadow rounded-xl border border-white/20 dark:border-white/10 p-3">
        <div className="font-semibold mb-2">Recent chats</div>
        {recentNode}
      </div>
      <button onClick={onOpenSettings} className="mt-auto mv-glass mv-shadow rounded-xl border border-white/20 dark:border-white/10 p-3 text-left hover:opacity-95 flex items-center gap-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c0 .65.26 1.28.73 1.75.47.47 1.1.73 1.75.73H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
        Settings & Help
      </button>
    </aside>
  );
}


