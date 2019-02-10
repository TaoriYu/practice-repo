import { Container } from 'inversify';
import { apiFactory, newDesignedFactory } from '../utils/apiFactory';

export type TRequestMethod = 'GET' | 'PATCH' | 'PUT' | 'POST' | 'DELETE';

export type TApiFactory = ReturnType<typeof newDesignedFactory>;

/** dirty hack for reflect-metadata supports while injecting */
export const TApiFactory = Symbol.for('TApiFactory');

export function bindApiService(container: Container) {
  // unique identifier for Api class, we can't inject Api itself but we need a way to inject it
  // throw factory
  container.bind(TApiFactory).toFactory(apiFactory);
}
