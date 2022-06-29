import React, { useState, Fragment, useEffect } from 'react';
import './_quickFilters.less';
import close from '../../../../assets/images/close.svg';
import PropTypes from 'prop-types';

const QuickFilters = (props) => {
  const { practices, specialties, missingFields, filterType } = props;
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedSpecialtiesOption, setSpecialtiesSelectedOption] = useState('');
  const [selectPractices, setPractices] = useState(practices);
  const [selectSpecialties, setSpecialties] = useState(specialties);
  const [selectMissingFields, setMissingFields] = useState(missingFields);
  const [count, setCount] = useState(0);
  const [pracBbtn, setPracBbtn] = useState(false);
  const [specialityBtn, setSpecialityBtn] = useState(false);
  const [missingBtn, setMissingBtn] = useState(false);

  const onChangeHandler = (e) => {
    const { id, checked } = e.target;
    setPractices(
      practices.filter((x) => {
        if (x.Id == id) x.Selected = checked;
        return x;
      })
    );
    setSpecialties(
      specialties.filter((x) => {
        if (x.FilterValue == id) x.Selected = true;
        return x;
      })
    );
    setMissingFields(
      missingFields.filter((x) => {
        if (x.FilterValue == id) x.Selected = true;
        return x;
      })
    );

    if (filterType == 'specialty') {
      setSpecialtiesSelectedOption(e.target.value);
    }
    if (filterType == 'missing') setSelectedOption(e.target.value);
  };

  const handleClear = (e, type) => {
    e.preventDefault();
    if (type === 'practice') {
      setPractices(
        practices.filter((x) => {
          x.Selected = false;
          return x;
        })
      );
    } else if (type === 'specialty') {
      setSpecialties(
        specialties.filter((x) => {
          x.Selected = false;
          return x;
        })
      );
    } else if (type === 'missing') {
      setMissingFields(
        missingFields.filter((x) => {
          x.Selected = false;
          return x;
        })
      );
    }
  };

  const applyFilters = (e, type) => {
    e.preventDefault();

    // Practices
    let praciceItem = practices.filter((x) => x.Selected == true);
    let filteredArray = [];
    praciceItem.map((v, i) => {
      let filterObj = {
        filterType: 'practice',
        value: v.Id,
        displayName: v.Name,
        isUnaffiliated: v.Unaffiliated
      };
      filteredArray.push(filterObj);
    });

    //speciality
    let specialityItem = specialties.filter((x) => x.Selected == true);
    if (specialityItem.length > 0) setSpecialtiesSelectedOption(specialityItem[0].FilterValue);
    specialityItem.map((v, i) => {
      let filterObj = {
        filterType: 'specialty',
        value: v.FilterValue,
        displayName: v.Name
      };
      filteredArray.push(filterObj);
    });

    //missingFields
    let missingItem = missingFields.filter((x) => x.Selected == true);
    missingItem.map((v, i) => {
      let filterObj = {
        filterType: 'missing',
        value: v.FilterValue,
        displayName: v.Name
      };
      filteredArray.push(filterObj);
    });
    if (missingItem.length > 0) setSelectedOption(missingItem[0].FilterValue);

    if (type === 'practice') {
      setCount(selectPractices.filter((i) => i.Selected == true).length);
    } else if (type === 'specialty') {
      //  setCount(0);
    } else if (type === 'missing') {
      // setCount(0);
    }
    props.applyQuickFilter(filteredArray);
    props.showFilters(false);
  };

  useEffect(() => {
    if (filterType.toLowerCase() == 'practice') {
      setCount(selectPractices.filter((i) => i.Selected == true).length);
      count > 0
        ? (setPracBbtn(true), setSpecialityBtn(false), setMissingBtn(false))
        : (setPracBbtn(false), setSpecialityBtn(false), setMissingBtn(false));
    } else if (filterType.toLowerCase() == 'specialty') {
      selectSpecialties.filter((i) => i.Selected == true).length > 0
        ? (setPracBbtn(false), setSpecialityBtn(true), setMissingBtn(false))
        : (setPracBbtn(false), setSpecialityBtn(false), setMissingBtn(false));
    } else if (filterType.toLowerCase() == 'missing') {
      selectMissingFields.filter((i) => i.Selected == true).length > 0
        ? (setPracBbtn(false), setSpecialityBtn(false), setMissingBtn(true))
        : (setPracBbtn(false), setSpecialityBtn(false), setMissingBtn(false));
    } else {
      setPracBbtn(false);
      setSpecialityBtn(false);
      setMissingBtn(false);
    }
  }, [onChangeHandler]);

  useEffect(() => {
    if (specialties.length > 0) {
      let selectedItem = specialties.filter((x) => x.Selected == true);
      if (selectedItem.length > 0) {
        setSpecialtiesSelectedOption(selectedItem[0].FilterValue);
      }
    }
    if (missingFields.length > 0) {
      let selectedItem = missingFields.filter((x) => x.Selected == true);
      if (selectedItem.length > 0) {
        setSelectedOption(selectedItem[0].FilterValue);
      }
    }
  }, [specialties, missingFields]);
  return (
    <Fragment>
      <div className={`filter-grps-container ${filterType.toLowerCase()}`}>
        <div className='close'>
          <img className='close-icon' onClick={props.action} src={close} alt='close' />
        </div>
        <div className='filter-grps-header'>
          <h4 className='filter-grps-title'>
            Filter by{' '}
            {filterType.toLowerCase() == 'practice' ? (
              <span>Practices</span>
            ) : filterType.toLowerCase() == 'specialty' ? (
              <span>Specialties</span>
            ) : (
              <span>Missing Fields</span>
            )}
          </h4>
        </div>

        <div className='filter-grps-body'>
          <div className='errorMessage'>
            <span></span>
          </div>
          <form id='filtersForm' autoComplete='off'>
            <div className='filter-grps-body-inner'>
              <div className='scrollbar' id='scrollbar-styles'>
                {filterType.toLowerCase() == 'practice'
                  ? selectPractices.map((item, index) => (
                      <div key={index} className='inner-container'>
                        <div className='checkbox'>
                          <input
                            id={item.Id}
                            type='checkbox'
                            name={item.Id}
                            value={item.filterType}
                            onChange={onChangeHandler}
                            checked={item.Selected}
                          />
                          <label htmlFor={item.Id}></label>
                        </div>
                        <div className='checkbox-content'>
                          <span>
                            {item.Name} ({item.Count} provider
                            <span>{item.Count !== 1 ? 's' : ''}</span>)
                          </span>
                        </div>
                      </div>
                    ))
                  : filterType.toLowerCase() == 'specialty'
                  ? specialties.map((item, index) => (
                      <div key={index} className='inner-container'>
                        <div className='radio'>
                          <label className='radio-button'>
                            <input
                              type='radio'
                              id={item.FilterValue}
                              className='radio-button__input'
                              value={item.FilterValue}
                              checked={selectedSpecialtiesOption === item.FilterValue}
                              onChange={onChangeHandler}
                            />
                            <span className='radio-button__control'></span>
                          </label>
                          <div>
                            <span className='radio-text'>
                              {item.Name} ({item.Count} provider
                              <span>{item.Count !== 1 ? 's' : ''}</span>)
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  : missingFields.map((item, index) => (
                      <div key={index} className='inner-container'>
                        <div className='radio'>
                          <label className='radio-button'>
                            <input
                              type='radio'
                              id={item.FilterValue}
                              className='radio-button__input'
                              value={item.FilterValue}
                              checked={selectedOption === item.FilterValue}
                              onChange={onChangeHandler}
                            />
                            <span className='radio-button__control'></span>
                          </label>
                          <div>
                            <span className='radio-text'>
                              {item.Name} ({item.Count} provider
                              <span>{item.Count !== 1 ? 's' : ''}</span>)
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
              </div>
              <div className='panel-end'></div>
              <div className='panel-divider'></div>
              <div className='filter-grps-footer'>
                {filterType.toLowerCase() == 'practice' ? (
                  <button onClick={(e) => handleClear(e, 'practice')} className='cancel-btn'>
                    Clear
                  </button>
                ) : filterType.toLowerCase() == 'specialty' ? (
                  <button onClick={(e) => handleClear(e, 'specialty')} className='cancel-btn'>
                    Clear
                  </button>
                ) : filterType.toLowerCase() == 'missing' ? (
                  <button onClick={(e) => handleClear(e, 'missing')} className='cancel-btn'>
                    Clear
                  </button>
                ) : (
                  ''
                )}
                {filterType.toLowerCase() == 'practice' ? (
                  <button
                    onClick={(e) => applyFilters(e, 'practice')}
                    className={`${pracBbtn > 0 ? 'btn-active' : 'btn-disabled'}`}>
                    Apply
                  </button>
                ) : filterType.toLowerCase() == 'specialty' ? (
                  <button
                    onClick={(e) => applyFilters(e, 'specialty')}
                    className={`${specialityBtn ? 'btn-active' : 'btn-disabled'}`}>
                    Apply
                  </button>
                ) : filterType.toLowerCase() == 'missing' ? (
                  <button
                    onClick={(e) => applyFilters(e, 'missing')}
                    className={`${missingBtn ? 'btn-active' : 'btn-disabled'}`}>
                    Apply
                  </button>
                ) : (
                  ''
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

QuickFilters.propTypes = {
  practices: PropTypes.array,
  specialties: PropTypes.array,
  missingFields: PropTypes.array,
  filterType: PropTypes.string,
  action: PropTypes.func,
  clear: PropTypes.func,
  applyQuickFilter: PropTypes.func,
  showFilters: PropTypes.func
};

export default QuickFilters;
