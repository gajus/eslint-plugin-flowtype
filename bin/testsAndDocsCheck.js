/**
 * This script checks if there is test suite and documentation for every rule and if they are correctly included in corresponding "index" files.
 *
 * Performed checks:
 *
 *   - tests
 *     - file `/tests/rules/assertions/<rule>.js` exists
 *     - rule is included in `reportingRules` variable in `/tests/rules/index.js`
 *
 *   - docs
 *     - file `/.README/rules/<rule>.md` exists
 *     - file `/.README/rules/<rule>.md` contains correct assertions placeholder (`<!-- assertions ... -->`)
 *     - rule is included in gitdown directive in `/.README/README.md`
 *     - rules in `/.README/README.md` are alphabetically sorted
 */

import path from 'path';
import fs from 'fs';
import glob from 'glob';
import _ from 'lodash';

// returns Array<[camelCase, kebab-case]>
const getRules = () => {
  const rulesFiles = glob.sync(path.resolve(__dirname, '../src/rules/*.js'));

  const rulesNames = rulesFiles.map((file) => {
    return path.basename(file, '.js');
  }).map((name) => {
    return [name, _.kebabCase(name)];
  });

  return rulesNames;
};

const isFile = (filepath) => {
  try {
    return fs.statSync(filepath).isFile();
  } catch (error) {
    return false;
  }
};

const windows = (array, size) => {
  const output = [];

  for (let ii = 0; ii < array.length - size + 1; ii++) {
    output.push(array.slice(ii, ii + size));
  }

  return output;
};

const getTestIndexRules = () => {
  const content = fs.readFileSync(path.resolve(__dirname, '../tests/rules/index.js'), 'utf-8');

  const result = content.split('\n').reduce((acc, line) => {
    if (acc.inRulesArray) {
      if (line === '];') {
        acc.inRulesArray = false;
      } else {
        acc.rules.push(line.replace(/^\s*'([^']+)',?$/, '$1'));
      }
    } else if (line === 'const reportingRules = [') {
      acc.inRulesArray = true;
    }

    return acc;
  }, {
    inRulesArray: false,
    rules: []
  });

  const rules = result.rules;

  if (rules.length === 0) {
    throw new Error('Tests checker is broken - it could not extract rules from test index file.');
  }

  return rules;
};

const getDocIndexRules = () => {
  const content = fs.readFileSync(path.resolve(__dirname, '../.README/README.md'), 'utf-8');

  const rules = content.split('\n').map((line) => {
    const match = /^{"gitdown": "include", "file": "([^"]+)"}$/.exec(line);

    if (match === null) {
      return null;
    } else {
      return match[1].replace('./rules/', '').replace('.md', '');
    }
  }).filter((rule) => {
    return rule !== null;
  });

  if (rules.length === 0) {
    throw new Error('Docs checker is broken - it could not extract rules from docs index file.');
  }

  return rules;
};

const hasCorrectAssertions = (docPath, name) => {
  const content = fs.readFileSync(docPath, 'utf-8');

  const match = /<!-- assertions ([a-zA-Z]+) -->/.exec(content);

  if (match === null) {
    return false;
  } else {
    return match[1] === name;
  }
};

const checkTests = (rulesNames) => {
  const testIndexRules = getTestIndexRules();

  const invalid = rulesNames.filter((names) => {
    const testExists = isFile(path.resolve(__dirname, '../tests/rules/assertions', names[0] + '.js'));
    const inIndex = testIndexRules.indexOf(names[1]) !== -1;

    return !(testExists && inIndex);
  });

  if (invalid.length > 0) {
    const invalidList = invalid.map((names) => {
      return names[0];
    }).join(', ');

    throw new Error(
      'Tests checker encountered an error in: ' + invalidList + '. ' +
      'Make sure that for every rule you created test suite and included the rule name in `tests/rules/index.js` file.'
    );
  }
};

const checkDocs = (rulesNames) => {
  const docIndexRules = getDocIndexRules();

  const sorted = windows(docIndexRules, 2).every((chunk) => {
    return chunk[0] < chunk[1];
  });

  if (!sorted) {
    throw new Error('Rules are not alphabetically sorted in `.README/README.md` file.');
  }

  const invalid = rulesNames.filter((names) => {
    const docPath = path.resolve(__dirname, '../.README/rules', names[1] + '.md');
    const docExists = isFile(docPath);
    const inIndex = docIndexRules.indexOf(names[1]) !== -1;
    const hasAssertions = docExists ? hasCorrectAssertions(docPath, names[0]) : false;

    return !(docExists && inIndex && hasAssertions);
  });

  if (invalid.length > 0) {
    const invalidList = invalid.map((names) => {
      return names[0];
    }).join(', ');

    throw new Error(
      'Docs checker encountered an error in: ' + invalidList + '. ' +
      'Make sure that for every rule you created documentation file with assertions placeholder in camelCase ' +
      'and included the file path in `.README/README.md` file.'
    );
  }
};

const rulesList = getRules();

checkTests(rulesList);
checkDocs(rulesList);
