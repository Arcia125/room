import React from 'react';
import PropTypes from 'prop-types';
import { useLazyQuery } from '@apollo/react-hooks';

import { GET_ROOM } from '../graphql/getRoom';


const Room = ({ match }) => {
  const [getRoom, { data, loading, error }] = useLazyQuery(GET_ROOM);

  React.useEffect(() => {
    if (match.params.roomId) {
      getRoom({ variables: { id: match.params.roomId } });
    }
  }, [match.params.roomId])

  return (
    <div className="App">
      <header className="App-header">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </header>
    </div>
  );
};

Room.propTypes = {};

export default Room;
