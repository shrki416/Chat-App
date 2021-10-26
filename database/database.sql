CREATE DATABASE "chat-app";

CREATE TABLE users (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE messages (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
    user_id text NOT NULL,
    message varchar(255) NOT NULL,
    created_at timestamp DEFAULT NOW()
);
