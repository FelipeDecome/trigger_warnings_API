import { Router } from 'express';

import UsersController from '../controllers/UsersController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersController = new UsersController();

const sessionsRouter = Router();

sessionsRouter.use(ensureAuthenticated);

sessionsRouter.post('/', usersController.create);

export default sessionsRouter;
