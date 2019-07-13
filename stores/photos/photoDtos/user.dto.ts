import { Expose, Type } from 'class-transformer';
import { ProfileImageDto } from './profileImage.dto';

export class UserDto {
  /** user id */
  @Expose()
  public id: string = '';

  /** username */
  @Expose()
  public username: string = '';

  /** real name of user */
  @Expose()
  public name: string = '';

  /** bio */
  @Expose()
  public bio?: string = '';

  /** links to profile images */
  @Expose()
  @Type(() => ProfileImageDto)
  public profileImage?: ProfileImageDto = new ProfileImageDto();
}
