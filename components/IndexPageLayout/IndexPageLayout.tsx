import * as React from 'react';
import s from './indexPageLayout.less';

export function IndexPageLayout() {
  return (
    <section role="list of photos section" className={s.photosList}>
      <div
        style={{
          height: 5000,
          width: '100%',
          background: 'linear-gradient(to bottom, powderblue, lightpink)',
        }}
      />
    </section>
  );
}
