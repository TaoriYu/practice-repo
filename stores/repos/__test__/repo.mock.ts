import * as faker from 'faker';
import { RepoDto } from '../dto';

export const repoMock: () => RepoDto = () => ({
  fullName: faker.fake('{{name.firstName}} {{name.lastName}}'),
  id: faker.random.number(1000),
  createdAt: faker.date.past(2),
  htmlUrl: faker.internet.url(),
  name: faker.name.firstName(),
  pushedAt: faker.date.past(1),
});
