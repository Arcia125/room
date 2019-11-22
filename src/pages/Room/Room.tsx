import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { RouteComponentProps } from 'react-router';

import StyledRoom from '../../components/styles/Room';
import UserList from '../../components/UserList';
import { SEND_MESSAGE } from '../../graphql/sendMessage';
import { Button } from '../../components/styles/Button';
import { useActiveRoom } from '../../hooks/useActiveRoom';
import MainLayout from '../../components/MainLayout';
import SendButton from '../../components/SendButton';

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
            <SendButton
              className="chatbox__input--button"
              color="primary"
              onClick={handleSend}
            ></SendButton>
            {/* <Button
              className="chatbox__input--button"
              color="primary"
              onClick={handleSend}
            >
              {sendMessageMutation.loading ? (
                '...'
              ) : (
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0)">
                    <path
                      d="M11.7683 21.5379L17.3812 6.36591L2.52139 12.7597L6.11252 16.1786L14.4552 9.44821L8.16739 18.1293L11.7683 21.5379Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect
                        width="17"
                        height="17"
                        fill="white"
                        transform="translate(0 12.3292) rotate(-46.4893)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              )}
            </Button> */}
          </div>
        </div>
      </StyledRoom>
    );
  }

  return (
    <MainLayout>
      <div className="room-page">
        <header className="room-page__header">Chat</header>
        {content}
      </div>
    </MainLayout>
  );
};

export default Room;
