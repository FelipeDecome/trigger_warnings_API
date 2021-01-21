import { container } from 'tsyringe';

import TriggersRepository from '../infra/typeorm/repositories/TriggersRepository';
import ITriggersRepository from '../repositories/ITriggersRepository';

container.registerSingleton<ITriggersRepository>(
  'TriggersRepository',
  TriggersRepository,
);
