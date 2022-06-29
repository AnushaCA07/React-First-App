import { updateObject } from '../../utils/utils';
const initialState = {
  isError: false,
  errorResponse: []
};

export const addRemoveDesignationClear = (state) => {
  return updateObject(state, {
    isError: false,
    errorResponse: []
  });
};
export const addRemoveDesignationSuccess = (state, action) => {
  return updateObject(state, {
    isError: action.isError,
    errorResponse: action.errorResponse
  });
};
export const addRemoveDesignationFailed = (state, action) => {
  return updateObject(state, {
    isError: action.isError,
    errorResponse: action.errorResponse
  });
};
export const addRemoveDesignationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_REMOVE_DESIGNATION_SUCCESS':
      return addRemoveDesignationSuccess(state, action);
    case 'ADD_REMOVE_DESIGNATION_FAILED':
      return addRemoveDesignationFailed(state, action);
    case 'CLEAR_ADD_REMOVE_DESIGNATION':
      return addRemoveDesignationClear(state);
    default:
      return state;
  }
};
