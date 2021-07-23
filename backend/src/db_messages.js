/**
 * Sources Used:
 *  How to compare dates to sort them in order:
 *    https://www.geeksforgeeks.org/compare-two-dates-using-javascript/
 *    https://stackoverflow.com/questions/14781153/how-to-compare-two-string-dates-in-javascript
 *    https://stackoverflow.com/questions/979256/sorting-an-array-of-objects-by-property-values
 *    https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
 *    https://forum.freecodecamp.org/t/sort-on-iso-date/160518/10
 * 
 *  UUID Generator:
 *    https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
 *
 *  Returning the row after an INSERT or UPDATE with 'RETURNING *':
 *    https://www.postgresqltutorial.com/postgresql-insert/
 *    https://www.postgresqltutorial.com/postgresql-update/
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

/**
 * generate a random 36-char UUID of letters, digits and dashes
 * @return {string} 36-char UUID
 */
 exports.generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

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

// sort messages by most recent first -- if messages were created on the
// same date, sort it by their time difference
exports.sortMessages = (a, b) => {
  const lengthA = a.messages.length - 1;
  const lengthB = b.messages.length - 1;
  const dateA = Date.parse(a.messages[lengthA].time.split('T')[0]);
  const dateB = Date.parse(b.messages[lengthB].time.split('T')[0]);
  if (dateB === dateA) {
    const objA = new Date(a.messages[lengthA].time);
    const objB = new Date(b.messages[lengthB].time);
    return (objB.getTime()) - (objA.getTime()); 
  }
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
  messageObj.id = initialMessageId;
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
    replyObj.id = replyId;
    messageObjArray.push(replyObj);
  }

  return messageObjArray;
}

// create a new message with a newly generated UUID and add the message to
// the table; return the new UUID
exports.createMessage = async (messageObj) => {
  // generate a UUID for the message
  const newId = this.generateUUID();

  // add an empty replies field to the message obj and change 'from' to UUID
  messageObj.from = await users.getUserId(messageObj.from);
  messageObj.replies = [];

  // insert the new message into the table
  const insert = 'INSERT INTO messages(id, messageData) VALUES ($1, $2)';
  const query = {
    text: insert,
    values: [newId, messageObj],
  };
  await pool.query(query);
  // return the UUID
  return newId;
}

// create a new message with a newly generated UUID and add the message to
// the replies of the initial message
exports.createReply = async (initialMessageId, messageObj) => {
  // create a new message and get the new UUID of it
  const newId = await this.createMessage(messageObj)
  const updatedMessageData = await getMessage(initialMessageId);
  updatedMessageData.replies.push(newId);

  // update the new message in the replies[] of the initial message
  const update = 'UPDATE messages SET messageData = $2 WHERE id = $1 RETURNING *';
  const query = {
    text: update,
    values: [initialMessageId, updatedMessageData],
  };
  await pool.query(query);

  // return the UUID
  return newId;
}