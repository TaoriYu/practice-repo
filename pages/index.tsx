/* tslint:disable:file-name-casing */
import React, { PureComponent } from 'react';
import { Segment } from 'semantic-ui-react';
import { Head } from '../components/Head';

// tslint:disable-next-line:no-default-export
export default class extends PureComponent {
  public render() {
    return (
      <div>
        <Head title="example page" />
        <Segment>
          It works
        </Segment>
      </div>
    );
  }
}
