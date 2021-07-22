/**
 * Sources Used:
 *  How to compare dates to sort them in order:
 *    https://www.geeksforgeeks.org/compare-two-dates-using-javascript/
 *    https://stackoverflow.com/questions/14781153/how-to-compare-two-string-dates-in-javascript
 *    https://stackoverflow.com/questions/979256/sorting-an-array-of-objects-by-property-values
 *    https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
 */

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

exports.sortMessages = (a, b) => {
  const lengthA = a.messages.length - 1;
  const lengthB = b.messages.length - 1;
  const dateA = Date.parse(a.messages[lengthA].time.split('T')[0]);
  const dateB = Date.parse(b.messages[lengthB].time.split('T')[0]);
  return (dateB) - (dateA);
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
  messageObj.time = allMessages[0].messagedata.time;
  messageObjArray.push(messageObj);

  // push the replies
  const replies = allMessages[0].messagedata.replies;
  for (replyId of replies) {
    const message = await getMessage(replyId);
    const name = await users.getUser(message.from);
    const replyObj = {};
    replyObj.content = message.content;
    replyObj.from = name;
    replyObj.time = message.time;
    messageObjArray.push(replyObj);
  }

  return messageObjArray;
}

// create a new message with a newly generated UUID and add the message to
// the table; return the new UUID
exports.createMessage = async (messageObj) => {
  // generate a UUID for the message

  // create a message object to be inserted into the messages table

  // insert the new message into the table

  // return the UUID
}