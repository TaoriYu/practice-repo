import * as React from 'react';
import { Container } from 'inversify';
import { createStoreContainer } from './createStoreContainer';
import { TStoreName } from './store.store';

const storeContext = React.createContext<Container>(createStoreContainer());

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
