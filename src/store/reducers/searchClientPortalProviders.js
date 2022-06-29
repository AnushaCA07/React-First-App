import { updateObject } from '../../utils/utils';

const initialState = {
  providers: [],
  employmentTypes: [],
  facilities: [],
  totalRecords: 0
};

export const searchClientPortalProvidersSuccess = (state, action) => {
  return updateObject(state, {
    providers: action.Providers,
    employmentTypes: action.EmploymentTypes,
    facilities: action.Facilities,
    totalRecords: action.TotalRecords
  });
};

export const searchClientPortalProvidersFailed = (state, action) => {
  return updateObject(state, {
    success: false,
    errorMsg: action.errorMsg
  });
};

export const clearSearchClientPortalProviders = (state, action) => {
  return updateObject(state, {
    providers: action.Providers,
    employmentTypes: action.EmploymentTypes,
    facilities: action.Facilities,
    totalRecords: action.TotalRecords
  });
};

export const searchClientPortalProvidersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH_CLIENT_PORTAL_PROVIDERS_SUCCESS':
      return searchClientPortalProvidersSuccess(state, action);
    case 'SEARCH_CLIENT_PORTAL_PROVIDERS_FAILED':
      return searchClientPortalProvidersFailed(state, action);
    case 'CLEAR_SEARCH_CLIENT_PORTAL_PROVIDERS':
      return clearSearchClientPortalProviders(state, action);
    default:
      return state;
  }
};
