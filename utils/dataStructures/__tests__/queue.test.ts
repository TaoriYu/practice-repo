import { Queue } from '../queue';

describe('queue test suite', () => {
  test('creates queue', () => {
    const array = [1, 2, 3, 4, 5];
    const queue = new Queue(array);

    expect(queue.length).toEqual(array.length);
  });

  test('enqueue and dequeue elements', () => {
    const queue = new Queue();
    expect(queue.length).toEqual(0);
    queue.enqueue(1);
    expect(queue.length).toEqual(1);
    expect(queue.top()).toEqual(1);
    expect(queue.dequeue()).toEqual(1);
    expect(queue.length).toEqual(0);
    expect(queue.isEmpty()).toBeTruthy();
  });
});
