import * as React from 'react';
import { ConfigurationService } from '../../config/service/ConfigurationService';
import { injectStore } from '../../stores/provider/InjectStore';

export interface IConfigExposerProps {
  configurationService: ConfigurationService;
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

export const ConfigExposer = injectStore({ configurationService: ConfigurationService })(ConfigExposerComponent);
