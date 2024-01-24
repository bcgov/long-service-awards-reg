--
-- PostgreSQL database dump
--

-- Dumped from database version 15.0
-- Dumped by pg_dump version 15.0

-- TOC entry 3420 (class 0 OID 53899)
-- Dependencies: 216
-- Data for Name: organizations; Type: TABLE DATA; Schema: public; Owner: lsa
--

INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (1, 'Finance', 'FIN', true);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (2, 'Transportation and Infrastructure', 'TRAN', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (3, 'Citizens Services', 'CITZ', true);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (4, 'Agriculture, Food and Fisheries', 'AGRI', true);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (5, 'Attorney General', 'AG', true);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (6, 'Post-Secondary Education and Future Skills', 'PSEFS', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (7, 'Education and Child Care', 'EDUC', true);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (8, 'Energy, Mines and Low Carbon Innovation', 'EMLI', true);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (9, 'Environment and Climate Change Strategy', 'ENV', true);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (10, 'Forests', 'FOR', true);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (11, 'Health', 'HLTH', true);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (12, 'Indigenous Relations and Reconciliation', 'IRR', true);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (13, 'Ministry of Jobs, Economic Development and Innovation', 'JERI', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (14, 'Labour', 'LBR', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (15, 'Mental Health and Addictions', 'MHA', true);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (16, 'Municipal Affairs', 'MUNI', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (17, 'Public Safety and Solicitor General', 'PSSG', true);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (18, 'Social Development and Poverty Reduction', 'SDPR', true);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (19, 'Tourism, Arts, Culture and Sport', 'TACS', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (20, 'Agricultural Land Commission', 'Agricultural Land', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (21, 'BC Arts Council', 'Arts Council', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (22, 'BC Farm Industry Review Board', 'Farm Review', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (23, 'BC Human Rights Tribunal', 'Human Rights', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (24, 'BC Pension Corporation', 'Pensions', true);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (25, 'Public Service Agency', 'PSA', true);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (26, 'BC Review Board', 'BC Review Board', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (27, 'BC Transportation Financing Authority', 'Transportation Financing', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (28, 'Board Resourcing and Development Office', 'Board Resourcing', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (29, 'Building Code Appeal Board', 'Building Code Appeals', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (30, 'Civil Resolution Tribunal', 'CRT', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (31, 'Community Care and Assisted Living Appeal Board', 'Community Care', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (32, 'Community Living BC', 'CLBC', true);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (33, 'Crown Agencies Resource Office', 'Crown Agencies Resource', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (34, 'Destination BC', 'Destination BC', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (35, 'Elections BC', 'Elections', true);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (36, 'Employment and Assistance Appeal Tribunal', 'Employment and Assistance Appeals', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (37, 'Employment Standards Tribunal', 'Employment Standards', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (38, 'Environmental Appeal Board', 'Environment Appeals', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (39, 'Environmental Assessment Office', 'Environmental Assessment', true);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (40, 'Financial Services Tribunal', 'Financial Services', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (41, 'Forest Appeals Commission', 'Forest Appeals', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (42, 'Forest Practices Board', 'Forest Practices', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (43, 'Government Communications and Public Engagement', 'GCPE', true);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (44, 'Health Professions Review Board', 'Health Professions', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (45, 'Hospital Appeal Board', 'Hospital Appeals', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (46, 'Independent Investigations Office', 'Independent Investigations', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (47, 'Industry Training Appeal Board', 'Industry Training', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (48, 'Intergovernmental Relations Secretariat', 'IGRS', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (49, 'Islands Trust', 'Islands Trust', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (50, 'Labour Relations Board', 'LRB', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (51, 'Legislative Assembly of British Columbia', 'Legslative Assembly', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (52, 'Liquor Distribution Branch', 'LDB', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (53, 'Mental Health Review Board', 'Mental Health Review', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (54, 'Office of the Auditor General', 'OAG', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (55, 'Office of the Conflict of Interest Commissioner', 'Conflict of Interest', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (56, 'Office of the Fire Commissioner', 'Fire Commissioner', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (57, 'Office of the Information and Privacy Commissioner', 'Information and Privacy Commissioner', true);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (58, 'Office of the Merit Commissioner', 'Merit Commissioner', true);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (59, 'Office of the Ombudsperson', 'Ombudsperson', true);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (60, 'Office of the Police Complaint Commissioner', 'Police Complaints',  true);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (61, 'Office of the Premier', 'Premier', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (62, 'Office of the Representative for Children and Youth', 'Rep for Children and Youth', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (63, 'Oil and Gas Appeal Tribunal', 'Oil and Gas Appeals', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (64, 'Passenger Transportation Board', 'Passenger Transportation', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (65, 'Property Assessment Appeal Board', 'Property Assessment Appeals', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (66, 'Public Guardian and Trustee', 'PGT', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (67, 'Public Sector Employers’ Council Secretariat', 'Public Sector Employers', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (68, 'Royal BC Museum', 'RBCM', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (69, 'Safety Standards Appeal Board', 'Safety Standards', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (70, 'Surface Rights Board', 'Surface Rights', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (71, 'BC Financial Services Authority', 'Financial Services Auth', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (72, 'Children and Family Development (Ministry of)', 'MCFD', true);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (73, 'Workers’ Compensation Appeal Tribunal', 'WCAT', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (74, 'Agritech Land Use Secretariat', 'ALUS', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (75, 'Office of the Human Rights Commissioner for BC', 'Human Rights Commissioner', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (76, 'Land, Water and Resource Stewardship', 'LWRS', true);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (77, 'BC Container Trucking Commissioner', 'BCCTC', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (78, 'Ministry of Emergency Management and Climate Readiness', 'EMCR', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (79, 'Housing', 'Housing', false);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (80, 'Ministry of Post-Secondary Education and Future Skills', 'PSEFS', true);
INSERT INTO public.organizations(id, "name", abbreviation, previous_service_pins) VALUES (81, 'Crown Agencies Secretariat', 'CAS', false);

--
-- TOC entry 3427 (class 0 OID 0)
-- Dependencies: 215
-- Name: organizations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lsa
--

SELECT pg_catalog.setval('public.organizations_id_seq', 82, true);

