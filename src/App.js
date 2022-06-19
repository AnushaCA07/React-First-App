import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import FirstComponent from "./FirstComponent";
import Registration from './Registration';
import Confirmation from './Confirmation';
import Verify from './Verify';

function App() {
  const [counter, increment] = React.useState(0); // state variable  
  //=> increment is method to change state value
  const increm = event => increment(counter + 1);

  return (
    <div className="App">

      <Registration  />
      <Confirmation />
      <Verify/>
    </div>
  );
}

export default App;
