import AppError from '@shared/errors/AppError';
import SensitiveContent from '../infra/typeorm/entities/SensitiveContent';

import FakeSensitiveContentsRepository from '../repositories/fakes/FakeSensitiveContentsRepository';
import CreateSensitiveContentService from './CreateSensitiveContentService';

let fakeSensitiveContentsRepository: FakeSensitiveContentsRepository;
let createSensitiveContent: CreateSensitiveContentService;

describe('CreateSensitiveContent', () => {
  beforeEach(() => {
    fakeSensitiveContentsRepository = new FakeSensitiveContentsRepository();

    createSensitiveContent = new CreateSensitiveContentService(
      fakeSensitiveContentsRepository,
    );
  });

  it('should be able to create a new sensitive content', async () => {
    const sensitiveContent = await createSensitiveContent.execute({
      color: '#333333',
      description: 'sensitive_content_description',
      name: 'sensitive_content_name',
    });

    expect(sensitiveContent).toHaveProperty('id');
    expect(sensitiveContent).toBeInstanceOf(SensitiveContent);
  });

  it('should not be able to create a sensitive content if it already exists', async () => {
    const name = 'sensitive_content_name';

    await createSensitiveContent.execute({
      color: '#333333',
      description: 'sensitive_content_description',
      name,
    });

    await expect(
      createSensitiveContent.execute({
        color: '#333333',
        description: 'sensitive_content_description',
        name,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
