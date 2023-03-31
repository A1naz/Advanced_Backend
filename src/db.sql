CREATE DATABASE advanced_backend_db;

CREATE TABLE user(
user_id SERIAL PRIMARY KEY NOT NULL,
email varchar(255),
password varchar(255),
);

