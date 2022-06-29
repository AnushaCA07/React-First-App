import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const PatientEngagement = (props) => {
  const { patientReviews, totalPatientComments, averageStarRating } = props;

  PatientEngagement;
  return (
    <Fragment>
      <div className='blue-container patient-engagement-container'>
        <div className='blue-inner patient-engagement-inner'>
          <h1>
            Patient <span className='text-inline-accent'>Engagement</span>
          </h1>
          <p>
            Your Healthgrades online profile includes an opportunity for
            patients to complete a structured review and/ or provide a comment
            evaluating their experience during an appointment.
          </p>
          <div className='section'>
            <div className='cols'>
              <span className='count right-border'>{patientReviews}</span>
              <p className='heading'>Your Total Completed Patient Reviews</p>
            </div>
            <div className='cols'>
              <span className='count right-border'>{totalPatientComments}</span>
              <p className='heading'>Total Patient Comments</p>
            </div>
            <div className='cols no-border'>
              <span className='count'>{averageStarRating}</span>
              <p className='heading'>Average Star Rating (out of 5 stars)</p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

PatientEngagement.propTypes = {
  patientReviews: PropTypes.number,
  totalPatientComments: PropTypes.number,
  averageStarRating: PropTypes.number,
};

export default PatientEngagement;
