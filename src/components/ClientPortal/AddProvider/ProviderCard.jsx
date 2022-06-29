import React, { Fragment, useState, useEffect, useRef } from 'react';

// icon imports
import TrashIcon from '../../../assets/images/trash.svg';
import TrashHoverIcon from '../../../assets/images/trash-hover.svg';
import DownArrow from '../../../assets/images/down-arrow.svg';
import UpArrow from '../../../assets/images/up-arrow.svg';

const ProviderCard = (props) => {
  const { provider, facilities, employmentTypes, removeProviderHandler, updateProviderHandler } =
    props;

  //state variables
  const [trashIconSrc, setTrashIconSrc] = useState(TrashIcon);
  const [showFacilitySection, setShowFacilitySection] = useState(false);
  const [showEmploymentTypeDropDown, setShowEmploymentTypeDropDown] = useState(false);
  const [showFacilityDropDown, setShowFacilityDropDown] = useState(false);
  const [requestObject, setRequestObject] = useState(provider);
  const [selectedEmpType, setSelectedEmpType] = useState(provider.employmentType); // 'Standard');
  const [selectedFacilityType, setSelectedFacilityType] = useState('Select Facility');

  // Workaround for useEffect
  const initialRender = useRef(true);

  // Flag for facility section

  const isFacilityEmpty =
    JSON.stringify(requestObject.facility) ===
    JSON.stringify({ FacilityCode: '', FacilityName: '' });

  //Event / Change => Handlers
  const employmentSelectHandler = (employmentType) => {
    setRequestObject((prevState) => ({
      ...prevState,
      employmentType: employmentType,
      validation: {
        isFacilityValid: employmentType.toLowerCase() === 'standard' || facilities.length == 0,
        isEmploymentValid: true
      }
    }));
    setSelectedEmpType(employmentType);
    if (employmentType == 'Standard') setSelectedFacilityType('Select Facility');
    else setSelectedFacilityType(selectedFacilityType);
  };

  const facilitySelectHandler = (facility) => {
    setRequestObject((prevState) => ({
      ...prevState,
      facility: facility,
      validation: {
        ...prevState.validation,
        isFacilityValid: facility.FacilityCode !== '' && facility.FacilityName !== ''
      }
    }));
    setShowFacilityDropDown(false);
    setSelectedFacilityType(facility.FacilityName);
  };

  //useEffects
  useEffect(() => {
    if (initialRender.current) initialRender.current = false;
    else {
      if (requestObject.employmentType == '') {
        setShowFacilitySection(false);
      } else {
        setShowEmploymentTypeDropDown(false);
        if (requestObject.employmentType.toLowerCase() == 'standard') {
          setShowFacilitySection(false);
        } else {
          setShowFacilitySection(true);
        }
      }
      updateProviderHandler(requestObject);
    }
  }, [requestObject]);

  useEffect(() => {
    setRequestObject(provider);
    setSelectedEmpType(provider.employmentType);
    setSelectedFacilityType(provider.facility.FacilityName);
  }, [provider]);

  // CSS Handlers

  const _providerCardClass = `${
    requestObject.validation.isEmploymentValid && requestObject.validation.isFacilityValid
      ? 'provider-search-card'
      : 'provider-search-card error'
  }`;
  const _facilityClass = `${
    requestObject.validation.isEmploymentValid && requestObject.validation.isFacilityValid
      ? ''
      : 'error'
  }`;

  return (
    <Fragment>
      <div className={_providerCardClass} key={requestObject.pwid}>
        <span className='card-name'>{requestObject.displayName}</span>
        <br />
        <span className='card-location'>Location: {requestObject.location} | </span>
        <span className='card-npi'>NPI: {requestObject.npi} | </span>
        <span className='card-pwid'>PWID: {requestObject.pwid}</span>
        <span
          className='delete-icon'
          onClick={() => {
            setTrashIconSrc(TrashIcon);
            removeProviderHandler(requestObject.pwid);
          }}>
          <img
            src={trashIconSrc}
            onMouseOver={() => {
              setTrashIconSrc(TrashHoverIcon);
            }}
            onMouseOut={(e) => {
              setTrashIconSrc(TrashIcon);
            }}
            alt='delete-logo'></img>
        </span>
        <span className='provider-type'>
          <span className='employment-type'>Provider Type</span>
          {facilities.length > 0 && showFacilitySection && (
            <span className='facility-type'>Select Facility*</span>
          )}
        </span>

        <span>
          <div className='select-option'>
            <div className='dropdown dd-section-employment-type'>
              <button
                type='button'
                className='dropdown-header'
                onClick={() => setShowEmploymentTypeDropDown(!showEmploymentTypeDropDown)}>
                <span>{selectedEmpType}</span>
                <img className='icon' src={showEmploymentTypeDropDown ? UpArrow : DownArrow}></img>
              </button>
              {showEmploymentTypeDropDown && (
                <div role={'list'} className='dropdown-body dd-employment-type'>
                  {employmentTypes.map((employmentType, index) => (
                    <button
                      type='button'
                      className='dropdown-item'
                      key={index}
                      onClick={() => {
                        employmentSelectHandler(employmentType);
                      }}>
                      <strong>{employmentType}</strong>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* facility dropdown */}
            {facilities.length > 0 && showFacilitySection && (
              <div className='dropdown dd-section-facility'>
                <button
                  type='button'
                  className={`dropdown-header ${_facilityClass}`}
                  onClick={() => setShowFacilityDropDown(!showFacilityDropDown)}>
                  <span className='facility-name'>{`${
                    selectedFacilityType != 0 ? selectedFacilityType : 'Select Facility'
                  }`}</span>
                  <img className='icon' src={showFacilityDropDown ? UpArrow : DownArrow}></img>
                </button>
                {showFacilityDropDown && (
                  <div role={'list'} className='dropdown-body dd-facility'>
                    <div className='scrollbar' id='scrollbar-styles'>
                      {facilities.map((facility, index) => (
                        <Fragment>
                          <button
                            key={index}
                            type='button'
                            className='dropdown-item'
                            title={facility.FacilityName}
                            onClick={() => {
                              facilitySelectHandler(facility);
                            }}>
                            <strong>{facility.FacilityName}</strong>
                            <span>{facility.FacilityCode} </span>
                          </button>
                        </Fragment>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </span>
      </div>
    </Fragment>
  );
};

export default ProviderCard;
