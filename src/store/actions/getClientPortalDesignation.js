import * as service from '../../utils/service';
const baseurl = `/api/clientportal`;

export const getClientPortalDesignationSuccess = (res) => {
  return {
    type: 'GET_CLIENT_PORTAL_DESIGNATION_SUCCESS',
    providerList: res.ProviderList,
    clientFacilities: res.ClientFacilities,
    employmentTypes: res.EmploymentTypes
  };
};

export const getClientPortalDesignationFailed = (errMsg) => {
  return {
    type: 'GET_CLIENT_PORTAL_DESIGNATION_FAILED',
    errorMsg: errMsg
  };
};

export const cleargetClientPortalDesignation = () => {
  return {
    type: 'CLEAR_CLIENT_PORTAL_DESIGNATION',
    providerList: [],
    clientFacilities: [],
    employmentTypes:[]
  };
};

export const getClientPortalDesignation = (pwids, clientCode, setShowSpinner) => {
  return (dispatch) => {
    let url = `${baseurl}/designation?providerIds=${pwids}&clientCode=${clientCode}`;
    service
      .get(url)
      .then((res) => {
        dispatch(getClientPortalDesignationSuccess(res));
        setShowSpinner(false);
      })
      .catch((err) => {
        dispatch(getClientPortalDesignationFailed(err.error));
        setShowSpinner(false);
      });
  };
};
