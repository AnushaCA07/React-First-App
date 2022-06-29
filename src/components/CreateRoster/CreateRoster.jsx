import React, { useState, Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './_createRoster.less';
import close from '../../../assets/images/close.svg';
import showPassword from '../../../assets/images/show_password.svg';
import hidePassword from '../../../assets/images/icon_hidepassword.svg';
import * as actions from '../../store/actions';
import ValidationErrorMessage from '../FormComponents/ValidationErrorMessage';
import TextValidation from '../../utils/validation/isTextValid';
import isEmpty from '../../utils/validation/isEmpty';
import PropTypes from 'prop-types';
import * as constants from '../../utils/constant-data';
import AutoComplete from '../FormComponents/AutoComplete/AutoComplete';

const CreateRoster = (props) => {
  const { currentUserId, clientCodes } = props;

  const { createRosterResponse } = useSelector((state) => state.createRoster);
  const isEmptyField = { isValid: false, error: 'This field is required' };
  const [password, togglePassword] = useState(false);
  const dispatch = useDispatch();

  //const { results } = useSelector((state) => state.getClientCodeReducer);

  const [suggestData, setSuggestData] = useState(Array);
  const [suggestValue, setSuggestValue] = useState('');
  const [selectedClientData, setSelectedClientData] = useState({
    clientCode: '',
    clientName: ''
  });

  useEffect(() => {
    setSuggestData(clientCodes);
  }, [clientCodes]);

  useEffect(() => {
    if (selectedClientData != null && selectedClientData != undefined) {
      if (selectedClientData.clientCode != '' && selectedClientData.clientName != '') {
        let cliName = selectedClientData.clientName.split(':');
        setRoster({
          ...roster,
          clientCode: selectedClientData.clientCode,
          clientName: cliName[0]
        });
      }
    }
  }, [selectedClientData]);

  const [isFirstnameValid, setFirstnameValidation] = useState({
    isValid: false,
    error: ''
  });
  const [isLastnameValid, setLastnameValidation] = useState({
    isValid: false,
    error: ''
  });
  const [isEmailValid, setEmailValidation] = useState({
    isValid: false,
    error: ''
  });
  const [isPasswordValid, setPasswordValidation] = useState({
    isValid: true,
    error: ''
  });
  const [isAdminRoleValid, setAdminRoleValidation] = useState({
    isValid: true,
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

  const [roster, setRoster] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: 'Healthgrades1',
    adminRole: '',
    clientCode: '',
    clientName: ''
  });

  const validateInput = () => {
    if (isEmpty(roster.firstName)) {
      setFirstnameValidation(isEmptyField);
    } else {
      setFirstnameValidation(TextValidation(roster.firstName, 'name'));
    }

    if (isEmpty(roster.lastName)) {
      setLastnameValidation(isEmptyField);
    } else {
      setLastnameValidation(TextValidation(roster.lastName, 'name'));
    }

    if (isEmpty(roster.email)) {
      setEmailValidation(isEmptyField);
    } else {
      setEmailValidation(TextValidation(roster.email, 'emailaddress'));
    }

    if (isEmpty(roster.password)) {
      setPasswordValidation(isEmptyField);
    } else {
      setPasswordValidation(TextValidation(roster.password, 'password'));
    }
    if (
      isEmpty(roster.adminRole) ||
      roster.adminRole == 'Select Admin Role' ||
      roster.adminRole == '-'
    ) {
      setAdminRoleValidation(isEmptyField);
    } else {
      setAdminRoleValidation('Please Select Any of Admin Roles');
    }

    if (roster.adminRole === 'Client_Admin') {
      if (isEmpty(roster.clientCode)) {
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
      isEmpty(roster.firstName) ||
      isEmpty(roster.lastName) ||
      isEmpty(roster.email) ||
      isEmpty(roster.password) ||
      isEmpty(roster.adminRole) ||
      !isChecked.isValid ||
      (roster.adminRole === 'Client_Admin' && isEmpty(roster.clientCode))
    );
  };

  const changeHandler = (e) => {
    switch (e.target.id) {
      case 'firstname':
        setRoster({ ...roster, firstName: e.target.value });
        if (isEmpty(e.target.value)) {
          setFirstnameValidation(isEmptyField);
        } else {
          setFirstnameValidation(TextValidation(roster.firstName, 'name'));
        }
        break;

      case 'lastname':
        setRoster({ ...roster, lastName: e.target.value });
        if (isEmpty(e.target.value)) {
          setLastnameValidation(isEmptyField);
        } else {
          setLastnameValidation(TextValidation(roster.firstName, 'name'));
        }
        break;

      case 'email':
        setRoster({ ...roster, email: e.target.value });
        setEmailValidation(TextValidation(e.target.value, 'emailaddress'));
        break;

      case 'password':
        setRoster({ ...roster, password: e.target.value });
        setPasswordValidation(TextValidation(e.target.value, 'password'));
        break;

      case 'adminRole':
        setRoster({ ...roster, adminRole: e.target.value });
        setAdminRoleValidation({
          isValid: e.target.value != '-' || e.target.value != undefined ? true : false,
          error: 'Please Select Any of Admin Roles'
        });
        if (roster.adminRole !== 'Client_Admin') {
          setSuggestValue('');
          let clientDataElement = document.getElementById('clientData');
          if (clientDataElement) {
            document.getElementById('clientData').value = '';
          }
        }
        break;

      // case 'clientCode':
      //   setRoster({ ...roster, clientCode: e.target.value });
      //   setClientCodeValidation({
      //     isValid:
      //       e.target.value != '-' || e.target.value != undefined ? true : false,
      //     error: 'Please Select Any of Client Codes',
      //   });
      //   break;

      case 'verifycheckBox':
        setCheckboxValidation({
          isValid: !isChecked.isValid,
          error: 'Please verify the identity of this user'
        });
        break;
    }
  };

  const onCreateHandler = (e) => {
    e.preventDefault();
    validateInput();
    if (!isRosterInValid()) {
      if (roster.adminRole !== 'Client_Admin') {
        setRoster({ ...roster, clientCode: '' });
        setRoster({ ...roster, clientName: '' });
      }
      props.showSpinnerModel(true);
      dispatch(actions.createRoster(roster, currentUserId, props.showSpinnerModel));
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

    let filteredClients = clientCodes.filter(function (v) {
      //filtered = myArray.filter(function (str) { return str.indexOf(PATTERN) === -1; });
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
    // setSelectedProviderCode(data[0].values.id);
    setSelectedClientData({
      ...selectedClientData,
      clientCode: data[0].values,
      clientName: data[0].text
    });

    setSuggestValue(data[0].text);
  };

  useEffect(() => {
    setRoster({ ...roster, clientCode: '' });
    setClientCodeValidation({
      isValid: true,
      error: ''
    });
  }, [roster.adminRole]);

  return (
    <Fragment>
      <div className='roster-modal'>
        <form id='rosterForm' autoComplete='off'>
          <div className='close'>
            <img className='close-icon' onClick={props.action} src={close} alt='close' />
          </div>

          <div className='roster-modal-container'>
            <div className='error-response'>
              {!createRosterResponse.Status && (
                <ValidationErrorMessage
                  className='error-response'
                  message={createRosterResponse.Message}></ValidationErrorMessage>
              )}
            </div>

            <div className='roster-modal-header'>
              <h1> Create Roster Account</h1>
            </div>

            <div className='roster-modal-content'>
              <div className='input-inline'>
                <div className='firstname'>
                  <div className='height-fix'>
                    <input
                      className='input'
                      id='firstname'
                      type='text'
                      value={roster.firstName}
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
                      value={roster.lastName}
                      onChange={changeHandler}
                    />
                    <label htmlFor='lastname' className='floating-label'>
                      Last Name*
                    </label>
                  </div>
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
                      value={roster.email}
                      onChange={changeHandler}
                    />

                    <label htmlFor='email' className='floating-label'>
                      Email*
                    </label>
                  </div>

                  {!isEmailValid.isValid && <ValidationErrorMessage message={isEmailValid.error} />}
                </div>

                <div className='password'>
                  <div className='height-fix'>
                    <input
                      id='password'
                      type={password ? 'password' : 'text'}
                      className='block-password'
                      value={roster.password}
                      onChange={changeHandler}
                    />
                    <label htmlFor='password' className='floating-label'>
                      Password*
                    </label>
                  </div>

                  {!isPasswordValid.isValid && (
                    <ValidationErrorMessage message={isPasswordValid.error} />
                  )}
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

                <div className='admin-role'>
                  <p>
                    <label>Admin Role</label>
                    <select
                      name='adminRole'
                      id='adminRole'
                      onChange={changeHandler}
                      value={roster.adminRole}>
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
                {roster.adminRole === 'Client_Admin' && (
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
                  {isChecked.error == null && !isChecked.isValid && (
                    <span className='verified'>User Verification</span>
                  )}
                  {isChecked.error && (
                    <span className={isChecked.isValid ? 'verified' : 'not-verified'}>
                      User Verification
                    </span>
                  )}
                  <br />
                  {roster.adminRole === 'HG_Audit_Admin' ? (
                    <span>
                      I confirm that the identity of this user has been verified and that they are
                      authorized to manage profiles on behalf of providers.
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
            <div className='roster-modal-footer'>
              <button onClick={props.action} className='cancel-btn'>
                Cancel
              </button>
              <button onClick={onCreateHandler}>Create</button>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};
CreateRoster.propTypes = {
  action: PropTypes.func,
  showSpinnerModel: PropTypes.func,
  currentUserId: PropTypes.string,
  clientCodes: PropTypes.array
};
export default CreateRoster;
