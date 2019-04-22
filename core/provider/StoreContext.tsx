import * as React from 'react';
import { Container } from 'inversify';
import { TStoreName } from './store.store';

// tslint:disable-next-line:no-null-keyword
const storeContext = React.createContext<Container>(null as any);

export interface IProviderProps {
  value: Container;
  children: React.ReactNode;
}

export function Provider(props: IProviderProps) {
  const Context = storeContext;

  return (
    <Context.Provider value={props.value}>
      {props.children}
    </Context.Provider>
  );
}

export interface IStoreConsumerProps {
  children: (container: Container) => React.ReactNode;
}

export function StoreConsumer(props: IStoreConsumerProps) {
  const Context = storeContext;

  return (
    <Context.Consumer>
      {props.children}
    </Context.Consumer>
  );
}

export function useStore<T>(storeName: TStoreName): T {
  const storeContainer = React.useContext<Container>(storeContext);

  return storeContainer.get(storeName);
}
