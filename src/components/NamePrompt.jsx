import { useEffect, useState } from 'react';

export default function NamePrompt({ onSave }) {
  const [name, setName] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('mv-user-name');
    if (saved) onSave(saved);
  }, [onSave]);

  const submit = (e) => {
    e.preventDefault();
    const n = name.trim();
    if (!n) return;
    localStorage.setItem('mv-user-name', n);
    onSave(n);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <form onSubmit={submit} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-sm space-y-3">
        <div className="text-lg font-semibold">Welcome to MindVault</div>
        <div className="text-sm text-gray-600 dark:text-gray-300">What should I call you?</div>
        <input autoFocus className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-2" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
        <button className="w-full px-3 py-2 rounded-md bg-indigo-600 text-white">Continue</button>
      </form>
    </div>
  );
}


