import React from 'react';
import './Navbar.css';

function Navbar(props) {
  return props.menu.map(function (menu) {
    return (
      <div>
        <div class="topnav" key={menu.Name}>
          <span>
            <a href={menu.Url}><h4>{menu.Name}</h4></a>
          </span>
        </div>
      </div>
    );
  });
}

export default Navbar;