import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

export const TextBox = (props) => {
  const {
    classes,
    textValue,
    onChangeHandler,
    placeHolder,
    onKeyPressed,
    maxlength,
  } = props;

  return (
    <Fragment>
      <input
        type='text'
        value={textValue}
        onChange={onChangeHandler}
        placeholder={placeHolder}
        onKeyPress={onKeyPressed}
        className={`'${classes}'`}
        maxLength={maxlength}
      />
    </Fragment>
  );
};

TextBox.propTypes = {
  onChangeHandler: PropTypes.func,
  textValue: PropTypes.string,
  placeHolder: PropTypes.string,
  onKeyPressed: PropTypes.func,
  classes: PropTypes.string,
  maxlength: PropTypes.number,
};
