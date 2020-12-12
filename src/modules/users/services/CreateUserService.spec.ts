import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
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
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('johndoe@example.com.br');
    expect(user.password).toBe('123456');
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
