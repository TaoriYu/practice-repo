import * as React from 'react';
import { useObserver } from 'mobx-react-lite';
import { useStore } from '../../core/provider/useStore';
import { PhotosStore } from '../../stores/photos';
import { SearchPhotosStore } from '../../stores/photos/searchPhotos.store';
import { Paginator } from '../shared/Paginator';
import { ImageCard } from './ImageCard';
import s from './indexPageLayout.less';

export function IndexPageLayout() {
  const photosStore = useStore<PhotosStore>(PhotosStore);
  const searchPhotosStore = useStore<SearchPhotosStore>(SearchPhotosStore);
  const paginateSearch = () => {
    searchPhotosStore.page += 1;
    searchPhotosStore.searchNextPhotos.observe();
  };

  return useObserver(() => (
    <section role="list of photos section" className={s.photosList}>
      {photosStore.photos.map((data, i, arr) =>
        <React.Fragment key={i}>
          <ImageCard {...data} />
          {i < arr.length - 1 && <div className={s.break} />}
        </React.Fragment>,
      )}
      {!photosStore.isApiFetching && <Paginator paginateAction={paginateSearch} />}
    </section>
  ));
}
