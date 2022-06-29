import React, { Fragment, useState, useEffect, useRef } from 'react';
import './_addProvider.less';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import cross from '../../../../public/images/cross.png';
import { RadioGroup } from '../../FormComponents/RadioGroup';
import Modal from 'react-modal';
import * as constants from '../../../utils/constant-data';
import '@hg/joy/src/globalstyles';
import * as actions from '../../../store/actions';
import { useDispatch, useSelector, useStore } from 'react-redux';
import Spinner from '../../Spinner/Spinner';
import ProviderCard from './ProviderCard';
import Alert from '../../Alert/Alert';

const AddProviderModal = (props) => {
  const dispatch = useDispatch();
  const searchField = useRef(null);
  const { profileInfo, showModal, closeModal, toggleModal } = props;
  const [searchRequest, setSearchRequest] = useState({
    userId: profileInfo.userId,
    clientCode: profileInfo.clientCode,
    searchType: 'npi',
    searchValue: '',
    page: 1,
    sortBy: 'name',
    pageSize: 1
  });
  const { providers, facilities, employmentTypes, totalRecords } = useSelector(
    (state) => state.searchClientPortalProvidersReducer
  );

  const { result } = useSelector((state) => state.addClientPortalProvidersToRosterReducer);
  const [resultObject, setResultObject] = useState({});
  const [warningFlag, setWarningFlag] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const radioOptions = constants.radioOptionsforAdding;
  const [providersList, setprovidersList] = useState([]);
  const [employmentTypeList, setEmploymentTypeList] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [popupMessage, setPopupMessage] = useState(
    'Please verify that your designation types are correct before proceeding.'
  );
  const [cnfMessageModal, setCnfMessageModal] = useState(false);
  const [disable, setDisable] = useState(true);
  const [isSearchError, setIsSearchError] = useState(false);
  const [errorMsgSearch, setErrorMsgSearch] = useState('');
  const [isErrorAfterSearch, setIsErrorAfterSearch] = useState(false);
  const [providerCardError, setProviderCardError] = useState('');

  // Handlers

  const closeModalHandler = (item) => {
    dispatch(actions.clearSearchClientPortalProviders());
    closeModal(item);
  };

  const searchClientPortalProviders = () => {
    if (searchRequest.searchType != '' && searchRequest.searchValue != '') {
      setShowSpinner(true);
      if (searchFieldValidation()) {
        dispatch(actions.searchClientPortalProviders(searchRequest, setShowSpinner));
      } else {
        setShowSpinner(false);
      }
    }
  };

  const searchedProvidersValidation = () => {
    let searchedList =
      searchField.current != null
        ? searchField.current.value
            .trim()
            .toUpperCase()
            .split(/\s*[\s,]\s*/)
        : [];
    let missingProviders = [];

    if (searchedList.length > providersList.length) {
      let providerSearchResults =
        searchRequest.searchType == 'pwid'
          ? providersList.map((provider) => provider.pwid)
          : providersList.map((provider) => provider.npi);
      missingProviders = searchedList.filter((val) => !providerSearchResults.includes(val));
      setIsErrorAfterSearch(true);
      setErrorMsgSearch(
        `We found no matches for ${missingProviders.length} code(s): ${missingProviders.join(' ')}`
      );
    } else {
      setIsErrorAfterSearch(false);
      setErrorMsgSearch('');
    }
  };

  const searchFieldValidation = () => {
    let requestArray =
      searchField.current != null
        ? searchField.current.value
            .trim()
            .toUpperCase()
            .split(/\s*[\s,]\s*/)
        : [];
    let pwidRegex = /^[a-zA-Z0-9s]+([,\r\n][sa-zA-Z0-9]+)*$/;
    let npiRegex = /^[0-9]{10}$/;

    let isSearchFieldValid = true;

    if (searchRequest.searchType == 'pwid') {
      isSearchFieldValid = requestArray.every((val) => pwidRegex.test(val));
      isSearchFieldValid
        ? (setIsSearchError(false), setErrorMsgSearch(''))
        : (setIsSearchError(true), setErrorMsgSearch('PWID must contain only alphanumeric'));
    } else {
      isSearchFieldValid = requestArray.every((val) => npiRegex.test(val));
      isSearchFieldValid
        ? (setIsSearchError(false), setErrorMsgSearch(''))
        : (setIsSearchError(true), setErrorMsgSearch('NPI must contain 10 digit numbers'));
    }
    return isSearchFieldValid;
  };

  const searchTypeChangeHandler = (e) => {
    e.persist();
    setSearchRequest((prevState) => ({
      ...prevState,
      searchType: e.target.value,
      searchValue: ''
    }));
  };

  const searchValueChangeHandler = (e) => {
    let formattedValues = searchField.current.value.trim().split(/\s*[\s,]\s*/);

    setSearchRequest((prevState) => ({
      ...prevState,
      searchValue: formattedValues.join(','),
      pageSize: formattedValues.length
    }));
  };

  const addProviderClickHandler = () => {
    let errorElements = document.getElementsByClassName('provider-search-card error');
    errorElements.length > 0
      ? errorElements[0].scrollIntoView({ behavior: 'smooth', block: 'end' })
      : dispatch(
          actions.addClientPortalProvidersToRoster(
            {
              userId: profileInfo.userId,
              clientCode: profileInfo.clientCode,
              designationInfo: providersList.map((prov) => ({
                pwid: prov.pwid,
                facilityCode: prov.facility.FacilityCode,
                facilityName: prov.facility.FacilityName,
                employmentType: prov.employmentType
              }))
            },
            setShowSpinner
          )
        );
  };

  // ProviderCard Handler(s)

  const updateProvider = (provider) => {
    let providerIndex = providersList.findIndex((prov) => {
      return prov.pwid == provider.pwid;
    });
    let newProviderList = [...providersList];
    newProviderList[providerIndex] = provider;
    setprovidersList(newProviderList);
  };

  const removeProviderHandler = (pwid) => {
    let newProviderList = [...providersList];
    let newProvList = newProviderList.filter((prov) => {
      return prov.pwid != pwid;
    });
    setprovidersList([...newProvList]);
  };

  // Confirmation Message to add

  const addProviderHandler = () => {
    setCnfMessageModal(true);
  };

  const closeAlertModel = () => {
    setCnfMessageModal(false);
  };

  const confirmToAdd = () => {
    setShowSpinner(true);
    addProviderClickHandler();
    closeAlertModel();
    setShowSpinner(false);
  };

  const searchOnChangeHandler = (e) => {
    let isFieldValid = searchFieldValidation();
    setDisable(!isFieldValid);
  };

  // UseEffects
  useEffect(() => {
    if (result != undefined && result != null) {
      if (Object.keys(result).length > 0) {
        let obj = {
          isError: result.isError,
          errorResponse: result.errorResponse
        };
        setResultObject(obj);
        closeModalHandler(true);
      }
    } else {
      setprovidersList([]);
      setWarningFlag(true);
      setIsSearchError(true);
      setErrorMsgSearch('We found no matches for ');
      setTimeout(() => {
        setWarningFlag(false);
      }, 3000);
    }
  }, [result]);

  useEffect(() => {
    if (totalRecords > 0) {
      if (providers.length == 0) {
        setWarningFlag(true);
        setTimeout(() => {
          setWarningFlag(false);
        }, 5000);
      } else setWarningFlag(false);
    }
  }, [providers, totalRecords]);

  useEffect(() => {
    let tempProviderList = [];
    providers.forEach((provider) => {
      tempProviderList.push({
        pwid: provider.ProviderCode,
        displayName: provider.DisplayName,
        npi: provider.NPI,
        location: provider.Location,
        facility: { FacilityCode: '', FacilityName: '' },
        employmentType: 'Standard',
        validation: { isEmploymentValid: true, isFacilityValid: true }
      });
    });
    setprovidersList(tempProviderList);
  }, [providers]);

  useEffect(() => {
    let isEmployedAffiliated =
      employmentTypes.findIndex((type) => {
        return type.toLowerCase().includes('employed') || type.toLowerCase().includes('affiliated');
      }) > -1;
    if (isEmployedAffiliated && facilities.length == 0) setEmploymentTypeList(['Standard']);
    else setEmploymentTypeList([...employmentTypes]);
  }, [employmentTypes, facilities]);

  useEffect(() => {
    searchOnChangeHandler();
    searchClientPortalProviders(searchRequest);
  }, [searchRequest]);

  useEffect(() => {
    // Validations
    // START
    searchedProvidersValidation();
    providersList.every(
      (prov) => prov.validation.isEmploymentValid && prov.validation.isFacilityValid
    )
      ? setProviderCardError('')
      : setProviderCardError('Please provide Valid Input for providers.');
    // END

    let count = 0;
    if (providersList.length > 0) {
      setResultObject({
        isError: false,
        errorResponse: []
      });
      providersList.filter((i) => {
        i.validation.isEmploymentValid == false || i.validation.isFacilityValid == false
          ? (count = count + 1)
          : count;
      });
      if (count > 0) setButtonDisabled(true);
      else setButtonDisabled(false);
    } else if (providersList.length < 1) {
      setButtonDisabled(true);
    }
  }, [providersList]);

  useEffect(() => {
    setIsSearchError(isSearchError);
    setErrorMsgSearch(errorMsgSearch);
  }, [isSearchError, searchField]);

  useEffect(() => {
    setErrorMsgSearch(errorMsgSearch);
  }, [isErrorAfterSearch]);

  useEffect(() => {
    Modal.setAppElement('body');
  });

  return (
    <Fragment>
      <ReactModal
        overlayClassName='roster-modal-overlay'
        className='modal-dialog-add'
        ariaHideApp={true}
        isOpen={showModal}
        contentLabel='Create Roster User'
        onRequestClose={() => closeModalHandler(false)}
        shouldCloseOnEsc={false}
        shouldCloseOnOverlayClick={false}>
        <div className='model-window'>
          <div className='model-container'>
            <ReactModal
              overlayClassName='roster-modal-overlay'
              className='modal-dialog-cnf-message'
              ariaHideApp={true}
              isOpen={cnfMessageModal}
              contentLabel='Alert Message!'
              onRequestClose={closeAlertModel}>
              <Alert
                action={closeAlertModel}
                heading='Alert Message!'
                message={popupMessage}
                confirmUpdate={confirmToAdd}></Alert>
            </ReactModal>

            <Fragment>
              <div className='close'>
                <img
                  className='close-icon'
                  src={cross}
                  alt='close'
                  onClick={() => closeModalHandler(false)}
                />
              </div>
              <div className='add-provider-modal-row'>
                <div className='search-container'>
                  <h3 className='search-container-title'>Add Providers to Roster</h3>
                  <div className='filter-container'>
                    <div className='radiobtn-container'>
                      <RadioGroup
                        radioGroup={radioOptions}
                        selectedOption={searchRequest.searchType}
                        onChangeHandler={searchTypeChangeHandler}
                      />
                    </div>
                  </div>
                  <div className='search-grp'>
                    <div className='text-box'>
                      <textarea
                        rows='10'
                        ref={searchField}
                        placeholder={
                          searchRequest.searchType == 'npi'
                            ? 'e.g. 901298017 (separate multiple codes using commas or line breaks)'
                            : 'e.g. 33L3G (separate multiple codes using commas or line breaks)'
                        }
                        onChange={(e) => searchOnChangeHandler(e)}
                        className='search-textbox'></textarea>
                    </div>
                    <div className='filter-btn-section'>
                      <button
                        onClick={searchValueChangeHandler}
                        disabled={disable}
                        className={`btn ${!disable && 'enable-btn'}`}>
                        Search
                      </button>
                    </div>
                  </div>
                  {isSearchError && <div className='error-msg'>{errorMsgSearch}</div>}
                  {!isSearchError && isErrorAfterSearch && (
                    <div className='error-msg'>{errorMsgSearch}</div>
                  )}
                </div>
                {providersList.length > 0 && !isSearchError && (
                  <Fragment>
                    <div className='provider-section'>
                      <div className='provider-card'>
                        <div className='selected-providers'>
                          Selected Providers ({providersList.length})
                          {isErrorAfterSearch && (
                            <div className='error-msg'>{providerCardError}</div>
                          )}
                        </div>

                        <div className='scrollbar' id='scrollbar-styles'>
                          <div className='provider-container'>
                            {providersList.map((provider, index) => (
                              <ProviderCard
                                provider={provider}
                                facilities={facilities}
                                employmentTypes={employmentTypeList}
                                removeProviderHandler={removeProviderHandler}
                                updateProviderHandler={updateProvider}
                                key={index}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='btn-grp'>
                      <button
                        className='btn-submit-cancel'
                        onClick={() => closeModalHandler(false)}>
                        Cancel
                      </button>
                      <button
                        disabled={buttonDisabled}
                        className='btn-submit-add'
                        onClick={addProviderHandler}>
                        Add
                      </button>
                    </div>
                  </Fragment>
                )}
              </div>
            </Fragment>
          </div>
        </div>
      </ReactModal>
      {showSpinner && <Spinner cta={true} />}
    </Fragment>
  );
};

AddProviderModal.propTypes = {
  showModal: PropTypes.bool,
  closeModal: PropTypes.func,
  toggleModal: PropTypes.func
};

export default AddProviderModal;
