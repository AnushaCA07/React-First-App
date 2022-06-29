import { updateObject } from '../../utils/utils';
const initialState = {
  response: {
    Status: false,
    Message: ''
  },
  isDeleteClick: false
};

export const removeProvidersClear = (state) => {
  return updateObject(state, {
    response: {
      Status: false,
      Message: ''
    },
    isDeleteClick: false
  });
};
export const removeProvidersSuccess = (state, action) => {
  return updateObject(state, {
    response: action.response,
    isDeleteClick: true
  });
};
export const removeProvidersFailed = (state, action) => {
  return updateObject(state, {
    response: action.response,
    isDeleteClick: true
  });
};
export const removeProvidersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REMOVE_PROVIDERS_SUCCESS':
      return removeProvidersSuccess(state, action);
    case 'REMOVE_PROVIDERS_FAILED':
      return removeProvidersFailed(state, action);
    case 'CLEAR_REMOVE_PROVIDERS':
      return removeProvidersClear(state);
    default:
      return state;
  }
};
