import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';

import logo from '../../logo.svg';
import { ADD_ROOM } from '../../graphql/addRoom';
import { HomePage } from './styles';
import { Button } from '../../components/styles/Button';

const roomNames = ['test1', 'test2'];

const Home = ({ history }) => {
  const [addRoom, addRoomMutation] = useMutation(ADD_ROOM, {
    variables: { name: roomNames[Math.random() > 0.5 ? 0 : 1] }
  });

  const addedRoomId = addRoomMutation.data && addRoomMutation.data.addRoom.id;

  React.useEffect(() => {
    if (addedRoomId || addedRoomId === 0) {
      history.push(`/r/${addedRoomId}`);
    }
  }, [addedRoomId]);
  console.log('Donte was here');

  const handleCreateRoom = () => addRoom();

  return (
    <HomePage>
      <header className="home-page-header">
        <img src={logo} className="home-page-logo" alt="logo" />
        <p>Create a room to get started</p>
        <Button color="primary" padding="2" onClick={handleCreateRoom}>
          {addRoomMutation.loading ? 'loading...' : 'create a room'}
        </Button>
      </header>
    </HomePage>
  );
};

Home.propTypes = {};

export default Home;
