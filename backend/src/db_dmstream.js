const users = require('./db_users');
const msgs = require('./db_messages');
const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

// helper function to retrieve all DM stream initial message ids in row of user table
const getDMstreamIds = async (userId) => {
  const selectDMs = 'SELECT userData FROM users WHERE id = $1';
  const query = {
    text: selectDMs,
    values: [userId],
  }
  const {rows} = await pool.query(query);
  return rows[0].userdata.dmstream;
}

// given a DMStream Id, check the users {} to see if they match
const checkUsersInDMStream = async (dmId, userId1, userId2) => {
  const select = 'SELECT users, initialMessage FROM dmstream WHERE id = $1';
  const query = {
    text: select,
    values: [dmId],
  };
  const {rows} = await pool.query(query);
  const users = rows[0].users;
  const initialMessage = rows[0].initialmessage;

  if (users.user1 === userId1 && users.user2 === userId2) {
    return initialMessage;
  } else if (users.user1 === userId2 && users.user2 === userId1) { 
    return initialMessage;
  } else {
    return false;
  }
}

// function to check to see if a DM exists between the 2 users
exports.checkDmExists = async (userId1, userId2) => {
  const dmList = await getDMstreamIds(userId1);
  for (dmId of dmList) {
    const findDmMatch = await checkUsersInDMStream(dmId, userId1, userId2);
    if (findDmMatch) {
      return findDmMatch;
    }
  }
  return null;
}

// helper function to find out the name of the other user in the DM
const findOtherUserName = async (dmStreamId, userId) => {
  // get the message rows using the initialMessage id
  const select = 'SELECT users FROM dmstream WHERE id = $1';
  const query = {
    text: select,
    values: [dmStreamId],
  };
  const {rows} = await pool.query(query);
  if (rows[0].users.user1 == userId) {
    return users.getUser(rows[0].users.user2);
  } else {
    return users.getUser(rows[0].users.user1);
  }
}

// helper function to retrieve all messages within a DM stream
const getMessagesFromDM = async (dmStreamId, userId) => {
  const messages = [];

  // get the initialMessage id from the dmStreamId
  const selectInitialMessage = 'SELECT initialMessage FROM dmstream WHERE id = $1';
  const initialMessageQuery = {
    text: selectInitialMessage,
    values: [dmStreamId],
  };
  let {rows} = await pool.query(initialMessageQuery);
  const initialMessageId = rows[0].initialmessage;

  // get all messages and replies from dm and fill it into messages[]
  const messagesAndReplies = await
    msgs.getAllMessagesAndReplies(initialMessageId);
  for (index in messagesAndReplies) {
    messages.push(messagesAndReplies[index]);
  }

  // find out the name of the other user in the DM
  const otherUserName = await findOtherUserName(dmStreamId, userId);

  // create a DM object to return messages and name of the other user
  const DMObj = {};
  DMObj.otherUser = otherUserName;
  DMObj.messages = messages;

  return DMObj;
}

// search up the dmstream array from the user table using the
// current signed in user's id, then return an array of all dmstreams
exports.getDMs = async (userId) => {
  if (userId == undefined) {
    return null;
  }
  const dmStreamIds = await getDMstreamIds(userId);
  const allDMs = [];

  // using each dmStreamId, get all messages within the dm and add
  // them to the array of DMs
  for (index in dmStreamIds) {
    const dmMessages = await getMessagesFromDM(dmStreamIds[index], userId);
    allDMs.push(dmMessages);
  }

  allDMs.sort((a, b) => msgs.sortMessages(a, b));

  return (allDMs);
};



// create a new DM stream between the 2 people w/ the initialMessage id
// and return the initialMessage Id
exports.createDMstream = async (userId1, userId2, messageObj) => {
  // generate a new unique DMStream Id
  const streamId = msgs.generateUUID();

  const usersObj = {user1: userId1, user2: userId2};

  // create a new message row in the message table
  const initialMessageId = await msgs.createMessage(messageObj);

  // insert the new DMStream row in the dmstream table
  const insert = 'INSERT INTO dmstream(id, users, initialMessage) VALUES ($1, $2, $3)';
  const query = {
    text: insert,
    values: [streamId, usersObj, initialMessageId],
  }
  await pool.query(query);

  // add DM stream Id to both users
  await users.addDmStreamToUser(userId1, streamId);
  await users.addDmStreamToUser(userId2, streamId);

  // return the message id
  return initialMessageId;
}