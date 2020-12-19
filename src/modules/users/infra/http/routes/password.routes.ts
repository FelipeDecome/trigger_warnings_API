import { Router } from 'express';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetUserPasswordController from '../controllers/ResetUserPasswordController';

const forgotPasswordController = new ForgotPasswordController();
const resetUserPassword = new ResetUserPasswordController();

const passwordRouter = Router();

passwordRouter.post('/forgot', forgotPasswordController.create);
passwordRouter.post('/reset', resetUserPassword.create);

export default passwordRouter;
