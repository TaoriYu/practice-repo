/* tslint:disable:no-console */
import debug from 'debug';

export class Logger {
  public readonly info: debug.IDebugger;
  public readonly warn: debug.IDebugger;
  public readonly debug: debug.IDebugger;
  public readonly error: debug.IDebugger;

  public constructor(namespace: string) {
    const appDebug = debug(`App:`);
    appDebug.log = console.log.bind(console);
    this.debug = appDebug.extend(`debug:${namespace}`);
    this.info = appDebug.extend(`info:${namespace}`);
    this.warn = appDebug.extend(`warn:${namespace}`);
    this.error = debug(`App:error:${namespace}`);
  }
}

export function log(namespace: string) {
  return new Logger(namespace);
}
