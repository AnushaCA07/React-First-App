import React from 'react';
import MenuComponent from  '../Menu';
import { storiesOf } from '@storybook/react';

const getSortedData = () => {
  //Todo yet to implement sort functionality
}; 

 
storiesOf('Menu-Component', module).add('Menu-Component', () => (
  <MenuComponent menuName='Menu'  />
));
