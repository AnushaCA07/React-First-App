import React, { Fragment, Suspense, useEffect } from 'react';
import './_dashboard.less';
import HeroBanner from './HeroBanner/HeroBanner';
import { useSelector } from 'react-redux';
import EngagementScores from './EngagementScores';
import PatientEngagement from './PatientEngagement';
import ProfileVisits from './ProfileVisits';
import ProfilesCompare from './ProfilesCompare';
import StayTuned from './StayTuned';

import Spinner from '../Spinner/Spinner';
import '@hg/joy/src/globalstyles';

import { HG3Tracker } from '../../utils/tracking';

const Dashboard = () => {
  const { results } = useSelector((state) => state.getDashboardInfo);

  HG3Tracker.SetInitialPageVariables({
    contextData: {},
    pageName: 'dashboard:home',
    server: 'hgmd',
    channel: 'dashboard',
  });

  // Track page load
  HG3Tracker.TrackPage({ pageName: 'dashboard:home' });
  HG3Tracker.OmnitureResetPageName('dashboard:home');

  useEffect(() => {}, [results]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Fragment>
        {Object.keys(results).length === 0 ? (
          <Spinner />
        ) : (
          <div className='dashboard-inner-container'>
            <HeroBanner
              providerDisplayName={results.DisplayName}
              profileOverviewPeriod={results.ProfileOverviewPeriod}
              currentYear={results.CurrentYear}
              providerImageUrl={results.ProviderImageUrl}
              profileViewOneYear={results.ProfileViewOneYear}
              nationalRank={results.NationalRank}
              patientReviews={results.PatientReviews}
            />

            <ProfilesCompare
              profileViewOneYear={results.ProfileViewOneYear}
              stateRank={results.StateRank}
              nationalRank={results.NationalRank}
              stateName={results.StateName}
              primarySpecialityName = {results.PrimarySpecialityName}
            />

            <ProfileVisits
              providerCode={results.ProviderCode}
              profileCompletePercentage={results.ProfileCompletePercentage}
              missingProviderFields={results.MissingFields}
              profileCompletedCount={results.ProfileCompletedCount}
            />

            <PatientEngagement
              patientReviews={results.PatientReviews}
              totalPatientComments={results.TotalPatientComments}
              averageStarRating={results.AverageStarRating}
            />

            <EngagementScores providerCode={results.ProviderCode} />

            <StayTuned providerCode={results.ProviderCode} />
          </div>
        )}
      </Fragment>
    </Suspense>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
