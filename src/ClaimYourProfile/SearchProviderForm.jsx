import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
//service
import * as service from '../../utils/service';

//stylesheet import
import './_searchProviderForm.less';

//component import
import Spinner from '../Spinner/Spinner';
import { ProviderInfo } from './ProviderInfo';
import { AutoSuggestDropdown } from './AutoSuggestDropdown';

const SearchProviderForm = () => {
  const registerAccountBaseurl = `/api/account/register-provider`;
  const providerBaseurl = `/api/provider`;
  const locationBaseurl = `/api/location`;

  //state variables
  const [providerAutoSuggestData, setProviderAutoSuggestData] = useState([]);
  const [locationAutoSuggestData, setLocationAutoSuggestData] = useState([]);
  const [providerInfo, setProviderInfo] = useState({});
  const [locationInfo, setLocationInfo] = useState(
    useSelector((state) => state.getClaimPageParamsReducer)
  );
  const [showSpinner, setShowSpinner] = useState(false);

  //element reference
  const refProviderName = useRef();
  const refLocation = useRef();

  //event handlers
  const providerInputValueChangeHandler = () => {
    refProviderName.current.value.length > 2
      ? fetchProviderAutoSuggestData()
      : setProviderAutoSuggestData([]);
  };
  const locationInputValueChangeHandler = () => {
    refLocation.current.value.length > 2
      ? fetchLocationAutoSuggestData()
      : setLocationAutoSuggestData([]);
  };
  const cancelClickHandler = () => {
    setProviderAutoSuggestData([]);
    setProviderInfo({});
  };

  //API call(s)
  const fetchProviderAutoSuggestData = () => {
    service
      .get(`${providerBaseurl}?pt=${locationInfo.pt}&term=${refProviderName.current.value}`)
      .then((res) => {
        setProviderAutoSuggestData(res.Suggestions);
      })
      .catch((err) => {});
  };
  const fetchLocationAutoSuggestData = () => {
    service
      .get(`${locationBaseurl}?pt=${locationInfo.coOrdinates}&term=${refLocation.current.value}`)
      .then((res) => {
        setLocationAutoSuggestData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchProviderInfo = (providerId) => {
    setShowSpinner(true);
    service
      .get(`${registerAccountBaseurl}?pt=${locationInfo.pt}&providerId=${providerId}`)
      .then((res) => {
        setProviderInfo(res);
        refProviderName.current.value = '';
        setProviderAutoSuggestData([]);
      })
      .catch((err) => {})
      .finally(() => setShowSpinner(false));
  };

  // Use Effects
  useEffect(() => {
    refLocation.current.value = locationInfo.value;
  }, []);

  return (
    <div id='search-provider-form' className='form-group'>
      {Object.keys(providerInfo).length === 0 &&
      Object.getPrototypeOf(providerInfo) === Object.prototype ? (
        <>
          <div className='input-group' title='Enter Provider’s Name'>
            <label htmlFor='txtProviderName'>Enter Provider’s Name</label>
            <input
              id='txtProviderName'
              placeholder='Enter Provider’s Name'
              type='text'
              className='search'
              onChange={providerInputValueChangeHandler}
              ref={refProviderName}
              autoComplete='off'
            />
            {/* <span className='error-msg'>Please select a provider</span> */}
            {providerAutoSuggestData.length > 0 && (
              <AutoSuggestDropdown
                keyWord={refProviderName.current.value}
                suggestions={providerAutoSuggestData.map((data) => {
                  return {
                    text: `${data.Text} - ${data.AdditionalFieldValues}`,
                    value: data.Id,
                    data: data
                  };
                })}
                clickHandler={(provider) => {
                  fetchProviderInfo(provider.Id);
                }}
              />
            )}
          </div>
          <div className='input-group' title='Enter City, State or Zip'>
            <label htmlFor='txtLocation'>City, State or Zip</label>
            <input
              id='txtLocation'
              placeholder='Enter City, State or Zip'
              type='text'
              onChange={locationInputValueChangeHandler}
              ref={refLocation}
              autoComplete='off'
            />
            {locationAutoSuggestData.length > 0 && (
              <AutoSuggestDropdown
                keyWord={refLocation.current.value}
                suggestions={locationAutoSuggestData.map((data) => {
                  return {
                    text: data.value,
                    value: data.pt,
                    data: data
                  };
                })}
                clickHandler={(locationData) => {
                  refLocation.current.value = locationData.value;
                  setLocationInfo(locationData);
                  setLocationAutoSuggestData([]);
                }}
              />
            )}
          </div>
          {/* <div className='dv-button' title='Claim Your Free Profile'>
            <button type='button'>
              Claim Your Free Profile
            </button>
          </div> */}
        </>
      ) : (
        <ProviderInfo providerInfo={providerInfo} cancel={cancelClickHandler} />
      )}
      <div className='dv-contact-us'>
        <span>
          Can’t find provider’s name? <a href='/contactus'>Contact us</a>
        </span>
      </div>
      <>{showSpinner && <Spinner />}</>
    </div>
  );
};

export default SearchProviderForm;
