import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ITriggersRepository from '../repositories/ITriggersRepository';
import Trigger from '../infra/typeorm/entities/Trigger';

interface IRequest {
  name: string;
  description: string;
  color: string;
}

@injectable()
class CreateTriggerService {
  constructor(
    @inject('TriggersRepository')
    private triggersRepository: ITriggersRepository,
  ) {}

  public async execute({
    name,
    description,
    color,
  }: IRequest): Promise<Trigger> {
    const nameAlreadyExists = await this.triggersRepository.findByName(name);

    if (nameAlreadyExists) throw new AppError('Trigger name already in use.');

    const trigger = await this.triggersRepository.create({
      name,
      description,
      color,
    });

    return trigger;
  }
}

export default CreateTriggerService;
