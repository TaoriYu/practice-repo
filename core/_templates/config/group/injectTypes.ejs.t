---
inject: true
to: <%= h.projectRoot %>/config/config.interface.ts
after: export interface IConfigFields extends TReturnConfigGroup<IConfigFields> {
skip_if: <%= h.lcFirst(name) %>. IConfigGroup<unknown>;
---
  <%= h.lcFirst(name) %>: IConfigGroup<I<%= h.ucFirst(name) %>>;