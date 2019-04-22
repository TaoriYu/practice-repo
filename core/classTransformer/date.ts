import { Transform, TransformationType, TransformOptions } from 'class-transformer';

/**
 * Цель передача данных с сервера на клиент через unix epoch time (самый надежный способ когда
 * не нужна коррекция по таймзоне)
 * Преобразует дату unix or utc в Date, а при обратном преобразовании возвращает timestamp
 */
export function date<T>(options?: TransformOptions) {
  return Transform((value, obj, transformationType) => {
    switch (transformationType) {
      case TransformationType.PLAIN_TO_CLASS:
        return new Date(value);
      case TransformationType.CLASS_TO_PLAIN:
        return value.getTime();
      default:
        return value;
    }
  }, options);
}
