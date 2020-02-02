import { Reducer } from 'redux';
import { Effect } from 'dva';
import {} from '@/utils';
import { IMetroStationClient, IApartment } from '@/types';
import {
  queryAllMetroStations,
  queryApartmentsNearbyMetroStation,
  queryApartmentsNearbyAddress,
} from '@/services/apartments';
import { ConnectState } from './connect.d';
import { next, XENO_EVENT } from '@/utils/xeno';
import { message } from 'antd';
export interface ApartmentState {
  metroStations: IMetroStationClient[];
  apartmentsOnMap: IApartment[];
}

export interface TempalteModel {
  namespace: string;
  state: ApartmentState;
  effects: {
    queryMetroStations: Effect;
    queryApartmentsNearbyStation: Effect;
    queryApartmentsNearbyAddress: Effect;
  };
  reducers: {
    setState: Reducer<ApartmentState>;
  };
}

const Model: TempalteModel = {
  namespace: 'apartment',

  state: {
    metroStations: [],
    apartmentsOnMap: [],
  },

  effects: {
    *queryMetroStations(_, { call, put, select }) {
      try {
        const existed = yield select((state: ConnectState) => state.apartment.metroStations);
        if (existed.length > 0) return;
        const metroStations = yield call(queryAllMetroStations);
        yield put({
          type: 'setState',
          payload: {
            metroStations,
          },
        });
        next(XENO_EVENT.ADD_MARKER, {
          station: metroStations,
          type: 'station',
        });
      } catch (err) {
        //
      }
    },

    *queryApartmentsNearbyStation(
      { payload: { stationId, distance = 500, limit = 50 } },
      { call, put },
    ) {
      const done = message.loading('Loading...');
      try {
        next(XENO_EVENT.CLEAN_MARKER, {
          type: 'apartment',
          apartment: [],
        });
        const apartments = yield call(
          queryApartmentsNearbyMetroStation,
          stationId,
          distance,
          limit,
        );
        // console.warn(apartments);
        message.success(`Found ${apartments.length} apartments nearby`);
        next(XENO_EVENT.ADD_MARKER, {
          type: 'apartment',
          apartment: apartments,
        });
        yield put({
          type: 'setState',
          payload: {
            apartmentsOnMap: apartments,
          },
        });
      } catch (err) {
        console.warn(err.message);
        // yield put({
        //   type: 'setState',
        //   payload: {
        //     apartmentsOnMap: [],
        //   },
        // });
      } finally {
        done();
      }
    },

    *queryApartmentsNearbyAddress(
      { payload: { address, city, distance = 500, limit = 50 } },
      { call, put },
    ) {
      const done = message.loading('Loading...');
      try {
        next(XENO_EVENT.CLEAN_MARKER, {
          type: 'apartment',
          apartment: [],
        });
        const { coordinates, apartments } = yield call(
          queryApartmentsNearbyAddress,
          address,
          city,
          distance,
          limit,
        );
        // console.warn(apartments);
        message.success(`Found ${apartments.length} apartments nearby ${coordinates.join(',')}`);
        next(XENO_EVENT.ADD_MARKER, {
          type: 'apartment',
          apartment: apartments,
        });
        yield put({
          type: 'setState',
          payload: {
            apartmentsOnMap: apartments,
          },
        });
      } catch (err) {
        console.warn(err.message);
        message.error(err.message);
        // yield put({
        //   type: 'setState',
        //   payload: {
        //     apartmentsOnMap: [],
        //   },
        // });
      } finally {
        done();
      }
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
