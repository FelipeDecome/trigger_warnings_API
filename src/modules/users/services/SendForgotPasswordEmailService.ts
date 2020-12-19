import { inject, injectable } from 'tsyringe';
import path from 'path';
import baseUrl from '@config/baseUrl';

import AppError from '@shared/errors/AppError';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError('User not found');

    if (user.email_verified)
      throw new AppError("Can't generate a reset token for a verified user.");

    const { token } = await this.userTokensRepository.generate({
      type: 'reset',
      user_id: user.id,
    });

    const resetPasswordMailTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    const link = `${baseUrl}/users/reset/${token}`;

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email,
      },
      subject: 'Trigger Warning: Recuperação de senha',
      templateData: {
        file: resetPasswordMailTemplate,
        variables: {
          name: user.name,
          link,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
