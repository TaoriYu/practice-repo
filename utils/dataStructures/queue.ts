/**
 * Простейшая реализация очереди
 */
export class Queue<T> {
  private queue: T[] = [];

  public constructor(array?: T[]) {
    if (array) {
      this.queue = array;
    }
  }

  /**
   * Добавляет элемент в очередь
   */
  public enqueue(data: T): void {
    this.queue.push(data);
  }

  /**
   * Удаляет элемент из очереди
   */
  public dequeue(): T {
    const item = this.queue[0];
    this.queue = this.queue.slice(1);

    return item;
  }

  /**
   * Проверяет пуста ли очередь
   */
  public isEmpty(): boolean {
    return this.length === 0;
  }

  /**
   * Возвращает первый элемент в очереди
   */
  public top(): T {
    return this.queue[0];
  }

  /**
   * Возыращает длину очереди
   */
  public get length(): number {
    return this.queue.length;
  }
}
