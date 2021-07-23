-- Manually generated UUIDs are from https://www.uuidgenerator.net/ --

-- Dummy Data --
INSERT INTO dummy (created) VALUES (current_timestamp);

-- Populate Your Tables Here --

-- Users Table --
-- The password for Molly and Anna are 'mollymember' and 'annaadmin',
-- and everyone else's password is 'pw' 
DELETE FROM users;
INSERT INTO users(id, userName, userData) VALUES (
  '9a9986ec-6703-40d1-a873-3125fd065242',
  'Trevor',
  '{"password":"$2b$10$NWRUkWNTCvaW8fBMe59.6ev47FOAJ9GATcaOWugGn.knKqHXLfp8W",
    "loggedOn":"false",
    "status":"EMPTY_STATUS",
    "workspaces":["18679300-a341-4647-849d-0529fae9d7a7", "2f9108ef-0661-4ea0-9b48-411409eeefe6"],
    "channels":["7e8b485a-2ab0-4241-913f-460393723227", "73ae363b-5a67-4647-932a-31a5538598b3", "7170f314-20d4-48ef-b3ea-8cc7f7272cb4"],
    "dmstream":["754dd19b-9348-4d06-99e7-55274bc2bd27", "64ed3198-c45b-4e48-8e23-e95e72d7b120"]}'
  );
INSERT INTO users(id, userName, userData) VALUES (
  '0c187a60-8793-4a84-99c9-a1f8a4e3ea77',
  'Carrum',
  '{"password":"$2b$10$NWRUkWNTCvaW8fBMe59.6ev47FOAJ9GATcaOWugGn.knKqHXLfp8W",
    "loggedOn":"false",
    "status":"EMPTY_STATUS",
    "workspaces":["18679300-a341-4647-849d-0529fae9d7a7", "2f9108ef-0661-4ea0-9b48-411409eeefe6"],
    "channels":["7e8b485a-2ab0-4241-913f-460393723227", "b5dbf3bf-2083-4e57-9b3f-7e9e2fc14cb5", "73ae363b-5a67-4647-932a-31a5538598b3", "7170f314-20d4-48ef-b3ea-8cc7f7272cb4"],
    "dmstream":["754dd19b-9348-4d06-99e7-55274bc2bd27"]}'
  );
INSERT INTO users(id, userName, userData) VALUES (
  '943b1b36-ae1b-417c-8254-46eec5bd41fa',
  'Molly',
  '{"password":"$2b$10$NWRUkWNTCvaW8fBMe59.6eEMGgk37kLXmJlngvHcYlNnP88MbrEl6",
    "loggedOn":"false",
    "status":"EMPTY_STATUS",
    "workspaces":["18679300-a341-4647-849d-0529fae9d7a7"],
    "channels":["7e8b485a-2ab0-4241-913f-460393723227", "b5dbf3bf-2083-4e57-9b3f-7e9e2fc14cb5", "73ae363b-5a67-4647-932a-31a5538598b3"],
    "dmstream":["64ed3198-c45b-4e48-8e23-e95e72d7b120"]}'
  );
INSERT INTO users(id, userName, userData) VALUES (
  'e4332099-25c9-4bff-b986-009c631e60ee',
  'Anna',
  '{"password":"$2b$10$NWRUkWNTCvaW8fBMe59.6e2ktsXcRV2gS7Mk7rzwWFtRCKqMBvBm6",
    "loggedOn":"false",
    "status":"EMPTY_STATUS",
    "workspaces":["2f9108ef-0661-4ea0-9b48-411409eeefe6"],
    "channels":["7170f314-20d4-48ef-b3ea-8cc7f7272cb4"],
    "dmstream":[]}'
  );
INSERT INTO users(id, userName, userData) VALUES (
  'ac82e663-4492-447b-953a-6f0cab71eff7',
  'Madison',
  '{"password":"$2b$10$NWRUkWNTCvaW8fBMe59.6ev47FOAJ9GATcaOWugGn.knKqHXLfp8W",
    "loggedOn":"false",
    "status":"EMPTY_STATUS",
    "workspaces":["18679300-a341-4647-849d-0529fae9d7a7", "2f9108ef-0661-4ea0-9b48-411409eeefe6"],
    "channels":["7e8b485a-2ab0-4241-913f-460393723227", "b5dbf3bf-2083-4e57-9b3f-7e9e2fc14cb5", "73ae363b-5a67-4647-932a-31a5538598b3", "7170f314-20d4-48ef-b3ea-8cc7f7272cb4"],
    "dmstream":[]}'
  );

-- Secret Key Table --
DELETE FROM token;
INSERT INTO token(secret_key) VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFubmFAYm9va3MuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjA2Mjc3MDAxLCJleHAiOjE2MDYyNzcwNjF9.1nwY0lDMGrb7AUFFgSaYd4Q7Tzr-BjABclmoKZOqmr4');

-- Direct Messages Stream Table --
DELETE FROM dmstream;
-- DM of Trevor and Carrum
INSERT INTO dmstream(id, users, initialMessage) VALUES (
  '754dd19b-9348-4d06-99e7-55274bc2bd27',
  '{"user1":"9a9986ec-6703-40d1-a873-3125fd065242",
    "user2":"0c187a60-8793-4a84-99c9-a1f8a4e3ea77"}',
  'df40b29d-5c07-4a40-be2e-960b94acfcbe'
  );
