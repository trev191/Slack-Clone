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
  const select = 'SELECT * FROM token';
  const query = {
    text: select,
  };
  const {row} = await pool.query(query);
  console.log (row);
  return row;
};