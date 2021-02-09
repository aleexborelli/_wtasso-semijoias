import { Request, Response } from 'express';
import PessoaRepository from '../repositories/PessoaRepository';
import SessionService from '../services/SessionService';

class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id, password } = request.body;

    const pessoaRepository = new PessoaRepository();
    const createSession = new SessionService(pessoaRepository);

    const session = await createSession.execute({
      id,
      password,
    });

    return response.json(session);
  }
}

export default SessionController;
