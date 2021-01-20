import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import WarningController from '../controllers/WarningController';

const warningController = new WarningController();

const warningRouter = Router();

warningRouter.post('/', ensureAuthenticated, warningController.create);

export default warningRouter;
