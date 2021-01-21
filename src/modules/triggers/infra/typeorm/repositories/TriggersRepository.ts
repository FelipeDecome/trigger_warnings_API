import { getRepository, In, Repository } from 'typeorm';

import ICreateTriggerDTO from '@modules/triggers/dtos/ICreateTriggerDTO';
import ITriggersRepository, {
  IFindTrigger,
} from '@modules/triggers/repositories/ITriggersRepository';

import Trigger from '../entities/Trigger';

export default class TriggersRepository implements ITriggersRepository {
  private ormRepository: Repository<Trigger>;

  constructor() {
    this.ormRepository = getRepository(Trigger);
  }

  public async create(data: ICreateTriggerDTO): Promise<Trigger> {
    const trigger = this.ormRepository.create(data);

    return this.ormRepository.save(trigger);
  }

  public async findAllById(triggers: IFindTrigger[]): Promise<Trigger[]> {
    const triggersIds = triggers.map(trigger => trigger.id);

    const findTriggers = await this.ormRepository.find({
      where: {
        id: In(triggersIds),
      },
    });

    return findTriggers;
  }

  public async findById(id: string): Promise<Trigger | undefined> {
    const findTrigger = await this.ormRepository.findOne(id);

    return findTrigger;
  }

  public async findByName(name: string): Promise<Trigger | undefined> {
    const findTrigger = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return findTrigger;
  }
}
