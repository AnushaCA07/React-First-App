import * as service from '../../utils/service';

const baseurl = `/api/admin`;

export const clearRejectAuditRecords = () => {
  return {
    type: 'CLEAR_REJECTAUDITRECORDS',
  };
};

export const rejectAuditRecordsFailed = (errorMsg) => {
  return {
    type: 'POST_REJECTAUDITRECORDS_FAILED',
    rejectAuditResponse: errorMsg,
    rejectIsClicked: true,
  };
};

export const rejectAuditRecordsSuccess = (response) => {
  return {
    type: 'POST_REJECTAUDITRECORDS_SUCCESS',
    rejectAuditResponse: response,
    rejectIsClicked: true,
  };
};

export const rejectAuditRecords = (
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

    let url = `${baseurl}/rejectauditrecords?auditResponse=${model}`;
    setShowSpinner(true);
    service
      .post(url, model)
      .then((responseData) => {
        dispatch(rejectAuditRecordsSuccess(responseData));
        setShowSpinner(false);
      })
      .catch((err) => {
        let errorResponseData = {
          StatusCode: 'InternalServerError',
          IsSuccessStatusCode: false,
        };
        dispatch(rejectAuditRecordsFailed(errorResponseData));
        setShowSpinner(false);
      });
  };
};