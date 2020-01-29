import { IApartment } from '@/types';

export enum MapEvents {
  ON_PRESS_MARKER = 'ON_PRESS_MARKER',
  ADD_MARKER = 'ADD_MARKER',
  CLEAN_MARKER = 'CLEAN_MARKER',
}

export interface MapPayloads {
  [MapEvents.ON_PRESS_MARKER]: { apartment: IApartment };
  [MapEvents.ADD_MARKER]: { apartment: IApartment | IApartment[] };
  [MapEvents.CLEAN_MARKER]: { apartment: IApartment | IApartment[] };
}
