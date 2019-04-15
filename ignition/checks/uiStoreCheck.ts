import { NextContext } from 'next';
import { ICheck } from '../../core/ignition';
import { pathOr } from 'ramda';
import { provide } from '../../core/provider';
import { UiStore } from '../../stores/ui';

interface IDerivedData {
  userAgent: string;
}

@provide(UiStoreCheck)
export class UiStoreCheck implements ICheck {
  public constructor(private uiStore: UiStore) {}

  public clientSide(derivedData: IDerivedData): void {
    this.uiStore.setIsIE(Boolean(derivedData.userAgent.match('Trident')));
  }

  public async serverSide({ req }: NextContext): Promise<IDerivedData> {
    const userAgent = pathOr('', ['headers', 'user-agent'], req) as string;

    if (userAgent) {
      this.uiStore.setIsIE(Boolean(userAgent.match(/trident|msie/ig)));
    }

    return { userAgent };
  }
}
