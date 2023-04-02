CREATE DATABASE advanced_backend_db;

CREATE TABLE users(
user_id SERIAL PRIMARY KEY NOT NULL,
email varchar(255),
password varchar(255)
);

CREATE TABLE person(
    person_id int not null unique references users (user_id),
    full_name varchar(255) not null,
    phone varchar(20) not null,
    date_of_birth date,
    role varchar[100] DEFAULT '{USER}'
);
