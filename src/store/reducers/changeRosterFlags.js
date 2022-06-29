import { updateObject } from '../../utils/utils';
const initialState = {
  changeFlagsResponse: {
    Status: false,
    Message: '',
  },
  isChangeFlagsClick: false,
};

export const clearRosterFlags = (state) => {
  return updateObject(state, {
    changeFlagsResponse: {
      Status: false,
      Message: '',
    },
    isChangeFlagsClick: false,
  });
};
export const postChangeFlagsSuccess = (state, action) => {
  return updateObject(state, {
    changeFlagsResponse: action.changeFlagsResponse,
    isChangeFlagsClick: action.isChangeFlagsClick,
  });
};
export const postChangeFlagsFailed = (state, action) => {
  return updateObject(state, {
    changeFlagsResponse: action.changeFlagsResponse,
    isChangeFlagsClick: action.isChangeFlagsClick,
  });
};
export const changeRosterFlagsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'POST_CHANGEFLAGS_SUCCESS':
      return postChangeFlagsSuccess(state, action);

    case 'POST_CHANGEFLAGS_FAILED':
      return postChangeFlagsFailed(state, action);

    case 'CLEAR_ROSTERFLAGS':
      return clearRosterFlags(state);

    default:
      return state;
  }
};
