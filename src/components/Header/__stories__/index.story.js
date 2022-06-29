import React from 'react';
import Header from '../Header';
import { storiesOf } from '@storybook/react';

const getSortedData = () => {
  //Todo yet to implement sort functionality
};
const showHandler = () => {
  //Todo yet to implement sort functionality
};
const headerColumns = [
  {
    ColumnName: 'Name',
    IsSortBy: true,
    ClassName: 'search',
    isShow: true,
  },
  {
    ColumnName: 'Specialty',
    IsSortBy: false,
    ClassName: 'search',
    isShow: false,
  },
  {
    ColumnName: 'Practice',
    IsSortBy: false,
    ClassName: 'search',
    isShow: true,
  },
];

storiesOf('Header', module).add('Header', () => (
  <Header columns={headerColumns} onSort={getSortedData} showColumns={showHandler}/>
));
