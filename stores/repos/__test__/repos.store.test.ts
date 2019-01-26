import { Api } from '../../../core/api';
import { axiosMockFactory } from '../../../utils/tests';
import { SearchResults } from '../dto';
import { ReposStore } from '../repos.store';
import { searchResultsMock } from './searchresults.mock';

describe('ReposStore test suite', () => {
  const searchResults = searchResultsMock();
  const apiFactoryMock = jest.fn(() => {
    return new Api(
      axiosMockFactory<{data: SearchResults}>({
        data: searchResults,
      }),
    );
  });

  beforeEach(() => {
    apiFactoryMock.mockClear();
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
    expect(repo.repos).toHaveLength(15);
    expect(repo.repos).toEqual(searchResults.items);
    expect(repo.totalCount).toBe(15);
  });
});
