/**
 * 反转义
 * @param html
 */
export function unescape(html: string): string {
  return String(html)
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

/**
 * 转义 html
 * @param html
 */
export function escape(html: string): string {
  return String(html)
    .replace(/&/g, '&amp;')
    .replace(/>/g, '&gt;')
    .replace(/</g, '&lt;')
    .replace(/'/g, '&#39;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
