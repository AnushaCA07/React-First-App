import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfilesCompare = (props) => {
  const { profileViewOneYear, nationalRank, stateRank, stateName, primarySpecialityName } = props;

  const ordinal = (number) => {
    const english_ordinal_rules = new Intl.PluralRules('en', {
      type: 'ordinal',
    });
    const suffixes = {
      one: 'st',
      two: 'nd',
      few: 'rd',
      other: 'th',
    };
    const suffix = suffixes[english_ordinal_rules.select(number)];
    return suffix;
  };

  return (
    <Fragment>
      <div className='white-container profiles-compare-container'>
        <p className='star'>* This number is total patient reviews published on site and not only the last 12 months.</p>
        <div className='white-inner profiles-compare-inner'>
          <div className='section-left'>
            <h1>
              How Your Profile{' '}
              <span className='text-inline-accent'>Compares</span>
            </h1>
            <h2>Profile View Percentile Ranking by Specialty</h2>
            <p className='contents'>
              This statistic looks at your specialty only, and based on profile views, returns a percentile ranking both nationally and by the state in which you practice.
            </p>
            <p className='contents'>
              Your {profileViewOneYear} visits place you in the {nationalRank}
              {ordinal(nationalRank)} Percentile for {primarySpecialityName} Physicians
              nationality and place you in the
            </p>
            <p className='heighlight-ranking'>
              {stateRank}
              {ordinal(stateRank)} Percentile for {stateName}
            </p>
          </div>

          <div className='section-right'>
            <h1>
              How Your Profile{' '}
              <span className='text-inline-accent'>Compares</span>
            </h1>
            <div className='inner-section'>
              <img
                src='/public/images/national-award.png'
                alt='award'
                className='img1'
              />
              <span className='percentage'>
                {nationalRank}
                <span className='content'>
                  <span className='suffix'>{ordinal(nationalRank)}</span>{' '}
                  Percentile
                </span>
              </span>
              <p className='ranking-content'>National Ranking</p>
            </div>
            <img
              src='/public/images/dots.png'
              alt='rectangle_dotted icon'
              className='right-dotted-icon'
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ProfilesCompare.propTypes = {
  profileViewOneYear: PropTypes.number,
  nationalRank: PropTypes.number,
  stateRank: PropTypes.number,
  stateName: PropTypes.string,
  primarySpecialityName: PropTypes.string
};

export default ProfilesCompare;
