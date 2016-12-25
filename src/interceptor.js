/* jslint node: true, esnext: true */
'use strict';


const LineParserFactory = require('../src/line-parser');

import {
	Interceptor
}
from 'kronos-interceptor';

/**
 * This interceptor cares about the handling of the messages.
 * It will add the hops and copies the messages
 */
class LineParserInterceptor extends Interceptor {

	static get name() {
		return 'line-parser';
	}

	receive(request, oldRequest) {
		if (request.payload) {
			const streamFilter = LineParserFactory(this.config.config, true);
			const stream = request.payload;
			request.payload = stream.pipe(streamFilter);
		}
		return this.connected.receive(request, oldRequest);
	}
}

function registerWithManager(manager) {
	return manager.registerInterceptor(LineParserInterceptor);
}

export {
	registerWithManager,
	LineParserInterceptor
};
