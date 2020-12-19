import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConf from '@config/auth';

import AppError from '@shared/errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const { authorization } = request.headers;

  if (!authorization) throw new AppError('JWT token is missing', 401);

  const [, token] = authorization.split(' ');

  try {
    const decoded = verify(token, authConf.jwt.secret);

    const { sub } = decoded as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT Token', 401);
  }
}
