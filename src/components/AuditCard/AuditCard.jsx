/* eslint-disable react/prop-types */
import React, { Fragment, useState, useEffect, useRef } from 'react';
import './_auditCard.less';
import * as actions from '../../store/actions';
import PropTypes from 'prop-types';
import { useDispatch, useSelector, useStore } from 'react-redux';
import Spinner from '../Spinner/Spinner';

//import warningIcon from '../../../assets/images/warning-icon.png';

const AuditCard = (props) => {
  const {
    auditId,
    status,
    currentUserId,
    hideButtons,
    showStatus,
    auditedBy,
    currentPage,
    providerName,
    lastModified,
  } = props;

  const [showSpinner, setShowSpinner] = useState(false);
  const [recordId, setRecordId] = useState('');
  const [isApproveError, setIsApproveError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [auditSection, setAuditSection] = useState(
    props.ProfileManagerAuditRecord.AuditSection
  );
  const dispatch = useDispatch();

  const { createWriteAuditResponse, isClicked } = useSelector(
    (state) => state.writeAuditRecords
  );

  const { rejectAuditResponse, rejectIsClicked } = useSelector(
    (state) => state.rejectAuditRecords
  );

  useEffect(() => {
    if (isClicked && recordId != '') {
      if (
        createWriteAuditResponse.StatusCode == 'OK' &&
        createWriteAuditResponse.IsSuccessStatusCode
      ) {
        if (createWriteAuditResponse.Response.Status) {
          removeApprovedItem(recordId);
          dispatch(actions.clearwriteAuditRecords());
        } else if (createWriteAuditResponse.Response.Status != true) {
          setIsApproveError(true);
          setErrorMessage(createWriteAuditResponse.Response.Message);
          const timerWithError = setTimeout(() => {
            removeApprovedItem(recordId);
            setIsApproveError(false);
            dispatch(actions.clearwriteAuditRecords());
          }, 3000);
          return () => clearTimeout(timerWithError);
        }
      }
      if (
        createWriteAuditResponse.StatusCode == 'InternalServerError' &&
        createWriteAuditResponse.IsSuccessStatusCode == false
      ) {
        dispatch(actions.clearwriteAuditRecords());
        setIsApproveError(true);
        setErrorMessage('InternalServerError Occured Please Try Later');
        const timer = setTimeout(() => {
          setIsApproveError(false);
        }, 3000);

        return () => clearTimeout(timer);
      }
    }

    if (rejectIsClicked && recordId != '') {
      if (
        rejectAuditResponse.StatusCode == 'OK' &&
        rejectAuditResponse.IsSuccessStatusCode
      ) {
        if (rejectAuditResponse.Response.Status) {
          removeApprovedItem(recordId);
          dispatch(actions.clearRejectAuditRecords());
        } else if (rejectAuditResponse.Response.Status != true) {
          setIsApproveError(true);
          setErrorMessage(rejectAuditResponse.Response.Message);
          const timer = setTimeout(() => {
            removeApprovedItem(recordId);
            setIsApproveError(false);
            dispatch(actions.clearRejectAuditRecords());
          }, 3000);
          return () => clearTimeout(timer);
        }
      }
      if (
        rejectAuditResponse.StatusCode == 'InternalServerError' &&
        rejectAuditResponse.IsSuccessStatusCode == false
      ) {
        dispatch(actions.clearRejectAuditRecords());
        setIsApproveError(true);
        setErrorMessage('InternalServerError Occured Please Try Later');
        const timer = setTimeout(() => {
          setIsApproveError(false);
        }, 3000);

        return () => clearTimeout(timer);
      }
    }
    if (recordId != '') {
      setRecordId('');
    }
  }, [isClicked, rejectIsClicked]);

  const removeApprovedItem = (recordId) => {
    let sections = auditSection;

    let sectionIndex = sections.findIndex((item) =>
      item.Items.find((it) => it.Id == recordId)
    );
    if (sectionIndex != -1) {
      let itemIndex = sections[sectionIndex].Items.findIndex(
        (item) => item.Id == recordId
      );
      sections[sectionIndex].Items.splice(itemIndex, 1);
      if (sections[sectionIndex].Items.length === 0)
        sections.splice(sectionIndex, 1);
      if (sections.length === 0) {
        props.removeAuditProviderCard(auditId, true, currentPage);
      } else {
        setAuditSection(sections);
      }
    }
  };
  const onApproveHandler = (
    value,
    auditId,
    status,
    currentUserId,
    pwid,
    rejectedItem
  ) => {
    setRecordId(value.Id);
    dispatch(
      actions.writeAuditRecords(
        pwid,
        value.Id,
        value.Id,
        currentUserId,
        'READY',
        auditId,
        setShowSpinner,
        rejectedItem
      )
    );
  };
  const onRejectHandler = (
    value,
    auditId,
    status,
    currentUserId,
    pwid,
    rejectedItem
  ) => {
    setRecordId(value.Id);

    dispatch(
      actions.rejectAuditRecords(
        pwid,
        value.Id,
        value.Id,
        currentUserId,
        'REJECTED',
        auditId,
        setShowSpinner,
        rejectedItem
      )
    );
  };

  const onUndoHandler = (
    value,
    auditId,
    status,
    currentUserId,
    pwid,
    rejectedItem
  ) => {
    setRecordId(value.Id);

    dispatch(
      actions.undoAuditRecords(
        pwid,
        value.Id,
        value.Id,
        currentUserId,
        'HOLD',
        auditId,
        setShowSpinner,
        rejectedItem
      )
    );
  };

  const getHeight = (value) => {
    props.getHeight(value);
  };

  return (
    <Fragment>
      {auditSection.map((auditSection, index) => (
        <AuditSection
          auditRecord={auditSection}
          auditId={auditId}
          status={status}
          currentUserId={currentUserId}
          key={index}
          onApprove={onApproveHandler}
          onReject={onRejectHandler}
          onUndo={onUndoHandler}
          getHeight={getHeight}
          isApproveError={isApproveError}
          hideButtons={hideButtons}
          showStatus={showStatus}
          auditedBy={auditedBy}
          errorMessage={errorMessage}
          providerName={providerName}
          lastModified={lastModified}
        ></AuditSection>
      ))}
      {showSpinner && <Spinner cta={true} />}
    </Fragment>
  );
};

AuditCard.propTypes = {
  auditId: PropTypes.number,
  status: PropTypes.string,
  ProfileManagerAuditRecord: PropTypes.object,
  currentUserId: PropTypes.string,
  removeAuditProviderCard: PropTypes.func,
  hideButtons: PropTypes.bool,
  showStatus: PropTypes.bool,
  auditedBy: PropTypes.string,
  getHeight: PropTypes.func,
  currentPage: PropTypes.number,
  providerName: PropTypes.string,
  lastModified: PropTypes.string,
};

const AuditSection = (props) => {
  const {
    auditRecord,
    auditId,
    status,
    currentUserId,
    isApproveError,
    hideButtons,
    errorMessage,
    providerName,
    lastModified,
  } = props;
  const [isRejectClicked, setIsRejectClicked] = useState(false);
  const [recordId, setRecordId] = useState('');
  const [maxChars, setMaxChars] = useState(500);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectNotification, setRejectNotification] = useState(false);
  const [showAuditSection, setShowAuditSection] = useState(true);
  const [rejectedSection, setRejectedSection] = useState('');
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const currentContent = useRef();
  const proposedContent = useRef();
  const baseUrl = '/landing/image/';

  const [showExistingVideo, setShowExistingVideo] = useState(true);

  /*
  useEffect(() => {
    generateCardHeight();
  });
  */

  const onApprove = (value) => {
    setRecordId(value.Id);
    const rejectedItem = [];
    const rejectModel = {
      AuditId: value.AuditId,
      FieldName: value.SectionName,
    };

    rejectedItem.push(rejectModel);
    props.onApprove(
      value,
      auditId,
      status,
      currentUserId,
      auditRecord.Pwid,
      rejectedItem
    );
  };
  const onReject = (value) => {
    setRecordId(value.Id);
    setIsRejectClicked(false);
    onSend(value);
  };

  const getHeight = (value) => {
    props.getHeight(value);
  };

  const onCancel = (value) => {
    setRecordId('');
    setMaxChars(500);
    setIsRejectClicked(false);
    setRejectNotification(false);
    props.getHeight(0);
  };

  const onSend = (value) => {
    setRejectNotification(false);

    setShowAuditSection(true);
    setIsRejectClicked(false);
    setRejectedSection(value.SectionName);

    const rejectedItem = [];
    const rejectModel = {
      AuditId: value.AuditId,
      FieldName: value.SectionName,
      RejectReason: rejectReason,
    };

    rejectedItem.push(rejectModel);
    props.onReject(
      value,
      auditId,
      status,
      currentUserId,
      auditRecord.Pwid,
      rejectedItem
    );
    setTimeout(() => {
      setRejectNotification(false);
    }, 60000);
  };

  const confirmReject = () => {
    setRejectNotification(false);
  };

  const confirmUndo = (value) => {
    const rejectedItem = [];
    const rejectModel = {
      AuditId: value.AuditId,
      FieldName: value.SectionName,
      RejectReason: rejectReason,
    };

    rejectedItem.push(rejectModel);

    props.onUndo(
      value,
      auditId,
      status,
      currentUserId,
      auditRecord.Pwid,
      rejectedItem
    );

    setRejectNotification(false);
    setShowAuditSection(true);
  };

  const handleMaxChars = (value) => {
    setRejectReason(value);
    setMaxChars(500 - value.length);
  };

  function extractContent(html) {
    return new DOMParser()
      .parseFromString(html, 'text/html')
      .documentElement.textContent.replace(/\n/g, '');
  }

  const generateCardHeight = () => {
    if (currentContent.current != undefined) {
      var currentHt = currentContent.current.clientHeight;
      var proposedHt = proposedContent.current.clientHeight;
      proposedContent.current.innerHTML =
        proposedContent.current.innerHTML +
        '<br/>' +
        currentContent.current.innerHTML;
      currentContent.current.innerHTML =
        currentContent.current.innerHTML +
        '<br/>' +
        proposedContent.current.innerHTML;
      if (currentHt >= proposedHt) {
        let newHt = `height:${currentHt}px`;
        proposedContent.current.style = newHt;
      } else {
        let newHt = `height:${proposedHt}px`;
        currentContent.current.style = newHt;
      }
    }
  };

  const timestampToMintes = (timestamp) => {
    timestamp = Number(timestamp);
    timestamp = timestamp / 1000;

    let m = Math.floor((timestamp % 3600) / 60);
    let s = Math.floor((timestamp % 3600) % 60);

    return m + ':' + s;
  };
  const convertDateFromString = (dateString) => {
    const currentDate = new Date(dateString);

    const currentDayOfMonth = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const dateStr =
      currentDayOfMonth + '/' + (currentMonth + 1) + '/' + currentYear;

    return dateStr;
  };

  const groupModerationLabels = (list, key) => {
    if (list != null) {
      let data = list.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});

      //groupModerationLabels(value.ModerationResult,'ModerationLabelName')
      return data;
    }
  };

  const changeStatus = () => {
    if (showExistingVideo) setShowExistingVideo(false);
    else setShowExistingVideo(true);
  };

  const getRejectedReasons = (showStatus, auditStatus, reviewerComment) => {
    if (showStatus != true) return '';
    if (auditStatus != 'REJECTED') return '';
    return (
      <div className='mar-top'>
        <div className='card'>
          <div className='container-no-border'>
            <div className='current-inner-box-no-flow'>
              <div className='sec1'>{reviewerComment}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getAuditStatusDetails = (
    showStatus,
    auditedBy,
    auditedOn,
    auditStatus
  ) => {
    if (showStatus != true) return '';
    let className = 'audit-details-rejected';
    let statusDisplay = 'Rejected';
    if (auditStatus == 'READY' || auditStatus == 'Ready') {
      className = 'audit-details-approved';
      statusDisplay = 'Approved';
    }
    return (
      <span className={className}>
        <h3>
          {statusDisplay} by {auditedBy} on {auditedOn}
        </h3>
      </span>
    );
  };

  return (
    <div>
      {showRejectNotification && (
        <div className='rejection-section'>
          <div className='rejected-area'>
            <span className='rejected-content'>
              {rejectedSection} rejected - reason will be sent in 5 minutes{' '}
              <span className='undo' onClick={() => confirmUndo(value)}>
                undo
              </span>
            </span>
          </div>
          <div className='done'>
            <button className='btn' onClick={() => confirmReject()}>
              Done
            </button>
          </div>
        </div>
      )}
      {auditRecord.Items.map((value) => (
        <div key={value.Id}>
          {showAuditSection && (
            <div
              id={value.IsetShowAuditSectiond}
              className={`card-container ${
                value.SectionName.includes('Video') ? 'video-container' : ''
              }`}
              key={value.Id}
            >
              {getAuditStatusDetails(
                props.showStatus,
                value.AuditedByUserName,
                value.RequestedDate,
                value.ActionTaken
              )}
              {value.SectionName !== 'Video' && (
                <Fragment>
                  <h3>{value.SectionName.replace('_', ' ')}</h3>
                  <h5>
                    by: {value.RequestedByFullName} - {value.RequesterEmail}
                  </h5>
                  <h5 className='email'>at: {value.RequestedDate}</h5>
                </Fragment>
              )}
              {value.SectionName === 'Photo' ? (
                <div className='card'>
                  <div className='container'>
                    <h4 className='sub-header-1'>Current</h4>
                    <img src={value.OriginalValue} className='original-pic' />
                  </div>
                  {status === 'COMPLETED' ? (
                    <div className='container'>
                      <h4 className='sub-header-2'>Proposed</h4>
                      <img
                        src={baseUrl + auditRecord.Pwid}
                        className='proposed-pic'
                      />
                    </div>
                  ) : (
                    <div className='container'>
                      <h4 className='sub-header-2'>Proposed</h4>
                      <img src={value.ProposedValue} className='proposed-pic' />
                    </div>
                  )}
                </div>
              ) : value.SectionName === 'Video' ? (
                <div
                  className={`card ${
                    value.SectionName.includes('Video') ? 'video-card' : ''
                  }`}
                >
                  <h3 className='heading video-heading-1'>
                    New video for review by: {value.RequestedByFullName} -{' '}
                    {value.RequesterEmail}, at: {value.RequestedDate}
                  </h3>
                  <div className='container video'>
                    <div className='video-sec-left'>
                      {value.ProposedValue != null &&
                        value.ProposedValue != '' && (
                          <video
                            className='video-player'
                            preload='metadata'
                            controls='controls'
                            id='video'
                            src={value.ProposedValue}
                          >
                            <source id='src' />
                          </video>
                        )}
                      {value.OriginalValue != null &&
                        value.OriginalValue != '' && (
                          <div className='existing-video desktop-view'>
                            <h3 className='heading video-heading'>
                              Existing video
                              <span
                                className='hideOrShow'
                                onClick={() => changeStatus()}
                              >
                                {' '}
                                {showExistingVideo ? 'Hide' : 'Show'}{' '}
                              </span>
                            </h3>
                            {showExistingVideo && (
                              <div className='video-sec-left'>
                                {value.VideoDetails.VideoHostCode != null &&
                                value.VideoDetails.VideoHostCode ==
                                  'BRIGHTSPOT' ? (
                                  <iframe
                                    frameBorder='0'
                                    id='video-iframe'
                                    className='exiting-video-player'
                                    src={value.OriginalValue}
                                  ></iframe>
                                ) : (
                                  <video
                                    className='exiting-video-player'
                                    preload='metadata'
                                    controls='controls'
                                    id='current-video'
                                    src={value.OriginalValue}
                                  >
                                    <source id='src' />
                                  </video>
                                )}
                                <div className='video-sec-right'>
                                  <h4 className='heading'>
                                    {providerName} Profile video
                                  </h4>
                                  <label>
                                    Last updated:{' '}
                                    {convertDateFromString(lastModified)}
                                  </label>
                                  <br />
                                  {/* <label>Duration : 01:10</label> */}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                    </div>
                    <div className='video-sec-right'>
                      <h3 className='heading video-heading'>
                        Video Moderation Result
                      </h3>
                      <div className='video-moderation'>
                        {value.VideoDetails.ModerationResult == null ||
                        (value.VideoDetails.ModerationResult &&
                          value.VideoDetails.ModerationResult.length == 0) ? (
                          <span className='no-moderation'>No findings</span>
                        ) : (
                          value.VideoDetails.ModerationResult.map(
                            (moderation, index) => (
                              <span
                                className='video-moderation-label'
                                key={index}
                              >
                                <span className='times'>
                                  {timestampToMintes(moderation.Timestamp)}
                                </span>
                                {'  '}
                                {moderation.ModerationLabelName}
                              </span>
                            )
                          )
                        )}
                      </div>
                      {value.VideoDetails.VideoTranscript != null &&
                        value.VideoDetails.VideoTranscript != '' && (
                          <Fragment>
                            <h3 className='heading video-heading'>
                              Transcript
                            </h3>
                            <div className='video-content-sec'>
                              <p>{value.VideoDetails.VideoTranscript}</p>
                            </div>
                          </Fragment>
                        )}
                      <div className='buttons btn-container'>
                        <div className='button-1 btn1'>
                          <button onClick={() => onApprove(value)}>
                            Approve
                          </button>
                        </div>
                        <div className='button-2 btn2'>
                          <button onClick={() => onReject(value)}>
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className='mobile-view'>
                      {value.OriginalValue != null &&
                        value.OriginalValue != '' && (
                          <div className='existing-video'>
                            <h3 className='heading'>
                              Existing video
                              <span
                                className='hideOrShow'
                                onClick={() => changeStatus()}
                              >
                                {' '}
                                {showExistingVideo ? 'Hide' : 'Show'}{' '}
                              </span>
                            </h3>
                            {showExistingVideo && (
                              <div className='video-sec-left'>
                                {value.VideoDetails.VideoHostCode != null &&
                                value.VideoDetails.VideoHostCode ==
                                  'BRIGHTSPOT' ? (
                                  <iframe
                                    frameBorder='0'
                                    id='video-iframe'
                                    className='exiting-video-player'
                                    src={value.OriginalValue}
                                  ></iframe>
                                ) : (
                                  <video
                                    className='exiting-video-player'
                                    preload='metadata'
                                    controls='controls'
                                    id='current-video'
                                    src={value.OriginalValue}
                                  >
                                    <source id='src' />
                                  </video>
                                )}
                                <div className='video-sec-right'>
                                  <h4 className='heading'>
                                    {providerName} Profile video
                                  </h4>
                                  <label>
                                    Last updated:{' '}
                                    {convertDateFromString(lastModified)}
                                  </label>
                                  <br />
                                  {/* <label>Duration : 01:10</label> */}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className='card'>
                  <div className='container current'>
                    <h4 className='sub-header-1'>Current</h4>
                    <div
                      ref={currentContent}
                      className={`current-inner-box ${
                        value.SectionName.includes('Office')
                          ? 'office-card-height'
                          : ''
                      }`}
                    >
                      {value.OriginalValue !== '' ? (
                        <div
                          className={`sec1 ${
                            value.SectionName.includes('name')
                              ? 'bold padding-top5'
                              : 'align-left'
                          }`}
                          dangerouslySetInnerHTML={{
                            __html: value.OriginalValue,
                          }}
                          style={{ textAlign: 'center' }}
                        />
                      ) : (
                        <p className='empty'>
                          <span>(Empty)</span>
                        </p>
                      )}
                    </div>
                  </div>
                  <div className='container proposed'>
                    <h4 className='sub-header-2'>Proposed</h4>
                    <div
                      ref={proposedContent}
                      className={`proposed-inner-box ${
                        value.SectionName.includes('Office')
                          ? 'office-card-height'
                          : ''
                      }`}
                    >
                      <div
                        className={`sec2 ${
                          value.SectionName.includes('name')
                            ? 'bold padding-top5'
                            : ''
                        }`}
                        dangerouslySetInnerHTML={{
                          __html: value.ProposedValue,
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
              {getRejectedReasons(
                props.showStatus,
                value.ActionTaken,
                value.ReviewerComment
              )}
              {isRejectClicked && value.Id == recordId ? (
                <div className='reject-text'>
                  <textarea
                    name=''
                    id=''
                    cols='120'
                    maxLength='500'
                    rows='6'
                    className='reject-reason'
                    onChange={(e) => handleMaxChars(e.target.value)}
                  ></textarea>
                  <div>
                    <span>{maxChars} characters remaining</span>
                  </div>
                  <div className='buttons'>
                    <div className='button-1'>
                      <button onClick={() => onSend(value)}>Send</button>
                    </div>
                    <div className='button-2'>
                      <button onClick={() => onCancel(value)}>Cancel</button>
                    </div>
                  </div>
                  {showErrorMsg && (
                    <div className='error'>
                      <span className='min-chars'>
                        Please Enter Minimum 10 Characters.
                      </span>
                    </div>
                  )}
                </div>
              ) : hideButtons == true ? (
                <div></div>
              ) : (
                <Fragment>
                  {value.SectionName !== 'Video' && (
                    <div className='buttons'>
                      <div className='button-1'>
                        <button onClick={() => onApprove(value)}>
                          Approve
                        </button>
                      </div>
                      <div className='button-2'>
                        <button onClick={() => onReject(value)}>Reject</button>
                      </div>
                    </div>
                  )}
                  {isApproveError && value.Id == recordId && (
                    <div className='error'>
                      <span className='Validation-error-message'>
                        {errorMessage}
                      </span>
                    </div>
                  )}
                </Fragment>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

AuditSection.propTypes = {
  auditRecord: PropTypes.object,
  auditId: PropTypes.number,
  status: PropTypes.string,
  currentUserId: PropTypes.string,
  onApprove: PropTypes.func,
  onReject: PropTypes.func,
  onUndo: PropTypes.func,
  isApproveError: PropTypes.bool,
  errorMessage: PropTypes.string,
  getHeight: PropTypes.func,
  providerName: PropTypes.string,
  lastModified: PropTypes.string,
};
export default AuditCard;
