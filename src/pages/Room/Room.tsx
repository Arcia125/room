import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { RouteComponentProps } from 'react-router';

import StyledRoom from '../../components/styles/Room';
import UserList from '../../components/UserList';
import { SEND_MESSAGE } from '../../graphql/sendMessage';
import { Button } from '../../components/styles/Button';
import { useActiveRoom } from '../../hooks/useActiveRoom';

interface RoomMessage {
  id: string;
  content: string;
}

const Room: React.FunctionComponent<
  RouteComponentProps<{ roomId: string }>
> = ({
  match: {
    params: { roomId },
  },
}) => {
  const [userMessage, setUserMessage] = React.useState('');
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUserMessage(event.target.value);

  const { roomQuery } = useActiveRoom(roomId);

  const room = roomQuery.data && roomQuery.data.room;

  const handleSendMessageComplete = () => setUserMessage('');

  const [sendMessage, sendMessageMutation] = useMutation(SEND_MESSAGE, {
    variables: { roomId, content: userMessage },
    onCompleted: handleSendMessageComplete,
  });

  const handleSend = () => {
    if (userMessage.length) {
      sendMessage();
    }
  };

  const submitIfEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
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
      <StyledRoom>
        <UserList users={room.users} />
        <div className="chatbox">
          <h1 className="chatbox__header">{room.name}</h1>
          <ul className="chatbox__message-list">
            {room.messages.map((message: RoomMessage) => (
              <li key={message.id} className="chatbox__message-list--item">
                {message.content}
              </li>
            ))}
          </ul>
          <div className="chatbox__input">
            <input
              className="chatbox__input--field"
              value={userMessage}
              onChange={handleInputChange}
              onKeyDown={submitIfEnter}
            />
            <Button
              className="chatbox__input--button"
              color="primary"
              onClick={handleSend}
            >
              {sendMessageMutation.loading ? 'sending...' : 'send'}
            </Button>
          </div>
        </div>
      </StyledRoom>
    );
  }

  return (
    <div className="room-page">
      <header className="room-page__header">Chat</header>
      {content}
    </div>
  );
};

export default Room;
