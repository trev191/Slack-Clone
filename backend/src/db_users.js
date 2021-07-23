const hash = require('./auth');
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
  const hashedPassword = await hash.hashPassword(password);
  const select = `SELECT * FROM users WHERE
    userName = $1 AND userData->>'password' = $2`;
  const query = {
    text: select,
    values: [name, hashedPassword],
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
};

// return the uuid of a given user username
exports.getUserId = async (userName) => {
  const select = 'SELECT id FROM users WHERE userName = $1';
  const query = {
    text: select,
    values: [userName],
  };
  const {rows} = await pool.query(query);
  if (rows.length === 0) {
    return null;
  }
  return rows[0].id;
};

// verify if a user is a member in a given channel
exports.userIsChannelMember = async (userId, channelId) => {
  const select = 'SELECT userData FROM users WHERE id = $1';
  const query = {
    text: select,
    values: [userId],
  };
  const {rows} = await pool.query(query);
  const channelIds = rows[0].userdata.channels;
  // check if the channelId is in the userdata - if it is, it means
  // the user is a valid member of the channel
  for (id of channelIds) {
    if (id === channelId) {
      return true;
    }
  }
  return false;
};

// function to get user data JSON blob
const getUserData = async (id) => {
  const select = 'SELECT userData FROM users WHERE id = $1';
  const query = {
    text: select,
    values: [id],
  };
  const {rows} = await pool.query(query);
  return rows[0].userdata;
};

// add DMstream ID to a single user
exports.addDmStreamToUser = async (userId, dmStreamId) => {
  const updatedUserData = await getUserData(userId);

  updatedUserData.dmstream.push(dmStreamId);

  const update = 'UPDATE users SET userData = $2 WHERE id = $1';
  const query = {
    text: update,
    values: [userId, updatedUserData],
  };
  await pool.query(query);
};
