import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addedAndUpdatedColumnsUserTable1679562562167
  implements MigrationInterface
{
  readonly tableName: string = 'user';
  readonly oldColumn: TableColumn = new TableColumn({
    name: 'password',
    type: 'varchar',
    length: '100',
    isNullable: false,
  });
  readonly updatedOldColumn: TableColumn = new TableColumn({
    name: 'password',
    type: 'varchar',
    length: '100',
    isNullable: true,
  });
  readonly newColumns: TableColumn[] = [
    new TableColumn({
      name: 'provider',
      type: 'varchar',
      isNullable: true,
    }),
    new TableColumn({
      name: 'picture_url',
      type: 'varchar',
      isNullable: true,
    }),
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      this.tableName,
      this.oldColumn,
      this.updatedOldColumn
    );
    await queryRunner.addColumns(this.tableName, this.newColumns);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      this.tableName,
      this.updatedOldColumn,
      this.oldColumn
    );
    await queryRunner.dropColumns(this.tableName, this.newColumns);
  }
}
