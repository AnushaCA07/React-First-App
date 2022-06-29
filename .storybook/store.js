import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as reducers from '../src/store/reducers';

const rootReducer = combineReducers({
  createRoster: reducers.createRosterReducer,
  searchReducer: reducers.searchReducer,
  getAuditRecords: reducers.getAuditRecords,
  getAuditRecordsHistory: reducers.getAuditRecordsHistory,
  writeAuditRecords: reducers.writeAuditRecordsReducer,
  rejectAuditRecords: reducers.rejectAuditRecordsReducer,
  getDashboardInfo: reducers.getDashboardInfo,
  deleteRoster: reducers.deleteRosterReducer,
  authorizeRoster: reducers.authorizeRosterReducer,
  changeRosterStatus: reducers.changeRosterStatusReducer,
  changeRosterFlags: reducers.changeRosterFlagsReducer,
  contactUs: reducers.contactUsReducer,
  loadProviderData: reducers.loadProviderData,
  contactSubmitReducer: reducers.contactSubmitReducer,
  getAccountDetailsReducer: reducers.getAccountDetailsReducer,
  getClientPortalProvidersReducer: reducers.getClientPortalProvidersReducer,
  getClientPortalBannerDataReducer: reducers.getClientPortalBannerDataReducer,
  removeProvidersReducer: reducers.removeProvidersReducer,
  searchClientPortalProvidersReducer: reducers.searchClientPortalProvidersReducer,
  addClientPortalProvidersToRosterReducer: reducers.addClientPortalProvidersToRosterReducer,
  getClientPortalBannerDataReducer: reducers.getClientPortalBannerDataReducer,
  getClientPortalDesignationReducer: reducers.getClientPortalDesignationReducer,
  addRemoveDesignationReducer: reducers.addRemoveDesignationReducer,
  removeProvidersReducer: reducers.removeProvidersReducer,
  getClaimPageParamsReducer: reducers.getClaimPageParamsReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function AdminStore({ story }) {
  return <ReduxProvider store={store}>{story}</ReduxProvider>;
}
