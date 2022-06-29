import React, { useState, useEffect, Fragment } from 'react';
import '@hg/joy/src/globalstyles';
import './_menu.less';
import PropTypes from 'prop-types';
import * as constants from '../../../utils/constant-data';

//media imports
import Logo from '../../../assets/images/healthgrades_headerlogo.svg';

const MenuComponent = (props) => {
  //const [sections, setSections] = useState(constants.menuSections);
  const [scrolled, setScrolled] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Handle classes
  let menuClasses = ['menu-container'];
  if (!props.showMenus) {
    menuClasses.push('menu-height');
  }
  if (scrolled) {
    menuClasses.push('scrolled');
  }

  return (
    <div className={menuClasses.join(' ')}>
      <div className='logo'>
        <a href='https://www.healthgrades.com/' alt='Home'>
          <img src={Logo} alt='Healthgrades' />
        </a>
      </div>

      <div className='btn-right'>
        <a href='/' alt='Home' className='btn'>
          Log In
        </a>
      </div>
    </div>
  );
};

MenuComponent.propTypes = {
  menuClick: PropTypes.func,
  showMenus: PropTypes.bool
};

export default MenuComponent;
