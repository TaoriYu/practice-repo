import { Logger } from './logger';

/**
 * Включает логгер в дефолтных настройках
 */
export function enableLogger() {
  const isProdServer = process.env.NODE_ENV === 'production' && process.env.IS_SERVER;
  const isDev = process.env.NODE_ENV !== 'production';
  if (isProdServer) {
    Logger.setLogLevel(Logger.logLevel.info);
  } else if (isDev) {
    Logger.setLogLevel(Logger.logLevel.debug);
  } else {
    // users client in production
    Logger.setLogLevel(Logger.logLevel.silent);
  }
}
