import * as React from 'react';
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
}

export function Image({ defaultSrc, alt, sources }: IImageProps) {
  return (
    <picture>
      {sources && sources.map(({ media, src }) => <source src={src} media={media} key={media} />)}
      <img src={defaultSrc} alt={alt} className={styles.image} />
    </picture>
  );
}
