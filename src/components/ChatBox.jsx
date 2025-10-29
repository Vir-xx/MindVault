import { useState } from 'react';

export default function ChatBox({ onSubmit }) {
  const [content, setContent] = useState('');
  const [tagsRaw, setTagsRaw] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    const text = content.trim();
    if (!text) return;
    const tags = tagsRaw.split(',').map((t) => t.trim()).filter(Boolean);
    onSubmit(text, tags);
    setContent('');
    setTagsRaw('');
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  return (
    <form onSubmit={handleSend} className="mv-glass mv-shadow rounded-2xl border border-white/20 dark:border-white/10 p-4 space-y-3">
      <textarea
        className="w-full resize-none rounded-xl border border-transparent bg-white/70 dark:bg-gray-900/50 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        rows={3}
        placeholder="Type a thought..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <div className="flex items-center gap-2">
        <input
          className="flex-1 rounded-xl border border-transparent bg-white/70 dark:bg-gray-900/50 p-2"
          placeholder="tags (comma separated)"
          value={tagsRaw}
          onChange={(e) => setTagsRaw(e.target.value)}
        />
        <button type="button" onClick={() => setTagsRaw((v)=> (v ? v + ', ' : '') + 'pinned')} className="px-3 py-2 rounded-xl border border-white/20 dark:border-white/10">+ Tag</button>
        <button type="submit" className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-500 text-white hover:opacity-90 transition">Save Memory</button>
      </div>
    </form>
  );
}


