import * as service from '../../utils/service';

const baseurl = `/api/zendesk`;

export const contactUsFailed = (errorMsg) => {
  return {
    type: 'CONTACTUS_SUBMIT_FAILED',
    errorMsg: errorMsg,
    success: false,
  };
};

export const contactSubmitSuccess = (response) => {
  return {
    type: 'CONTACTUS_SUBMIT_SUCCESS',
    ticketId: response.TicketId,
    success: true,
    errorMsg: '',
  };
};

export const submitInitialLoad = () => {
  return {
    type: 'CONTACTUS_SUBMIT_INITIAL_LOAD',
    success: false,
    ticketId: 0,
    errorMsg: '',
  };
};

export const clearContactForms = () => {
  return {
    type: 'CONTACTUS_SUBMIT_CLEAR_VALUES',
    success: false,
    ticketId: 0,
    errorMsg: '',
  };
};

export const submitContactUs = (providerData, setShowSpinner) => {
  return (dispatch) => {
    if (!providerData.length == 0) {
      dispatch(submitInitialLoad());
      dispatch(contactUsFailed('Please fill all the required fields'));
    } else {
      let request = {
        Subject: providerData.subject,
        Comment: providerData.comment,
        FirstName: providerData.firstName,
        LastName: providerData.lastName,
        Email: providerData.email,
        AlternateEmail: providerData.alternateEmail,
        ProviderName: providerData.providerName,
        City: providerData.city,
        State: providerData.state,
        Source: providerData.source,
        Role: providerData.role
      };
      let url = `${baseurl}/CreateTicket`;
      setShowSpinner(true);
      service
        .post(url, request)
        .then((responseData) => {
          dispatch(contactSubmitSuccess(responseData));
          setShowSpinner(false);
        })
        .catch((err) => {
          let errorResponseData = {
            Message: err,
          };
          dispatch(contactUsFailed(errorResponseData));
          setShowSpinner(false);
        });
    }
  };
};
