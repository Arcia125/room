import mongoose from 'mongoose';

import config from '../server/config';

mongoose
  .connect(config.MONGODB_URI)
  .then(mongo => {
    return mongo.connection.dropDatabase();
  })
  .then(() => {
    console.log('successfully reset database');
    process.exit(0);
  });
