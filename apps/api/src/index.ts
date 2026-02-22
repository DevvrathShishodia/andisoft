import { app } from './app';
import { env } from './config/env';
import './queues/dm.queue';

app.listen(env.apiPort, () => {
  console.log(`API listening on ${env.apiPort}`);
});
