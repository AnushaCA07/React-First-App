import { updateObject } from '../../utils/utils';

const initialState = {
  results: {},
  currentUserId: '',
  providerCode: '',
};

export const clearDashboardInfo = (state) => {
  return updateObject(state, {
    results: {},
    error: false,
    errorMsg: null,
  });
};

export const GetDashboardInfoFailed = (state, action) => {
  return updateObject(state, {
    error: true,
    errorMsg: action.errorMsg,
  });
};

export const GetDashboardInfoSuccess = (state, action) => {
  return updateObject(state, {
    results: action.results,
    error: false,
    errorMsg: null,
    providerCode: action.providerCode,
    currentUserId: action.currentUserId,
  });
};

export const initialGetDashboardInfo = (state, action) => {
  return updateObject(state, {
    results: action.results,
    error: false,
    errorMsg: null,
    providerCode: action.providerCode,
    currentUserId: action.currentUserId,
  });
};

export const getDashboardInfo = (state = initialState, action) => {
  switch (action.type) {
    case 'GETDASHBOARDINFO_SUCCESS':
      return GetDashboardInfoSuccess(state, action);
    case 'GETDASHBOARDINFO_FAILED':
      return GetDashboardInfoFailed(state, action);
    case 'CLEAR_DASHBOARDINFO':
      return clearDashboardInfo(state);
    case 'INITIAL_GETDASHBOARDINFO':
      return initialGetDashboardInfo(state, action);
    default:
      return state;
  }
};
