import 'reflect-metadata';
import * as React from 'react';
import App, { Container } from 'next/app';
import { enableRuntime } from '../stores/provider/injectServiceAdapter';

// tslint:disable-next-line:no-default-export
export default class CustomApp extends App {

  public static async getInitialProps({ Component, ctx }: any) {
    let pageProps = {};
    if (process.env.IS_SERVER) {
      await enableRuntime();
    }
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  public render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}
