// Minimal markdown renderer (bold, italic, code, links, lists)
export default function MarkdownText({ text }) {
  const html = renderMarkdown(text || '');
  return <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: html }} />;
}

function escapeHtml(str) {
  return str.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

function renderMarkdown(src) {
  const lines = src.split(/\r?\n/);
  const out = [];
  let inList = false;
  for (const line of lines) {
    if (/^\s*-\s+/.test(line)) {
      if (!inList) { out.push('<ul>'); inList = true; }
      out.push('<li>' + inline(line.replace(/^\s*-\s+/, '')) + '</li>');
    } else {
      if (inList) { out.push('</ul>'); inList = false; }
      out.push('<p>' + inline(line) + '</p>');
    }
  }
  if (inList) out.push('</ul>');
  return out.join('');
}

function inline(t) {
  let s = escapeHtml(t);
  s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/\*(.+?)\*/g, '<em>$1</em>');
  s = s.replace(/`([^`]+?)`/g, '<code>$1</code>');
  s = s.replace(/\[(.+?)\]\((https?:[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1<\/a>');
  return s;
}


