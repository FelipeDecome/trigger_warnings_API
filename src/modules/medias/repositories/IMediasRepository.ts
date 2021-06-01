import ICreateMediaDTO from '../dtos/ICreateMediaDTO';
import Media from '../infra/typeorm/entities/Media';

export default interface IMediasRepository {
  create(data: ICreateMediaDTO): Promise<Media>;
  findById(id: string): Promise<Media | undefined>;
  findByTMDBId(tmdb_id: number): Promise<Media | undefined>;
}
