import { EBrowser } from '../../stores/ui';

/** Версия, ниже которой браузер считается deprecated */
const allowedVersion = 36;

export function detectFF(userAgent: string): EBrowser {
  const ffMatch = userAgent.match(/firefox\/([\d.]*)/i);
  const hasSeaMonkey = Boolean(userAgent.match(/seamonkey/i));

  switch (true) {
    case Boolean(ffMatch) && !hasSeaMonkey && Number(ffMatch![1]) >= allowedVersion:
      return EBrowser.firefox;
    case Boolean(ffMatch) && !hasSeaMonkey && Number(ffMatch![1]) < allowedVersion:
      return EBrowser.deprecated;
    default:
      return EBrowser.unknown;
  }
}
