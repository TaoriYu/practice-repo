---
to: <%= h.projectRoot %>/stores/<%= h.lcFirst(name) %>/<%= h.lcFirst(name) %>.store.ts
---
<% storeName = h.ucFirst(name) -%>
import { OApiFactory } from '../../core/api';
import { makeStore } from '../../core/provider';

@makeStore(<%= storeName %>Store)
export class <%= storeName %>Store {
  // TODO rename me
  private readonly getData = OApiFactory(/* place your config here */);
}
