import * as service from '../../utils/service';
const baseurl = `/api/clientportal`;

export const addClientPortalProvidersToRosterSuccess = (res) => {
  return {
    type: 'ADD_CLIENT_PORTAL_PROVIDERS_TO_ROSTER_SUCCESS',
    Result: res
  };
};

export const addClientPortalProvidersToRosterFailed = (errMsg) => {
  return {
    type: 'ADD_CLIENT_PORTAL_PROVIDERS_TO_ROSTER_FAILED',
    errorMsg: errMsg
  };
};

export const clearAddClientPortalProvidersToRoster = () => {
  return {
    type: 'CLEAR_ADD_CLIENT_PORTAL_PROVIDERS_TO_ROSTER'
  };
};

export const addClientPortalProvidersToRoster = (
  request,
  setShowSpinner
  // setAdded,
  //closeModalHandler
) => {
  return (dispatch) => {
    setShowSpinner(true);
    let url = `${baseurl}/addprovidertorosterwithdesignation`;
    service
      .post(url, request)
      .then((res) => {
        dispatch(addClientPortalProvidersToRosterSuccess(res));
      })
      .catch((err) => {
        dispatch(addClientPortalProvidersToRosterFailed(err.error));
      })
      .finally(() => {
        setShowSpinner(false);
        //setAdded('Added');
        // closeModalHandler();
      });
  };
};
