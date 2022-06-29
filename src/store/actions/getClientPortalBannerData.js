import * as service from '../../utils/service';
import { queryParam } from "../../utils/utils";
const baseurl = `/api/clientportal`;

export const getClientPortalBannerDataSuccess = res => {
    return {
      type: 'GET_CLIENT_PORTAL_BANNER_DATA_SUCCESS',
      SponsorInformation: {
        IsFacility: res.SponsorInformation.IsFacility,
        SponsorType: res.SponsorInformation.SponsorType
      },
      SponsoredProvidersCount: {
        Total: res.SponsoredProvidersCount.Total,
        Standard: res.SponsoredProvidersCount.Standard,
        Employed: res.SponsoredProvidersCount.Employed,
        Affiliated: res.SponsoredProvidersCount.Affiliated,
        Premium: res.SponsoredProvidersCount.Premium,
        Enhanced: res.SponsoredProvidersCount.Enhanced
      }
    };
}

export const getClientPortalBannerDataFailed = errMsg => {
    return {
        type: "GET_CLIENT_PORTAL_BANNER_DATA_FAILED",
        errorMsg: errMsg
    };
};

export const clearClientPortalBannerData = () => {
    return {
        type: "CLEAR_CLIENT_PORTAL_BANNER_DATA"
    };
};

export const getClientPortalBannerData = (payload) => {
    return (dispatch) => {
        let params = queryParam(payload);//$.param(payload);
        let url = `${baseurl}/banner?${params}`;
            service
            .get(url)
            .then(res=>{
                dispatch(getClientPortalBannerDataSuccess(res));
            }).catch(err=>{
                dispatch(getClientPortalBannerDataFailed(err.error));
            });
    }
}