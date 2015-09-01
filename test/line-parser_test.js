/* global describe, it, beforeEach */
/* jslint node: true, esnext: true */

"use strict";

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();

const fs = require('fs');
const read = fs.createReadStream;
const path = require('path');

const lp = require('../lib/line-parser');

describe('attributes', function() {
	it('has a description', function(done) {

		collect('simple_file.csv', verify);

		function verify(err, lines) {
			assert.false(err);

			assert.deepEqual(lines[0], {
				"lineNumber": 0,
				"data": "a,b,c"
			});
			assert.deepEqual(lines[1], {
				"lineNumber": 0,
				"data": "as,ä,wd"
			});
			assert.deepEqual(lines[2], {
				"lineNumber": 0,
				"data": "ll,ö,sde"
			});
			done();
		}


	});
});



/**
 * Returns the path to the given test file name.
 */
function fixture(name) {
	return path.join(__dirname, 'fixtures', name);
}

function collect(file, opts, cb) {
	if (typeof opts === 'function') return collect(file, null, opts);
	var data = read(fixture(file));
	var lines = [];
	var parser = lp(opts);
	data.pipe(parser)
		.on('data', function(line) {
			lines.push(line);
		})
		.on('error', function(err) {
			cb(err, lines);
		})
		.on('end', function() {
			cb(false, lines);
		});
	return parser;
}
