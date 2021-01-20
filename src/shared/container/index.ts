import { container } from 'tsyringe';

import './providers';
import '@modules/users/providers/HashProvider';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import IMediasRepository from '@modules/warnings/repositories/IMediasRepository';
import MediasRepository from '@modules/warnings/infra/typeorm/repositories/MediasRepository';

import IWarningsRepository from '@modules/warnings/repositories/IWarningsRepository';
import WarningsRepository from '@modules/warnings/infra/typeorm/repositories/WarningsRepository';

import ISensitiveContentsRepository from '@modules/warnings/repositories/ISensitiveContentsRepository';
import SensitiveContentsRepository from '@modules/warnings/infra/typeorm/repositories/SensitiveContentsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IMediasRepository>(
  'MediasRepository',
  MediasRepository,
);

container.registerSingleton<IWarningsRepository>(
  'WarningsRepository',
  WarningsRepository,
);

container.registerSingleton<ISensitiveContentsRepository>(
  'SensitiveContentsRepository',
  SensitiveContentsRepository,
);
