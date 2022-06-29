import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import Modal from 'react-modal';
import './_accountSetting.less';
import showPassword from '../../../../assets/images/show_password.svg';
import hidePassword from '../../../../assets/images/icon_hidepassword.svg';
import * as constants from '../../../utils/constant-data';
import close from '../../../assets/images/exit-icon.svg';
import AutoComplete from '../../FormComponents/AutoComplete/AutoComplete';
import ValidationErrorMessage from '../../FormComponents/ValidationErrorMessage';
import TextValidation from '../../../utils/validation/isTextValid';
import isEmpty from '../../../utils/validation/isEmpty';
import * as actions from '../../../store/actions';
import Spinner from '../../Spinner/Spinner';

const AccountSettingModal = (props) => {
  const { showModalAcc, toggleModalAcc, closeModalAcc } = props;

  // Load details
  const profileData = props.profileInfo;

  const [password, togglePassword] = useState(false);
  const [cnfpassword, toggleCnfPassword] = useState(false);
  const [isShowPasswordGroup, setIsShowPasswordGroup] = useState(false);
  const isEmptyField = { isValid: false, error: 'This field is required' };
  const dispatch = useDispatch();
  const [displaySpinner, setDisplaySpinner] = useState(false);

  //To get Client Code
  const [suggestData, setSuggestData] = useState(Object);
  const [suggestValue, setSuggestValue] = useState('');
  const [selectedClientData, setSelectedClientData] = useState({
    clientCode: '',
    clientName: ''
  });

  useEffect(() => {
    if (selectedClientData != null && selectedClientData != undefined) {
      if (selectedClientData.clientCode != '' && selectedClientData.clientName != '') {
        let cliName = selectedClientData.clientName.split(':');
        setAccount({
          ...account,
          clientCode: selectedClientData.clientCode,
          clientName: cliName[0]
        });
      }
    }
  }, [selectedClientData]);

  useEffect(() => {
    if (account != null && account != undefined) {
      if (account.clientCode != '') {
        let cc = account.clientCodes.map((i) => {
          if (i.ClientToProductCode === account.clientCode) {
            setSuggestData({
              clientCode: i.ClientCode,
              clientName: i.ClientName,
              clientToProductCode: i.ClientToProductCode
            });
            setSuggestValue(i.ClientName + ' : ' + i.ClientToProductCode);
          } else {
            return;
          }
        });
      }
    }
  }, []);

  //Update Account Settings
  const { success, errorMsg } = useSelector((state) => state.updateAccountSettingsReducer);
  // Update password
  const { updatePasswordsuccess, updatePassworderrorMsg } = useSelector(
    (state) => state.updatePasswordReducer
  );

  const [isFirstnameValid, setFirstnameValidation] = useState({
    isValid: profileData.firstName != '' && profileData.firstName != undefined ? true : false,
    error: ''
  });
  const [isLastnameValid, setLastnameValidation] = useState({
    isValid: profileData.lastName != '' && profileData.lastName != undefined ? true : false,
    error: ''
  });
  const [isEmailValid, setEmailValidation] = useState({
    isValid: profileData.email != '' && profileData.email != undefined ? true : false,
    error: ''
  });
  const [isPasswordValid, setPasswordValidation] = useState({
    isValid: true,
    error: ''
  });
  const [isCnfPasswordValid, setCnfPasswordValidation] = useState({
    isValid: true,
    error: ''
  });
  const [isAdminRoleValid, setAdminRoleValidation] = useState({
    isValid: profileData.currentRole != '' && profileData.currentRole != undefined ? true : false,
    error: ''
  });
  const [isClientCodeValid, setClientCodeValidation] = useState({
    isValid: true,
    error: ''
  });
  const [isChecked, setCheckboxValidation] = useState({
    isValid: false,
    error: null
  });

  const [account, setAccount] = useState({
    firstName: profileData.firstName,
    lastName: profileData.lastName,
    email: profileData.email,
    password: '',
    cnfpassword: '',
    adminRole: profileData.currentRole,
    clientCode: profileData.clientCode,
    clientName: '',
    clientCodes: profileData.clientCodes,
    userId: profileData.userId
  });

  const validateInput = () => {
    if (isEmpty(account.firstName)) {
      setFirstnameValidation(isEmptyField);
    } else {
      setFirstnameValidation(TextValidation(account.firstName, 'name'));
    }

    if (isEmpty(account.lastName)) {
      setLastnameValidation(isEmptyField);
    } else {
      setLastnameValidation(TextValidation(account.lastName, 'name'));
    }

    if (isEmpty(account.email)) {
      setEmailValidation(isEmptyField);
    } else {
      setEmailValidation(TextValidation(account.email, 'emailaddress'));
    }

    if (isEmpty(account.password) && isShowPasswordGroup) {
      setPasswordValidation(isEmptyField);
    } else {
      setPasswordValidation(TextValidation(account.password, 'password'));
    }

    if (isEmpty(account.cnfpassword) && isShowPasswordGroup) {
      setCnfPasswordValidation({
        isValid: false,
        error: 'Please re-enter your password to confirm'
      });
    } else {
      setCnfPasswordValidation('Please re-enter your password to confirm');
    }

    if (
      isEmpty(account.adminRole) ||
      account.adminRole == 'Select Admin Role' ||
      account.adminRole == '-'
    ) {
      setAdminRoleValidation(isEmptyField);
    } else {
      setAdminRoleValidation('Please Select Any of Admin Roles');
    }

    if (account.adminRole === 'Client_Admin') {
      if (isEmpty(account.clientCode)) {
        setClientCodeValidation(isEmptyField);
      } else {
        setClientCodeValidation('Please Select Any of Client Codes');
      }
    } else {
      setClientCodeValidation({
        isValid: true,
        error: ''
      });
    }

    if (!isChecked.isValid) {
      setCheckboxValidation({
        isValid: false,
        error: 'Please verify the identity of this user'
      });
    }
  };

  const isRosterInValid = () => {
    return (
      isEmpty(account.firstName) ||
      isEmpty(account.lastName) ||
      isEmpty(account.email) ||
      isEmpty(account.adminRole) ||
      !isChecked.isValid ||
      (account.adminRole === 'Client_Admin' && isEmpty(account.clientCode)) ||
      (isShowPasswordGroup
        ? isEmpty(account.password) || account.password != account.cnfpassword
        : false)
    );
  };

  const [dataChange, updateDataChange] = useState(0);
  useEffect(() => {
    if (dataChange > 0) {
      if (
        account.firstName != '' &&
        account.lastName != '' &&
        account.email != '' &&
        account.password == account.cnfpassword &&
        account.adminRole != '' &&
        account.adminRole != '-' &&
        account.clientCode != '' &&
        account.clientCode != 'Client Code'
      ) {
        updateValidationSetToTrue();
      }
    }
  }, [dataChange]);

  const updateValidationSetToTrue = () => {
    setFirstnameValidation({ isValid: true, error: '' });
    setLastnameValidation({ isValid: true, error: '' });
    setEmailValidation({ isValid: true, error: '' });
    setPasswordValidation({ isValid: true, error: '' });
    setCnfPasswordValidation({ isValid: true, error: '' });
    setAdminRoleValidation({ isValid: true, error: '' });
    setClientCodeValidation({ isValid: true, error: '' });
  };

  const updateValidationSetToFalse = () => {
    setFirstnameValidation({ isValid: false, error: '' });
    setLastnameValidation({ isValid: false, error: '' });
    setEmailValidation({ isValid: false, error: '' });
    setPasswordValidation({ isValid: false, error: '' });
    setCnfPasswordValidation({ isValid: false, error: '' });
    setAdminRoleValidation({ isValid: false, error: '' });
    setClientCodeValidation({ isValid: false, error: '' });
  };

  const changeHandler = (e) => {
    updateDataChange(dataChange + 1);
    switch (e.target.id) {
      case 'firstname':
        setAccount({ ...account, firstName: e.target.value });
        if (isEmpty(e.target.value)) {
          setFirstnameValidation(isEmptyField);
        } else {
          setFirstnameValidation(TextValidation(account.firstName, 'name'));
        }
        break;

      case 'lastname':
        setAccount({ ...account, lastName: e.target.value });
        if (isEmpty(e.target.value)) {
          setLastnameValidation(isEmptyField);
        } else {
          setLastnameValidation(TextValidation(account.firstName, 'name'));
        }
        break;

      case 'email':
        setAccount({ ...account, email: e.target.value });
        setEmailValidation(TextValidation(e.target.value, 'emailaddress'));
        break;

      case 'password':
        setAccount({ ...account, password: e.target.value });
        setPasswordValidation(TextValidation(e.target.value, 'password'));
        break;

      case 'cnfpassword':
        setAccount({ ...account, cnfpassword: e.target.value });
        setCnfPasswordValidation({
          isValid: e.target.value != account.password ? false : true,
          error: 'Please re-enter your password to confirm'
        });
        break;

      case 'adminRole':
        setAccount({ ...account, adminRole: e.target.value });
        setAdminRoleValidation({
          isValid: e.target.value != '-' || e.target.value != undefined ? true : false,
          error: 'Please Select Any of Admin Roles'
        });
        if (account.adminRole !== 'Client_Admin') {
          setSuggestValue('');
          let clientDataElement = document.getElementById('clientData');
          if (clientDataElement) {
            document.getElementById('clientData').value = '';
          }
        }
        break;

      case 'clientCode':
        setAccount({ ...account, clientCode: e.target.value });
        setClientCodeValidation({
          isValid: e.target.value != '-' || e.target.value != undefined ? true : false,
          error: 'Please Select Any of client Codes'
        });
        break;

      case 'verifycheckBox':
        if (e.currentTarget.checked == false) {
          setCheckboxValidation({
            isValid: false,
            error: 'Please verify the identity of this user'
          });
        } else {
          setCheckboxValidation({
            isValid: true,
            error: ''
          });
        }
        break;
    }
  };

  const onUpdateHandler = (e) => {
    e.preventDefault();
    validateInput();
    if (!isRosterInValid()) {
      if (account.adminRole !== 'Client_Admin') {
        setAccount({ ...account, clientCode: '' });
        setAccount({ ...account, clientName: '' });
      }
      setDisplaySpinner(true);
      if (isShowPasswordGroup) {
        dispatch(
          actions.updatePassword(
            account.password,
            account.cnfpassword,
            account.userId,
            setDisplaySpinner
          )
        );
      }
      dispatch(actions.updateAccountSettings(account, setDisplaySpinner, closeModalAcc));
    }
  };
  const clientsTextBoxData = {
    id: 'clientData',
    name: 'clientData',
    placeholder: 'Client Code'
  };
  const searchClientCodeChange = (e) => {
    setSuggestValue(e.target.value);
    if (e.currentTarget.value.length <= 1) {
      return;
    }
    let filteredClients = account.clientCodes.filter(function (v) {
      if (
        v.ClientName.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1 ||
        v.ClientCode.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
      ) {
        return v;
      }
    });
    let clientsData = filteredClients.slice(0, 5);
    setSuggestData(clientsData);
    return clientsData;
  };

  const onSelectedItem = (data) => {
    setSelectedClientData({
      ...selectedClientData,
      clientCode: data[0].values,
      clientName: data[0].text
    });
    setSuggestValue(data[0].text);
  };

  useEffect(() => {
    setAccount({ ...account });
    setClientCodeValidation({
      isValid: true,
      error: ''
    });
  }, [account.adminRole]);

  const togglePasswordGroup = () => {
    setIsShowPasswordGroup(!isShowPasswordGroup);
  };

  const clearAccountSettings = () => {
    setAccount({
      ...account,
      password: '',
      cnfpassword: ''
    });
    updateValidationSetToFalse();
    toggleModalAcc(false);
    setDisplaySpinner(false);
  };

  useEffect(() => {
    toggleModalAcc(false);
  }, []);

  useEffect(() => {
    let msg = updatePasswordsuccess ? updatePasswordsuccess && success : success;
    if (msg) {
      clearAccountSettings();
    } else if (errorMsg != '') {
     // console.log(errorMsg);
    }
  }, [success, errorMsg, updatePasswordsuccess, updatePassworderrorMsg]);

  useEffect(() => {
    Modal.setAppElement('body');
  });

  return (
    <Fragment>
      <ReactModal
        overlayClassName='roster-modal-overlay'
        className='modal-dialog'
        ariaHideApp={true}
        isOpen={showModalAcc}
        contentLabel='Account Setting'
        onRequestClose={closeModalAcc}
        shouldCloseOnEsc={false}
        shouldCloseOnOverlayClick={false}>
        <div className='manage-account'>
          <div className='roster-modal'>
            <div className='close-modal'>
              <img className='close-icon' src={close} alt='close' onClick={closeModalAcc} />
            </div>
            <form id='rosterForm' autoComplete='off'>
              <div className='roster-modal-container'>
                <div className='error-response'>
                  {!success && (
                    <ValidationErrorMessage
                      className='error-response'
                      message={errorMsg}></ValidationErrorMessage>
                  )}
                </div>
                <div className='roster-modal-header'>
                  <h1> Account Settings</h1>
                  <p>General Information</p>
                </div>

                <div className='roster-modal-content'>
                  <div className='input-inline'>
                    <div className='firstname'>
                      <div className='height-fix'>
                        <input
                          className='input'
                          id='firstname'
                          type='text'
                          value={account.firstName}
                          onChange={changeHandler}
                        />
                        <label htmlFor='firstname' className='floating-label'>
                          First Name*
                        </label>
                      </div>
                      {!isFirstnameValid.isValid && (
                        <ValidationErrorMessage message={isFirstnameValid.error} />
                      )}
                    </div>

                    <div className='lastname'>
                      <div className='height-fix'>
                        <input
                          className='input'
                          id='lastname'
                          type='text'
                          value={account.lastName}
                          onChange={changeHandler}
                        />
                        <label htmlFor='lastname' className='floating-label'>
                          Last Name*
                        </label>
                      </div>{' '}
                      {!isLastnameValid.isValid && (
                        <ValidationErrorMessage message={isLastnameValid.error} />
                      )}
                    </div>
                  </div>

                  <div className='input-block'>
                    <div className='email'>
                      <div className='height-fix'>
                        <input
                          className='block-email'
                          id='email'
                          type='email'
                          value={account.email}
                          onChange={changeHandler}
                        />

                        <label htmlFor='email' className='floating-label'>
                          Email*
                        </label>
                      </div>
                      {!isEmailValid.isValid && (
                        <ValidationErrorMessage message={isEmailValid.error} />
                      )}
                    </div>

                    <div className='password-grp'>
                      <p>
                        <label className='password-grp-title'> Password</label>
                        <label className='password-grp-toggle' onClick={togglePasswordGroup}>
                          {' '}
                          {isShowPasswordGroup ? 'Hide' : 'Show'}
                        </label>
                        {isShowPasswordGroup && (
                          <Fragment>
                            <div className='password'>
                              <div className='height-fix'>
                                <input
                                  id='password'
                                  type={password ? 'password' : 'text'}
                                  className='block-password'
                                  onChange={changeHandler}
                                  placeholder={'New Password'}
                                />
                              </div>
                              <div className='pswd-toggle'>
                                <div className='toggle-password' id='togglePassword'>
                                  <label htmlFor='togglePassword'>
                                    <div>
                                      {password ? (
                                        <img
                                          src={showPassword}
                                          alt='showpassword'
                                          onClick={() => togglePassword(!password)}
                                        />
                                      ) : (
                                        <img
                                          src={hidePassword}
                                          alt='hidepassword'
                                          onClick={() => togglePassword(!password)}
                                        />
                                      )}
                                    </div>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className='password'>
                              <div className='height-fix'>
                                <input
                                  id='cnfpassword'
                                  type={cnfpassword ? 'password' : 'text'}
                                  className='block-password'
                                  onChange={changeHandler}
                                  placeholder={'Confirm password'}
                                />
                              </div>
                              <div className='pswd-toggle'>
                                <div className='toggle-password' id='toggleCnfPassword'>
                                  <label htmlFor='toggleCnfPassword'>
                                    <div>
                                      {cnfpassword ? (
                                        <img
                                          src={showPassword}
                                          alt='showpassword'
                                          onClick={() => toggleCnfPassword(!cnfpassword)}
                                        />
                                      ) : (
                                        <img
                                          src={hidePassword}
                                          alt='hidepassword'
                                          onClick={() => toggleCnfPassword(!cnfpassword)}
                                        />
                                      )}
                                    </div>
                                  </label>
                                </div>
                              </div>
                              {(!isPasswordValid.isValid ||
                                account.password != account.cnfpassword) && (
                                <ValidationErrorMessage message={isCnfPasswordValid.error} />
                              )}
                            </div>
                          </Fragment>
                        )}
                      </p>
                    </div>

                    <div className='admin-role'>
                      <p>
                        <label>Admin Role</label>
                        <select
                          name='adminRole'
                          id='adminRole'
                          onChange={changeHandler}
                          value={account.adminRole}>
                          {constants.adminRoles.map((data, index) => (
                            <option key={index} value={data.value}>
                              {data.label}
                            </option>
                          ))}
                        </select>
                        {!isAdminRoleValid.isValid && (
                          <ValidationErrorMessage message={isAdminRoleValid.error} />
                        )}
                      </p>
                    </div>
                    {account.adminRole === 'Client_Admin' && (
                      <div className='client-code'>
                        <p>
                          <label>Client Code</label>
                          <AutoComplete
                            textBoxData={clientsTextBoxData}
                            suggestData={suggestData}
                            searchValue={suggestValue}
                            onChangeHandler={searchClientCodeChange}
                            searchType='clientData'
                            onSelectedItem={onSelectedItem}
                          />
                          {!isClientCodeValid.isValid && (
                            <ValidationErrorMessage message={isClientCodeValid.error} />
                          )}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className='user-verification'>
                    <div className='checkbox'>
                      <input id='verifycheckBox' type='checkbox' onClick={changeHandler}></input>
                      <label htmlFor='verifycheckBox'></label>
                    </div>
                    <div className='text'>
                      {isChecked.error == null ? (
                        <span className='verified'>User Verification</span>
                      ) : (
                        <span className={isChecked.isValid ? 'verified' : 'not-verified'}>
                          User Verification
                        </span>
                      )}
                      <br />{' '}
                      {account.adminRole === 'HG_Audit_Admin' ? (
                        <span>
                          I confirm that the identity of this user has been verified and that they
                          are authorized to manage profiles on behalf of providers.
                        </span>
                      ) : (
                        <span>
                          I have confirmed that a signed DLA is on file and they are authorized to
                          manage profiles on behalf of providers.
                        </span>
                      )}
                      <div className='error-wrapper'>
                        {!isChecked.isValid && <ValidationErrorMessage message={isChecked.error} />}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='footer-seperator'></div>
                <div className='roster-modal-footer'>
                  <button onClick={closeModalAcc} className='cancel-btn'>
                    Cancel
                  </button>
                  <button onClick={onUpdateHandler} className='add-btn'>
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </ReactModal>
      {displaySpinner && <Spinner cta={true} />}
    </Fragment>
  );
};
AccountSettingModal.propTypes = {
  showModalAcc: PropTypes.bool,
  closeModalAcc: PropTypes.func,
  profileInfo: PropTypes.object,
  toggleModalAcc: PropTypes.func,
  showSpinnerModel: PropTypes.func
};
export default AccountSettingModal;
