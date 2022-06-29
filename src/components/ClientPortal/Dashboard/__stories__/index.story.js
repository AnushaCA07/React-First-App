import React from 'react';
import ClientPortalDashboard from '../ClientPortalDashboard';
import { storiesOf } from '@storybook/react';
import AdminStore from '../../../../../.storybook/store';

const providerDetails = {
  providerDisplayName: 'Roster-Sadem',
  profileOverviewPeriod: 'January 1 - December 31, 2021',
  providersFound: 15,
  providers: [
    {
      FirstName: 'polly',
      LastName: 'reese',
      DisplayName: 'Polly A Reese',
      ProviderCode: '33l3g',
      NPI: '1678938',
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
      ProfileCompleteness: '72',
      ProfileViews: 222,
      LastAccessedBy: {
        RosterName: 'Roster-Sadem',
        LastAccessDate: 'December 31, 2021'
      },
      Status: 'employed',
      ProvidersChecked: false
    },
    {
      FirstName: 'Polly',
      LastName: 'Test1',
      DisplayName: 'Polly Test1',
      ProviderCode: '62CLR',
      NPI: '1678938',
      PrimarySpecialty: {
        SpecialtyCode: 'PS103',
        SpecialtyName: 'Internal Medicine'
      },
      Office: {
        Name: 'Central Maine ',
        AddressLine: '690 MINOT AVE',
        CityState: 'STE 1 Auburn, ME 04210',
        Phone: '(222) 222-2222',
        Fax: '309) 620-8750'
      },
      ProfileCompleteness: '68',
      ProfileViews: 562,
      LastAccessedBy: {
        RosterName: 'Roster-Sadem',
        LastAccessDate: 'December 31, 2021'
      },
      Status: 'affiliated',
      ProvidersChecked: false
    },
    {
      FirstName: 'Polly',
      LastName: 'Test2',
      DisplayName: 'Polly Test2',
      ProviderCode: '52CLM',
      NPI: '1678938',
      PrimarySpecialty: {
        SpecialtyCode: 'PS103',
        SpecialtyName: 'Nursing (Nurse Practitioner)'
      },
      Office: {
        Name: 'Central Maine ',
        AddressLine: '690 MINOT AVE',
        CityState: 'STE 1 Auburn, ME 04210',
        Phone: '(222) 222-2222',
        Fax: '309) 620-8750'
      },
      ProfileCompleteness: '98',
      ProfileViews: 1002,
      LastAccessedBy: {
        RosterName: 'Roster-Sadem',
        LastAccessDate: 'December 31, 2021'
      },
      Status: 'affiliated',
      ProvidersChecked: false
    },
    {
      FirstName: 'Polly',
      LastName: 'Test3',
      DisplayName: 'Polly Test3',
      ProviderCode: '92CLN',
      NPI: '1678938',
      PrimarySpecialty: {
        SpecialtyCode: 'PS103',
        SpecialtyName: 'Home Health (Aide)'
      },
      Office: {
        Name: 'Central Maine ',
        AddressLine: '690 MINOT AVE',
        CityState: 'STE 1 Auburn, ME 04210',
        Phone: '(222) 222-2222',
        Fax: '309) 620-8750'
      },
      ProfileCompleteness: '30',
      ProfileViews: 1002,
      LastAccessedBy: {
        RosterName: 'Roster-Sadem',
        LastAccessDate: 'December 31, 2021'
      },
      Status: 'employed',
      ProvidersChecked: false
    },
    {
      FirstName: 'Polly',
      LastName: 'Test4',
      DisplayName: 'Polly Test4',
      ProviderCode: '32CLR',
      NPI: '1678938',
      PrimarySpecialty: {
        SpecialtyCode: 'PS103',
        SpecialtyName: 'Internal Medicine'
      },
      Office: {
        Name: 'Central Maine ',
        AddressLine: '690 MINOT AVE',
        CityState: 'STE 1 Auburn, ME 04210',
        Phone: '(222) 222-2222',
        Fax: '309) 620-8750'
      },
      ProfileCompleteness: '50',
      ProfileViews: 1002,
      LastAccessedBy: {
        RosterName: 'Roster-Sadem',
        LastAccessDate: 'December 31, 2021'
      },
      Status: 'affiliated',
      ProvidersChecked: false
    },
    {
      FirstName: 'Polly',
      LastName: 'Test5',
      DisplayName: 'Polly Test5',
      ProviderCode: '24CLR',
      NPI: '1678938',
      PrimarySpecialty: {
        SpecialtyCode: 'PS103',
        SpecialtyName: 'Dentistry'
      },
      Office: {
        Name: 'Geriatric Internal Medicine',
        AddressLine: '690 MINOT AVE',
        CityState: 'STE 1 Auburn, ME 04210',
        Phone: '(222) 222-2222',
        Fax: '309) 620-8750'
      },
      ProfileCompleteness: '20',
      ProfileViews: 1002,
      LastAccessedBy: {
        RosterName: 'Roster-Sadem',
        LastAccessDate: 'December 31, 2021'
      },
      Status: 'employed',
      ProvidersChecked: false
    }
  ],
  radioOptions: [
    {
      Name: 'NPI',
      Value: 'NPI',
      Show: true
    },
    {
      Name: 'PWID',
      Value: 'PWID',
      Show: true
    }
  ]
};
storiesOf('CP_Dashboard', module)
  .addDecorator((story) => <AdminStore story={story()} />)
  .add('CP_Dashboard', () => <ClientPortalDashboard {...providerDetails} />);
