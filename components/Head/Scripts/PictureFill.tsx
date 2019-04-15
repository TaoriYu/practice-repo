import * as React from 'react';

interface IPictureFillProps {
  /**
   * Признак обеспечивает работу алгоритма saveData, который автоматически
   * отклоняет выбор ресурса х2 х3 для маленьких изображений, для которых
   * визуальной разницы в изображении не будет, либо она будет незначительной.
   * Этот алгоритм должен срабатывать в ситуациях, в которых нужно сохранить
   * performance. Технология экспериментальная.
   * http://scottjehl.github.io/picturefill/
   */
  saveData?: boolean;
}

export function PictureFill({ saveData }: IPictureFillProps) {
  if (saveData) {
    window.picturefillCFG = window.picturefillCFG || [];
    window.picturefillCFG.push([ 'algorithm', 'saveData' ]);
  }

  return (
    <script src="../../../static/vendor/picturefill.min.js" />
  );
}
