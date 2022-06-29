import * as service from '../../utils/service';

const baseurl = `/api/clientportal`;
export const removeProvidersSuccess = (response) => {
  return {
    type: 'REMOVE_PROVIDERS_SUCCESS',
    response: response,
    isDeleteClick: true
  };
};

export const removeProvidersFailed = (error) => {
  return {
    type: 'REMOVE_PROVIDERS_FAILED',
    response: error,
    isDeleteClick: false
  };
};

export const removeProvidersClear = () => {
  return {
    type: 'CLEAR_REMOVE_PROVIDERS'
  };
};

export const removeProvidersFromUser = (userId, pwids,clientCode,setShowSpinner) => {
  return (dispatch) => {
    let url = `${baseurl}/removeproviderwithdesignation?pwids=${pwids}&userId=${userId}&clientCode=${clientCode}`;
    service
      .post(url)
      .then((response) => {
        dispatch(removeProvidersSuccess(response));
        setShowSpinner(false);
      })
      .catch((error) => {
        dispatch(removeProvidersFailed(error));
        setShowSpinner(false);
      });
  };
};
