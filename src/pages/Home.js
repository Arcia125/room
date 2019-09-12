import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';

import logo from '../logo.svg';
import { ADD_ROOM } from '../graphql/addRoom';

const roomNames = [
  'test1',
  'test2',
];

const Home = ({ history }) => {
  const [addRoom, {data, loading, error }] = useMutation(ADD_ROOM, { variables: { name: roomNames[Math.random() > .5 ? 0 : 1] }});

  React.useEffect(() => {
    if (data && data.addRoom && data.addRoom.id) {
      history.push(`/r/${data.addRoom.id}`);
    }
  }, [data && data.addRoom && data.addRoom.id]);

  const handleCreateRoom = () => addRoom();

  return (
    <div className="home-page">
      <header className="home-page-header">
        <img src={logo} className="home-page-logo" alt="logo" />
        <p>Create a room to get started</p>
        <button className="create-room-button" onClick={handleCreateRoom}>create a room</button>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </header>
    </div>
  );
};

Home.propTypes = {};

export default Home;
