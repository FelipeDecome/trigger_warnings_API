import 'reflect-metadata';
import { v4 as uuid } from 'uuid';

import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ResetUserPasswordService from './ResetUserPasswordService';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;

let resetUserPassword: ResetUserPasswordService;

describe('ResetUserPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetUserPassword = new ResetUserPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('should be able to reset user password.', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com.br',
      password: '123456',
    });

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    const { token } = await fakeUserTokensRepository.generate({
      type: 'reset',
      user_id: user.id,
    });

    await resetUserPassword.execute({
      token,
      password: '123123',
      password_confirmation: '123123',
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(updatedUser?.password).toEqual('123123');
    expect(generateHash).toHaveBeenCalledWith('123123');
  });

  it('should be able to delete token after reseting password.', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com.br',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate({
      type: 'reset',
      user_id: user.id,
    });

    await resetUserPassword.execute({
      token,
      password: '123123',
      password_confirmation: '123123',
    });

    const findToken = await fakeUserTokensRepository.findByToken(token);

    expect(findToken).toBeUndefined();
  });

  it('should not be able to reset user password with an invalid token.', async () => {
    await expect(
      resetUserPassword.execute({
        token: 'invalid_token',
        password: '123123',
        password_confirmation: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      resetUserPassword.execute({
        token: uuid(),
        password: '123123',
        password_confirmation: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset user password without a reset type token.', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com.br',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate({
      type: 'confirmation',
      user_id: user.id,
    });

    await expect(
      resetUserPassword.execute({
        token,
        password: '123123',
        password_confirmation: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password of a non existent user.', async () => {
    const { token } = await fakeUserTokensRepository.generate({
      type: 'reset',
      user_id: 'non_existent_user',
    });

    await expect(
      resetUserPassword.execute({
        token,
        password: '123123',
        password_confirmation: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to reset the password if confirmation password doesn't match.", async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com.br',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate({
      type: 'reset',
      user_id: user.id,
    });

    await expect(
      resetUserPassword.execute({
        token,
        password: 'password',
        password_confirmation: 'different_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password if has passed 2 hours since token creation.', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com.br',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate({
      type: 'reset',
      user_id: user.id,
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetUserPassword.execute({
        token,
        password: '123123',
        password_confirmation: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password if it matchs the old password.', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com.br',
      password: 'old_password',
    });

    const { token } = await fakeUserTokensRepository.generate({
      type: 'reset',
      user_id: user.id,
    });

    await expect(
      resetUserPassword.execute({
        token,
        password: 'old_password',
        password_confirmation: 'old_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
