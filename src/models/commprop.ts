import { Effect, Reducer } from 'umi';
import { queryTable, queryAmenities, updateTable, updateAmenity,requestDatabase } from '@/services/commprop';

export interface CompTable {}
export interface ATable {}

export interface ATable {}

export interface CommpropModelState {
  compTable?: CompTable[];
  amentityTable?: ATable[];
}

export interface CommType {
  namespace: 'commprop';
  state: CommpropModelState;
  effects: {
    fetchTableChanges: Effect;
    fetchAmenitiesChanges: Effect;
    updateServiceTable: Effect;
    updateAmenityForm: Effect;

    request: Effect;
  };
  reducers: {
    saveCompTable: Reducer<CompTable>;
    saveATable: Reducer<ATable>;
  };
}

const CommpropModel: CommType = {
  namespace: 'commprop',
  
  state: {
    compTable: [],
    amentityTable: [],
  },

  effects: {
    *fetchTableChanges({ payload }, { call, put }) {
      const response = yield call(queryTable, payload);
      yield put({
        type: 'saveCompTable',
        payload: response?.data,
      });
      return response?.data || [];
    },

    *fetchAmenitiesChanges({ payload }, { call, put }) {
      const response = yield call(queryAmenities, payload);
      yield put({
        type: 'saveATable',
        payload: response?.data,
      });
      return response?.data || [];
    },

    *request({ payload }, { call, put }) {
      const response = yield call(requestDatabase, payload);
      yield put({
        type: 'saveCompTable',
        payload: response?.data,
      });
      return response || [];
    },


    *updateServiceTable({ payload }, { call, put}) {
      const response = yield call(updateTable, payload);
      yield put({
        type: 'saveATable',
        payload: response,

      });
      return response || [];
    },

    *updateAmenityForm({ payload }, { call, put}) {
      const response = yield call(updateAmenity, payload);
      yield put({
        type: 'saveATable',
        payload: response?.data,

      });
      return response || [];
    },
  },

  reducers: {
    saveCompTable(state, action) {
      return {
        ...state,
        compTable: action.payload || [],
      };
    },
    saveATable(state, action) {
      return {
        ...state,
        amentityTable: action.payload || [],
      };
    },
  },
};

export default CommpropModel;
