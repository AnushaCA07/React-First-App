import * as service from '../../utils/service';

const baseurl = `/api/admin`;
export const postChangeFlagsSuccess = (response) => {
  return {
    type: 'POST_CHANGEFLAGS_SUCCESS',
    changeFlagsResponse: response,
    isChangeFlagsClick: true,
  };
};

export const postChangeFlagsFailed = (error) => {
  return {
    type: 'POST_CHANGEFLAGS_FAILED',
    changeFlagsResponse: error,
    isChangeFlagsClick: true,
  };
};

export const clearRosterFlags = () => {
  return {
    type: 'CLEAR_ROSTERFLAGS',
  };
};

export const changeRosterFlags = (userId) => {
  return (dispatch) => {
    let url = `${baseurl}/changerosterflags?userId=${userId}`;

    service
      .post(url)
      .then((response) => {
        dispatch(postChangeFlagsSuccess(response));
      })
      .catch((error) => {
        dispatch(postChangeFlagsFailed(error));
      });
  };
};
