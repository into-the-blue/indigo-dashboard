import { Reducer } from 'redux';
import { Effect } from 'dva';
import {} from '@/utils';

export interface TemplateState {}

export interface TempalteModel {
  namespace: string;
  state: TemplateState;
  effects: {};
  reducers: {
    setState: Reducer<TemplateState>;
  };
}

const Model: TempalteModel = {
  namespace: 'template',

  state: {},

  effects: {},

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
