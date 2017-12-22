#!/bin/bash
name=$(git describe --always)
eval "$(ssh-agent -s)"
chmod 600 .travis/github_deploy_key
ssh-add .travis/github_deploy_key
rm -rf deploy
mkdir -p deploy
git clone --depth 1 git@github.com:ComplexCurves/website.git deploy || exit 1
(
    cd deploy
    git fetch origin gh-pages
    git checkout FETCH_HEAD
    git checkout -b gh-pages
    echo "complexcurves.org" >CNAME
    rm -rf dist images models favicon.ico index.html README.md
    cp -R ../dist ../images ../models ../favicon.ico ../index.html ../README.md ./
    git add -A
    git config user.name "Travis CI"
    git config user.email "travis-ci@complexcurves.org"
    git commit -m "Deployment of website ${name}"
    git push git@github.com:ComplexCurves/website.git gh-pages:gh-pages
)
