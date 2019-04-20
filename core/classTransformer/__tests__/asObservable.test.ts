import { classToPlain, plainToClass } from 'class-transformer';
import { asObservable } from '../asObservable';

describe('asObservable transformer test suite', () => {
  class TestTransform {
    @asObservable()
    public ids: number[] = [0];
  }

  it('should make ids observable', () => {
    const instance = plainToClass(TestTransform, { ids: [1, 2, 3]});

    expect(Array.isArray(instance.ids)).toBeFalsy();
  });

  it('sholud transform observables back to plan js', () => {
    const instance = plainToClass(TestTransform, { ids: [1, 2, 3]});
    const resulted = classToPlain(instance) as TestTransform;

    expect(resulted.ids).toBeInstanceOf(Array);
  });
});
