import { EBrowser } from '../../stores/ui';

/** Версия, ниже которой браузер считается deprecated */
const allowedVersion = 8;

export function detectSafari(userAgent: string): EBrowser {
  const hasSafari = Boolean(userAgent.match(/safari/i));
  const versionMatch = userAgent.match(/version\/(\d+\.\d+)/i);
  const hasChrome = Boolean(userAgent.match(/chrome/i));
  const hasChromium = Boolean(userAgent.match(/chromium/i));
  const isSafari = hasSafari && !hasChrome && !hasChromium;

  switch (true) {
    case isSafari && versionMatch && Number(versionMatch[1]) >= allowedVersion:
      return EBrowser.safari;
    case isSafari && versionMatch && Number(versionMatch[1]) < allowedVersion:
      return EBrowser.deprecated;
    default:
      return EBrowser.unknown;
  }
}
