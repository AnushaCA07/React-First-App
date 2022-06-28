import React from 'react';
import ClaimYourProfileFlow from './ClaimYourProfileFlow';
import SearchProviderForm from './SearchProviderForm';

//stylesheet imports
import './_body.less';

//media imports
import svgHG from '../../assets/images/ClaimYourProfile/brand-logo-hg.svg';
import svgMNT from '../../assets/images/ClaimYourProfile/brand-logo-mnt.svg';
import svgHFC from '../../assets/images/ClaimYourProfile/brand-logo-hfc.svg';

const Body = () => {
  return (
    <div className='body-section'>
      <h2 className='header'>Let’s get started in 3 simple steps</h2>
      <div className='main-wrapper'>
        <div className='workflow-section'>
          <ClaimYourProfileFlow />
        </div>
        <div className='search-provider-section'>
          <SearchProviderForm />
          <div className='dv-branding'>
            <img className='brand-hg' src={svgHG} />
            <img className='brand-mnt' src={svgMNT} />
            <img className='brand-hfc' src={svgHFC} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
