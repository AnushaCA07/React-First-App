/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import './_auditProviderList.less';
import AuditProvider from '../AuditProvider/AuditProvider';
import AuditCard from '../AuditCard/AuditCard';
import PropTypes from 'prop-types';
import Accordion from '../FormComponents/Accordion';

const AuditProviderList = (props) => {
  const removeAuditProviderCard = (auditId) => {
    if (props.removeAuditProvider) {
      props.removeAuditProvider(auditId);
    }
  };

  const [rejectSecHeight, setRejectSecHeight] = useState(0);

  const getHeight = (value) => {
    setRejectSecHeight(value);
  };

  return props.TotalRecords > 0 ? (
    <div className='audit-provider-list'>
      {props.Results.map((auditProviders) => (
        <Accordion
          header={
            <AuditProvider
              {...auditProviders}
              key={auditProviders.AuditId}
              showStatus={props.showStatus}
            />
          }
          key={auditProviders.AuditId}
          childsecheight={rejectSecHeight}
        >
          <AuditCard
            auditId={auditProviders.AuditId}
            status={auditProviders.Status}
            ProfileManagerAuditRecord={auditProviders.ProfileManagerAuditRecord}
            currentUserId={props.currentUserId}
            removeAuditProviderCard={props.removeAuditProvider}
            hideButtons={props.hideButtons}
            showStatus={props.showStatus}
            auditedBy={
              auditProviders.AuditedByFullname != null
                ? auditProviders.AuditedByFullname
                : auditProviders.AuditedByUsername
            }
            getHeight={getHeight}
            currentPage={props.currentPage}
            providerName={auditProviders.ProviderFullName}
            lastModified={auditProviders.LastModifiedDateString}
          ></AuditCard>
        </Accordion>
      ))}
    </div>
  ) : (
    <div></div>
  );
};

AuditProviderList.propTypes = {
  auditProviderList: PropTypes.arrayOf(PropTypes.object),
  recordsFound: PropTypes.number,
  TotalRecords: PropTypes.number,
  currentUserId: PropTypes.string,
  Results: PropTypes.arrayOf(PropTypes.object),
  removeAuditProvider: PropTypes.func,
  currentPage: PropTypes.number,
};

export default AuditProviderList;
