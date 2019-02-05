---
to: <%= cwd %>/<%= h.ucFirst(name) %>.tsx
---
import * as React from 'react';

export interface I<%= h.ucFirst(name) %>Props {
  children?: React.ReactNode;
}
<% if (!pure) { -%>
export function <%= h.ucFirst(name) %>({ children }: I<%= h.ucFirst(name) %>Props) {
  return (
    <div className={styles.style}>{children}</div>
  );
}
<% } %>
<% if (pure) { -%>
export class <%= h.ucFirst(name) %> extends React.PureComponent<I<%= h.ucFirst(name) %>Props>{
  public render() {
    const { children } = this.props;
    return (
      <div className={styles.style}>{children}</div>
    );
  }
}
<% } %>
