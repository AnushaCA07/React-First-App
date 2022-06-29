import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import close from '../../../assets/images/close.svg';
import './_alert.less';

const Alert = (props) => {
  const { heading, message } = props;
  return (
    <Fragment>
      <div className='roster-modal'>
        <div className='close'>
          <img
            className='close-icon'
            onClick={props.action}
            src={close}
            alt='close'
          />
        </div>
        <div className='roster-modal-container'>
          <div className='roster-modal-header'>
            <h1>{heading}</h1>
          </div>
          <div className='roster-modal-content'>
            <p>{message}</p>
          </div>
          <div className='roster-modal-footer'>
            <button className='cancel-btn' onClick={props.action}>Cancel</button>
            <button onClick={props.confirmUpdate}>Confirm</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Alert.propTypes = {
  action: PropTypes.func,
  heading: PropTypes.string,
  message: PropTypes.string,
};
export default Alert;
