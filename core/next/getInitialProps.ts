import { NextContext } from 'next';
import { NextAppContext } from 'next/app';
import { IgnitionFactory } from '../../ignition';
import { createStoreContainer } from '../provider/createStoreContainer';
import { logApp } from './logApp';
import { IAppProps } from './TemplateApp';
import { templateLogger } from './templateLogger';

const getStatusCode = (ctx: NextContext) => ctx.res ? ctx.res.statusCode : 200;
const setStatusCode = (ctx: NextContext, code: number) => {
  if (ctx.res) { ctx.res.statusCode = code; }
};

export async function getInitialProps(appContext: NextAppContext): Promise<IAppProps> {
  logApp(templateLogger, appContext);

  const { Component, ctx } = appContext;
  const container = createStoreContainer();
  let pageProps = {};

  try {
    const extContext = Object.assign({}, appContext, { container });
    pageProps = await IgnitionFactory(extContext).derive();
  } catch (e) {
    templateLogger.error('Ошибка во время исполнения Ignition checks', e);
    setStatusCode(ctx, getStatusCode(ctx) === 400 ? 400 : 500);
  }

  if (Component.getInitialProps) {
    try {
      const componentDerived = await Component.getInitialProps!(ctx);
      pageProps = Object.assign({}, pageProps, componentDerived);
    } catch (e) {
      templateLogger.error('Ошибка во время getInitialProps у дочернего компонента', e);
    }
  }

  return { pageProps, statusCode: getStatusCode(ctx), container };
}
