---
to: <%= cwd %>/<%= h.ucFirst(name) %>/<%= h.ucFirst(name) %>.tsx
---
import * as React from 'react';
import * as styles from './<%= h.lcFirst(name) %>.less';

<% if (typeof pure === "undefined") { -%>
export function <%= h.ucFirst(name) %>() {
  return (
    <div className={styles.style} />
  );
}
<% } %>
<% if (typeof pure !== "undefined") { -%>
export class <%= h.ucFirst(name) %> extends React.PureComponent {
  public render() {
    return (
      <div className={styles.style} />
    );
  }
}
<% } %>
