DO
$do$
BEGIN
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
    CREATE TABLE users (
        id uuid DEFAULT uuid_generate_v4() NOT NULL,
        firstname character varying(255) NOT NULL,
        lastname character varying(255) NOT NULL,
        email character varying(255) NOT NULL,
        password character varying(255) NOT NULL,
        last_active_at timestamp with time zone DEFAULT now()
    );
    RAISE NOTICE 'users table created 🎉';

    CREATE TABLE messages (
        id uuid DEFAULT uuid_generate_v4() NOT NULL,
        user_id text NOT NULL,
        message character varying(255) NOT NULL,
        created_at timestamp with time zone DEFAULT now(),
        receiver_id text NOT NULL
    );
    RAISE NOTICE 'messages table created 🎉';
END
$do$;
