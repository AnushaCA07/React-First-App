import React from 'react';

//import stylesheet
import './_heroSection.less';

//components imports
import HighlightSection from './HighlightSection';

//media imports
import Doctors from '../../assets/images/ClaimYourProfile/doctors-grp.png';
import Ellipse from '../../assets/images/ClaimYourProfile/top-ellipse.svg';

const HeroSection = () => {
  return (
    <div className='claim-container'>
      <div className='claim-inner-container'>
        <img className='fixed-top-left-ellipse' src={Ellipse} alt='eclipse' />
        <div className='banner-section'>
          <div className='herobanner-container'>
            <div className='herobanner-inner-container'>
              <div className='banner-section claim-inner-section'>
                <div className='header-navigation'></div>
                <div className='header-section'>
                  <h2 className='header'>
                    <span className='header-one'>Claim Your</span>
                    <span className='header-two'>Free Profile</span>
                  </h2>
                  <h6 className='sub-header'>
                    Healthgrades is the leading destination for patients looking for providers
                  </h6>
                </div>
              </div>
              <div className='fullhexagon-container'></div>
              <HighlightSection />
            </div>
            <img className='right-align-logo' src={Doctors} alt='doctors' />
          </div>
        </div>

        <svg
          className='hero-background-svg'
          data-qa-target='hero-background-svg'
          preserveAspectRatio='none'
          viewBox='0 0 1442 149'>
          <path
            d='M0 149H1442C1294.8 56 922.421 -33.1384 616.576 36.3702C310.73 105.879 78.0896 49.1638 0 0V149Z'
            fill='white'></path>
        </svg>

        <svg
          className='hero-background-svg-mobile'
          data-qa-target='hero-background-svg-mobile'
          preserveAspectRatio='none'
          viewBox='0 0 375 120'>
          <path
            d='M0.0958797 7.28809C31.3141 43.007 103.471 68.0182 187.5 68.0182C271.528 68.0182 343.685 43.007 374.903 7.28809H375V139.313H0V7.28809H0.0958797Z'
            fill='#FFFFFF'></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
