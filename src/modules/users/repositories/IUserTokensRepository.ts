import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import ICreateUserToken from '../dtos/ICreateUserTokenDTO';

export default interface IUserTokensRepository {
  findByToken(token: string): Promise<UserToken | undefined>;
  generate(data: ICreateUserToken): Promise<UserToken>;
}
