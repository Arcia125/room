import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';

import logo from '../logo.svg';

const Home = props => {
  const [createRoom, {data, loading, error }] = useMutation()
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Create a room to get started</p>
        <button className="create-room-button">create a room</button>
      </header>
    </div>
  );
};

Home.propTypes = {};

export default Home;
