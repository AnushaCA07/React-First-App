import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions';
import './_providerList.less';
import Provider from '../Provider/Provider';
import Header from '../Header/Header';
import { PaginationUI } from '../Pagination/Pagination';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Spinner from '../Spinner/Spinner';
import SearchIcon from '../SearchIcon/SearchIcon';

const ProviderList = (props) => {
  const { searchType, searchValue, searchBy, currentUserId, clientCodes } =
    useSelector((state) => state.searchReducer);

  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('name');
  const [page, setPage] = useState(1);
  const [showSpinner, setShowSpinner] = useState(false);

  const headerColumns = [
    {
      ColumnName: 'Name',
      IsSortBy: true,
      ClassName: 'provider-search name',
      IsSorted: true,
    },
    {
      ColumnName: 'Specialty',
      IsSortBy: false,
      ClassName: 'provider-search specialty',
      IsSorted: false,
    },
    {
      ColumnName: 'Practice',
      IsSortBy: false,
      ClassName: 'provider-search practice',
      IsSorted: false,
    },
    {
      ColumnName: 'Sponsored By',
      IsSortBy: true,
      ClassName: 'provider-search sponsor',
      IsSorted: true,
    },
  ];
  const dispatch = useDispatch();

  const onSort = (sortOption, sortBy) => {
    setShowSpinner(true);
    dispatch(
      actions.searchActions(
        searchType,
        searchValue,
        searchBy,
        currentUserId,
        setShowSpinner,
        page,
        sortOption,
        sortBy,
        clientCodes
      )
    );
    setSortOrder(sortOption);
    setSortBy(sortBy);
  };
  const onPageChange = (pageNumber) => {
    setShowSpinner(true);
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
    setPage(pageNumber);
  };
  const providersFound = props.providersFound;

  return providersFound > 0 && searchBy === 'providers' ? (
    <div className='provider-list'>
      <Header columns={headerColumns} onSort={onSort} />
      {props.providers.map((provider, index) => (
        <Provider {...provider} listId={index} key={index} />
      ))}
      {providersFound > 30 && (
        <PaginationUI
          recordsFound={providersFound}
          onPageChange={onPageChange}
        />
      )}
      {showSpinner && <Spinner />}
    </div>
  ) : (
    <SearchIcon />
  );
};

ProviderList.propTypes = {
  providers: PropTypes.arrayOf(PropTypes.object),
  providersFound: PropTypes.number,
};

export default ProviderList;
