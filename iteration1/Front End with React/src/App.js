import React from 'react';
import logo from './logo.png';
import './App.css';
import MyUpload from '../src/upload'
// import Convert from '../src/marp'
// import InputFileReader from '../src/marked'

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
      <div className="App">
          <header className="App-header">
              <img src={logo} className="App-logo" alt="logo"/>

              <MyUpload></MyUpload>


              <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                  Learn QuizHero
              </a>
          </header>
      </div>
  );
}

export default App;
