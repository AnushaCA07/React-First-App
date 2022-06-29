import React, { useState, useEffect, Fragment } from 'react';
import './_auditSearch.less';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions';
import { RadioGroup } from '../FormComponents/RadioGroup';
import Select from 'react-select';
import Spinner from '../Spinner/Spinner';
import PropTypes from 'prop-types';

const AuditSearch = (props) => {
  const { type, value, currentUserId, searchBy, radioOptions, searchTab } =
    props;
  const [radioSelect, setRadioSelect] = useState('providers');
  const [inputValue, setinputValue] = useState('');
  const [inputType, setinputType] = useState('');
  const [status, setStatus] = useState('READY');
  const [showSpinner, setShowSpinner] = useState(false);
  const dispatch = useDispatch();
  const [searchFrom, setSearchFrom] = useState('queue');
  const [option, setOption] = useState({
    value: 'all',
    label: 'All update types',
  });

  const options = [
    {
      value: 'all',
      label: 'All update types',
      allowedLength: 200,
    },
    {
      value: 'AboutMe',
      label: 'Care Philosophy',
      allowedLength: 200,
    },
    {
      value: 'LegalName',
      label: 'Legal Name',
      allowedLength: 10,
    },
    {
      value: 'License',
      label: 'State License',
      allowedLength: 200,
    },

    {
      value: 'Office',
      label: 'Office',
      allowedLength: 200,
    },
    {
      value: 'Practice Description',
      label: 'Practice Description',
      allowedLength: 200,
    },
    {
      value: 'Practice Website',
      label: 'Practice Website',
      allowedLength: 200,
    },
    {
      value: 'Photo',
      label: 'Photo',
      allowedLength: 200,
    },
    {
      value: 'education',
      label: 'Education',
      allowedLength: 200,
    },
    {
      value: 'Certification',
      label: 'Board Certification',
      allowedLength: 200,
    },
    {
      value: 'Video',
      label: 'Video',
      allowedLength: 200,
    },
  ];

  const [dropDownOptions, setDropDownOptions] = useState(options);

  const [filterOption, setFilterOption] = useState({
    value: 'pwid',
    label: 'PWID',
    textPlaceHolder: 'e.g. 33L3G',
    allowedLength: 10,
  });
  const filterOptions = [
    {
      value: 'pwid',
      label: 'PWID',
      textPlaceHolder: 'e.g. 33L3G',
      allowedLength: 10,
    },
    {
      value: 'npi',
      label: 'NPI',
      textPlaceHolder: 'e.g. 1659668416',
      allowedLength: 10,
    },
  ];
  const [filterDropDownOptions, setFilterDropDownOptions] =
    useState(filterOptions);

  const [textMaxLength, setTextMaxLength] = useState(10);

  useEffect(() => {
    setinputValue(value);
    setinputType(type);
    setRadioOption();
    setStatus('READY');
    setTextMaxLength(100);
    setSearchFrom(searchTab);
  }, [type, value, searchTab]);

  const setRadioOption = () => {
    setDropDownOptions(options);
    setFilterDropDownOptions(filterOptions);
  };

  const setSelectedOption = (e) => {
    setRadioSelect(e.target.value);
    setinputValue('');
    setinputType(e.target.value);
  };

  const changeHandler = (e) => {
    setinputValue(e.target.value);
  };

  const onKeyPressed = (e) => {
    let code = e.keyCode || e.which;
    if (code === 13) {
      searchData();
    }
  };

  const searchData = () => {
    setShowSpinner(true);
    if (searchFrom == 'queue') {
      dispatch(
        actions.getAuditRecords(
          inputType,
          inputValue,
          setShowSpinner,
          status,
          1,
          '',
          'asc',
          'all',
          currentUserId
        )
      );
    } else {
      dispatch(
        actions.getAuditRecordsHistory(
          filterOption.value,
          inputValue,
          setShowSpinner,
          'COMPLETED',
          1,
          '',
          'asc',
          'all',
          currentUserId
        )
      );
    }
    // }
  };

  const handleChange = (data) => {
    if (searchFrom == 'queue') {
      setOption(data);
      setShowSpinner(true);
      dispatch(
        actions.getAuditRecords(
          inputType,
          inputValue,
          setShowSpinner,
          status,
          1,
          '',
          'asc',
          data.value,
          currentUserId
        )
      );
    }
    if (searchFrom == 'history') {
      setFilterOption(data);
    }
  };

  const confirmReset = () => {
    setinputValue('');
    setinputType('providers');
    setRadioSelect('providers');
    let defaultValue = options.find((option) => option.value == 'all');
    setDropDownOptions(options);
    setOption(defaultValue);
    dataRefresh('providers', '');
  };

  const dataRefresh = (search_type, search_value) => {
    setShowSpinner(true);
    if (searchFrom == 'queue') {
      dispatch(
        actions.getAuditRecords(
          search_type,
          search_value,
          setShowSpinner,
          status,
          1,
          '',
          'asc',
          'all',
          currentUserId
        )
      );
    } else {
      dispatch(
        actions.getAuditRecordsHistory(
          filterOption.value,
          inputValue,
          setShowSpinner,
          'COMPLETED',
          1,
          '',
          'asc',
          'all',
          currentUserId
        )
      );
    }
  };

  return (
    <Fragment>
      <div className='top-search-container'>
        <div className='search-container'>
          <div className='inner-container'>
            <span className='search-label'>Search for :</span>
            <div className='radiobtn-container'>
              <RadioGroup
                radioGroup={radioOptions}
                selectedOption={radioSelect}
                onChangeHandler={setSelectedOption}
              />
            </div>
          </div>

          <div className='margin-top-15'>
            <div className='search-wrapper'>
              {searchFrom == 'history' && (
                <div className='drop-down left'>
                  <Select
                    id='filterBy'
                    className='select-box'
                    value={filterOption}
                    isSearchable={false}
                    options={filterDropDownOptions}
                    onChange={(value) => handleChange(value)}
                  />
                </div>
              )}
              <div className={'search-provider ' + searchFrom}>
                <div className='height-fix'>
                  <input
                    className='input'
                    id='searchProvider'
                    type='text'
                    value={inputValue}
                    onChange={changeHandler}
                    onKeyPress={onKeyPressed}
                    maxLength='50'
                  />
                  <label htmlFor='searchProvider' className='floating-label'>
                    Search for
                    {searchFrom == 'history'
                      ? ' ' +
                        filterOption.label +
                        ' ' +
                        filterOption.textPlaceHolder
                      : ' ' + radioSelect}
                  </label>
                </div>
                <div className={'search-section ' + searchFrom}>
                  <span className='search-icon'>
                    <i className='icon' onClick={searchData}></i>
                  </span>
                </div>
              </div>
              {searchFrom == 'queue' && (
                <Fragment>
                  <div className='drop-down'>
                    <Select
                      id='filterBy'
                      className='select-box'
                      value={option}
                      isSearchable={false}
                      options={dropDownOptions}
                      onChange={(value) => handleChange(value)}
                    />
                    <label
                      htmlFor='filterBy'
                      className='floating-label-dropdown'
                    >
                      Filter By
                    </label>
                  </div>
                  <div className='reset-section'>
                    <button
                      className='btn reset-btn'
                      onClick={() => confirmReset()}
                    >
                      Reset
                    </button>
                  </div>
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </div>

      {showSpinner && <Spinner cta={true} />}
    </Fragment>
  );
};

AuditSearch.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  currentUserId: PropTypes.string,
  searchBy: PropTypes.string,
  radioOptions: PropTypes.array,
  searchTab: PropTypes.string,
};

export default AuditSearch;
