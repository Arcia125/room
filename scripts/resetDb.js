import { connectDb } from '../server/src/models/index';

connectDb()
  .then(mongo => {
    return mongo.connection.dropDatabase();
  })
  .then(() => {
    process.exit();
  });
