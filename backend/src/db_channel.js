const msgs = require('./db_messages');
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

// helper function to retrieve all thread Ids from the channel table
const getThreadIds = async (channelId) => {
  const select = 'SELECT channelData FROM channel WHERE id = $1';
  const query = {
    text: select,
    values: [channelId],
  }
  const {rows} = await pool.query(query);
  if (rows.length !== 0) {
    return rows[0].channeldata.threads;
  } else {
    return [];
  }
}

// given a channel Id, return all threads and their replies within
// that channel
exports.getThreadsAndReplies = async (channelId) => {
  const allThreadsAndReplies = [];
  const threadIds = await getThreadIds(channelId);
  
  // using each threadId, get all messages within the thread and
  // add them to the array of threads and replies, along with the
  // name of the person that first sent the message
  for (threadId of threadIds) {
    const threadObj = {};
    const messages = await msgs.getAllMessagesAndReplies(threadId);
    threadObj.otherUser = messages[0].from;
    threadObj.messages = messages;
    allThreadsAndReplies.push(threadObj);
  }

  return allThreadsAndReplies;
}