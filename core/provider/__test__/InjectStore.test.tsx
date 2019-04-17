/**
 * @jest-environment jsdom
 */
import * as React from 'react';
import { mount } from 'enzyme';
import { createStoreContainer } from '../createStoreContainer';
import { injectStore } from '../InjectStore';
import { makeStore } from '../makeStore';
import { Provider } from '../StoreContext';

describe('inject store test suite', () => {
  test('should inject store into component', () => {
    function Component(props: { store: any }) {
      return (<div>{ props.store.text() }</div>);
    }

    const mockFn = jest.fn(() => 'test');

    @makeStore(Store)
    class Store { public text() { return mockFn(); } }

    const Injected = injectStore({ store: Store })(Component);
    mount((
      <Provider value={createStoreContainer()}>
        <Injected />
      </Provider>
    ));

    expect(mockFn).toBeCalled();
  });
});
