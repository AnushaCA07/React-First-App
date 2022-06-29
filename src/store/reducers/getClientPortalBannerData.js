import { updateObject } from '../../utils/utils';

const initialState = {
  sponsorInformation: {
    isFacility: false,
    sponsorType: ''
  },
  sponsoredProvidersCount: {
    total: 0,
    standard: 0,
    employed: 0,
    affiliated: 0,
    premium: 0,
    enhanced: 0
  }
};

export const getClientPortalBannerDataSuccess = (state, action) => {
  return updateObject(state, {
    sponsorInformation:{
      isFacility:action.SponsorInformation.IsFacility,
      sponsorType:action.SponsorInformation.SponsorType
    },
    sponsoredProvidersCount:{
      total:action.SponsoredProvidersCount.Total,
      standard:action.SponsoredProvidersCount.Standard,
      employed:action.SponsoredProvidersCount.Employed,
      affiliated:action.SponsoredProvidersCount.Affiliated,
      premium:action.SponsoredProvidersCount.Premium,
      enhanced:action.SponsoredProvidersCount.Enhanced
    }
  });
};

export const getClientPortalBannerDataFailed = (state, action) => {
  return updateObject(state, {
    success: false,
    errorMsg: action.errorMsg,
  });
};

export const clearClientPortalBannerData = (state) => {
  return updateObject(state, initialState);
}

export const getClientPortalBannerDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CLIENT_PORTAL_BANNER_DATA_SUCCESS':
      return getClientPortalBannerDataSuccess(state, action);
    case 'GET_CLIENT_PORTAL_BANNER_DATA_FAILED':
      return getClientPortalBannerDataFailed(state, action);
    case 'CLEAR_CLIENT_PORTAL_BANNER_DATA':
      return clearClientPortalBannerData(state);
    default:
      return state;
  }
};