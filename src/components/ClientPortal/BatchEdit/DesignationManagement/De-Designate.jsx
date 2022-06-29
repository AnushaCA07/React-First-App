import React, { Fragment} from 'react';
import PropTypes from 'prop-types';

const Desigante = (props) => {
  const { name } = props;
  return (
    <Fragment>
      <div className='designation-modal-row designate-provider'>
        <div className='designation-container'>
          <h3 className='de-designation-title'>De-designate {name}?</h3>
          <div className='line-break'> </div>
          <div className='confirmation-text'> Are you sure you want to de-designate {name}?</div>
        </div>
      </div>
    </Fragment>
  );
};

Desigante.propTypes = {
  name: PropTypes.string
};

export default Desigante;
