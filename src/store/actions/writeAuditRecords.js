import * as service from '../../utils/service';

const baseurl = `/api/admin`;

export const writeAuditRecordsFailed = (errorMsg) => {
  return {
    type: 'POST_WRITEAUDITRECORDS_FAILED',
    createWriteAuditResponse: errorMsg,
    isClicked: true,
  };
};

export const writeAuditRecordsSuccess = (response) => {
  return {
    type: 'POST_WRITEAUDITRECORDS_SUCCESS',
    createWriteAuditResponse: response,
    isClicked: true,
  };
};

export const clearwriteAuditRecords = () => {
  return {
    type: 'CLEAR_WRITEAUDITRECORDS',
  };
};

export const writeAuditRecords = (
  providerCode,
  auditId,
  auditApprovedUserId,
  auditedByUsername,
  status,
  profileManagerRecordId,
  setShowSpinner,
  rejectedItem
) => {
  return (dispatch) => {    
    const model = {
      AuditStatus: {
        ProviderCode: providerCode,
        AuditId: auditId,
        AuditApprovedUserId: auditApprovedUserId,
        AuditedByUsername: auditedByUsername,
        Status: status,
      },
      ProfileManagerRecordId: profileManagerRecordId,
      RejectedItems: rejectedItem,
    };


    //let url = `${baseurl}/writeauditrecords?auditResponse=${model}&profileManagerRecordId=${profileManagerRecordId}&rejectedItem=${rejectedItem}`;
    let url = `${baseurl}/writeauditrecords?auditResponse=${model}`;
    setShowSpinner(true);
    service
      .post(url, model)
      .then((responseData) => {
        dispatch(writeAuditRecordsSuccess(responseData));
        setShowSpinner(false);
      })
      .catch((err) => {
        let errorResponseData = {
          StatusCode: 'InternalServerError',
          IsSuccessStatusCode: false,
        };
        dispatch(writeAuditRecordsFailed(errorResponseData));
        setShowSpinner(false);
      });
  };
};

export const clearUndoAuditRecords = () => {
  return {
    type: 'CLEAR_UNDOAUDITRECORDS',
  };
};

export const undoAuditRecordsFailed = (errorMsg) => {
  return {
    type: 'POST_UNDOAUDITRECORDS_FAILED',
    createWriteAuditResponse: errorMsg,
    isClicked: true,
  };
};
export const undoAuditRecordsSuccess = (response) => {
  return {
    type: 'POST_UNDOAUDITRECORDS_SUCCESS',
    createWriteAuditResponse: response,
    isClicked: true,
  };
};

export const undoAuditRecords = (
  providerCode,
  auditId,
  auditApprovedUserId,
  auditedByUsername,
  status,
  profileManagerRecordId,
  setShowSpinner,
  rejectedItem
) => {
  return (dispatch) => {
    const model = {
      AuditStatus: {
        ProviderCode: providerCode,
        AuditId: auditId,
        AuditApprovedUserId: auditApprovedUserId,
        AuditedByUsername: auditedByUsername,
        Status: status,
      },
      ProfileManagerRecordId: profileManagerRecordId,
      RejectedItems: rejectedItem,
    };

    let url = `${baseurl}/revertauditrecords?auditResponse=${model}`;
    setShowSpinner(true);
    service
      .post(url, model)
      .then((responseData) => {
        dispatch(undoAuditRecordsSuccess(responseData));
        setShowSpinner(false);
      })
      .catch((err) => {
        let errorResponseData = {
          StatusCode: 'InternalServerError',
          IsSuccessStatusCode: false,
        };
        dispatch(undoAuditRecordsFailed(errorResponseData));
        setShowSpinner(false);
      });
  };
};
