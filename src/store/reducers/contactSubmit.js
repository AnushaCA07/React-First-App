import { updateObject } from '../../utils/utils';

const initialState = {
  ticketId: 0,
  success: false,
  errorMsg: '',
};

export const clearContactForms = (state) => {
  return updateObject(state, {
    ticketId: 0,
    success: false,
    errorMsg: '',
  });
};

export const contactUsFailed = (state, action) => {
  return updateObject(state, {
    ticketId: 0,
    success: false,
    errorMsg: action.errorMsg,
  });
};

export const contactSubmitSuccess = (state, action) => {
  return updateObject(state, {
    ticketId: action.ticketId,
    success: true,
    errorMsg: '',
  });
};

export const initialLoad = (state, action) => {
  return updateObject(state, {
    ticketId: action.ticketId,
    success: false,
    errorMsg: action.errorMsg,
  });
};

export const contactSubmitReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CONTACTUS_SUBMIT_FAILED':
      return contactUsFailed(state, action);
    case 'CONTACTUS_SUBMIT_CLEAR_VALUES':
      return clearContactForms(state);
    case 'CONTACTUS_SUBMIT_INITIAL_LOAD':
      return initialLoad(state, action);
    case 'CONTACTUS_SUBMIT_SUCCESS':
      return contactSubmitSuccess(state, action);
    default:
      return state;
  }
};
