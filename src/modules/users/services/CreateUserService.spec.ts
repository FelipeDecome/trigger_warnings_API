import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

import User from '../infra/typeorm/entities/User';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeMailProvider: FakeMailProvider;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeMailProvider = new FakeMailProvider();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to create a new User.', async () => {
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com.br',
      password: '123456',
    });

    expect(generateHash).toBeCalledWith('123456');
    expect(user).toBeInstanceOf(User);
    expect(user.id).toBeDefined();
  });

  it('should generate a confirmation token and send an email.', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com.br',
      password: '123456',
    });

    expect(generateToken).toBeCalledWith({
      type: 'confirmation',
      user_id: user.id,
    });

    expect(sendMail).toBeCalled();
  });

  it('should not be able to create a user if the name is undefined.', async () => {
    await expect(
      createUser.execute({
        name: '',
        email: 'johndoe@example.com.br',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a user if the email is undefined.', async () => {
    await expect(
      createUser.execute({
        name: 'John Doe',
        email: '',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a user if the password is undefined.', async () => {
    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'johndoe@example.com.br',
        password: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new User with an email in use.', async () => {
    const email = 'johndoe@example.com.br';

    await createUser.execute({
      name: 'John Doe',
      email,
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'Teste',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
