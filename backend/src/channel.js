const channel = require('./db_channel');
const users = require('./db_users');

exports.getThreadsAndReplies = async (req, res) => {
  const channelId = req.params.id;
  const channelsAndThreads = await channel.getThreadsAndReplies(channelId);
  if (channelsAndThreads) {
    res.status(200).json(channelsAndThreads);
  } else {
    res.status(404).send();
  }
};

exports.createThread = async (req, res) => {
  const userId = req.user.id;
  const channelId = req.params.id;
  const content = req.body.content;

  const newThread = {};
  const date = new Date();
  const userName = await users.getUser(userId);
  newThread.time = date.toISOString();
  newThread.content = content;
  newThread.from = userName;
  newThread.id = await channel.createThread(channelId, newThread);
  newThread.from = userName;
  res.status(201).send(newThread);
};
