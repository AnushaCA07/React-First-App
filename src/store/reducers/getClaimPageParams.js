import { updateObject } from '../../utils/utils';

const initialState = {
  pt: '',
  value: ''
};

export const GetClaimPageParamsSuccess = (state, action) => {
  return updateObject(state, {
    pt: action.coOrdinates,
    value: action.location
  });
};

export const getClaimPageParamsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GETCLAIMPAGEPARAMS_SUCCESS':
      return GetClaimPageParamsSuccess(state, action);
    default:
      return state;
  }
};
