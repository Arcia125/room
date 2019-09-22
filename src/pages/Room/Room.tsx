import React from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import { RouteComponentProps } from 'react-router';

import StyledRoom from '../../components/styles/Room';
import UserList from '../../components/UserList';
import { GET_ROOM } from '../../graphql/getRoom';
import { SEND_MESSAGE } from '../../graphql/sendMessage';
import { Button } from '../../components/styles/Button';
import { NEW_ROOM_MESSAGE } from '../../graphql/newRoomMessage';
import { OnSubscriptionDataOptions } from '@apollo/react-common';

const useRoom = (roomId: string) =>
  useQuery(GET_ROOM, { variables: { id: roomId } });

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

const useActiveRoom = (roomId: string) => {
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
  const updateRoomQuery = ({
    subscriptionData,
    client
  }: OnSubscriptionDataOptions<any>) => {
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

    roomQuery.updateQuery((previousQueryResult: any) => {
      return newData;
    });

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

interface RoomMessage {
  id: string;
  content: string;
}

const Room: React.FunctionComponent<
  RouteComponentProps<{ roomId: string }>
> = ({
  match: {
    params: { roomId }
  }
}) => {
  const [userMessage, setUserMessage] = React.useState('');
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUserMessage(event.target.value);

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
