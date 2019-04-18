import { EBrowser } from '../../stores/ui';
import { detectChrome } from './detectChrome';
import { detectFF } from './detectFF';
import { detectIE } from './detectIE';
import { detectOpera } from './detectOpera';
import { detectSafari } from './detectSafari';

export function detectBrowser(userAgent: string): EBrowser {
  const isIE = Boolean(userAgent.match(/msie|trident|edge/i));
  const isFF = Boolean(userAgent.match(/firefox/i));
  const isChrome = Boolean(userAgent.match(/chrome/i));
  const isSafari = Boolean(userAgent.match(/safari/i));
  const isOpera = Boolean(userAgent.match(/opera|opr/i));

  switch (true) {
    case isIE: return detectIE(userAgent);
    case isFF: return detectFF(userAgent);
    case isOpera: return detectOpera(userAgent);
    case isChrome: return detectChrome(userAgent);
    case isSafari: return detectSafari(userAgent);
    default: return EBrowser.unknown;
  }
}
