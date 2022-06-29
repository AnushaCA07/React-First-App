import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

export const DropDown = props => {
  const { options, userSelection, onChangeHandler } = props;

  const dropDownOptions = options.map(data => <option key={data} value={data}>{data}</option>);
  return (
    <Fragment>
      <select
        name={options[0]}
        className="search-box search-box-no-border-right width-12"
        onChange={onChangeHandler}
        value={userSelection}
      >
        {dropDownOptions}
      </select>
    </Fragment>
  );
};

DropDown.propTypes = {
  onChangeHandler: PropTypes.func,
  userSelection: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string)
};
