import { EBrowser } from '../../stores/ui';

/** Версия, ниже которой браузер считается deprecated */
const allowedVersion = 40;

export function detectChrome(userAgent: string): EBrowser {
  const chrome = userAgent.match(/chrome\/(\d+\.\d+)/i);
  const hasChromium = Boolean(userAgent.match(/chromium/i));

  switch (true) {
    case Boolean(chrome) && !hasChromium && Number(chrome![1]) >= allowedVersion:
      return EBrowser.chrome;
    case Boolean(chrome) && !hasChromium && Number(chrome![1]) < allowedVersion:
      return EBrowser.deprecated;
    default:
      return EBrowser.unknown;
  }
}
