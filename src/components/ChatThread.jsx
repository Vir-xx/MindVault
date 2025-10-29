import { motion, AnimatePresence } from 'framer-motion';
import MarkdownText from './MarkdownText.jsx';

export default function ChatThread({ messages }) {
  if (!messages?.length) return null;
  return (
    <div className="mv-glass mv-shadow rounded-2xl border border-white/20 dark:border-white/10 p-4 space-y-3">
      <AnimatePresence initial={false}>
        {messages.map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }}>
            <Bubble role={m.role} content={m.content} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function Bubble({ role, content }) {
  const isAssistant = role === 'assistant';
  return (
    <div className={`flex items-end gap-2 ${isAssistant ? '' : 'justify-end'}`}>
      {isAssistant && <Avatar label="MV" />}
      <div className={`${isAssistant ? 'bg-white/70 dark:bg-gray-900/50 text-gray-900 dark:text-gray-100' : 'bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-500 text-white'} max-w-[80%] rounded-2xl px-4 py-2 mv-shadow`}> 
        {isAssistant ? <MarkdownText text={content} /> : content}
      </div>
      {!isAssistant && <Avatar label="You" />}
    </div>
  );
}

function Avatar({ label }) {
  return (
    <div className="w-8 h-8 rounded-full mv-glass mv-shadow border border-white/20 dark:border-white/10 flex items-center justify-center text-xs">
      {label}
    </div>
  );
}


