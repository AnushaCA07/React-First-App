import React, { Fragment, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { RadioGroup } from '../../../FormComponents/RadioGroup';
import DownArrow from '../../../../assets/images/down-arrow.svg';

const Desigante = (props) => {
  const {
    name,
    showModalDedesignate,
    radioSelect,
    setSelectedOption,
    clientFacility,
    employmentType,
    selectedItemHandler
  } = props;

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedFacilityName, setSelectedFacilityName] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const [showFacilityDropDown, setShowFacilityDropDown] = useState(false);

  let radioOptions = [];
  if (employmentType.toString() === 'Enhanced') {
    radioOptions = [
      {
        Name: 'Enhanced',
        Value: 'Enhanced',
        Show: true
      }
    ];
  } else if (employmentType.toString() === 'Premium') {
    radioOptions = [
      {
        Name: 'Premium',
        Value: 'Premium',
        Show: true
      }
    ];
  } else if (employmentType.toString() === 'Employed') {
    radioOptions = [
      {
        Name: 'Employed',
        Value: 'Employed',
        Show: true
      }
    ];
  } else if (employmentType.toString() === 'Affiliated') {
    radioOptions = [
      {
        Name: 'Affiliated',
        Value: 'Affiliated',
        Show: true
      }
    ];
  } else if (employmentType.toString() === 'Employed,Affiliated') {
    {
      radioOptions = [
        {
          Name: 'Employed',
          Value: 'Employed',
          Show: true
        },
        {
          Name: 'Affiliated',
          Value: 'Affiliated',
          Show: true
        }
      ];
    }
  } else if (employmentType.toString() === 'Enhanced,Premium') {
    {
      radioOptions = [
        {
          Name: 'Enhanced',
          Value: 'Enhanced',
          Show: true
        },
        {
          Name: 'Premium',
          Value: 'Premium',
          Show: true
        }
      ];
    }
  } else {
    radioOptions = [];
  }

  const handleItemClick = (e, code, fname) => {
    selectedItem == code ? setSelectedItem(null) : setSelectedItem(code);
    selectedFacilityName == fname ? setSelectedFacilityName(null) : setSelectedFacilityName(fname);
    setShowFacilityDropDown(false);
  };
  const toggleDropdown = () => {
    setOpen(!isOpen);
    setShowFacilityDropDown(!showFacilityDropDown);
  };

  useEffect(() => {
    setSelectedItem(selectedItem);
    selectedItemHandler(selectedItem, selectedFacilityName);
  }, [handleItemClick]);

  return (
    <Fragment>
      <div className={`designation-modal-row ${showModalDedesignate && 'designate-provider'}`}>
        <div className='designation-container'>
          <h3 className='designation-title'>Designate {name}</h3>
          <div className='radioselect-provider-type'>
            <div>Provider Type</div>
            {radioOptions != [] && (
              <div className='radioselect'>
                <RadioGroup
                  radioGroup={radioOptions}
                  selectedOption={radioSelect}
                  onChangeHandler={setSelectedOption}
                />
              </div>
            )}
          </div>
          {!(Array.isArray(clientFacility) && !clientFacility.length) && (
            <div className='select-option'>
              <div>Select Facility</div>
              <div className='dropdown'>
                <div
                  className={`dropdown-header ${selectedItem ? 'temp' : ''}`}
                  onClick={toggleDropdown}>
                  {selectedItem
                    ? clientFacility.find((item) => item.FacilityCode == selectedItem).FacilityName
                    : 'Select facility'}
                  <img
                    className={`${selectedItem} ? icon ${isOpen && ''} : icon ${isOpen && 'open'} `}
                    src={DownArrow}></img>
                </div>
                {showFacilityDropDown && (
                  <div className={`dropdown-body open`}>
                    {clientFacility.map((item, index) => (
                      <div
                        className='dropdown-item'
                        onClick={(e) => handleItemClick(e, item.FacilityCode, item.FacilityName)}
                        id={item.FacilityCode}
                        key={item.FacilityCode}>
                        <span
                          className={`dropdown-item-dot ${
                            item.FacilityCode == selectedItem ? 'selected' : ''
                          }`}></span>
                        <b> {item.FacilityName}</b>
                        <br />
                        {item.FacilityCode}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

Desigante.propTypes = {
  name: PropTypes.string,
  showModalDedesignate: PropTypes.bool,
  radioSelect: PropTypes.string,
  setSelectedOption: PropTypes.func,
  clientFacility: PropTypes.arrayOf(PropTypes.object),
  employmentType: PropTypes.array,
  selectedItemHandler: PropTypes.func
};

export default Desigante;
