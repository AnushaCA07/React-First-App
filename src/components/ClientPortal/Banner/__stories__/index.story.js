import React from 'react';
import Banner from '../Banner';
import { storiesOf } from '@storybook/react';
import AdminStore from '../../../../../.storybook/store';

const providerDetails = {
  providerDisplayName: 'Roster-Sadem',
  profileOverviewPeriod: 'January 1 - December 31, 2021'
};
const sponsorInformationHandler = () => {
  let info = { IsFacility: true, SponsorType: 'PDCHSP' }
  return info;
};
const sponsorTypeHandler = () => {
  let info = { IsFacility: true, SponsorType: 'PDCHSP' }
  return info;
};
storiesOf('Banner', module)
  .addDecorator((story) => <AdminStore story={story()} />)
  .add('Banner', () => (
    <Banner {...providerDetails} sponsorInformationHandler={sponsorInformationHandler} sponsorTypeHandler={sponsorTypeHandler}/>
  ));
