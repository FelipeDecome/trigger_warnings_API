import ICreateMediaDTO from '@modules/medias/dtos/ICreateMediaDTO';
import IMediasRepository from '@modules/medias/repositories/IMediasRepository';
import { getRepository, Repository } from 'typeorm';
import Media from '../entities/Media';

export default class MediasRepository implements IMediasRepository {
  private ormRepository: Repository<Media>;

  constructor() {
    this.ormRepository = getRepository(Media);
  }

  public async create({ tmdb_id }: ICreateMediaDTO): Promise<Media> {
    const media = this.ormRepository.create({
      tmdb_id,
    });

    return this.ormRepository.save(media);
  }

  public async findById(id: string): Promise<Media | undefined> {
    const findMedia = await this.ormRepository.findOne(id);

    return findMedia;
  }

  public async findByTMDBId(tmdb_id: number): Promise<Media | undefined> {
    const findMedia = await this.ormRepository.findOne({
      where: {
        tmdb_id,
      },
    });

    return findMedia;
  }
}
