import { any, isEmpty, equals, ifElse, flip, is, test, propOr } from 'ramda';
import { IExtNextAppContext } from './ignition';
import { TCheck, TPagesValidator, TPathsValidator } from './interfaces';

/**
 * Исполняет проверки на сервере.
 */
export class ServerCheckRunner {

  public constructor(
    private readonly context: IExtNextAppContext,
  ) {}

  public run = async (check: TCheck) => {
    if (this.isValid(check)) {
      const checkInstance = this.context.container.get(check);

      return checkInstance.serverSide(this.context.ctx);
    }
  }

  private isValid(check: TCheck) {
    return this.isPathApproach(check) && this.isPagesApproach(check);
  }

  private isPathApproach(check: TCheck) {
    const isInPath = any(ifElse(is(String), equals(this.pathname), flip(test)(this.pathname)));
    const excludePaths: TPathsValidator = propOr([], 'excludePaths', check);
    const includePaths: TPathsValidator = propOr([], 'includePaths', check);
    const isExcluded = isInPath(excludePaths);

    if (isEmpty(includePaths)) {
      return !isExcluded;
    } else {
      return isInPath(includePaths);
    }
  }

  private isPagesApproach(check: TCheck) {
    const isInFn = any(equals<Function>(this.component));
    const excludePages: TPagesValidator = propOr([], 'excludePages', check);
    const includePages: TPagesValidator = propOr([], 'includePages', check);
    const isInExcluded = isInFn(excludePages);

    if (isEmpty(includePages)) {
      return !isInExcluded;
    } else {
      return isInFn(includePages);
    }
  }

  private get pathname() {
    return this.context.ctx.pathname;
  }

  private get component() {
    return this.context.Component;
  }
}
