import { en } from './i18n/en';
import { id } from './i18n/id';

export type Lang = 'en' | 'id';
const KEY = 'gs.lang';
const dicts: Record<Lang, Record<string, string>> = { en: { ...en }, id: { ...id } };
const listeners = new Set<(l: Lang) => void>();
let current: Lang = 'en';

/** Saved choice wins; otherwise the browser language list decides (Indonesian locales give ID, everything else EN). */
export function detectLang(): Lang {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === 'en' || saved === 'id') return saved;
  } catch { /* storage blocked */ }
  const list = navigator.languages?.length ? navigator.languages : [navigator.language];
  return list.some(l => /^(id|in)(-|$)/i.test(l ?? '')) ? 'id' : 'en';
}

export const lang = (): Lang => current;

export function t(key: string, vars?: Record<string, string | number>): string {
  let s = dicts[current][key] ?? dicts.en[key] ?? key;
  if (vars) for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, String(v));
  return s;
}

/** Number with the decimal mark of the active language (comma in Indonesian). */
export function num(v: number, digits = 1): string {
  const s = v.toFixed(digits);
  return current === 'id' ? s.replace('.', ',') : s;
}

export function applyDom(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n!); });
  root.querySelectorAll<HTMLElement>('[data-i18n-html]').forEach(el => { el.innerHTML = t(el.dataset.i18nHtml!); });
  root.querySelectorAll<HTMLElement>('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', t(el.dataset.i18nAria!)); });
  root.querySelectorAll<HTMLElement>('[data-i18n-ph]').forEach(el => { (el as HTMLInputElement).placeholder = t(el.dataset.i18nPh!); });
  document.documentElement.lang = current;
  document.querySelectorAll<HTMLButtonElement>('.lang button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === current)));
}

const beforeListeners = new Set<() => void>();
export function onBeforeLang(f: () => void): void { beforeListeners.add(f); }

export function setLang(l: Lang, persist = true): void {
  beforeListeners.forEach(f => f());
  current = l;
  if (persist) { try { localStorage.setItem(KEY, l); } catch { /* ignore */ } }
  applyDom();
  listeners.forEach(f => f(l));
}

export function onLang(f: (l: Lang) => void): void { listeners.add(f); }

export function initLang(): void {
  current = detectLang();
  applyDom();
  document.querySelectorAll<HTMLButtonElement>('.lang button').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang as Lang)));
}
