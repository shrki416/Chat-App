CREATE DATABASE chat-app;

CREATE TABLE users(
    id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO users (first_name, last_name, email, password) VALUES ('John', 'Smith', 'john@gmail.com', 'password');