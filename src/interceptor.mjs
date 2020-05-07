import LineParser from "./line-parser.mjs";
import { Interceptor } from "@kronos-integration/interceptor";

/**
 * This interceptor cares about the handling of the messages.
 * It will add the hops and copies the messages
 */
export class LineParserInterceptor extends Interceptor {
  static get name() {
    return "line-parser";
  }

  async receive(endpoint, next, request) {
    const streamFilter = new LineParser(this, true);
    return next(request.pipe(streamFilter));
  }
}

export default LineParserInterceptor;
