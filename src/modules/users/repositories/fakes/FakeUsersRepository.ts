import { v4 as uuid } from 'uuid';

import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import IUsersRepository from '../IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
  private usersRepository: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.usersRepository.find(user => user.id === id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.usersRepository.find(user => user.email === email);

    return findUser;
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(
      user,
      {
        id: uuid(),
      },
      data,
    );

    this.usersRepository.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.usersRepository.findIndex(
      findUser => findUser.id === user.id,
    );

    this.usersRepository[findIndex] = user;

    return user;
  }
}

export default FakeUsersRepository;
