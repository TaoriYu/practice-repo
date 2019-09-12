import * as React from 'react';
import { useIntersectionObserver } from '../../../utils/reactHooks/useIntersectionObserver';

interface IPaginatorProps {
  paginateAction(): void;
}

export function Paginator({ paginateAction }: IPaginatorProps) {
  const [ref, registerCallback] =
    useIntersectionObserver<HTMLDivElement>({ threshold: [1], rootMargin: '50px 0px 0px 0px' });

  registerCallback((entries) => {
    if (entries[0].isIntersecting) {
      paginateAction();
    }
  });

  return (
    <div ref={ref} />
  );
}
