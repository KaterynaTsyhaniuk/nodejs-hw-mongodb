import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import pino from 'pino-http';
import { getEnvVar } from './utils/getEnvVar.js';

import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import router from './routers/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

const PORT = Number(getEnvVar('PORT', '3000'));

const app = express();

app.use('/api-docs', swaggerDocs());

app.use(cookieParser());

export async function setupServer() {
  try {
    app.use(
      express.json({
        type: ['application/json', 'application/vnd.api+json'],
      }),
    );

    app.use(cors());

    app.use(
      pino({
        transport: {
          target: 'pino-pretty',
        },
      }),
    );

    app.get('/', (req, res) => {
      res.json({ message: 'Hello Contacts' });
    });

    app.use(router);

    app.use(notFoundHandler);

    app.use(errorHandler);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}
