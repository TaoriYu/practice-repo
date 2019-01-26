#! /usr/bin/env node
const spawn = require('child_process').spawn;
const path = require('path');
const openBrowser = require('./openBrowser');

function runJest() {
  const coverage = spawn('jest', ['--coverage'], { stdio: 'inherit' });
  coverage.on('close', () => {
    const pathToCov = path.resolve('./coverage/lcov-report/index.html');
    openBrowser('file://' + pathToCov);
    process.exit(0);
  });
}

runJest();
