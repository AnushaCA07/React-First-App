import React from 'react';
import AuditSearch from '../AuditSearch';
import { storiesOf } from '@storybook/react';
import AdminStore from '../../../../.storybook/store';

const radioTypeOptions = [
  {
    Name: 'Providers',
    Value: 'providers',
    Show: true,
  },
  {
    Name: 'Submitter',
    Value: 'submitter',
    Show: true,
  },
];

storiesOf('AuditSearch', module)
  .addDecorator((story) => <AdminStore story={story()} />)
  .add('AuditSearch', () => (
    <AuditSearch radioOptions={radioTypeOptions} searchTab='queue'></AuditSearch>
  ));
