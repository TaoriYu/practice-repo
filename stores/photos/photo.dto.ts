import { Expose, Type } from 'class-transformer';
import { PhotoLinksDto, PhotoUrlDto, UserDto } from './photoDtos';

export class PhotoDto {
  /** id of the picture */
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

  /** number of likes of photo */
  @Expose()
  public likes: number = 0;

  /** user info */
  @Expose()
  @Type(() => UserDto)
  public user: UserDto = new UserDto();
}
