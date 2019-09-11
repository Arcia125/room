import { app } from './src/app';

const PORT = process.env.PORT || 9001;

app.listen({ port: PORT }, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});