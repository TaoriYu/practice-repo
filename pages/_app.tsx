/* tslint:disable:file-name-casing */
import 'reflect-metadata';
import DevTools from 'mobx-react-devtools';
import { NextComponentType, NextContext } from 'next';
import * as React from 'react';
import App, { Container } from 'next/app';
import { log } from '../core/logger';
import { Ignition } from '../ignition';
import DevTools from 'mobx-react-devtools';

interface IInitialPropsArgs {
  ctx: NextContext;
  // tslint:disable-next-line:no-any
  Component: NextComponentType;
}

// tslint:disable-next-line:no-default-export
export default class CustomApp extends App {

  public static async getInitialProps({ Component, ctx }: IInitialPropsArgs) {
    let pageProps = {};
    try {
      pageProps = await new Ignition(ctx).turnOn();
    } catch (e) {
      log('Ignition').error(
        'Ошибка во время исполнения Ignition checks',
      );
    }

    if (Component.getInitialProps) {
      const componentDerived = await Component.getInitialProps(ctx);
      pageProps = Object.assign({}, pageProps, componentDerived);
    }

    return { pageProps };
  }

  public constructor(props: any) {
    super(props);
    new Ignition().bind(props.pageProps);
  }

  public render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        { process.env.NODE_ENV === 'development' && <DevTools /> }
        <Component {...pageProps} />
      </Container>
    );
  }
}
