/**
 * @jest-environment jsdom
 */
import * as React from 'react';
import { shallow } from 'enzyme';
import { useIntersectionObserver } from '../useIntersectionObserver';

const hookCaller = (options: IntersectionObserverInit) => () => useIntersectionObserver(options);
const HookWrapper = ({ hook }: any) => {
  // @ts-ignore
  return <div hook={hook ? hook() : undefined} />;
};

describe('useIntersectionObserver test suites', () => {
  test('компонент с хуком рендерится буз ошибок', () => {
    const wrapper = shallow(<HookWrapper />);

    expect(wrapper.exists()).toBe(true);
  });

  test('хук возвращает массив: [ref, registerCallback]', () => {
    const wrapper = shallow(<HookWrapper hook={hookCaller({ threshold: [0.5] })} />);
    // @ts-ignore
    const [ref, registerCallback] = wrapper.find('div').props().hook;

    // tslint:disable-next-line:no-null-keyword
    expect(ref.current).toBe(null);
    expect(typeof registerCallback).toBe('function');
  });
});
