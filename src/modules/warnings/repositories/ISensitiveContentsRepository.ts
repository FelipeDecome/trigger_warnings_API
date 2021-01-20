import ICreateSensitiveContent from '../dtos/ICreateSensitiveContentDTO';
import SensitiveContent from '../infra/typeorm/entities/SensitiveContent';

export default interface ISensitiveContentsRepository {
  create(data: ICreateSensitiveContent): Promise<SensitiveContent>;
  findById(id: string): Promise<SensitiveContent | undefined>;
  findByName(name: string): Promise<SensitiveContent | undefined>;
}
