import { any, empty, equals, ifElse, flip, is, test, propOr } from 'ramda';
import { ComponentClass } from 'react';
import { container } from '../provider/container';
import { TCheck, TPagesValidator, TPathsValidator } from './interfaces';

interface IClientContext {
  ctx: { pathname: string };
  Component: (Function | IConstructable | ComponentClass<any>);
}

/**
 * Исполняет проверки на клиенте.
 */
export class ClientCheckRunner {

  public constructor(
    private readonly context: IClientContext,
  ) {}

  public run = <T>(check: TCheck, derivedData: T) => {
    if (this.isValid(check)) {
      container.get(check).clientSide(derivedData);
    }
  }

  private isValid(check: TCheck) {
    return this.isPathApproach(check) || this.isPagesApproach(check);
  }

  private isPathApproach(check: TCheck) {
    const isInPath = any(ifElse(is(String), equals(this.pathname), flip(test)(this.pathname)));
    const excludePaths: TPathsValidator = propOr([], 'excludePaths', check);
    const includePaths: TPathsValidator = propOr([], 'includePaths', check);
    const isIncluded = !empty(includePaths) && isInPath(includePaths);
    const isExcluded = isInPath(excludePaths);

    return isIncluded || !isExcluded;
  }

  private isPagesApproach(check: TCheck) {
    const isInFn = any(equals<Function>(this.component));
    const excludePages: TPagesValidator = propOr([], 'excludePages', check);
    const includePages: TPagesValidator = propOr([], 'includePages', check);
    const isIncluded = isInFn(excludePages);
    const isExcluded = !empty(includePages) && isInFn(includePages);

    return isIncluded || !isExcluded;
  }

  private get pathname() {
    return this.context.ctx.pathname;
  }

  private get component() {
    return this.context.Component;
  }
}
