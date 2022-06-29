import { updateObject } from '../../utils/utils';
const initialState = {
  createRosterResponse: {
    Status: false,
    Message: '',
  },
  isCreateClick: false,
};

export const clearRoster = (state) => {
  return updateObject(state, {
    createRosterResponse: {
      Status: false,
      Message: '',
    },
    isCreateClick: false,
  });
};
export const postRosterSuccess = (state, action) => {
  return updateObject(state, {
    createRosterResponse: action.createRosterResponse,
    isCreateClick: action.isCreateClick,
  });
};
export const postRosterFailed = (state, action) => {
  return updateObject(state, {
    createRosterResponse: action.createRosterResponse,
    isCreateClick: action.isCreateClick,
  });
};
export const createRosterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'POST_ROSTER_SUCCESS':
      return postRosterSuccess(state, action);

    case 'POST_ROSTER_FAILED':
      return postRosterFailed(state, action);

    case 'CLEAR_ROSTER':
      return clearRoster(state);

    default:
      return state;
  }
};
