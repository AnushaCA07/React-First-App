import './_spinner.less';
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

function Spinner(props) {
  const spinnerClass = {
    'cta-button': props.cta,
    'download-report-spinner': props.downloadReportSpinner,
    'full-page-spinner': !props.downloadReportSpinner
  };

  return (
    <div className={classNames(spinnerClass)}>
      <div className="spin-hold">
        <div className="spin" />
      </div>
    </div>
  );
}

Spinner.propTypes = {
  cta: PropTypes.bool,
  downloadReportSpinner: PropTypes.bool
};

export default Spinner;
