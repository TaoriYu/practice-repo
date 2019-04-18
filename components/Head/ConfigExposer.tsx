import * as React from 'react';
import { AppConfigurationService } from '../../config';
import { useStore } from '../../core/provider/StoreContext';

export function ConfigExposer() {
  const conf = useStore<AppConfigurationService>(AppConfigurationService).publicRuntimeConfig;
  const cfgScript = `window.__CONFIGURATION__ = JSON.parse('${JSON.stringify(conf)}')`;

  return (
    <script dangerouslySetInnerHTML={{ __html: cfgScript }} />
  );
}
