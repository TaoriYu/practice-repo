import * as React from 'react';
import { useIntersectionObserver } from '../../../utils/reactHooks/useIntersectionObserver';
import * as styles from './image.less';

/**
 * This Image component purpose is to make it easy to
 * load photo in any way: with lazy loading, preloader,
 * different images sizes for different screen sizes, etc.
 */

interface ISources {
  /** source of image */
  src: string;
  /** media query in which source should be downloaded */
  media: string;
}

interface IImageProps {
  /** src для загрузки дефолтной картинки */
  defaultSrc: string;
  /** релоадим alt, так как его может не быть */
  alt?: string;
  /** sources for downloading photos based on different media */
  sources?: ISources[];
  /** trigger lazy loading for photos */
  lazy?: boolean;
}

export function Image({ defaultSrc, alt, sources, lazy = false }: IImageProps) {
  /**
   * State for default src of image: it would be empty string if we want to use lazy
   * mode; otherwise - prop value.
   */
  const [defaultSrcState, setDefaultSrcState] = React.useState(lazy ? '' : defaultSrc);
  /**
   * State for sources array: its initialize with empty array if we want to use lazy mode;
   * otherwise - it is initialize with prop value.
   */
  const [sourcesState, setSourcesState] = React.useState(lazy ? [] : sources);
  /** settings for intersection observer */
  const intersectionSettings = { rootMargin: '100px 0px 0px 0px', threshold: 0.1 };
  const [ref, registerCallback] = useIntersectionObserver<HTMLImageElement>(intersectionSettings);

  if (lazy) {
    registerCallback((entries) => {
      if (entries[0].isIntersecting) {
        setSourcesState(sources);
        setDefaultSrcState(defaultSrc);
      }
    });
  }

  return (
    <picture>
      {sourcesState && sourcesState.map(({ media, src }) =>
        <source src={src} media={media} key={media} />,
      )}
      <img ref={ref} src={defaultSrcState} alt={alt} className={styles.image} />
    </picture>
  );
}
