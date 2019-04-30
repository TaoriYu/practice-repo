/* tslint:disable:no-console */
require('core-js/features/reflect');
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const states = {
  dev: process.env.NODE_ENV !== 'production',
  prod: process.env.NODE_ENV === 'production',
};
const PORT = process.env.NODE_PORT || 3000;
const HOST = process.env.NODE_HOST || '0.0.0.0';

const app = next({ dev: states.dev });
const handle = app.getRequestHandler();
console.log(`[ wait ]  starting the development server ...`);
app.prepare().then(() => {
  createServer((req, res) => {
    let parsedUrl = parse(req.url, true);

    handle(req, res, parsedUrl);
  }).listen(PORT, HOST, err => {
    if (err) { throw err; }
    console.log(`[ event ]  Ready on http://${HOST}:${PORT}`);
  });
});
