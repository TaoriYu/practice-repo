import * as checks from './checks';
import { log } from '../core/logger';
import { container } from '../di/container';

import { NextContext } from 'next';
import { TCheck } from './interfaces';

/**
 * Отвечает за первоначальную загрузку приложения. Позволяет передавать данные с клиента
 * на сервер.
 * Вызывается в методе getInitialProps в pages/_app.tsx
 * Для передачи данных используются классы иплементирующие TCheck из папки checks.
 * !!!!!!
 * Ignition не деградирует, каждый чек должен вернуть результат, в случае ошибки
 * клиент получит 500, чек может просетить статус отличный от 200 что-бы вызвать
 * ошибку. Например 404.
 * @see TCheck
 * @see RuntimeSettingsCheck - as example
 */
export class Ignition {
  private readonly context: any;
  private readonly checks: TCheck[];
  private readonly log = log('Ignition');

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
    if (!process.env.IS_SERVER) {
      this.checks.forEach((check) => {
        try {
          container.get(check).clientSide(derivedData);
        } catch (e) {
          this.log.error(
            '=========== error ==========\n' +
            'Error accrued while configuration binding check: %s\n' +
            'Exception: %O\n' +
            'Stack trace: \n%s\n' +
            'trying to resume...' +
            '============ end ==========',
            check.name,
            e.message,
            e.stack,
          );
        }
      });
    }
    this.log.info('client binding process is successfully ended');
  }

  private async derive() {
    const derivedData: object = {};
    const { res } = this.context;
    for (const check of this.checks) {
      try {
        Object.assign(derivedData, await this.runCheck(check));
      } catch (e) {
        this.log.error(
          '=========== error ==========\n' +
          'Error accrued while configuration deriving check: %s\n' +
          'Exception: %O\n' +
          'Stack trace: \n%s\n' +
          '============ end ==========',
          check.name, e.message, e.stack,
        );
        // unexpected error here trying to 500;
        res.statusCode = 500;
      }

      if (res && (res.finished || res.statusCode !== 200)) {
        this.log.error(
          'Response intercepting before all checks is go on, last check name: %O',
          check.name,
        );
        throw new Error('unexpected interception');
      }
    }
    this.log.info('All checks passed, run baby run');

    return derivedData;
  }

  private runCheck(check: TCheck) {
    if (process.env.IS_SERVER && this.context.res) {
      return container.get(check).serverSide(this.context);
    }

    return undefined;
  }
}
