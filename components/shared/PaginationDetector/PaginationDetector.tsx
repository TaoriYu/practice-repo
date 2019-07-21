import * as React from 'react';
import { useStore } from '../../../core/provider/StoreContext';
import { PhotosStore } from '../../../stores/photos';
import { useIntersectionObserver } from '../../../utils/reactHooks/useIntersectionObserver';

export function PaginationDetector() {
  const photosStore = useStore<PhotosStore>(PhotosStore);
  const [ref, registerCallback] =
    useIntersectionObserver<HTMLDivElement>({ threshold: [1], rootMargin: '0px 0px 50px 0px' });

  registerCallback((entries) => {
    if (entries[0].isIntersecting) {
      photosStore.pages = photosStore.pages + 1;
      photosStore.getNextPage.observe();
    }
  });

  return (
    <div ref={ref} />
  );
}
