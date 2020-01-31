import { Reducer } from 'redux';
import { Effect } from 'dva';
import {} from '@/utils';
import { IApartment, IMetroStationClient } from '@/types';
import { ConnectState } from './connect.d';

export interface MapState {
  markers: {
    apartment?: IApartment;
    marker: any;
    type: 'apartment' | 'station';
    station?: IMetroStationClient;
  }[];
}

export interface TempalteModel {
  namespace: string;
  state: MapState;
  effects: {
    addNewMarkers: Effect;
    removeMarkers: Effect;
  };
  reducers: {
    setState: Reducer<MapState>;
  };
}

const Model: TempalteModel = {
  namespace: 'map',

  state: {
    markers: [],
  },

  effects: {
    *addNewMarkers({ payload: { markers } }, { select, put }) {
      const { markers: oMarkers } = yield select((state: ConnectState) => state.map);
      const nextMarkers = [
        ...oMarkers,
        ...markers.filter(
          (o1: any) =>
            !oMarkers.some((o: any) => o.type === o1.type && o[o1.type].id === o1[o1.type].id),
        ),
      ];

      yield put({
        type: 'setState',
        payload: {
          markers: nextMarkers,
        },
      });
    },

    *removeMarkers({ payload: { markers } }, { select, put }) {
      const { markers: oMarkers } = yield select((state: ConnectState) => state.map);
      yield put({
        type: 'setState',
        payload: {
          markers: oMarkers.filter(
            (m: any) =>
              !markers.some((m2: any) => m2.type === m.type && m[m2.type].id === m2[m2.type].id),
          ),
        },
      });
    },
  },

  reducers: {
    setState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default Model;
