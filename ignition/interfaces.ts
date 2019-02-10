import { interfaces } from 'inversify';
import { NextContext } from 'next';
import Newable = interfaces.Newable;

export interface ICheck {
  serverSide(ctx: NextContext): Promise<object>;
  clientSide(derivedData: any): void;
}

export type TCheck = Newable<ICheck>;
