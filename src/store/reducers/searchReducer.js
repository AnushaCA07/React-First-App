import { updateObject } from '../../utils/utils';

const initialState = {
  results: [],
  numFound: 0,
  isSearchClick: false,
  searchType: 'name',
  searchValue: '',
  searchBy: 'providers',
  sortBy: '',
  currentUserId: '',
  error: false,
  errorMsg: null,
  isProviderSearchError: false,
  isRosterSearchError: false,
  clientCodes: [],
};

export const clearSearch = (state) => {
  return updateObject(state, {
    results: [],
    numFound: 0,
    isSearchClick: false,
    error: false,
    errorMsg: null,
  });
};

export const searchFailed = (state, action) => {
  return updateObject(state, {
    error: true,
    errorMsg: action.errorMsg,
  });
};

export const searchSuccess = (state, action) => {
  let isProviderError = false;
  let isRosterError = false;
  if (action.numFound == 0) {
    if (action.searchBy == 'providers') isProviderError = true;
    else isRosterError = true;
  }
  return updateObject(state, {
    results: action.results,
    numFound: action.numFound,
    isSearchClick: action.isSearchClick,
    searchType: action.searchType,
    searchValue: action.searchValue,
    searchBy: action.searchBy,
    sortBy: action.sortBy,
    currentUserId: action.currentUserId,
    error: false,
    errorMsg: null,
    isProviderSearchError: isProviderError,
    isRosterSearchError: isRosterError,
    clientCodes: action.clientCodes,
  });
};

export const initialsearch = (state, action) => {
  return updateObject(state, {
    results: action.results,
    numFound: action.numFound,
    isSearchClick: action.isSearchClick,
    searchType: action.searchType,
    searchValue: action.searchValue,
    searchBy: action.searchBy,
    sortBy: action.sortBy,
    currentUserId: action.currentUserId,
    error: false,
    errorMsg: null,
    clientCodes: action.clientCodes,
  });
};

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH_SUCCESS':
      return searchSuccess(state, action);
    case 'SEARCH_FAILED':
      return searchFailed(state, action);
    case 'CLEAR_SEARCH':
      return clearSearch(state);
    case 'INITIAL_SEARCH':
      return initialsearch(state, action);
    default:
      return state;
  }
};
