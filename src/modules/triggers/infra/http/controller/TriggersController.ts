import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTriggerService from '@modules/triggers/services/CreateTriggerService';

export default class TriggersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, color } = request.body;

    const createTriggersService = container.resolve(CreateTriggerService);

    const trigger = await createTriggersService.execute({
      name,
      description,
      color,
    });

    return response.status(201).json(trigger);
  }
}
