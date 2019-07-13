import * as React from 'react';
import { HeartIcon } from '../../../Icons/HeartIcon';
import s from './likes.less';

interface ILikesProps {
  likes: number;
}

export function Likes({ likes }: ILikesProps) {
  return (
    <div className={s.likes}>
      <HeartIcon />
      <div className={s.break} />
      <span className={s.likesNumber}>{likes}</span>
    </div>
  );
}
