import { updateObject } from '../../utils/utils';

const initialState = {
  providerInfo: {
    FirstName: '',
    LastName: '',
    Email: '',
    AlternateEmail: '',
    City: '',
    State: '',
    ProviderName: '',
    Subject: '',
    Comment: '',
    Role: '',
  },
};

const submitInitialState = {
  ticketId: 0,
  success: false,
  errorMsg: '',
};

export const clearValues = (state) => {
  return updateObject(state, {
    providerInfo: {
      FirstName: '',
      LastName: '',
      Email: '',
      AlternateEmail: '',
      City: '',
      State: '',
      ProviderName: '',
      Subject: '',
      Comment: '',
      Role: '',
    },
  });
};

export const contactUsFailed = (state, action) => {
  return updateObject(state, {
    ticketId: 0,
    success: false,
    errorMsg: action.errorMsg,
  });
};

export const contactUsSuccess = (state, action) => {
  return updateObject(state, {
    providerInfo: action.providerInfo,
    error: false,
    errorMsg: null,
  });
};

// export const contactSubmitSuccess = (state, action) => {
//   return updateObject(state, {
//     ticketId: action.ticketId,
//     success: true,
//     errorMsg: '',
//   });
// };

export const initialLoad = (state, action) => {
  return updateObject(state, {
    providerInfo: action.providerInfo,
    error: false,
    errorMsg: null,
  });
};

export const contactUsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CONTACTUS_SUCCESS':
      return contactUsSuccess(state, action);
    case 'CONTACTUS_FAILED':
      return contactUsFailed(state, action);
    case 'CLEAR_VALUES':
      return clearValues(state);
    case 'INITIAL_LOAD':
      return initialLoad(state, action);
    // case 'CONTACTUS_SUBMIT_SUCCESS':
    //   return contactSubmitSuccess(state);
    default:
      return state;
  }
};

export const loadProviderData = (state = initialState, action) => {
  switch (action.type) {
    case 'CONTACTUS_SUCCESS':
      return contactUsSuccess(state, action);
    case 'CONTACTUS_FAILED':
      return contactUsFailed(state, action);
    case 'CLEAR_VALUES':
      return clearValues(state);
    case 'INITIAL_LOAD':
      return initialLoad(state, action);
    default:
      return state;
  }
};
