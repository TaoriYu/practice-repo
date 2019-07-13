import * as React from 'react';
import { useStore } from '../../core/provider/useStore';
import { PhotosStore } from '../../stores/photos';
import { assignKey } from '../../utils/fn';
import { ImageCard } from './ImageCard';
import { intersperse } from 'ramda';
import s from './indexPageLayout.less';

export function IndexPageLayout() {
  const photosStore = useStore<PhotosStore>(PhotosStore);

  return (
    <section role="list of photos section" className={s.photosList}>
      {assignKey(intersperse(<div className={s.break} />, photosStore.photos.map(ImageCard)))}
    </section>
  );
}
