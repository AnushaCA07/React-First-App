/* eslint-disable react/prop-types */
import React from 'react';
import './_auditProvider.less';
import PropTypes from 'prop-types';

const StatusOfAudit = (status, showStatus) => {
  if (showStatus != true) return '';
  let className = 'status-label-rejected';
  if (status == 'READY' || status == 'Ready') {
    className = 'status-label-approved';
    status = 'approved';
  }
  return <p className={className}>({status.toLowerCase()})</p>;
};

const AuditProvider = (props) => {
  const {
    LastModifiedDateString,
    LastModifiedTimeString,
    ProviderFullName,
    ProfileManagerAuditRecord,
    ProviderAddress,
    Type,
    SubmittedByFullName,
    UserName,
    ClientName,
    showStatus,
    AuditedByUsername,
    Pwid,
    AuditedByFullname,
  } = props;

  const getHistoryColumns = () => {
    return (
      <div className='audit-provider-details'>
        <div className='history-date'>
          {LastModifiedDateString}
          <br />
          {LastModifiedTimeString}
        </div>

        <div className='history-auditor'>
          <span>
            {AuditedByFullname != null ? AuditedByFullname : AuditedByUsername}
          </span>
        </div>
        <div className='history-provider'>
          <span>
            <a
              href={`/provider/profile/${Pwid}/admin`}
              alt={Pwid}
              target='_blank'
              rel='noopener noreferrer'
            >
              {ProviderFullName}
            </a>
          </span>
          <span>{ProviderAddress}</span>
        </div>
        <div className='history-default'>
          <span className={Type}>{Type}</span>
          {ClientName != '' && <span className='type-tag'>{ClientName}</span>}
        </div>
        <div className='history-changes'>
          {ProfileManagerAuditRecord.AuditSection.map((value, index) => (
            <span key={index}>
              <span>
                {value.SectionName}
                {StatusOfAudit(value.Items[0].ActionTaken, props.showStatus)}
              </span>
            </span>
          ))}
        </div>
        <div className='accorion-arrow'>&nbsp;</div>
      </div>
    );
  };

  const getQueueColumns = () => {
    return (
      <div className='audit-provider-details'>
        <div className='queue-date'>
          {LastModifiedDateString}
          <br />
          {LastModifiedTimeString}
        </div>
        <div className='queue-provider'>
          <span>
            <a
              href={`/provider/profile/${Pwid}/admin`}
              alt={Pwid}
              target='_blank'
              rel='noopener noreferrer'
            >
              {ProviderFullName}
            </a>
          </span>
          <span>{ProviderAddress}</span>
        </div>
        <div className='queue-default'>
          <span className={Type}>{Type}</span>
          {ClientName != '' && <span className='type-tag'>{ClientName}</span>}
        </div>
        <div className='queue-changes'>
          {ProfileManagerAuditRecord.AuditSection.map((value, index) => (
            <span key={index}>
              <span>
                {value.SectionName}
                {StatusOfAudit(value.ActionTaken, props.showStatus)}
              </span>
            </span>
          ))}
        </div>
        <div className='accorion-arrow'>&nbsp;</div>
      </div>
    );
  };
  return showStatus == true ? getHistoryColumns() : getQueueColumns();
};
AuditProvider.propTypes = {
  LastModifiedDateString: PropTypes.string,
  LastModifiedTimeString: PropTypes.string,
  ProfileManagerAuditRecord: PropTypes.object,
  ProviderFullName: PropTypes.string,
  ProviderAddress: PropTypes.string,
  Type: PropTypes.string,
  SubmittedByFullName: PropTypes.string,
  UserName: PropTypes.string,
  ClientName: PropTypes.string,
  showStatus: PropTypes.bool,
};

export default AuditProvider;
