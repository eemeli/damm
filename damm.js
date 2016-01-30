/**
 * Damm check digit algorithm
 *
 * Detects all single-digit errors and adjacent transposition errors
 *
 * https://github.com/eemeli/damm
 * https://en.wikipedia.org/wiki/Damm_algorithm
 *
 *
 * The MIT License (MIT)
 *
 * Modifications: Copyright (c) 2016 Eemeli Aro <eemeli@gmail.com>
 * Original: Copyright (c) 2013 Ion Drive Software Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var table = [
  [0, 3, 1, 7, 5, 9, 8, 6, 4, 2],
  [7, 0, 9, 2, 1, 5, 4, 8, 6, 3],
  [4, 2, 0, 6, 8, 7, 1, 3, 5, 9],
  [1, 7, 5, 0, 9, 8, 3, 4, 2, 6],
  [6, 1, 2, 3, 0, 4, 5, 9, 7, 8],
  [3, 6, 7, 4, 2, 0, 9, 5, 8, 1],
  [5, 8, 6, 9, 7, 2, 0, 1, 3, 4],
  [8, 9, 4, 5, 3, 6, 2, 0, 1, 7],
  [9, 4, 3, 8, 6, 1, 7, 2, 0, 5],
  [2, 5, 8, 1, 4, 3, 6, 7, 9, 0]
];

/**
 * Generates a Damm algorithm check digit for the input
 *
 * @param {number} input The source value
 * @return {string} The Damm algorithm check digit
 * @customfunction
 */
function damm_generate(input) {
  if (input && input.map) return input.map(damm_generate);
  if (input === '') return '';
  if (typeof input === 'number' && isFinite(input) && Math.floor(input) === input) {
    input = input.toString();
  } else if (typeof input !== 'string') {
    throw new Error('Input must be a string.');
  }
  if (!input.match(/^\d+$/)) {
    throw new Error('Input must only contain digits.');
  }

  var row = 0;
  for(var i = 0; i < input.length; i++) {
    var col = input.charAt(i);
    row = table[row][col];
  }
  return row.toString();
}

/**
 * Appends a Damm algorithm check digit to the input
 *
 * @param {number} input The source value
 * @return {string} Input string concatenated with the check digit
 * @customfunction
 */
function damm_append(input) {
  if (input && input.map) return input.map(damm_append);
  if (input === '') return '';
  return input + damm_generate(input);
}

/**
 * Verifies that the input's Damm algorithm check digit is valid
 *
 * @param {number} input A value with a check digit
 * @return {boolean} True if the input is valid
 * @customfunction
 */
function damm_verify(input) {
  if (input && input.map) return input.map(damm_verify);
  return damm_generate(input) === '0';
}

if (typeof exports == 'object') {
  exports.generate = damm_generate;
  exports.append = damm_append;
  exports.verify = damm_verify;
}
