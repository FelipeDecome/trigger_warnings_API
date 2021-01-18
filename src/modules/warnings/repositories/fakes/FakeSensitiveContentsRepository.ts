import { v4 as uuid } from 'uuid';

import SensitiveContent from '@modules/warnings/infra/typeorm/entities/SensitiveContent';
import ICreateSensitiveContentDTO from '@modules/warnings/dtos/ICreateSensitiveContentDTO';
import ISensitiveContentsRepository from '../ISensitiveContentsRepository';

export default class FakeSensitiveContentsRepository
  implements ISensitiveContentsRepository {
  private sensitiveContents: SensitiveContent[] = [];

  public async create(
    data: ICreateSensitiveContentDTO,
  ): Promise<SensitiveContent> {
    const sensitiveContent = new SensitiveContent();

    Object.assign(sensitiveContent, {
      id: uuid(),
      ...data,
      created_at: Date.now(),
      updated_at: Date.now(),
    });

    this.sensitiveContents.push(sensitiveContent);

    return sensitiveContent;
  }

  public async findById(id: string): Promise<SensitiveContent | undefined> {
    const findSensitiveContent = this.sensitiveContents.find(
      sensitiveContent => sensitiveContent.id === id,
    );

    return findSensitiveContent;
  }

  public async findByName(name: string): Promise<SensitiveContent | undefined> {
    const findSensitiveContent = this.sensitiveContents.find(
      sensitiveContent => sensitiveContent.name === name,
    );

    return findSensitiveContent;
  }
}
