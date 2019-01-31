import * as React from 'react';
import { shallow } from 'enzyme';
import { injectStore } from '../InjectStore';
import { makeStore } from '../makeStore';

describe('inject store test suite', () => {
  test('should inject store into component', () => {
    function Component(props: { store: any }) {
      return ( <div>{ props.store.text() }</div> );
    }

    const mockFn = jest.fn(() => 'test');

    @makeStore(Store)
    class Store { public text() { return mockFn(); } }

    const Injected = injectStore({ store: Store })(Component);
    const rendered = shallow(<Injected />);
    // <Wrap><Component/></Wrap> need to go deeper;
    rendered.shallow();

    expect(mockFn).toBeCalled();
    expect(rendered.props().store).toBeDefined();
  });
});
