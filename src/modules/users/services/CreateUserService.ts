import path from 'path';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import baseUrl from '@config/baseUrl';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    if (!name || name === '') throw new AppError('Name can not be null.');
    if (!email || name === '') throw new AppError('Email can not be null.');
    if (!password || name === '')
      throw new AppError('Password can not be null.');

    const emailAlreadyInUse = await this.usersRepository.findByEmail(email);

    if (emailAlreadyInUse) throw new AppError('Email already in use.');

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    const { token } = await this.userTokensRepository.generate({
      type: 'confirmation',
      user_id: user.id,
    });

    const createUserMailTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'create_user.hbs',
    );

    const link = `${baseUrl}/users/confirmation/${token}`;

    await this.mailProvider.sendMail({
      to: {
        name,
        email,
      },
      subject: 'Confirmação de conta',
      templateData: {
        file: createUserMailTemplate,
        variables: { name, link },
      },
    });

    return user;
  }
}

export default CreateUserService;
