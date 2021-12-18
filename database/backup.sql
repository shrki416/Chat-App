--
-- PostgreSQL database dump
--
-- Dumped from database version 13.5
-- Dumped by pg_dump version 14.1
-- Started on 2021-12-18 10:29:35 EST
SET statement_timeout = 0;

SET lock_timeout = 0;

SET idle_in_transaction_session_timeout = 0;

SET client_encoding = 'UTF8';

SET standard_conforming_strings = ON;

SELECT
    pg_catalog.set_config('search_path', '', FALSE);

SET check_function_bodies = FALSE;

SET xmloption = content;

SET client_min_messages = warning;

SET row_security = OFF;

DROP DATABASE "chat-app";

--
-- TOC entry 3288 (class 1262 OID 73749)
-- Name: chat-app; Type: DATABASE; Schema: -; Owner: aa
--
CREATE DATABASE "chat-app" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';

ALTER DATABASE "chat-app" OWNER TO aa;

\connect -reuse-previous=on "dbname='chat-app'"
SET statement_timeout = 0;

SET lock_timeout = 0;

SET idle_in_transaction_session_timeout = 0;

SET client_encoding = 'UTF8';

SET standard_conforming_strings = ON;

SELECT
    pg_catalog.set_config('search_path', '', FALSE);

SET check_function_bodies = FALSE;

SET xmloption = content;

SET client_min_messages = warning;

SET row_security = OFF;

--
-- TOC entry 2 (class 3079 OID 73750)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;

--
-- TOC entry 3289 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner:
--
COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 202 (class 1259 OID 147831)
-- Name: messages; Type: TABLE; Schema: public; Owner: postgres
--
CREATE TABLE public.messages (
    id uuid DEFAULT public.uuid_generate_v4 () NOT NULL,
    user_id text NOT NULL,
    message character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    receiver_id text
);

ALTER TABLE public.messages OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 148124)
-- Name: room_messages; Type: TABLE; Schema: public; Owner: postgres
--
CREATE TABLE public.room_messages (
    id uuid DEFAULT public.uuid_generate_v4 () NOT NULL,
    room_id text NOT NULL,
    message text NOT NULL,
    user_id text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);

ALTER TABLE public.room_messages OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 156344)
-- Name: rooms; Type: TABLE; Schema: public; Owner: postgres
--
CREATE TABLE public.rooms (
    id uuid DEFAULT public.uuid_generate_v4 () NOT NULL,
    room_name text NOT NULL
);

ALTER TABLE public.rooms OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 73761)
-- Name: users; Type: TABLE; Schema: public; Owner: aa
--
CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4 () NOT NULL,
    firstname character varying(255) NOT NULL,
    lastname character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    last_active_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.users OWNER TO aa;

--
-- TOC entry 3152 (class 2606 OID 156343)
-- Name: room_messages channels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE ONLY public.room_messages
    ADD CONSTRAINT channels_pkey PRIMARY KEY (id);

--
-- TOC entry 3150 (class 2606 OID 147840)
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);

--
-- TOC entry 3148 (class 2606 OID 73769)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: aa
--
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);

-- Completed on 2021-12-18 10:29:36 EST
--
-- PostgreSQL database dump complete
--
