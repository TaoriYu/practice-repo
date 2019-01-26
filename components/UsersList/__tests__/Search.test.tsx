import * as React from 'react';
import { shallow } from 'enzyme';
import { Api } from '../../../core/api';
import { UsersStore } from '../../../stores/users';
import { axiosMockFactory } from '../../../utils/tests';
import { Search } from '../Search';

describe('search component suite', () => {
  const usersStore = new UsersStore(
    () => new Api(axiosMockFactory({ items: [], totalCount: 0 })),
  );

  test('should reacts on query change', () => {
    usersStore.setQuery('test');
    const component = shallow(<Search usersStore={usersStore} />);

    expect(component.find('input').prop('value')).toEqual('test');

    usersStore.setQuery('other');
    expect(component.find('input').prop('value')).toEqual('other');

    component
      .find('input')
      .simulate('change', { currentTarget: { value: 'val' } });
    expect(component.find('input').prop('value')).toEqual('val');
  });

  test('should submit data', () => {
    const component = shallow(<Search usersStore={usersStore} />);
    const searchSpy = jest.spyOn(usersStore, 'searchUsers');
    component.find('form').simulate('submit', { preventDefault: jest.fn() });
    expect(searchSpy).toBeCalled();
  });
});
