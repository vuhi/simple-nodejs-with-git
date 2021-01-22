#!/bin/bash
pm2 describe simple-nodejs > /dev/null
RUNNING=$?

if [ "${RUNNING}" -ne 0 ]; then
  pm2 start ./src/index.js --name simple-nodejs
else
  pm2 restart simple-nodejs
fi;