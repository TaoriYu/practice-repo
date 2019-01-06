import { classToPlain, plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';
import { OmitDif } from '../../types/helpers';
import { provide } from '../provider/provide';

@provide(Transit)
export class Transit<DtoClass> {

  /**
   * Transform object to DTO, if not data provided transform this to DTO
   * Notice:
   *  It's grab all keys from DTO and then require them from data argument or this
   * @param {ClassType<D>} dto
   * @returns {D}
   */
  protected toDTO(dto: ClassType<DtoClass>): DtoClass;
  protected toDTO<T extends any[]>(dto: ClassType<DtoClass>, data: T[]): DtoClass[];
  protected toDTO<T extends object>(dto: ClassType<DtoClass>, data: T): DtoClass;
  protected toDTO<T extends Transit<DtoClass>>(dto: ClassType<DtoClass>, data?: T | T[]): DtoClass | DtoClass[] {
    if (Array.isArray(data)) {
      return plainToClass<DtoClass, object[]>(dto, data, { strategy: 'excludeAll' });
    } else if (data instanceof Transit) {
      return plainToClass<DtoClass, object>(dto, data.asPlain(), { strategy: 'excludeAll' });
    } else if (data) {
      return plainToClass<DtoClass, T>(dto, data, { strategy: 'excludeAll' });
    } else {
      return plainToClass<DtoClass, this>(dto, this, { strategy: 'excludeAll' });
    }
  }

  /**
   * Fill class that inherit Transit with data. Key declaration must exist
   * @param {D} dto
   */
  protected fillSelf(this: any, dto: DtoClass): void {
    for (const key in dto) if (key in this && key in dto) {
      this[key] = dto[key] as unknown as OmitDif<this, DtoClass>;
    }
  }

  /**
   * Transform class to plain object
   * @returns {Object}
   */
  protected asPlain() {
    return classToPlain(this);
  }
}
