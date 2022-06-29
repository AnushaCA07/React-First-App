import * as service from '../../utils/service';

const baseurl = `/api/admin`;

export const getAuditRecordsFailed = (errorMsg) => {
  return {
    type: 'GETAUDITRECORDS_FAILED',
    errorMsg: errorMsg,
    spinnerVisible: false,
  };
};

export const getAuditRecordsSuccess = (
  response,
  type,
  value,
  sortBy,
  showSpinner,
  filterBy,
  currentUserId,
  page
) => {
  return {
    type: 'GETAUDITRECORDS_SUCCESS',
    results: response.Results,
    numFound: response.TotalRecords,
    isSearchClick: true,
    searchType: type,
    searchValue: value,
    sortBy: sortBy,
    spinnerVisible: showSpinner,
    filterBy: filterBy,
    currentUserId: currentUserId,
    page: page,
  };
};

export const initialGetAuditRecords = () => {
  return {
    type: 'INITIAL_GETAUDITRECORDS',
    results: [],
    numFound: 0,
    isSearchClick: false,
    searchType: 'providers',
    searchValue: '',
    sortBy: 'date',
    isProviderSearchError: false,
    isSubmitterSearchError: false,
    spinnerVisible: true,
    filterBy: 'all',
    currentUserId: '',
    page: 1,
  };
};

export const clearGetAuditRecords = () => {
  return {
    type: 'CLEAR_GETAUDITRECORDS',
  };
};

export const getAuditRecords = (
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
    let searchModel = {
      searchType: type,
      searchValue: value,
      searchBy: 'auditmanager',
      currentUserId: currentUserId,
      currentPage: page,
      currentFilter: filterBy,
    };
    let data = window.history.state;
    if (data == null) history.pushState(searchModel, null, '/audit/index');
    else history.replaceState(searchModel, null, '/audit/index');

    let url = `${baseurl}/getauditrecords?searchType=${type}&searchValue=${value}&status=${status}&page=${page}&sortBy=${sortBy}&filterBy=${filterBy}&sortOrder=${sortOrder}`;
    service
      .get(url)
      .then((responseData) => {
        dispatch(
          getAuditRecordsSuccess(
            responseData,
            type,
            value,
            sortBy,
            false,
            filterBy,
            currentUserId,
            page
          )
        );
        setShowSpinner(false);
      })
      .catch((err) => {
        //setShowSpinner(false);
        dispatch(getAuditRecordsFailed(err && err.error));
      });
  };
};
