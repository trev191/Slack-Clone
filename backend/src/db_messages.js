const users = require('./db_users');
const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

// helper function to find and return a message specified by it's unique id
const getMessage = async (id) => {
  const select = 'SELECT messageData FROM messages WHERE id = $1';
  const query = {
    text: select,
    values: [id],
  };
  const {rows} = await pool.query(query);
  return rows[0].messagedata;
}

// helper function to retrieve all messages/replies within a DM/thread
exports.getAllMessagesAndReplies = async (initialMessageId) => {
  // get the message row using the initialMessage id
  const select = 'SELECT messageData FROM messages WHERE id = $1';
  const messagesQuery = {
    text: select,
    values: [initialMessageId],
  };
  const {rows} = await pool.query(messagesQuery);
  const allMessages = rows;

  // array of message objects in the DM/thread to return
  const messageObjArray = [];
  
  // push the initial message 
  const messageObj = {};
  const fromUserId = allMessages[0].messagedata.from;
  const userName = await users.getUser(fromUserId);
  messageObj.content = allMessages[0].messagedata.content;
  messageObj.from = userName;
  messageObjArray.push(messageObj);
  
  // push the replies
  const replies = allMessages[0].messagedata.replies;
  for (replyId of replies) {
    const message = await getMessage(replyId);
    const name = await users.getUser(message.from);
    const replyObj = {};
    replyObj.content = message.content;
    replyObj.from = name;
    messageObjArray.push(replyObj);
  }

  return messageObjArray;
}