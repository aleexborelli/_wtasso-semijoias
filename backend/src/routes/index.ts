import { Router } from 'express';
import sessionRoutes from './session';
import pessoaRoutes from './pessoa';

const routes = Router();

const prefixRoutes = '/api/v1';

routes.get('/', (request, response) => {
  response.json({ message: 'API SEMIJOIAS - WTASSO CONSULTORIA E SERVIÇOS' });
});

routes.use(`${prefixRoutes}/sessions`, sessionRoutes);
routes.use(`${prefixRoutes}/pessoas`, pessoaRoutes);

export default routes;
