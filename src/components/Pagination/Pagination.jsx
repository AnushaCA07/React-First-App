import React, { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import './_pagination.less';
import PropTypes from 'prop-types';

export function PaginationUI(props) {
  const {
    recordsFound,
    onPageChange,
    showPerPage,
    recordsPerPage,
    onPageFilterChange
  } = props;
  const [activePage, setActivePage] = useState(1);

  const [enablePerPage, setEnablePerPage] = useState(false);

  const [perPage, setItemsPerPage] = useState(30);

  useEffect(() => {
    setEnablePerPage(showPerPage);
  }, [showPerPage]);

  useEffect(() => {
    if (recordsPerPage != undefined) setItemsPerPage(recordsPerPage);
    else setItemsPerPage(30);
  }, [recordsPerPage]);

  useEffect(() => {
    if (recordsFound > 0) {
      let totalPages = Math.round(recordsFound / recordsPerPage);
      if (activePage > totalPages) setActivePage(1);
    }
  }, [recordsFound]);

  const pageStart = perPage * (activePage - 1) + 1;
  const pageEnd = perPage * activePage > recordsFound ? recordsFound : perPage * activePage;

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    onPageChange(pageNumber);
  };

  const pageFilterChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setActivePage(1);
    onPageFilterChange(Number(e.target.value));
  };

  return (
    <div className='pagination-content'>
      <span className={`${enablePerPage ? 'span-result' : ''}`}>
        Results {pageStart}-{pageEnd} of {recordsFound}
      </span>
      {enablePerPage && (
        <div className='show-page-filter'>
          <p className='filter-content'>
            <span className='filter-title'>| Show </span>
            <select
              className='pages-select'
              name='state'
              id='state'
              data-recurly='state'
              placeholder='10 Results Per Page'
              onChange={pageFilterChange}>
              <option value={10}>10 Results Per Page</option>
              <option value={20}>20 Results Per Page</option>
              <option value={30}>30 Results Per Page</option>
            </select>
          </p>
        </div>
      )}
      <div className='pagination-align-right'>
        <Pagination
          activePage={activePage}
          itemsCountPerPage={perPage}
          totalItemsCount={recordsFound}
          onChange={handlePageChange}
          prevPageText='‹'
          nextPageText='›'
          linkClassNext='nextOrPrev'
          linkClassPrev='nextOrPrev'
        />
      </div>
    </div>
  );
}

PaginationUI.propTypes = {
  recordsFound: PropTypes.number,
  onPageChange: PropTypes.func,
  showPerPage: PropTypes.bool,
  recordsPerPage: PropTypes.number,
  onPageFilterChange: PropTypes.func
};
export default PaginationUI;
