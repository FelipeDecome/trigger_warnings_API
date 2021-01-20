import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateWarningService from '@modules/warnings/services/CreateWarningService';

export default class WarningController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { tmdb_id, description, sensitive_contents_ids } = request.body;

    const createWarningService = container.resolve(CreateWarningService);
    const warning = await createWarningService.execute({
      user_id,
      tmdb_id,
      description,
      sensitive_contents_ids,
    });

    return response.status(201).json(warning);
  }
}
