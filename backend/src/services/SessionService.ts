import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import IPessoaRepository from '../repositories/IPessoaRepository';
import PessoaRepository from '../repositories/PessoaRepository';
import Pessoa from '../models/Pessoa';
import AppError from '../errors/AppError';

interface Request {
  id: string;
  password: string;
}

interface Response {
  token: string;
  Pessoa: Pessoa;
}

class SessionService {
  private PessoaRepository: IPessoaRepository;

  constructor(PessoaRepository: PessoaRepository) {
    this.PessoaRepository = PessoaRepository;
  }

  public async execute({ id, password }: Request): Promise<Response> {
    const Pessoa = await this.PessoaRepository.findById(id);

    if (!Pessoa) {
      throw new AppError('Credenciais inválidas', 401);
    }

    const passwordCompare = await compare(password, Pessoa.password);

    if (!passwordCompare) {
      throw new AppError('Credenciais inválidas', 401);
    }

    if (!Pessoa.active) {
      throw new AppError('Usuário inativo', 401);
    }

    const token = sign({}, process.env.APP_SECRET as string, {
      expiresIn: '1d',
    });

    delete Pessoa.password;

    return {
      token,
      Pessoa,
    };
  }
}

export default SessionService;
