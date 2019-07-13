import * as React from 'react';
import s from './userInfo.less';

interface IUserInfoProps {
  name: string;
  username: string;
  avatarUrl?: string;
}

export function UserInfo({ name, username, avatarUrl }: IUserInfoProps) {
  return (
    <div className={s.user}>
      {avatarUrl &&
        <img src={avatarUrl} alt="photo of the author of picture" className={s.avatar} />
      }
      <span className={s.name}>{`${name} aka ${username}`}</span>
    </div>
  );
}
