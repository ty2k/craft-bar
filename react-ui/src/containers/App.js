import React from 'react';
import logo from '../images/mugs.svg';
import './App.css';
import BeerList from './BeerList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="Craft Bar logo" />
        <BeerList/>
      </header>
    </div>
  );
}

export default App;
