/* tslint:disable:file-name-casing */
import 'reflect-metadata';
import { NextComponentType, NextContext } from 'next';
import * as React from 'react';
import App, { Container } from 'next/app';
import { RuntimeSettings } from '../core/config';
import { container } from '../di/container';

interface IInitialPropsArgs {
  ctx: NextContext;
  // tslint:disable-next-line:no-any
  Component: NextComponentType;
}

// tslint:disable-next-line:no-default-export
export default class CustomApp extends App {

  public static async getInitialProps({ Component, ctx }: IInitialPropsArgs) {
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
