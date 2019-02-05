---
to: <%= h.projectRoot %>/stores/<%= h.lcFirst(name) %>/<%= h.lcFirst(name) %>.store.ts
---
<% storeName = h.ucFirst(name) -%>
import { inject } from 'inversify';
import { Api } from '../../core/api';
import { TApiFactory } from '../../di/bindings/bindApiService';
import { makeStore } from '../../core/provider';

@makeStore(<%= storeName %>Store)
export class <%= storeName %>Store {
  private readonly getData: Api;

  public constructor(@inject(TApiFactory) apiFactory: TApiFactory ) {
    this.getData = apiFactory(/* TODO: Bring your config here */);
  }
}
