import React from 'react';
import HeroBanner from '../HeroBanner';
import { storiesOf } from '@storybook/react';

const providerDetails = {
  providerDisplayName: 'Dr. Margaret Taylor, DDS',
  profileOverviewPeriod: 'January 1 - December 31, 2021',
  currentYear: 2021,
  providerImageUrl:
    '//d1ffafozi03i4l.cloudfront.net/img/silhouettes/silhouette-female_w120h160_v1.jpg',
  profileViewOneYear: 632,
};

storiesOf('HeroBanner', module).add('HeroBanner', () => (
  <HeroBanner {...providerDetails} />
));
