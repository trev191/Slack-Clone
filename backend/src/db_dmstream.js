const users = require('./db_users');
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
  // console.log('rows[0]', rows[0]);
  // console.log('rows[0].userdata.dmstreams', rows[0].userdata.dmstream);
  return rows[0].userdata.dmstream;
}

// helper function to retrieve all messages within a DM stream
const getMessagesFromDM = async (dmStreamId) => {
  const messages = [];

  // get the initialMessage id from the dmStreamId
  const selectInitialMessage = 'SELECT initialMessage FROM dmstream WHERE id = $1';
  const initialMessageQuery = {
    text: selectInitialMessage,
    values: [dmStreamId],
  };
  let {rows} = await pool.query(initialMessageQuery);
  const initialMessageId = rows[0].initialmessage;

  const messagesAndReplies = await getAllMessagesAndReplies(initialMessageId);
  for (index in messagesAndReplies) {
    messages.push(messagesAndReplies[index]);
  }

  return messages;
}

// helper function to retrieve all messages/replies within a DM/thread
const getAllMessagesAndReplies = async (initialMessageId) => {
  // get the message rows using the initialMessage id
  const selectMessages = 'SELECT messageData FROM messages WHERE id = $1';
  const messagesQuery = {
    text: selectMessages,
    values: [initialMessageId],
  };
  const {rows} = await pool.query(messagesQuery);
  const allMessages = rows;
  // console.log('allMessages', allMessages);

  // array of message objects in the DM/thread to return
  const messageObjArray = [];
  
  // push the initial message 
  const messageObj = {};
  const fromUserId = allMessages[0].messagedata.from;
  const userName = await users.getUser(fromUserId);
  messageObj.content = allMessages[0].messagedata.content;
  messageObj.from = userName;
  messageObjArray.push(messageObj);
  

  // 
  // push the replies
  // 

  return messageObjArray;
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
    const dmMessages = await getMessagesFromDM(dmStreamIds[index]);
    allDMs.push(dmMessages);
  }

  return (allDMs);
};