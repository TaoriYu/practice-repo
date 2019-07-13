import * as React from 'react';
import { useStore } from '../../core/provider/useStore';
import { PhotosStore } from '../../stores/photos';
import { ImageCard } from './ImageCard';
import s from './indexPageLayout.less';

export function IndexPageLayout() {
  const photosStore = useStore<PhotosStore>(PhotosStore);

  return (
    <section role="list of photos section" className={s.photosList}>
      <ImageCard {...photosStore.photos[0]} />
    </section>
  );
}
