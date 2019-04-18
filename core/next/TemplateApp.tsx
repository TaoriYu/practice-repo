import { RouterProps } from 'next-server/router';
import * as React from 'react';
// @ts-ignore
import { createUrl } from 'next/dist/pages/_app';
import { Container as DiContainer } from 'inversify';
import DevTools from 'mobx-react-devtools';
import App, { Container, NextAppContext } from 'next/app';
import { IgnitionFactory } from '../../ignition';
import { createStoreContainer } from '../provider/createStoreContainer';
import { Provider } from '../provider/StoreContext';
import { getInitialProps } from './getInitialProps';
import { templateLogger } from './templateLogger';

export interface IAppProps {
  pageProps: any;
  statusCode: number;
  container: DiContainer;
}

export class TemplateApp extends App<IAppProps> {
  protected appContext: DiContainer;
  protected logger = templateLogger;

  public static async getInitialProps(appContext: NextAppContext): Promise<IAppProps> {
    return getInitialProps(appContext);
  }

  public constructor(props: any) {
    super(props);
    const { router, Component, pageProps, container } = props;
    if (!process.env.IS_SERVER) {
      // на сервере container создается в getInitialProps()
      this.appContext = createStoreContainer();
      // ctx: router - от контекста нам нужны pathname, asPath, query - которые есть в роутере.
      const contextLike = { ctx: router, Component, router, container: this.appContext! };
      IgnitionFactory(contextLike).bind(pageProps);
    } else {
      this.appContext = container;
    }
  }

  public render() {
    const { statusCode } = this.props;

    if (statusCode > 299) {
      this.logger.error(`Request is finished with error ${statusCode} 💥`);
    }

    const result = this.template();

    this.logger.info('Request is successfully finished 🎆');

    return result;
  }

  protected template() {
    const { Component, pageProps, statusCode, router } = this.props;

    return (
      <Container>
        <Provider value={this.appContext}>
          {process.env.NODE_ENV === 'development' && <DevTools />}
          <Component {...pageProps} statusCode={statusCode} url={this.createUrl(router)} />
        </Provider>
      </Container>
    );
  }

  protected createUrl(router: RouterProps) {
    return createUrl(router);
  }
}
