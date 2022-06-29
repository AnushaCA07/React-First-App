export const getClaimPageParamsSuccess = (coOrdinates, location) => {
  return {
    type: 'GETCLAIMPAGEPARAMS_SUCCESS',
    coOrdinates: coOrdinates,
    location: location
  };
};

export const getClaimPageParams = (cOrdinates, location) => {
  return (dispatch) => {
    dispatch(getClaimPageParamsSuccess(cOrdinates, location));
  };
};
