import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Radio } from './Radio';

export const RadioGroup = (props) => {
  const { radioGroup, selectedOption, onChangeHandler } = props;

  return radioGroup.map((radioOption) => (
    <Fragment key={radioOption.Value}>
      {radioOption.Show && (
        <Radio
          optionLabel={radioOption.Name}
          optionValue={radioOption.Value}
          selectedOption={selectedOption}
          onChangeHandler={onChangeHandler}
        />
      )}
    </Fragment>
  ));
};

RadioGroup.propTypes = {
  radioGroup: PropTypes.array,
  selectedOption: PropTypes.string,
  onChangeHandler: PropTypes.func,
};
