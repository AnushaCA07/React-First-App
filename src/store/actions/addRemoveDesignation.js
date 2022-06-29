import * as service from '../../utils/service';

const baseurl = `/api/clientportal`;
export const addRemoveDesignationSuccess = (response) => {
  return {
    type: 'ADD_REMOVE_DESIGNATION_SUCCESS',
    isError: response.isError,
    errorResponse: []
  };
};

export const addRemoveDesignationFailed = (error) => {
  return {
    type: 'ADD_REMOVE_DESIGNATION_FAILED',
    isError: true,
    errorResponse: error
  };
};

export const addRemoveDesignationClear = () => {
  return {
    type: 'CLEAR_ADD_REMOVE_DESIGNATION'
  };
};

export const addRemoveDesignation = (request, setShowSpinner, type) => {
  return (dispatch) => {
    if (type == 'Designate') {
      let url = `${baseurl}/addordeleteproviderdesignation`;
      service
        .post(url, request)
        .then((response) => {
          dispatch(addRemoveDesignationSuccess(response));
          setShowSpinner(false);
        })
        .catch((error) => {
          dispatch(addRemoveDesignationFailed(error));
          setShowSpinner(false);
        });
    } else {
      let url = `${baseurl}/removeproviderdesignation`;
      service
        .post(url, request)
        .then((response) => {
          dispatch(addRemoveDesignationSuccess(response));
          setShowSpinner(false);
        })
        .catch((error) => {
          dispatch(addRemoveDesignationFailed(error));
          setShowSpinner(false);
        });
    }
  };
};
