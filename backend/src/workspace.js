const ws = require('./db_workspace');

exports.getWorkspacesAndChannels = async (req, res) => {
  const user = req.user;
  const workspaces = await ws.getWorkspacesAndChannels(user.id);
  if (workspaces) {
    res.status(200).json(workspaces);
  } else {
    res.status(404).send();
  }
}