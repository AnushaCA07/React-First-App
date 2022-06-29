import React from 'react';
import './_searchIcon.less';

import search from '../../../assets/images/search.svg';

const SearchIcon = () => {
  return (
    <div className='no-record-found'>
      <img src={search} alt='search' />
      <div>
        <h4>Search for Accounts </h4>
        <p>
          Get started by finding provider and roster manager accounts to manage.
        </p>
      </div>
    </div>
  );
};

export default SearchIcon;
