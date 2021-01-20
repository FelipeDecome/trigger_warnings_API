import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import confirmationRouter from '@modules/users/infra/http/routes/confirmation.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';

import warningRouter from '@modules/warnings/infra/http/routes/warning.routes';
import sensitiveContentRouter from '@modules/warnings/infra/http/routes/sensitiveContent.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/confirmation', confirmationRouter);
routes.use('/password', passwordRouter);

routes.use('/warnings', warningRouter);
routes.use('/sensitive-contents', sensitiveContentRouter);

export default routes;
