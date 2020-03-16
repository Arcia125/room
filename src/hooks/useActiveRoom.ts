import React from 'react';
import { useSubscription, useMutation, useQuery } from '@apollo/react-hooks';
import {
  OnSubscriptionDataOptions,
  SubscriptionResult,
} from '@apollo/react-common';

import { NEW_ROOM_MESSAGE } from '../graphql/newRoomMessage';
import { NEW_ROOM_USER } from '../graphql/newRoomUser';
import { JOIN_ROOM } from '../graphql/joinRoom';
import { useRoom } from './useRoom';
import { GET_CURRENT_USER } from '../graphql/getCurrentUser';
import { User } from '../types/User';

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
  const [, setUpdate] = React.useState(false);
  /**
   * @description toggle state between true and false
   */
  const forceUpdate = () => setUpdate(prev => !prev);
  return forceUpdate;
};

type GetUpdatedDataFunc = (subscriptionData: SubscriptionResult<any>) => any;

export const useActiveRoom = (roomId: string) => {
  const roomQuery = useRoom(roomId);

  const room = roomQuery.data && roomQuery.data.room;
  /**
   * Forces updates when a new message is send. Shouldn't be necessary,
   * but the roomQuery isn't updating otherwise.
   *
   * @TODO remove when cache updates for
   */
  const hackyForceUpdate = useHackyUpdater();

  const updateRoomQuery = (newData: any) => {
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

  const createRoomQueryUpdater = (getUpdatedData: GetUpdatedDataFunc) => ({
    subscriptionData,
    client,
  }: OnSubscriptionDataOptions<any>) => {
    if (!subscriptionData.data) return;

    const newData = getUpdatedData(subscriptionData);

    updateRoomQuery(newData);
  };

  /**
   * @description funciton tha tupdates the room whenever a new message is received
   */
  const newMessageUpdater = createRoomQueryUpdater(subscriptionData => {
    const newData = {
      ...roomQuery.data,
    };

    const { newRoomMessage } = subscriptionData.data;

    newData.room.messages = [...newData.room.messages, newRoomMessage];

    return newData;
  });

  /**
   * @description function that updates the room whenever new users join
   */
  const newUserUpdater = createRoomQueryUpdater(subscriptionData => {
    const newData = {
      ...roomQuery.data,
    };

    const { newRoomUser } = subscriptionData.data;

    newData.room.users = [...newData.room.users, newRoomUser];

    return newData;
  });

  const currentUserQuery = useQuery(GET_CURRENT_USER);

  const [joinRoom, joinRoomMutation] = useMutation(JOIN_ROOM, {
    onCompleted: data => {
      // Whenever this mutation completes, add the current user to the room if not already present
      if (data.joinRoom && data.joinRoom.success) {
        const currentUser: User = currentUserQuery.data.currentUser;

        // don't add user to the current room unless already present
        if (!room.users.find((user: User) => user.id === currentUser.id)) {
          const newData = {
            ...roomQuery.data,
          };

          newData.room.users = [...newData.room.users, currentUser];

          updateRoomQuery(newData);
        }
      }
    },
  });

  const newMessageSubscription = useSubscription(NEW_ROOM_MESSAGE, {
    variables: { roomId },
    onSubscriptionData: newMessageUpdater,
  });

  const newUserSubscription = useSubscription(NEW_ROOM_USER, {
    variables: { roomId },
    onSubscriptionData: newUserUpdater,
  });

  React.useEffect(() => {
    if (typeof roomId === 'number') {
      joinRoom({ variables: { roomId } });
    }
    // disable eslint to prevent joinRoom and room from being included in the dependencies list
    // eslint-disable-next-line
  }, [roomId]);

  return { roomQuery, newMessageSubscription, newUserSubscription };
};
