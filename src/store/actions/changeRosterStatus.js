import * as service from '../../utils/service';

const baseurl = `/api/admin`;
export const postChangeStatusSuccess = (response) => {
  return {
    type: 'POST_CHANGESTATUS_SUCCESS',
    changeStatusResponse: response,
    isChangeStatusClick: true,
  };
};

export const postChangeStatusFailed = (error) => {
  return {
    type: 'POST_CHANGESTATUS_FAILED',
    changeStatusResponse: error,
    isChangeStatusClick: true,
  };
};

export const clearRosterStatus = () => {
  return {
    type: 'CLEAR_ROSTERSTATUS',
  };
};

export const changeRosterStatus = (userId) => {
  return (dispatch) => {
    let url = `${baseurl}/changerosterstatus?userId=${userId}`;

    service
      .post(url)
      .then((response) => {
        dispatch(postChangeStatusSuccess(response));
      })
      .catch((error) => {
        dispatch(postChangeStatusFailed(error));
      });
  };
};
