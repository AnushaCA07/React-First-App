export const getAccountDetails_Failed = (errorMsg) => {
  return {
    type: 'GETACCOUNTSETTINGS_FAILED',
    errorMsg: errorMsg,
    success: false
  };
};

export const getAccountDetails_Success = (response) => {
  let accountData = {
    firstName: response.firstName,
    lastName: response.lastName,
    email: response.email,
    role : response.role,
    clientCode : response.clientCode,
    clientCodes: response.clientCodes,
    currentRole: response.currentRole,
    userId: response.userId,
    sortBy: response.sortBy,
    sortOrder: response.sortOrder,
    page: response.page,
    filters: response.filters,
    recordsPerPage: response.recordsPerPage,
    isImpersonate : response.isImpersonate,
  };
  return {
    type: 'GETACCOUNTSETTINGS_SUCCESS',
    accountInfo: accountData
  };
};

export const initialLoad = () => {
  return {
    type: 'INITIAL_LOAD',
    accountInfo: {}
  };
};
export const clear_GetAccountDetails = () => {
  return {
    type: 'CLEAR_VALUES'
  };
};

export const getAccountDetails = (accountData) => {
  return (dispatch) => {
    dispatch(getAccountDetails_Success(accountData));
  };
};
