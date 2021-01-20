import AppError from '@shared/errors/AppError';
import FakeMediasRepository from '../repositories/fakes/FakeMediasRepository';
import CreateWarningService from './CreateWarningService';

import Warning from '../infra/typeorm/entities/Warning';
import FakeWarningsRepository from '../repositories/fakes/FakeWarningsRepository';
import FakeSensitiveContentsRepository from '../repositories/fakes/FakeSensitiveContentsRepository';

let fakeMediasRepository: FakeMediasRepository;
let fakeWarningsRepository: FakeWarningsRepository;
let fakeSensitiveContentsRepository: FakeSensitiveContentsRepository;
let createWarning: CreateWarningService;

describe('CreateWarning', () => {
  beforeEach(() => {
    fakeMediasRepository = new FakeMediasRepository();
    fakeWarningsRepository = new FakeWarningsRepository();
    fakeSensitiveContentsRepository = new FakeSensitiveContentsRepository();

    createWarning = new CreateWarningService(
      fakeWarningsRepository,
      fakeSensitiveContentsRepository,
      fakeMediasRepository,
    );
  });

  it('should be able to create a new warning', async () => {
    const sensitiveContent = await fakeSensitiveContentsRepository.create({
      color: '',
      description: '',
      name: '',
    });

    await fakeMediasRepository.create({
      tmdb_id: 1,
    });

    const warning = await createWarning.execute({
      tmdb_id: 1,
      description: 'warning description',
      user_id: 'user_id',
      sensitive_contents_ids: [sensitiveContent.id],
    });

    expect(warning).toHaveProperty('id');
    expect(warning).toBeInstanceOf(Warning);
  });

  it('should be able to create a new media in database if it does not exist', async () => {
    const sensitiveContent = await fakeSensitiveContentsRepository.create({
      color: '',
      description: '',
      name: '',
    });

    const createMedia = jest.spyOn(fakeMediasRepository, 'create');

    await createWarning.execute({
      tmdb_id: 1,
      description: 'warning description',
      user_id: 'user_id',
      sensitive_contents_ids: [sensitiveContent.id],
    });

    expect(createMedia).toBeCalledWith({ tmdb_id: 1 });
  });

  it('should not be able to create a warning without a description', async () => {
    const sensitiveContent = await fakeSensitiveContentsRepository.create({
      color: '',
      description: '',
      name: '',
    });

    await expect(
      createWarning.execute({
        tmdb_id: 1,
        description: '',
        user_id: 'user_id',
        sensitive_contents_ids: [sensitiveContent.id],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a warning with a non existent sensitive content', async () => {
    await expect(
      createWarning.execute({
        tmdb_id: 1,
        description: 'warning description',
        user_id: 'user_id',
        sensitive_contents_ids: ['non_existent_sensitive_content_id'],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a warning without a sensitive content', async () => {
    await expect(
      createWarning.execute({
        tmdb_id: 1,
        description: 'warning description',
        user_id: 'user_id',
        sensitive_contents_ids: [],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
