import mongoose from 'mongoose';
import { User } from '../models/User';
import config from '../../config';

const users = {
  add: async ({ username, password }) => {
    mongoose.connect(config.DATABASE_URL, { useNewUrlParser: true });

    const user = new User({ username, password }); // document = instance of a model

    const savedUser = await user.save();

    return savedUser;

    // mongoose.connect(config.DATABASE_URL, { useNewUrlParser: true }, err => {
    //   if (!err) {
    //     const user = new User({ username, password }); // document = instance of a model
    //     user.save((err, user) => {});
    //   } else {
    //     throw err;
    //     // status = 500;
    //     // result.status = status;
    //     // result.error = err;
    //     // res.status(status).send(result);
    //   }
    // });
  },
};

export { users };
