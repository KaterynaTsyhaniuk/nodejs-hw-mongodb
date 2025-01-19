import { initMangoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

const bootstrap = async () => {
  await initMangoConnection();
  setupServer();
};

bootstrap();
