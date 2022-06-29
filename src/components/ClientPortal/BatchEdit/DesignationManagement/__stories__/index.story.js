import React from 'react';
import ClientPortalDesignation from '../Designation';
import { storiesOf } from '@storybook/react';
import AdminStore from '../../../../../../.storybook/store';

const providerDetails = {
  providerDisplayName: 'Roster-Sadem',
  profileOverviewPeriod: 'January 1 - December 31, 2021',
  providersFound: 15,
  providerList: [
    {
      FirstName: 'polly',
      LastName: 'reese',
      ProviderName: 'Polly A Reese',
      ProviderId: '33l3g',
      NPI: '1678938',
      Gender: 'Male',
      PrimarySpecialty: {
        SpecialtyCode: 'PS103',
        SpecialtyName: 'Dentistry'
      },
      IsSponsored: false,
      SponsorCode: 'PTRBN',
      SponsorType: 'AFFILIATED',
      Designated: false
    },
    {
      FirstName: 'Polly',
      LastName: 'Test1',
      ProviderName: 'Polly Test1',
      ProviderId: '62CLR',
      NPI: '1678938',
      Gender: 'Male',
      PrimarySpecialty: {
        SpecialtyCode: 'PS103',
        SpecialtyName: 'Internal Medicine'
      },
      IsSponsored: false,
      SponsorCode: 'OCHSNR',
      SponsorType: 'AFFILIATED',
      Designated: false
    },
    {
      FirstName: 'Polly',
      LastName: 'Test2',
      ProviderName: 'Polly Test2',
      ProviderId: '52CLM',
      NPI: '1678938',
      Gender: 'Male',
      PrimarySpecialty: {
        SpecialtyCode: 'PS103',
        SpecialtyName: 'Nursing (Nurse Practitioner)'
      },
      IsSponsored: true,
      SponsorCode: '',
      SponsorType: 'STANDARD',
      Designated: true
    },
    {
      FirstName: 'Polly',
      LastName: 'Test3',
      ProviderName: 'Polly Test3',
      ProviderId: '92CLN',
      NPI: '1678938',
      Gender: 'Male',
      PrimarySpecialty: {
        SpecialtyCode: 'PS103',
        SpecialtyName: 'Home Health (Aide)'
      },
      IsSponsored: false,
      SponsorCode: 'PCTCA',
      SponsorType: 'EMPLOYED',
      Designated: false
    },
    {
      FirstName: 'Polly',
      LastName: 'Test4',
      ProviderName: 'Polly Test4',
      ProviderId: '32CLR',
      NPI: '1678938',
      Gender: 'Female',
      PrimarySpecialty: {
        SpecialtyCode: 'PS103',
        SpecialtyName: 'Internal Medicine'
      },
      IsSponsored: false,
      SponsorCode: 'EHGSLFNOAR',
      SponsorType: 'EMPLOYED',
      Designated: false
    },
    {
      FirstName: 'Polly',
      LastName: 'Test5',
      ProviderName: 'Polly Test5',
      ProviderId: '24CLR',
      NPI: '1678938',
      Gender: 'Male',
      PrimarySpecialty: {
        SpecialtyCode: 'PS103',
        SpecialtyName: 'Dentistry'
      },
      IsSponsored: true,
      SponsorCode: '',
      SponsorType: 'STANDARD',
      Designated: true
    },
    {
      FirstName: 'Ram',
      LastName: 'Test3',
      ProviderName: 'Ram Test3',
      ProviderId: '22CLR',
      NPI: '1678938',
      Gender: 'Male',
      PrimarySpecialty: {
        SpecialtyCode: 'PS103',
        SpecialtyName: 'Home Health (Aide)'
      },
      IsSponsored: false,
      SponsorCode: ' LEMON',
      SponsorType: 'AFFILIATED',
      Designated: false
    }
  ],
  radioOptions: [
    {
      Name: 'Employed provider',
      Value: 'Employed provider',
      Show: true
    },
    {
      Name: 'Affiliated provider',
      Value: 'Affiliated provider',
      Show: true
    }
  ],
  isError: false,
  errorResponse: [],
  //pwids: ['XYLHG2F', 'GF45R', 'G7YTK', 'YSN4Y', '23RXC', '33L3G', '3X4SV'],
  clientFacilities: [
    { FacilityCode: 'C394E1', FacilityName: 'Adena Pike Medical Center, Waverly, OH' },
    { FacilityCode: '103290', FacilityName: 'Adena Regional Medical Center, Chillicothe, OH' },
    { FacilityCode: 'ABF92E', FacilityName: 'Adena Greenfield Medical Center, Greenfield, OH' }
  ],
  employmentTypes: ['Employed', 'Affiliated'],
  providerInfo: [
    {
      HasOasSideBySide: false,
      IsHmsSourced: false,
      IsSponsored: false,
      LastAccessedBy: 'CAtest Pdchsp',
      LastModified: '2022-06-01T08:08:47.937',
      Npi: '1972994440',
      OasMmpLink: '',
      Office: {
        Name: '',
        AddressLine: '8270 Willow Oaks Corporate Dr',
        CityState: 'Fairfax, VA 22031'
      },
      PercentComplete: 26,
      PercentCompleteStyle: { width: '26%' },
      ProfileViews: 0,
      ProviderId: 'XYLHG2F',
      ProviderName: 'Bellusci, Jessica L.',
      Selected: false,
      SpecialtyCode: 'PS585',
      SpecialtyName: 'Occupational Therapy',
      SponsorType: 'EMPLOYED'
    }
  ],
  accountInfo: {
    clientCode: 'ADHS-PDCHSP',
    clientCodes: [
      {
        ClientCode: 'AMIT',
        ClientName: 'AMITA Health Medical Group',
        ClientToProductCode: 'AMIT-MAP',
        DisplayClientCode: 'AMITA Health Medical Group:AMIT-MAP'
      },
      {
        ClientCode: 'HCANFD',
        ClientName: 'HCA - North Florida',
        ClientToProductCode: 'HCANFD-MAP',
        DisplayClientCode: 'HCA - North Florida:HCANFD-MAP'
      }
    ],
    currentRole: 'Client_Admin',
    email: 'CaTestPdchsp@hgweb.com',
    filters: null,
    firstName: 'CAtest',
    isImpersonate: true,
    lastName: 'Pdchsp',
    page: 1,
    recordsPerPage: 10,
    role: undefined,
    sortBy: 'name',
    sortOrder: 'asc',
    userId: 'c235d727-97f2-49ef-adac-f2e35e3003f5'
  },
  designationInfo: [
    {
      pwid: 'XYLHG2F',
      facilityCode: null,
      facilityName: null,
      employmentType: 'Standard'
    }
  ],
  selectedProviders: {
    '2P9VV': {
      HasOasSideBySide: false,
      IsHmsSourced: false,
      IsSponsored: false,
      LastAccessedBy: 'CAtest Pdchsp',
      LastModified: '2022-06-01T08:08:47.937',
      Npi: '1972994440',
      OasMmpLink: '',
      Office: {
        Name: '',
        AddressLine: '8270 Willow Oaks Corporate Dr',
        CityState: 'Fairfax, VA 22031'
      },
      PercentComplete: 26,
      PercentCompleteStyle: { width: '26%' },
      ProfileViews: 0,
      ProviderId: 'XYLHG2F',
      ProviderName: 'Bellusci, Jessica L.',
      Selected: false,
      SpecialtyCode: 'PS585',
      SpecialtyName: 'Occupational Therapy',
      SponsorType: 'EMPLOYED'
    },
    '2VR4T': {
      HasOasSideBySide: false,
      IsHmsSourced: false,
      IsSponsored: false,
      LastAccessedBy: 'Aastha Test',
      LastModified: '2022-05-27T14:01:46.7',
      Npi: '1467482851',
      OasMmpLink: '',
      Office: {
        Name: 'THE CHESNEY CENTER FOR SPEECH LANGUAGE & LISTENING LLC',
        AddressLine: '5536 Superior Dr, Ste C',
        CityState: 'Baton Rouge, LA 70816'
      },
      PercentComplete: 32,
      PercentCompleteStyle: { width: '32%' },
      ProfileViews: 26,
      ProviderId: '2VR4T',
      ProviderName: 'Belaire, Christine',
      Selected: false,
      SpecialtyCode: 'PS211',
      SpecialtyName: 'Counseling',
      SponsorType: 'STANDARD'
    },
    '3LQNP0R924': {
      HasOasSideBySide: false,
      IsHmsSourced: false,
      IsSponsored: false,
      LastAccessedBy: 'Dinakaran G',
      LastModified: '2022-05-26T16:50:52.227',
      Npi: '1447886692',
      OasMmpLink: '',
      Office: { Name: '', AddressLine: '3427 Farr Rd Ste B', CityState: 'Fruitport, MI 49415' },
      PercentComplete: 18,
      PercentCompleteStyle: { width: '18%' },
      ProfileViews: 4,
      ProviderId: '3LQNP0R924',
      ProviderName: 'Croff, Delphia',
      Selected: false,
      SpecialtyCode: 'PS045',
      SpecialtyName: 'Nursing (Nurse Practitioner)',
      SponsorType: 'STANDARD'
    }
  }
};

storiesOf('CP_Designation', module)
  .addDecorator((story) => <AdminStore story={story()} />)
  .add('CP_Designation', () => <ClientPortalDesignation {...providerDetails} />);
