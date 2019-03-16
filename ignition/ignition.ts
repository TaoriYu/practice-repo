import { NextAppContext } from 'next/app';
import * as checks from './checks';
import { log } from '../core/logger';
import { container } from '../di/container';

import { NextContext } from 'next';
import { TCheck, TPagesValidator, TPathsValidator } from './interfaces';
import { ifElse, equals, is, test, flip, prop, propOr, any, empty } from 'ramda';
import invariant from 'invariant';

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
  private readonly context?: NextContext;
  private readonly component?: NextAppContext['Component'];
  private readonly checks: TCheck[];
  private readonly log = log('Ignition');

  public constructor(appContext?: NextAppContext) {
    this.checks = Object.keys(checks).map((key) => checks[key as keyof typeof checks]);
    this.context = prop('ctx', appContext!);
    this.component = prop('Component', appContext!);
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
        const {
          excludePaths = [],
          includePaths = [],
          excludePages = [],
          includePages = [],
        } = check;

        try {
          const isInPath = this.isPathApproach(excludePaths, includePaths);
          const isInPage = this.isPagesApproach(excludePages, includePages);

          if (isInPath || isInPage) {
            container.get(check).clientSide(derivedData);
          }
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
    invariant(!!this.context, 'couldn\'t provide server side check without context');

    const derivedData: object = {};
    const { res } = this.context!;
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
        if (res) {
          res.statusCode = 500;
        }
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

  private async runCheck(check: TCheck) {
    invariant(!!this.context, 'couldn\'t provide server side check without context');

    if (process.env.IS_SERVER && this.context && this.context.res) {
      const {
        excludePaths = [],
        includePaths = [],
        excludePages = [],
        includePages = [],
      } = check;

      const isInPath = this.isPathApproach(excludePaths, includePaths);
      const isInPage = this.isPagesApproach(excludePages, includePages);
      if (isInPath || isInPage) {
        const checkInstance = container.get(check);

        return checkInstance.serverSide(this.context);
      }

      return {};
    }

    return {};
  }

  private isPathApproach(excludePaths: TPathsValidator, includePaths: TPathsValidator) {
    const pathname = propOr('', 'pathanme', this.context);
    const isInPath = any(ifElse(is(String), equals(pathname), flip(test)(pathname)));

    if (isInPath(excludePaths)) {
      return false;
    }
    if (!empty(includePaths) && !isInPath(includePaths)) {
      return false;
    }

    return true;
  }

  private isPagesApproach(excludePages: TPagesValidator, includePages: TPagesValidator) {
    const isInFn = any(equals<Function>(this.component!));

    if (isInFn(excludePages)) {
      return false;
    }
    if (!empty(includePages) && !isInFn(includePages)) {
      return false;
    }

    return true;
  }
}
