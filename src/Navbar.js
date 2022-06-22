import React from 'react';
import './Navbar.css';

function Navbar(props) {
  return props.menu.map(function (menu) {
    return (
      <div>
        <div className="topnav" key={menu.Name}>
          <span>
            <a href={menu.Url}><h4>{menu.Name}</h4></a>
            <p>Test</p>
          </span>
        </div>
      </div>
    );
  });
}

export default Navbar;