---
to: <%= h.projectRoot %>/stores/<%= h.lcFirst(name) %>/dto/index.ts
---
export * from './<%= h.ucFirst(name) %>.dto';
