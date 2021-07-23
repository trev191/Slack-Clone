/**
 * Sources Used:
 *  Creating a callback with pool.query:
 *    https://stackoverflow.com/questions/28928736/returning-the-results-of-an-mysql-query-ends-up-returning-undefined
 *
 *  Returning the value of an async function (query):
 *    https://stackoverflow.com/questions/58254717/returning-the-result-of-a-node-postgres-query
 */

const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

// return the secret access token key
exports.getSecretKey = async () => {
  const select = 'SELECT secret_key FROM token';
  const query = {
    text: select,
  };
  const result = await pool.query(query);
  return result.rows[0].secret_key;
};
