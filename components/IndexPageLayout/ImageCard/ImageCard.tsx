import * as React from 'react';
import { IImageCard } from './imageCard.interdace';
import s from './imageCard.less';

export function ImageCard({ user, likes, urls, altDescription }: IImageCard) {
  return (
    <li className={s.card}>
      <div className={s.content}>
        <div className={s.info}>
          <span>{`${user.name} aka ${user.username}`}</span>
          <div className={s.likes}>
            <div style={{ width: 16, height: 16, backgroundColor: 'grey' }} />
            <span>{likes}</span>
          </div>
        </div>

        <div className={s.image}>
          <img src={urls.thumb} alt={altDescription} />
        </div>
      </div>
    </li>
  );
}
