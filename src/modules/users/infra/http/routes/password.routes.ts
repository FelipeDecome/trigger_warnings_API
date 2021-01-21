import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetUserPasswordController from '../controllers/ResetUserPasswordController';

const forgotPasswordController = new ForgotPasswordController();
const resetUserPassword = new ResetUserPasswordController();

const passwordRouter = Router();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPasswordController.create,
);

passwordRouter.post(
  '/reset/:token',
  celebrate({
    [Segments.BODY]: {
      password: Joi.string().min(8).max(24).required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
      token: Joi.string().required(),
    },
  }),
  resetUserPassword.create,
);

export default passwordRouter;
