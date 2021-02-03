import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tab_pessoa')
class Pessoa {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome_completo: string;

  @Column()
  cpf_cnpj: number;

  @Column()
  rg: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  senha: string;

  @Column()
  url_foto: string;

  @Column()
  ativo: boolean;

  @CreateDateColumn()
  criado_em: Date;

  @UpdateDateColumn()
  atualizado_em: Date;
}

export default Pessoa;
