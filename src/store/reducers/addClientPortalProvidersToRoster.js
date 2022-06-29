import { updateObject } from '../../utils/utils';

const initialState = {
  result: {}
};

export const addClientPortalProvidersToRosterSuccess = (state, action) => {
  return updateObject(state, {
    result: action.Result
  });
};

export const addClientPortalProvidersToRosterFailed = (state, action) => {
  return updateObject(state, {
    success: false,
    errorMsg: action.errorMsg
  });
};

export const clearAddClientPortalProvidersToRoster = (state) => {
  return updateObject(state, {
    result: {}
  });
};

export const addClientPortalProvidersToRosterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CLIENT_PORTAL_PROVIDERS_TO_ROSTER_SUCCESS':
      return addClientPortalProvidersToRosterSuccess(state, action);
    case 'ADD_CLIENT_PORTAL_PROVIDERS_TO_ROSTER_FAILED':
      return addClientPortalProvidersToRosterFailed(state, action);
    case 'CLEAR_ADD_CLIENT_PORTAL_PROVIDERS_TO_ROSTER':
      return clearAddClientPortalProvidersToRoster(state);
    default:
      return state;
  }
};
