import React, { useState } from 'react';
import './_index.less';

//styling imports
import '@hg/joy/src/globalstyles';

//components imports
import HeroSection from './HeroSection';
import Body from './Body';
import MenuComponent from '../Common/Menu/Menu';
import Footer from '../Common/Footer/Footer';

const Index = (props) => {
  const [currentTab, setCurrentTab] = useState('login');

  const menuClick = (section) => {
    setCurrentTab(section);
  };

  return (
    <>
      <MenuComponent menuClick={menuClick} showMenus={true} />
      <HeroSection />
      <Body />
      <Footer />
    </>
  );
};

Index.propTypes = {};

export default Index;
