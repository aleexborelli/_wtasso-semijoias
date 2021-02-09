import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateTabTipoPessoa1612810927782
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tab_tipo_pessoa',
        columns: [
          {
            name: 'cod_tipo_pessoa',
            type: 'integer',
          },
          {
            name: 'des_tipo_pessoa',
            type: 'varchar',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tab_tipo_pessoa');
  }
}
