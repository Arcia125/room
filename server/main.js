import { listen } from './src/app';
import config from './config';

listen({ port: config.PORT }, () => {
  console.log(`Server is listening at http://localhost:${config.PORT}`);
}).then(({ server, subscriptionServer, dbConnection }) => {
  console.log(server, subscriptionServer, dbConnection);
});
