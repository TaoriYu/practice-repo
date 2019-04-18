import { NextContext } from 'next';
import { pathOr } from 'ramda';
import { ICheck } from '../../core/ignition';
import { provide } from '../../core/provider';
import { UiStore } from '../../stores/ui';
import { detectBrowser } from '../../utils/userAgent';

@provide(UiStoreCheck)
export class UiStoreCheck implements ICheck {
  public constructor(private uiStore: UiStore) {}

  public clientSide(): void {
    const userAgent = window.navigator.userAgent;

    if (userAgent) {
      this.uiStore.setBrowser(detectBrowser(userAgent));
    }
  }

  public async serverSide({ req }: NextContext): Promise<{}> {
    const userAgent = pathOr('', ['headers', 'user-agent'], req) as string;

    if (userAgent) {
      this.uiStore.setBrowser(detectBrowser(userAgent));
    }

    return {};
  }
}
