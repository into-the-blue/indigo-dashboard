import { Reducer } from 'redux';
import { Effect } from 'dva';
import {} from '@/utils';
import { IApartment } from '@/types';
import { ConnectState } from './connect.d';

export interface MapState {
  markers: { apartment: IApartment; marker: any }[];
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
          ({ apartment }: any) => !oMarkers.some((o: any) => o.apartment.id === apartment.id),
        ),
      ];

      yield put({
        type: 'setState',
        payload: {
          markers: nextMarkers,
        },
      });
    },

    *removeMarkers({ payload: { apartment } }, { select, put }) {
      if (apartment.length === 0) {
        return yield put({
          type: 'setState',
          payload: {
            markers: [],
          },
        });
      }
      const { markers } = yield select((state: ConnectState) => state.map);
      yield put({
        type: 'setState',
        payload: {
          markers: markers.filter(
            (m: any) => !apartment.some((a: any) => a.apartment.id === m.apartment.id),
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
