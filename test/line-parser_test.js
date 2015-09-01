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
	var parser = csv(opts);
	data.pipe(parser)
		.on('data', function (line) {
			lines.push(line);
		})
		.on('error', function (err) {
			cb(err, lines);
		})
		.on('end', function () {
			cb(false, lines);
		});
	return parser;
}
