import { AppConfigurationService } from '../../config';
import { RuntimeSettings } from '../../core/config';
import { provide } from '../../core/provider';
import { container } from '../../core/provider/container';
import { ICheck } from '../interfaces';

@provide(RuntimeSettingsCheck)
export class RuntimeSettingsCheck implements ICheck {
  public clientSide(): void {
    //
  }

  public async serverSide(): Promise<object> {
    const runtimeSettings = container.get(RuntimeSettings);
    runtimeSettings.service = container.get(AppConfigurationService);
    if (!runtimeSettings.isRuntimeEnabled) {
      await runtimeSettings.enableRuntime();
    }

    return { runtimeEnabled: runtimeSettings.isRuntimeEnabled };
  }

}
