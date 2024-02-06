--
-- PostgreSQL database dump
--

-- Dumped from database version 15.0
-- Dumped by pg_dump version 15.0

-- Started on 2023-01-30 09:53:06 PST

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
-- TOC entry 3417 (class 0 OID 16989)
-- Dependencies: 226
-- Data for Name: award_options; Type: TABLE DATA; Schema: public; Owner: lsa
--

-- INSERT INTO public.award_options VALUES (1, 1, 'certificate', 'certificate-25', 'custom', true, '25 Year Certificate', 'Name to appear on your 25-year certificate');
-- INSERT INTO public.award_options VALUES (2, 2, 'certificate', 'certificate-25', 'custom', true, '25 Year Certificate', 'Name to appear on your 25-year certificate');
-- INSERT INTO public.award_options VALUES (3, 3, 'certificate', 'certificate-25', 'custom', true, '25 Year Certificate', 'Name to appear on your 25-year certificate');
-- INSERT INTO public.award_options VALUES (4, 4, 'certificate', 'certificate-25', 'custom', true, '25 Year Certificate', 'Name to appear on your 25-year certificate');
-- INSERT INTO public.award_options VALUES (5, 5, 'certificate', 'certificate-25', 'custom', true, '25 Year Certificate', 'Name to appear on your 25-year certificate');
-- INSERT INTO public.award_options VALUES (6, 11, 'straps', 'straps-black', 'straps-black', false, 'Black Leather', 'Black leather watch strap.');
-- INSERT INTO public.award_options VALUES (7, 11, 'straps', 'straps-brown', 'straps-brown', false, 'Brown Leather', 'Brown leather watch strap.');
-- INSERT INTO public.award_options VALUES (8, 11, 'straps', 'straps-plated', 'straps-plated', false, 'Plated', 'Plated watch strap.');
-- INSERT INTO public.award_options VALUES (9, 11, 'faces', 'faces-gold', 'faces-gold', false, 'Gold Face', 'Gold watch face.');
-- INSERT INTO public.award_options VALUES (10, 11, 'faces', 'faces-silver', 'faces-silver', false, 'Silver Face', 'Silver watch face.');
-- INSERT INTO public.award_options VALUES (11, 11, 'faces', 'faces-two-toned', 'faces-two-toned', false, 'Two-toned', 'Two-toned watch face.');
-- INSERT INTO public.award_options VALUES (12, 11, 'sizes', 'size-29', '29mm', false, '29mm diameter face', '29mm diameter face (Small Size).');
-- INSERT INTO public.award_options VALUES (13, 11, 'sizes', 'size-38', '38mm', false, '38mm diameter face', '38mm diameter face (Large Size).');
-- INSERT INTO public.award_options VALUES (14, 11, 'engraving', '29mm', '15', true, 'Engraving (15)', 'Engraving to appear on watch (15 character limit).');
-- INSERT INTO public.award_options VALUES (15, 11, 'engraving', '38mm', '18', true, 'Engraving (18)', 'Engraving to appear on watch (18 character limit).');
INSERT INTO public.award_options VALUES (16, 13, 'sizes', 'size-a', 'size-a', false, 'Size A (Small)', 'Size fits 6.5-inch- 7.5-inch');
INSERT INTO public.award_options VALUES (17, 13, 'sizes', 'size-b', 'size-b', false, 'Size B (Large)', 'Size fits 7.5-inch- 8.5-inch');
INSERT INTO public.award_options VALUES (18, 25, 'sizes', 'size-a', 'size-a', false, 'Size A (Small)', 'Size fits 6.5-inch- 7.5-inch');
INSERT INTO public.award_options VALUES (19, 25, 'sizes', 'size-b', 'size-b', false, 'Size B (Large)', 'Size fits 7.5-inch- 8.5-inch');
INSERT INTO public.award_options VALUES (20, 35, 'sizes', 'size-a', 'size-a', false, 'Size A (Small)', 'Size fits 6.5-inch- 7.5-inch');
INSERT INTO public.award_options VALUES (21, 35, 'sizes', 'size-b', 'size-b', false, 'Size B (Large)', 'Size fits 7.5-inch- 8.5-inch');
-- INSERT INTO public.award_options VALUES (22, 37, 'certificate', 'certificate-25', 'custom', true, '25 Year Certificate', 'Name to appear on your 25-year certificate');
INSERT INTO public.award_options VALUES (23, 37, 'pecsf-charity', 'pecsf-charity-1', 'custom', true, 'PECSF Charity 1', 'Select a regional charity');
INSERT INTO public.award_options VALUES (24, 37, 'pecsf-charity', 'pecsf-charity-2', 'custom', true, 'PECSF Charity 2', 'Select a regional charity');
-- INSERT INTO public.award_options VALUES (25, 37, 'pecsf-certificate', 'pecsf-certificate-25', 'custom', true, 'PECSF Certificate', 'Name to appear on your PECSF certificate');
INSERT INTO public.award_options VALUES (26, 38, 'pecsf-certificate', 'pecsf-certificate-30', 'custom', true, 'PECSF Certificate', 'Name to appear on your PECSF certificate');
INSERT INTO public.award_options VALUES (27, 38, 'pecsf-charity', 'pecsf-charity-1', 'custom', true, 'PECSF Charity 1', 'Select a regional charity');
INSERT INTO public.award_options VALUES (28, 38, 'pecsf-charity', 'pecsf-charity-2', 'custom', true, 'PECSF Charity 2', 'Select a regional charity');
INSERT INTO public.award_options VALUES (29, 39, 'pecsf-certificate', 'pecsf-certificate-35', 'custom', true, 'PECSF Certificate', 'Name to appear on your PECSF certificate');
INSERT INTO public.award_options VALUES (30, 39, 'pecsf-charity', 'pecsf-charity-1', 'custom', true, 'PECSF Charity 1', 'Select a regional charity');
INSERT INTO public.award_options VALUES (31, 39, 'pecsf-charity', 'pecsf-charity-2', 'custom', true, 'PECSF Charity 2', 'Select a regional charity');
INSERT INTO public.award_options VALUES (32, 40, 'pecsf-certificate', 'pecsf-certificate-40', 'custom', true, 'PECSF Certificate', 'Name to appear on your PECSF certificate');
INSERT INTO public.award_options VALUES (33, 40, 'pecsf-charity', 'pecsf-charity-1', 'custom', true, 'PECSF Charity 1', 'Select a regional charity');
INSERT INTO public.award_options VALUES (34, 40, 'pecsf-charity', 'pecsf-charity-2', 'custom', true, 'PECSF Charity 2', 'Select a regional charity');
INSERT INTO public.award_options VALUES (35, 41, 'pecsf-certificate', 'pecsf-certificate-45', 'custom', true, 'PECSF Certificate', 'Name to appear on your PECSF certificate');
INSERT INTO public.award_options VALUES (36, 41, 'pecsf-charity', 'pecsf-charity-1', 'custom', true, 'PECSF Charity 1', 'Select a regional charity');
INSERT INTO public.award_options VALUES (37, 41, 'pecsf-charity', 'pecsf-charity-2', 'custom', true, 'PECSF Charity 2', 'Select a regional charity');
INSERT INTO public.award_options VALUES (38, 42, 'pecsf-certificate', 'pecsf-certificate-50', 'custom', true, 'PECSF Certificate', 'Name to appear on your PECSF certificate');
INSERT INTO public.award_options VALUES (39, 42, 'pecsf-charity', 'pecsf-charity-1', 'custom', true, 'PECSF Charity 1', 'Select a regional charity');
INSERT INTO public.award_options VALUES (40, 42, 'pecsf-charity', 'pecsf-charity-2', 'custom', true, 'PECSF Charity 2', 'Select a regional charity');

