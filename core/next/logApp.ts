import { NextAppContext } from 'next/app';
import { Logger } from '../logger';

export function logApp(logger: Logger, { Component, ctx }: NextAppContext) {
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
}
