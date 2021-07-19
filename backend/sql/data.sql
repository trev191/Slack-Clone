-- Dummy Data --
INSERT INTO dummy (created) VALUES (current_timestamp);

-- Populate Your Tables Here --
-- User Table (the hashed password is simply 'pw',
-- generated from https://bcrypt-generator.com/) --
INSERT INTO users(userName, userData) VALUES ('Trevor','{"password":"$2y$10$N4TtjrBze6AZ6v1gPk5bl.o039WtFX5.ItcnFFfvovUq3YvlYJw3C","loggedOn":"false","status":"EMPTY_STATUS"}');

-- Secret Key Table --
INSERT INTO token(secret_key) VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFubmFAYm9va3MuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjA2Mjc3MDAxLCJleHAiOjE2MDYyNzcwNjF9.1nwY0lDMGrb7AUFFgSaYd4Q7Tzr-BjABclmoKZOqmr4');