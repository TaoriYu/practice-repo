import React, { PureComponent } from 'react';
import { Head } from '../components/Head';
import { Layout } from '../components/Layout';
import { RepoListContainer } from '../components/RepoList';
import { ConfigurationService } from '../config/service/ConfigurationService';
import { container } from '../stores/provider/container';

// tslint:disable-next-line:no-default-export
export default class Some extends PureComponent {
  public static async getInitialProps() {
    await container.get(ConfigurationService).update();

    return {};
  }
  public render() {
    return (
      <Layout>
        <Head title="some page" />
        <RepoListContainer />
      </Layout>
    );
  }
}
