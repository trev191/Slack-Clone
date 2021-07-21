-- Dummy table --
DROP TABLE IF EXISTS dummy;
CREATE TABLE dummy(created TIMESTAMP WITH TIME ZONE);

-- Your database schema goes here --
-- NOTE: ALL UUIDs for the tables should be generated manually within the
-- DB JS files since we need unique ID's that aren't reset when the database
-- restarts (since the tables will need to refer to each other's rows' IDs)

-- Table of Users and Info Related to Each User --
DROP TABLE IF EXISTS users;
CREATE TABLE users(id UUID UNIQUE PRIMARY KEY, userName VARCHAR(32), userData jsonb);

-- Table with the Access Token for issuing JWTs -- 
DROP TABLE IF EXISTS token;
CREATE TABLE token(secret_key VARCHAR(256));

-- Table of Direct Messages --
DROP TABLE IF EXISTS dmstream;
CREATE TABLE dmstream(id UUID UNIQUE PRIMARY KEY, users jsonb, initialMessage UUID);

-- Table of General Messages (for DMs and Channels/Threads) --
DROP TABLE IF EXISTS messages;
CREATE TABLE messages(id UUID UNIQUE PRIMARY KEY, messageData jsonb);

-- Table of Workspaces --
DROP TABLE IF EXISTS workspace;
CREATE TABLE workspace(id UUID UNIQUE PRIMARY KEY, workspaceName VARCHAR(32), workspaceData jsonb);

-- Table of Channels --
DROP TABLE IF EXISTS channel;
CREATE TABLE channel(id UUID UNIQUE PRIMARY KEY, channelName VARCHAR(32), channelData jsonb);