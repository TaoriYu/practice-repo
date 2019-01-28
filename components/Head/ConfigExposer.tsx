import * as React from 'react';
import { AppConfigurationService } from '../../config';
import { injectStore } from '../../core/provider';

export interface IConfigExposerProps {
  configurationService: AppConfigurationService;
}

class ConfigExposerComponent extends React.PureComponent<IConfigExposerProps> {
  public render() {
    const conf = this.props.configurationService.publicRuntimeConfig;
    const cfgScript = `window.__CONFIGURATION__ = JSON.parse('${JSON.stringify(conf)}')`;

    return (
      <script dangerouslySetInnerHTML={{__html: cfgScript}} />
    );
  }
}

export const ConfigExposer =
  injectStore({ configurationService: AppConfigurationService })(ConfigExposerComponent);
