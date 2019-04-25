import * as React from 'react';
import { IConfigFields } from '../../config';
import { TCompiledConfigFields } from '../../core/config';

interface IConfigExposerProps {
  config: TCompiledConfigFields<IConfigFields>;
}

export function ConfigExposer({ config }: IConfigExposerProps) {
  const cfgScript = `window.__CONFIGURATION__ = JSON.parse('${JSON.stringify(config)}')`;

  return (
    <script dangerouslySetInnerHTML={{ __html: cfgScript }} />
  );
}
