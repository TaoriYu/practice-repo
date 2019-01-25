import { Api } from '../../../core/api';
import { axiosMockFactory } from '../../../utils/tests';
import { SearchResults } from '../dto';
import { ReposStore } from '../repos.store';
jest.mock('../../../core/api');

describe('ReposStore test suite', () => {
  const apiFactoryMock = jest.fn(() => {
    return new Api(axiosMockFactory({}));
  });

  beforeEach(() => {
    apiFactoryMock.mockClear();
    Api.mockClear();
  });

  test('initialised without errors', () => {
    const repo = new ReposStore(apiFactoryMock);
    expect(repo).toBeDefined();
    expect(apiFactoryMock).toHaveBeenCalledTimes(1);
    expect(apiFactoryMock)
      .toHaveBeenCalledWith('defaultApi', 'GET', 'search/repositories', SearchResults);
  });

  test('should search repos', async () => {
    const repo = new ReposStore(apiFactoryMock);
    await repo.searchRepos('test');
    expect(Api).toHaveBeenCalledTimes(1);
    expect(Api.mock.instances[0].run).toHaveBeenCalledTimes(1);
  });
});