-- updates for 2023
INSERT INTO public.award_options VALUES (41, 11, 'options', 'option-a-small', 'option-a-30mm', false, 'Option A (Small)', 'Round face with black dial, gold tone case, crystal at 12 and black leather strap (30 mm diameter / 16 mm wrist)');
INSERT INTO public.award_options VALUES (42, 11, 'options', 'option-a-large', 'option-a-38mm', false, 'Option A (Large)', 'Round face with black dial, gold tone case, crystal at 12 and black leather strap (38 mm diameter / 20 mm wrist)');
INSERT INTO public.award_options VALUES (43, 11, 'options', 'option-b-small', 'option-b-30mm', false, 'Option B (Small)', 'Round face with black dial, silver tone case and silver toned strap (30 mm diameter / 16 mm wrist)');
INSERT INTO public.award_options VALUES (44, 11, 'options', 'option-b-large', 'option-b-38mm', false, 'Option B (Large)', 'Round face with black dial, silver tone case and silver toned strap  (38 mm diameter / 20 mm wrist)');
INSERT INTO public.award_options VALUES (45, 11, 'options', 'option-c-small', 'option-c-30mm', false, 'Option C (Small)', 'Round face with gold dial, gold tone case and gold toned strap (30 mm diameter / 16 mm wrist)');
INSERT INTO public.award_options VALUES (46, 11, 'options', 'option-c-large', 'option-c-38mm', false, 'Option C (Large)', 'Round face with gold dial, gold tone case and gold toned strap  (38 mm diameter / 20 mm wrist)');
INSERT INTO public.award_options VALUES (47, 11, 'options', 'option-d-small', 'option-d-30mm', false, 'Option D (Small)', 'Round face with silver dial, two tone case and two-tone strap(30 mm diameter / 16 mm wrist)');
INSERT INTO public.award_options VALUES (48, 11, 'options', 'option-d-large', '38mm', false, 'Option D (Large)', 'Round face with silver dial, two tone case and two-tone strap (38 mm diameter / 20 mm wrist)');
INSERT INTO public.award_options VALUES (49, 11, 'options', 'option-e-small', '24mm', false, 'Option E (Small)', 'Rectangular face with silver dial, two tone case and two-tone strap (24 x 37.5 mm face / 20 mm wrist)');
INSERT INTO public.award_options VALUES (50, 11, 'options', 'option-e-large', '29.5mm', false, 'Option E (Large)', 'Rectangular face with silver dial, two tone case and two-tone strap (29.5 x 46 mm face / 26 mm wrist)');
INSERT INTO public.award_options VALUES (51, 11, 'engraving', 'option-a-30mm', '15', true, 'Engraving (15)', 'Engraving to appear on watch (15 character limit).');
INSERT INTO public.award_options VALUES (52, 11, 'engraving', 'option-a-38mm', '18', true, 'Engraving (18)', 'Engraving to appear on watch (18 character limit).');
INSERT INTO public.award_options VALUES (53, 11, 'engraving', 'option-b-30mm', '15', true, 'Engraving (15)', 'Engraving to appear on watch (15 character limit).');
INSERT INTO public.award_options VALUES (54, 11, 'engraving', 'option-b-38mm', '18', true, 'Engraving (18)', 'Engraving to appear on watch (18 character limit).');
INSERT INTO public.award_options VALUES (55, 11, 'engraving', 'option-c-30mm', '15', true, 'Engraving (15)', 'Engraving to appear on watch (15 character limit).');
INSERT INTO public.award_options VALUES (56, 11, 'engraving', 'option-c-38mm', '18', true, 'Engraving (18)', 'Engraving to appear on watch (18 character limit).');
INSERT INTO public.award_options VALUES (57, 11, 'engraving', 'option-d-30mm', '15', true, 'Engraving (15)', 'Engraving to appear on watch (15 character limit).');
INSERT INTO public.award_options VALUES (58, 11, 'engraving', 'option-d-38mm', '18', true, 'Engraving (18)', 'Engraving to appear on watch (18 character limit).');
INSERT INTO public.award_options VALUES (59, 11, 'engraving', 'option-e-24mm', '15', true, 'Engraving (15)', 'Engraving to appear on watch (15 character limit).');
INSERT INTO public.award_options VALUES (60, 11, 'engraving', 'option-e-29.5mm', '18', true, 'Engraving (18)', 'Engraving to appear on watch (18 character limit).');





--
-- TOC entry 3423 (class 0 OID 0)
-- Dependencies: 225
-- Name: award_options_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lsa
--

SELECT pg_catalog.setval('public.award_options_id_seq', 61, true);


-- Completed on 2023-01-30 09:53:07 PST

--
-- PostgreSQL database dump complete
--

