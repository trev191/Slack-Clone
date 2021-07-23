const msgs = require('./db_messages');
const users = require('./db_users');

exports.createReply = async (req, res) => {
  const userId = req.user.id;
  const initialMessageId = req.params.id;
  const content = req.body.content;

  const newReply = {};
  const date = new Date();
  const userName = await users.getUser(userId);
  newReply.time = date.toISOString();
  newReply.content = content;
  newReply.from = userName;
  newReply.id = await msgs.createReply(initialMessageId, newReply);
  newReply.from = userName;
  res.status(201).send(newReply);
};
