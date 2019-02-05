---
to: ./<%= h.lcFirst(name) %>.entity.ts
---
<% hasApi = typeof withApi !== "undefined" -%>
<% if (hasApi) { -%>
import { Api } from '../api';
<% } -%>

export class <%= h.ucFirst(name) %> <%= hasApi ? 'extends Api ' : '' %>{

}
