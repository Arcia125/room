import mongoose from 'mongoose';
import { User } from './user';
import { Message } from './message';
import config from '../../config';

const connectDb = () => {
  return mongoose.connect(config.DATABASE_URL);
};

const models = { User, Message };

export { connectDb };

export default models;
