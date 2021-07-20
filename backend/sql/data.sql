-- Manually generated UUIDs are from https://www.uuidgenerator.net/ --

-- Dummy Data --
INSERT INTO dummy (created) VALUES (current_timestamp);

-- Populate Your Tables Here --

-- Users Table --
DELETE FROM users;
INSERT INTO users(id, userName, userData) VALUES ('9a9986ec-6703-40d1-a873-3125fd065242', 'Trevor','{"password":"pw","loggedOn":"false","status":"EMPTY_STATUS","dmstream":["754dd19b-9348-4d06-99e7-55274bc2bd27", "64ed3198-c45b-4e48-8e23-e95e72d7b120"]}');
INSERT INTO users(id, userName, userData) VALUES ('0c187a60-8793-4a84-99c9-a1f8a4e3ea77', 'Carrum','{"password":"pw","loggedOn":"false","status":"EMPTY_STATUS","dmstream":["754dd19b-9348-4d06-99e7-55274bc2bd27"]}');
INSERT INTO users(id, userName, userData) VALUES ('943b1b36-ae1b-417c-8254-46eec5bd41fa', 'molly@member.com','{"password":"mollymember","loggedOn":"false","status":"EMPTY_STATUS","dmstream":["64ed3198-c45b-4e48-8e23-e95e72d7b120"]}');
INSERT INTO users(id, userName, userData) VALUES ('e4332099-25c9-4bff-b986-009c631e60ee', 'anna@books.com','{"password":"annaadmin","loggedOn":"false","status":"EMPTY_STATUS","dmstream":[]}');

-- Secret Key Table --
DELETE FROM token;
INSERT INTO token(secret_key) VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFubmFAYm9va3MuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjA2Mjc3MDAxLCJleHAiOjE2MDYyNzcwNjF9.1nwY0lDMGrb7AUFFgSaYd4Q7Tzr-BjABclmoKZOqmr4');

-- Direct Messages Stream Table --
DELETE FROM dmstream;
-- DM of Trevor and Carrum
INSERT INTO dmstream(id, users, initialMessage) VALUES ('754dd19b-9348-4d06-99e7-55274bc2bd27', '{"user1":"9a9986ec-6703-40d1-a873-3125fd065242","user2":"0c187a60-8793-4a84-99c9-a1f8a4e3ea77"}', 'df40b29d-5c07-4a40-be2e-960b94acfcbe');
-- DM of Trevor and molly@member.com
INSERT INTO dmstream(id, users, initialMessage) VALUES ('64ed3198-c45b-4e48-8e23-e95e72d7b120', '{"user1":"9a9986ec-6703-40d1-a873-3125fd065242","user2":"943b1b36-ae1b-417c-8254-46eec5bd41fa"}', 'a56f12cc-77d2-449a-9697-e6a1e5a3532a');

-- General Messages Table --
DELETE FROM messages;
-- Message from Trevor to Carrum
INSERT INTO messages(id, messageData) VALUES ('df40b29d-5c07-4a40-be2e-960b94acfcbe', '{"from":"9a9986ec-6703-40d1-a873-3125fd065242", "content":"wats up man"}');
-- Message from molly@member.com to Trevor
INSERT INTO messages(id, messageData) VALUES ('a56f12cc-77d2-449a-9697-e6a1e5a3532a', '{"from":"943b1b36-ae1b-417c-8254-46eec5bd41fa", "content":"heyoooo"}');