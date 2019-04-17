// tslint:disable:cyclomatic-complexity
import { EBrowser } from '../../stores/ui';

export function detectIE(userAgent: string): EBrowser {
  const hasMSIE = Boolean(userAgent.match(/msie/i));
  const hasTrident = Boolean(userAgent.match(/trident/i));

  switch (true) {
    case hasMSIE && !hasTrident:
    case hasMSIE && hasTrident && window.MSInputMethodContext === undefined:
      return EBrowser.deprecated;
    case !hasMSIE && hasTrident:
    case hasMSIE && hasTrident && window.MSInputMethodContext !== undefined:
      return EBrowser.ie;
    case Boolean(userAgent.match(/(edge)/ig)):
      return EBrowser.edge;
    case !hasMSIE && !hasTrident:
    default:
      return EBrowser.unknown;
  }
}
