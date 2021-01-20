import { getRepository, Repository } from 'typeorm';

import ICreateWarningDTO from '@modules/warnings/dtos/ICreateWarningDTO';
import Warning from '@modules/warnings/infra/typeorm/entities/Warning';
import IWarningsRepository from '@modules/warnings/repositories/IWarningsRepository';

export default class WarningsRepository implements IWarningsRepository {
  private ormRepository: Repository<Warning>;

  constructor() {
    this.ormRepository = getRepository(Warning);
  }

  public async create(data: ICreateWarningDTO): Promise<Warning> {
    const warning = this.ormRepository.create(data);

    return this.ormRepository.save(warning);
  }
}
