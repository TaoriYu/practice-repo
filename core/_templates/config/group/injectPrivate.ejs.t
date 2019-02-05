---
inject: true
to: <%= h.projectRoot %>/config/appConfig.ts
after: serverRuntimeConfig
---
    <%= h.lcFirst(name) %>: {},