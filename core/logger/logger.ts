/* tslint:disable:no-console */
import debug from 'debug';

enum ELogLevel {
  /* all logs, maximum verbosity */
  debug = 'debug',
  /* all logs exclude debug logs */
  info = 'info',
  /* all logs exclude debug and info logs */
  warn = 'warn',
  /* only error logs */
  error = 'error',
  /* no logs */
  silent = 'silent',
}

export class Logger {
  /* kind of reexporting, exposing ELogLevel enumeration */
  public static logLevel = ELogLevel;

  public readonly _info: debug.IDebugger;
  public readonly _warn: debug.IDebugger;
  public readonly _debug: debug.IDebugger;
  public readonly _error: debug.IDebugger;

  /**
   * Sets the level of logger verbosity.
   * @see ELogLevel
   * @param {ELogLevel} level
   */
  public static setLogLevel(level?: ELogLevel) {
    switch (level) {
      case ELogLevel.debug:
        return debug.enable('App:*');
      case ELogLevel.info:
        return debug.enable('App:(info|warn|error):*');
      case ELogLevel.warn:
        return debug.enable('App:(warn|error):*');
      case ELogLevel.error:
        return debug.enable('App:error:*');
      case ELogLevel.silent:
        return debug.disable();
      default:
        return debug.enable('App:*');
    }
  }

  public constructor(namespace: string) {
    const appDebug = debug(`App`);
    appDebug.log = console.log.bind(console);
    this._debug = appDebug.extend('debug').extend(`${namespace}`);
    this._info = appDebug.extend('info').extend(`${namespace}`);
    this._warn = appDebug.extend('warn').extend(`${namespace}`);
    this._error = debug(`App:error:${namespace}`);
  }

  public info(message: string, ...args: any[]) {
    this._info(message, ...args);
  }

  public warn(message: string, ...args: any[]) {
    this._warn(message, ...args);
  }

  public debug(message: string, ...args: any[]) {
    (new SendToElastic()).debug(message, ...args);
    this._debug(message, ...args);
  }

  public error(message: string, ...args: any[]) {
    this._error(message, ...args);
  }
}

interface ILoggerTransport {
  debug(message: string, ...args: any[]): void;
  info(message: string, ...args: any[]): void;
  warn(message: string, ...args: any[]): void;
  error(message: string, ...args: any[]): void;
}

class SendToElastic implements ILoggerTransport {
  public debug(message: string, ...args: any[]): void {
    this.parse('debug', message, args);
  }

  public error(message: string, ...args: any[]): void {
    this.parse('error', message, args);
  }

  public info(message: string, ...args: any[]): void {
    this.parse('info', message, args);
  }

  public warn(message: string, ...args: any[]): void {
    this.parse('warn', message, args);
  }

  private parse(kind: string, message: string, args: any[]): void {
    const lines = message.split(/[;\n]/g);
    const messageRegular = /^\s*(.*):\s?(.*)/;
    const templateLiterals = /%o|%O|%j/;
    let argsCount = 0;
    const result = lines.reduce((parsed, line) => {
      const [match, left, right] = line.match(messageRegular) || [null, null, null];
      if (match && left && right) {
        const isTemplate = right.match(templateLiterals);

        return {
          ...parsed,
          [left.trim().replace(' ', '_')]: isTemplate
            ? args[argsCount++]
            : JSON.stringify(right),
        };
      }

      return parsed;
    }, {} as any);
    console.log(result);
  }
}

export function log(namespace: string) {
  return new Logger(namespace);
}
