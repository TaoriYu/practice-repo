import { IExtNextAppContext, Ignition } from '../core/ignition';
import { values } from 'ramda';
import * as checks from './checks';

export const IgnitionFactory =
  (context: IExtNextAppContext) =>
    new Ignition(context, values(checks));
