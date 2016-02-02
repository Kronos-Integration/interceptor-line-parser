/* jslint node: true, esnext: true */
"use strict";

const Interceptor = require('kronos-interceptor').Interceptor;
const parserFactory = require('./line-parser');

/**
 * This interceptor cares about the handling of the messages.
 * It will add the hops and copies the messages
 */
class LineParserInterceptor extends Interceptor {

	static get name() {
		return "line-parser";
	}

	get type() {
		return LineParserInterceptor.name;
	}

	receive(request, oldRequest) {
		if (request.payload) {
			const streamFilter = parserFactory(this.config, true);
			const stream = request.payload;
			request.payload = stream.pipe(streamFilter);
		}
		return this.connected.receive(request, oldRequest);
	}
}

exports.Interceptor = LineParserInterceptor;
