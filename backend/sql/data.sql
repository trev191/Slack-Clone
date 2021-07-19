-- Manually generated UUIDs are from https://www.uuidgenerator.net/ --

-- Dummy Data --
INSERT INTO dummy (created) VALUES (current_timestamp);

-- Populate Your Tables Here --

-- Users Table --
DELETE FROM users;
INSERT INTO users(id, userName, userData) VALUES ('9a9986ec-6703-40d1-a873-3125fd065242', 'Trevor','{"password":"pw","loggedOn":"false","status":"EMPTY_STATUS","dmstream":["754dd19b-9348-4d06-99e7-55274bc2bd27", "64ed3198-c45b-4e48-8e23-e95e72d7b120"]}');
INSERT INTO users(id, userName, userData) VALUES ('751ad62c-250e-45c6-83fa-4ea40dba0fd9', 'Carrum','{"password":"pw","loggedOn":"false","status":"EMPTY_STATUS","dmstream":"754dd19b-9348-4d06-99e7-55274bc2bd27"}');
INSERT INTO users(id, userName, userData) VALUES ('8a9986ec-6703-40d1-a873-3125fd065242', 'molly@member.com','{"password":"mollymember","loggedOn":"false","status":"EMPTY_STATUS","dmstream":"64ed3198-c45b-4e48-8e23-e95e72d7b120"}');
INSERT INTO users(id, userName, userData) VALUES ('5a9986ec-6703-40d1-a873-3125fd065242', 'anna@books.com','{"password":"annaadmin","loggedOn":"false","status":"EMPTY_STATUS"}');

-- Secret Key Table --
DELETE FROM token;
INSERT INTO token(secret_key) VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFubmFAYm9va3MuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjA2Mjc3MDAxLCJleHAiOjE2MDYyNzcwNjF9.1nwY0lDMGrb7AUFFgSaYd4Q7Tzr-BjABclmoKZOqmr4');

-- Direct Messages Stream Table --
DELETE FROM dmstream;
INSERT INTO dmstream(id, users, initialMessage) VALUES ('754dd19b-9348-4d06-99e7-55274bc2bd27', '{"user1":"Trevor","user2":"Carrum"}', 'df40b29d-5c07-4a40-be2e-960b94acfcbe');
INSERT INTO dmstream(id, users, initialMessage) VALUES ('64ed3198-c45b-4e48-8e23-e95e72d7b120', '{"user1":"Trevor","user2":"molly@member.com"}', 'a56f12cc-77d2-449a-9697-e6a1e5a3532a');

-- General Messages Table --
DELETE FROM messages;
INSERT INTO messages(id, messageData) VALUES ('df40b29d-5c07-4a40-be2e-960b94acfcbe', '{"from":"Trevor", "content":"wats up man"}');
INSERT INTO messages(id, messageData) VALUES ('a56f12cc-77d2-449a-9697-e6a1e5a3532a', '{"from":"molly@member.com", "content":"heyoooo"}');