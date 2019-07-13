// tslint:disable:file-name-casing
import * as React from 'react';

export function assignKey(nodes: JSX.Element[]) {
  return nodes.map((node, i) => React.cloneElement(node, { key: i }));
}
