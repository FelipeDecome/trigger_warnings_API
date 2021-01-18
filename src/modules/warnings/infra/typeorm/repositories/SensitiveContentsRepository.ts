import ICreateSensitiveContentDTO from '@modules/warnings/dtos/ICreateSensitiveContentDTO';
import ISensitiveContentsRepository from '@modules/warnings/repositories/ISensitiveContentsRepository';

import SensitiveContent from '@modules/warnings/infra/typeorm/entities/SensitiveContent';
import { getRepository, Repository } from 'typeorm';

export default class SensitiveContentsRepository
  implements ISensitiveContentsRepository {
  private ormRepository: Repository<SensitiveContent>;

  constructor() {
    this.ormRepository = getRepository(SensitiveContent);
  }

  public async create(
    data: ICreateSensitiveContentDTO,
  ): Promise<SensitiveContent> {
    const sensitiveContent = this.ormRepository.create(data);

    await this.ormRepository.save(sensitiveContent);

    return sensitiveContent;
  }

  public async findById(id: string): Promise<SensitiveContent | undefined> {
    const findSensitiveContent = await this.ormRepository.findOne(id);

    return findSensitiveContent;
  }

  public async findByName(name: string): Promise<SensitiveContent | undefined> {
    const findSensitiveContent = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return findSensitiveContent;
  }
}
