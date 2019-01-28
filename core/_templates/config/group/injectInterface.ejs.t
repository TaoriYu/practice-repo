---
inject: true
to: <%= h.projectRoot %>/config/config.interface.ts
append: true
---
export interface I<%= h.ucFirst(name) %> extends IWithPublic {
  // TODO: Write your stuff here
}