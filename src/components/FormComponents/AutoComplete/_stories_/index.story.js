import React from 'react';
import AutoComplete from '../AutoComplete';
import { storiesOf } from '@storybook/react';

const textBoxData = {
  id: 'provider',
  name: 'provider',
  placeholder: 'Search Provider',
};

const suggestData = [
  {
    firstName: 'Nicole',
    lastName: 'Jeff',
    degree: '',
    city: 'Worcester',
    state: 'MA',
    zipCode: '01607',
    address: '345a Greenwood St Ste B',
    gender: 'Female',
    age: '',
    specialty: 'Developmental Therapy',
    suffix: 'Dr.',
  },
  {
    firstName: 'Julie',
    lastName: 'Jeff',
    degree: 'LSW',
    city: 'Ravenna',
    state: 'OH',
    zipCode: '44266',
    address: '520 N Chestnut St',
    gender: ' Female',
    age: '',
    specialty: 'Counseling',
    suffix: 'Dr.',
  },
  {
    firstName: 'Jeffry',
    lastName: 'Rose',
    degree: '',
    city: 'Nome',
    state: 'AK',
    zipCode: '99762',
    address: '607 Division St',
    gender: 'Male',
    age: '',
    specialty: 'Addiction and Substance Abuse Counseling',
    suffix: 'Dr.',
  },
  {
    firstName: 'Laura',
    lastName: 'Poly',
    degree: 'PA',
    city: 'Boise',
    state: 'ID',
    zipCode: '83712',
    address: '300 E Bannock St',
    gender: 'Female',
    age: '45',
    specialty: 'Physician Assistant (PA) ',
    suffix: '',
  },
  {
    firstName: 'Susan',
    lastName: 'Polyot',
    degree: 'CCS',
    city: 'Elisworth',
    state: 'ME',
    zipCode: '04605',
    address: '248 State St Ste 13b',
    gender: 'Female',
    age: '',
    specialty: 'Addiction and Substance Abuse Counseling',
    suffix: 'Dr.',
  },
  {
    pwid: '',
    firstName: 'Fahmida',
    lastName: 'Poly',
    degree: 'MD',
    city: 'Reading',
    state: 'PA',
    zipCode: '19611',
    address: '420 S 5th Ave Reading',
    gender: 'Female',
    age: '',
    specialty: 'Family Medicine',
    suffix: 'Dr.',
  },
];

storiesOf('AutoComplete', module).add('AutoComplete', () => (
  <AutoComplete textBoxData={textBoxData} suggestData={suggestData} />
));
