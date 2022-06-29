import * as service from '../../utils/service';
const baseurl = `/api/clientportal`;

export const searchClientPortalProvidersSuccess = (res) => {
  return {
    type: 'SEARCH_CLIENT_PORTAL_PROVIDERS_SUCCESS',
    Providers: res.ProviderSearchResult,
    EmploymentTypes: res.EmploymentTypeResult,
    Facilities: res.FacilityResult,
    TotalRecords: res.TotalRecords
  };
};

export const searchClientPortalProvidersFailed = (errMsg) => {
  return {
    type: 'SEARCH_CLIENT_PORTAL_PROVIDERS_FAILED',
    errorMsg: errMsg
  };
};

export const clearSearchClientPortalProviders = () => {
  return {
    type: 'CLEAR_SEARCH_CLIENT_PORTAL_PROVIDERS',
    Providers: [],
    EmploymentTypes: [],
    Facilities: [],
    TotalRecords: 0
  };
};

export const searchClientPortalProviders = (requestObj, setShowSpinner) => {
  return (dispatch) => {
    let url = `${baseurl}/searchprovidersforclientportal`;
    service
      .post(url, requestObj)
      .then((res) => {
        dispatch(searchClientPortalProvidersSuccess(res));
      })
      .catch((err) => {
        dispatch(searchClientPortalProvidersFailed(err.error));
      })
      .finally(() => {
        setShowSpinner(false);
      });
  };
};
