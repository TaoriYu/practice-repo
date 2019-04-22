// tslint:disable:no-require-imports
import { EBrowser } from '../../stores/ui';
import { detectIE } from '../userAgent';

export function includePolyfills() {
  if (!process.env.IS_SERVER) {
    if (detectIE(window.navigator.userAgent) === EBrowser.ie) {
      require('intersection-observer');
      require('../../static/vendor/picturefill.js');
    }
  }
}
