import React from 'react';
import { useSubscription } from '@apollo/react-hooks';
import { OnSubscriptionDataOptions } from '@apollo/react-common';

import { NEW_ROOM_MESSAGE } from '../graphql/newRoomMessage';
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

export const useActiveRoom = (roomId: string) => {
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
