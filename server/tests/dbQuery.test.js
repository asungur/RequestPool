const { dbQuery, poolQuery } = require('../db/postgres-query');

describe('dbQuery', () => {
  beforeEach(async () => {
    console.log(poolQuery);
    const createTestTable = 'CREATE TABLE testBins (' +
                              'id serial PRIMARY KEY,' +
                              'hash_id char(8) UNIQUE,' +
                              'created_at timestamp,' +
                              'update_at timestamp)';
    poolQuery(createTestTable).then(result => {
      console.log(result);
      const addData = 'INSERT INTO testBins' +
                        '(hash_id, created_at, update_at)' +
                        'VALUES (' +
                          '\'kz4rmvrm\',' +
                          'to_timestamp(1643758945.618),' +
                          'to_timestamp(1643931745.618))';
      poolQuery(addData).then(result => {
        console.log(result);
        return
      });
    });
  });

  afterEach(async () => {
    const removeTable = 'DROP TABLE testBins';
    poolQuery(removeTable).then(result => {
      console.log(result);
      return
    });
  });

  test('can select all rows', async () => {
    const selectAll = 'SELECT * FROM testBins';
    const result = await dbQuery(selectAll);
    expect(typeof result).toBe('string');
  });
});
