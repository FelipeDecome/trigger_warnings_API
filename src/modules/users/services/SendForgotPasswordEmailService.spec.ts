import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeUsersRepository: FakeUsersRepository;

let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeMailProvider = new FakeMailProvider();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeMailProvider,
    );
  });

  it('should be able to send a recuperation email.', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com.br',
      password: '123456',
    });

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    await sendForgotPasswordEmail.execute({
      email: user.email,
    });

    expect(sendMail).toHaveBeenCalled();
    expect(generateToken).toHaveBeenCalledWith({
      type: 'reset',
      user_id: user.id,
    });
  });

  it("should not be able to send a recuperation email if user doesn't exist.", async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'non_existent_user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to generate a reset password token.', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com.br',
      password: '123456',
    });

    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    await sendForgotPasswordEmail.execute({
      email: user.email,
    });

    expect(generateToken).toHaveBeenCalledWith({
      type: 'reset',
      user_id: user.id,
    });
  });
});
