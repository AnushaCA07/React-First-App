import React from 'react';
import Spinner from '../Spinner';
import { storiesOf } from '@storybook/react';

storiesOf('Spinner', module).add('Spinner', () => (
  <Spinner cta={true}/>
));
