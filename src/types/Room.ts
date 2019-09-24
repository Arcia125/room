import { User } from './User';
import { Message } from './Message';

export interface Room {
  id: string;
  name: string;
  users: User[];
  messages: Message[];
}
