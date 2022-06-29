import React from 'react';
import PaginationUI from '../Pagination';
import { storiesOf } from '@storybook/react';

const recordsFound = 50;
const onPageChange =()=>{
//Todo    
}
storiesOf('Pagination', module).add('Pagination', () => (
  <PaginationUI recordsFound={recordsFound} onPageChange={onPageChange}/>
));
