/* tslint:disable:file-name-casing */
import React, { PureComponent } from 'react';
import { Head } from '../components/Head';
import { Main } from '../components/Main';
import { Other } from '../components/Other/Other';

// tslint:disable-next-line:no-default-export
export default class extends PureComponent {
  public render() {
    return (
      <div>
        <Head title="example page" />
        <div>
          It works
        </div>
        <Main />
        <Other />
      </div>
    );
  }
}
