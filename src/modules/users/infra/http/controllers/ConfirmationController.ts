import { Request, Response } from 'express';
import { container } from 'tsyringe';

import VerifyUserEmailService from '@modules/users/services/VerifyUserEmailService';

class ConfirmationController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { token } = request.params;

    const verifyUserEmail = container.resolve(VerifyUserEmailService);

    await verifyUserEmail.execute({
      token,
    });

    return response.send();
  }
}

export default ConfirmationController;
