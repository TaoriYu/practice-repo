import 'reflect-metadata';
import * as React from 'react';
import App, { Container } from 'next/app';
import { container } from '../stores/provider/container';
import { RuntimeSettings } from '../stores/provider/RuntimeSettings';

// tslint:disable-next-line:no-default-export
export default class CustomApp extends App {

  public static async getInitialProps({ Component, ctx }: any) {
    let pageProps = {};
    const runtimeSettings = container.get(RuntimeSettings);
    if (!runtimeSettings.isRuntimeEnabled) {
      await runtimeSettings.enableRuntime();
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
