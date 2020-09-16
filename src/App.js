import React from 'react';
import logo from './logo.svg';
import './App.css';

import Gene from './components/gene';

function App() {
  return (
    <>
    <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="/">
          <img src={logo} className="App-logo" alt="logo" />
          Ensembl Gene Position
        </a>
    </nav>
    <main role="main" className="mt-3 container">  
      <Gene />
    </main>
    </>
  );
}

export default App;
