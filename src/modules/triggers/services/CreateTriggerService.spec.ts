import AppError from '@shared/errors/AppError';
import Trigger from '../infra/typeorm/entities/Trigger';
import FakeTriggersRepository from '../repositories/fakes/FakeTriggersRepository';
import CreateTriggerService from './CreateTriggerService';

let fakeTriggersRepository: FakeTriggersRepository;
let createTriggerService: CreateTriggerService;

describe('CreateTrigger', () => {
  beforeEach(() => {
    fakeTriggersRepository = new FakeTriggersRepository();

    createTriggerService = new CreateTriggerService(fakeTriggersRepository);
  });

  it('should be able to create a new trigger', async () => {
    const trigger = await createTriggerService.execute({
      name: 'violence',
      description:
        'the intentional use of physical force or power, threatened or actual, against oneself, another person, or against a group or community, that either results in or has a high likelihood of resulting in injury, death, psychological harm, maldevelopment, or deprivation.',
      color: '#D0172A',
    });

    expect(trigger).toBeInstanceOf(Trigger);
    expect(trigger).toHaveProperty('id');
  });

  it('should not be able to create a trigger with a duplicate name', async () => {
    const name = 'violence';

    await fakeTriggersRepository.create({
      name,
      description:
        'the intentional use of physical force or power, threatened or actual, against oneself, another person, or against a group or community, that either results in or has a high likelihood of resulting in injury, death, psychological harm, maldevelopment, or deprivation.',
      color: '#D0172A',
    });

    await expect(
      createTriggerService.execute({
        name,
        description:
          'the intentional use of physical force or power, threatened or actual, against oneself, another person, or against a group or community, that either results in or has a high likelihood of resulting in injury, death, psychological harm, maldevelopment, or deprivation.',
        color: '#D0172A',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
