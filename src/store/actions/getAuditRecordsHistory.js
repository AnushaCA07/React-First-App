import * as service from '../../utils/service';

const baseurl = `/api/admin`;

export const getAuditRecordsHistoryFailed = (errorMsg) => {
  return {
    type: 'getAuditRecordsHistory_FAILED',
    errorMsg: errorMsg,
    spinnerVisible: false,
  };
};

export const getAuditRecordsHistorySuccess = (
  response,
  type,
  value,
  sortBy,
  showSpinner,
  filterBy,
  currentUserId
) => {
  return {
    type: 'getAuditRecordsHistory_SUCCESS',
    results: response.Results,
    numFound: response.TotalRecords,
    isSearchClick: true,
    searchType: type,
    searchValue: value,
    sortBy: sortBy,
    spinnerVisible: showSpinner,
    filterBy: filterBy,
    currentUserId: currentUserId,
  };
};

export const initialgetAuditRecordsHistory = () => {
  return {
    type: 'INITIAL_getAuditRecordsHistory',
    results: [],
    numFound: 0,
    isSearchClick: false,
    searchType: 'providers',
    searchValue: '',
    sortBy: 'date',
    isProviderSearchError: false,
    isSubmitterSearchError: false,
    spinnerVisible: false,
    filterBy: 'all',
    currentUserId: '',
  };
};

export const clearGetAuditRecordsHistory = () => {
  return {
    type: 'CLEAR_getAuditRecordsHistory',
  };
};

export const getAuditRecordsHistory = (
  type,
  value,
  setShowSpinner,
  status,
  page,
  sortBy,
  sortOrder,
  filterBy,
  currentUserId
) => {
  return (dispatch) => {
    let url = `${baseurl}/getauditrecords?searchType=${type}&searchValue=${value}&status=${status}&page=${page}&sortBy=${sortBy}&filterBy=${filterBy}&sortOrder=${sortOrder}`;

    service
      .get(url)
      .then((responseData) => {
        dispatch(
          getAuditRecordsHistorySuccess(
            responseData,
            type,
            value,
            sortBy,
            false,
            filterBy,
            currentUserId
          )
        );
        setShowSpinner(false);
      })
      .catch((err) => {
        dispatch(getAuditRecordsHistoryFailed(err && err.error));
      });
  };
};
