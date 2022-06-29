import * as service from '../../utils/service';

const baseurl = `/api/admin`;

export const searchFailed = (errorMsg) => {
  return {
    type: 'SEARCH_FAILED',
    errorMsg: errorMsg,
  };
};

export const searchSuccess = (
  response,
  type,
  value,
  searchBy,
  currentUserId,
  sortBy,
  clientCodes
) => {
  return {
    type: 'SEARCH_SUCCESS',
    results: response.Results,
    numFound: response.TotalRecords,
    isSearchClick: true,
    searchType: type,
    searchValue: value,
    searchBy: searchBy,
    sortBy: sortBy,
    currentUserId: currentUserId,
    clientCodes: clientCodes,
  };
};

export const initialSearch = (currentUserId, clientCodes) => {
  return {
    type: 'INITIAL_SEARCH',
    results: [],
    numFound: 0,
    isSearchClick: false,
    searchType: 'name',
    searchValue: '',
    searchBy: 'providers',
    sortBy: '',
    currentUserId: currentUserId,
    isProviderSearchError: false,
    isRosterSearchError: false,
    clientCodes: clientCodes,
  };
};

export const clearSearch = () => {
  return {
    type: 'CLEAR_SEARCH',
  };
};

export const searchActions = (
  type,
  value,
  searchBy,
  currentUserId,
  setShowSpinner,
  page,
  sortOrder = 'asc',
  sortBy = 'name',
  clientCodes
) => {
  return (dispatch) => {
    if (!value && value.length == 0) {
      dispatch(initialSearch(currentUserId, clientCodes));
      dispatch(searchFailed('Search Value is missing'));
    } else {
      const searchValue = value.trim();
      let model = {
        SearchType: type,
        SearchValue: searchValue,
        SortOrder: sortOrder,
        Page: page,
        SortBy: sortBy,
      };
      let url = `${baseurl}/SearchProviders`;

      if (searchBy != 'providers')
        url = `${baseurl}/searchrosteruser?searchType=${type}&searchValue=${searchValue}&page=${page}&sortOrder=${sortOrder}&sortBy=${sortBy}`;

      let searchModel = {
        searchType: type,
        searchValue: searchValue,
        searchBy: searchBy,
        currentUserId: currentUserId,
        sortBy: sortBy,
      };
      let data = window.history.state;
      if (data == null) history.pushState(searchModel, null, '/Admin/Index');
      else history.replaceState(searchModel, null, '/Admin/Index');

      if (searchBy == 'providers') {
        service
          .post(url, model)
          .then((responseData) => {
            dispatch(
              searchSuccess(
                responseData,
                type,
                searchValue,
                searchBy,
                currentUserId,
                sortBy,
                clientCodes
              )
            );
            setShowSpinner(false);
          })
          .catch((err) => {
            dispatch(searchFailed(err && err.error));
            setShowSpinner(false);
          });
      } else {
        service
          .get(url)
          .then((responseData) => {
            dispatch(
              searchSuccess(
                responseData,
                type,
                searchValue,
                searchBy,
                currentUserId,
                sortBy,
                clientCodes
              )
            );
            setShowSpinner(false);
          })
          .catch((err) => {
            dispatch(searchFailed(err && err.error));
            setShowSpinner(false);
          });
      }
    }
  };
};
