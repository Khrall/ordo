import 'reflect-metadata';

import { createExpressServer } from 'routing-controllers';
import { WebController } from './PhotoController';

const app = createExpressServer({
   controllers: [WebController]
});

app.listen(4000);
