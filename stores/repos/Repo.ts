import { plainToClass } from 'class-transformer';
import { observable } from 'mobx';
import { RepoDto } from './dto';

export class Repo {
  @observable public id: number = 0;
  @observable public name: string = '';
  @observable public fullName: string = '';
  @observable public htmlUrl: string = '';
  @observable public createdAt: Date = new Date();
  @observable public pushedAt: Date = new Date();

  public static create(dto: RepoDto) {
    return plainToClass(Repo, dto);
  }

  public get pushedAtDate() {
    const day = this.pushedAt.getDate();
    const month = this.pushedAt.getMonth() + 1;
    const year = this.pushedAt.getFullYear();
    const addZero = (d: number) => d < 10 ? `0${d}` : d;

    return `${addZero(day)}.${addZero(month)}.${year}`;
  }
}
