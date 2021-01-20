import { container } from 'tsyringe';

import './HashProvider';

import IUsersRepository from '../repositories/IUsersRepository';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '../repositories/IUserTokensRepository';
import UserTokensRepository from '../infra/typeorm/repositories/UserTokensRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
