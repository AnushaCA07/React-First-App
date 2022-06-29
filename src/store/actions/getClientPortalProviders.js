import * as service from '../../utils/service';
const baseurl = `/api/clientportal`;

export const getClientPortalProvidersSuccess = (res) => {
  return {
    type: 'GET_CLIENT_PORTAL_PROVIDERS_SUCCESS',
    Providers: res.Providers,
    TotalRecords: res.TotalRecords,
    RosterFilters: res.RosterFilters
  };
};

export const getClientPortalProvidersFailed = (errMsg) => {
  return {
    type: 'GET_CLIENT_PORTAL_PROVIDERS_FAILED',
    errorMsg: errMsg
  };
};

export const clearClientPortalProviders = () => {
  return {
    type: 'CLEAR_CLIENT_PORTAL_PROVIDERS'
  };
};

export const getClientPortalProviders = (request) => {
  return (dispatch) => {
    let url = `${baseurl}/providers`;
    service
      .post(url, request)
      .then((res) => {
        dispatch(getClientPortalProvidersSuccess(res));
      })
      .catch((err) => {
        dispatch(getClientPortalProvidersFailed(err.error));
      });
  };
};
