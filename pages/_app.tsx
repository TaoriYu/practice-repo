/* tslint:disable:file-name-casing */
import 'reflect-metadata';
import { NextComponentType, NextContext } from 'next';
import * as React from 'react';
import App, { AppProps, Container } from 'next/app';
import { RuntimeSettings } from '../core/config';
import { Delivery } from '../core/delivery';
import { container } from '../di/container';

interface IInitialPropsArgs {
  ctx: NextContext;
  // tslint:disable-next-line:no-any
  Component: NextComponentType;
}

interface IDerivedProps {
  [ n: string ]: object;
  derivedProps: Array<{ name: string; derivedProps: any }>;
}

type TAppProps = AppProps & { pageProps: IDerivedProps };

// tslint:disable-next-line:no-default-export
export default class CustomApp extends App {

  public static async getInitialProps({ Component, ctx }: IInitialPropsArgs) {
    let pageProps: IDerivedProps = { derivedProps: [] };
    const runtimeSettings = container.get(RuntimeSettings);

    if (!runtimeSettings.isRuntimeEnabled) {
      await runtimeSettings.enableRuntime();
    }
    pageProps.derivedProps = await container.get(Delivery).execute(ctx);

    if (Component.getInitialProps) {
      pageProps = Object.assign({}, pageProps, await Component.getInitialProps(ctx));
    }

    return { pageProps };
  }

  public constructor(props: TAppProps ) {
    super(props);
    if (props.pageProps && props.pageProps.derivedProps) {
      const delivery = container.get<Delivery>(Delivery);
      props.pageProps.derivedProps.forEach(({ derivedProps, name }) => {
        delivery.bindDerived(derivedProps, name);
      });
    }
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
