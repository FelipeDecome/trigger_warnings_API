import { v4 as uuid } from 'uuid';

import ICreateWarningDTO from '@modules/warnings/dtos/ICreateWarningDTO';
import Warning from '@modules/warnings/infra/typeorm/entities/Warning';
import IWarningsRepository from '../IWarningsRepository';

export default class FakeWarningsRepository implements IWarningsRepository {
  private warnings: Warning[] = [];

  public async create(data: ICreateWarningDTO): Promise<Warning> {
    const warning = new Warning();

    Object.assign(warning, {
      id: uuid(),
      ...data,
      created_at: Date.now(),
      updated_at: Date.now(),
    });

    this.warnings.push(warning);

    return warning;
  }
}
