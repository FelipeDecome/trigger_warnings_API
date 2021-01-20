import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ISensitiveContentsRepository from '../repositories/ISensitiveContentsRepository';

import SensitiveContent from '../infra/typeorm/entities/SensitiveContent';

interface IRequest {
  description: string;
  color: string;
  name: string;
}

@injectable()
class CreateSensitiveContentService {
  constructor(
    @inject('SensitiveContentsRepository')
    private sensitiveContentsRepository: ISensitiveContentsRepository,
  ) {}

  public async execute({
    color,
    description,
    name,
  }: IRequest): Promise<SensitiveContent> {
    const nameAlreadyExists = await this.sensitiveContentsRepository.findByName(
      name,
    );

    if (nameAlreadyExists)
      throw new AppError(
        "You can't create 2 sensitive contents with the same name.",
      );

    const sensitiveContent = await this.sensitiveContentsRepository.create({
      color,
      description,
      name,
    });

    return sensitiveContent;
  }
}

export default CreateSensitiveContentService;
