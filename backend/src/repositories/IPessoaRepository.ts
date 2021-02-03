import CreatePessoaDTO from '../dtos/CreatePessoaDTO';
import Pessoa from '../models/Pessoa';

export default interface IPessoaRepository {
  findById(id: string): Promise<Pessoa | undefined>;
  create(createPessoaDTO: CreatePessoaDTO): Promise<Pessoa>;
  save(pessoa: Pessoa): Promise<Pessoa>;
}
