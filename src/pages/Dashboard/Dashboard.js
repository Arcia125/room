import React from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { GET_CURRENT_USER } from '../../graphql/getCurrentUser';
import { ADD_ROOM } from '../../graphql/addRoom';
import { Button } from '../../components/styles/Button';

const roomNames = ['test1', 'test2'];

const Dashboard = ({ history }) => {
  const getCurrentUserQuery = useQuery(GET_CURRENT_USER);

  const [addRoom, addRoomMutation] = useMutation(ADD_ROOM, {
    variables: { name: roomNames[Math.random() > 0.5 ? 0 : 1] }
  });

  const addedRoomId = addRoomMutation.data && addRoomMutation.data.addRoom.id;

  React.useEffect(() => {
    if (addedRoomId || addedRoomId === 0) {
      history.push(`/r/${addedRoomId}`);
    }
  });

  const handleCreateRoom = () => {
    addRoom();
  };

  if (getCurrentUserQuery.loading) return 'Loading...';
  if (getCurrentUserQuery.error) return getCurrentUserQuery.error.message;
  return (
    <div>
      <h1>
        {getCurrentUserQuery.data &&
          getCurrentUserQuery.data.currentUser &&
          getCurrentUserQuery.data.currentUser.username}
        's dashboard
      </h1>
      <p>Create a room to get started</p>
      <Button color="primary" padding="2" onClick={handleCreateRoom}>
        {getCurrentUserQuery.loading || addRoomMutation.loading
          ? 'loading...'
          : 'create a room'}
      </Button>
    </div>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
