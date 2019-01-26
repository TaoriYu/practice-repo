import * as faker from 'faker';

export const publicConfigMock = () => ({
  publicRuntimeConfig: {
    api: {
      testApi: {
        url: faker.internet.url(),
        timeout: faker.random.number(1000),
      },
    },
  },
  serverRuntimeConfig: {},
});

export const privateConfigMock = () => ({
  publicRuntimeConfig: {},
  serverRuntimeConfig: {
    env: {
      system: {
        name: faker.name.firstName(),
      },
    },
  },
});

export const fullConfigMock = () => ({
  publicRuntimeConfig: {
    api: {
      testApi: {
        url: faker.internet.url(),
        timeout: faker.random.number(1000),
      },
    },
  },
  serverRuntimeConfig: {
    env: {
      system: {
        name: faker.name.firstName(),
      },
    },
  },
});
