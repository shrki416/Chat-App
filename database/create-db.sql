DO
$do$
BEGIN
    IF EXISTS (SELECT FROM pg_database WHERE datname = 'chat-app') THEN
        RAISE NOTICE '❌ Database already exists ❌'; 
    ELSE
        CREATE DATABASE "chat-app";
        RAISE NOTICE '✅ Database created ✅';
    END IF;
END
$do$;