import 'reflect-metadata';
import { v4 as uuid } from 'uuid';

import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import VerifyUserEmailService from './VerifyUserEmailService';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;

let verifyUserEmail: VerifyUserEmailService;

describe('VerifyUserEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    verifyUserEmail = new VerifyUserEmailService(
      fakeUsersRepository,
      fakeUserTokensRepository,
    );
  });

  it('should be able to verify the user.', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com.br',
      password: '123456',
    });

    const userToken = await fakeUserTokensRepository.generate({
      type: 'confirmation',
      user_id: user.id,
    });

    await verifyUserEmail.execute({
      token: userToken.token,
    });

    expect(user.email_verified).toBeTruthy();
  });

  it('should be able to delete token after verifying the user.', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com.br',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate({
      type: 'confirmation',
      user_id: user.id,
    });

    await verifyUserEmail.execute({
      token,
    });

    const findToken = await fakeUserTokensRepository.findByToken(token);

    expect(findToken).toBeUndefined();
  });

  it('should not be able to verify the user with an invalid token.', async () => {
    await expect(
      verifyUserEmail.execute({
        token: 'invalid_token',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      verifyUserEmail.execute({
        token: uuid(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to verify if the user doesn't exist.", async () => {
    const userToken = await fakeUserTokensRepository.generate({
      type: 'confirmation',
      user_id: 'non_existent_user',
    });

    await expect(
      verifyUserEmail.execute({
        token: userToken.token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to verify if the token is not a confirmation token.', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com.br',
      password: '123456',
    });

    const userToken = await fakeUserTokensRepository.generate({
      type: 'reset',
      user_id: user.id,
    });

    await expect(
      verifyUserEmail.execute({
        token: userToken.token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to verify if the email is already verified.', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com.br',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate({
      type: 'confirmation',
      user_id: user.id,
    });

    user.email_verified = true;
    await fakeUsersRepository.save(user);

    await expect(
      verifyUserEmail.execute({
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
