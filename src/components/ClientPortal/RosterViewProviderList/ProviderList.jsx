import React, { Fragment, useState, useEffect } from 'react';
import './_providerList.less';
import PropTypes from 'prop-types';

import Header from '../../Header/Header';
import Provider from '../RosterViewProvider/Provider';
import Spinner from '../../Spinner/Spinner';
import SearchIcon from '../../SearchIcon/SearchIcon';
import SelectedProvider from '../SelectedProvider/SelectedProvider';
import * as headerColumn from '../../../utils/constant-data';
import PaginationUI from '../../Pagination/Pagination';

const ProviderList = (props) => {
  const [showSpinner, setShowSpinner] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [providersArray, setProvidersArray] = useState(props.providers);
  const [some, setSome] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const providersFound = props.providersFound;
  const [totalRecords, setTotalRecords] = useState(providersFound);
  const headerColumns = headerColumn.headerColumnsClientPortal;
  const [page, setPage] = useState(1);
  const [perPageRequest, setPerPageRequest] = useState(10);

  useEffect(() => {
    setProvidersArray(props.providers);
  }, [props.providers]);

  useEffect(() => {
    setSelectedCount(providersArray.filter((i) => i.ProvidersChecked == true).length);
  }, [providersArray, handleSelectChange, isChecked, some]);

  useEffect(() => {
    setIsChecked(isChecked);
  }, [isChecked, onClosehandler, some]);

  const getSortedData = (e) => {};

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    onPageChange(pageNumber);
  };
  const itemsPerPage = 10;
  const pageStart = itemsPerPage * (activePage - 1) + 1;
  const pageEnd =
    itemsPerPage * activePage > totalRecords ? totalRecords : itemsPerPage * activePage;

  const onPageChange = (pageNumber) => {
    setShowSpinner(true);
    setPage(pageNumber);
  };

  const onPageFilterChange = (perPage) => {
    setPerPageRequest(perPage);
  };

  const handleSelectAllChange = (e) => {
    const { name, checked } = e.target;
    if (name == 'AllSelect') {
      let temp = props.providers.map((i) => {
        return { ...i, ProvidersChecked: checked };
      });
      setProvidersArray(temp);
      setIsChecked(checked);
    }
  };

  const handleSelectChange = (e) => {
    const { id, checked } = e.target;
    let temp = providersArray.map((data, index) => {
      if (data.ProviderId === id) return { ...data, ProvidersChecked: checked };
      else {
        return { ...data };
      }
    });
    setProvidersArray(temp);
    if (checked) {
      setSome(checked);
    }
  };

  const onClosehandler = (e) => {
    setIsChecked(false);
    setSelectedCount(0);
    setSome(false);
  };
  const onRemovehandler = (e) => {
    let code = e.target.id;
    let temp = providersArray.map((i) => i).filter((n) => n.ProviderId != code);
    setProvidersArray(temp);
    if (temp.length == 0) {
      setIsChecked(false);
      setSelectedCount(0);
      setSome(false);
    }
  };

  return providersFound > 0 ? (
    <Fragment>
      <div className='provider-list-container'>
        <div className='provider-list'>
          <div className='provider-list-content'>
            <div className='checkbox'>
              <input
                id='AllSelect'
                name='AllSelect'
                type='checkbox'
                checked={
                  providersArray.length == 0
                    ? false
                    : providersArray.filter((i) => i?.ProvidersChecked !== true).length < 1
                }
                onChange={handleSelectAllChange}></input>
              <label className='checkbox-cp' htmlFor='AllSelect'></label>
            </div>
            <div
              className={
                !((isChecked || some) && selectedCount > 0)
                  ? 'provider-list-header'
                  : 'provider-list-shortheader'
              }>
              <Header
                columns={headerColumns}
                onSort={getSortedData}
                isShow={(isChecked || some) && selectedCount > 0}
              />
            </div>
            <div className={(isChecked || some) && selectedCount > 0 ? 'main-provider-area' : null}>
              <div className='provider-item-container'>
                {providersArray.map((provider, index) => (
                  <div className='provider-row' key={index}>
                    <div className='checkbox'>
                      <input
                        id={provider.ProviderId}
                        name={provider.ProviderId}
                        value={provider.ProvidersChecked}
                        type='checkbox'
                        onChange={handleSelectChange}
                        checked={provider.ProvidersChecked == true}></input>
                      <label
                        className='checkbox-single-provider'
                        htmlFor={provider.ProviderId}></label>
                    </div>
                    <Provider
                      {...provider}
                      listId={index}
                      key={index}
                      ProvidersChecked={isChecked || some}
                    />
                  </div>
                ))}
              </div>
              {selectedCount > 0 && (
                <SelectedProvider
                  checked={isChecked}
                  onClosehandler={onClosehandler}
                  myArray={providersArray.filter((i) => i?.ProvidersChecked == true)}
                  selectedCount={selectedCount}
                  onRemovehandler={onRemovehandler}
                />
              )}
            </div>
          </div>
        </div>
        <div className='provider-list'>
          <div className='info-tags'>
            <span className='tags_e'>EMPLOYED</span>
            <span className='tags'>&nbsp;Employed providers in Healthgrades</span>
            <span className='tags_a'>AFFILIATED </span>
            <span className='tags'>&nbsp;Affiliated providers in Healthgrades </span>
            <span className='tags_s'>STANDARD </span>
            <span className='tags'>&nbsp;Standard providers in Healthgrades </span>
          </div>
          <div>
            <PaginationUI
              recordsFound={providersFound}
              onPageChange={onPageChange}
              showPerPage={true}
              itemsPerPage={perPageRequest}
              onPageFilterChange={onPageFilterChange}
            />
          </div>
          {showSpinner && <Spinner />}
        </div>
      </div>
    </Fragment>
  ) : (
    <SearchIcon />
  );
};

ProviderList.propTypes = {
  providers: PropTypes.arrayOf(PropTypes.object),
  providersFound: PropTypes.number
};

export default ProviderList;
