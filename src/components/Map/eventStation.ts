import { IApartment, IMetroStationClient } from '@/types';

export enum MapEvents {
  ON_PRESS_MARKER = 'ON_PRESS_MARKER',
  ADD_MARKER = 'ADD_MARKER',
  CLEAN_MARKER = 'CLEAN_MARKER',
}

type Payload =
  | { apartment: IApartment | IApartment[]; type: 'apartment' }
  | { station: IMetroStationClient | IMetroStationClient[]; type: 'station' };
export interface MapPayloads {
  [MapEvents.ON_PRESS_MARKER]:
    | {
        apartment: IApartment;
        type: 'apartment';
      }
    | { type: 'station'; station: IMetroStationClient };
  [MapEvents.ADD_MARKER]: Payload;
  [MapEvents.CLEAN_MARKER]: Payload;
}
