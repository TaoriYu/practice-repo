const debug = require('debug')('config');
const fs = require('fs');
const path = require('path');

/**
 * Так как config пишется на ts пере использованием его надо странспилировать в js
 * @returns { IConfig }
 */
module.exports = function compileConfig() {
  const spawnSync = require('child_process').spawnSync;
  const { stdout } = spawnSync('tsc', ['-b', '--force', './config/']);

  debug(stdout.toString());

  if (stdout.toString().match('error')) {
    throw new Error(stdout.toString());
  } else {
    debug('configuration compiled successfully')
  }
  const appConfig = require(`./dist/config.js`).appConfig;
  const appConfigJson = JSON.stringify(appConfig);
  const appPublicConfigJson = JSON.stringify({ publicRuntimeConfig: appConfig.publicRuntimeConfig });

  debug(appConfig);
  fs.writeFileSync(
    path.join(__dirname, './dist/config.private.json'),
    appConfigJson
  );
  fs.writeFileSync(
    path.join(__dirname, './dist/config.public.json'),
    appPublicConfigJson
  );
};
