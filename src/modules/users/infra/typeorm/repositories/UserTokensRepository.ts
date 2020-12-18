import { getRepository, Repository } from 'typeorm';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import ICreateUserTokenDTO from '@modules/users/dtos/ICreateUserTokenDTO';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

export default class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const findToken = await this.ormRepository.findOne({
      where: {
        token,
      },
    });

    return findToken;
  }

  public async generate({
    type,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      type,
      user_id,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}
