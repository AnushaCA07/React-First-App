import * as service from '../../utils/service';

const baseurl = `/api/zendesk`;

export const contactUsFailed = (errorMsg) => {
  return {
    type: 'CONTACTUS_FAILED',
    errorMsg: errorMsg,
    success: false,
  };
};

export const contactSubmitSuccess = (response) => {
  return {
    type: 'CONTACTUS_SUBMIT_SUCCESS',
    ticketId: response,
    success: true,
    errorMsg: '',
  };
};

export const contactUsSuccess = (response) => {
  let providerData = {
    FirstName: response.FirstName,
    ProviderId: response.ProviderId,
    ProviderName: response.ProviderName,
    LastName: response.LastName,
    Email: response.Email,
    City: response.City,
    State: response.State,
    UserType: response.UserType,
    Sponsored: response.Sponsored,
    Source: response.Source,
    Role: response.Role,
  };
  return {
    type: 'CONTACTUS_SUCCESS',
    providerInfo: providerData,
  };
};

export const initialLoad = () => {
  return {
    type: 'INITIAL_LOAD',
    providerInfo: Object,
  };
};

// export const submitInitialLoad = () => {
//   return {
//     type: 'SUBMIT_INITIAL_LOAD',
//     success: false,
//     ticketId: 0,
//     errorMsg: '',
//   };
// };

export const clearValues = () => {
  return {
    type: 'CLEAR_VALUES',
  };
};

export const loadProviderData = (providerData) => {
  return (dispatch) => {
    dispatch(contactUsSuccess(providerData));
  };
};
