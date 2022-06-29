import { updateObject } from '../../utils/utils';

const initialState = {
  success: false,
  errorMsg: '',
};

export const initial_UpdateAccountSettings = (state, action) => {
  return updateObject(state, {
    results: action.results,
  });
};

export const clear_UpdateAccountSettings = (state) => {
  return updateObject(state, {
    success: false,
    errorMsg: '',
  });
};
export const updateAccountSettings_Success = (state) => {
  return updateObject(state, {
    success: true,
    errorMsg: '',
  });
};
export const updateAccountSettings_Failed = (state, action) => {
  return updateObject(state, {
    success: false,
    errorMsg: action.errorMsg,
  });
};

export const updateAccountSettingsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATEACCOUNTSETTINGS_SUCCESS':
        return updateAccountSettings_Success(state, action);
      case 'UPDATEACCOUNTSETTINGS_FAILED':
        return updateAccountSettings_Failed(state, action);
      case 'clear_UpdateAccountSettings':
        return clear_UpdateAccountSettings(state);
      case 'INITIAL_UPDATEACCOUNTSETTINGS':
        return initial_UpdateAccountSettings(state, action);
      default:
        return state;
    }
};
