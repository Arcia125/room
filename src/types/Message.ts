import { User } from './User';

export interface Message {
  id: String;
  content: String;
  user: User;
}
