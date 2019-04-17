import { EBrowser } from '../../stores/ui';

/** Версия, ниже которой браузер считается deprecated */
const allowedVersion = 27;

export function detectOpera(userAgent: string): EBrowser {
  const currentOpera = userAgent.match(/opr\/(\d+\.\d+)/i); // opera 15+
  const isOldOpera = Boolean(userAgent.match(/opera/i)); // opera 12-

  switch (true) {
    case currentOpera && Number(currentOpera[1]) >= allowedVersion:
      return EBrowser.opera;
    case isOldOpera:
    case currentOpera && Number(currentOpera[1]) < allowedVersion:
      return EBrowser.deprecated;
    default:
      return EBrowser.unknown;
  }
}
