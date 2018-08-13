#!/usr/bin/env bash

rm -rf build
rm -rf cache
rm -rf node_modules
npm i

cd src
rm -rf node_modules
npm i

cd ../
gulp rebuild:64