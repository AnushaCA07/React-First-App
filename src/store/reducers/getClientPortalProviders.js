import { updateObject } from '../../utils/utils';

const initialState = {
  providers: [],
  totalRecords: 0,
  rosterFilters: {
    Practices: [],
    Specialties: [],
    MissingFields: []
  }
};

export const getClientPortalProvidersSuccess = (state, action) => {
  return updateObject(state, {
    providers: action.Providers,
    totalRecords: action.TotalRecords,
    rosterFilters: action.RosterFilters
  });
};

export const getClientPortalProvidersFailed = (state, action) => {
  return updateObject(state, {
    success: false,
    errorMsg: action.errorMsg
  });
};

export const clearClientPortalProviders = (state) => {
  return updateObject(state, {
    providers: [],
    totalRecords: 0
  });
};

export const getClientPortalProvidersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CLIENT_PORTAL_PROVIDERS_SUCCESS':
      return getClientPortalProvidersSuccess(state, action);
    case 'GET_CLIENT_PORTAL_PROVIDERS_FAILED':
      return getClientPortalProvidersFailed(state, action);
    case 'CLEAR_CLIENT_PORTAL_PROVIDERS':
      return clearClientPortalProviders(state);
    default:
      return state;
  }
};
