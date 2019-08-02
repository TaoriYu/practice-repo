import { computed, observable } from 'mobx';
import { EApiState, OApiFactory } from '../../core/api';
import { makeStore } from '../../core/provider';
import { accessKey } from '../../secret';
import { PhotoDto } from './photo.dto';

@makeStore(PhotosStore)
export class PhotosStore {
  /** photos from unsplash */
  @observable public photos: PhotoDto[] = [];
  /** number of pages of data */
  @observable public pages: number = 1;

  public readonly getPhotos = OApiFactory<PhotoDto[]>({
    endpoint: '/photos',
    params: { page: () => this.pages },
    headers: { Authorization: () => `Client-ID ${accessKey}` },
    dto: PhotoDto,
    setter: (photos) => this.photos = photos,
  });

  public readonly getNextPage = OApiFactory<PhotoDto[]>({
    endpoint: '/photos',
    params: { page: () => this.pages },
    headers: { Authorization: () => `Client-ID ${accessKey}` },
    dto: PhotoDto,
    setter: (photos) => this.photos = this.photos.concat(photos),
  });

  @computed
  public get isApiFetching(): boolean {
    return this.getPhotos.state === EApiState.pending ||
      this.getNextPage.state === EApiState.pending;
  }
}
