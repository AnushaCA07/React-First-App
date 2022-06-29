import React from 'react';

//stylesheet import
import './_providerInfo.less';

export const ProviderInfo = (props) => {
  const { providerInfo, cancel } = props;

  const getStartedClickHandler = () => {
    window.location.href = `${window.location.origin}/account/register/${providerInfo.ProviderId}`;
  };

  return (
    <>
      <section id='provider-info' className='provider-info-section'>
        <img
          src={providerInfo.ImageUrl}
          alt={providerInfo.DisplayFullName}
          width='96'
          title={providerInfo.DisplayFullName}
        />
        <div className='provider-info-desc' title={providerInfo.DisplayFullName}>
          <strong className='provider-info-name'>{providerInfo.DisplayFullName}</strong>
          <br />
          <span>
            {providerInfo.PrimarySpecialty} | {providerInfo.Gender}
          </span>
          <br />
          <span>{providerInfo.Address}</span>
          <br />
          <span>{providerInfo.CityStateZip}</span>
        </div>
      </section>
      <div className='provider-info-button-section'>
        <button type='button' id='cancel' name='cancel' title='Cancel' onClick={cancel}>
          Cancel
        </button>
        <button
          type='button'
          id='get-started'
          name='get-started'
          title='Get Started'
          onClick={getStartedClickHandler}>
          Get Started
        </button>
      </div>
    </>
  );
};
