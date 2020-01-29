/*
 * File: /Users/origami/Desktop/edugoMobile/src/utils/xeno/xeno.ts
 * Project: /Users/origami/Desktop/edugoMobile
 * Created Date: Friday June 21st 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Friday June 21st 2019 3:33:57 pm
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import { Subject } from 'rxjs';
import { filter, take, pluck } from 'rxjs/operators';
import { XenoPayloads, XenoPipeline, XENO_EVENT } from './types';
// export type XENO_EVENT = keyof XenoPayloads;
const MAIN = new Subject<XenoPipeline>();

export type XENO_E = keyof XenoPayloads;

function next<N extends XENO_E = keyof XenoPayloads>(eventName: N, params: XenoPayloads[N]) {
  MAIN.next({
    eventName,
    source: 'sender',
    params,
  });
}

function on<E extends XENO_E>(eventName: E) {
  return MAIN.pipe(
    // filter(o => o.source !== 'sender'),
    filter(o => o.eventName === eventName),
    pluck('params'),
  );
}

function once<E extends XENO_E>(eventName: E) {
  return on(eventName).pipe(take(1));
}

export { next, on, once, XENO_EVENT };
