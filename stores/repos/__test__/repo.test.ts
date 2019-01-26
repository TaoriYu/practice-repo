import { Repo } from '../Repo';
import { repoMock } from './repo.mock';

describe('repo', () => {
  test('should create instance from mock object', () => {
    const repoData = repoMock();
    const repo = Repo.create(repoData);

    expect(repo).toBeInstanceOf(Repo);
    expect(repo).toMatchObject(repoData);
  });
});
