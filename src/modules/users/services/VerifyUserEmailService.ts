import { inject, injectable } from 'tsyringe';

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
    const findToken = await this.userTokensRepository.findByToken(token);

    if (!findToken) throw new AppError('Confirmation token does not exist.');

    const { user_id, type } = findToken;

    if (type !== 'confirmation')
      throw new AppError(
        "You can't confirm your email without a confirmation token.",
      );

    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('Something went wrong finding the user.');

    user.email_verified = true;

    await this.usersRepository.save(user);
  }
}

export default VerifyUserEmailService;
