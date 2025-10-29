export default function RecentList({ items, onSelect }) {
  if (!items?.length) return <div className="text-sm opacity-70">No notes yet</div>;
  return (
    <ul className="space-y-2 max-h-[40vh] overflow-auto pr-1">
      {items.map((m) => (
        <li key={m.id}>
          <button onClick={()=>onSelect(m.content)} className="text-left w-full text-sm hover:underline line-clamp-2">
            {m.content}
          </button>
        </li>
      ))}
    </ul>
  );
}


