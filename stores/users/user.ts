import { plainToClass } from 'class-transformer';
import { observable } from 'mobx';
import { UserDto } from './dto';

export class User {
  @observable public login: string = '';
  @observable public avatarUrl: string = '';
  @observable public htmlUrl: string = '';

  public static create(dto: UserDto) {
    return plainToClass(User, dto);
  }
}
