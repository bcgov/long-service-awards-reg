--
-- PostgreSQL database dump
--

-- Dumped from database version 15.0
-- Dumped by pg_dump version 15.0

-- Started on 2023-01-24 14:37:05 PST

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 251 (class 1259 OID 33997)
-- Name: user_roles_permissions_selections; Type: TABLE; Schema: public; Owner: lsa
--

CREATE TABLE public.user_roles_permissions_selections (
    permission character varying(64) NOT NULL,
    role character varying(64) NOT NULL
);


ALTER TABLE public.user_roles_permissions_selections OWNER TO lsa;

--
-- TOC entry 3421 (class 0 OID 33997)
-- Dependencies: 251
-- Data for Name: user_roles_permissions_selections; Type: TABLE DATA; Schema: public; Owner: lsa
--

COPY public.user_roles_permissions_selections (permission, role) FROM stdin;
\.


--
-- TOC entry 3274 (class 2606 OID 34003)
-- Name: user_roles_permissions_selections permissions_roles_selection_unq; Type: CONSTRAINT; Schema: public; Owner: lsa
--

ALTER TABLE ONLY public.user_roles_permissions_selections
    ADD CONSTRAINT permissions_roles_selection_unq UNIQUE (role, permission);


--
-- TOC entry 3276 (class 2606 OID 34001)
-- Name: user_roles_permissions_selections user_roles_permissions_selections_pkey; Type: CONSTRAINT; Schema: public; Owner: lsa
--

ALTER TABLE ONLY public.user_roles_permissions_selections
    ADD CONSTRAINT user_roles_permissions_selections_pkey PRIMARY KEY (permission, role);


--
-- TOC entry 3271 (class 1259 OID 34188)
-- Name: fki_user_roles_permissions_permission; Type: INDEX; Schema: public; Owner: lsa
--

CREATE INDEX fki_user_roles_permissions_permission ON public.user_roles_permissions_selections USING btree (permission);


--
-- TOC entry 3272 (class 1259 OID 34194)
-- Name: fki_user_roles_permissions_role; Type: INDEX; Schema: public; Owner: lsa
--

CREATE INDEX fki_user_roles_permissions_role ON public.user_roles_permissions_selections USING btree (role);


--
-- TOC entry 3277 (class 2606 OID 34183)
-- Name: user_roles_permissions_selections user_roles_permissions_permission; Type: FK CONSTRAINT; Schema: public; Owner: lsa
--

ALTER TABLE ONLY public.user_roles_permissions_selections
    ADD CONSTRAINT user_roles_permissions_permission FOREIGN KEY (permission) REFERENCES public.user_permissions(name) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3278 (class 2606 OID 34189)
-- Name: user_roles_permissions_selections user_roles_permissions_role; Type: FK CONSTRAINT; Schema: public; Owner: lsa
--

ALTER TABLE ONLY public.user_roles_permissions_selections
    ADD CONSTRAINT user_roles_permissions_role FOREIGN KEY (role) REFERENCES public.user_roles(name);


-- Completed on 2023-01-24 14:37:05 PST

--
-- PostgreSQL database dump complete
--

