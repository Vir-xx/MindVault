export default function SessionList({ sessions, activeId, onOpen }) {
  if (!sessions?.length) return <div className="text-sm opacity-70">No chats yet</div>;
  return (
    <ul className="space-y-2 max-h-[40vh] overflow-auto pr-1">
      {sessions.map((s) => (
        <li key={s.id}>
          <button onClick={()=>onOpen(s.id)} className={`text-left w-full text-sm px-2 py-1 rounded-lg ${s.id===activeId ? 'bg-white/10' : 'hover:bg-white/5'}`}>
            {s.title || 'New Chat'}
          </button>
        </li>
      ))}
    </ul>
  );
}


