import { updateObject } from '../../utils/utils';
const initialState = {
  createWriteAuditResponse: {
    StatusCode: '',
    IsSuccessStatusCode: false,
  },
  isClicked: false,
};

export const clearWriteAuditRecords = (state) => {
  return updateObject(state, {
    createWriteAuditResponse: {
      StatusCode: '',
      IsSuccessStatusCode: false,
    },
    isClicked: false,
  });
};
export const postWriteAuditRecordsSuccess = (state, action) => {
  return updateObject(state, {
    createWriteAuditResponse: action.createWriteAuditResponse,
    isClicked: action.isClicked,
  });
};
export const postWriteAuditRecordsFailed = (state, action) => {
  return updateObject(state, {
    createWriteAuditResponse: action.createWriteAuditResponse,
    isClicked: action.isClicked,
  });
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
    rejectIsClicked: action.isClicked,
  });
};

export const postRejectAuditRecordsFailed = (state, action) => {
  return updateObject(state, {
    rejectAuditResponse: action.rejectAuditResponse,
    rejectIsClicked: action.isClicked,
  });
};

export const clearUndoAuditRecords = (state) => {
  return updateObject(state, {
    createWriteAuditResponse: {
      StatusCode: '',
      IsSuccessStatusCode: false,
    },
    isClicked: false,
  });
};

export const postUndoAuditRecordsSuccess = (state, action) => {
  return updateObject(state, {
    createWriteAuditResponse: action.createWriteAuditResponse,
    isClicked: action.isClicked,
  });
};

export const postUndoAuditRecordsFailed = (state, action) => {
  return updateObject(state, {
    createWriteAuditResponse: action.createWriteAuditResponse,
    isClicked: action.isClicked,
  });
};

export const writeAuditRecordsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'POST_WRITEAUDITRECORDS_SUCCESS':
      return postWriteAuditRecordsSuccess(state, action);

    case 'POST_WRITEAUDITRECORDS_FAILED':
      return postWriteAuditRecordsFailed(state, action);

    case 'CLEAR_WRITEAUDITRECORDS':
      return clearWriteAuditRecords(state);

    case 'CLEAR_REJECTAUDITRECORDS':
      return clearRejectAuditRecords(state);

    case 'POST_REJECTAUDITRECORDS_SUCCESS':
      return postRejectAuditRecordsSuccess(state, action);
    case 'POST_REJECTAUDITRECORDS_FAILED':
      return postRejectAuditRecordsFailed(state, action);

    case 'CLEAR_UNDOAUDITRECORDS':
      return undoRejectAuditRecords(state);

    case 'POST_UNDOAUDITRECORDS_SUCCESS':
      return postUndoAuditRecordsSuccess(state, action);
    case 'POST_UNDOAUDITRECORDS_FAILED':
      return postUndoAuditRecordsFailed(state, action);

    default:
      return state;
  }
};
