import { classToPlain, plainToClass } from 'class-transformer';
import { ICheck } from '../../core/ignition';
import { provide } from '../../core/provider';
import { PhotoDto, PhotosStore } from '../../stores/photos';
import { SearchPhotosStore } from '../../stores/photos/searchPhotos.store';

interface IPhotosCheckData {
  photos: PhotoDto[];
}

@provide(SearchPhotosStoreCheck)
export class SearchPhotosStoreCheck implements ICheck {
  public constructor(private searchPhotoStore: SearchPhotosStore, private photoStore: PhotosStore) {
  }

  public async serverSide(): Promise<IPhotosCheckData> {
    await this.searchPhotoStore.searchPhotos.observe();
    return { photos: classToPlain(this.photoStore.photos.slice()) as PhotoDto[] };
  }

  public clientSide({ photos }: IPhotosCheckData): void {
    this.photoStore.photos = plainToClass(PhotoDto, photos);
  }
}
