import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { HG3Tracker } from '../../utils/tracking';

const EngagementScores = (props) => {
  const redirectToPES = () => {
    HG3Tracker.OmnitureTrackLink('dashboard|survey-acquisition-tools');
    let fullPath = `/patientexperience/reviews/${props.providerCode}`;
    window.location.href = fullPath;
  };

  const redirectToReviews = () => {
    HG3Tracker.OmnitureTrackLink('dashboard|access-your-reviews');
    let fullPath = `/patientexperience/reviews/${props.providerCode}`;
    window.location.href = fullPath;
  };

  const { providerCode } = props;
  return (
    <Fragment>
      <div className='gray-container engagement-scores-container'>
        <div className='gray-inner engagement-scores-inner'>
          <h1>
            Tips to Increase Your{' '}
            <span className='text-inline-accent'>
              Patient Engagement Scores
            </span>
          </h1>

          <div className='section'>
            <div className='cols'>
              <div className='inner-section'>
                <img
                  className='icon'
                  src='/public/images/message-icon.png'
                  alt='comments'
                />
                <p>
                  Respond to patient comments (both positive and negative) in a
                  timely and professional manner.
                </p>
              </div>
            </div>
            <div className='cols middle-section'>
              <div className='inner-section'>
                <img
                  className='icon'
                  src='/public/images/feedback.png'
                  alt='feedback'
                />
                <p>Seek feedback from your patients.</p>
                <p className='link'>
                  <a onClick={() => redirectToPES()}>
                    Get the free survey acquisition tools!
                  </a>
                </p>
              </div>
            </div>
            <div className='cols'>
              <div className='inner-section'>
                <img
                  className='icon'
                  src='/public/images/search-blue.png'
                  alt='search'
                />
                <p className='last-sec'>
                  Monitor and review patient comments on a regular Basis.
                </p>
              </div>
            </div>
          </div>

          <div className='btn-container'>
            <button onClick={() => redirectToReviews()}>
              Access your reviews
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

EngagementScores.propTypes = {
  providerCode: PropTypes.string,
};
export default EngagementScores;
