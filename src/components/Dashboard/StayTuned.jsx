import React, { Fragment } from 'react';
import { HG3Tracker } from '../../utils/tracking';

const StayTuned = (props) => {
  const redirectToProfile = () => {
    HG3Tracker.OmnitureTrackLink('dashboard|update-your-profile');
    let fullPath = `/provider/profile/${props.providerCode}`;
    window.location.href = fullPath;
  };
  return (
    <Fragment>
      <div className='blue-container stay-tuned-container'>
        <div className='blue-inner stay-tuned-inner'>
          <h1>
            <span className='text-inline-accent'>Stay Tuned</span>
          </h1>
          <img
            src='/public/images/logo-watermark.png'
            alt='logo watermark'
            className='right-align-logo'
          />
          <p>
            As the nation continues to reflect on 2021, and transitions back to
            life a little more like it used to be, here’s a look at what we’re
            seeing now in consumer behavior and traffic to Healthgrades.com
          </p>
          <div className='inner-section'>
            <div className='cols'>
              <img
                src='/public/images/hg-search.png'
                alt='search'
                className='icons'
              />
              <p className='heading'>
                #1 in Provider Search 200 million annual visitors to
                healthgrades.com
              </p>
            </div>
            <div className='cols'>
              <img
                src='/public/images/quality.png'
                alt='search'
                className='icons'
              />
              <p className='heading'>9.3 MILLION ratings and reviews</p>
            </div>
            <div className='cols'>
              <img
                src='/public/images/no-delay.png'
                alt='search'
                className='icons'
              />
              <p className='heading head2'>
                83% of consumers are not delaying treatment.
              </p>
            </div>
            <div className='cols'>
              <img
                src='/public/images/namesearch.png'
                alt='search'
                className='icons last-sec'
              />
              <p className='heading'>
                Top 3 Ranking on Google for physician name searches.
              </p>
            </div>
          </div>
          <p className='pad-top-3'>
            Healthgrades continues to see dramatic traffic increases week over
            week. Patients are realizing how important their health is and
            beginning to search for healthcare professionals once again.
          </p>
          <p>
            Healthgrades commitment to provide trusted information that helps
            consumers and providers make meaningful connections continues to
            remain at the forefront of our mission-now and always.
          </p>
          <h2>Be Found. Be Seen.</h2>
          <div className='btn-container'>
            <button onClick={() => redirectToProfile()}>
              Update Your Profile!
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default StayTuned;
