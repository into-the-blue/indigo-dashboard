import { MapEvents, MapPayloads } from '@/components/Map/eventStation';

export enum DEFAULT_EVENTS {
  USER_LOGIN = 'USER_LOGIN',
}

export const XENO_EVENT = {
  ...MapEvents,
};

export interface XenoPayloads extends MapPayloads {}
export interface XenoPipeline<N extends keyof XenoPayloads = keyof XenoPayloads> {
  eventName: N;
  source: 'sender' | 'listener';
  params: XenoPayloads[N];
}
