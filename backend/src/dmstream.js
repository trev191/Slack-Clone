const db = require('./db_dmstream');
const users = require('./db_users');
const msgs = require('./db_messages');

exports.getAllDMs = async (req, res) => {
  const user = req.user;
  const dms = await db.getDMs(user.id);
  if (dms) {
    res.status(200).json(dms);
  } else {
    res.status(404).send();
  }
};

// create a new DM with user (if user exists and DM doesn't exist
// between them yet); then send the first initial message
exports.createDM = async (req, res) => {
  const userId = req.user.id;
  const otherUserName = req.params.userName;
  const content = req.body.content;

  // see if the given username is a real user
  const otherUserId = await users.getUserId(otherUserName);
  // create new DM or send message to existing DM to valid other user
  if (otherUserId) {
    const messageObj = {};
    const date = new Date();
    const userName = await users.getUser(userId);
    messageObj.time = date.toISOString();
    messageObj.content = content;
    messageObj.from = userName;

    // check if the dm with the current user exists; gets initialMessage id
    // if the dm DOES exist
    const dmExists = await db.checkDmExists(userId, otherUserId);

    // if dm already exists, send a reply in the message
    if (dmExists) {
      messageObj.id = await msgs.createReply(dmExists, messageObj);
      messageObj.from = userName;
    } else {
      // dm doesn't exist yet, create a new one and create the first message
      messageObj.id = await db.createDMstream(userId, otherUserId, messageObj);
    }

    res.status(201).send(messageObj);
  } else {
    res.status(404).send();
  }
};
