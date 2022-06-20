import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import FirstComponent from "./FirstComponent";
import Registration from './Registration';
import Confirmation from './Confirmation';
import Verify from './Verify';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

function App() {
  const [counter, increment] = React.useState(0); // state variable  
  //=> increment is method to change state value
  const increm = event => increment(counter + 1);

  return (
    <div className="App">


<Tabs>

    <TabList>
      <Tab> Registration </Tab>
      <Tab> Confirmation </Tab>
      <Tab> Verify </Tab>
    </TabList>

    <TabPanel>
    <Registration  />
    </TabPanel>
    <TabPanel>
    <Confirmation />
    </TabPanel>
    <TabPanel>
    <Verify/>
    </TabPanel>
  </Tabs>

      
      
    </div>
  );
}

export default App;
