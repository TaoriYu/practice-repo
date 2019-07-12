import { Expose } from 'class-transformer';

export class PhotoDto {
  [key: string]: string;

  /** идентификатор */
  @Expose()
  public id: string = '';
}
