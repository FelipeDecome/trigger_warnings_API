import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ConfirmationController from '../controllers/ConfirmationController';

const confirmationController = new ConfirmationController();

const confirmationRouter = Router();

confirmationRouter.patch(
  '/:token',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().required(),
    },
  }),
  confirmationController.create,
);

export default confirmationRouter;
