import * as service from '../../utils/service';
import * as actions from '../actions';

const baseurl = `/api/admin`;

export const initial_UpdateAccountSettings = () => {
  return {
    type: 'INITIAL_UPDATEACCOUNTSETTINGS',
    success: false,
    errorMsg: '',
  };
};

export const updateAccountSettings_Success = () => {
  return {
    type: 'UPDATEACCOUNTSETTINGS_SUCCESS',
    success: true,
    errorMsg: '',
  };
};

export const updateAccountSettings_Failed = (errorMsg) => {
  return {
    type: 'UPDATEACCOUNTSETTINGS_FAILED',
    errorMsg: errorMsg,
    success: false,
  };
};

export const clear_UpdateAccountSettings = () => {
  return {
    type: 'CLEAR_UPDATEACCOUNTSETTINGS',
    success: false,
    errorMsg: '',
  };
};

export const updateAccountSettings = (account, setDisplaySpinner, closeModalAcc) => {
  return (dispatch) => {
    let url = `${baseurl}/updateadminsettings?clientCode=${account.clientCode}&clientName=${account.clientName}&email=${account.email}&firstName=${account.firstName}&lastName=${account.lastName}&roleName=${account.adminRole}&userId=${account.userId}`;
    setDisplaySpinner(true);
    service
      .post(url)
      .then((responseData) => {
        dispatch(updateAccountSettings_Success(responseData));
      })
      .catch((err) => {
        let errorResponseData = {
          StatusCode: 'InternalServerError',
          IsSuccessStatusCode: false
        };
        dispatch(updateAccountSettings_Failed(errorResponseData));
      })
      .finally(() => {
        dispatch(
          actions.getClientPortalBannerData({
            userId: account.userId,
            clientCode: account.clientCode
          })
        );
        setDisplaySpinner(false);
        closeModalAcc();
      });
  };
};
