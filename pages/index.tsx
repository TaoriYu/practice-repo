/* tslint:disable:file-name-casing */
import React, { PureComponent } from 'react';
import { Head } from '../components/Head';
import { IndexPageLayout } from '../components/IndexPageLayout';

// tslint:disable-next-line:no-default-export
export default class extends PureComponent {
  public render() {
    return (
      <main>
        <Head title="example page" />
        <IndexPageLayout />
      </main>
    );
  }
}
