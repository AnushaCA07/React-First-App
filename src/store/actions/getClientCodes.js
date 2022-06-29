import * as service from '../../utils/service';
const baseurl = `/api/admin`;

export const initial_GetClientCode = () => {
  return {
    type: 'INITIAL_GETCLIENTCODE',
    results: [],
  };
};

export const clear_GetClientCode = () => {
  return {
    type: 'CLEAR_GETCLIENTCODE',
  };
};

export const getClientCode_Failed = (errorMsg) => {
  return {
    type: 'GETCLIENTCODE_FAILED',
    errorMsg: errorMsg,
    spinnerVisible: false,
  };
};

export const getClientCode_Success = (
  response
) => {
  return {
    type: 'GETCLIENTCODE_SUCCESS',
    results: response,
  };
};

export const getClientCodes = (code) => {
  return (dispatch) => {
    let url = `${baseurl}/getclientcodelist?search=${code}`;
    service
      .get(url)
      .then((responseData) => {
        dispatch(
          getClientCode_Success(responseData)
        );
      })
      .catch((err) => {
        dispatch(getClientCode_Failed(err && err.error));
      });
  };
};