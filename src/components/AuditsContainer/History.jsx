import React, { useState, useEffect, Fragment } from 'react';
import './_auditsContainer.less';
import Header from '../Header/Header';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../Spinner/Spinner';
import AuditProviderList from '../AuditProviderList/AuditProviderList';
import { PaginationUI } from '../Pagination/Pagination';
import * as actions from '../../store/actions';
import AuditSearch from '../AuditSearch/AuditSearch';

const History = () => {
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
  } = useSelector((state) => state.getAuditRecordsHistory);

  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('date');
  const [showSpinner, setShowSpinner] = useState(spinnerVisible);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(numFound);
  const [totalResults, setTotalResults] = useState(results);
  const [type, setType] = useState(searchType);
  const [value, setValue] = useState(searchValue);

  let headerColumns = [
    {
      ColumnName: 'Date Audited',
      IsSortBy: true,
      ClassName: 'audit history-date',
      IsSorted: true,
    },
    {
      ColumnName: 'Auditor',
      IsSortBy: true,
      ClassName: 'audit history-submitted',
      IsSorted: false,
    },
    {
      ColumnName: 'Provider',
      IsSortBy: false,
      ClassName: 'audit history-provider',
      IsSorted: false,
    },
    {
      ColumnName: 'Type',
      IsSortBy: false,
      ClassName: 'audit history-type',
      IsSorted: false,
    },
    {
      ColumnName: 'Changes Requested',
      IsSortBy: false,
      ClassName: 'audit history-changes',
      IsSorted: false,
    },
  ];

  const [headers, setHeaders] = useState(headerColumns);

  useEffect(() => {
    setTotalResults(results);
    setTotalRecords(numFound);
    setShowSpinner(spinnerVisible);
    setValue('');
  }, [results, numFound, spinnerVisible]);

  const dispatch = useDispatch();

  const onSortHandler = (sortOptions, sortBy) => {
    setShowSpinner(true);

    headerColumns.find((o) => !o.ClassName.includes(sortBy)).IsSorted = false;
    headerColumns.find((o) => o.ClassName.includes(sortBy)).IsSorted = true;
    setHeaders(headerColumns);

    dispatch(
      actions.getAuditRecordsHistory(
        type,
        value,
        setShowSpinner,
        'COMPLETED',
        page,
        sortBy,
        sortOptions,
        filterBy,
        currentUserId
      )
    );
    setSortBy(sortBy);
    setSortOrder(sortOptions);
  };
  const removeAuditProvider = (auditId) => {
    var filterResults = totalResults;
    let index = filterResults.findIndex((item) => item.AuditId == auditId);
    filterResults.splice(index, 1);
    setTotalResults(filterResults);
    setTotalRecords(totalRecords - 1);
  };

  const onPageChange = (pageNumber) => {
    setShowSpinner(true);
    dispatch(
      actions.getAuditRecordsHistory(
        type,
        value,
        setShowSpinner,
        'COMPLETED',
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
      Show: false,
    },
  ];

  return (
    <Fragment>
      <div className='audit-search'>
        <AuditSearch
          type={type}
          value={value}
          searchBy={searchBy}
          radioOptions={radioTypeOptions}
          currentUserId={currentUserId}
          searchTab='history'
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
            hideButtons={true}
            showStatus={true}
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

export default History;
