import { gql } from 'apollo-boost';

const typeDefs = gql`
  type Message {
    id: ID!
    content: String
  }

  interface PublicUser {
    id: ID!
    username: String
    avatar: String
  }

  type ChatUser implements PublicUser {
    id: ID!
    username: String
    avatar: String
  }

  type User implements PublicUser {
    id: ID!
    username: String
    avatar: String
    email: String
    firstName: String
    lastName: String
  }

  type AuthPayload {
    token: String
    user: User
  }

  type Room {
    id: ID!
    name: String
    messages: [Message]!
    users: [ChatUser]!
  }

  type SuccessResult {
    success: Boolean!
  }

  type Query {
    rooms: [Room]
    room(id: ID!): Room
  }

  type Mutation {
    createUser(username: String): AuthPayload
    claimAccount(email: String, password: String): AuthPayload
    login(username: String!, password: String!): AuthPayload
    addRoom(name: String): Room
    sendMessage(roomId: ID!, content: String!): Message
    joinRoom(roomId: ID!): SuccessResult
  }

  type Subscription {
    newRoomMessage(roomId: ID!): Message
    newRoomUser(roomId: ID!): ChatUser
  }
`;

export { typeDefs };
