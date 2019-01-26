import { SearchResults } from '../dto';
import { repoMock } from './repo.mock';

export const searchResultsMock: (len?: number) => SearchResults = (len: number = 15) => ({
  items: Array(len).fill(1).map(repoMock),
  totalCount: len,
});
