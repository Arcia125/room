import React from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { GET_ROOM } from '../graphql/getRoom';
import { SEND_MESSAGE } from '../graphql/sendMessage';

const Room = ({ match }) => {
  const [userMessage, setUserMessage] = React.useState('');
  const handleInputChange = event => setUserMessage(event.target.value);

  const roomId = match.params.roomId;

  const roomQuery = useQuery(GET_ROOM, { variables: { id: roomId } });

  const room = roomQuery.data && roomQuery.data.room;

  const handleSendMessageComplete = () => setUserMessage('');

  const [sendMessage, sendMessageMutation] = useMutation(SEND_MESSAGE, {
    variables: { roomId, content: userMessage },
    onCompleted: handleSendMessageComplete
  });

  const handleSend = event => {
    if (userMessage.length) {
      sendMessage();
    }
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
            <li className="message-list__item">{message.content}</li>
          ))}
        </ul>
        <input
          className="room-page-content__user-input"
          value={userMessage}
          onChange={handleInputChange}
        />
        <button className="room-page-content__send-button" onClick={handleSend}>
          send
        </button>
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

Room.propTypes = {};

export default Room;
