-- Dummy Data --
INSERT INTO dummy (created) VALUES (current_timestamp);

-- Populate Your Tables Here --
INSERT INTO users(userName, userData) VALUES ('Trevor','{"password":"pw","loggedOn":"false","status":"EMPTY_STATUS"}');
INSERT INTO users(userName, userData) VALUES ('Trevor','{"password":"pw","loggedOn":"false","status":"EMPTY_STATUS"}');
INSERT INTO users(userName, userData) VALUES ('molly@member.com','{"password":"mollymember","loggedOn":"false","status":"EMPTY_STATUS"}');
INSERT INTO users(userName, userData) VALUES ('anna@books.com','{"password":"annaadmin","loggedOn":"false","status":"EMPTY_STATUS"}');

-- Secret Key Table --
INSERT INTO token(secret_key) VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFubmFAYm9va3MuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjA2Mjc3MDAxLCJleHAiOjE2MDYyNzcwNjF9.1nwY0lDMGrb7AUFFgSaYd4Q7Tzr-BjABclmoKZOqmr4');