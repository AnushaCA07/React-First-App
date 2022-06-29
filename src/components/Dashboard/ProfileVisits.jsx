import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { missingFields } from '../../utils/constant-data';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Gauge from '../Gauge/Gauge';

import { HG3Tracker } from '../../utils/tracking';

const ProfileVisits = (props) => {
  const {
    providerCode,
    profileCompletePercentage,
    missingProviderFields,
    profileCompletedCount,
  } = props;

  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  };

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const redirectToSection = (sectionName, url) => {
    HG3Tracker.OmnitureTrackLink('dashboard|' + sectionName + '');
    let fullPath = url.replace('{pwid}', providerCode);
    window.location.href = fullPath;
  };

  let minMissingFields = 1;

  const getFilteredFields = (data) => {
    let filteredData = data.filter(function (el) {
      return missingProviderFields[el.fieldName] == false;
    });
    return filteredData;
  };

  const generateMissingFields = (data) => {
    let filteredData = getFilteredFields(data);
    let index = 0;
    let tempArray = [];
    if (windowDimensions.width > 760) minMissingFields = 3;
    for (index = 0; index < filteredData.length; index += minMissingFields) {
      let myChunk = filteredData.slice(index, index + minMissingFields);
      tempArray.push(myChunk);
    }

    return (
      <Carousel
        showArrows={true}
        showStatus={false}
        showIndicators={false}
        infiniteLoop={true}
        showThumbs={false}
        autoFocus={false}
        useKeyboardArrows={true}
        autoPlay={false}
        swipeable={true}
        interval={8000}
      >
        {tempArray.map((data, mainIndex) => (
          <div key={mainIndex} className='missing-section'>
            {data.map((value, index) => (
              <Fragment key={index}>
                <div
                  key={index}
                  className={`cols ${index == 1 ? 'middle-section' : ''}`}
                >
                  <img className='icons' src={value.iconUrl} alt='' />
                  <p className='heading'>{value.description}</p>
                  <button
                    className='btn'
                    onClick={() =>
                      redirectToSection(value.fieldName, value.redirectUrl)
                    }
                  >
                    {value.buttonContent}
                  </button>
                </div>
              </Fragment>
            ))}
          </div>
        ))}
      </Carousel>
    );
  };

  return (
    <Fragment>
      <div className='gray-container profile-visits-container'>
        <div className='gray-inner profile-visits-inner'>
          <h1>
            Increase your{' '}
            <span className='text-inline-accent'>Profile Visits</span>
          </h1>
          <div className='percent-complete-section'>
            <div className='dial-section'>
              <h2 className='mobile-view'>Complete Your Profile</h2>
              <div>
                <Gauge
                  radius={60}
                  percent={profileCompletePercentage}
                  backgroundColor={'#E3E3E3'}
                  fillColor={'#74D9E2'}
                  font={'36px'}
                />
                <p className='mobile-view '>
                  <span className='completed'>
                    {profileCompletedCount}/{missingFields.length} Completed
                  </span>
                </p>
              </div>
            </div>
            <div className='contents'>
              <h2 className='desktop-view'>Complete Your Profile</h2>
              <p>
                Complete the goals below to help increase visits to your profile
              </p>
              <p>
                <span className='desktop-view completed'>
                  {profileCompletedCount}/{missingFields.length} Completed
                </span>
              </p>
            </div>
          </div>
          {missingProviderFields != undefined &&
            generateMissingFields(missingFields)}
        </div>
      </div>
    </Fragment>
  );
};

ProfileVisits.propTypes = {
  providerCode: PropTypes.string,
  profileCompletePercentage: PropTypes.number,
  missingProviderFields: PropTypes.object,
  profileCompletedCount: PropTypes.number,
};

export default ProfileVisits;
