---
inject: true
to: <%= h.projectRoot %>/config/appConfig.ts
after: publicRuntimeConfig
---
    <%= h.lcFirst(name) %>: {},