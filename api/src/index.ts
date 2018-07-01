import 'reflect-metadata';

import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import { Container } from 'typedi';
import {
  createExpressServer,
  useContainer as routingControllerUseContainer
} from 'routing-controllers';
import {
  createConnection,
  useContainer as typeormUseContainer
} from 'typeorm';
import { RecipeController } from './controller/RecipeController';

routingControllerUseContainer(Container);
typeormUseContainer(Container);
createConnection()
.then(async connection => {

  // create express app
  const app = createExpressServer({
    validation: true,
    controllers: [RecipeController]
  });

  app.use(bodyParser.json());

  // register express routes from defined application routes
  // setup express app here
  // ...

  // start express server
  app.listen(3000);

  console.log('Express server has started on port 3000.');
})
.catch(error => console.error(error));
