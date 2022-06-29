import * as service from '../../utils/service';

const baseurl = `/api/admin`;
export const postAuthorizeRosterSuccess = (response) => {
  return {
    type: 'POST_AUTHORIZEROSTER_SUCCESS',
    authorizeRosterResponse: response,
    isAuthorizeClick: true,
  };
};

export const postAuthorizeRosterFailed = (error) => {
  return {
    type: 'POST_AUTHORIZEROSTER_FAILED',
    authorizeRosterResponse: error,
    isAuthorizeClick: true,
  };
};

export const clearAuhtorizeRoster = () => {
  return {
    type: 'CLEAR_AUTHORIZEROSTER',
  };
};

export const authorizeRoster = (userId) => {
  return (dispatch) => {
    let url = `${baseurl}/authorizerosteruser?userId=${userId}`;

    service
      .post(url)
      .then((response) => {
        dispatch(postAuthorizeRosterSuccess(response));
      })
      .catch((error) => {
        dispatch(postAuthorizeRosterFailed(error));
      });
  };
};
