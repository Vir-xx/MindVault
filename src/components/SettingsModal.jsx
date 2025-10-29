export default function SettingsModal({ open, name, onClose, onSaveName, onToggleTheme }) {
  if (!open) return null;
  let local = name || '';
  const save = (e) => {
    e.preventDefault();
    const input = e.currentTarget.querySelector('input');
    const n = input.value.trim();
    if (n) {
      localStorage.setItem('mv-user-name', n);
      onSaveName(n);
    }
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
      <form onSubmit={save} className="mv-glass mv-shadow rounded-2xl border border-white/20 dark:border-white/10 p-6 w-full max-w-sm space-y-4">
        <div className="text-lg font-semibold">Settings</div>
        <div>
          <label className="text-sm opacity-80">Display name</label>
          <input defaultValue={local} className="w-full mt-1 rounded-lg bg-white/70 dark:bg-gray-900/50 p-2" />
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm">Theme</div>
          <button type="button" onClick={onToggleTheme} className="px-3 py-1.5 rounded-lg border border-white/20 dark:border-white/10">Toggle Dark/Light</button>
        </div>
        <div className="flex gap-2 justify-end">
          <button type="button" onClick={onClose} className="px-3 py-1.5 rounded-lg border border-white/20 dark:border-white/10">Cancel</button>
          <button className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white">Save</button>
        </div>
      </form>
    </div>
  );
}


