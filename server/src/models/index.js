import mongoose from "mongoose";

import { User } from "./User";
import { Message } from "./Message";
import config from "../../config";

const connectDb = () => {
  return mongoose.connect(config.MONGODB_URI);
};

const models = { User, Message };

export { connectDb };

export default models;
