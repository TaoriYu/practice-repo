import { Expose } from 'class-transformer';

export class PhotoLinksDto {
  /** link to download picture */
  @Expose()
  public download: string = '';
}
