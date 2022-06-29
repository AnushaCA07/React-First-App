import React, { Fragment, useEffect, useState, useRef } from 'react';
import './_designation.less';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import cross from '../../../../assets/images/exit-icon.svg';
import Header from '../../../Header/Header';
import PaginationUI from '../../../Pagination/Pagination';
import Spinner from '../../../Spinner/Spinner';
import Desigante from './Designate';
import Dedesigante from './De-Designate';
import SearchIcon from '../../../SearchIcon/SearchIcon';
import * as headerColumn from '../../../../utils/constant-data';
import * as actions from '../../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';

const Designation = (props) => {
  const {
    providerDisplayName,
    selectedProviders,
    providersFound,
    accountInfo,
    providersInfo,
    reloadList
  } = props;

  const dispatch = useDispatch();
  const { providerList, clientFacilities, employmentTypes } = useSelector(
    (state) => state.getClientPortalDesignationReducer
  );
  const [providersArray, setProvidersArray] = useState(Object.values(selectedProviders));
  const [providersArrayInList, setProvidersArrayInList] = useState([]);
  const [providers, setProviders] = useState(providerList);
  const [clientFacility, setClientFacility] = useState(clientFacilities);
  const [employmentType, setEmploymentType] = useState(employmentTypes);

  const [designation, setDesigantion] = useState([]);
  const [radioSelect, setRadioSelect] = useState('');
  const [inputValue, setinputValue] = useState('');
  const [inputType, setinputType] = useState('');

  const [showModalDesignate, toggleModalDesignate] = useState(false);
  const [showModalDedesignate, toggleModalDedesignate] = useState(false);
  const headerColumns = headerColumn.headerColumnsCPDesignation;
  const [activePage, setActivePage] = useState(1);
  const [showSpinner, setShowSpinner] = useState(false);
  const [name, setname] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedFacilityName, setSelectedFacilityName] = useState(null);
  const [currentPwid, setCurrentPwid] = useState(null);
  const warningMsg = `Something went wrong, you can contact Healthgrades customer service for assistance.`;
  const [warningFlag, setWarningFlag] = useState(null);
  const { isError, errorResponse } = useSelector((state) => state.addRemoveDesignationReducer);

  const [recordsPerPage, setRecordsPerPage] = useState(accountInfo.recordsPerPage);
  const [page, setPage] = useState(accountInfo.page);
  const pageStart = recordsPerPage * (activePage - 1) + 1;
  const pageEnd =
    recordsPerPage * activePage > Number(providersFound)
      ? Number(providersFound)
      : recordsPerPage * activePage;

  const searchInputRef = useRef();
  const [sortOrderAsc, setSortOrderAsc] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [showPagination, setShowPagination] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  //Functions
  const handleSearchProvider = () => {
    let searchedProvider = [];
    if (searchInputRef.current.value != null && searchInputRef.current.value != '') {
      searchedProvider = providersArray.filter(function (i) {
        return i.ProviderName.toLowerCase().includes(searchInputRef.current.value.toLowerCase());
      });
      setProvidersArrayInList(searchedProvider);
      setShowPagination(false);
    } else {
      setProvidersArrayInList(providersArray);
      setShowPagination(true);
    }
  };

  const onShowModal = (e, pwid, n) => {
    setCurrentPwid(pwid);
    if (e.target.className == 'btn designate') {
      toggleModalDesignate(true);
      setname(n);
    } else {
      toggleModalDedesignate(true);
      setname(n);
    }
  };

  const closeModal = () => {
    toggleModalDesignate(false);
    toggleModalDedesignate(false);
    setSelectedItem(null);
    setRadioSelect(null);
  };

  const setSelectedOption = (e) => {
    setRadioSelect(e.target.value);
    setinputValue('');
    setinputType(e.target.value);
  };

  const desiganteHandler = (e, type) => {
    e.persist();
    toggleModalDesignate(false);
    toggleModalDedesignate(false);
    if (type == 'Designate') {
      let request = {
        userId: accountInfo.userId,
        clientCode: accountInfo.clientCode,
        designationInfo: [
          {
            pwid: currentPwid,
            facilityCode: selectedItem,
            facilityName: selectedFacilityName,
            employmentType: radioSelect
          }
        ]
      };
      setShowSpinner(true);

      let updatedList = Object.values(providersArray).map((item) => {
        if (item.ProviderId == currentPwid) {
          return { ...item, SponsorType: radioSelect.toUpperCase() };
        }
        return item;
      });
      setProvidersArray(updatedList);
      dispatch(actions.addRemoveDesignation(request, setShowSpinner, type));
      // sortProviders();
      setProvidersArrayInList(updatedList);
    } else {
      let request = {
        userId: accountInfo.userId,
        clientCode: accountInfo.clientCode,
        designationInfo: [
          {
            pwid: currentPwid,
            facilityCode: '',
            facilityName: '',
            employmentType: ''
          }
        ]
      };
      setShowSpinner(true);
      let updatedList = Object.values(providersArray).map((item) => {
        if (item.ProviderId == currentPwid) {
          return { ...item, SponsorType: 'STANDARD' };
        }
        return item;
      });
      setProvidersArray(updatedList);
      dispatch(actions.addRemoveDesignation(request, setShowSpinner, type));
      // sortProviders();
      setProvidersArrayInList(updatedList);
    }
    isError == false ? reloadList(true) : reloadList(false);
  };

  const onSort = () => {
    setSortOrderAsc(!sortOrderAsc);
    sortProviders();
  };

  const sortProviders = () => {
    if (sortOrderAsc) {
      setProvidersArrayInList(
        providersArray
          .sort((a, b) =>
            a.ProviderName.toLowerCase() < b.ProviderName.toLowerCase()
              ? -1
              : b.ProviderName.toLowerCase() > a.ProviderName.toLowerCase()
              ? 1
              : 0
          )
          .slice(0, recordsPerPage)
      );
    } else {
      setProvidersArrayInList(
        providersArray
          .sort((a, b) =>
            a.ProviderName.toLowerCase() > b.ProviderName.toLowerCase()
              ? -1
              : b.ProviderName.toLowerCase() < a.ProviderName.toLowerCase()
              ? 1
              : 0
          )
          .slice(0, recordsPerPage)
      );
    }
  };

  const getClassNameForSponsorstype = (type) => {
    switch (type) {
      case 'AFFILIATED':
        return 'tags_a';
      case 'EMPLOYED':
        return 'tags_e';
      case 'STANDARD':
        return 'tags_s';
      case 'ENHANCED':
        return 'tags_e';
      case 'PREMIUM':
        return 'tags_a';
      default:
        break;
    }
  };

  const onPageChange = (pageNumber) => {
    pageNumber != null ? window.scrollTo(0, 300) : null;
    setPage(pageNumber);
    setActivePage(pageNumber);
  };

  const onPageFilterChange = (perPage) => {
    perPage != null ? window.scrollTo(0, 300) : null;
    setPage(1);
    setActivePage(1);
    setRecordsPerPage(perPage);
  };

  const selectedItemHandler = (selectedItem, facName) => {
    setSelectedItem(selectedItem);
    setSelectedFacilityName(facName);
  };
  const handleScroll = () => {
    setTimeout(() => {
      setScrolled(true);
    }, 5);
  };

  //UseEffects

  useEffect(() => {
    let params = Object.keys(selectedProviders).toString();
    setShowSpinner(true);
    dispatch(actions.getClientPortalDesignation(params, accountInfo.clientCode, setShowSpinner));
  }, [providersArray]);

  useEffect(() => {
    if (providerList.length > 0) {
      setProviders(providerList);
      let designationObject = providerList.map((i) => i.Designations);
      let designationArray = designationObject.map((d) => d[0]);
      setDesigantion(designationArray);
    }
  }, [providerList]);

  useEffect(() => {
    if (clientFacilities != []) setClientFacility(clientFacilities);
  }, [clientFacilities]);

  useEffect(() => {
    if (employmentTypes != null) setEmploymentType(employmentTypes);
  }, [employmentTypes]);

  useEffect(() => {
    if (isError != null && isError) {
      setWarningFlag(true);
    } else if (isError == false) {
      //reload
    }
  }, [isError]);

  useEffect(() => {
    setWarningFlag(false);
    setTimeout(function () {
      setWarningFlag(true);
    }, 3000);
  }, []);

  useEffect(() => {
    setRadioSelect(radioSelect);
  }, [radioSelect]);

  useEffect(() => {
    closeModal;
  }, [selectedItem, radioSelect]);

  useEffect(() => {
    setCurrentPwid(currentPwid);
  }, [currentPwid]);

  useEffect(() => {
    setProvidersArrayInList(providersArrayInList);
  }, [desiganteHandler]);

  useEffect(() => {
    let slicedArray = providersArray.slice(pageStart - 1, pageEnd);
    setProvidersArrayInList(slicedArray);
  }, [pageStart, pageEnd]);

  useEffect(() => {
    Modal.setAppElement('body');
  });

  useEffect(() => {
    if (showModalDesignate) {
      let btnDisable = true;
      if (radioSelect == '' || radioSelect == undefined) btnDisable = true;
      else if (radioSelect != '' && Array.isArray(clientFacility) && !clientFacility.length)
        btnDisable = false;
      else if (
        radioSelect != '' &&
        !(Array.isArray(clientFacility) && !clientFacility.length) &&
        selectedItem != null
      )
        btnDisable = false;
      setDisabledBtn(btnDisable);
    }
  }, [showModalDesignate, radioSelect, selectedItem]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  });

  return (
    <Fragment>
      <ReactModal
        overlayClassName='roster-modal-overlay'
        className='modal-dialog'
        ariaHideApp={true}
        isOpen={showModalDesignate || showModalDedesignate}
        contentLabel='designate'
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={false}>
        <div
          className={`designation-model-window ${
            showModalDedesignate
              ? 'no-facility'
              : !(Array.isArray(clientFacility) && !clientFacility.length)
              ? 'with-facility'
              : 'no-facility'
          }`}>
          <div className='model-container'>
            <div className='close'>
              <img className='close-icon' src={cross} alt='close' onClick={closeModal} />
            </div>
            {showModalDesignate && (
              <Desigante
                name={name}
                showModalDedesignate={showModalDedesignate}
                radioSelect={radioSelect}
                selectedFacilityName={selectedFacilityName}
                setSelectedOption={setSelectedOption}
                clientFacility={clientFacility}
                employmentType={employmentType}
                selectedItemHandler={selectedItemHandler}
              />
            )}

            {showModalDedesignate && <Dedesigante name={name} />}

            <div
              className={`${
                showModalDedesignate
                  ? ' btn-grp center'
                  : !(Array.isArray(clientFacility) && !clientFacility.length)
                  ? 'btn-grp extra-padding'
                  : 'btn-grp'
              }`}>
              <button className='btn-submit cancel' onClick={closeModal}>
                Cancel
              </button>
              <button
                className={`btn-submit de-designate`}
                onClick={(e) =>
                  desiganteHandler(e, `${showModalDedesignate ? 'De-designate' : 'Designate'}`)
                }
                disabled={disabledBtn}>
                {showModalDedesignate ? 'De-designate' : 'Designate'}
              </button>
            </div>
          </div>
        </div>
      </ReactModal>

      {(!showModalDesignate || !showModalDedesignate) && (
        <Fragment>
          <div className='desigantion-management'>
            <div className='designation-container'>
              <div className='para'>
                {accountInfo.isImpersonate && (
                  <a href='/admin/index' alt='Search Results' className='para-content1'>
                    SearchResults
                  </a>
                )}
                <a
                  href={window.location.href}
                  className={` ${!accountInfo.isImpersonate ? 'hide-search-result' : 'para-content2'}`}>
                  {providerDisplayName}
                </a>
                <span className='para-content3'>Designation management</span>
              </div>
              <div className='heading-designation'>Designation management</div>
              <div className='search-grp'>
                <div className='search-input'>
                  <input
                    className='input'
                    id='searchProvider'
                    type='text'
                    maxLength='50'
                    placeholder='Search Provider By Name'
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSearchProvider();
                    }}
                    ref={searchInputRef}
                  />
                  <span className='search-icon'>
                    <i className='icon' onClick={handleSearchProvider}></i>
                  </span>
                </div>
              </div>
            </div>

            <div className='provider-designation-list'>
              {providersFound > 0 || !isError ? (
                <Fragment>
                  {providersArrayInList.length > 0 ? (
                    <Fragment>
                      <Header columns={headerColumns} onSort={onSort} />
                      {providersArrayInList.map((val, index) => {
                        return (
                          <div key={index} className='providerInRoster-details-container'>
                            <div
                              className={
                                index % 2 !== 0
                                  ? 'providerInRoster-details alternate-background'
                                  : 'providerInRoster-details'
                              }>
                              <div className='providerInRoster-info'>
                                <span className='providerInRoster-name'>
                                  <a
                                    key={index}
                                    href={`/provider/profile/${val.ProviderId}`}
                                    alt={val.ProviderName}>
                                    {val.ProviderName}
                                  </a>
                                  <p> NPI: {val.Npi}</p>
                                </span>
                                <span className='providerInRoster-practice-office'>
                                  <Fragment>
                                    <p className='practice-office-name'>{val.Office.Name}</p>
                                    <p>{val.Office.AddressLine}</p>
                                    <p>{val.Office.CityState}</p>
                                  </Fragment>
                                </span>
                                <span className='providerInRoster-employement-types'>
                                  <div className='providerInRoster-typeID'>
                                    <div
                                      className={getClassNameForSponsorstype(
                                        val.SponsorType.toUpperCase()
                                      )}>
                                      {val.SponsorType}
                                    </div>
                                  </div>
                                </span>
                                <span>
                                  <button
                                    className={`${
                                      val.SponsorType.toUpperCase() == 'STANDARD'
                                        ? 'btn designate'
                                        : 'btn de-designate'
                                    }`}
                                    onClick={(e) =>
                                      onShowModal(e, val.ProviderId, val.ProviderName)
                                    }
                                    value={val.ProviderId}>
                                    {`${
                                      val.SponsorType.toUpperCase() == 'STANDARD'
                                        ? 'Designate'
                                        : 'De-designate'
                                    }`}
                                  </button>
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      {showPagination && (
                        <div>
                          <PaginationUI
                            recordsFound={Number(providersFound)}
                            onPageChange={onPageChange}
                            showPerPage={true}
                            recordsPerPage={Number(recordsPerPage)}
                            onPageFilterChange={onPageFilterChange}
                          />
                        </div>
                      )}
                    </Fragment>
                  ) : (
                    <SearchIcon />
                  )}
                </Fragment>
              ) : (
                (warningFlag || isError) && <div className='warning-msg'>{warningMsg}</div>
              )}
            </div>
            {showSpinner && <Spinner />}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Designation.propTypes = {
  providerDisplayName: PropTypes.string,
  selectedProviders: PropTypes.object,
  providersFound: PropTypes.number,
  accountInfo: PropTypes.object,
  providersInfo: PropTypes.arrayOf(PropTypes.object),
  reloadList: PropTypes.func
};

export default Designation;
