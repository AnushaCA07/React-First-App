import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

export const Radio = props => {
  const { optionValue, optionLabel, selectedOption, onChangeHandler } = props;
  return (
    <Fragment>
      <label className="radio-button">
        <input
          type="radio"
          className="radio-button__input"
          value={optionValue}
          checked={selectedOption === optionValue}
          onChange={onChangeHandler}
          disabled={optionValue == 'administrativeusers'}
        />
        <span className="radio-button__control"></span>
        <span className="radio-button__label">{optionLabel}</span>
      </label>
    </Fragment>
  );
};

Radio.propTypes = {
  optionValue: PropTypes.string,
  onChangeHandler: PropTypes.func,
  optionLabel: PropTypes.string,
  selectedOption: PropTypes.string
};
