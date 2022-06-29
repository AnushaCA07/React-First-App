import React from 'react';
import Roster from '../Roster';
import { storiesOf } from '@storybook/react';

const roster = {
  Id: '311634E7-D4AD-48C2-980F-1230583A4530',
  FullName: 'Polly A Reese',
  Email: 'pollyreese@hgweb.com',
  ProviderCount: '10',
  UserInfoToken: 'sdfykkeryiyhkdfdoDFdrer',

};
storiesOf('Roster', module).add('Roster', () => <Roster {...roster} />);
