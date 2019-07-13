import * as React from 'react';
import { IImageCard } from './imageCard.interdace';
import s from './imageCard.less';
import { Likes } from './Likes';
import { UserInfo } from './UserInfo';

export function ImageCard({ user, likes, urls, altDescription }: IImageCard) {
  return (
    <li className={s.card}>
      <div className={s.content}>
        <div className={s.info}>
          <UserInfo
            name={user.name}
            username={user.username}
            avatarUrl={user.profileImage && user.profileImage.medium}
          />
          <Likes likes={likes} />
        </div>

        <div className={s.imageBlock}>
          <img src={urls.small} alt={altDescription} className={s.image} />
        </div>
      </div>
    </li>
  );
}
