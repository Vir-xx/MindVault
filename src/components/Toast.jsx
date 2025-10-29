export default function Toast({ message, type = 'info', onClose }) {
  if (!message) return null;
  const color = type === 'error' ? 'from-rose-500 to-orange-500' : type === 'success' ? 'from-emerald-500 to-teal-500' : 'from-gray-800 to-gray-700';
  return (
    <div className={`fixed bottom-4 right-4 bg-gradient-to-r ${color} text-white px-4 py-2 rounded-lg shadow-lg`}
      role="status"
      onClick={onClose}
    >
      {message}
    </div>
  );
}


