import ICreateWarningDTO from '../dtos/ICreateWarningDTO';
import Warning from '../infra/typeorm/entities/Warning';

export default interface IWarningsRepository {
  create(data: ICreateWarningDTO): Promise<Warning>;
}
