import { updateObject } from '../../utils/utils';
const initialState = {
    rejectAuditResponse: {
    StatusCode: '',
    IsSuccessStatusCode: false,
  },
  rejectIsClicked: false,
};

export const clearRejectAuditRecords = (state) => {
  return updateObject(state, {
    rejectAuditResponse: {
      StatusCode: '',
      IsSuccessStatusCode: false,
    },
    rejectIsClicked: false,
  });
};

export const postRejectAuditRecordsSuccess = (state, action) => {
  return updateObject(state, {
    rejectAuditResponse: action.rejectAuditResponse,
    rejectIsClicked: action.rejectIsClicked,
  });
};

export const postRejectAuditRecordsFailed = (state, action) => {
  return updateObject(state, {
    rejectAuditResponse: action.rejectAuditResponse,
    rejectIsClicked: action.rejectIsClicked,
  });
};

export const rejectAuditRecordsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CLEAR_REJECTAUDITRECORDS':
      return clearRejectAuditRecords(state);
    case 'POST_REJECTAUDITRECORDS_SUCCESS':
      return postRejectAuditRecordsSuccess(state, action);
    case 'POST_REJECTAUDITRECORDS_FAILED':
      return postRejectAuditRecordsFailed(state, action);  
    default:
      return state;
  }
};
