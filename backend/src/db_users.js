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
  const select = `SELECT * FROM users WHERE
    userName = $1 AND userData->>'password' = $2`;
  const query = {
    text: select,
    values: [name, password],
  };
  const result = await pool.query(query);
  if (result.rowCount == 0) {
    return null;
  } else {
    const userJSON = {};
    userJSON.userName = result.rows[0].username;
    userJSON.id = result.rows[0].id;
    return userJSON;
  }
};

// return the username of a given user uuid
exports.getUser = async (id) => {
  const select = 'SELECT userName FROM users WHERE id = $1';
  const query = {
    text: select,
    values: [id],
  };
  const {rows} = await pool.query(query);
  return rows[0].username;
}