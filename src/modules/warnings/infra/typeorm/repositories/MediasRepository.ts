import { getRepository, Repository } from 'typeorm';

import ICreateMediaDTO from '@modules/warnings/dtos/ICreateMediaDTO';
import IMediasRepository from '@modules/warnings/repositories/IMediasRepository';

import Media from '@modules/warnings/infra/typeorm/entities/Media';

export default class MediasRepository implements IMediasRepository {
  private ormRepository: Repository<Media>;

  constructor() {
    this.ormRepository = getRepository(Media);
  }

  public async create(data: ICreateMediaDTO): Promise<Media> {
    const media = this.ormRepository.create(data);

    return this.ormRepository.save(media);
  }

  public async findById(id: string): Promise<Media | undefined> {
    const findMedia = await this.ormRepository.findOne(id);

    return findMedia;
  }

  public async findByTmdbId(tmdb_id: number): Promise<Media | undefined> {
    const findMedia = await this.ormRepository.findOne({
      where: {
        tmdb_id,
      },
    });

    return findMedia;
  }
}
