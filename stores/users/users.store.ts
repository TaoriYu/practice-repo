import { action, observable } from 'mobx';
import { Api } from '../api';
import { makeStore } from '../provider/MakeStore';
import { UsersDto } from './dto';
import { User } from './user';

@makeStore(UsersStore)
export class UsersStore extends Api<UsersDto> {
  @observable public users: User[] = [];
  @observable public totalCount: number = 0;
  @observable public query: string = '';

  @action public async searchUsers() {
    const { data } = await this.api.get('/search/users', {
      params: {
        q: this.query,
        order: 'desc'
      }
    });

    const { items, totalCount } = this.toDTO(UsersDto, data);
    this.users = items.map((item) => new User().fromDTO(item));
    this.totalCount = totalCount;
  }

  @action public setQuery(query: string) {
    this.query = query;
  }
}
