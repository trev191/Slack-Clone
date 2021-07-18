-- Dummy table --
DROP TABLE IF EXISTS dummy;
CREATE TABLE dummy(created TIMESTAMP WITH TIME ZONE);

-- Your database schema goes here --

-- Table of Users and Info Related to Each User --
DROP TABLE IF EXISTS user;
CREATE TABLE user(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), userName VARCHAR(32), userData jsonb);

-- Table with the Access Token for issuing JWTs -- 
CREATE TABLE token(token VARCHAR(256));