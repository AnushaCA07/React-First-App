import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import FirstComponent from "./FirstComponent";
import Registration from './Registration';
import confirmation from './confirmation';

function App() {
  const [counter, increment] = React.useState(0); // state variable  
  //=> increment is method to change state value
  const increm = event => increment(counter + 1);

  return (
    <div className="App">

      {/* calling FirstComponent component */}
      {/* <FirstComponent name="SampleData" id="1044" />props => Passing data to another components */}
      <Registration  />
      <confirmation />

      {/* <p>{counter}</p>
      <button onClick={increm}>Click</button> */}

    </div>
  );
}

export default App;
