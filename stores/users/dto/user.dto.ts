import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  public login: string = '';

  @Expose({ name: 'avatar_url' })
  public avatarUrl: string = '';

  @Expose({ name: 'html_url' })
  public htmlUrl: string = '';
}
