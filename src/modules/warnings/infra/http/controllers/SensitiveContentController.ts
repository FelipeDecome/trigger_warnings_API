import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSensitiveContentService from '@modules/warnings/services/CreateSensitiveContentService';

export default class WarningController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, color, description } = request.body;

    const createSensitiveContentService = container.resolve(
      CreateSensitiveContentService,
    );

    const sensitiveContent = await createSensitiveContentService.execute({
      name,
      color,
      description,
    });

    return response.status(201).json(sensitiveContent);
  }
}