-- DM of Trevor and Molly
INSERT INTO dmstream(id, users, initialMessage) VALUES (
  '64ed3198-c45b-4e48-8e23-e95e72d7b120',
  '{"user1":"9a9986ec-6703-40d1-a873-3125fd065242",
    "user2":"943b1b36-ae1b-417c-8254-46eec5bd41fa"}',
  'a56f12cc-77d2-449a-9697-e6a1e5a3532a'
  );

-- General Messages Table --
DELETE FROM messages;
-- Message from Trevor to Carrum
INSERT INTO messages(id, messageData) VALUES (
  'df40b29d-5c07-4a40-be2e-960b94acfcbe',
  '{"from":"9a9986ec-6703-40d1-a873-3125fd065242",
    "time":"2021-06-07T04:00:00.000Z",
    "content":"wats up man",
    "replies":["1864f18c-fea6-488a-904c-488676e5e471",
               "5cb204c1-d97d-4814-98ae-230491dd363c"]}'
  );
-- Reply from Carrum to Trevor
INSERT INTO messages(id, messageData) VALUES (
  '1864f18c-fea6-488a-904c-488676e5e471',
  '{"from":"0c187a60-8793-4a84-99c9-a1f8a4e3ea77",
    "time":"2021-06-07T05:00:50.760Z",
    "content":"nm wbu buddy",
    "replies":[]}'
  );
-- Reply from Trevor to Carrum
INSERT INTO messages(id, messageData) VALUES (
  '5cb204c1-d97d-4814-98ae-230491dd363c',
  '{"from":"9a9986ec-6703-40d1-a873-3125fd065242",
    "time":"2021-06-08T08:30:20.000Z",
    "content":"j chillin u kno",
    "replies":[]}'
  );
  
-- Message from Molly to Trevor
INSERT INTO messages(id, messageData) VALUES (
  'a56f12cc-77d2-449a-9697-e6a1e5a3532a',
  '{"from":"943b1b36-ae1b-417c-8254-46eec5bd41fa",
    "time":"2021-07-07T14:27:00.51Z",
    "content":"heyoooo",
    "replies":[]}'
  );

-- Thread with 1 reply 
INSERT INTO messages(id, messageData) VALUES (
  '30d3dd65-30bc-40c5-b70c-107ed9d38d42',
  '{"from":"943b1b36-ae1b-417c-8254-46eec5bd41fa",
    "content":"whats the homework for tonight?????",
    "time":"2021-05-20T17:34:21.11Z",
    "replies":["c2a38e9a-5ec5-4783-9cb4-ded43ab00dbb"]}'
  );

INSERT INTO messages(id, messageData) VALUES (
  'c2a38e9a-5ec5-4783-9cb4-ded43ab00dbb',
  '{"from":"e4332099-25c9-4bff-b986-009c631e60ee",
    "time":"2021-05-20T18:27:00.19Z",
    "content":"guess theres no homework!! haha!! XD",
    "replies":[]}'
  );

-- Thread with no reply
INSERT INTO messages(id, messageData) VALUES (
  '8166e988-26d8-403c-802e-c62cb61f87f1',
  '{"from":"e4332099-25c9-4bff-b986-009c631e60ee",
    "time":"2021-06-07T14:27:00.45Z",
    "content":"Anybody wanna build a web app together?",
    "replies":[]}'
  );

-- Thread with no reply
INSERT INTO messages(id, messageData) VALUES (
  '54b5c684-f757-4c30-a568-5132ac60b6dc',
  '{"from":"943b1b36-ae1b-417c-8254-46eec5bd41fa",
    "time":"2020-07-30T20:41:06.31Z",
    "content":"Its quiet in this chat...",
    "replies":[]}'
  );

  -- Workspace Table --
INSERT INTO workspace(id, workspaceName, workspaceData) VALUES (
  '18679300-a341-4647-849d-0529fae9d7a7',
  'CSE 183',
  '{
    "channels":["7e8b485a-2ab0-4241-913f-460393723227",
                "b5dbf3bf-2083-4e57-9b3f-7e9e2fc14cb5",
                "73ae363b-5a67-4647-932a-31a5538598b3"]}'
);

INSERT INTO workspace(id, workspaceName, workspaceData) VALUES (
  '2f9108ef-0661-4ea0-9b48-411409eeefe6',
  'CSE 9000',
  '{
    "channels":["7170f314-20d4-48ef-b3ea-8cc7f7272cb4"]}'
);

  -- Channel Table --
INSERT INTO channel(id, channelName, channelData) VALUES (
  '7e8b485a-2ab0-4241-913f-460393723227',
  'Assignment 1',
  '{
    "threads":["30d3dd65-30bc-40c5-b70c-107ed9d38d42",
                "8166e988-26d8-403c-802e-c62cb61f87f1"]}'
);

INSERT INTO channel(id, channelName, channelData) VALUES (
  'b5dbf3bf-2083-4e57-9b3f-7e9e2fc14cb5',
  'Assignment 2',
  '{
    "threads":["54b5c684-f757-4c30-a568-5132ac60b6dc"]}'
);

INSERT INTO channel(id, channelName, channelData) VALUES (
  '73ae363b-5a67-4647-932a-31a5538598b3',
  'Assignment 3',
  '{
    "threads":[]}'
);

INSERT INTO channel(id, channelName, channelData) VALUES (
  '7170f314-20d4-48ef-b3ea-8cc7f7272cb4',
  'Group Project',
  '{
    "threads":[]}'
);