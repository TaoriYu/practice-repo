import * as React from 'react';
import { IImageCard } from './imageCard.interdace';
import * as styles from './imageCard.less';

export function ImageCard({}: IImageCard) {
  return (
    <li className={styles.card} />
  );
}
