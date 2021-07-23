const channel = require('./db_channel');
const users = require('./db_users');
const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

// helper function to retrieve workspace ids from the user table
const getWorkspaceIds = async (userId) => {
  const select = 'SELECT userData FROM users WHERE id = $1';
  const query = {
    text: select,
    values: [userId],
  };
  const {rows} = await pool.query(query);
  return rows[0].userdata.workspaces;
};

// function to get the corresponding workspace name given a workspace ID
const getWorkspaceName = async (id) => {
  const select = 'SELECT workspaceName FROM workspace WHERE id = $1';
  const query = {
    text: select,
    values: [id],
  };
  const {rows} = await pool.query(query);
  return rows[0].workspacename;
};

// function to get the channel ids and names within a workspace
const getChannelIdsAndNames = async (userId, id) => {
  const select = 'SELECT workspaceData FROM workspace WHERE id = $1';
  const query = {
    text: select,
    values: [id],
  };
  const {rows} = await pool.query(query);
  const channelIds = rows[0].workspacedata.channels;
  const allChannels = [];

  // add the channel Id and Name to allChannels IFF the user is a member of it
  for (channelId of channelIds) {
    const isMember = await users.userIsChannelMember(userId, channelId);
    if (isMember) {
      const channelObj = {};
      channelObj.channelId = channelId;
      channelObj.channelName = await channel.getChannelName(channelId);
      allChannels.push(channelObj);
    }
  }

  return allChannels;
};

// search up the workspaces array from the user table using the
// current signed in user's id, then return an array of objects:
// each object consisting of a workspace name and an array of channel
// names & channel IDs
exports.getWorkspacesAndChannels = async (userId) => {
  const allWorkspacesAndChannels = [];
  const workspaceIds = await getWorkspaceIds(userId);

  for (id of workspaceIds) {
    const workspace = {};
    workspace.workspaceName = await getWorkspaceName(id);
    workspace.channels = await getChannelIdsAndNames(userId, id);
    allWorkspacesAndChannels.push(workspace);
  }
  return allWorkspacesAndChannels;
};
