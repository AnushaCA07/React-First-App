import React from 'react';
import QuickFilters from '../QuickFilters';
import { storiesOf } from '@storybook/react';

const quickFilters = {
  filterType: 'practices',
  practices: [
    {
      Id: '33335050-4D50-0059-0000-000000000000',
      Name: 'Bucks County Family Practice PC',
      Count: 1,
      Unaffiliated: false,
      Selected: false,
    },
    {
      Id: '36413750-3830-0038-0000-000000000000',
      Name: 'St. Mary Health Main Campus',
      Count: 1,
      Unaffiliated: false,
      Selected: false,
    },
    {
      Id: '00000000-0000-0000-0000-000000000000',
      Name: 'Unaffiliated Offices',
      Count: 12,
      Unaffiliated: true,
      Selected: false,
    },
  ],
  missingFields: [
    {
      FilterValue: 'has_insurance',
      Name: 'Insurance',
      Count: 1,
      Selected: false,
    },
    {
      FilterValue: 'has_display_image',
      Name: 'Photos',
      Count: 4,
      Selected: false,
    },
    {
      FilterValue: 'has_conditions',
      Name: 'Conditions',
      Count: 2,
      Selected: false,
    },
    {
      FilterValue: 'has_procedures',
      Name: 'Procedures',
      Count: 2,
      Selected: false,
    },
    {
      FilterValue: 'has_about_care_content',
      Name: 'Profile Commentary',
      Count: 7,
      Selected: false,
    },
    {
      FilterValue: 'has_facility',
      Name: 'Hospital Affiliations',
      Count: 4,
      Selected: false,
    },
  ],
  specialties: [
    {
      FilterValue: 'PS158',
      Name: 'Chiropractic',
      Count: 1,
      Selected: false,
    },
    {
      FilterValue: 'PS208',
      Name: 'Cosmetic, Plastic & Reconstructive Surgery',
      Count: 1,
      Selected: false,
    },
    {
      FilterValue: 'PS328',
      Name: 'Dentistry',
      Count: 1,
      Selected: false,
    },
    {
      FilterValue: 'PS371',
      Name: 'Home Health (Aide)',
      Count: 1,
      Selected: false,
    },
    {
      FilterValue: 'PS412',
      Name: 'Internal Medicine',
      Count: 3,
      Selected: false,
    },
    {
      FilterValue: 'PS045',
      Name: 'Nursing (Nurse Practitioner)',
      Count: 1,
      Selected: false,
    },
    {
      FilterValue: 'PS606',
      Name: 'Ophthalmology',
      Count: 1,
      Selected: false,
    },
    {
      FilterValue: 'PS609',
      Name: 'Optometry',
      Count: 2,
      Selected: false,
    },
    {
      FilterValue: 'PS802',
      Name: 'Psychiatry',
      Count: 1,
      Selected: false,
    },
  ],
};
storiesOf('QuickFilters', module).add('QuickFilters', () => (
  <QuickFilters {...quickFilters} />
));
