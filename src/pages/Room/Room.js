import React from 'react';
import PropTypes from 'prop-types';
import {
  useQuery,
  useMutation,
  useLazyQuery,
  useSubscription
} from '@apollo/react-hooks';

import { GET_ROOM } from '../../graphql/getRoom';
import { SEND_MESSAGE } from '../../graphql/sendMessage';
import { Button } from '../../components/styled/Button';
import { NEW_ROOM_MESSAGE } from '../../graphql/newRoomMessage';

const useRoom = roomId => useQuery(GET_ROOM, { variables: { id: roomId } });

const useActiveRoom = roomId => {
  const roomQuery = useRoom(roomId);

  const updateQuery = ({ subscriptionData, client }) => {
    if (!subscriptionData.data) return;

    const { newRoomMessage } = subscriptionData.data;

    // copy previous query data
    const newData = {
      ...roomQuery.data
    };

    // add new message to data
    newData.room.messages = [...newData.room.messages, newRoomMessage];

    // update query in cache
    const newQuery = {
      query: GET_ROOM,
      variables: roomQuery.variables,
      data: newData
    };
    client.writeQuery(newQuery);
  };

  // subscribeToMore version. Gives less control, but comes with a built in updateQuery method.
  // React.useEffect(() => {
  //   roomQuery.subscribeToMore({
  //     document: NEW_ROOM_MESSAGE,
  //     variables: { roomId },
  //     updateQuery: (prev, { subscriptionData }) => {
  //       if (!subscriptionData.data) return prev;
  //       const newRoomMessage = subscriptionData.data.newRoomMessage;
  //       // copy previous data.
  //       const newData = { ...prev };
  //       // add new room message to room's messages.
  //       newData.room.messages = [...prev.room.messages, newRoomMessage];
  //       return newData;
  //     },
  //   });
  // }, [roomId]);

  const newMessageSubscription = useSubscription(NEW_ROOM_MESSAGE, {
    variables: { roomId },
    onSubscriptionData: updateQuery
  });

  return { roomQuery, newMessageSubscription };
};

const Room = ({
  match: {
    params: { roomId }
  }
}) => {
  const [userMessage, setUserMessage] = React.useState('');
  const handleInputChange = event => setUserMessage(event.target.value);

  // const roomId = match.params.roomId;

  const { roomQuery, newMessageSubscription } = useActiveRoom(roomId);

  const room = roomQuery.data && roomQuery.data.room;

  const handleSendMessageComplete = () => setUserMessage('');

  const [sendMessage, sendMessageMutation] = useMutation(SEND_MESSAGE, {
    variables: { roomId, content: userMessage },
    onCompleted: handleSendMessageComplete
  });

  const handleSend = () => {
    if (userMessage.length) {
      sendMessage();
    }
  };

  const submitIfEnter = event => {
    const enterPressed = event.keyCode === 13;
    if (!enterPressed) return;
    handleSend();
  };

  let content;
  if (roomQuery.loading) {
    content = 'loading...';
  }

  if (roomQuery.error) {
    content = roomQuery.error.message;
  }

  if (room) {
    content = (
      <main className="room-page-content">
        <h1 className="room-page-content__header">{room.name}</h1>
        <ul className="message-list">
          {room.messages.map(message => (
            <li key={message.id} className="message-list__item">
              {message.content}
            </li>
          ))}
        </ul>
        <input
          className="room-page-content__user-input"
          value={userMessage}
          onChange={handleInputChange}
          onKeyDown={submitIfEnter}
        />
        <Button color="primary" onClick={handleSend}>
          {sendMessageMutation.loading ? 'sending...' : 'send'}
        </Button>
      </main>
    );
  }

  return (
    <div className="room-page">
      <header className="room-page-header"></header>
      {content}
    </div>
  );
};

Room.propTypes = {
  match: PropTypes.object
};

export default Room;
