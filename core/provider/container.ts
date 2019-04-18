import { Container } from 'inversify';

// Only needed in development mode. To prevent code reloading by HMR;
if (!global.__container) {
  global.__container = new Container();
}

export const container = global.__container;
