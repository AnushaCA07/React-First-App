import React, { Fragment, useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import './_body.less';
import PropTypes from 'prop-types';
import AddProviderModal from '../AddProvider/AddProvider';
import AccountSettingModal from '../AccountSetting/AccountSetting';
import QuickFilters from '../QuickFilters/QuickFilters';

const Body = (props) => {
  const [filterType, setFilterType] = useState('');
  const [openDropwDown, setOpenDropwDown] = useState(false);
  const [showModal, toggleModal] = useState(false);
  const [showModalAcc, toggleModalAcc] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [active, setActive] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [count, setCount] = useState(0);
  const [showClearAllFilters, setShowClearAllFilters] = useState(false);
  const searchInputRef = useRef();

  const manageHandler = () => {
    setOpenDropwDown(!openDropwDown);
  };
  const handleSearchProvider = () => {
    props.searchFilterChange(searchInputRef.current.value);
  };
  const addProviderClick = () => {
    toggleModal(true);
  };
  const showSpinnerOnModalClose = (showSpinner) => {
    setShowSpinner(showSpinner);
  };
  const { accountInfo } = useSelector((state) => state.getAccountDetailsReducer);

  const closeModal = (data) => {
    toggleModal(false);
    props.reloadList(data);
  };
  const openModalAcc = () => {
    toggleModalAcc(true);
  };
  const closeModalAcc = () => {
    toggleModalAcc(false);
  };

  const manageFilterHandler = (e) => {
    const name = e.target.innerHTML;
    if (name != null || name != undefined) {
      setActive(true);
      switch (e.target.innerHTML) {
        case 'Practices':
          setSelectedItem('practice');
          setFilterType('practice');
          setCount(count);
          break;
        case 'Speciality':
          setSelectedItem('specialty');
          setFilterType('specialty');
          break;
        case 'Missing Fields':
          setSelectedItem('missing');
          setFilterType('missing');
          break;
      }
    } else {
      setSelectedItem('');
      setFilterType('');
      setActive(false);
      setCount(0);
    }
  };

  const closeFilterHandler = (e) => {
    setSelectedItem('');
    setActive(false);
  };
  const clearFilterHandler = (e) => {
    e.preventDefault();
    setSelectedItem('');
    setActive(false);
  };
  useEffect(() => {
    setActive(false);
    setSelectedItem('');
  }, []);

  const applyQuickFilter = (filterItem) => {
    setCount(filterItem.filter((i) => i.filterType === 'practice').length);
    props.applyQuickFilter(filterItem);
    setShowClearAllFilters(true);
  };
  const clearAllFilterHandler = (e) => {
    e.preventDefault();
    props.applyQuickFilter();
    setActive(false);
    setCount(0);
    setShowClearAllFilters(false);
  };

  return (
    <Fragment>
      <AddProviderModal
        profileInfo={accountInfo}
        showModal={showModal}
        closeModal={closeModal}
        toggleModal={toggleModal}
      />
      {accountInfo.isImpersonate && (
        <AccountSettingModal
          showModalAcc={showModalAcc}
          closeModalAcc={closeModalAcc}
          toggleModalAcc={toggleModalAcc}
          profileInfo={accountInfo}
          showSpinnerModel={showSpinnerOnModalClose}
        />
      )}
      <div className='rosterviewbody-container'>
        <div className='rosterviewbody-tablecontainer'>
          {accountInfo.isImpersonate && (
            <div className='body-title-impersonate'>
              <a href='/admin/index' alt='Search Results'>
                Search Results
              </a>
              <span> {'>'} </span> {accountInfo.firstName + ' ' + accountInfo.lastName}
            </div>
          )}

          <div className='body-title'>
            <h1>Roster</h1>
            <div className='btn-group'>
              <button className='btn btn-add' onClick={addProviderClick}>
                {' '}
                Add Providers
              </button>
              {accountInfo.isImpersonate && (
                <button className='btn' onClick={manageHandler}>
                  {' '}
                  Manage <span className='icon-down'></span>
                </button>
              )}
              {openDropwDown && (
                <div className='manage-items'>
                  <ul className='align-list'>
                    <ul
                      className='dropdown-item'
                      onMouseEnter={() => {
                        setOpenDropwDown(true);
                      }}
                      onMouseLeave={() => {
                        setOpenDropwDown(false);
                      }}>
                      <li>
                        <span onClick={openModalAcc}>Account Settings</span>
                      </li>
                      <li className='disabled-list-item'>
                        <span>Delete Account</span>
                      </li>
                    </ul>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className='filter-search-grp'>
            <div className='filter-grp'>
              <span className='search-options'>Quick Filters : </span>
              <span classsname={`selected-filter ${selectedItem}`}>
                {active && (
                  <QuickFilters
                    practices={props.rosterFilters.Practices}
                    specialties={props.rosterFilters.Specialties}
                    missingFields={props.rosterFilters.MissingFields}
                    filterType={filterType.toLowerCase()}
                    action={closeFilterHandler}
                    clear={clearFilterHandler}
                    applyQuickFilter={applyQuickFilter}
                    showFilters={setActive}
                  />
                )}
              </span>
              {count != null && count > 0 && (
                <span className='filters-count'>
                  <span className='filters-count-text'>{('0' + count).slice(-2)}</span>
                </span>
              )}
              <div
                className={`search-content ${selectedItem} ${
                  selectedItem == 'Practices' && 'selected'
                } ${count != null && count > 0 ? 'counter' : ''}
                }`}
                onClick={manageFilterHandler}>
                Practices
              </div>
              <div
                className={`search-content ${selectedItem} ${
                  selectedItem == 'Speciality' && 'selected'
                }`}
                onClick={manageFilterHandler}>
                Speciality
              </div>
              <div
                className={`search-content ${selectedItem} ${
                  selectedItem == 'Missing Fields' && 'selected'
                }`}
                onClick={manageFilterHandler}>
                Missing Fields
              </div>
              {showClearAllFilters && (
                <div className='clear-all-filters'>
                  <button onClick={clearAllFilterHandler} className='cancel-btn'>
                    Clear all filters
                  </button>
                </div>
              )}
            </div>

            <div className='search-grp'>
              <input
                className='input'
                id='searchProvider'
                type='text'
                maxLength='50'
                placeholder='Search for Provider By Name'
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
      </div>
    </Fragment>
  );
};

Body.propTypes = {
  action: PropTypes.func,
  showSpinnerModel: PropTypes.func,
  currentUserId: PropTypes.string,
  addProviderClick: PropTypes.func,
  profileInfo: PropTypes.object,
  rosterFilters: PropTypes.objectOf(PropTypes.array),
  openModal: PropTypes.func,
  reloadList: PropTypes.func
};

export default Body;
