import React from 'react';
import SearchContainer from '../SearchContainer';
import { storiesOf } from '@storybook/react';
import AdminStore from '../../../../.storybook/store';

storiesOf('Search Container', module)
  .addDecorator((story) => <AdminStore story={story()} />)
  .add('Search Container', () => <SearchContainer />);
