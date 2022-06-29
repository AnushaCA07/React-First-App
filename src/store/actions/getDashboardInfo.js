import * as service from '../../utils/service';

const baseurl = `/api/provider`;

export const getDashboardInfoFailed = (errorMsg) => {
  return {
    type: 'GETDASHBOARDINFO_FAILED',
    errorMsg: errorMsg,
    spinnerVisible: false,
  };
};

export const getDashboardInfoSuccess = (
  response,
  providerCode,
  currentUserId
) => {
  return {
    type: 'GETDASHBOARDINFO_SUCCESS',
    results: response,
    providerCode: providerCode,
    currentUserId: currentUserId,
  };
};

export const initialGetDashboardInfo = () => {
  return {
    type: 'INITIAL_GETDASHBOARDINFO',
    results: {},
    currentUserId: '',
    providerCode: '',
  };
};

export const clearDashboardInfo = () => {
  return {
    type: 'CLEAR_DASHBOARDINFO',
  };
};

export const getDashboardInfo = (providerCode, currentUserId) => {
  return (dispatch) => {
    let url = `${baseurl}/getproviderstatistics?providerCode=${providerCode}&modifiedBy=${currentUserId}`;
    service
      .get(url)
      .then((responseData) => {
        dispatch(
          getDashboardInfoSuccess(responseData, providerCode, currentUserId)
        );
      })
      .catch((err) => {
        dispatch(getDashboardInfoFailed(err && err.error));
      });
  };
};
