const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

// return the username of a given user uuid
exports.getChannelName = async (id) => {
  const select = 'SELECT channelName FROM channel WHERE id = $1';
  const query = {
    text: select,
    values: [id],
  };
  const {rows} = await pool.query(query);
  return rows[0].channelname;
}

// given a channel Id, return all threads and their replies within
// that channel
exports.getChannelAndThreads = async (id) => {
  const def = [];
  for (let i = 0; i < 3; i++) {
    const thr = {};
    thr.otherUser = 'wilbert #' + i;
    thr.messages = [];
    for (let num = 0; num < 2; num++) {
      const msg = {};
      msg.content = 'hi ' + num;
      msg.from = 'from ' + i;
      thr.messages.push(msg);
    }
    def.push(thr);
  }

  return def;
}