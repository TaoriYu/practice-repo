---
to: <%= h.projectRoot %>/config/<%= to %>/<%= h.lcFirst(name) %>.ts
---
import { I<%= h.ucFirst(to) %> } from '../config.interface';
import { IWithEnv } from '../../core/config';

export const <%= h.lcFirst(name) %>: IWithEnv<I<%= h.ucFirst(to) %>> = {
  dev: {
    public: false,
  },
  production: {
    public: false,
  },
}
