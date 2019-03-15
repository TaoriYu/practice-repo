/* tslint:disable:file-name-casing */
import * as React from 'react';
import 'reflect-metadata';
import '../components/uiKit/Less/notImportedGlobals.less';
import DevTools from 'mobx-react-devtools';
import App, { Container, NextAppContext } from 'next/app';
import { log, enableLogger } from '../core/logger';
import { Ignition } from '../ignition';

enableLogger();
const logger = log('App');

export interface IAppProps {
  pageProps: any;
  preventRender: boolean;
  statusCode: number;
}

// tslint:disable-next-line:no-default-export
export default class CustomApp extends App<IAppProps> {

  public static async getInitialProps({ Component, ctx }: NextAppContext) {
    let pageProps = {};
    // тут и далее, если res нет - мы на клиенте
    const statusCode = ctx.res ? ctx.res.statusCode : 200;
    const componentName
      = Component.displayName
      || Component.name
      || Component.prototype.constructor.name;

    logger.info(
      'incoming request for pathname: %s\n' +
      'as path: %s\n' +
      'with query: %O\n' +
      'for component: %s',
      ctx.pathname, ctx.asPath, ctx.query, componentName,
    );

    if (ctx.pathname === '/_error') {
      return { pageProps, statusCode };
    }

    try {
      pageProps = await new Ignition(ctx).turnOn();
    } catch (e) {
      log('Ignition').error(
        'Ошибка во время исполнения Ignition checks', e,
      );
      const errorCode = ctx.res ? ctx.res.statusCode : 500;

      return { pageProps, statusCode: errorCode, preventRender: true };
    }

    if (Component.getInitialProps) {
      const componentDerived = await Component.getInitialProps(ctx);
      pageProps = Object.assign({}, pageProps, componentDerived);
    }

    return { pageProps, statusCode: ctx.res ? ctx.res.statusCode : 200 };
  }

  public constructor(props: any) {
    super(props);
    if (!process.env.IS_SERVER && !props.preventRender) {
      new Ignition().bind(props.pageProps);
    }
  }

  public render() {
    const { Component, pageProps, preventRender, statusCode } = this.props;

    if (preventRender) {
      logger.error(`Request is finished with error ${statusCode} 💥`);
    }

    const result = (
      <Container>
        {process.env.NODE_ENV === 'development' && <DevTools />}
        <Component {...pageProps} statusCode={statusCode} />
      </Container>
    );
    logger.info('Request is successfully finished 🎆');

    return result;
  }
}
