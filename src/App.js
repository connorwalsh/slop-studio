import React from 'react';
import logo from './logo.svg';
import {WEBGL} from './CheckWebGL'
import './App.css';
import Workbench from './workbench'


function App() {
  return (
    <div className="App">
      <div>header</div>
      <Workbench/>
      <div>
        {
          WEBGL.isWebGLAvailable() ? "all good" : "Oops, webGL isn't available in your browser."
        }
      </div>
    </div>
  );
}

export default App;
