import { updateObject } from '../../utils/utils';
const initialState = {
  authorizeRosterResponse: {
    Status: false,
    Message: '',
  },
  isAuthorizeClick: false,
};

export const clearAuthorizeRoster = (state) => {
  return updateObject(state, {
    authorizeRosterResponse: {
      Status: false,
      Message: '',
    },
    isAuthorizeClick: false,
  });
};
export const postAuthorizeRosterSuccess = (state, action) => {
  return updateObject(state, {
    authorizeRosterResponse: action.authorizeRosterResponse,
    isAuthorizeClick: action.isAuthorizeClick,
  });
};
export const postAuthorizeRosterFailed = (state, action) => {
  return updateObject(state, {
    authorizeRosterResponse: action.authorizeRosterResponse,
    isAuthorizeClick: action.isAuthorizeClick,
  });
};
export const authorizeRosterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'POST_AUTHORIZEROSTER_SUCCESS':
      return postAuthorizeRosterSuccess(state, action);

    case 'POST_AUTHORIZEROSTER_FAILED':
      return postAuthorizeRosterFailed(state, action);

    case 'CLEAR_AUTHORIZEROSTER':
      return clearAuthorizeRoster(state);

    default:
      return state;
  }
};
