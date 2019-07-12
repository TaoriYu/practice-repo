import { Expose } from 'class-transformer';

export class ProfileImageDto {
  /** small photo link */
  @Expose()
  public small: string = '';

  /** medium photo link */
  @Expose()
  public medium: string = '';

  /** large photo link */
  @Expose()
  public large: string = '';
}
