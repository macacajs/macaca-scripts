#!/usr/bin/env node

'use strict';

const {
  EOL
} = require('os');
const fs = require('fs');
const _ = require('xutil');
const path = require('path');
const child_process = require('child_process');

const {
  chalk
} = _;

const pkg = require('./package');

const command = process.argv.pop();
const commandFile = `${command}.sh`;

const scriptsDir = path.join(__dirname, 'scripts');

const fileList = _.filter(fs.readdirSync(scriptsDir), item => {
  return path.extname(item) === '.sh';
});

const printCommandList = (list) => {
  list.forEach(item => {
    console.log(`${chalk.cyan('$')} ${chalk.cyan(pkg.name)} ${chalk.cyan(item.replace('.sh', ''))} => ${path.resolve(scriptsDir, item)}`);
  });
  console.log(EOL);
};

if (!!~fileList.indexOf(commandFile)) {
  const script = path.join(scriptsDir, commandFile);

  let p = child_process.spawn(script, [], {
    cwd: process.cwd(),
    env: _.merge({}, process.env)
  });

  p.stdout.setEncoding('utf8');
  p.stderr.setEncoding('utf8');

  p.stdout.on('data', data => {
    console.log(data);
  });

  p.stderr.on('data', data => {
    console.log(data);
  });

  p.on('error', err => {
    console.log(err);
  });
} else {
  console.log(`${EOL}command ${chalk.yellow(command)} not support${EOL}`);
  printCommandList(fileList);
}
