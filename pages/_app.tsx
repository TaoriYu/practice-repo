/* tslint:disable:file-name-casing */
import 'reflect-metadata';
import 'core-js/features/symbol';
import * as React from 'react';
import DevTools from 'mobx-react-devtools';
import App, { Container, NextAppContext } from 'next/app';
import { log, enableLogger } from '../core/logger';
import { IgnitionFactory } from '../ignition';

enableLogger();
const logger = log('App');

export interface IAppProps {
  pageProps: any;
  preventRender: boolean;
  statusCode: number;
}

// tslint:disable-next-line:no-default-export
export default class CustomApp extends App<IAppProps> {

  public static async getInitialProps(appContext: NextAppContext) {
    const { Component, ctx } = appContext;

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
      pageProps = await IgnitionFactory(appContext).derive();
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
    const { router, Component, pageProps, preventRender } = props;
    if (!process.env.IS_SERVER && !preventRender) {
      // ctx: router - от контекста нам нужны pathname, asPath, query - которые есть в роутере.
      const contextLike = { ctx: router, Component, router };
      IgnitionFactory(contextLike).bind(pageProps);
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
