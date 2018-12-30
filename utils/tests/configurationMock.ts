import { AxiosRequestConfig } from 'axios';

export function configurationMock() {
  process.env = Object.assign(
    process.env,
    {
      SERVER_CONFIG: JSON.stringify({
        publicRuntimeConfig: {
          apis: {
            defaultApi: {
              baseURL: 'http://test.url/',
              timeout: 200,
              public: true,
              adapter: (config: AxiosRequestConfig) => Promise.resolve({
                data: 'data',
                status: 200,
                statusText: 'OK',
                headers: [],
                config,
              }),
            },
          },
        },
        serverRuntimeConfig: {},
      }),
    },
  );
}

configurationMock();
