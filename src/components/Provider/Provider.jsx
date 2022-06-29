import React from 'react';
import './_provider.less';
import PropTypes from 'prop-types';

import icon_sponsored from '../../../assets/images/icon_sponsored.svg';
import icon_fax from '../../../assets/images/icon_fax.png';
import icon_phone from '../../../assets/images/icon_phone.png';

const Provider = (props) => {
  const {
    DisplayName,
    PrimarySpecialty,
    ProviderCode,
    NPI,
    IsSponsored,
    SponsorName,
    SponsorLocation,
    Office,
    listId,
  } = props;

  return (
    <div
      className={
        listId % 2 == 0
          ? 'provider-details alternate-background'
          : 'provider-details'
      }
    >
      <div className='provider-info-container'>
        {/*  /// Todo Enable this later
        <input id={ProviderCode} type='checkbox' />
        <label htmlFor={ProviderCode}></label> */}

        <div className='provider-info'>
          <a href={`/provider/profile/${ProviderCode}/admin`} alt={DisplayName}>
            {DisplayName}
            {IsSponsored && (
              <img className='sponsor' src={icon_sponsored} alt='IsSponsored' />
            )}
          </a>
          <span>
            NPI: {NPI}, PWID: {ProviderCode}
          </span>
        </div>
      </div>
      <div>{PrimarySpecialty.SpecialtyName}</div>
      <div className='practice-container'>
        <span>{Office.Name}</span>
        <p>{Office.AddressLine}</p>
        <p>{Office.CityState}</p>
        <p className='contact-info'>
          <img src={icon_phone} alt='IconPhone' />
          {Office.Phone ? Office.Phone : 'Not Available'}
        </p>
        <p>
          <img src={icon_fax} alt='IconFax' />
          {Office.Fax ? Office.Fax : 'Not Available'}
        </p>
      </div>
      <div className='sponsor-info'>
        <span>{SponsorName}</span>
        <br />
        <p>{SponsorLocation}</p>
      </div>
    </div>
  );
};

Provider.propTypes = {
  DisplayName: PropTypes.string,
  AccountType: PropTypes.string,
  PrimarySpecialty: PropTypes.object,
  ProviderCode: PropTypes.string,
  NPI: PropTypes.string,
  IsSponsored: PropTypes.bool,
  SponsorName: PropTypes.string,
  SponsorLocation: PropTypes.string,
  Office: PropTypes.object,
};

export default Provider;
