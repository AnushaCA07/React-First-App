import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';
import './_search.less';
import { TextBox } from '../FormComponents/TextBox';
import TextValidation from '../../utils/validation/isTextValid';
import isEmpty from '../../utils/validation/isEmpty';
import ValidationErrorMessage from '../FormComponents/ValidationErrorMessage';
import { RadioGroup } from '../FormComponents/RadioGroup';
import Spinner from '../Spinner/Spinner';
import Select from 'react-select';
import PropTypes from 'prop-types';
import CreateRoster from '../CreateRoster/CreateRoster';
import ReactModal from 'react-modal';
import Modal from 'react-modal';

const Search = (props) => {
  const { type, value, currentUserId, searchBy, clientCodes } = props;
  const [inputType, setinputType] = useState('');
  const [inputValue, setinputValue] = useState('');
  const [currentUser, setCurrentUserid] = useState('');
  const [radioSelect, setRadioSelect] = useState(searchBy);
  const [isValidText, setValidation] = useState({ isValid: true, error: '' });
  const [showSpinner, setShowSpinner] = useState(false);
  const { createRosterResponse, isCreateClick } = useSelector((state) => state.createRoster);

  const dispatch = useDispatch();
  const [option, setOption] = useState({
    value: 'name',
    label: 'Name'
  });
  const options = [
    {
      value: 'name',
      label: 'Name',
      textPlaceHolder: 'e.g. Jane Doe',
      allowedLength: 200
    },
    {
      value: 'npi',
      label: 'NPI',
      textPlaceHolder: 'e.g. 1659668416',
      allowedLength: 10
    },
    {
      value: 'pwid',
      label: 'PWID',
      textPlaceHolder: 'e.g. 33L3G',
      allowedLength: 10
    }
  ];

  const [dropDownOptions, setDropDownOptions] = useState(options);

  const textBoxClasses = 'search_input_box input-field width-100';
  const [showModal, toggleModal] = useState(false);
  const [rosterCreated, setRosterCreated] = useState(false);

  const [placeHolder, setPlaceHolder] = useState('e.g. Jane Doe');
  const [textMaxLength, setTextMaxLength] = useState(200);

  useEffect(() => {
    setinputType(type);
    setinputValue(value);
    setCurrentUserid(currentUserId);
    setRadioSelect(searchBy);
    setRadioOption(searchBy, type);
    if (isCreateClick == true && createRosterResponse.Status == true) {
      closeRosterModal();
      setRosterCreated(true);
      const timer = setTimeout(() => {
        dispatch(actions.clearRoster());
      }, 3000);

      return () => clearTimeout(timer);
    }

    if (showModal) {
      setRadioSelect('rostermanagers');
      if (
        (value == '' && searchBy == 'rostermanagers') ||
        (value != '' && searchBy == 'providers')
      ) {
        updateRadioAndSelect();
      } else if (value != '' && searchBy == 'rostermanagers')
        setRadioOption('rostermanagers', type);
      else {
        updateRadioAndSelect();
      }
    }
    if (rosterCreated) {
      closeRosterModal();
      if (value == '' && type == 'name') {
        setinputType('email');
        setinputValue('');
      }
    }
  }, [type, value, currentUserId, isCreateClick, createRosterResponse]);
  useEffect(() => {
    Modal.setAppElement('body');
  });

  const setRadioOption = (searchFor, optionValue) => {
    if (searchFor == 'providers') {
      const currentValue = options.find((option) => option.value == optionValue);
      setOption(currentValue);
      setDropDownOptions(options);
    } else {
      const currentValue = rosterOptions.find((option) => option.value == optionValue);
      setOption(currentValue);
      setDropDownOptions(rosterOptions);
    }
  };

  const radioTypeOptions = [
    {
      Name: 'Providers',
      Value: 'providers',
      Show: true
    },
    {
      Name: 'Roster Managers/ Users',
      Value: 'rostermanagers',
      Show: true
    }
  ];

  const rosterOptions = [
    {
      value: 'email',
      label: 'Email',
      textPlaceHolder: 'e.g. janedoe@mail.com',
      allowedLength: 300
    },
    {
      value: 'name',
      label: 'Name',
      textPlaceHolder: 'e.g. Jane Doe',
      allowedLength: 200
    }
  ];

  const renderCreateRoster = () => {
    dispatch(actions.clearRoster());
    toggleModal(true);
  };

  const closeRosterModal = () => {
    setRadioSelect('rostermanagers');
    if ((value == '' && searchBy == 'rostermanagers') || (value != '' && searchBy == 'providers')) {
      updateRadioAndSelect();
      if (inputType != 'email') {
        setinputType('email');
      }
    } else if (value != '' && searchBy == 'rostermanagers') setRadioOption('rostermanagers', type);
    else {
      if (inputType != 'email') {
        setinputType('email');
      }
      updateRadioAndSelect();
    }
    toggleModal(false);
    setRosterCreated(false);
  };

  const updateRadioAndSelect = () => {
    setRadioOption('rostermanagers', 'email');
    setinputValue('');
  };

  const showSpinnerOnModalClose = (showSpinner) => {
    setShowSpinner(showSpinner);
  };
  const searchData = () => {
    if (isEmpty(inputValue)) {
      setValidation({
        isValid: false,
        error: 'This field cannot be empty or blank'
      });
    } else if (inputValue.length <= textMaxLength) {
      setValidation(TextValidation(inputValue, inputType));
    }
    if (!isEmpty(inputValue) && isValidText.isValid) {
      setShowSpinner(true);
      dispatch(
        actions.searchActions(
          inputType,
          inputValue,
          radioSelect,
          currentUser,
          setShowSpinner,
          1,
          'asc',
          'name',
          clientCodes
        )
      );
    }
  };

  const onKeyPressed = (e) => {
    let code = e.keyCode || e.which;
    if (code === 13) {
      searchData();
    }
  };

  const setSearchValue = (e) => {
    setinputValue(e.target.value);
    if (isEmpty(e.target.value)) {
      setValidation({
        isValid: false,
        error: 'This field cannot be empty or blank'
      });
    } else {
      setValidation({
        isValid: true,
        error: ''
      });
    }
  };

  const handleChange = (data) => {
    setOption(data);
    setinputType(data.value);
    setValidation({ isValid: true, error: '' });
    setinputValue('');
    setPlaceHolder(data.textPlaceHolder);
    setTextMaxLength(data.allowedLength);
  };

  const setSelectedOption = (e) => {
    setRadioSelect(e.target.value);
    props.updateRadioOptions(e.target.value);
    setinputValue('');
    let currentValue = options.find((option) => option.value == 'name');
    if (e.target.value == 'providers') {
      setDropDownOptions(options);
    } else {
      setDropDownOptions(rosterOptions);
      currentValue = rosterOptions.find((option) => option.value == 'email');
    }
    setOption(currentValue);
    setPlaceHolder(currentValue.textPlaceHolder);
    setTextMaxLength(currentValue.allowedLength);
    setinputType(currentValue.value);
  };

  return (
    <Fragment>
      <div className='top-search-container'>
        <ReactModal
          overlayClassName='roster-modal-overlay'
          className='modal-dialog'
          ariaHideApp={true}
          isOpen={showModal}
          contentLabel='Create Roster User'
          onRequestClose={closeRosterModal}
          shouldCloseOnEsc={false}
          shouldCloseOnOverlayClick={false}>
          <CreateRoster
            action={closeRosterModal}
            showSpinnerModel={showSpinnerOnModalClose}
            currentUserId={currentUserId}
            clientCodes={clientCodes}
          />
        </ReactModal>
        <div className='search-container'>
          {createRosterResponse.Status && (
            <div className='alert'>
              <span>
                <cite>
                  <strong>Success! </strong> {createRosterResponse.Message}
                </cite>
              </span>
            </div>
          )}

          <div className='inner-container'>
            <span className='search-label'>Search for :</span>

            <div className='radiobtn-container'>
              <RadioGroup
                radioGroup={radioTypeOptions}
                selectedOption={radioSelect}
                onChangeHandler={setSelectedOption}
              />
            </div>
          </div>

          <div className='margin-top-10'>
            <div className='search-wrapper'>
              <Select
                className='select-box'
                value={option}
                isSearchable={false}
                onChange={(value) => handleChange(value)}
                options={dropDownOptions}
              />

              <div className='search-inner-wrapper '>
                <TextBox
                  textValue={inputValue}
                  onChangeHandler={setSearchValue}
                  placeholder={placeHolder}
                  maxlength={textMaxLength}
                  onKeyPressed={onKeyPressed}
                  classes={textBoxClasses}
                />
                <span className='search-icon'>
                  <i className='icon' onClick={searchData}></i>
                </span>
              </div>
            </div>
            <div className='create-btn'>
              <button
                className={radioSelect == 'providers' ? 'disable-button' : ''}
                onClick={renderCreateRoster}>
                Create Roster Account
              </button>
            </div>
          </div>
          {!isValidText.isValid && <ValidationErrorMessage message={isValidText.error} />}
        </div>
      </div>
      {showSpinner && <Spinner cta={true} />}
    </Fragment>
  );
};

Search.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  updateRadioOptions: PropTypes.func,
  currentUserId: PropTypes.string,
  searchBy: PropTypes.string,
  clientCodes: PropTypes.array
};

export default Search;
