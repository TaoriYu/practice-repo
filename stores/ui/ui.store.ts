import { action, computed, observable } from 'mobx';
import { makeStore } from '../../core/provider';

export enum EBrowser {
  chrome = 'chrome',
  opera = 'opera',
  firefox = 'firefox',
  safari = 'safari',
  ie = 'ie',
  edge = 'edge',
  unknown = 'unknown',
  deprecated = 'deprecated',
}

@makeStore(UiStore)
export class UiStore {
  @observable public browser: EBrowser = EBrowser.unknown;

  @action
  public setBrowser(browserType: EBrowser) {
    this.browser = browserType;
  }

  @computed
  public get browserDetected() {
    return this.browser !== EBrowser.unknown;
  }
}
