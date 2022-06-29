import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as reducers from '../store/reducers';
import SearchContainer from './SearchContainer/SearchContainer';
import CreateRoster from './CreateRoster/CreateRoster';

const rootReducer = combineReducers({
  createRoster: reducers.createRosterReducer,
  searchReducer: reducers.searchReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function AdminPage() {
  return (
    <Provider store={store}>
      <SearchContainer />
      <CreateRoster />
    </Provider>
  );
}
