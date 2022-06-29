import React, { useState, useEffect, Fragment } from 'react';
import Search from '../Search/Search';
import * as actions from '../../store/actions';
import SearchIcon from '../SearchIcon/SearchIcon';
import ProviderList from '../ProviderList/ProviderList';
import { useSelector, useDispatch } from 'react-redux';
import './_searchContainer.less';
import RosterList from '../RosterList/RosterList';

const SearchContainer = () => {
  const {
    results,
    isSearchClick,
    searchType,
    searchValue,
    numFound,
    searchBy,
    currentUserId,
    isRosterSearchError,
    isProviderSearchError,
    clientCodes,
  } = useSelector((state) => state.searchReducer);

  const [listCount, setListCount] = useState(0);

  const [searchFor, setSearchFor] = useState(searchBy);
  const dispatch = useDispatch();

  const updateRadioOptions = (option) => {
    setSearchFor(option);
  };

  useEffect(() => {
    setListCount(numFound);
    setSearchFor(searchBy);
  }, [results, numFound]);

  const returnNoResults = () => {
    return (
      <div className='no-result-found-wrapper'>
        <span>
          <h4>No results found for “{searchValue}”</h4>
          Try modifying your search and using more general terms.
        </span>
      </div>
    );
  };

  const returnSearchBody = () => {
    return searchFor == searchBy &&
      isSearchClick &&
      (isProviderSearchError || isRosterSearchError) ? (
      returnNoResults()
    ) : (
      <SearchIcon />
    );
  };
  const refreshList = (
    isReload,
    currentPageNumber,
    setShowSpinner,
    sortOrder,
    sortBy
  ) => {
    if (isReload) {
      getRosterRecords(currentPageNumber, setShowSpinner, sortOrder, sortBy);
    }
  };
  const getRosterRecords = (pageNumber, setShowSpinner, sortOrder, sortBy) => {
    dispatch(
      actions.searchActions(
        searchType,
        searchValue,
        searchBy,
        currentUserId,
        setShowSpinner,
        pageNumber,
        sortOrder,
        sortBy,
        clientCodes
      )
    );
  };

  return (
    <div>
      <div className='container-wrapper'>
        <h1>Support Portal</h1>
      </div>
      <Fragment>
        <Search
          type={searchType}
          value={searchValue}
          searchBy={searchBy}
          updateRadioOptions={updateRadioOptions}
          currentUserId={currentUserId}
          clientCodes={clientCodes}
        />
        {listCount > 0 ? (
          searchFor == 'providers' ? (
            <ProviderList providers={results} providersFound={numFound} />
          ) : (
            <RosterList
              rosters={results}
              refreshList={refreshList}
              recordsFound={numFound}
            />
          )
        ) : (
          returnSearchBody()
        )}
      </Fragment>
    </div>
  );
};

export default SearchContainer;
