import { Router } from 'express';
import TriggersController from '../controller/TriggersController';

const triggersController = new TriggersController();

const triggersRouter = Router();

triggersRouter.post('/', triggersController.create);

export default triggersRouter;
