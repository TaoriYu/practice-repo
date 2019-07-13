import * as React from 'react';
import { useIntersectionObserver } from '../../../utils/reactHooks/useIntersectionObserver';
import { IImageCard } from './imageCard.interdace';
import s from './imageCard.less';
import { Likes } from './Likes';
import { UserInfo } from './UserInfo';
import { range } from 'ramda';

const threshold: number[] = range(0.01, 100).map((_n, i) => i / 100);

export function ImageCard({ user, likes, urls, altDescription }: IImageCard) {
  const [visible, setVisibility] = React.useState(true);
  const [ref, registerCallback] =
    useIntersectionObserver<HTMLLIElement>({ threshold, rootMargin: '100px' });
  registerCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach(({ intersectionRatio }) => {
      setVisibility(intersectionRatio > 0);
    });
  });

  return (
    <li className={s.card} ref={ref}>
      {visible &&
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
      }
    </li>
  );
}
