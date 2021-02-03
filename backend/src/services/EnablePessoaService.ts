import IPessoaRepository from '../repositories/IPessoaRepository';
import PessoaRepository from '../repositories/PessoaRepository';
import Pessoa from '../models/Pessoa';
import AppError from '../errors/AppError';

interface Request {
  id: string;
}

class EnablePessoaService {
  private pessoaRepository: IPessoaRepository;

  constructor(pessoaRepository: PessoaRepository) {
    this.pessoaRepository = pessoaRepository;
  }

  public async execute({ id }: Request): Promise<Pessoa> {
    const pessoa = await this.pessoaRepository.findById(id);

    if (!pessoa) {
      throw new AppError('Usuário não encontrado', 400);
    }

    pessoa.ativo = !pessoa.ativo;

    await this.pessoaRepository.save(pessoa);

    return pessoa;
  }
}

export default EnablePessoaService;
