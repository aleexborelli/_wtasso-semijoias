import { hash } from 'bcryptjs';
import Pessoa from '../models/Pessoa';
import IPessoaRepository from '../repositories/IPessoaRepository';
import PessoaRepository from '../repositories/PessoaRepository';

interface Request {
  nome_completo: string;
  cpf_cnpj: number;
  rg: number;
  email: string;
  senha: string;
  url_foto: string;
}

class CreatePessoaService {
  private pessoaRepository: IPessoaRepository;

  constructor(pessoaRepository: PessoaRepository) {
    this.pessoaRepository = pessoaRepository;
  }

  public async execute({
    nome_completo,
    cpf_cnpj,
    rg,
    email,
    senha,
    url_foto,
  }: Request): Promise<Pessoa> {
    const senhaHash = await hash(senha, 8);

    const pessoa = await this.pessoaRepository.create({
      nome_completo,
      cpf_cnpj,
      rg,
      email,
      senha: senhaHash,
      url_foto,
    });

    return pessoa;
  }
}

export default CreatePessoaService;
