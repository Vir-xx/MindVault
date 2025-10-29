import { useState } from 'react';

export default function SearchBar({ query, onSearch }) {
  const [text, setText] = useState(query || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(text);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow p-3 flex items-center gap-2">
      <input
        className="flex-1 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-2"
        placeholder="Search by keyword or tag"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="px-3 py-2 rounded-md bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900">Search</button>
    </form>
  );
}


