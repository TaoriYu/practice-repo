---
message: |
  - hygen {bold store new} --name [NAME]
    generates new store in a {red stores root directory} with predefined class and DTO
  - hygen {bold store entity} --name [NAME]
    generate new plain class file in a {bold current} directory. Also inject references in
    the index.ts file (if exists)
  - hygen {bold store dto} --name [NAME]
    generate a plain DTO class with the example data. Also inject refs in index.ts file
---