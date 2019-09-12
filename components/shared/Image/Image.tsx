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

interface IImageState {
  /** src для загрузки дефолтной картинки */
  defaultSrcState: string;
  /** sources for downloading photos based on different media */
  sourcesState?: ISources[];
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
  /** default state for Image should initialize with props */
  const state: IImageState = { defaultSrcState: defaultSrc, sourcesState: sources };
  /** when lazy prop is set, state should initialize with props */
  const lazyState: IImageState = { defaultSrcState: '', sourcesState: []};
  /** settings for intersection observer */
  const intersectionSettings = { rootMargin: '100px 0px 0px 0px', threshold: 0.1 };
  const [imageState, setImageState] = React.useState<IImageState>(lazy ? lazyState : state);
  const [ref, registerCallback] = useIntersectionObserver<HTMLImageElement>(intersectionSettings);

  if (lazy) {
    registerCallback((entries) => {
      if (entries[0].isIntersecting) {
        setImageState({ sourcesState: sources, defaultSrcState: defaultSrc });
      }
    });
  }

  return (
    <picture>
      {imageState.sourcesState && imageState.sourcesState.map(({ media, src }) =>
        <source src={src} media={media} key={media} />,
      )}
      <img ref={ref} src={imageState.defaultSrcState} alt={alt} className={styles.image} />
    </picture>
  );
}
