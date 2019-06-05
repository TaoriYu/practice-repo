---
to: <%= cwd %>/<%= h.ucFirst(name) %>.tsx
---
import * as React from 'react';

<% if (typeof pure === "undefined") { -%>
export function <%= h.ucFirst(name) %>() {
  return (
    <div />
  );
}
<% } %>
<% if (typeof pure !== "undefined") { -%>
export class <%= h.ucFirst(name) %> extends React.PureComponent {
  public render() {
    return (
      <div />
    );
  }
}
<% } %>
