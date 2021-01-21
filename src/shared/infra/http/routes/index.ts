import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import confirmationRouter from '@modules/users/infra/http/routes/confirmation.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';

import triggersRouter from '@modules/triggers/infra/http/routes/triggers.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/confirmation', confirmationRouter);
routes.use('/password', passwordRouter);

routes.use('/triggers', triggersRouter);

export default routes;
