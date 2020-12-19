import { inject, injectable } from 'tsyringe';
import { differenceInHours } from 'date-fns';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  token: string;
  password: string;
  password_confirmation: string;
}

@injectable()
class ResetUserPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    token,
    password,
    password_confirmation,
  }: IRequest): Promise<void> {
    if (password !== password_confirmation)
      throw new AppError('Password and confirmation password must match.');

    const findToken = await this.userTokensRepository.findByToken(token);

    if (!findToken) throw new AppError('Reset token does not exist.');

    const { id, type, user_id, created_at: tokenCreatedAt } = findToken;

    if (type !== 'reset')
      throw new AppError("Can't reset password without a reset type token.");

    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('User not found.');

    if (await this.hashProvider.compareHash(password, user.password))
      throw new AppError("You can't reset your password to your old password.");

    if (differenceInHours(Date.now(), tokenCreatedAt) > 2)
      throw new AppError('Token Expired.');

    const newHashedPassword = await this.hashProvider.generateHash(password);

    user.password = newHashedPassword;

    await this.usersRepository.save(user);

    await this.userTokensRepository.delete(id);
  }
}

export default ResetUserPasswordService;
