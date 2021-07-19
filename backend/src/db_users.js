var bcrypt = require('bcrypt');
const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

// search up a match of a username and password (non-hashed) and
// return the JSON object if the user if it exists
exports.checkLogin = async (name, password) => {
  const select = `SELECT userName, userData FROM users WHERE
    userName = $1 AND userData->>'password' = $2`;
  const query = {
    text: select,
    values: [name, password],
  };
  const result = await pool.query(query);
  if (result.rowCount == 0) {
    return null;
  } else {
    console.log('result.rows', result.rows);
    const userJSON = {};
    userJSON.userName = result.rows[0].username;
    return userJSON;
  }
};