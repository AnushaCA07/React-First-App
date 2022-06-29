import React from 'react';
import Search from '../Search';
import { storiesOf } from '@storybook/react';
import AdminStore from '../../../../.storybook/store';

const updateRadioOptions = (option) => {
  //Todo
};
storiesOf('Search', module)
  .addDecorator((story) => <AdminStore story={story()} />)
  .add('Search', () => (
    <Search
      type='pwid'
      value='33l3g'
      searchBy='providers'
      currentUserId='311634E7-D4AD-48C2-980F-1230583A4530'
      updateRadioOptions={updateRadioOptions}
    />
  ));
