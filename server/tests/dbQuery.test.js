const { dbQuery, poolQuery } = require('../db/postgres-query');

describe('dbQuery', () => {
  beforeEach(async () => {
    const createTestTable = 'CREATE TABLE testBins (' +
                              'id serial PRIMARY KEY,' +
                              'hash_id char(8) UNIQUE,' +
                              'created_at timestamp,' +
                              'update_at timestamp)';
    await poolQuery(createTestTable);
    const addData = 'INSERT INTO testBins' +
                      '(hash_id, created_at, update_at)' +
                      'VALUES (' +
                        '\'kz4rmvrm\',' +
                        'to_timestamp(1643758945.618),' +
                        'to_timestamp(1643931745.618))';
    await poolQuery(addData);
  });

  afterEach(async () => {
    const removeTable = 'DROP TABLE testBins';
    await poolQuery(removeTable);
  });

  test('can select all rows', async () => {
    const select = 'SELECT * FROM testBins';
    const result = await dbQuery(select);
    expect(typeof result).toBe('object');
    expect(result.rows.length).toBe(1);
  });

  test('can select by hash_id', async () => {
    const select = 'SELECT * FROM testBins WHERE hash_id = \'kz4rmvrm\'';
    const result = await dbQuery(select);
    expect(typeof result.rows[0]).toBe('object');
    expect(result.rows[0].hash_id).toBe('kz4rmvrm');
  });

  test('can add into a table', async () => {
    const currentTime = new Date();
    const insertOne = 'INSERT INTO testBins (hash_id, created_at, update_at)' +
                    'VALUES (' +
                      '\'e9xnfl02\',' +
                      `to_timestamp(${currentTime.getTime()}),` +
                      `to_timestamp(${currentTime.setHours(currentTime.getHours() + 48)}))`
    const insertOneResult = await dbQuery(insertOne);
    expect(typeof insertOneResult).toBe('object');
    expect(insertOneResult.rowCount).toBe(1);
    const insertTwo = 'INSERT INTO testBins (hash_id, created_at, update_at)' +
                    'VALUES (' +
                      '\'a8xnfl02\',' +
                      `to_timestamp(${currentTime.getTime()}),` +
                      `to_timestamp(${currentTime.setHours(currentTime.getHours() + 48)})),` +
                      '(\'eyjcos93\',' +
                      `to_timestamp(${currentTime.getTime()}),` +
                      `to_timestamp(${currentTime.setHours(currentTime.getHours() + 48)}))`;
    const insertTwoResult = await dbQuery(insertTwo);
    expect(typeof insertTwoResult).toBe('object');
    expect(insertTwoResult.rowCount).toBe(2);
  });
});
