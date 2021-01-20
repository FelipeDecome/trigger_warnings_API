import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IMediasRepository from '../repositories/IMediasRepository';
import IWarningsRepository from '../repositories/IWarningsRepository';
import ISensitiveContentsRepository from '../repositories/ISensitiveContentsRepository';

import Warning from '../infra/typeorm/entities/Warning';

interface IRequest {
  tmdb_id: number;
  description: string;
  user_id: string;
  sensitive_contents_ids: string[];
}

@injectable()
class CreateWarningService {
  constructor(
    @inject('WarningsRepository')
    private warningsRepository: IWarningsRepository,

    @inject('SensitiveContentsRepository')
    private sensitiveContentsRepository: ISensitiveContentsRepository,

    @inject('MediasRepository')
    private mediasRepository: IMediasRepository,
  ) {}

  public async execute({
    tmdb_id,
    description,
    user_id,
    sensitive_contents_ids,
  }: IRequest): Promise<Warning> {
    if (sensitive_contents_ids.length <= 0)
      throw new AppError('You must select at least 1 sensitive content.');

    const { id: media_id } =
      (await this.mediasRepository.findByTmdbId(tmdb_id)) ||
      (await this.mediasRepository.create({
        tmdb_id,
      }));

    const sensitive_contents = await Promise.all(
      sensitive_contents_ids.map(async sensitive_content_id => {
        const sensitive_content = await this.sensitiveContentsRepository.findById(
          sensitive_content_id,
        );

        if (!sensitive_content)
          throw new AppError("Sensitive content doesn't exist");

        return sensitive_content;
      }),
    );

    if (description === '')
      throw new AppError('You must provide a description.');

    const warning = await this.warningsRepository.create({
      description,
      user_id,
      media_id,
      sensitive_contents,
    });

    return warning;
  }
}

export default CreateWarningService;
