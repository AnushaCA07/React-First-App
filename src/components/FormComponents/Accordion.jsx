/** @format */

import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Chevron from './Chevron';
import './_accordion.less';
import { useStore } from 'react-redux';

const Accordion = (props) => {
  const { header, children, title, childsecheight, ...rest } = props;

  const [setHeight, setHeightState] = useState('0px');
  const [setActive, setActiveState] = useState('');
  const [setRotate, setRotateState] = useState('accordion__icon');

  const [toggleActive, setToggleActive] = useState(false);

  const content = useRef(null);

  useEffect(() => {
    if (childsecheight > 0 && toggleActive) {
      setHeightState(
        setActive !== 'active'
          ? '0px'
          : `${content.current.scrollHeight + 50 + childsecheight}px`
      );
    }
  }, [childsecheight]);

  const toggleAccordion = () => {
    setToggleActive(true);
    setActiveState('active');
    setActiveState(setActive === '' ? 'active' : '');
    setHeightState(
      setActive === 'active' ? '0px' : `${content.current.scrollHeight + 50}px`
    );
    setRotateState(
      setActive === 'active' ? 'accordion__icon' : 'accordion__icon rotate'
    );
  };

  return (
    <div className='accordion__section'>
      <div className={`accordion ${setActive}`} onClick={toggleAccordion}>
        {header}
        <Chevron className={`${setRotate}`} width={10} fill={'#777'} />
      </div>

      <div
        ref={content}
        style={{ maxHeight: `${setHeight}` }}
        className='accordion__section'
      >
        <div className='accordion__content'>{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
