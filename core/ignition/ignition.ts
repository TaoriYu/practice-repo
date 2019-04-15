import invariant from 'invariant';
import { Container } from 'inversify';
import { NextAppContext } from 'next/app';
import { log } from '../logger';
import { TCheck } from './interfaces';
import { ClientCheckRunner } from './clientCheckRunner';
import { ServerCheckRunner } from './serverCheckRunner';

export interface IExtNextAppContext extends NextAppContext {
  container: Container;
}

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
  private readonly context?: IExtNextAppContext;
  private readonly checks: TCheck[] = [];
  private readonly log = log('Ignition');
  private readonly serverCheckRunner: ServerCheckRunner;
  private readonly clientCheckRunner: ClientCheckRunner;

  public constructor(appContext: IExtNextAppContext, checks: TCheck[]) {
    this.context = appContext;
    this.checks = checks;
    this.serverCheckRunner = new ServerCheckRunner(appContext);
    this.clientCheckRunner = new ClientCheckRunner(appContext);
  }

  /**
   * Исполняетя на клиенте. Вызывает клиентскую часть проверок, принимает результат
   * turnOn и передает его в качестве аргумента, в каждую клиентскую проверку.
   */
  public bind<T extends object>(derivedData: T) {
    if (!process.env.IS_SERVER) {
      this.checks.forEach((check) => {
        try {
          this.clientCheckRunner.run(check, derivedData);
        } catch (e) {
          this.log.error(
            '=========== error ==========\n' +
            'Error accrued while configuration binding check: %s\n' +
            'Exception: %O\n' +
            'Stack trace: \n%s\n' +
            'trying to continue...' +
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

  /**
   * Исполняется на сервере, вызывает все классы checks (с поддержкой DI).
   * Возвращает объект, который позже передается с сервера на клиент
   */
  public async derive() {
    invariant(!!this.context, 'couldn\'t provide server side check without context');

    const derivedData: object = {};
    const { res, pathname } = this.context!.ctx;
    for (const check of this.checks) {
      try {
        Object.assign(derivedData, await this.serverCheckRunner.run(check));
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
        if (res) {
          res.statusCode = 500;
        }
      }

      if (res && (res.finished || res.statusCode !== 200) && pathname !== '/_error') {
        this.log.error(
          'Response intercepting before all checks is go on, unsuccessful check name: %s',
          check.name,
        );
        throw new Error('unexpected interception');
      }
    }
    this.log.info('All checks passed, run baby run');

    return derivedData;
  }
}
