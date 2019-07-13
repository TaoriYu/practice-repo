import * as React from 'react';
import { IImageCard } from './imageCard.interdace';
import s from './imageCard.less';
import { Likes } from './Likes';

export function ImageCard({ user, likes, urls, altDescription }: IImageCard) {
  return (
    <li className={s.card}>
      <div className={s.content}>
        <div className={s.info}>
          <span className={s.name}>{`${user.name} aka ${user.username}`}</span>
          <Likes likes={likes} />
        </div>

        <div className={s.imageBlock}>
          <img src={urls.small} alt={altDescription} className={s.image} />
        </div>
      </div>
    </li>
  );
}
