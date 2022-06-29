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
};

export const cleargetAuditRecordsHistory = (state) => {
  return updateObject(state, {
    results: [],
    numFound: 0,
    isSearchClick: false,
    error: false,
    errorMsg: null,
  });
};

export const getAuditRecordsHistoryFailed = (state, action) => {
  return updateObject(state, {
    error: true,
    errorMsg: action.errorMsg,
  });
};

export const getAuditRecordsHistorySuccess = (state, action) => {
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
  });
};

export const initialgetAuditRecordsHistory = (state, action) => {
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
  });
};

export const getAuditRecordsHistory = (state = initialState, action) => {
  switch (action.type) {
    case 'getAuditRecordsHistory_SUCCESS':
      return getAuditRecordsHistorySuccess(state, action);
    case 'getAuditRecordsHistory_FAILED':
      return getAuditRecordsHistoryFailed(state, action);
    case 'CLEAR_getAuditRecordsHistory':
      return cleargetAuditRecordsHistory(state);
    case 'INITIAL_getAuditRecordsHistory':
      return initialgetAuditRecordsHistory(state, action);
    default:
      return state;
  }
};
