import React from 'react';
import Dashboard from '../Dashboard';
import { storiesOf } from '@storybook/react';
import AdminStore from '../../../../.storybook/store';

const providerDetails = {
  displayName: 'Dr. Margaret Taylor, DDS',
  profileOverviewPeriod: 'January 1 - December 31, 2021',
  currentYear: 2021,
  providerImageUrl:
    '//d1ffafozi03i4l.cloudfront.net/img/silhouettes/silhouette-female_w120h160_v1.jpg',

  totalPatientComments: 11,
  patientReviews: 14,
  averageStarRating: 4.8,
  profileViewOneYear: 632,
  nationalRank: 93,
  stateRank: 97,
  primarySpecialityName: 'Psychiatry'
};

storiesOf('Dashboard', module)
  .addDecorator((story) => <AdminStore story={story()} />)
  .add('Dashboard', () => <Dashboard {...providerDetails} />);
