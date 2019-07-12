import { Expose, Type } from 'class-transformer';
import { PhotoLinksDto, PhotoUrlDto } from './photoDtos';

export class PhotoDto {
  /** идентификатор */
  @Expose()
  public id: string = '';

  /** color of the picture */
  @Expose()
  public color: string = '';

  /** description of the picture */
  @Expose()
  public description?: string = '';

  /** description for alt tags used by accessibility apps */
  @Expose({ name: 'alt_description' })
  public altDescription: string = '';

  /** urls to picture with different resolutions */
  @Expose()
  @Type(() => PhotoUrlDto)
  public urls: PhotoUrlDto = new PhotoUrlDto();

  /** links for photo */
  @Expose()
  @Type(() => PhotoLinksDto)
  public links: PhotoLinksDto = new PhotoLinksDto();
}
