import React from 'react';
import CP_Provider from '../Provider';
import { storiesOf } from '@storybook/react';
import AdminStore from '../../../../../.storybook/store';

const provider = {
  ProviderName: 'Polly A Reese',
  ProviderId: '33l3g',
  Npi: '1678938',
  PrimarySpecialty: {
    SpecialtyCode: 'PS103',
    SpecialtyName: 'Dentistry'
  },
  Office: {
    Name: 'Central Maine Orthopaedics',
    AddressLine: '690 MINOT AVE',
    CityState: 'STE 1 Auburn, ME 04210',
    Phone: '(222) 222-2222',
    Fax: '309) 620-8750'
  },
  PercentComplete: 72,
  ProfileViews: 222,
  LastAccessedBy: 'Roster-Sadem',
  LastModified: 'December 31, 2021',
  Status: 'employed',
  ProvidersChecked: false
};
storiesOf('CP_Provider', module)
  .addDecorator((story) => <AdminStore story={story()} />)
  .add('CP_Provider', () => <CP_Provider {...provider} />);
