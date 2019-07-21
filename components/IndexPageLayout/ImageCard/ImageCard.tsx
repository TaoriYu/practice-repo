import * as React from 'react';
import { useIntersectionObserver } from '../../../utils/reactHooks/useIntersectionObserver';
import { IImageCard } from './imageCard.interdace';
import s from './imageCard.less';
import { Likes } from './Likes';
import { UserInfo } from './UserInfo';
import classNames from 'classnames';

export function ImageCard({ user, likes, urls, altDescription }: IImageCard) {
  const [visible, setVisibility] = React.useState(false);
  const [ref, registerCallback] =
    useIntersectionObserver<HTMLLIElement>({ threshold: [0.1], rootMargin: '50px' });
  registerCallback((entries: IntersectionObserverEntry[]) => {
    setVisibility(entries[0].intersectionRatio > 0);
  });

  return (
    <li className={classNames(s.listItem, !visible && s.fakeHeight)} ref={ref}>
      {visible &&
        <div className={s.card}>
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
              <img srcSet={urls.thumb} alt={altDescription} className={s.image} />
            </div>
          </div>
        </div>
      }
    </li>
  );
}
