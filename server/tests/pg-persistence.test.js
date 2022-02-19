const PgPersistence = require('../db/pg-persistence');
const pgPersistenceInstance = new PgPersistence('test');
const { dbQuery } = require('../db/postgres-query');

describe('PgPersistence', () => {
  beforeEach(async () => {
    const createTestTable = 'CREATE TABLE bins (' +
                              'id serial PRIMARY KEY,' +
                              'hash_id char(8) UNIQUE,' +
                              'created_at timestamp,' +
                              'update_at timestamp)';
    await dbQuery(createTestTable);
    const currentTime = new Date();
    const addData = 'INSERT INTO bins' +
                      '(hash_id, created_at, update_at)' +
                      'VALUES (' +
                        '\'kz4rmvrm\',' +
                        'to_timestamp(1643758945.618),' +
                        'to_timestamp(1643931745.618)),' +
                        '(\'abcdefgh\',' +
                        `to_timestamp(${currentTime.getTime()}),` +
                        `to_timestamp(${currentTime.setHours(currentTime.getHours() + 48)}))`;
    await dbQuery(addData);
  });

  afterEach(async () => {
    const removeTable = 'DROP TABLE bins';
    await dbQuery(removeTable);
  });

  test('has loadBin and createBin functions', () => {
    expect(pgPersistenceInstance).toHaveProperty('loadBin');
    expect(typeof pgPersistenceInstance.loadBin).toBe('function');
    expect(pgPersistenceInstance).toHaveProperty('createBin');
    expect(typeof pgPersistenceInstance.createBin).toBe('function');
  });

  test('loadBin returns the correct bin', async () => {
    const result = await pgPersistenceInstance.loadBin('abcdefgh');
    expect(typeof result).toBe('object');
    expect(result.hash_id).toBe('abcdefgh');
  });

  test('createBin creates a bin', async () => {
    const currentTime = new Date();
    const update = currentTime.setHours(currentTime.getHours() + 48);
    const result = await pgPersistenceInstance.createBin('xxxxxxxx', currentTime.getTime(), update);
    expect(result);
  });

  test('createBin creates a bin that can be retrieved by loadBin', async () => {
    const currentTime = new Date();
    const update = currentTime.setHours(currentTime.getHours() + 48);
    const create = await pgPersistenceInstance.createBin('xxxxxxxx', currentTime.getTime(), update);
    expect(create);
    const load = await pgPersistenceInstance.loadBin('xxxxxxxx');
    expect(typeof load).toBe('object');
    expect(load.hash_id).toBe('xxxxxxxx');
  });
});
