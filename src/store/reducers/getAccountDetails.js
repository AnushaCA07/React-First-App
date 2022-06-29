import { updateObject } from '../../utils/utils';

const initialState = {
  accountInfo: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    cnfPassword: '',
    adminRole: '',
    clientCode: '',
    clientCodes: '',
    currentRole: '',
    userId:  '',
    sortBy:  '',
    sortOrder: '',
    page:  '',
    filters:  '',
    recordsPerPage:  '',
    isImpersonate: false,
  },
};

const submitInitialState = {
  success: false,
  errorMsg: '',
};

export const clearValues = (state) => {
  return updateObject(state, {
    accountInfo: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      cnfPassword: '',
      adminRole: '',
      clientCode: '',
      clientCodes: '',
      currentRole: '',
      userId:  '',
      sortBy:  '',
      sortOrder: '',
      page:  '',
      filters:  '',
      recordsPerPage:  '',
      isImpersonate: false,
    },
  });
};

export const getAccountDetailsFailed = (state, action) => {
  return updateObject(state, {
    success: false,
    errorMsg: action.errorMsg,
  });
};

export const getAccountDetailsSuccess = (state, action) => {
  return updateObject(state, {
    accountInfo: action.accountInfo,
    error: false,
    errorMsg: null,
  });
};

export const initialLoad = (state, action) => {
  return updateObject(state, {
    accountInfo: action.accountInfo,
    error: false,
    errorMsg: null,
  });
};

export const getAccountDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GETACCOUNTSETTINGS_SUCCESS':
      return getAccountDetailsSuccess(state, action);
    case 'GETACCOUNTSETTINGS_FAILED':
      return getAccountDetailsFailed(state, action);
    case 'CLEAR_VALUES':
      return clearValues(state);
    case 'INITIAL_LOAD':
      return initialLoad(state, action);
    default:
      return state;
  }
};
