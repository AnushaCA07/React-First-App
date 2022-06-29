import React, { useState, useEffect, Fragment } from 'react';
import './_auditsContainer.less';
import Header from '../Header/Header';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../Spinner/Spinner';
import AuditProviderList from '../AuditProviderList/AuditProviderList';
import { PaginationUI } from '../Pagination/Pagination';
import * as actions from '../../store/actions';
import AuditSearch from '../AuditSearch/AuditSearch';
import PropTypes from 'prop-types';

const Queue = (props) => {
  const {
    results,
    isSearchClick,
    searchType,
    searchValue,
    numFound,
    searchBy,
    spinnerVisible,
    filterBy,
    currentUserId,
    page,
  } = useSelector((state) => state.getAuditRecords);

  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('date');
  const [showSpinner, setShowSpinner] = useState(spinnerVisible);
  const [currentPage, setPage] = useState(page);
  const [totalRecords, setTotalRecords] = useState(numFound);
  const [totalResults, setTotalResults] = useState(results);
  const [reloadQueue, setReloadQueue] = useState(false);

  const [isSetPageNumber, SetPageNumber] = useState(false);

  let headerColumns = [
    {
      ColumnName: 'Date Submitted',
      IsSortBy: true,
      ClassName: 'audit queue-date',
      IsSorted: true,
    },
    {
      ColumnName: 'Provider',
      IsSortBy: true,
      ClassName: 'audit queue-provider',
      IsSorted: false,
    },
    {
      ColumnName: 'Type',
      IsSortBy: true,
      ClassName: 'audit queue-type',
      IsSorted: false,
    },

    {
      ColumnName: 'Changes Requested',
      IsSortBy: false,
      ClassName: 'audit queue-changes',
      IsSorted: false,
    },
  ];

  const [headers, setHeaders] = useState(headerColumns);

  useEffect(() => {
    if (reloadQueue == true) {
      setTotalRecords(totalRecords);
      props.refreshQueue(reloadQueue, currentPage, isSetPageNumber);
      setReloadQueue(false);
    }
    props.setCurrentPageNumber(currentPage);
  }, [reloadQueue, totalRecords, currentPage]);

  useEffect(() => {
    setTotalResults(results);
    setTotalRecords(numFound);
    setShowSpinner(spinnerVisible);
  }, [results, numFound, spinnerVisible]);

  const dispatch = useDispatch();

  const onSortHandler = (sortOptions, sortBy) => {
    setShowSpinner(true);

    headerColumns.find((o) => !o.ClassName.includes(sortBy)).IsSorted = false;
    headerColumns.find((o) => o.ClassName.includes(sortBy)).IsSorted = true;

    setHeaders(headerColumns);
    dispatch(
      actions.getAuditRecords(
        searchType,
        searchValue,
        setShowSpinner,
        'READY',
        currentPage,
        sortBy,
        sortOptions,
        filterBy,
        currentUserId
      )
    );
    setSortBy(sortBy);
    setSortOrder(sortOptions);
  };

  const removeAuditProvider = (auditId, isReloadList, pageNumber) => {
    var filterResults = totalResults;
    let index = filterResults.findIndex((item) => item.AuditId == auditId);
    filterResults.splice(index, 1);
    setTotalResults(filterResults);
    let totalRec = totalRecords - 1;
    setTotalRecords(totalRecords - 1);
    const rem = totalRec % 30;
    if (rem == 0) {
      if (totalRec <= 30) setPage(1);
      else {
        setPage(pageNumber - 1);
        SetPageNumber(true);
      }
    } else {
      setPage(pageNumber);
    }

    setReloadQueue(isReloadList);
  };

  const onPageChange = (pageNumber) => {
    setShowSpinner(true);
    dispatch(
      actions.getAuditRecords(
        searchType,
        searchValue,
        true,
        'READY',
        pageNumber,
        sortBy,
        sortOrder,
        filterBy,
        currentUserId
      )
    );

    setPage(pageNumber);
  };

  const radioTypeOptions = [
    {
      Name: 'Providers',
      Value: 'providers',
      Show: true,
    },
    {
      Name: 'Submitter',
      Value: 'submitter',
      Show: true,
    },
  ];

  return (
    <Fragment>
      <div className='audit-search'>
        <AuditSearch
          type={searchType}
          value={searchValue}
          searchBy={searchBy}
          radioOptions={radioTypeOptions}
          currentUserId={currentUserId}
          searchTab='queue'
        />
      </div>
      <div>
        <div className='audit-header'>
          <Header columns={headers} onSort={onSortHandler}></Header>
        </div>
        <div>
          <AuditProviderList
            TotalRecords={totalRecords}
            Results={totalResults}
            currentUserId={currentUserId}
            removeAuditProvider={removeAuditProvider}
            currentPage={currentPage}
          />
          {totalRecords > 30 && (
            <div className='pagination-section'>
              <PaginationUI
                recordsFound={totalRecords}
                onPageChange={onPageChange}
              />
            </div>
          )}
          {showSpinner === true && <Spinner />}
        </div>
      </div>
    </Fragment>
  );
};

Queue.propTypes = {
  refreshQueue: PropTypes.func,
  setCurrentPageNumber: PropTypes.func,
};

export default Queue;
