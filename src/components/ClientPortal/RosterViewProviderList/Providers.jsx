import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './_providerList.less';
import PropTypes from 'prop-types';
import Header from '../../Header/Header';
import Provider from '../RosterViewProvider/Provider';
import Spinner from '../../Spinner/Spinner';
import SearchIcon from '../../SearchIcon/SearchIcon';
import SelectedProvider from '../SelectedProvider/SelectedProvider';
import * as headerColumn from '../../../utils/constant-data';
import PaginationUI from '../../Pagination/Pagination';
import Body from '../Body/Body';
import * as actions from '../../../store/actions';

// Global State
let _selectedProviders = {};

const Providers = (props) => {
  let rosterFilterList = [
    {
      filterType: 'search',
      value: '',
      displayName: '',
      isUnaffiliated: false
    },
    {
      filterType: 'sponsorType',
      value: 'ALL',
      displayName: '',
      isUnaffiliated: false
    }
  ];
  const Enhanced = 'Enhanced';
  const Premium = 'Premium';
  const Employed = 'Employed';
  const Affiliated = 'Affiliated';
  const Standard = 'Standard';

  const {
    accountInfo,
    currentSponsorType,
    sponsorInformation,
    selectedArrayHandler,
    providersHandler
  } = props;

  const [filters, setFilters] = useState(rosterFilterList);
  const [searchText, setSearchText] = useState('');
  const [filterArray, setFilterArray] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);
  const [page, setPage] = useState(accountInfo.page);
  const [recordsPerPage, setRecordsPerPage] = useState(Number(accountInfo.recordsPerPage));
  const [sortOrder, setSortOrder] = useState(accountInfo.sortOrder);
  const [sortBy, setSortBy] = useState(accountInfo.sortBy);
  const [selectedCount, setSelectedCount] = useState(0);
  const headerColumns = headerColumn.headerColumnsClientPortal;

  const dispatch = useDispatch();
  const { providers, totalRecords, rosterFilters } = useSelector(
    (state) => state.getClientPortalProvidersReducer
  );
  const [totalProvidersRecords, setTotalProvidersRecords] = useState(totalRecords);
  const [providersArray, setProvidersArray] = useState(providers);
  const { response, isDeleteClick } = useSelector((state) => state.removeProvidersReducer);
  const [scrolled, setScrolled] = useState(false);

  const fetchProviders = () => {
    if (accountInfo.userId != undefined && accountInfo.userId != '') {
      setShowSpinner(true);
      dispatch(
        actions.getClientPortalProviders({
          filters: filters,
          page: page,
          recordsPerPage: recordsPerPage,
          sortBy: sortBy,
          sortOrder: sortOrder,
          userId: accountInfo.userId,
          isImpersonate: accountInfo.isImpersonate
        })
      );
    }
  };
  const onPageChange = (pageNumber) => {
    pageNumber != null ? window.scrollTo(0, 300) : null;
    setPage(pageNumber);
  };
  const onPageFilterChange = (perPage) => {
    perPage != null ? window.scrollTo(0, 300) : null;
    setPage(1);
    setRecordsPerPage(perPage);
  };
  const onSort = (sortOption, sortBy) => {
    setSortBy(sortBy);
    setSortOrder(sortOption);
  };
  const handleSelectAllChange = (e) => {
    const { name, checked } = e.target;
    if (name == 'AllSelect') {
      providers.forEach((provider) => {
        checked
          ? (_selectedProviders[provider.ProviderId] = provider)
          : delete _selectedProviders[provider.ProviderId];
      });
      setProvidersArray([...providersArray]);
    }
  };
  const handleSelectChange = (e) => {
    const { id, checked } = e.target;
    let prov = {};
    checked
      ? ((prov = providersArray.find((prov) => prov.ProviderId == id)),
        (_selectedProviders[id] = prov))
      : delete _selectedProviders[id];
    setProvidersArray([...providersArray]);
  };
  const onClosehandler = (e) => {
    setSelectedCount(0);
    _selectedProviders = {};
  };
  const reloadList = (data) => {
    if (data == true) {
      fetchProviders();
      props.reloadBanner(data);
    }
  };
  const removeProvider = (userId, pwid, clientCode) => {
    dispatch(actions.removeProvidersFromUser(userId, pwid, clientCode, setShowSpinner));
  };
  const batchEditOptionHandler = (e, type) => {
    if (type != null) {
      let pwids = Object.keys(_selectedProviders);
      props.batchEditOptionHandler(type, _selectedProviders);
    }
  };
  const handleScroll = () => {
    setTimeout(() => {
      setScrolled(true);
    }, 5);
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  useEffect(() => {
    providersHandler(providers);
  }, [providers]);

  useEffect(() => {
    if (totalRecords > 0) {
      setProvidersArray(providers);
      setTotalProvidersRecords(totalRecords);
    }
    setShowSpinner(false);
  }, [totalRecords, providers]);

  useEffect(() => {
    setSelectedCount(Object.keys(_selectedProviders).length);
  }, [providersArray, handleSelectChange]);

  useEffect(() => {
    fetchProviders();
  }, [filters, page, recordsPerPage, sortBy, sortOrder]);

  useEffect(() => {
    setFilters(
      filters.map((filter) =>
        filter.filterType == 'search' ? { ...filter, value: searchText } : filter
      )
    );
  }, [searchText]);

  useEffect(() => {
    setFilters(
      filters.map((filter) =>
        filter.filterType == 'sponsorType' ? { ...filter, value: currentSponsorType } : filter
      )
    );
  }, [currentSponsorType]);

  useEffect(() => {
    if (filterArray != undefined && filterArray != null && filterArray.length > 0) {
      let quickFilterArrary = filters;
      filterArray.map((item) => {
        quickFilterArrary.push(item);
      });
      let quickFilterUniqueArrary = Array.from(
        quickFilterArrary.reduce((map, obj) => map.set(obj.value, obj), new Map()).values()
      );
      setShowSpinner(true);
      dispatch(
        actions.getClientPortalProviders({
          filters: quickFilterUniqueArrary,
          page: page,
          recordsPerPage: recordsPerPage,
          sortBy: sortBy,
          sortOrder: sortOrder,
          userId: accountInfo.userId,
          isImpersonate: accountInfo.isImpersonate
        })
      );
    } else {
      setFilters(rosterFilterList);
    }
  }, [filterArray]);

  useEffect(() => {
    if (isDeleteClick) reloadList(true);
  }, [response, isDeleteClick]);

  useEffect(() => {
    //  console.log(_selectedProviders);
  }, [_selectedProviders]);

  useEffect(() => {
    selectedArrayHandler(() => providersArray.filter((i) => i?.ProvidersChecked == true));
  }, [providersArray]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  });

  return (
    <Fragment>
      <Body
        providers={providers.map((i) => i.DisplayName)}
        rosterFilters={rosterFilters}
        profileInfo={accountInfo}
        searchFilterChange={setSearchText}
        applyQuickFilter={setFilterArray}
        reloadList={reloadList}
      />
      <div className='provider-container'>
        {totalRecords > 0 ? (
          <Fragment>
            <div className='provider-list-container'>
              <div className='provider-list'>
                <div className='provider-list-content'>
                  <div className='checkbox'>
                    <input
                      id='AllSelect'
                      name='AllSelect'
                      type='checkbox'
                      checked={providers.every((prov) =>
                        Object.keys(_selectedProviders).includes(prov.ProviderId)
                      )}
                      onChange={handleSelectAllChange}></input>
                    <label className='checkbox-cp' htmlFor='AllSelect'></label>
                  </div>
                  <div
                    className={
                      selectedCount > 0 ? 'provider-list-shortheader' : 'provider-list-header'
                    }>
                    <Header columns={headerColumns} onSort={onSort} isShow={selectedCount > 0} />
                  </div>
                  <div className={selectedCount > 0 ? 'main-provider-area' : null}>
                    <div className='provider-item-container'>
                      <div className='vertical-line'></div>
                      {providersArray.map((provider, index) => (
                        <div className='provider-row' key={index}>
                          <div className='checkbox'>
                            <input
                              id={provider.ProviderId}
                              name={provider.ProviderId}
                              value={_selectedProviders.hasOwnProperty(provider.ProviderId)}
                              type='checkbox'
                              onChange={handleSelectChange}
                              checked={_selectedProviders.hasOwnProperty(
                                provider.ProviderId
                              )}></input>
                            <label
                              className='checkbox-single-provider'
                              htmlFor={provider.ProviderId}></label>
                          </div>
                          <Provider
                            {...provider}
                            accountInfo={accountInfo}
                            listId={index}
                            key={index}
                            reloadList={reloadList}
                            removeProvider={removeProvider}
                            selectedCount={selectedCount}
                          />
                        </div>
                      ))}
                    </div>
                    {selectedCount > 0 && (
                      <SelectedProvider
                        providers={_selectedProviders}
                        accountInfo={accountInfo}
                        onClosehandler={onClosehandler}
                        removeProvider={handleSelectChange}
                        batchEditOptionHandler={batchEditOptionHandler}
                        batchDelete={removeProvider}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className='provider-list'>
                <div className='info-tags'>
                  {sponsorInformation.isFacility ? (
                    <>
                      <span className='tags_e'>{Employed.toUpperCase()}</span>
                      <span className='tags'>{Employed} providers in Healthgrades</span>
                      <span className='tags_a'>{Affiliated.toUpperCase()}</span>
                      <span className='tags'>{Affiliated} providers in Healthgrades </span>
                    </>
                  ) : (
                    <>
                      {(sponsorInformation.sponsorType == 'PDCPRAC' ||
                        sponsorInformation.sponsorType == 'MAP') && (
                        <>
                          <span className='tags_a'>{Premium.toUpperCase()}</span>
                          <span className='tags'>{Premium} providers in Healthgrades </span>
                        </>
                      )}
                      {sponsorInformation.sponsorType == 'PDCPRACT2' && (
                        <>
                          <span className='tags_e'>{Enhanced.toUpperCase()}</span>
                          <span className='tags'>{Enhanced} providers in Healthgrades</span>
                        </>
                      )}
                    </>
                  )}
                  <span className='tags_s'>{Standard.toUpperCase()}</span>
                  <span className='tags'>{Standard} providers in Healthgrades </span>
                </div>
                <div>
                  <PaginationUI
                    recordsFound={totalProvidersRecords}
                    onPageChange={onPageChange}
                    showPerPage={true}
                    recordsPerPage={recordsPerPage}
                    onPageFilterChange={onPageFilterChange}
                  />
                </div>
              </div>
            </div>
          </Fragment>
        ) : (
          <SearchIcon />
        )}
      </div>
      {showSpinner && <Spinner cta={true} />}
    </Fragment>
  );
};

Providers.propTypes = {
  accountInfo: PropTypes.object,
  reloadBanner: PropTypes.func,
  batchEditOptionHandler: PropTypes.func,
  selectedArrayHandler: PropTypes.func,
  providersHandler: PropTypes.func
};

export default Providers;
