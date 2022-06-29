import React from 'react';
import RosterList from '../RosterList';
import { storiesOf } from '@storybook/react';

import AdminStore from '../../../../.storybook/store';

const props = {
  recordsFound: 10,
  rosters: [
    {
      Id: '311634E7-D4AD-48C2-980F-1230583A4530',
      FullName: 'Polly A Reese',
      Email: 'pollyreese@hgweb.com',
      ProviderCount: '10',
      UserInfoToken: 'sdfykkeryiyhkdfdoDFdrer',

    },
    {
      Id: '311634E7-D4AD-48C2-980F-1230583A4530',
      FullName: 'Michael Regan',
      Email: 'mich@hgweb.com',
      ProviderCount: '8',
      UserInfoToken: 'sdfykkeryiyhkdfdoDFdrer',

    },
  ],
};

storiesOf('RosterList', module)
  .addDecorator((story) => <AdminStore story={story()} />)
  .add('RosterList', () => <RosterList {...props} />);
