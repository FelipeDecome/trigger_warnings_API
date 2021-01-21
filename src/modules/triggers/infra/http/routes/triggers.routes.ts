import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import TriggersController from '../controller/TriggersController';

const triggersController = new TriggersController();

const triggersRouter = Router();

triggersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      color: Joi.string().required(),
    },
  }),
  triggersController.create,
);

export default triggersRouter;
