import { NextAppContext } from 'next/app';
import { Ignition } from '../core/ignition';
import { values } from 'ramda';
import * as checks from './checks';

export const IgnitionFactory =
  (context: NextAppContext) =>
    new Ignition(context, values(checks));
