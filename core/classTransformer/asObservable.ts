import { Transform, TransformOptions } from 'class-transformer';
import { observable, toJS } from 'mobx';

/**
 * Декоратор для class-transformer используется для того что-бы корректно парсить observable
 * при помощи plainToClass в mobx 4; Так-же делает поле observable
 */
export function asObservable<T>(options?: TransformOptions) {
  return (target: {}, key: string, baseDescriptor?: PropertyDescriptor) => {
    const observableDescriptor = observable(target, key, baseDescriptor);
    Transform((value) => {
      return value ? toJS(value) : value;
    }, { ...options, toPlainOnly: true })(target, key);

    return observableDescriptor;
  };
}
