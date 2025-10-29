export default function TagFilter({ tags, selected, onSelect }) {
  if (!tags?.length) return null;
  return (
    <div className="mv-glass mv-shadow rounded-2xl border border-white/20 dark:border-white/10 p-3 flex flex-wrap gap-2">
      <button onClick={() => onSelect('')} className={`text-xs px-3 py-1.5 rounded-full border border-white/20 dark:border-white/10 ${!selected ? 'bg-gradient-to-r from-indigo-500 to-emerald-500 text-white' : ''}`}>All</button>
      {tags.map((t) => (
        <button key={t} onClick={() => onSelect(t)} className={`text-xs px-3 py-1.5 rounded-full border border-white/20 dark:border-white/10 ${selected === t ? 'bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white' : ''}`}>#{t}</button>
      ))}
    </div>
  );
}


