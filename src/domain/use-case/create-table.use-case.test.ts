import { CreateTable } from './create-table.use-case';

describe('CreateTableUseCase', () => {
  const createTable = new CreateTable();
  test('should create table with value', () => {
    const table = createTable.execute({base: 2});
    const totalTableRow = table.split('\n').length;

    expect(createTable).toBeInstanceOf(CreateTable);
    expect(table).toContain('2 x 1 = 2');
    expect(table).toContain('2 x 5 = 10');
    expect(totalTableRow).toBe(10);
  })

  test('Should create table with custom value', () => {
    const options = {
      base: 3,
      limit: 20
    }
    
    const table = createTable.execute(options);
    const totalTableRow = table.split('\n').length;
    expect(table).toContain(`${options.base} x 4 = ${options.base * 4}`)
    expect(table).toContain(`${options.base} x 5 = ${options.base * 5}`)
    expect(totalTableRow).toBe(options.limit);
  })
})