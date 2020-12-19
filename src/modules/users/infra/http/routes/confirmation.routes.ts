import { Router } from 'express';
import ConfirmationController from '../controllers/ConfirmationController';

const confirmationController = new ConfirmationController();

const confirmationRouter = Router();

confirmationRouter.patch('/:token', confirmationController.update);

export default confirmationRouter;
