const { dbQuery } = require('./postgres-query');

module.exports = class PgPersistence {
  constructor(name) {
    this.name = name;
  }

  async loadBin(hash) {
    const LOAD_BIN = "SELECT * FROM bins WHERE hash_id = ($1)";
    let result = await dbQuery(LOAD_BIN, hash);
    return result.rows[0];
  }

  async createBin(hash, createTime, updateTime) {
    const CREATE_BIN = "INSERT INTO bins" +
                       "  (hash_id, created_at, update_at)" +
                       "VALUES ($1, to_timestamp($2 / 1000.0), to_timestamp($3 / 1000.0))"

    let result = await dbQuery(CREATE_BIN, hash, createTime, updateTime);
    return result.rowCount > 0;
  }
}
