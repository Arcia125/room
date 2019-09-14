import { listen } from './src/app';
import { PORT } from './config';

listen({ port: PORT }, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});