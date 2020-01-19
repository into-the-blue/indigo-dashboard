import { Reducer } from 'redux';
import { Effect } from 'dva';
import {} from '@/utils';
import { IApartment } from '@/types';
import { queryUnlabeledApartments } from '@/services/tagging';

export interface TaggingState {
  untaggedApartments: IApartment[];
}

export interface TempalteModel {
  namespace: string;
  state: TaggingState;
  effects: {
    queryUntaggedApartments: Effect;
  };
  reducers: {
    setState: Reducer<TaggingState>;
  };
}

const Model: TempalteModel = {
  namespace: 'tagging',

  state: {
    untaggedApartments: [],
  },

  effects: {
    *queryUntaggedApartments({ payload: { limit = 50 } }, { call, put }) {
      try {
        const untaggedApartments = yield call(queryUnlabeledApartments, limit);
        yield put({
          type: 'setState',
          payload: {
            untaggedApartments,
          },
        });
      } catch (err) {
        console.warn(err);
        //
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
