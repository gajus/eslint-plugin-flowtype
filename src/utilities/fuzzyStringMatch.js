import _ from 'lodash';

/**
 * Creates an array of letter pairs from a given an array
 * https://github.com/d3/d3-array/blob/master/src/pairs.js
 *
 * @param {any} array
 * @returns array
 */
/* eslint-disable */
function d3ArrayPairs (array) {
  var i = 0, n = array.length - 1, p = array[0], pairs = new Array(n < 0 ? 0 : n);
  while (i < n) pairs[i] = [p, p = array[++i]];
  return pairs;
};
/* eslint-enable */

export default (needle, haystack, weight = 0.5) => {
  // Based on http://stackoverflow.com/a/23305385

  const stringSimilarity = (str1, str2) => {
    if (str1.length > 0 && str2.length > 0) {
      const pairs1 = d3ArrayPairs(str1);
      const pairs2 = d3ArrayPairs(str2);
      const unionLen = pairs1.length + pairs2.length;
      let hitCount;

      hitCount = 0;

      _.forIn(pairs1, (val1) => {
        _.forIn(pairs2, (val2) => {
          if (_.isEqual(val1, val2)) {
            hitCount++;
          }
        });
      });

      if (hitCount > 0) {
        return 2.0 * hitCount / unionLen;
      }
    }

    return 0.0;
  };

  return stringSimilarity(needle, haystack) >= Number(weight);
};
