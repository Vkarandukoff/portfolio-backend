import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm';

export class createImageTable1678977506908 implements MigrationInterface {
  readonly tableName: string = 'image';
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
      name: 'comments',
      type: 'varchar',
      length: '1000',
      isNullable: true,
    }),
    new TableColumn({
      name: 'uploaded_by',
      type: 'int4',
      isNullable: false,
    }),
    new TableColumn({
      name: 'portfolio_id',
      type: 'int4',
      isNullable: false,
    }),
  ];

  readonly foreignKeys: TableForeignKey[] = [
    new TableForeignKey({
      name: 'image_user_id_fk',
      columnNames: ['uploaded_by'],
      referencedTableName: 'user',
      referencedColumnNames: ['id'],
      onDelete: 'CASCADE',
    }),
    new TableForeignKey({
      name: 'image_portfolio_id_fk',
      columnNames: ['portfolio_id'],
      referencedTableName: 'portfolio',
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
