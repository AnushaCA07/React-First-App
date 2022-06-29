import { updateObject } from '../../utils/utils';

const initialState = {
  updatePasswordsuccess: false,
  updatePassworderrorMsg: '',
};

export const clear_UpdatePassword = (state) => {
  return updateObject(state, {
    updatePasswordsuccess: false,
    updatePassworderrorMsg: '',
  });
};
export const updatePassword_Success = (state) => {
  return updateObject(state, {
    updatePasswordsuccess: true,
    updatePassworderrorMsg: '',
  });
};
export const updatePassword_Failed = (state, action) => {
  return updateObject(state, {
    updatePasswordsuccess: false,
    updatePassworderrorMsg: action.errorMsg,
  });
};

export const initialLoad = (state, action) => {
  return updateObject(state, {
    updatePasswordsuccess: false,
    updatePassworderrorMsg: action.errorMsg,
  });
};

export const updatePasswordReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATEPASSWORD_SUCCESS':
        return updatePassword_Success(state, action);
      case 'UPDATEPASSWORD_FAILED':
        return updatePassword_Failed(state, action);
      case 'CLEAR_UPDATEPASSWORD':
        return clear_UpdatePassword(state);
      case 'INITIAL_UPDATEPASSWORD':
        return initialLoad(state, action);
      default:
        return state;
    }
};
