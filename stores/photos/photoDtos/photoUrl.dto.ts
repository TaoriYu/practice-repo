import { Expose } from 'class-transformer';

export class PhotoUrlDto {
  /** url to raw photo */
  @Expose()
  public raw: string = '';

  /** url to full photo */
  @Expose()
  public full: string = '';

  /** url to regular photo resolution (width 1080) */
  @Expose()
  public regular: string = '';

  /** url to small (width 400) */
  @Expose()
  public small: string = '';

  /** url to thumb photo resolution (width 200) */
  @Expose()
  public thumb: string = '';
}
