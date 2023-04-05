import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
  Table,
} from 'typeorm';

export class createPortfolioTable1678975907350 implements MigrationInterface {
  readonly tableName: string = 'portfolio';
  readonly tableColumns: TableColumn[] = [
    new TableColumn({
      name: 'id',
      type: 'int4',
      isPrimary: true,
      isGenerated: true,
    }),
    new TableColumn({
      name: 'updated_at',
      type: 'timestamp',
      default: 'NOW()',
    }),
    new TableColumn({
      name: 'created_at',
      type: 'timestamp',
      default: 'NOW()',
    }),
    new TableColumn({
      name: 'name',
      type: 'varchar',
      length: '100',
      isNullable: false,
    }),
    new TableColumn({
      name: 'description',
      type: 'varchar',
      length: '1000',
      isNullable: true,
    }),
    new TableColumn({
      name: 'created_by',
      type: 'int4',
      isNullable: false,
    }),
  ];

  readonly foreignKeys: TableForeignKey[] = [
    new TableForeignKey({
      name: 'portfolio_user_id_fk',
      columnNames: ['created_by'],
      referencedTableName: 'user',
      referencedColumnNames: ['id'],
      onDelete: 'CASCADE',
    }),
  ];

  readonly newTable = new Table({
    name: this.tableName,
    columns: this.tableColumns,
    foreignKeys: this.foreignKeys,
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.newTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(new Table(this.newTable));
  }
}
