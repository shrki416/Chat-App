DO $do$
BEGIN
  IF EXISTS (
    SELECT
    FROM
      pg_database
    WHERE
      datname = "chat-app") THEN
  RAISE NOTICE '❌ Database already exists ❌';
ELSE
  CREATE EXTENSION IF NOT EXISTS dblink;
  PERFORM
    dblink_exec('dbname=' || current_database(), 'CREATE DATABASE "chat-app"');
  RAISE NOTICE '✅ Database created ✅';
END IF;
END
$do$;

