import { User } from './User';
import { Message } from './Message';

export interface Room {
  id: String;
  name: String;
  users: User[];
  messages: Message[];
}
