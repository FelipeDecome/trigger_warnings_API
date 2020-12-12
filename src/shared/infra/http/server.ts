import 'reflect-metadata';

import express, { json, NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import AppError from '@shared/errors/AppError';

import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(json());
app.use(routes);

app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError)
      return response.status(error.statusCode).json({
        status: 'Error',
        message: error.message,
      });

    return response.status(500).json({
      status: 'Internal Server Error',
      message: error.message,
    });
  },
);

app.listen(3333, () => {
  console.log(`🚀 Server started on port: 3333`);
});
