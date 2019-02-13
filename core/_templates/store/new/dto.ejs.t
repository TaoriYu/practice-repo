---
to: <%= h.projectRoot %>/stores/<%= h.lcFirst(name) %>/<%= h.lcFirst(name) %>.dto.ts
---
import { Expose, Type } from 'class-transformer';

export class <%= h.ucFirst(name) %>Dto {
  /** идентификатор */
  @Expose({ name: '_id' })
  public id: string = '';

  /** дата обновления */
  @Type(() => Date)
  public updatedAt: Date = new Date();

  /** дата создания */
  @Type(() => Date)
  public createdAt: Date = new Date();
}
