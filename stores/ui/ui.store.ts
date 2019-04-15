import { action, observable } from 'mobx';
import { makeStore } from '../../core/provider';

@makeStore(UiStore)
export class UiStore {
  @observable public isIE: boolean = false;

  @action
  public setIsIE(isIE: boolean) {
    this.isIE = isIE;
  }
}
