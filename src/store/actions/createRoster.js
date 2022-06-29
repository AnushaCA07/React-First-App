import * as service from '../../utils/service';

const baseurl = `/api/admin`;
export const postRosterSuccess = (response) => {
  return {
    type: 'POST_ROSTER_SUCCESS',
    createRosterResponse: response,
    isCreateClick: true,
  };
};

export const postRosterFailed = (error) => {
  return {
    type: 'POST_ROSTER_FAILED',
    createRosterResponse: error,
    isCreateClick: true,
  };
};

export const clearRoster = () => {
  return {
    type: 'CLEAR_ROSTER',
  };
};

export const createRoster = (roster, currentUserId, setShowSpinner) => {
  return (dispatch) => {
    let request = {
      FirstName: roster.firstName,
      LastName: roster.lastName,
      Email: roster.email,
      Password: roster.password,
      CreatedBy: currentUserId,
      Role: roster.adminRole,
      ClientCode: roster.clientCode,
      ClientName: roster.clientName,
    };
    let url = `${baseurl}/createuser`;

    service
      .post(url, request)
      .then((response) => {
        dispatch(postRosterSuccess(response));
        setShowSpinner(false);
      })
      .catch((error) => {
        dispatch(postRosterFailed(error));
        setShowSpinner(false);
      });
  };
};
