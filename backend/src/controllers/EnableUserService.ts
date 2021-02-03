import Pessoa from '../models/Pessoa';
import IPessoaRepository from '../repositories/IPessoaRepository';
import PessoaRepository from '../repositories/PessoaRepository';
import AppError from '../errors/AppError';

interface Request {
  id: string;
}
class EnablePessoaService {
  private PessoaRepository: IPessoaRepository;

  constructor(PessoaRepository: PessoaRepository) {
    this.PessoaRepository = PessoaRepository;
  }

  public async execute({ id }: Request): Promise<Pessoa> {
    const Pessoa = await this.PessoaRepository.findById(id);

    if (!Pessoa) {
      throw new AppError('Usuário não encontrado', 400);
    }

    Pessoa.active = !Pessoa.active;

    await this.PessoaRepository.save(Pessoa);
    return Pessoa;
  }
}

export default EnablePessoaService;
