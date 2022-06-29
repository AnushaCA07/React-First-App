import React, { Fragment } from 'react';
import './_heroBanner.less';
import PropTypes from 'prop-types';
import '@hg/joy/src/globalstyles';

const HeroBanner = (props) => {
  const {
    providerDisplayName,
    profileOverviewPeriod,
    currentYear,
    providerImageUrl,
    profileViewOneYear,
    nationalRank,
    patientReviews,
  } = props;

  return (
    <Fragment>
      <div className='herobanner-container'>
        <div className='herobanner-inner-container'>
          <div className='banner-section'>
            <div className='top-sec'>
              <img
                className='provider-img'
                src={providerImageUrl}
                alt='provider image'
              />
              <h1 className='heading'>Hello {providerDisplayName}</h1>
            </div>
            <div>
              <h2 className='subheading'>
                Your{' '}
                <span className='text-inline'>
                  Healthgrades Profile Overview
                </span>{' '}
                ({profileOverviewPeriod})
              </h2>
              <p className='para'>
                From pandemics to telehealth, the physician to patient
                connection continues to challenge. Healthgrades is here to help.
                See how your presence on Healthgrades stacks up.
              </p>
            </div>
          </div>
          <div className='fullhexagon-container'>
            <img
              src='/public/images/full-hexagon.png'
              className='fullhexagon'
            />
          </div>

          <div className='highlight-section'>
            <div className='highlight-section-inner'>
              <div className='cols'>
                <img
                  src='/public/images/profile-view.png'
                  alt='profile view'
                  className='icons'
                />
                <span className='count right-border'>{profileViewOneYear}</span>
                <p className='heading'>Profile Views</p>
              </div>
              <div className='cols'>
                <img
                  src='/public/images/award.png'
                  alt='Award'
                  className='icons'
                />
                <span className='count right-border'>
                  {nationalRank}
                  <span className='percentage'>%</span>
                </span>
                <p className='heading'>National Ranking</p>
              </div>
              <div className='cols'>
                <img
                  src='/public/images/rating.png'
                  alt='rating'
                  className='icons'
                />
                <span className='count'>{patientReviews}</span>
                <p className='heading'>
                  Patient Reviews<span>*</span>
                </p>
              </div>
            </div>
          </div>

          <svg
            className='hero-background-svg'
            data-qa-target='hero-background-svg'
            preserveAspectRatio='none'
            viewBox='0 0 1442 149'
          >
            <path
              d='M0 149H1442C1294.8 56 922.421 -33.1384 616.576 36.3702C310.73 105.879 78.0896 49.1638 0 0V149Z'
              fill='white'
            ></path>
          </svg>

          <svg
            className='hero-background-svg-mobile'
            data-qa-target='hero-background-svg-mobile'
            preserveAspectRatio='none'
            viewBox='0 0 375 120'
          >
            <path
              d='M0.0958797 7.28809C31.3141 43.007 103.471 68.0182 187.5 68.0182C271.528 68.0182 343.685 43.007 374.903 7.28809H375V139.313H0V7.28809H0.0958797Z'
              fill='#FFFFFF'
            ></path>
          </svg>
        </div>
        <img
          className='right-align-logo'
          src='/public/images/logo.png'
          alt='HG Logo'
        />
      </div>
    </Fragment>
  );
};

HeroBanner.propTypes = {
  providerDisplayName: PropTypes.string,
  profileOverviewPeriod: PropTypes.string,
  currentYear: PropTypes.number,
  providerImageUrl: PropTypes.string,
  profileViewOneYear: PropTypes.number,
  nationalRank: PropTypes.number,
  patientReviews: PropTypes.number,
};

export default HeroBanner;
