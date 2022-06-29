/** @format */

import React, { useState, useEffect, Fragment } from 'react';
import './_auditsContainer.less';
import Header from '../Header/Header';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../Spinner/Spinner';
import AuditProviderList from '../AuditProviderList/AuditProviderList';
import { PaginationUI } from '../Pagination/Pagination';
import * as actions from '../../store/actions';
import History from '../AuditsContainer/History';
import Queue from '../AuditsContainer/Queue';
import PropTypes from 'prop-types';

const AuditsContainer = () => {
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

  const ComponentState = useSelector((state) => state.getAuditRecords);

  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('date');
  const [showSpinner, setShowSpinner] = useState(spinnerVisible);

  const [currentPage, setPage] = useState(page);
  const [totalRecords, setTotalRecords] = useState(numFound);
  const [totalResults, setTotalResults] = useState(results);

  const dispatch = useDispatch();

  useEffect(() => {
    setTotalResults(results);
    setTotalRecords(numFound);
    setShowSpinner(spinnerVisible);
    //setPage(page);
  }, [results, numFound, spinnerVisible, page]);

  const [showAudits, setShowAudits] = useState(true);

  const onQueueClick = () => {
    setShowSpinner(true);
    setShowAudits(true);
    getQueueRecords(currentPage);
  };

  const onHistoryClick = () => {
    setShowSpinner(true);
    setShowAudits(false);
    getHistoryRecords();
  };

  // const [headers, setHeaders] = useState(headerColumns);

  const getQueueRecords = (pageNumber) => {
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
  };

  const getHistoryRecords = () => {
    dispatch(
      actions.getAuditRecordsHistory(
        searchType,
        searchValue,
        true,
        'COMPLETED',
        currentPage,
        sortBy,
        sortOrder,
        filterBy,
        currentUserId
      )
    );
  };

  const removeAuditProvider = (auditId, isReloadList, pageNumber) => {
    let filterResults = totalResults;
    let index = filterResults.findIndex((item) => item.AuditId == auditId);
    filterResults.splice(index, 1);
    setTotalResults(filterResults);
    setTotalRecords(totalRecords - 1);
  };
  let headerColumns = [
    {
      ColumnName: 'Date Submitted',
      IsSortBy: true,
      ClassName: 'audit date',
      IsSorted: true,
    },
    {
      ColumnName: 'Provider',
      IsSortBy: true,
      ClassName: 'audit provider',
      IsSorted: false,
    },
    {
      ColumnName: 'Type',
      IsSortBy: true,
      ClassName: 'audit type',
      IsSorted: false,
    },
    {
      ColumnName: 'Submitted by',
      IsSortBy: true,
      ClassName: 'audit submitted',
      IsSorted: false,
    },
    {
      ColumnName: 'Changes Requested',
      IsSortBy: false,
      ClassName: 'audit changes',
      IsSorted: false,
    },
  ];

  const [headers, setHeaders] = useState(headerColumns);

  const onPageChange = (pageNumber) => {
    setShowSpinner(true);
    setPage(pageNumber);
    getQueueRecords(pageNumber);
  };

  const setCurrentPageNumber = (currentPageNumber) => {
    //setPage(currentPageNumber);
  };

  const reLoadQueues = (isReload, currentPageNumber, isSetCurrentPage) => {
    if (isReload) {
      if (isSetCurrentPage) setPage(currentPageNumber);
      getQueueRecords(currentPageNumber);
    }
  };

  return (
    <div>
      <div className='container-wrapper height-130'>
        <h1>Audits</h1>
      </div>
      <Fragment>
        <div className='tabs'>
          <div
            className={showAudits == true ? 'tab-1' : 'tab-2'}
            onClick={onQueueClick}
          >
            <span className=''>Queue ({totalRecords})</span>
          </div>
          <div
            className={
              showAudits == false ? 'tab-1 margin-left' : 'tab-2 margin-left'
            }
            onClick={onHistoryClick}
          >
            <span className=''>History</span>
          </div>
        </div>
        {showAudits == true ? (
          <Queue
            data={ComponentState}
            refreshQueue={reLoadQueues}
            setCurrentPageNumber={setCurrentPageNumber}
          ></Queue>
        ) : (
          <History data={ComponentState}></History>
        )}
      </Fragment>
    </div>
  );
};

export default AuditsContainer;
