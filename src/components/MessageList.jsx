import { useState } from 'react';

export default function MessageList({ items, loading, onEdit, onDelete }) {
  if (loading) {
    return (
    <div className="mv-glass mv-shadow rounded-2xl border border-white/20 dark:border-white/10 p-4 text-sm text-gray-800 dark:text-gray-200">Loading...</div>
    );
  }

  if (!items?.length) {
    return (
    <div className="mv-glass mv-shadow rounded-2xl border border-white/20 dark:border-white/10 p-4 text-sm text-gray-800 dark:text-gray-200">No memories yet.</div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((m) => (
        <Card key={m.id} item={m} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}

function Card({ item, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(item.content);
  const [tagsRaw, setTagsRaw] = useState((item.tags || []).join(', '));

  const save = () => {
    const tags = tagsRaw.split(',').map((t) => t.trim()).filter(Boolean);
    onEdit(item.id, { content, tags });
    setIsEditing(false);
  };

  return (
    <div className="mv-glass mv-shadow rounded-2xl border border-white/20 dark:border-white/10 p-4">
      {isEditing ? (
        <div className="space-y-2">
          <textarea className="w-full resize-none rounded-xl border border-transparent bg-white/70 dark:bg-gray-900/50 p-3" rows={3} value={content} onChange={(e) => setContent(e.target.value)} />
          <input className="w-full rounded-xl border border-transparent bg-white/70 dark:bg-gray-900/50 p-2" value={tagsRaw} onChange={(e) => setTagsRaw(e.target.value)} />
          <div className="flex gap-2">
            <button onClick={save} className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-500 text-white">Save</button>
            <button onClick={() => setIsEditing(false)} className="px-3 py-1.5 rounded-xl border border-white/20 dark:border-white/10">Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <div className="whitespace-pre-wrap leading-relaxed group relative">
            {item.content}
            <div className="opacity-0 group-hover:opacity-100 transition absolute -right-1 -top-2 flex gap-1">
              <button onClick={() => setIsEditing(true)} className="px-2 py-1 rounded-lg border border-white/20 dark:border-white/10">✏️</button>
              <button onClick={() => onDelete(item.id)} className="px-2 py-1 rounded-lg border border-white/20 dark:border-white/10">🗑️</button>
              <button title="Pin (client-side)" className="px-2 py-1 rounded-lg border border-white/20 dark:border-white/10">📌</button>
            </div>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {(item.tags || []).map((t, idx) => (
              <span key={idx} className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-indigo-500/20 to-fuchsia-500/20 text-gray-700 dark:text-gray-200 border border-white/20 dark:border-white/10">#{t}</span>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
            <span>{new Date(item.createdAt).toLocaleString()}</span>
            <div className="flex gap-2">
              <button onClick={() => setIsEditing(true)} className="px-2 py-1 rounded-xl border border-white/20 dark:border-white/10">Edit</button>
              <button onClick={() => onDelete(item.id)} className="px-2 py-1 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 text-white">Delete</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}


