import { inject, injectable } from 'tsyringe';
import { validate } from 'uuid';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
  token: string;
}

@injectable()
class VerifyUserEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ token }: IRequest): Promise<void> {
    if (!validate(token))
      throw new AppError("Token isn't a valid generated UUID.");

    const findToken = await this.userTokensRepository.findByToken(token);

    if (!findToken) throw new AppError('Confirmation token does not exist.');

    const { id, user_id, type } = findToken;

    if (type !== 'confirmation')
      throw new AppError(
        "You can't confirm your email without a confirmation token.",
      );

    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('Something went wrong finding the user.');

    if (user.email_verified)
      throw new AppError("Can't verify an user already verified.");

    user.email_verified = true;

    await this.usersRepository.save(user);

    await this.userTokensRepository.delete(id);
  }
}

export default VerifyUserEmailService;
