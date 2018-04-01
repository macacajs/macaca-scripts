#!/bin/bash

git clone https://github.com/macaca-sample/sample-nodejs.git --depth=1
cd sample-nodejs

npm i
npm run test:android
