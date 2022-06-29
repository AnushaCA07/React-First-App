import React, { Fragment, useState, useEffect } from 'react';
import '../Dashboard/HeroBanner/_heroBanner.less';
import './_contactus.less';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';
import Spinner from '../Spinner/Spinner';
import ReactModal from 'react-modal';

import logo from '../../../public/images/logo.png';
import boxIcon from '../../../public/images/box-icon.png';
import tick from '../../../public/images/tick.png';
import warning from '../../../public/images/warning.png';
import cross from '../../../public/images/cross.png';
import middot from '../../../public/images/middot.png';
import ValidationErrorMessage from '../FormComponents/ValidationErrorMessage';
import TextValidation from '../../utils/validation/isTextValid';
import isEmpty from '../../utils/validation/isEmpty';
import * as constants from '../../utils/constant-data';

const ContactUs = () => {
  // const { providerData } = props;

  const { providerInfo } = useSelector((state) => state.loadProviderData);

  const [showSpinner, setShowSpinner] = useState(false);
  const [showModal, toggleModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [ticketNo, setTicketNo] = useState(0);
  const { ticketId, success, errorMsg } = useSelector(
    (state) => state.contactSubmitReducer
  );

  const isEmptyField = { isValid: false, error: 'This field is required' };

  const [isFirstnameValid, setFirstnameValidation] = useState({
    isValid:
      providerInfo.firstName != '' && providerInfo.firstName != undefined
        ? true
        : false,
    error: '',
  });

  const [isLastnameValid, setLastnameValidation] = useState({
    isValid:
      providerInfo.lastName != '' && providerInfo.lastName != undefined
        ? true
        : false,
    error: '',
  });

  const [isEmailValid, setEmailValidation] = useState({
    isValid:
      providerInfo.email != '' && providerInfo.email != undefined
        ? true
        : false,
    error: '',
  });
  const [isAlternateEmailValid, setAlternateEmailValidation] = useState({
    isValid:
      providerInfo.AlternateEmail != '' &&
      providerInfo.AlternateEmail != undefined
        ? true
        : false,
    error: '',
  });
  const [isSubjectValid, setSubjectValidation] = useState({
    isValid:
      providerInfo.subject != '' && providerInfo.subject != undefined
        ? true
        : false,
    error: '',
  });
  const [isCommentValid, setCommentValidation] = useState({
    isValid:
      providerInfo.comment != '' && providerInfo.comment != undefined
        ? true
        : false,
    error: '',
  });

  const [isProviderNameValid, setProviderNameValidation] = useState({
    isValid:
      providerInfo.providerName != '' && providerInfo.providerName != undefined
        ? true
        : false,
    error: '',
  });

  const [isCityValid, setCityValidation] = useState({
    isValid:
      providerInfo.city != '' && providerInfo.city != undefined ? true : false,
    error: '',
  });

  const [isStateValid, setStateValidation] = useState({
    isValid:
      providerInfo.state != 'Select State' && providerInfo.state != undefined
        ? true
        : false,
    error: '',
  });
  const [isRoleValid, setRoleValidation] = useState({
    isValid:
      providerInfo.role != '-' && providerInfo.role != undefined ? true : false,
    error: '',
  });

  const dispatch = useDispatch();
  useEffect(() => {
    toggleModal(false);
  }, []);

  useEffect(() => {
    if (success && ticketId != 0) {
      setTicketNo(ticketId);
      onShowModel('success');
      clearContactsData();
    } else if (errorMsg != '') {
      onShowModel('error');
    }
  }, [ticketId, success, errorMsg]);

  const [contactData, setContactData] = useState({
    firstName: providerInfo.FirstName,
    lastName: providerInfo.LastName,
    email: providerInfo.Email,
    alternateEmail: providerInfo.AlternateEmail,
    providerName: providerInfo.ProviderName,
    city: providerInfo.City,
    state: providerInfo.State,
    subject: '',
    comment: '',
    source: providerInfo.Source,
    role: '-',
  });

  const [dataChange, updateDataChange] = useState(0);

  const [commentWordCount, setCommentWordCount] = useState(500);

  useEffect(() => {
    if (dataChange > 0) {
      if (
        contactData.firstName != '' &&
        contactData.lastName != '' &&
        contactData.email != '' &&
        contactData.providerName != '' &&
        contactData.city != '' &&
        contactData.state != '' &&
        contactData.state != 'Select State' &&
        contactData.subject != '' &&
        contactData.comment != '' &&
        contactData.role != '' &&
        contactData.role != '-'
      ) {
        updateValidationSetToTrue();
      }
    }
  }, [dataChange]);

  const updateValidationSetToTrue = () => {
    setFirstnameValidation({ isValid: true, error: '' });
    setLastnameValidation({ isValid: true, error: '' });
    setEmailValidation({ isValid: true, error: '' });
    setSubjectValidation({ isValid: true, error: '' });
    setCommentValidation({ isValid: true, error: '' });
    setProviderNameValidation({ isValid: true, error: '' });
    setCityValidation({ isValid: true, error: '' });
    setStateValidation({ isValid: true, error: '' });
    setRoleValidation({ isValid: true, error: '' });
  };

  const updateValidationSetToFalse = () => {
    //setFirstnameValidation({ isValid: false, error: '' });
    //setLastnameValidation({ isValid: false, error: '' });
    //setEmailValidation({ isValid: false, error: '' });
    setProviderNameValidation({ isValid: false, error: '' });
    setCityValidation({ isValid: false, error: '' });
    setStateValidation({ isValid: false, error: '' });
    setSubjectValidation({ isValid: false, error: '' });
    setCommentValidation({ isValid: false, error: '' });
    setRoleValidation({ isValid: false, error: '' });
  };

  const changeHandler = (e) => {
    updateDataChange(dataChange + 1);
    switch (e.target.id) {
      case 'firstName':
        setContactData({ ...contactData, firstName: e.target.value });
        if (isEmpty(e.target.value)) {
          setFirstnameValidation(isEmptyField);
        } else {
          setFirstnameValidation(TextValidation(contactData.firstName, 'name'));
        }
        break;
      case 'lastName':
        setContactData({ ...contactData, lastName: e.target.value });
        if (isEmpty(e.target.value)) {
          setLastnameValidation(isEmptyField);
        } else {
          setLastnameValidation(TextValidation(contactData.lastName, 'name'));
        }
        break;
      case 'email':
        setContactData({ ...contactData, email: e.target.value });
        setEmailValidation(TextValidation(e.target.value, 'emailaddress'));
        break;
      case 'alternateEmail':
        setContactData({ ...contactData, alternateEmail: e.target.value });
        setAlternateEmailValidation(
          TextValidation(e.target.value, 'emailaddress')
        );
        break;
      case 'providerName':
        setContactData({ ...contactData, providerName: e.target.value });
        if (isEmpty(e.target.value)) {
          setProviderNameValidation(isEmptyField);
        }
        break;
      case 'city':
        setContactData({ ...contactData, city: e.target.value });
        if (isEmpty(e.target.value)) {
          setCityValidation(isEmptyField);
        }
        break;
      case 'state':
        setContactData({ ...contactData, state: e.target.value });
        if (isEmpty(e.target.value)) {
          setStateValidation(isEmptyField);
        }
        break;
      case 'subject':
        setContactData({ ...contactData, subject: e.target.value });
        if (isEmpty(e.target.value)) {
          setSubjectValidation(isEmptyField);
        } else {
          setSubjectValidation(TextValidation(contactData.subject, 'name'));
        }
        break;
      case 'comment':
        setContactData({ ...contactData, comment: e.target.value });
        if (isEmpty(e.target.value)) {
          setCommentValidation(isEmptyField);
        }
        break;
      case 'role':
        setContactData({ ...contactData, role: e.target.value });
        if (isEmpty(e.target.value)) {
          setRoleValidation(isEmptyField);
        }
        break;
    }
  };

  const wordCount = (e) => {
    changeHandler(e);
    let currentText = e.target.value;
    let characterCount = currentText.length;
    let charsPerPageCount = 500;
    let unitCount = charsPerPageCount - characterCount;
    setCommentWordCount(unitCount);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    validateInput();
    if (
      isFirstnameValid.isValid &&
      isLastnameValid.isValid &&
      isEmailValid.isValid &&
      isSubjectValid.isValid &&
      isCommentValid.isValid &&
      isProviderNameValid.isValid &&
      isCityValid.isValid &&
      isStateValid.isValid &&
      isRoleValid.isValid
    ) {
      updateDataChange(0);
      dispatch(actions.submitContactUs(contactData, setShowSpinner));
    }
  };

  const onShowModel = (errorFor) => {
    toggleModal(true);
    setShowSuccessModal(false);
    setShowErrorModal(false);
    if (errorFor == 'error') setShowErrorModal(true);
    else if (errorFor == 'success') setShowSuccessModal(true);
  };

  const closeModal = () => {
    toggleModal(false);
  };

  const validateInput = () => {
    if (isEmpty(contactData.firstName)) {
      setFirstnameValidation(isEmptyField);
    } else {
      setFirstnameValidation(TextValidation(contactData.firstName, 'name'));
    }

    if (isEmpty(contactData.lastName)) {
      setLastnameValidation(isEmptyField);
    } else {
      setLastnameValidation(TextValidation(contactData.lastName, 'name'));
    }

    if (isEmpty(contactData.email)) {
      setEmailValidation(isEmptyField);
    } else {
      setEmailValidation(TextValidation(contactData.email, 'emailaddress'));
    }

    if (isEmpty(contactData.providerName)) {
      setProviderNameValidation(isEmptyField);
    }

    if (isEmpty(contactData.city)) {
      setCityValidation(isEmptyField);
    }

    if (isEmpty(contactData.state) || contactData.state == 'Select State') {
      setStateValidation(isEmptyField);
    }

    if (isEmpty(contactData.subject)) {
      setSubjectValidation(isEmptyField);
    } else {
      setSubjectValidation(TextValidation(contactData.subject, 'name'));
    }

    if (isEmpty(contactData.comment)) {
      setCommentValidation(isEmptyField);
    }

    if (isEmpty(contactData.role) || contactData.role == '-') {
      setRoleValidation(isEmptyField);
    }
  };

  const clearContactsData = () => {
    setContactData({
      ...contactData,
      subject: '',
      alternateEmail: '',
      providerName: '',
      city: '',
      state: 'Select State',
      comment: '',
      role: '-',
    });
    setCommentWordCount(500);
    updateValidationSetToFalse();
  };

  return (
    <Fragment>
      <ReactModal
        overlayClassName='roster-modal-overlay'
        className='modal-dialog'
        ariaHideApp={true}
        isOpen={showModal}
        contentLabel='Create Roster User'
        onRequestClose={closeModal}
      >
        <div className='model-window'>
          <div className='close'>
            <img
              className='close-icon'
              src={cross}
              alt='close'
              onClick={closeModal}
            />
          </div>

          {showErrorModal && (
            <Fragment>
              <img className='icons' src={warning} alt='warning' />
              <h1>Unable to submit form</h1>
              <hr />
              <p>
                The server encountered a temperory error and could not complete
                your request. Please try again later.
              </p>
            </Fragment>
          )}
          {showSuccessModal && (
            <Fragment>
              <img className='icons' src={tick} alt='success' />
              <h1>Thank you!</h1>
              <hr />
              <p>
                We want to respond to your email right away, but first we had
                like to take time to look over your inquiry and make sure we
                send you the answers you are looking for - we will do our best
                to respond within 2-3 business days.
              </p>
              <p className='pad-top-0'>
                Please Keep this Confirmation Number for future reference:{' '}
                <strong>{ticketNo}</strong>
              </p>
            </Fragment>
          )}

          <button className='btn-submit' onClick={closeModal}>
            Close
          </button>
        </div>
      </ReactModal>

      <div className='herobanner-container'>
        <div className='herobanner-inner-container hero-contact-banner'>
          <div className='banner-section contact-inner-section'>
            <div className='top-sec contact-top-sec'>
              <h1>Contact Us</h1>
            </div>
            <img
              className='right-align-logo contact-logo'
              src={logo} //'../public/images/logo.png'
              alt='HG Logo'
            />
          </div>

          <div className='highlight-section contact-highlight-section'>
            <div className='highlight-section-inner'>
              <div className='cols contact-full-width'>
                <p>
                  For details about updating your provider profile, visit the
                  <a
                    href='https://helpcenter.healthgrades.com/help?utm_source=hgmd&amp;utm_medium=providers-contact-us-form&amp;utm_campaign=healthgrades-help-center'
                    target='_blank' rel="noreferrer"
                  >
                    {' '}
                    Healthgrades Help Center
                  </a>
                  .
                  <br /> For additional help, complete the form below and a
                  Customer Service Representative will contact you as soon as
                  possible.
                </p>
              </div>
            </div>
          </div>

          <svg
            className='hero-background-svg'
            data-qa-target='hero-background-svg'
            preserveAspectRatio='none'
            viewBox='0 0 1442 149'
          >
            <path
              d='M0 149H1442C1294.8 56 922.421 -33.1384 616.576 36.3702C310.73 105.879 78.0896 49.1638 0 0V149Z'
              fill='white'
            ></path>
          </svg>

          <svg
            className='hero-background-svg-mobile'
            data-qa-target='hero-background-svg-mobile'
            preserveAspectRatio='none'
            viewBox='0 0 375 120'
          >
            <path
              d='M0.0958797 7.28809C31.3141 43.007 103.471 68.0182 187.5 68.0182C271.528 68.0182 343.685 43.007 374.903 7.28809H375V139.313H0V7.28809H0.0958797Z'
              fill='#FFFFFF'
            ></path>
          </svg>
        </div>
      </div>

      <div className='contact-form'>
        <div className='contact-left'>
          <div className='form-container'>
            <div className='first-section'>
              <p>
                <label>First Name*</label>
                <input
                  type='text'
                  placeholder='eg: Joe'
                  id='firstName'
                  value={contactData.firstName}
                  className='readonly'
                  onChange={changeHandler}
                  readOnly={true}
                />
                {!isFirstnameValid.isValid && (
                  <ValidationErrorMessage message={isFirstnameValid.error} />
                )}
              </p>
            </div>
            <div className='last-section'>
              <p>
                <label>Last Name*</label>
                <input
                  type='text'
                  placeholder='eg: Root'
                  id='lastName'
                  value={contactData.lastName}
                  className='readonly'
                  onChange={changeHandler}
                  readOnly={true}
                />
                {!isLastnameValid.isValid && (
                  <ValidationErrorMessage message={isLastnameValid.error} />
                )}
              </p>
            </div>
          </div>
          <div className='form-container'>
            <div className='first-section full-width'>
              <p>
                <label>Email*</label>
                <input
                  type='email'
                  placeholder='eg: Joeroot@gmail.com'
                  id='email'
                  className='readonly'
                  value={contactData.email}
                  onChange={changeHandler}
                  readOnly={true}
                  maxLength={350}
                />
                {!isEmailValid.isValid && (
                  <ValidationErrorMessage message={isEmailValid.error} />
                )}
              </p>
            </div>
          </div>
          <div className='form-container'>
            <div className='first-section full-width'>
              <p>
                <label>Alternate Email</label>
                <input
                  type='email'
                  placeholder='eg: example_secondary@gmail.com'
                  id='alternateEmail'
                  value={contactData.alternateEmail}
                  onChange={changeHandler}
                  maxLength={350}
                />
                {!isAlternateEmailValid.isValid && (
                  <ValidationErrorMessage
                    message={isAlternateEmailValid.error}
                  />
                )}
              </p>
            </div>
          </div>
          <div className='form-container'>
            <div className='first-section full-width'>
              <p>
                <label>Provider Name*</label>
                <input
                  type='text'
                  placeholder='eg: Dr. James Taylor'
                  id='providerName'
                  value={contactData.providerName}
                  onChange={changeHandler}
                  maxLength={150}
                />
                {!isProviderNameValid.isValid && (
                  <ValidationErrorMessage message={isProviderNameValid.error} />
                )}
              </p>
            </div>
          </div>
          <div className='form-container'>
            <div className='first-section'>
              <p>
                <label>City*</label>
                <input
                  type='text'
                  placeholder='eg: Denver'
                  id='city'
                  value={contactData.city}
                  onChange={changeHandler}
                  maxLength={150}
                />
                {!isCityValid.isValid && (
                  <ValidationErrorMessage message={isCityValid.error} />
                )}
              </p>
            </div>
            <div className='last-section'>
              <p>
                <label>State*</label>
                {/* <input
                  type='text'
                  placeholder='CO'
                  id='state'
                  value={contactData.state}
                  onChange={changeHandler}
                /> */}
                <select
                  name='state'
                  id='state'
                  data-recurly='state'
                  onChange={changeHandler}
                  value={contactData.state}
                  //className={errors.state ? 'error state' : 'state'}
                  //ref={register({ required: 'This field is required.' })}
                >
                  {constants.stateOptions.map((data, index) => (
                    <option key={index} value={data.value}>
                      {data.value}
                    </option>
                  ))}
                </select>
                {!isStateValid.isValid && (
                  <ValidationErrorMessage message={isStateValid.error} />
                )}
              </p>
            </div>
          </div>
          <div className='form-container'>
            <div className='first-section full-width'>
              <p>
                <label>Role*</label>
                <select
                  name='role'
                  id='role'
                  onChange={changeHandler}
                  value={contactData.role}
                >
                  {constants.roleOptions.map((data, index) => (
                    <option key={index} value={data.value}>
                      {data.label}
                    </option>
                  ))}
                </select>
                {!isRoleValid.isValid && (
                  <ValidationErrorMessage message={isRoleValid.error} />
                )}
              </p>
            </div>
          </div>
          <div className='form-container'>
            <div className='first-section full-width'>
              <p>
                <label>Subject*</label>
                <input
                  type='text'
                  placeholder=''
                  id='subject'
                  value={contactData.subject}
                  onChange={changeHandler}
                  maxLength={100}
                />
                {!isSubjectValid.isValid && (
                  <ValidationErrorMessage message={isSubjectValid.error} />
                )}
              </p>
            </div>
          </div>
          <div className='form-container'>
            <div className='first-section full-width'>
              <p>
                <label>Comment*</label>
                <textarea
                  id='comment'
                  name='comment'
                  rows='4'
                  cols='50'
                  value={contactData.comment}
                  onChange={wordCount}
                  maxLength={500}
                />
                {!isCommentValid.isValid && (
                  <ValidationErrorMessage message={isCommentValid.error} />
                )}
              </p>
              <p className='char-remain'>
                {commentWordCount} characters remaining
              </p>
            </div>
          </div>
          <div className='form-container'>
            <div className='first-section full-width align-right'>
              <button
                type='submit'
                value='Submit'
                className='btn-submit'
                onClick={onSubmitHandler}
              >
                Submit
              </button>
              <p className='char-indicator'>*Indicates required field</p>
            </div>
          </div>
        </div>
        <div className='contact-right'>
          <div className='inner-container'>
            <h2>Write to us:</h2>
            <div className='sub-container'>
              <div>
                <img src={boxIcon} alt='mail box' />
              </div>
              <div>
                <p className='address'>
                  1801 California Street
                  <br />
                  Suite 900
                  <br />
                  Denver, CO 80202
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='pad-bottom-5'></div>
      <div className='left-middots'>
        <img src={middot} alt='dots' />
      </div>
      {showSpinner && <Spinner cta={true} />}
    </Fragment>
  );
};

// ContactUs.propTypes = {
//   providerData: PropTypes.object,
// };

export default ContactUs;
