import ICreateTriggerDTO from '../dtos/ICreateTriggerDTO';

import Trigger from '../infra/typeorm/entities/Trigger';

export interface IFindTrigger {
  id: string;
}

export default interface ITriggersRepository {
  create(data: ICreateTriggerDTO): Promise<Trigger>;
  findById(id: string): Promise<Trigger | undefined>;
  findByName(name: string): Promise<Trigger | undefined>;
  findAllById(triggers: IFindTrigger[]): Promise<Trigger[]>;
}
