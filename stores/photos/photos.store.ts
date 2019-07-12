import { observable } from 'mobx';
import { OApiFactory } from '../../core/api';
import { makeStore } from '../../core/provider';
import { accessKey } from '../../secret';
import { PhotoDto } from './photo.dto';

@makeStore(PhotosStore)
export class PhotosStore {
  /** photos from unsplash */
  @observable public photos: PhotoDto[] = [];

  public readonly getPhotos = OApiFactory<PhotoDto[]>({
    endpoint: '/photos',
    params: { page: () => 1 },
    headers: { Authorization: () => accessKey },
    dto: PhotoDto,
    setter: (photos) => this.photos = photos,
  });
}
