import { Router } from 'express';

import UsersController from '../controllers/UsersController';

import confirmationRouter from './confirmation.routes';
import sessionsRouter from './sessions.routes';

const usersController = new UsersController();

const usersRouter = Router();

usersRouter.use('/sessions', sessionsRouter);
usersRouter.use('/confirmation', confirmationRouter);

usersRouter.post('/', usersController.create);

export default usersRouter;
