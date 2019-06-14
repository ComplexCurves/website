#!/bin/bash
rm -rf deploy
mkdir -p deploy
cp -R dist images models favicon.ico index.html README.md deploy/
