import { updateObject } from '../../utils/utils';
const initialState = {
  changeStatusResponse: {
    Status: false,
    Message: '',
  },
  isChangeStatusClick: false,
};

export const clearRosterStatus = (state) => {
  return updateObject(state, {
    changeStatusResponse: {
      Status: false,
      Message: '',
    },
    isChangeStatusClick: false,
  });
};
export const postChangeStatusSuccess = (state, action) => {
  return updateObject(state, {
    changeStatusResponse: action.changeStatusResponse,
    isChangeStatusClick: action.isChangeStatusClick,
  });
};
export const postChangeStatusFailed = (state, action) => {
  return updateObject(state, {
    changeStatusResponse: action.changeStatusResponse,
    isChangeStatusClick: action.isChangeStatusClick,
  });
};
export const changeRosterStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'POST_CHANGESTATUS_SUCCESS':
      return postChangeStatusSuccess(state, action);

    case 'POST_CHANGESTATUS_FAILED':
      return postChangeStatusFailed(state, action);

    case 'CLEAR_ROSTERSTATUS':
      return clearRosterStatus(state);

    default:
      return state;
  }
};
