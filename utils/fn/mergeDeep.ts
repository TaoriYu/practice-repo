/**
 * Simple object check.
 */
export function isObject<T>(item: T | object): item is object {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Deep merge two objects.
 */
export function mergeDeep<T, E>(target: T, ...sources: E[]): T & E {
  if (!sources.length) { return target as T & E; }
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(target, { [key]: {} });
        }
        mergeDeep(target[key as unknown as keyof T], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}
