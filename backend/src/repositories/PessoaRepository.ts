import { getRepository, Repository } from 'typeorm';
import CreatePessoaDTO from '../dtos/CreatePessoaDTO';
import Pessoa from '../models/Pessoa';
import IPessoaRepository from './IPessoaRepository';

class PessoaRepository implements IPessoaRepository {
  private ormRepository: Repository<Pessoa>;

  constructor() {
    this.ormRepository = getRepository(Pessoa);
  }

  public async findById(id: string): Promise<Pessoa | undefined> {
    const pessoa = await this.ormRepository.findOne({
      where: { id },
    });
    return pessoa;
  }

  public async create({
    nome_completo,
    cpf_cnpj,
    rg,
    email,
    senha,
    url_foto,
  }: CreatePessoaDTO): Promise<Pessoa> {
    const pessoa = this.ormRepository.create({
      nome_completo,
      cpf_cnpj,
      rg,
      email,
      senha,
      url_foto,
    });

    await this.ormRepository.save(pessoa);

    return pessoa;
  }

  public async save(pessoa: Pessoa): Promise<Pessoa> {
    return this.ormRepository.save(pessoa);
  }
}

export default PessoaRepository;
