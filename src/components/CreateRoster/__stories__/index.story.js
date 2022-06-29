import React from 'react';
import CreateRoster from '../CreateRoster';
import { storiesOf } from '@storybook/react';
import AdminStore from '../../../../.storybook/store';

storiesOf('CreateRoster', module)
  .addDecorator((story) => <AdminStore story={story()} />)
  .add('CreateRoster', () => <CreateRoster></CreateRoster>);
