/** @format */

import React, { useState, useEffect, Fragment } from 'react';
import * as actions from '../../store/actions';
import { useSelector, useDispatch } from 'react-redux';
import './_rosterList.less';
import Roster from '../Roster/Roster';
import Header from '../Header/Header';
import { PaginationUI } from '../Pagination/Pagination';
import PropTypes from 'prop-types';
import Spinner from '../Spinner/Spinner';
import SearchIcon from '../SearchIcon/SearchIcon';
import ReactModal from 'react-modal';
import Modal from 'react-modal';
import Alert from '../Alert/Alert';

const RosterList = (props) => {
  const { searchType, searchValue, searchBy, currentUserId, clientCodes } =
    useSelector((state) => state.searchReducer);

  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('name');
  const [page, setPage] = useState(1);
  const [showSpinner, setShowSpinner] = useState(false);
  const [reloadList, setReloadList] = useState(false);
  const [showModal, toggleModal] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [userId, setUserId] = useState('');
  const [actionType, setActionType] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    Modal.setAppElement('body');
  });
  useEffect(() => {
    if (reloadList) {
      props.refreshList(true, page, setShowSpinner, sortOrder, sortBy);
      setReloadList(false);
    }
  }, [reloadList]);

  useEffect(() => {
    if (props.recordsFound > 0) {
      let totalPages = Math.round(props.recordsFound / 30);
      if (page > totalPages) setPage(1);
    }
  }, [props.rosters, props.recordsFound]);

  const headerColumns = [
    {
      ColumnName: '',
      IsSortBy: false,
      ClassName: 'roster-search lock-out',
    },
    {
      ColumnName: 'Name',
      IsSortBy: true,
      ClassName: 'roster-search name',
      IsSorted: true,
    },
    {
      ColumnName: 'User Type',
      IsSortBy: true,
      ClassName: 'roster-search user-type',
      IsSorted: true,
    },
    {
      ColumnName: 'Activation Status',
      IsSortBy: true,
      ClassName: 'roster-search activation-status',
      IsSorted: true,
    },
    {
      ColumnName: 'Providers on Roster',
      IsSortBy: true,
      ClassName: 'roster-search provider-number',
      IsSorted: true,
    },
    {
      ColumnName: 'Authorization Status',
      IsSortBy: true,
      ClassName: 'roster-search authorization-status',
      IsSorted: true,
    },
    {
      ColumnName: '',
      IsSortBy: false,
      ClassName: 'roster-search edit-authorize',
    },
  ];
  const setMessageOnActionType = (action, userName) => {
    if (action == 'delete') {
      setPopupMessage(`Are you sure? Do you want to delete ${userName}?`);
    } else if (action == 'authorize') {
      setPopupMessage(`Are you sure? Do you want to authorize ${userName}?`);
    } else if (action == 'changestatus') {
      setPopupMessage(
        `Are you sure? Do you want to change status of ${userName}?`
      );
    } else if (action == 'setflag') {
      setPopupMessage(`Are you sure? Do you want to flag/unflag ${userName}?`);
    }
  };

  const onSort = (sortOption, sortBy) => {
    setShowSpinner(true);
    dispatch(
      actions.searchActions(
        searchType,
        searchValue,
        searchBy,
        currentUserId,
        setShowSpinner,
        page,
        sortOption,
        sortBy,
        clientCodes
      )
    );
    setSortOrder(sortOption);
    setSortBy(sortBy);
  };
  const onPageChange = (pageNumber) => {
    setShowSpinner(true);
    dispatch(
      actions.searchActions(
        searchType,
        searchValue,
        searchBy,
        currentUserId,
        setShowSpinner,
        pageNumber,
        sortOrder,
        sortBy,
        clientCodes
      )
    );
    setPage(pageNumber);
  };
  const closeRosterModal = () => {
    setUserId('');
    setActionType('');
    setMessageOnActionType('');
    toggleModal(false);
  };

  const onUpdateUserInfo = (userId, name, action) => {
    setUserId(userId);
    setActionType(action);
    setMessageOnActionType(action, name);
    toggleModal(true);
  };

  const confirmUpdate = () => {
    toggleModal(false);
    if (userId != '' && actionType != '') {
      if (actionType == 'delete') {
        onDelete(userId);
      } else if (actionType == 'authorize') {
        onAuthorize(userId);
      } else if (actionType == 'changestatus') {
        onChangeStatus(userId);
      } else if (actionType == 'setflag') {
        onChangeFlags(userId);
      }
    }
    setUserId('');
    setActionType('');
    setMessageOnActionType('');
    toggleModal(false);
  };

  const onDelete = (userId) => {
    setShowSpinner(true);
    dispatch(actions.deleteRoster(userId, setShowSpinner));
    setReloadList(true);
  };

  const onAuthorize = (userId) => {
    setShowSpinner(true);
    dispatch(actions.authorizeRoster(userId, setShowSpinner));
    setReloadList(true);
  };

  const onChangeStatus = (userId) => {
    setShowSpinner(true);
    dispatch(actions.changeRosterStatus(userId, setShowSpinner));
    setReloadList(true);
  };

  const onChangeFlags = (userId) => {
    setShowSpinner(true);
    dispatch(actions.changeRosterFlags(userId, setShowSpinner));
    setReloadList(true);
  };

  const recordsFound = props.recordsFound;
  return recordsFound > 0 && searchBy === 'rostermanagers' ? (
    <div className='roster-list'>
      <ReactModal
        overlayClassName='roster-modal-overlay'
        className='modal-dialog'
        ariaHideApp={true}
        isOpen={showModal}
        contentLabel='Alert Message!'
        onRequestClose={closeRosterModal}
      >
        <Alert
          action={closeRosterModal}
          heading='Alert Message!'
          message={popupMessage}
          confirmUpdate={confirmUpdate}
        ></Alert>
      </ReactModal>
      <div className='roster-list'>
        <Header columns={headerColumns} onSort={onSort} />
        {props.rosters.map((rosters, index) => (
          <Roster
            {...rosters}
            onUpdateUserInfo={onUpdateUserInfo}
            listId={index}
            key={index}
          />
        ))}
        {recordsFound > 30 && (
          <PaginationUI
            recordsFound={recordsFound}
            onPageChange={onPageChange}
          />
        )}
        {showSpinner && <Spinner />}
      </div>
    </div>
  ) : (
    <SearchIcon />
  );
};

RosterList.propTypes = {
  rosters: PropTypes.arrayOf(PropTypes.object),
  recordsFound: PropTypes.number,
  refreshList: PropTypes.func,
};

export default RosterList;
