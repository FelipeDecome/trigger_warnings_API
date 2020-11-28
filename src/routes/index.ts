import { Router } from 'express';

const routes = Router();

routes.post('/', (request, response) => {
  const { name, email } = request.body;

  const user = {
    name,
    email,
  };

  return response.status(201).json(user);
});

export default routes;
