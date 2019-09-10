import * as React from 'react';
import { IImageCard } from './imageCard.interdace';
import s from './imageCard.less';
import { Likes } from './Likes';
import { UserInfo } from './UserInfo';
import { Image } from '../../shared/Image';

export function ImageCard({ user, likes, urls, altDescription }: IImageCard) {
  const { name, username, profileImage } = user;

  return (
    <li className={s.listItem}>
      <div className={s.content}>
        <div className={s.info}>
          <UserInfo
            name={name}
            username={username}
            avatarUrl={profileImage && profileImage.medium}
          />
          <Likes likes={likes} />
        </div>

        <div className={s.imageBlock}>
          <Image lazy defaultSrc={urls.small} alt={altDescription} />
        </div>
      </div>
    </li>
  );
}
