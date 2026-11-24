import '@fontsource-variable/hanken-grotesk';
import '@fontsource/instrument-serif/400-italic.css';
import '@fontsource/instrument-serif/400.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import './styles/base.css';
import './styles/landing.css';
import './styles/sheets.css';
import { initLang } from './i18n';
import { initSheets } from './sheets';

initLang();
initSheets();
void import('./landing').then(m => m.startLanding()).catch(err => {
  console.error(err);
  document.getElementById('veil')?.classList.add('gone');
  document.body.classList.add('no-webgl');
});
