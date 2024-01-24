--
-- PostgreSQL database dump
--

-- Dumped from database version 15.0
-- Dumped by pg_dump version 15.1

-- Started on 2023-02-24 16:46:33 PST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3414 (class 0 OID 16553)
-- Dependencies: 236
-- Data for Name: settings; Type: TABLE DATA; Schema: public; Owner: lsa
--

INSERT INTO public.settings VALUES ('cycle', 'Current LSA Cycle', 2023);
INSERT INTO public.settings VALUES ('email-common-from-email', 'Reg Confirmation Email From Name', 'Long Service Awards');
INSERT INTO public.settings VALUES ('email-common-from-name', 'Reg Confirmation Email From Email', 'longserviceawards@gov.bc.ca');
INSERT INTO public.settings VALUES ('self-registration-active', 'Self-Registration Active', true);
INSERT INTO public.settings VALUES ('ceremony-rsvp-active', 'Ceremony RSVP Active', false);

-- Completed on 2023-02-24 16:46:34 PST

--
-- PostgreSQL database dump complete
--

