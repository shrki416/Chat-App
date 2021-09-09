CREATE DATABASE chat - app;

CREATE TABLE users (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

ALTER TABLE users RENAME COLUMN first_name TO firstName;

ALTER TABLE users RENAME COLUMN last_name TO lastName;

INSERT INTO users (firstName, lastName, email, PASSWORD)
    VALUES ('John', 'Smith', 'john@gmail.com', 'password');

CREATE TABLE messages (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
    user_id text NOT NULL,
    message varchar(255) NOT NULL,
    created_at timestamp DEFAULT NOW()
);

INSERT INTO messages (user_id, message) VALUES ('1', 'Hello, world!');