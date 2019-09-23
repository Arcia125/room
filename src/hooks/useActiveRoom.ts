import React from 'react';
import { useSubscription } from '@apollo/react-hooks';
import {
  OnSubscriptionDataOptions,
  SubscriptionResult
} from '@apollo/react-common';

import { NEW_ROOM_MESSAGE } from '../graphql/newRoomMessage';
import { NEW_ROOM_USER } from '../graphql/newRoomUser';
import { useRoom } from './useRoom';

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

  /**
   * Forces updates when a new message is send. Shouldn't be necessary,
   * but the roomQuery isn't updating otherwise.
   *
   * @TODO remove when cache updates for
   */
  const hackyForceUpdate = useHackyUpdater();

  const createRoomQueryUpdater = (getUpdatedData: GetUpdatedDataFunc) => ({
    subscriptionData,
    client
  }: OnSubscriptionDataOptions<any>) => {
    if (!subscriptionData.data) return;

    const newData = getUpdatedData(subscriptionData);

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

  /**
   * @description funciton tha tupdates the room whenever a new message is received
   */
  const newMessageUpdater = createRoomQueryUpdater(subscriptionData => {
    const newData = {
      ...roomQuery.data
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
      ...roomQuery.data
    };

    const { newRoomUser } = subscriptionData.data;

    newData.room.users = [...newData.room.users, newRoomUser];

    return newData;
  });

  const newMessageSubscription = useSubscription(NEW_ROOM_MESSAGE, {
    variables: { roomId },
    onSubscriptionData: newMessageUpdater
  });

  const newUserSubscription = useSubscription(NEW_ROOM_USER, {
    variables: { roomId },
    onSubscriptionData: newUserUpdater
  });

  return { roomQuery, newMessageSubscription, newUserSubscription };
};
