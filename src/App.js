import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Create a room to get started
        </p>
        <button
          className="create-room-button"
        >
          Create a room
        </button>
      </header>
    </div>
  );
}

export default App;
