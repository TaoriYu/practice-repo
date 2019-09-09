// tslint:disable:no-null-keyword
import React from 'react';
import { merge } from 'ramda';

type TIntersectionObserverHook<T> = [
  React.RefObject<T>, (cb: IntersectionObserverCallback) => void
];

/**
 * Реакт хук, который предоставляет интерфейс для работы с IntersectionObserver. Подеробнее о том,
 * что такое IntersectionObserver - https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
 * TL;DR: IntersectionObserver это новое удобное апи контроля того, что один элемент пересекает другой
 * (включить анимацию, когда доскролливаем до определенного сегмента; бесконечный скролл и т.д. и т.п.).
 * useIntersectionObserver работает как обычный реакт хук:
 * @param options - это опции настройки IntersectionObserver. В них можно передать:
 * root - элемент, с которым пересечётся target (за которым мы следим) элемент. По умолчанию это viewport.
 * rootMargin - служит для того, чтобы увеличивать или уменьшать каждую сторону bbox'a рута перед вычислением
 * пересечений. По умолчанию 0px
 * threshold - массив значений, от 0 до 1, в которых будет прокать колбэк. Например, если мы хотим, чтобы наш колбэк
 * срабатывал каждые 25% видимости target элемента, нужно просетить такой массив: [0, 0.25, 0.5, 0.75, 1]. По
 * умолчанию [].
 * @returns [ref, registerCallback] - возвращает массив из двух элементов:
 * ref - это реф таргет элемента;
 * registerCallback - функция, которая принимает колбэк и регистрирует его в списке колбэков. Такой подход
 * обеспечивает возможность подключения нескольких колбэков к одному обзёрверу.
 *
 * Как его использовать?
 * Предположим, что мы хотим сделать некий блок зелёного цвета, у которого будет меняться прозрачность по правилу:
 * если блок полностью показыватеся во viewport, то opacity: 1, если блок полностью скрылся - то 0.
 *
 * // подготовим массив threshold - мы хотим, чтобы шаг срабатывания коллбэка был 0.01, соответственно создадим 100
 * // значений
 * const threshold: number[] = range(0.01, 100).map((_n, i) => i / 100);
 *
 * export function GreenBlock() {
 *   // используем хук useState, чтобы получить состояние opacity и функцию, которая может его менять
 *   const [ratio, setRatio] = React.useState(1);
 *   // используем хук useIntersectionObserver, чтобы получить ref и registerCallback, чтобы зарегистрировать
 *   // наш коллбэк. Передадим в useIntersectionObserver наш сгенерированный массив threshold.
 *   const [ref, registerCallback] = useIntersectionObserver<HTMLDivElement>({ threshold });
 *   // вызовем registerCallback и передадим ему функцию, которая принимает entries (массив объектов, который нам
 *   // предоставляет IntersectionObserver) и для каждой entry сетим в наш стейт значение intersectionRatio.
 *   // Таким образом opacity будет меняться в зависимости от вхождения таргета во viewport с шагом 0.01
 *   registerCallback((entries: IntersectionObserverEntry[]) => {
 *     entries.forEach(pipe(prop('intersectionRatio'), setRatio));
 *   });
 *
 *   return (
 *     <div ref={ref} style={{ backgroundColor: `rgba(50, 205, 0, ${ratio})` }}>
 *       some square
 *     </div>
 *   );
 * }
 *
 */

const defaultOptions: IntersectionObserverInit = {
  root: null, // элемент, с которым пересекается target; по умолчанию viewport
  rootMargin: '0px', // margin для рута
  threshold: [], // позиции, при пересечении которах происходит вызов колбэка
};

export function useIntersectionObserver<T extends HTMLElement>(options: IntersectionObserverInit): TIntersectionObserverHook<T> {
  const ref = React.useRef<T>(null);
  const callbacks: Set<IntersectionObserverCallback> = new Set();
  const registerCallback = (cb: IntersectionObserverCallback) => { callbacks.add(cb); };
  const runCallbacks = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    callbacks.forEach((cb) => cb(entries, observer));
  };
  let observerInstance: IntersectionObserver;

  React.useEffect(() => {
    observerInstance = new IntersectionObserver(runCallbacks, merge(defaultOptions, options));

    if (ref.current) {
      observerInstance.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observerInstance.unobserve(ref.current);
      }
      callbacks.clear();
    };
  });

  return [ref, registerCallback];
}
