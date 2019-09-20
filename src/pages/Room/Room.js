import React from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';

import StyledRoom from '../../components/styles/Room';
import UserList from '../../components/UserList';
import { GET_ROOM } from '../../graphql/getRoom';
import { SEND_MESSAGE } from '../../graphql/sendMessage';
import { Button } from '../../components/styles/Button';
import { NEW_ROOM_MESSAGE } from '../../graphql/newRoomMessage';

const useRoom = roomId => useQuery(GET_ROOM, { variables: { id: roomId } });

/**
 * @description Hack added to force rerenders when a new message arrives.
 * Without this, users won't receive updates until the component rerenders
 * on it's own. (when the message box updates, or other state changes)
 *
 * @deprecated hack to force rerenders
 *
 * @TODO remove when we figure out how to make the roomQuery update when
 * it is updated in the cache (ex with roomQuery.updateQuery or client.writeQuery)
 */
const useHackyUpdater = () => {
  const [_, setUpdate] = React.useState(false);

  /**
   * @description toggle state between true and false
   */
  const forceUpdate = () => setUpdate(prev => !prev);

  return forceUpdate;
};

const useActiveRoom = roomId => {
  const roomQuery = useRoom(roomId);

  /**
   * Forces updates when a new message is send. Shouldn't be necessary,
   * but the roomQuery isn't updating otherwise.
   *
   * @TODO remove when cache updates for
   */
  const hackyForceUpdate = useHackyUpdater();

  /**
   * @description updates the room query
   */
  const updateRoomQuery = ({ subscriptionData, client }) => {
    if (!subscriptionData.data) return;

    const { newRoomMessage } = subscriptionData.data;

    // copy previous query data
    const newData = {
      ...roomQuery.data
    };

    // add new message to data
    newData.room.messages = [...newData.room.messages, newRoomMessage];

    // update query in cache

    // const newQuery = {
    //   query: GET_ROOM,
    //   variables: roomQuery.variables,
    //   data: newData,
    // };
    // client.writeQuery(newQuery);

    roomQuery.updateQuery(
      previousQueryResult => {
        return newData;
      },
      {
        variables: roomQuery.variables
      }
    );

    /**
     * Necessary to force an update for roomQuery, see definition for further explanation
     *
     * @TODO remove once this function is no longer necessary to force an update to roomQuery
     */
    hackyForceUpdate();
  };

  const newMessageSubscription = useSubscription(NEW_ROOM_MESSAGE, {
    variables: { roomId },
    onSubscriptionData: updateRoomQuery
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
    console.log('room', room);
    content = (
      <StyledRoom>
        <UserList users={room.users} />
        <div className="chatbox">
          <h1 className="chatbox__header">{room.name}</h1>
          <ul className="chatbox__message-list">
            {room.messages.map(message => (
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

Room.propTypes = {
  match: PropTypes.object
};

export default Room;
