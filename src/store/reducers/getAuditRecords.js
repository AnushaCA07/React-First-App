import { updateObject } from '../../utils/utils';

const initialState = {
  results: [],
  numFound: 0,
  searchType: 'providers',
  searchValue: '',
  sortBy: 'date',
  error: false,
  errorMsg: null,
  isSearchClick: false,
  isProviderSearchError: false,
  isSubmitterSearchError: false,
  spinnerVisible: true,
  filterBy: 'all',
  currentUserId: '',
  page: 1,
};

export const clearGetAuditRecords = (state) => {
  return updateObject(state, {
    results: [],
    numFound: 0,
    isSearchClick: false,
    error: false,
    errorMsg: null,
  });
};

export const getAuditRecordsFailed = (state, action) => {
  return updateObject(state, {
    error: true,
    errorMsg: action.errorMsg,
  });
};

export const getAuditRecordsSuccess = (state, action) => {
  let isProviderError = false;
  let isSubmitterError = false;
  if (action.numFound == 0) {
    if (action.searchType == 'providers') isProviderError = true;
    else isSubmitterError = true;
  }
  return updateObject(state, {
    results: action.results,
    numFound: action.numFound,
    isSearchClick: action.isSearchClick,
    searchType: action.searchType,
    searchValue: action.searchValue,
    sortBy: action.sortBy,
    error: false,
    errorMsg: null,
    isProviderSearchError: isProviderError,
    isSubmitterSearchError: isSubmitterError,
    spinnerVisible: action.spinnerVisible,
    filterBy: action.filterBy,
    currentUserId: action.currentUserId,
    page: action.page,
  });
};

export const initialGetAuditRecords = (state, action) => {
  return updateObject(state, {
    results: action.results,
    numFound: action.numFound,
    isSearchClick: action.isSearchClick,
    searchType: action.searchType,
    searchValue: action.searchValue,
    sortBy: action.sortBy,
    error: false,
    errorMsg: null,
    spinnerVisible: action.spinnerVisible,
    filterBy: action.filterBy,
    currentUserId: action.currentUserId,
    page: action.page,
  });
};

export const getAuditRecords = (state = initialState, action) => {
  switch (action.type) {
    case 'GETAUDITRECORDS_SUCCESS':
      return getAuditRecordsSuccess(state, action);
    case 'GETAUDITRECORDS_FAILED':
      return getAuditRecordsFailed(state, action);
    case 'CLEAR_GETAUDITRECORDS':
      return clearGetAuditRecords(state);
    case 'INITIAL_GETAUDITRECORDS':
      return initialGetAuditRecords(state, action);
    default:
      return state;
  }
};
