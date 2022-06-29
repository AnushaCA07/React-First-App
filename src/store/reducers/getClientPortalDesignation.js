import { updateObject } from '../../utils/utils';

const initialState = {
  providerList: [],
  clientFacilities:[],
  employmentTypes: []
};

export const getClientPortalDesignationSuccess = (state, action) => {
  return updateObject(state, {
    providerList: action.providerList,
    clientFacilities: action.clientFacilities,
    employmentTypes: action.employmentTypes
  });
};

export const getClientPortalDesignationFailed = (state, action) => {
  return updateObject(state, {
    success: false,
    errorMsg: action.errorMsg
  });
};

export const cleargetClientPortalDesignation = (state) => {
  return updateObject(state, initialState);
};

export const getClientPortalDesignationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CLIENT_PORTAL_DESIGNATION_SUCCESS':
      return getClientPortalDesignationSuccess(state, action);
    case 'GET_CLIENT_PORTAL_DESIGNATION_FAILED':
      return getClientPortalDesignationFailed(state, action);
    case 'CLEAR_CLIENT_PORTAL_DESIGNATION':
      return cleargetClientPortalDesignation(state);
    default:
      return state;
  }
};
