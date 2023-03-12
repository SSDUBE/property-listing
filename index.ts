import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { API } from './src/utils/globals';
import logger from './src/utils/logger';
import routes from './src/routes';

const app = express();
const port = API.PORT;
const serviceName = 'Flow';
const routeName = '/listings';

app.use(cors());

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!');
});

mongoose.connect(API.DB_STRING, { autoIndex: false }).then(
  () => {
    logger.log('Successfully connected to DB');
    app.listen(port, () => {
      app.use(routeName, routes)
      logger.log(`${serviceName} listening on port ${port}!`);
    });
  },
  (err) => logger.log('Error connecting to DB', err)
);
