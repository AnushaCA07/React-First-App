import * as service from '../../utils/service';

const baseurl = `/api/admin`;
export const postRosterDeleteSuccess = (response) => {
  return {
    type: 'POST_ROSTERDELETE_SUCCESS',
    deleteRosterResponse: response,
    isDeleteClick: true,
  };
};

export const postRosterDeleteFailed = (error) => {
  return {
    type: 'POST_ROSTERDELETE_FAILED',
    deleteRosterResponse: error,
    isDeleteClick: true,
  };
};

export const clearRosterDelete = () => {
  return {
    type: 'CLEAR_ROSTERDELETE',
  };
};

export const deleteRoster = (userId, setShowSpinner) => {
  return (dispatch) => {
    let url = `${baseurl}/removerosteruser?userId=${userId}`;

    service
      .post(url)
      .then((response) => {
        dispatch(postRosterDeleteSuccess(response));
        setShowSpinner(false);
      })
      .catch((error) => {
        dispatch(postRosterDeleteFailed(error));
        setShowSpinner(false);
      });
  };
};
