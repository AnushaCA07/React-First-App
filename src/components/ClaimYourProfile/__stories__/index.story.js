import React from 'react';
import Index from '../Index';
import { storiesOf } from '@storybook/react';
import AdminStore from '../../../../.storybook/store';

const providerData = {
  ProviderData: {
    FirstName: 'Polly',
    LastName: 'Reese',
    Email: 'polly@hgweb.com',
    AlternateEmail: 'demo@hgweb.com',
    City: 'Denver',
    State: 'MA',
    ProviderName: 'Dr.Polly Reese, MD',
    Role: 'Practice Administrator'
  }
};

storiesOf('Claim Your Profile', module)
  .addDecorator((story) => <AdminStore story={story()} />)
  .add('Claim Your Profile', () => <Index />);
