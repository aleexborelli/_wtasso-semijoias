import { Router } from 'express';
import PessoaController from '../controllers/PessoaController';

const pessoaRoutes = Router();
const pessoaController = new PessoaController();

pessoaRoutes.post('/', pessoaController.create);
pessoaRoutes.patch('/:id', pessoaController.enable);

export default pessoaRoutes;
