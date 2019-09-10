import { Expose, Type } from 'class-transformer';
import { PhotoDto } from './photo.dto';

export class SearchPhotosDto {
  /** total count of the found photos */
  @Expose()
  public total: number = 0;

  /** total count of the found pages */
  @Expose({ name: 'total_pages' })
  public totalPages: number = 0;

  /** results of search query */
  @Expose()
  @Type(() => PhotoDto)
  public results: PhotoDto[] = [];
}
