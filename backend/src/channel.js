const channel = require('./db_channel');

exports.getChannelAndThreads = async (req, res) => {
  const channelId = req.params.id;
  const channelsAndThreads = await channel.getChannelAndThreads(channelId);
  if (channelsAndThreads) {
    res.status(200).json(channelsAndThreads);
  } else {
    res.status(404).send();
  }
}