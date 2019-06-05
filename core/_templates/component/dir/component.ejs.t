---
to: <%= cwd %>/<%= h.ucFirst(name) %>/<%= h.ucFirst(name) %>.tsx
---
import * as React from 'react';
import * as styles from './<%= h.lcFirst(name) %>.less';

export interface I<%= h.ucFirst(name) %>Props {
  children?: React.ReactNode;
}
<% if (typeof pure === "undefined") { -%>
export function <%= h.ucFirst(name) %>({ children }: I<%= h.ucFirst(name) %>Props) {
  return (
    <div className={styles.style}>{children}</div>
  );
}
<% } %>
<% if (typeof pure !== "undefined") { -%>
export class <%= h.ucFirst(name) %> extends React.PureComponent<I<%= h.ucFirst(name) %>Props>{
  public render() {
    const { children } = this.props;
    return (
      <div className={styles.style}>{children}</div>
    );
  }
}
<% } %>
