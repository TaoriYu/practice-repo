import * as React from 'react';
import s from './likes.less';

interface ILikesProps {
  likes: number;
}

export function Likes({ likes }: ILikesProps) {
  return (
    <div className={s.likes}>
      <div style={{ width: 16, height: 16, backgroundColor: 'grey' }} />
      <span>{likes}</span>
    </div>
  );
}
