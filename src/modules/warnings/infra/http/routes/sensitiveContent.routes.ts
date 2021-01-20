import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import SensitiveContentController from '../controllers/SensitiveContentController';

const sensitiveContentController = new SensitiveContentController();

const sensitiveContentRouter = Router();

sensitiveContentRouter.post(
  '/',
  ensureAuthenticated,
  sensitiveContentController.create,
);

export default sensitiveContentRouter;
