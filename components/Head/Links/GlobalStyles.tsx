import * as React from 'react';
import style from '../../Less/global.critical.less';

/* Тут расположены критичные ЦСС они инлайнятся в html и пользователь получает их немедленно */
export function GlobalStyles() {
  return (
    <style type="text/css">
      {minify(style.toString())}
    </style>
  );
}

function minify(css: string) {
  return css.replace(/\n|\r|(\s\s)/g, '');
}
