import { v4 as uuid } from 'uuid';

import ICreateTriggerDTO from '@modules/triggers/dtos/ICreateTriggerDTO';
import Trigger from '@modules/triggers/infra/typeorm/entities/Trigger';
import ITriggersRepository, { IFindTrigger } from '../ITriggersRepository';

export default class FakeTriggersRepository implements ITriggersRepository {
  private triggers: Trigger[] = [];

  public async create(data: ICreateTriggerDTO): Promise<Trigger> {
    const trigger = new Trigger();

    Object.assign(trigger, {
      id: uuid(),
      ...data,
      created_at: Date.now(),
      updated_at: Date.now(),
    });

    this.triggers.push(trigger);

    return trigger;
  }

  public async findAllById(triggers: IFindTrigger[]): Promise<Trigger[]> {
    const triggersIds = triggers.map(trigger => trigger.id);

    const findTriggers = this.triggers.filter(trigger =>
      triggersIds.includes(trigger.id),
    );

    return findTriggers;
  }

  public async findById(id: string): Promise<Trigger | undefined> {
    const findTrigger = this.triggers.find(trigger => trigger.id === id);

    return findTrigger;
  }

  public async findByName(name: string): Promise<Trigger | undefined> {
    const findTrigger = this.triggers.find(trigger => trigger.name === name);

    return findTrigger;
  }
}
