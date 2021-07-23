/**
 * Sources Used:
 *  How to compare dates to sort them in order:
 *    https://www.geeksforgeeks.org/compare-two-dates-using-javascript/
 *    https://stackoverflow.com/questions/14781153/how-to-compare-two-string-dates-in-javascript
 *    https://stackoverflow.com/questions/979256/sorting-an-array-of-objects-by-property-values
 *    https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
 */

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
};

// helper function to retrieve all thread Ids from the channel table
const getThreadIds = async (channelId) => {
  const select = 'SELECT channelData FROM channel WHERE id = $1';
  const query = {
    text: select,
    values: [channelId],
  };
  const {rows} = await pool.query(query);
  if (rows.length !== 0) {
    return rows[0].channeldata.threads;
  } else {
    return [];
  }
};

// helper function to get the channelData from a channel
const getChannelData = async (channelId) => {
  const select = 'SELECT channelData FROM channel WHERE id = $1';
  const query = {
    text: select,
    values: [channelId],
  };
  const {rows} = await pool.query(query);
  if (rows.length !== 0) {
    return rows[0].channeldata;
  } else {
    return [];
  }
};

// sort threads by the first message in each thread (this is different
// from how regular DMs are sorted)
const sortThreads = (a, b) => {
  const dateA = Date.parse(a.messages[0].time.split('T')[0]);
  const dateB = Date.parse(b.messages[0].time.split('T')[0]);
  if (dateB === dateA) {
    const objA = new Date(a.messages[0].time);
    const objB = new Date(b.messages[0].time);
    return (objB.getTime()) - (objA.getTime());
  }
  return (dateB) - (dateA);
};

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

  allThreadsAndReplies.sort((a, b) => sortThreads(a, b));

  return allThreadsAndReplies;
};

// post a new thread to a channel given the channelId and the
// newThread object to post; return the newly created message id
exports.createThread = async (channelId, newThread) => {
  // create message with newThread and insert into messages table
  // and save the newly generated UUID return value
  const messageId = await msgs.createMessage(newThread);

  // get current channelData object and add the newly created message to it
  const channelData = await getChannelData(channelId);
  channelData.threads.push(messageId);

  // get channel row with channelId and update channel's threads array
  const update = 'UPDATE channel SET channelData = $2 WHERE id = $1';
  const query = {
    text: update,
    values: [channelId, channelData],
  };
  await pool.query(query);

  return messageId;
};
