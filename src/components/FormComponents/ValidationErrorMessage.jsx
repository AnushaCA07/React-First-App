import React from 'react';
import './_validationErrorMessage.less';
import { PropTypes } from 'prop-types';

const ValidationErrorMessage = props => {
  const { message } = props;
  return (
    <span className="Validation-error-message">
      {message}
    </span>
  );
};
ValidationErrorMessage.propTypes = { message: PropTypes.string };
export default ValidationErrorMessage;
