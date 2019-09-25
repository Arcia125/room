import { User } from './User';

export interface Message {
  id: string;
  content: string;
  user: User;
}
