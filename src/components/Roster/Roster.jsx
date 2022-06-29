import React, { useState, useEffect } from 'react';
import './_roster.less';
import PropTypes from 'prop-types';
import activeIcon from '../../../assets/images/active.png';
import inactiveIcon from '../../../assets/images/inactive.png';
import lockOut from '../../../assets/images/lock-out.png';
import linearclick from '../../../assets/images/linearclick_icon.png';

const Roster = (props) => {
  const {
    Id,
    FullName,
    Email,
    ProviderCount,
    UserRole,
    IsActive,
    IsThirdParty,
    IsAuthorized,
    UserInfoToken,
    listId
  } = props;

  const [authorize, setAuthorize] = useState(IsAuthorized);
  const [rosterStatus, setRosterStatus] = useState(IsActive);
  const [rosterFlags, setRosterFlags] = useState(IsThirdParty);

  useEffect(() => {
    setAuthorize(props.IsAuthorized);
    setRosterStatus(props.IsActive);
    setRosterFlags(props.IsThirdParty);
  }, [props.IsActive, props.IsAuthorized, props.IsThirdParty]);

  const onDeleteHandler = (userId) => {
    let userName = FullName == '' || FullName == ' ' ? Email : FullName;
    props.onUpdateUserInfo(userId, userName, 'delete');
  };

  const onAuthorizeHandler = (userId) => {
    let userName = FullName == '' || FullName == ' ' ? Email : FullName;
    props.onUpdateUserInfo(userId, userName, 'authorize');
  };

  const onChangeStatusHandler = (userId) => {
    let userName = FullName == '' || FullName == ' ' ? Email : FullName;
    props.onUpdateUserInfo(userId, userName, 'changestatus');
  };

  const onChangeFlagsHandler = (userId) => {
    let userName = FullName == '' || FullName == ' ' ? Email : FullName;
    props.onUpdateUserInfo(userId, userName, 'setflag');
  };

  return (
    <div className={listId % 2 == 0 ? 'roster-details alternate-background' : 'roster-details'}>
      <div className='lock-out'>{IsThirdParty && <img src={lockOut} alt='flagged' />}</div>
      <div className='name'>
        <a
          href={
            UserRole.toLowerCase() === 'client admin'
              ? `/clientportal/RosterProfile?userToken=${UserInfoToken}`
              : `/roster/RosterProfile?userToken=${UserInfoToken}`
          }
          alt={FullName}>
          {FullName}
        </a>
        <span>{Email}</span>
      </div>
      <div className='user-type'>{UserRole}</div>
      <div className='activation-status'>
        <div>
          {rosterStatus == true ? (
            <img src={activeIcon} alt='user-active' />
          ) : (
            <img src={inactiveIcon} alt='user-inactive' />
          )}
        </div>
      </div>
      <div className='provider-number'>
        <div>{ProviderCount}</div>
      </div>
      <div className='authorization-status'>{authorize ? 'Authorized' : 'UnAuthorized'}</div>
      <div className='edit-authorize'>
        <div className='dropdown'>
          <img src={linearclick} className='dropbtn' alt='flagged' />
          <div className='dropdown-content'>
            {!(IsAuthorized || IsThirdParty) && (
              <a href='#' onClick={() => onAuthorizeHandler(Id)}>
                Authorize
              </a>
            )}
            {rosterStatus == true ? (
              <a href='#' onClick={() => onChangeStatusHandler(Id)}>
                InActive
              </a>
            ) : (
              <a href='#' onClick={() => onChangeStatusHandler(Id)}>
                Active
              </a>
            )}
            {rosterFlags == true ? (
              <a href='#' onClick={() => onChangeFlagsHandler(Id)}>
                UnFlag Third Party
              </a>
            ) : (
              <a href='#' onClick={() => onChangeFlagsHandler(Id)}>
                Flag As Third Party
              </a>
            )}
            <a href='#' onClick={() => onDeleteHandler(Id)}>
              Delete
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

Roster.propTypes = {
  Id: PropTypes.string,
  FullName: PropTypes.string,
  Email: PropTypes.string,
  ProviderCount: PropTypes.number,
  UserInfoToken: PropTypes.string,
  IsActive: PropTypes.bool,
  UserRole: PropTypes.string,
  IsAuthorized: PropTypes.bool,
  IsThirdParty: PropTypes.bool,
  onUpdateUserInfo: PropTypes.func
};

export default Roster;
