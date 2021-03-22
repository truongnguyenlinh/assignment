--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

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
-- Name: answers; Type: TABLE; Schema: public; Owner: linhtruong
--

CREATE TABLE public.answers (
    id integer,
    ans_one character varying(100),
    ans_two character varying(100),
    ans_three character varying(100),
    ans_four character varying(100)
);


ALTER TABLE public.answers OWNER TO linhtruong;

--
-- Name: answers_key; Type: TABLE; Schema: public; Owner: linhtruong
--

CREATE TABLE public.answers_key (
    question_id integer
);


ALTER TABLE public.answers_key OWNER TO linhtruong;

--
-- Name: bridge_id; Type: TABLE; Schema: public; Owner: linhtruong
--

CREATE TABLE public.bridge_id (
    max integer
);


ALTER TABLE public.bridge_id OWNER TO linhtruong;

--
-- Name: bridge_table; Type: TABLE; Schema: public; Owner: linhtruong
--

CREATE TABLE public.bridge_table (
    ques_ans_id integer,
    question_id integer,
    options_id integer,
    max integer
);


ALTER TABLE public.bridge_table OWNER TO linhtruong;

--
-- Name: ques_ans; Type: TABLE; Schema: public; Owner: linhtruong
--

CREATE TABLE public.ques_ans (
    ques_ans_id integer NOT NULL,
    question_id integer,
    options_id integer
);


ALTER TABLE public.ques_ans OWNER TO linhtruong;

--
-- Name: ques_ans_ques_ans_id_seq; Type: SEQUENCE; Schema: public; Owner: linhtruong
--

CREATE SEQUENCE public.ques_ans_ques_ans_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ques_ans_ques_ans_id_seq OWNER TO linhtruong;

--
-- Name: ques_ans_ques_ans_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: linhtruong
--

ALTER SEQUENCE public.ques_ans_ques_ans_id_seq OWNED BY public.ques_ans.ques_ans_id;


--
-- Name: questions; Type: TABLE; Schema: public; Owner: linhtruong
--

CREATE TABLE public.questions (
    ques_id integer NOT NULL,
    correct integer,
    ques character varying(100)
);


ALTER TABLE public.questions OWNER TO linhtruong;

--
-- Name: questions_ques_id_seq; Type: SEQUENCE; Schema: public; Owner: linhtruong
--

CREATE SEQUENCE public.questions_ques_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.questions_ques_id_seq OWNER TO linhtruong;

--
-- Name: questions_ques_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: linhtruong
--

ALTER SEQUENCE public.questions_ques_id_seq OWNED BY public.questions.ques_id;


--
-- Name: test; Type: TABLE; Schema: public; Owner: linhtruong
--

CREATE TABLE public.test (
    max integer
);


ALTER TABLE public.test OWNER TO linhtruong;

--
-- Name: ques_ans ques_ans_id; Type: DEFAULT; Schema: public; Owner: linhtruong
--

ALTER TABLE ONLY public.ques_ans ALTER COLUMN ques_ans_id SET DEFAULT nextval('public.ques_ans_ques_ans_id_seq'::regclass);


--
-- Name: questions ques_id; Type: DEFAULT; Schema: public; Owner: linhtruong
--

ALTER TABLE ONLY public.questions ALTER COLUMN ques_id SET DEFAULT nextval('public.questions_ques_id_seq'::regclass);


--
-- Data for Name: answers; Type: TABLE DATA; Schema: public; Owner: linhtruong
--

COPY public.answers (id, ans_one, ans_two, ans_three, ans_four) FROM stdin;
15	this	is	a	test
16	x	y	z	$
\.


--
-- Data for Name: answers_key; Type: TABLE DATA; Schema: public; Owner: linhtruong
--

COPY public.answers_key (question_id) FROM stdin;
16
\.


--
-- Data for Name: bridge_id; Type: TABLE DATA; Schema: public; Owner: linhtruong
--

COPY public.bridge_id (max) FROM stdin;
4
\.


--
-- Data for Name: bridge_table; Type: TABLE DATA; Schema: public; Owner: linhtruong
--

COPY public.bridge_table (ques_ans_id, question_id, options_id, max) FROM stdin;
2	13	13	2
\.


--
-- Data for Name: ques_ans; Type: TABLE DATA; Schema: public; Owner: linhtruong
--

COPY public.ques_ans (ques_ans_id, question_id, options_id) FROM stdin;
3	15	15
4	16	16
\.


--
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: linhtruong
--

COPY public.questions (ques_id, correct, ques) FROM stdin;
15	1	test
16	2	testing this works
\.


--
-- Data for Name: test; Type: TABLE DATA; Schema: public; Owner: linhtruong
--

COPY public.test (max) FROM stdin;
2
\.


--
-- Name: ques_ans_ques_ans_id_seq; Type: SEQUENCE SET; Schema: public; Owner: linhtruong
--

SELECT pg_catalog.setval('public.ques_ans_ques_ans_id_seq', 4, true);


--
-- Name: questions_ques_id_seq; Type: SEQUENCE SET; Schema: public; Owner: linhtruong
--

SELECT pg_catalog.setval('public.questions_ques_id_seq', 16, true);


--
-- Name: ques_ans ques_ans_pkey; Type: CONSTRAINT; Schema: public; Owner: linhtruong
--

ALTER TABLE ONLY public.ques_ans
    ADD CONSTRAINT ques_ans_pkey PRIMARY KEY (ques_ans_id);


--
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: linhtruong
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (ques_id);


--
-- PostgreSQL database dump complete
--

