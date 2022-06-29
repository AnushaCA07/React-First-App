import React from 'react';
import Alert from '../Alert';
import { storiesOf } from '@storybook/react';
import AdminStore from '../../../../.storybook/store';

const alertData = {
  heading: 'Provider delete',
  message: 'Are you sure want to delete the provider?',
  Show: true,
};

storiesOf('Alert', module)
  .addDecorator((story) => <AdminStore story={story()} />)
  .add('Alert', () => <Alert {...alertData}></Alert>);
