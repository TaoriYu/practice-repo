import * as React from 'react';
import * as styles from './image.less';

interface IImageProps {
  /** релоадим alt, так как его может не быть */
  alt?: string;
  /** src для загрузки дефолтной картинки */
  defaultSrc: string;
}

export function Image({ defaultSrc, alt }: IImageProps) {
  return (
    <img src={defaultSrc} alt={alt} className={styles.image} />
  );
}
