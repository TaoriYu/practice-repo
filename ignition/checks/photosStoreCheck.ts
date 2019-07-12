import { classToPlain, plainToClass } from 'class-transformer';
import { ICheck } from '../../core/ignition';
import { provide } from '../../core/provider';
import { PhotoDto, PhotosStore } from '../../stores/photos';

interface IPhotosCheckData {
  photos: PhotoDto[];
}

@provide(PhotosStoreCheck)
export class PhotosStoreCheck implements ICheck {
  public constructor(private photoStore: PhotosStore) {
  }

  public async serverSide(): Promise<IPhotosCheckData> {
    await this.photoStore.getPhotos.observe();
    return { photos: classToPlain(this.photoStore.photos) as PhotoDto[] };
  }

  public clientSide({ photos }: IPhotosCheckData): void {
    this.photoStore.photos = plainToClass(PhotoDto, photos);
  }
}
