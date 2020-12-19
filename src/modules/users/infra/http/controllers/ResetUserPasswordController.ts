import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetUserPasswordService from '@modules/users/services/ResetUserPasswordService';

class ResetUserPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { token } = request.params;
    const { password, password_confirmation } = request.body;

    const resetUserPassword = container.resolve(ResetUserPasswordService);

    await resetUserPassword.execute({
      token,
      password,
      password_confirmation,
    });

    return response.status(204).send();
  }
}

export default ResetUserPasswordController;
