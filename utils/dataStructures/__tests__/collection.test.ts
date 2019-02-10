import * as faker from 'faker';
import { Collection } from '../collection';

describe('collection tests', () => {
  const array = Array(10).fill(1).map(() => ({
    id: faker.random.number(10000),
    name: faker.name.firstName(1),
  }));
  const collection = new Collection(array, 'id');

  test('creates a collection', () => {
    const match = array.reduce((acc, item) => ({...acc, [item.id]: item }), {});
    const order = array.map(({id}) => id);

    expect(collection).toMatchObject(match);
    expect(collection.order).toEqual(order);
    expect(collection.order).not.toEqual(order.reverse());
  });

  test('map collection in correct order', () => {
    const order = collection.map((element) => element.id);

    expect(order).toEqual(collection.order);
    expect(order).toEqual(array.map(({id}) => id));
  });

  test('convert collection back to array', () => {
    expect(collection.toArray()).toEqual(array);
  });
});
