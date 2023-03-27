import { MigrationInterface, QueryRunner, TableColumn, Table } from 'typeorm';

export class createUserTable1678957820964 implements MigrationInterface {
  readonly tableName: string = 'user';
  readonly tableColumns: TableColumn[] = [
    new TableColumn({
      name: 'id',
      type: 'int4',
      isPrimary: true,
      isGenerated: true,
    }),
    new TableColumn({
      name: 'created_at',
      type: 'timestamp',
      default: 'NOW()',
    }),
    new TableColumn({
      name: 'updated_at',
      type: 'timestamp',
      default: 'NOW()',
    }),
    new TableColumn({
      name: 'username',
      type: 'varchar',
      length: '50',
      isNullable: false,
      isUnique: true,
    }),
    new TableColumn({
      name: 'password',
      type: 'varchar',
      length: '100',
      isNullable: false,
    }),
    new TableColumn({
      name: 'refresh_token',
      type: 'varchar',
      isNullable: true,
    }),
  ];
  readonly newTable: Table = new Table({
    name: this.tableName,
    columns: this.tableColumns,
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.newTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.newTable);
  }
}
