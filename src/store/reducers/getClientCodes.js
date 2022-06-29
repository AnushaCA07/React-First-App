import { updateObject } from '../../utils/utils';

const initialState = {
  results: []
};

export const initial_GetClientCode = (state, action) => {
  return updateObject(state, {
    results: action.results,
  });
};

export const clear_GetClientCode = (state) => {
  return updateObject(state, {
    results: [],
  });
};

export const getClientCode_Success = (state, action) => {
  return updateObject(state, {
    results: action.results,
    error: false,
    errorMsg: null
  });
};

export const getClientCode_Failed = (state, action) => {
  return updateObject(state, {
    error: true,
    errorMsg: action.errorMsg,
  });
};

export const getClientCodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GETCLIENTCODE_SUCCESS':
      return getClientCode_Success(state, action);
    case 'GETCLIENTCODE_FAILED':
      return getClientCode_Failed(state, action);
    case 'CLEAR_GETCLIENTCODE':
      return clear_GetClientCode(state);
    case 'INITIAL_GETCLIENTCODE':
      return initial_GetClientCode(state, action);
    default:
      return state;
  }
};
