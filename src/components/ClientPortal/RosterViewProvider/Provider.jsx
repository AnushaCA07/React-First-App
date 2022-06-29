import React, { Fragment, useState, useEffect } from 'react';
import './_provider.less';
import PropTypes from 'prop-types';
import Gauge from '../../Gauge/Gauge';
import moment from 'moment';
import Remove from '../../../assets/images/remove_icon.svg';
import Spinner from '../../Spinner/Spinner';
import { useDispatch } from 'react-redux';
import ReactModal from 'react-modal';
import Alert from '../../Alert/Alert';

const CP_Provider = (props) => {
  const {
    ProviderName,
    ProviderId,
    Npi,
    Office,
    PercentComplete,
    SpecialtyName,
    ProfileViews,
    listId,
    SponsorType,
    LastAccessedBy,
    LastModified,
    selectedCount,
    accountInfo,
  } = props;

  const [style, setStyle] = useState({ display: 'none' });
  const [showSpinner, setShowSpinner] = useState(false);
  const [showModal, toggleModal] = useState(false);
  const [popupMessage, setPopupMessage] = useState('Are you sure want to remove this provider?');
  const getClassNameForSponsorStype = (type) => {
    switch (type) {
      case 'AFFILIATED':
        return 'tags_a';
      case 'EMPLOYED':
        return 'tags_e';
      case 'STANDARD':
        return 'tags_s';
      case 'PREMIUM':
        return 'tags_a';
      case 'ENHANCED':
        return 'tags_e';
      default:
        break;
    }
  };
  const dispatch = useDispatch();

  const onDeleteHandler = () => {
    toggleModal(true);
  };

  const closeAlertModel = () => {
    toggleModal(false);
  };

  const confirmToDelete = (userId, pwid, clientCode) => {
    setShowSpinner(true);
    props.removeProvider(userId, pwid, clientCode);
    closeAlertModel();
    setShowSpinner(false);
  };

  return (
    <Fragment>
      <ReactModal
        overlayClassName='roster-modal-overlay'
        className='modal-dialog'
        ariaHideApp={true}
        isOpen={showModal}
        contentLabel='Alert Message!'
        onRequestClose={closeAlertModel}>
        <Alert
          action={closeAlertModel}
          heading='Alert Message!'
          message={popupMessage}
          confirmUpdate={() =>
            confirmToDelete(accountInfo.userId, ProviderId, accountInfo.clientCode)
          }></Alert>
      </ReactModal>

      <div className='providerInRoster-details-container'>
        <div
          className={
            listId % 2 !== 0
              ? 'providerInRoster-details alternate-background'
              : 'providerInRoster-details'
          }>
          <div className='providerInRoster-info-container'>
            <div className='providerInRoster-info'>
              <a href={`/provider/profile/${ProviderId}`} alt={ProviderName}>
                {ProviderName}
              </a>
              <span>{SpecialtyName}</span>
            </div>
          </div>
          <>
            <div className='providerInRoster-typeID'>
              {SponsorType != null && (
                <>
                  <span className={getClassNameForSponsorStype(SponsorType)}>{SponsorType}</span>
                </>
              )}
              <span>
                NPI: {Npi}, <br />
                PWID: {ProviderId}
              </span>
            </div>
            <div className='practice-container'>
              {Office ? (
                <Fragment>
                  <span>{Office.Name}</span>
                  <p>{Office.AddressLine}</p>
                  <p>{Office.CityState}</p>
                </Fragment>
              ) : null}
            </div>
          </>

          <div className='percentage'>
            <Gauge
              radius={30}
              percent={Number(PercentComplete)}
              backgroundColor={'#E3E3E3'}
              fillColor={'#74D9E2'}
              font={'15px'}
            />
          </div>
          <div className='profile-views'>{ProfileViews}</div>
          <div className='lastAccessedBy-info'>
            {LastAccessedBy != null && (
              <>
                <p>{LastAccessedBy}</p>
                <span>{moment(LastModified).format('LL')}</span>
              </>
            )}
          </div>

          {selectedCount == 0 && (
            <div
              className='remove-onhover'
              onMouseEnter={(e) => {
                setStyle({ display: 'block' });
              }}
              onMouseLeave={(e) => {
                setStyle({ display: 'none' });
              }}
              onClick={() => onDeleteHandler()}>
              <img
                src={Remove}
                id={ProviderId}
                className='img'
                style={style}
                title='Remove Provider'
                alt='Remove Provider'></img>
            </div>
          )}
        </div>
      </div>
      {showSpinner && <Spinner cta={true} />}
    </Fragment>
  );
};

CP_Provider.propTypes = {
  ProviderName: PropTypes.string,
  ProviderId: PropTypes.string,
  Npi: PropTypes.string,
  SpecialtyCode: PropTypes.string,
  SpecialtyName: PropTypes.string,
  Office: PropTypes.object,
  PercentComplete: PropTypes.number,
  ProfileViews: PropTypes.number,
  LastAccessedBy: PropTypes.string,
  LastModified: PropTypes.string,
  SponsorType: PropTypes.string,
  listId: PropTypes.number,
  removeProvider: PropTypes.func,
  accountInfo: PropTypes.object,
};

export default CP_Provider;
