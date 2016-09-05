#!/bin/bash
set -ex

if [[ $TRAVIS_PULL_REQUEST != "false" ]]; then
  echo 'This is a pull request. Exiting the release script.'

  exit 0
fi

if [[ -n $TRAVIS_TAG ]]; then
  echo 'This is a tag release.'

  # Use NPM_TOKEN to enable NPM authentication
  set +x
  echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > ~/.npmrc
  set -x

  NODE_ENV=development npm install
  NODE_ENV=production npm run build

  npm publish
  exit 0
fi

if [[ $TRAVIS_BRANCH != "master" ]]; then
  echo 'This is not a master branch. Exiting the release script.'

  exit 0
fi

if [[ $(git log --format=%B -n 1 $TRAVIS_COMMIT) == *"chore: release"* ]]; then
  echo 'This is a tag release. Exiting the release script.'

  exit 0
fi;

git config --global user.name 'continuous-deployment'
git config --global user.email 'continuous-deployment@travis'

# Use GITHUB_TOKEN to enable GitHub authentication
git config credential.helper "store --file=.git/credentials"
set +x
echo "https://${GITHUB_TOKEN}:@github.com" > .git/credentials
set -x

git checkout master
git merge $TRAVIS_COMMIT

# Generate ./README.md from ./.README/README.md template.
npm run documentation

git add ./README.md
git diff-index --quiet HEAD ./README.md || git commit --no-verify -m 'docs: update documentation' ./README.md

# 1. bump the package.json version (based on your commit history)
# 2. update CHANGELOG.md
# 3. commit package.json and CHANGELOG.md
# 4. tag the release
standard-version --no-verify --message "chore: release %s"

git push --follow-tags origin master
