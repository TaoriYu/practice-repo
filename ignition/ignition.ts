import { container } from '../di/container';
import * as checks from './checks';

import { NextContext } from 'next';
import { TCheck } from './interfaces';

/**
 * Отвечает за первоначальную загрузку приложения. Позволяет передавать данные с клиента
 * на сервер.
 * Вызывается в методе getInitialProps в pages/_app.tsx
 * Для передачи данных используются классы иплементирующие TCheck из папки checks.
 * @see TCheck
 * @see RuntimeSettingsCheck - as example
 */
export class Ignition {
  private readonly context: any;
  private readonly checks: TCheck[];

  public constructor(ctx?: NextContext) {
    this.checks = Object.keys(checks).map((key) => checks[key as keyof typeof checks]);
    this.context = ctx;
  }

  /**
   * Исполняется на сервере, вызывает все классы checks (с поддержкой DI).
   * Возвращает объект, который позже передается с сервера на клиент
   */
  public async turnOn() {
    return this.derive();
  }

  /**
   * Исполняетя на клиенте. Вызывает клиентскую часть проверок, принимает результат
   * turnOn и передает его в качестве аргумента, в каждую клиентскую проверку.
   */
  public bind<T extends object>(derivedData: T) {
    this.checks.forEach((check) => {
      container.get(check).clientSide(derivedData);
    });
  }

  private async derive() {
    const derivedData: object = {};
    const { res } = this.context;
    for (const check of this.checks) {
      Object.assign(derivedData, await this.runCheck(check));
      if (res && res.finished) {
        break;
      }
    }

    return derivedData;
  }

  private runCheck(check: TCheck) {
    if (process.env.IS_SERVER && this.context.res) {
      return container.get(check).serverSide(this.context);
    }

    return undefined;
  }
}
