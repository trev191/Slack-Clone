const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

// search up the dmstream array from the user table using the
// current signed in user's id, then return an array of the dmstream IDs
exports.getDMstream = async (userId) => {
  
};