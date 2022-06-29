import React, { Fragment, useEffect, useState } from 'react';
import Close from '../../../../assets/images/Close.png';
import Remove from '../../../assets/images/remove-from-list.svg';
import PropTypes from 'prop-types';
import * as batchEditOption from '../../../utils/constant-data';
import ReactModal from 'react-modal';
import Alert from '../../Alert/Alert';

const SelectedProvider = (props) => {
  const {
    providers,
    accountInfo,
    removeProvider,
    onClosehandler,
    batchEditOptionHandler,
    batchDelete
  } = props;
  const batchEditOptions = batchEditOption.batchEditOptions;
  const [showSpinner, setShowSpinner] = useState(false);
  const [showModal, toggleModal] = useState(false);
  const [popupMessage, setPopupMessage] = useState('Are you sure want to remove these providers?');

  const onDeleteHandler = () => {
    toggleModal(true);
  };

  const closeAlertModel = () => {
    toggleModal(false);
  };

  const confirmToDelete = (userId, pwid, clientCode) => {
    setShowSpinner(true);
    batchDelete(userId, pwid, clientCode);
    closeAlertModel();
    setShowSpinner(false);
    onClosehandler();
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
            confirmToDelete(accountInfo.userId, Object.keys(providers), accountInfo.clientCode)
          }></Alert>
      </ReactModal>

      <div className='provider-list-right'>
        <div className='selected-providers'>
          <div className='panel-heading'>
            <span>Selected Providers ({Object.keys(providers).length})</span>
            <a className='close-panel' onClick={onClosehandler}>
              <img src={Close}></img>
            </a>
          </div>
          <div className='panel-container'>
            <div className='panel-content'>
              <div className='scrollbar' id='scrollbar-styles'>
                <div className='panel-name'>
                  {Object.values(providers).map((key) => {
                    return (
                      <div className='added-providers' key={key.ProviderId}>
                        <div className='added-provider-name'>{key.ProviderName}</div>
                        <div className='panel-removebody'>
                          <a
                            className='remove-panel'
                            id={key.ProviderId}
                            name={key.ProviderName}
                            value={key.ProviderName}
                            onClick={() => {
                              removeProvider({ target: { id: key.ProviderId, checked: false } });
                            }}>
                            <img src={Remove} id={key.ProviderId}></img>
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className='force-overflow'></div>
              </div>
            </div>
            <div className='panel-divider'></div>
            <div className='panel-batch-edit'>
              <div className='batchSelectListPanel'>
                <label className='batch-edit-labels'>Select Batch Edit Action</label>{' '}
                <ul className='floating-batch-edit'>
                  {batchEditOptions.map((item, index) => (
                    <li onClick={(e) => batchEditOptionHandler(e, item.Value)} key={index}>
                      <a>{item.Name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className='panel-footer'>
            <div className='batch-remove'>
              <button onClick={() => onDeleteHandler()}>Remove Providers</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

SelectedProvider.propTypes = {
  providers: PropTypes.object,
  accountInfo: PropTypes.object,
  batchPwid: PropTypes.string,
  onRemovehandler: PropTypes.func,
  onClosehandler: PropTypes.func,
  batchEditOptionHandler: PropTypes.func,
  batchDelete: PropTypes.func
};
export default SelectedProvider;
