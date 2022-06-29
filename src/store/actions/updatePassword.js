import * as service from '../../utils/service';

const baseurl = `/api/admin`;

export const initial_UpdatePassword = () => {
  return {
    type: 'INITIAL_UPDATEPASSWORD',
    updatePasswordsuccess: false,
    updatePassworderrorMsg: ''
  };
};

export const updatePassword_Success = () => {
  return {
    type: 'UPDATEPASSWORD_SUCCESS',
    updatePasswordsuccess: true,
    updatePassworderrorMsg: ''
  };
};

export const updatePassword_Failed = (errorMsg) => {
  return {
    type: 'UPDATEPASSWORD_FAILED',
    updatePassworderrorMsg: errorMsg,
    updatePasswordsuccess: false
  };
};

export const clear_updatePassword = () => {
  return {
    type: 'CLEAR_UPDATEPASSWORD',
    updatePasswordsuccess: false,
    updatePassworderrorMsg: ''
  };
};

export const updatePassword = (newPassword, confirmPassword, userId, setShowSpinner) => {
  return (dispatch) => {
    let url = `${baseurl}/changepassword?confirmPassword=${confirmPassword}&newPassword=${newPassword}&userId=${userId}`;
    setShowSpinner(true);
    service
      .post(url)
      .then((responseData) => {
        dispatch(updatePassword_Success(responseData));
      })
      .catch((err) => {
        let errorResponseData = {
          StatusCode: 'InternalServerError',
          IsSuccessStatusCode: false,
          Message: err
        };
        dispatch(updatePassword_Failed(errorResponseData));
      });
  };
};