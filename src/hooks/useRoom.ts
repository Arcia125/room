import { useQuery } from '@apollo/react-hooks';

import { GET_ROOM } from '../graphql/getRoom';

export const useRoom = (roomId: string) =>
  useQuery(GET_ROOM, { variables: { id: roomId } });
