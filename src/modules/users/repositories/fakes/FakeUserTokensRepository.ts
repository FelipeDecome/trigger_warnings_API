import { v4 as uuid } from 'uuid';

import ICreateUserTokenDTO from '@modules/users/dtos/ICreateUserTokenDTO';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import IUserTokensRepository from '../IUserTokensRepository';

export default class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = [];

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const findToken = this.userTokens.find(
      userToken => userToken.token === token,
    );

    return findToken;
  }

  public async generate(data: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, data, {
      id: uuid(),
      token: uuid(),
      email_verified: false,
      created_at: Date.now(),
      updated_at: Date.now(),
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  public async delete(id: string): Promise<void> {
    const findTokenIndex = this.userTokens.findIndex(token => token.id === id);

    this.userTokens.splice(findTokenIndex, 1);
  }
}
