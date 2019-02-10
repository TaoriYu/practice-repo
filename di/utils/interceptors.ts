import { AxiosError, AxiosResponse } from 'axios';
import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';

export function responseInterceptor<D>(dto: ClassType<D>) {
  return (response: AxiosResponse) => {
    const parsedData = plainToClass(dto, response.data, { strategy: 'excludeAll' });

    return Object.assign({}, response, { data: parsedData });
  };
}

export function errorResponseInterceptor<E>(errorDto?: ClassType<E>) {
  return (error: AxiosError) => {
    // response будет всегда, так как мы в response interceptor, НО! ошибки иногда бывают жесткие
    // т.е. когда 200 и response есть но CORS все ломает. Тогда response может не быть, теоритически.
    if (error.response) {
      error.response.data = errorDto
        ? plainToClass(errorDto, error.response.data, { strategy: 'excludeAll' })
        // Если DTO не передан обнуляем данные, по соображениям конвенций приложения.
        : {};

      return Promise.reject(error);
    }

    return Promise.reject(error);
  };
}
