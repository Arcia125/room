import { gql } from 'apollo-boost';

const SEND_MESSAGE = gql`
  mutation SendMessage($roomId: ID!, $content: String!) {
    sendMessage(roomId: $roomId, content: $content) {
      id
    }
  }
`;

export { SEND_MESSAGE };
