import { observable } from 'mobx';
import { OApiFactory } from '../../core/api';
import { makeStore } from '../../core/provider';
import { accessKey } from '../../secret';
import { PhotosStore } from './photos.store';
import { SearchPhotosDto } from './searchPhotos.dto';

@makeStore(SearchPhotosStore)
export class SearchPhotosStore {
  /** query for search request */
  @observable public query: string = 'nature';
  /** page number to request */
  @observable public page: number = 1;

  public readonly searchPhotos = OApiFactory<SearchPhotosDto>({
    method: 'GET',
    endpoint: '/search/photos',
    headers: { Authorization: () => `Client-ID ${accessKey}` },
    params: { page: () => this.page, query: () => this.query },
    dto: SearchPhotosDto,
    setter: (data) => this.photosStore.photos = data.results,
  });

  public readonly searchNextPhotos = OApiFactory<SearchPhotosDto>({
    method: 'GET',
    endpoint: '/search/photos',
    headers: { Authorization: () => `Client-ID ${accessKey}` },
    params: { page: () => this.page, query: () => this.query },
    dto: SearchPhotosDto,
    setter: (data) => this.photosStore.photos = this.photosStore.photos.concat(data.results),
  });

  public constructor(private photosStore: PhotosStore) {}

}
