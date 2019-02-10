/**
 * Представляет массив виде коллекции, где ключ коллекции это id объекта в массиве.
 * Так-же возможно получить изначальный порядок элементов в массиве используя
 * свойство order;
 * @example
 * const a = [ { id: 101, name: 'some' }, { id: 245, name: 'other' } ];
 * const collection = new Collection(a);
 * console.log(collection) // -> { 101: { id: 101, name: 'some' }, 245: { id: 245, name: 'other' } }
 */
export class Collection<T extends object, E extends keyof T> {
  [n: number]: T;

  public readonly order: Array<T[E]> = [];

  public constructor(array: T[], objectIdentifier: E) {
    array.forEach((item) => {
      this.order.push(item[objectIdentifier]);
      this[item[objectIdentifier] as unknown as number] = item;
    });
  }

  /**
   * Перебирает колекцию в порядке заданом массивом order
   */
  public map<A>(callBack: (element: T, index: number, collection: this) => A): A[] {
    return this.order.map((id, index) =>
      callBack(this[id as unknown as number], index, this),
    );
  }

  /**
   * Превращает колекцию обратно в массив, сохраня изначальную сортировку
   */
  public toArray() {
    return this.order.map((id) => this[id as unknown as number]);
  }
}
