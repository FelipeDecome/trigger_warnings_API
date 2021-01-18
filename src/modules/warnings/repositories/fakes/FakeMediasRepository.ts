import { v4 as uuid } from 'uuid';

import Media from '@modules/warnings/infra/typeorm/entities/Media';
import ICreateMediaDTO from '@modules/warnings/dtos/ICreateMediaDTO';
import IMediasRepository from '../IMediasRepository';

export default class FakeMediasRepository implements IMediasRepository {
  private medias: Media[] = [];

  public async create(data: ICreateMediaDTO): Promise<Media> {
    const media = new Media();

    Object.assign(media, {
      id: uuid(),
      ...data,
      created_at: Date.now(),
      updated_at: Date.now(),
    });

    this.medias.push(media);

    return media;
  }

  public async findById(id: string): Promise<Media | undefined> {
    const findMedia = this.medias.find(media => media.id === id);

    return findMedia;
  }

  public async findByTmdbId(tmdb_id: number): Promise<Media | undefined> {
    const findMedia = this.medias.find(media => media.tmdb_id === tmdb_id);

    return findMedia;
  }
}
