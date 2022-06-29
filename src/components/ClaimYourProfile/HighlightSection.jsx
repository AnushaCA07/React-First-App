import React from 'react';

//styling imports
import './_highlightSection.less';

// media imports
import svgPerson from '../../assets/images/ClaimYourProfile/icon-person.svg';
import svgDoctor from '../../assets/images/ClaimYourProfile/icon-doctor.svg';
import svgReferral from '../../assets/images/ClaimYourProfile/icon-referral.svg';
import svgDoctorOnline from '../../assets/images/ClaimYourProfile/icon-doctor-online.svg';

const highlightData = [
  {
    Heading: 'Increase Visibility',
    Description: 'Personalize your profile to be more compelling.',
    ImageSrc: svgPerson
  },
  {
    Heading: 'Connect with Patients',
    Description: 'Complete profiles receive twice as many appointment bookings.',
    ImageSrc: svgDoctor
  },
  {
    Heading: 'Boost Physician Referrals',
    Description: 'Stand out to physicians making informed referrals.',
    ImageSrc: svgReferral
  },
  {
    Heading: 'Manage your Profile',
    Description: 'Access tools to manage and respond to reviews.',
    ImageSrc: svgDoctorOnline
  }
];

const HighlightSection = () => {
  return (
    <div className='highlight-section'>
      <div className='highlight-section-inner'>
        {highlightData.map((data, index) => 
          <div className='cols' key={index}>
            <span className='count right-border'><img src={data.ImageSrc} alt={data.Heading}/></span>
            <h2 className='heading'>{data.Heading}</h2>
            <p className='sub-heading'>{data.Description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HighlightSection;
