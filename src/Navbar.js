import React from 'react';

function Navbar(props) {
    return props.menu.map(function(menu) {
      return (
        <div key={menu.Name}>
          <span>
            <a href={menu.Url}><h4>{menu.Name}</h4></a>
          </span>
        </div>
      );
    }); 
  }
  
  export default Navbar;