import { observable, reaction } from 'mobx';
import { OApiFactory } from '../../core/api';
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

  public constructor() {
    reaction(() => this.pages, () => this.getNextPage.observe());
  }

  public IncrementPages() {
    this.pages = this.pages + 1;
  }
}
