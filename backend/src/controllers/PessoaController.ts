import { Request, Response } from 'express';
import PessoaRepository from '../repositories/PessoaRepository';
import CreatePessoaService from '../services/CreatePessoaService';
import EnablePessoaService from '../services/EnablePessoaService';

class PessoaController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      nome_completo,
      cpf_cnpj,
      rg,
      email,
      senha,
      url_foto,
    } = request.body;

    const pessoaRepository = new PessoaRepository();
    const createPessoa = new CreatePessoaService(pessoaRepository);

    const pessoa = await createPessoa.execute({
      nome_completo,
      cpf_cnpj,
      rg,
      email,
      senha,
      url_foto,
    });

    delete pessoa.senha;

    return response.json(pessoa);
  }

  public async enable(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const pessoaRepository = new PessoaRepository();
    const enablePessoa = new EnablePessoaService(pessoaRepository);

    const pessoa = await enablePessoa.execute({
      id,
    });
    delete pessoa.senha;

    return response.json(pessoa);
  }
}

export default PessoaController;
