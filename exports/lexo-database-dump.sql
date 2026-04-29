--
-- PostgreSQL database dump
--

\restrict bXiFQc2afINAldANjUdR18kaHL6hHpZCuUM3V02tanvHhp7qp9OWkIk3rb1kPP5

-- Dumped from database version 16.10
-- Dumped by pg_dump version 16.10

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

ALTER TABLE IF EXISTS ONLY "public"."weak_words" DROP CONSTRAINT IF EXISTS "weak_words_flashcard_id_flashcards_id_fk";
ALTER TABLE IF EXISTS ONLY "public"."story_quizzes" DROP CONSTRAINT IF EXISTS "story_quizzes_story_id_stories_id_fk";
ALTER TABLE IF EXISTS ONLY "public"."progress" DROP CONSTRAINT IF EXISTS "progress_flashcard_id_flashcards_id_fk";
ALTER TABLE IF EXISTS ONLY "public"."notification_reads" DROP CONSTRAINT IF EXISTS "notification_reads_notification_id_notifications_id_fk";
ALTER TABLE IF EXISTS ONLY "public"."lesson_completions" DROP CONSTRAINT IF EXISTS "lesson_completions_lesson_id_lessons_id_fk";
ALTER TABLE IF EXISTS ONLY "public"."card_srs" DROP CONSTRAINT IF EXISTS "card_srs_flashcard_id_flashcards_id_fk";
ALTER TABLE IF EXISTS ONLY "public"."bookmarks" DROP CONSTRAINT IF EXISTS "bookmarks_flashcard_id_flashcards_id_fk";
DROP INDEX IF EXISTS "public"."xp_events_email_created_idx";
DROP INDEX IF EXISTS "public"."xp_events_email_activity_created_idx";
DROP INDEX IF EXISTS "public"."notifications_sent_at_idx";
DROP INDEX IF EXISTS "public"."notifications_scheduled_at_idx";
DROP INDEX IF EXISTS "public"."notification_reads_email_idx";
ALTER TABLE IF EXISTS ONLY "public"."xp_events" DROP CONSTRAINT IF EXISTS "xp_events_pkey";
ALTER TABLE IF EXISTS ONLY "public"."weak_words" DROP CONSTRAINT IF EXISTS "weak_words_pkey";
ALTER TABLE IF EXISTS ONLY "public"."weak_words" DROP CONSTRAINT IF EXISTS "weak_words_email_flashcard_id_unique";
ALTER TABLE IF EXISTS ONLY "public"."user_data" DROP CONSTRAINT IF EXISTS "user_data_pkey";
ALTER TABLE IF EXISTS ONLY "public"."user_data" DROP CONSTRAINT IF EXISTS "user_data_email_key_unique";
ALTER TABLE IF EXISTS ONLY "public"."story_quizzes" DROP CONSTRAINT IF EXISTS "story_quizzes_story_id_unique";
ALTER TABLE IF EXISTS ONLY "public"."story_quizzes" DROP CONSTRAINT IF EXISTS "story_quizzes_pkey";
ALTER TABLE IF EXISTS ONLY "public"."stories" DROP CONSTRAINT IF EXISTS "stories_pkey";
ALTER TABLE IF EXISTS ONLY "public"."settings" DROP CONSTRAINT IF EXISTS "settings_pkey";
ALTER TABLE IF EXISTS ONLY "public"."sentence_sessions" DROP CONSTRAINT IF EXISTS "sentence_sessions_pkey";
ALTER TABLE IF EXISTS ONLY "public"."reviews" DROP CONSTRAINT IF EXISTS "reviews_pkey";
ALTER TABLE IF EXISTS ONLY "public"."quiz_scores" DROP CONSTRAINT IF EXISTS "quiz_scores_pkey";
ALTER TABLE IF EXISTS ONLY "public"."push_subscriptions" DROP CONSTRAINT IF EXISTS "push_subscriptions_pkey";
ALTER TABLE IF EXISTS ONLY "public"."push_subscriptions" DROP CONSTRAINT IF EXISTS "push_subscriptions_email_endpoint_unique";
ALTER TABLE IF EXISTS ONLY "public"."progress" DROP CONSTRAINT IF EXISTS "progress_pkey";
ALTER TABLE IF EXISTS ONLY "public"."orwell_submissions" DROP CONSTRAINT IF EXISTS "orwell_submissions_pkey";
ALTER TABLE IF EXISTS ONLY "public"."orwell_submissions" DROP CONSTRAINT IF EXISTS "orwell_submissions_email_assignment_id_unique";
ALTER TABLE IF EXISTS ONLY "public"."orwell_coach_summaries" DROP CONSTRAINT IF EXISTS "orwell_coach_summaries_pkey";
ALTER TABLE IF EXISTS ONLY "public"."orwell_coach_summaries" DROP CONSTRAINT IF EXISTS "orwell_coach_summaries_email_at_submission_count_unique";
ALTER TABLE IF EXISTS ONLY "public"."notifications" DROP CONSTRAINT IF EXISTS "notifications_pkey";
ALTER TABLE IF EXISTS ONLY "public"."notification_reads" DROP CONSTRAINT IF EXISTS "notification_reads_pkey";
ALTER TABLE IF EXISTS ONLY "public"."notification_reads" DROP CONSTRAINT IF EXISTS "notification_reads_notification_id_email_unique";
ALTER TABLE IF EXISTS ONLY "public"."lessons" DROP CONSTRAINT IF EXISTS "lessons_pkey";
ALTER TABLE IF EXISTS ONLY "public"."lesson_completions" DROP CONSTRAINT IF EXISTS "lesson_completions_pkey";
ALTER TABLE IF EXISTS ONLY "public"."lesson_completions" DROP CONSTRAINT IF EXISTS "lesson_completions_email_lesson_id_unique";
ALTER TABLE IF EXISTS ONLY "public"."flashcards" DROP CONSTRAINT IF EXISTS "flashcards_pkey";
ALTER TABLE IF EXISTS ONLY "public"."card_srs" DROP CONSTRAINT IF EXISTS "card_srs_pkey";
ALTER TABLE IF EXISTS ONLY "public"."card_srs" DROP CONSTRAINT IF EXISTS "card_srs_flashcard_id_email_unique";
ALTER TABLE IF EXISTS ONLY "public"."bookmarks" DROP CONSTRAINT IF EXISTS "bookmarks_pkey";
ALTER TABLE IF EXISTS ONLY "public"."bookmarks" DROP CONSTRAINT IF EXISTS "bookmarks_flashcard_id_email_unique";
ALTER TABLE IF EXISTS ONLY "public"."ai_usage_events" DROP CONSTRAINT IF EXISTS "ai_usage_events_pkey";
ALTER TABLE IF EXISTS ONLY "public"."admin_alerts_sent" DROP CONSTRAINT IF EXISTS "admin_alerts_sent_pkey";
ALTER TABLE IF EXISTS ONLY "public"."admin_alerts_sent" DROP CONSTRAINT IF EXISTS "admin_alerts_sent_alert_key_unique";
ALTER TABLE IF EXISTS ONLY "public"."activity_positions" DROP CONSTRAINT IF EXISTS "activity_positions_pkey";
ALTER TABLE IF EXISTS ONLY "public"."activity_positions" DROP CONSTRAINT IF EXISTS "activity_positions_email_activity_unique";
ALTER TABLE IF EXISTS ONLY "public"."access_requests" DROP CONSTRAINT IF EXISTS "access_requests_pkey";
ALTER TABLE IF EXISTS ONLY "public"."access_requests" DROP CONSTRAINT IF EXISTS "access_requests_email_unique";
ALTER TABLE IF EXISTS ONLY "public"."access_codes" DROP CONSTRAINT IF EXISTS "access_codes_pkey";
ALTER TABLE IF EXISTS ONLY "public"."access_codes" DROP CONSTRAINT IF EXISTS "access_codes_code_unique";
ALTER TABLE IF EXISTS "public"."xp_events" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."weak_words" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."user_data" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."story_quizzes" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."stories" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."sentence_sessions" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."reviews" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."quiz_scores" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."push_subscriptions" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."progress" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."orwell_submissions" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."orwell_coach_summaries" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."notifications" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."notification_reads" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."lessons" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."lesson_completions" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."flashcards" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."card_srs" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."bookmarks" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."ai_usage_events" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."admin_alerts_sent" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."activity_positions" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."access_requests" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."access_codes" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE IF EXISTS "public"."xp_events_id_seq";
DROP TABLE IF EXISTS "public"."xp_events";
DROP SEQUENCE IF EXISTS "public"."weak_words_id_seq";
DROP TABLE IF EXISTS "public"."weak_words";
DROP SEQUENCE IF EXISTS "public"."user_data_id_seq";
DROP TABLE IF EXISTS "public"."user_data";
DROP SEQUENCE IF EXISTS "public"."story_quizzes_id_seq";
DROP TABLE IF EXISTS "public"."story_quizzes";
DROP SEQUENCE IF EXISTS "public"."stories_id_seq";
DROP TABLE IF EXISTS "public"."stories";
DROP TABLE IF EXISTS "public"."settings";
DROP SEQUENCE IF EXISTS "public"."sentence_sessions_id_seq";
DROP TABLE IF EXISTS "public"."sentence_sessions";
DROP SEQUENCE IF EXISTS "public"."reviews_id_seq";
DROP TABLE IF EXISTS "public"."reviews";
DROP SEQUENCE IF EXISTS "public"."quiz_scores_id_seq";
DROP TABLE IF EXISTS "public"."quiz_scores";
DROP SEQUENCE IF EXISTS "public"."push_subscriptions_id_seq";
DROP TABLE IF EXISTS "public"."push_subscriptions";
DROP SEQUENCE IF EXISTS "public"."progress_id_seq";
DROP TABLE IF EXISTS "public"."progress";
DROP SEQUENCE IF EXISTS "public"."orwell_submissions_id_seq";
DROP TABLE IF EXISTS "public"."orwell_submissions";
DROP SEQUENCE IF EXISTS "public"."orwell_coach_summaries_id_seq";
DROP TABLE IF EXISTS "public"."orwell_coach_summaries";
DROP SEQUENCE IF EXISTS "public"."notifications_id_seq";
DROP TABLE IF EXISTS "public"."notifications";
DROP SEQUENCE IF EXISTS "public"."notification_reads_id_seq";
DROP TABLE IF EXISTS "public"."notification_reads";
DROP SEQUENCE IF EXISTS "public"."lessons_id_seq";
DROP TABLE IF EXISTS "public"."lessons";
DROP SEQUENCE IF EXISTS "public"."lesson_completions_id_seq";
DROP TABLE IF EXISTS "public"."lesson_completions";
DROP SEQUENCE IF EXISTS "public"."flashcards_id_seq";
DROP TABLE IF EXISTS "public"."flashcards";
DROP SEQUENCE IF EXISTS "public"."card_srs_id_seq";
DROP TABLE IF EXISTS "public"."card_srs";
DROP SEQUENCE IF EXISTS "public"."bookmarks_id_seq";
DROP TABLE IF EXISTS "public"."bookmarks";
DROP SEQUENCE IF EXISTS "public"."ai_usage_events_id_seq";
DROP TABLE IF EXISTS "public"."ai_usage_events";
DROP SEQUENCE IF EXISTS "public"."admin_alerts_sent_id_seq";
DROP TABLE IF EXISTS "public"."admin_alerts_sent";
DROP SEQUENCE IF EXISTS "public"."activity_positions_id_seq";
DROP TABLE IF EXISTS "public"."activity_positions";
DROP SEQUENCE IF EXISTS "public"."access_requests_id_seq";
DROP TABLE IF EXISTS "public"."access_requests";
DROP SEQUENCE IF EXISTS "public"."access_codes_id_seq";
DROP TABLE IF EXISTS "public"."access_codes";
--
-- Name: SCHEMA "public"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA "public" IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = "heap";

--
-- Name: access_codes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."access_codes" (
    "id" integer NOT NULL,
    "code" "text" NOT NULL,
    "note" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "used_by_email" "text",
    "used_at" timestamp with time zone
);


--
-- Name: access_codes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."access_codes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: access_codes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."access_codes_id_seq" OWNED BY "public"."access_codes"."id";


--
-- Name: access_requests; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."access_requests" (
    "id" integer NOT NULL,
    "email" "text" NOT NULL,
    "status" "text" DEFAULT 'pending'::"text" NOT NULL,
    "requested_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "reviewed_at" timestamp with time zone,
    "expires_at" timestamp with time zone,
    "password_hash" "text",
    "access_code_id" integer
);


--
-- Name: access_requests_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."access_requests_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: access_requests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."access_requests_id_seq" OWNED BY "public"."access_requests"."id";


--
-- Name: activity_positions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."activity_positions" (
    "id" integer NOT NULL,
    "email" "text" NOT NULL,
    "activity" "text" NOT NULL,
    "position" integer DEFAULT 0 NOT NULL,
    "filters" "text" DEFAULT '{}'::"text" NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


--
-- Name: activity_positions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."activity_positions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: activity_positions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."activity_positions_id_seq" OWNED BY "public"."activity_positions"."id";


--
-- Name: admin_alerts_sent; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."admin_alerts_sent" (
    "id" integer NOT NULL,
    "alert_key" "text" NOT NULL,
    "sent_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


--
-- Name: admin_alerts_sent_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."admin_alerts_sent_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: admin_alerts_sent_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."admin_alerts_sent_id_seq" OWNED BY "public"."admin_alerts_sent"."id";


--
-- Name: ai_usage_events; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."ai_usage_events" (
    "id" integer NOT NULL,
    "email" "text" NOT NULL,
    "route" "text" NOT NULL,
    "endpoint" "text" NOT NULL,
    "cost_usd" real DEFAULT 0 NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


--
-- Name: ai_usage_events_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."ai_usage_events_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ai_usage_events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."ai_usage_events_id_seq" OWNED BY "public"."ai_usage_events"."id";


--
-- Name: bookmarks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."bookmarks" (
    "id" integer NOT NULL,
    "flashcard_id" integer NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "email" "text" DEFAULT ''::"text" NOT NULL
);


--
-- Name: bookmarks_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."bookmarks_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: bookmarks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."bookmarks_id_seq" OWNED BY "public"."bookmarks"."id";


--
-- Name: card_srs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."card_srs" (
    "id" integer NOT NULL,
    "flashcard_id" integer NOT NULL,
    "next_review_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "interval_days" real DEFAULT 1 NOT NULL,
    "ease_factor" real DEFAULT 2.5 NOT NULL,
    "review_count" integer DEFAULT 0 NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "email" "text" DEFAULT ''::"text" NOT NULL
);


--
-- Name: card_srs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."card_srs_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: card_srs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."card_srs_id_seq" OWNED BY "public"."card_srs"."id";


--
-- Name: flashcards; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."flashcards" (
    "id" integer NOT NULL,
    "english" "text" NOT NULL,
    "arabic" "text" NOT NULL,
    "level" "text" NOT NULL,
    "category" "text" NOT NULL,
    "example_sentence" "text",
    "example_sentence_arabic" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


--
-- Name: flashcards_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."flashcards_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: flashcards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."flashcards_id_seq" OWNED BY "public"."flashcards"."id";


--
-- Name: lesson_completions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."lesson_completions" (
    "id" integer NOT NULL,
    "email" "text" NOT NULL,
    "lesson_id" integer NOT NULL,
    "completed_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


--
-- Name: lesson_completions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."lesson_completions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: lesson_completions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."lesson_completions_id_seq" OWNED BY "public"."lesson_completions"."id";


--
-- Name: lessons; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."lessons" (
    "id" integer NOT NULL,
    "course" "text" NOT NULL,
    "title" "text" NOT NULL,
    "vimeo_url" "text" NOT NULL,
    "order_index" integer DEFAULT 0 NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


--
-- Name: lessons_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."lessons_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: lessons_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."lessons_id_seq" OWNED BY "public"."lessons"."id";


--
-- Name: notification_reads; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."notification_reads" (
    "id" integer NOT NULL,
    "notification_id" integer NOT NULL,
    "email" "text" NOT NULL,
    "opened_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


--
-- Name: notification_reads_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."notification_reads_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: notification_reads_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."notification_reads_id_seq" OWNED BY "public"."notification_reads"."id";


--
-- Name: notifications; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."notifications" (
    "id" integer NOT NULL,
    "message" "text" NOT NULL,
    "type" "text" NOT NULL,
    "audience" "text" DEFAULT 'all'::"text" NOT NULL,
    "level" "text",
    "scheduled_at" timestamp with time zone,
    "sent_at" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "created_by" "text" DEFAULT 'admin'::"text" NOT NULL
);


--
-- Name: notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."notifications_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."notifications_id_seq" OWNED BY "public"."notifications"."id";


--
-- Name: orwell_coach_summaries; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."orwell_coach_summaries" (
    "id" integer NOT NULL,
    "email" "text" NOT NULL,
    "at_submission_count" integer NOT NULL,
    "summary" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


--
-- Name: orwell_coach_summaries_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."orwell_coach_summaries_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orwell_coach_summaries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."orwell_coach_summaries_id_seq" OWNED BY "public"."orwell_coach_summaries"."id";


--
-- Name: orwell_submissions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."orwell_submissions" (
    "id" integer NOT NULL,
    "email" "text" NOT NULL,
    "assignment_id" "text" NOT NULL,
    "category" "text" NOT NULL,
    "status" "text" DEFAULT 'submitted'::"text" NOT NULL,
    "band" real,
    "word_count" integer,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "text" "text",
    "feedback" "text",
    "task_type_label" "text",
    "prompt" "text",
    "compare_report" "text"
);


--
-- Name: orwell_submissions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."orwell_submissions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orwell_submissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."orwell_submissions_id_seq" OWNED BY "public"."orwell_submissions"."id";


--
-- Name: progress; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."progress" (
    "id" integer NOT NULL,
    "flashcard_id" integer NOT NULL,
    "known" boolean DEFAULT false NOT NULL,
    "reviewed_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "email" "text" DEFAULT ''::"text" NOT NULL
);


--
-- Name: progress_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."progress_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: progress_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."progress_id_seq" OWNED BY "public"."progress"."id";


--
-- Name: push_subscriptions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."push_subscriptions" (
    "id" integer NOT NULL,
    "email" "text" NOT NULL,
    "endpoint" "text" NOT NULL,
    "keys" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


--
-- Name: push_subscriptions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."push_subscriptions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: push_subscriptions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."push_subscriptions_id_seq" OWNED BY "public"."push_subscriptions"."id";


--
-- Name: quiz_scores; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."quiz_scores" (
    "id" integer NOT NULL,
    "email" "text" NOT NULL,
    "mode" "text" NOT NULL,
    "level" "text" NOT NULL,
    "total" integer NOT NULL,
    "correct" integer NOT NULL,
    "wrong" integer NOT NULL,
    "completed_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


--
-- Name: quiz_scores_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."quiz_scores_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: quiz_scores_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."quiz_scores_id_seq" OWNED BY "public"."quiz_scores"."id";


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."reviews" (
    "id" integer NOT NULL,
    "email" "text" NOT NULL,
    "name" "text",
    "comment" "text" NOT NULL,
    "rating" integer DEFAULT 5 NOT NULL,
    "status" "text" DEFAULT 'pending'::"text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "reviewed_at" timestamp with time zone,
    "admin_reply" "text",
    "admin_reply_at" timestamp with time zone
);


--
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."reviews_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."reviews_id_seq" OWNED BY "public"."reviews"."id";


--
-- Name: sentence_sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."sentence_sessions" (
    "id" integer NOT NULL,
    "email" "text" NOT NULL,
    "level" "text" NOT NULL,
    "total_words" integer NOT NULL,
    "first_attempt_correct" integer DEFAULT 0 NOT NULL,
    "needed_correction" integer DEFAULT 0 NOT NULL,
    "avg_vocab_band" real DEFAULT 0 NOT NULL,
    "avg_grammar_band" real DEFAULT 0 NOT NULL,
    "common_mistakes" "jsonb" DEFAULT '[]'::"jsonb" NOT NULL,
    "items" "jsonb" DEFAULT '[]'::"jsonb" NOT NULL,
    "ended_early" boolean DEFAULT false NOT NULL,
    "completed_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


--
-- Name: sentence_sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."sentence_sessions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sentence_sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."sentence_sessions_id_seq" OWNED BY "public"."sentence_sessions"."id";


--
-- Name: settings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."settings" (
    "key" "text" NOT NULL,
    "value" "text" NOT NULL
);


--
-- Name: stories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."stories" (
    "id" integer NOT NULL,
    "title" "text" NOT NULL,
    "title_arabic" "text" NOT NULL,
    "content" "text" NOT NULL,
    "content_arabic" "text" NOT NULL,
    "level" "text" NOT NULL,
    "order_index" integer DEFAULT 0 NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


--
-- Name: stories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."stories_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: stories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."stories_id_seq" OWNED BY "public"."stories"."id";


--
-- Name: story_quizzes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."story_quizzes" (
    "id" integer NOT NULL,
    "story_id" integer NOT NULL,
    "questions" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


--
-- Name: story_quizzes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."story_quizzes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: story_quizzes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."story_quizzes_id_seq" OWNED BY "public"."story_quizzes"."id";


--
-- Name: user_data; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."user_data" (
    "id" integer NOT NULL,
    "email" "text" NOT NULL,
    "key" "text" NOT NULL,
    "value" "text" DEFAULT ''::"text" NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


--
-- Name: user_data_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."user_data_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_data_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."user_data_id_seq" OWNED BY "public"."user_data"."id";


--
-- Name: weak_words; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."weak_words" (
    "id" integer NOT NULL,
    "email" "text" NOT NULL,
    "flashcard_id" integer NOT NULL,
    "wrong_count" integer DEFAULT 1 NOT NULL,
    "last_wrong_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


--
-- Name: weak_words_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."weak_words_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: weak_words_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."weak_words_id_seq" OWNED BY "public"."weak_words"."id";


--
-- Name: xp_events; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."xp_events" (
    "id" integer NOT NULL,
    "email" "text" NOT NULL,
    "activity" "text" NOT NULL,
    "xp" integer NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


--
-- Name: xp_events_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."xp_events_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: xp_events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."xp_events_id_seq" OWNED BY "public"."xp_events"."id";


--
-- Name: access_codes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."access_codes" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."access_codes_id_seq"'::"regclass");


--
-- Name: access_requests id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."access_requests" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."access_requests_id_seq"'::"regclass");


--
-- Name: activity_positions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."activity_positions" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."activity_positions_id_seq"'::"regclass");


--
-- Name: admin_alerts_sent id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."admin_alerts_sent" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."admin_alerts_sent_id_seq"'::"regclass");


--
-- Name: ai_usage_events id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."ai_usage_events" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."ai_usage_events_id_seq"'::"regclass");


--
-- Name: bookmarks id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."bookmarks" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."bookmarks_id_seq"'::"regclass");


--
-- Name: card_srs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."card_srs" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."card_srs_id_seq"'::"regclass");


--
-- Name: flashcards id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."flashcards" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."flashcards_id_seq"'::"regclass");


--
-- Name: lesson_completions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."lesson_completions" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."lesson_completions_id_seq"'::"regclass");


--
-- Name: lessons id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."lessons" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."lessons_id_seq"'::"regclass");


--
-- Name: notification_reads id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."notification_reads" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."notification_reads_id_seq"'::"regclass");


--
-- Name: notifications id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."notifications" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."notifications_id_seq"'::"regclass");


--
-- Name: orwell_coach_summaries id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."orwell_coach_summaries" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."orwell_coach_summaries_id_seq"'::"regclass");


--
-- Name: orwell_submissions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."orwell_submissions" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."orwell_submissions_id_seq"'::"regclass");


--
-- Name: progress id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."progress" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."progress_id_seq"'::"regclass");


--
-- Name: push_subscriptions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."push_subscriptions" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."push_subscriptions_id_seq"'::"regclass");


--
-- Name: quiz_scores id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."quiz_scores" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."quiz_scores_id_seq"'::"regclass");


--
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."reviews" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."reviews_id_seq"'::"regclass");


--
-- Name: sentence_sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."sentence_sessions" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."sentence_sessions_id_seq"'::"regclass");


--
-- Name: stories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."stories" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."stories_id_seq"'::"regclass");


--
-- Name: story_quizzes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."story_quizzes" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."story_quizzes_id_seq"'::"regclass");


--
-- Name: user_data id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."user_data" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."user_data_id_seq"'::"regclass");


--
-- Name: weak_words id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."weak_words" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."weak_words_id_seq"'::"regclass");


--
-- Name: xp_events id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."xp_events" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."xp_events_id_seq"'::"regclass");


--
-- Data for Name: access_codes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."access_codes" ("id", "code", "note", "created_at", "used_by_email", "used_at") FROM stdin;
7	54JXUZSHMT	\N	2026-04-24 19:10:47.243612+00	stud-a-rrhv9x@test.com	2026-04-24 19:11:03.717+00
8	WUYYGUCVJE	\N	2026-04-24 19:33:26.948336+00	push-a-lsvqwb@test.com	2026-04-24 19:33:27.167+00
\.


--
-- Data for Name: access_requests; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."access_requests" ("id", "email", "status", "requested_at", "reviewed_at", "expires_at", "password_hash", "access_code_id") FROM stdin;
3	test@example.com	approved	2026-04-15 02:45:12.328961+00	2026-04-15 02:46:10.382076+00	2026-05-15 02:46:10.382076+00	\N	\N
4	testuser@example.com	approved	2026-04-15 02:48:06.920604+00	2026-04-15 02:48:47.10581+00	2026-05-15 02:48:47.10581+00	\N	\N
5	test@test.com	pending	2026-04-15 03:32:52.438221+00	\N	\N	\N	\N
6	testview@test.com	pending	2026-04-15 05:54:22.196436+00	\N	\N	\N	\N
7	tester@example.com	pending	2026-04-16 06:22:25.229332+00	\N	\N	\N	\N
8	mocktest@test.com	approved	2026-04-16 06:23:30.982964+00	2026-04-16 06:23:43.909+00	\N	\N	\N
9	onboard@test.com	approved	2026-04-16 06:33:39.660105+00	2026-04-16 06:33:44.528+00	\N	\N	\N
10	nodate@test.com	approved	2026-04-16 06:39:53.55985+00	2026-04-16 06:39:53.77+00	\N	\N	\N
11	test-orwell-2026@example.com	pending	2026-04-16 19:27:14.079216+00	\N	\N	\N	\N
12	teacher@example.com	approved	2026-04-16 19:40:08.019707+00	2026-04-16 19:40:20.440352+00	\N	\N	\N
2	askabuomar@gmail.com	approved	2026-04-08 22:02:47.073456+00	2026-04-22 02:25:25.522+00	2027-04-22 02:25:24.553+00	\N	\N
18	push-a-lsvqwb@test.com	approved	2026-04-24 19:33:27.175258+00	2026-04-24 19:33:27.437+00	\N	$2b$10$7Mq/Kba06SbTW.Jnwp4j0Odbf/aYbZvcKUb4r8i5NJ2JfmF1mtu.W	8
19	e2e-plan-tgulxo2k@test.com	approved	2026-04-26 15:49:07.578719+00	2026-04-26 15:49:07.578719+00	2026-05-26 15:49:07.578719+00	$2b$10$67DoOylT2Me2a4MlGgDrtOfHesdkwcxoTXkFsXsY5vJZpusHgECj2	\N
20	e2e-plan-npxuywmv@test.com	approved	2026-04-26 15:52:33.609896+00	2026-04-26 15:52:33.609896+00	2026-05-26 15:52:33.609896+00	$2b$10$67DoOylT2Me2a4MlGgDrtOfHesdkwcxoTXkFsXsY5vJZpusHgECj2	\N
\.


--
-- Data for Name: activity_positions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."activity_positions" ("id", "email", "activity", "position", "filters", "updated_at") FROM stdin;
\.


--
-- Data for Name: admin_alerts_sent; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."admin_alerts_sent" ("id", "alert_key", "sent_at") FROM stdin;
\.


--
-- Data for Name: ai_usage_events; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."ai_usage_events" ("id", "email", "route", "endpoint", "cost_usd", "created_at") FROM stdin;
\.


--
-- Data for Name: bookmarks; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."bookmarks" ("id", "flashcard_id", "created_at", "email") FROM stdin;
\.


--
-- Data for Name: card_srs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."card_srs" ("id", "flashcard_id", "next_review_at", "interval_days", "ease_factor", "review_count", "updated_at", "email") FROM stdin;
\.


--
-- Data for Name: flashcards; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."flashcards" ("id", "english", "arabic", "level", "category", "example_sentence", "example_sentence_arabic", "created_at") FROM stdin;
2	about	عن	A2	prep.	Tell me about your family.	حدثني عن عائلتك.	2026-04-08 18:29:37.113583+00
3	above	فوق	A2	prep.	The bird is flying above the clouds.	الطائر يحلق فوق السحب.	2026-04-08 18:29:37.113583+00
4	across	عبر	A2	prep.	We walked across the bridge together.	مشينا عبر الجسر معاً.	2026-04-08 18:29:37.113583+00
5	add	يضيف	A2	v.	Add two numbers to get the total.	أضف رقمين للحصول على المجموع.	2026-04-08 18:29:37.113583+00
7	after	بعد	A2	prep.	We eat dinner after school every day.	نتناول العشاء بعد المدرسة كل يوم.	2026-04-08 18:29:37.113583+00
8	again	مرة أخرى	A2	adv.	Please say that again — I did not hear.	يرجى قول ذلك مرة أخرى - لم أسمع.	2026-04-08 18:29:37.113583+00
9	age	العمر	A2	n.	What is your age?	كم عمرك؟	2026-04-08 18:29:37.113583+00
10	agree	يوافق	A2	v.	I agree with your answer.	أوافق على إجابتك.	2026-04-08 18:29:37.113583+00
11	all	جميع	A2	det.	All students must bring a pen today.	جميع الطلاب يجب أن يحضروا قلماً اليوم.	2026-04-08 18:29:37.113583+00
12	almost	تقريباً	A2	adv.	I have almost finished my homework.	لقد انتهيت من واجبي تقريباً.	2026-04-08 18:29:37.113583+00
14	always	دائماً	A2	adv.	I always drink water in the morning.	أشرب الماء دائماً في الصباح.	2026-04-08 18:29:37.113583+00
15	animal	حيوان	A2	n.	A dog is a friendly animal.	الكلب حيوان ودود.	2026-04-08 18:29:37.113583+00
17	any	أي	A2	det.	Do you have any questions?	هل لديك أي أسئلة؟	2026-04-08 18:29:37.113583+00
18	apple	تفاحة	A2	n.	An apple is a healthy fruit.	التفاحة فاكهة صحية.	2026-04-08 18:29:37.113583+00
21	at	في	A2	prep.	We meet at the library every Monday.	نلتقي في المكتبة كل يوم اثنين.	2026-04-08 18:29:37.113583+00
22	away	بعيداً	A2	adv.	The school is not far away from here.	المدرسة ليست بعيدة جداً من هنا.	2026-04-08 18:29:37.113583+00
25	bad	سيء	A2	adj.	Eating too much sugar is bad for you.	تناول الكثير من السكر سيء لصحتك.	2026-04-08 18:29:37.113583+00
30	because	لأن	A2	conj.	I study hard because I want to pass.	أدرس بجد لأنني أريد أن أنجح.	2026-04-08 18:29:37.113583+00
31	bed	سرير	A2	n.	Go to bed early before an exam.	اذهب إلى السرير مبكراً قبل الامتحان.	2026-04-08 18:29:37.113583+00
32	bedroom	غرفة نوم	A2	n.	My bedroom has a window and a desk.	غرفة نومي فيها نافذة وطاولة.	2026-04-08 18:29:37.113583+00
33	before	قبل	A2	prep.	Wash your hands before you eat.	اغسل يديك قبل أن تأكل.	2026-04-08 18:29:37.113583+00
34	behind	خلف	A2	prep.	The park is behind the school.	الحديقة خلف المدرسة.	2026-04-08 18:29:37.113583+00
35	believe	يعتقد	A2	v.	I believe that hard work leads to success.	أعتقد أن العمل الجاد يؤدي إلى النجاح.	2026-04-08 18:29:37.113583+00
36	below	تحت	A2	prep.	The temperature is below zero today.	درجة الحرارة تحت الصفر اليوم.	2026-04-08 18:29:37.113583+00
37	between	بين	A2	prep.	The shop is between the bank and the post office.	المتجر يقع بين البنك ومكتب البريد.	2026-04-08 18:29:37.113583+00
38	big	كبير	A2	adj.	The city is very big and busy.	المدينة كبيرة جداً وصاخبة.	2026-04-08 18:29:37.113583+00
39	bird	طائر	A2	n.	A bird is singing outside my window.	طائر يغني خارج نافذتي.	2026-04-08 18:29:37.113583+00
40	black	أسود	A2	adj.	She has long black hair.	لديها شعر طويل أسود.	2026-04-08 18:29:37.113583+00
41	blue	أزرق	A2	adj.	The sky is blue and clear today.	السماء زرقاء وصافية اليوم.	2026-04-08 18:29:37.113583+00
42	book	كتاب	A2	n.	Please open your book to page ten.	من فضلك افتح كتابك في الصفحة العاشرة.	2026-04-08 18:29:37.113583+00
43	both	كلا	A2	det.	Both students passed the exam with high marks.	كلا الطالبين نجحا في الامتحان بدرجات عالية.	2026-04-08 18:29:37.113583+00
44	box	صندوق	A2	n.	Put your pens in the box on the table.	ضع أقلامك في الصندوق على الطاولة.	2026-04-08 18:29:37.113583+00
45	boy	ولد	A2	n.	The boy is reading a story book.	الولد يقرأ كتاب قصة.	2026-04-08 18:29:37.113583+00
46	bread	خبز	A2	n.	We eat bread and cheese for lunch.	نأكل الخبز والجبن على الغداء.	2026-04-08 18:29:37.113583+00
47	brother	أخ	A2	n.	My brother is two years older than me.	أخي أكبر مني بسنتين.	2026-04-08 18:29:37.113583+00
48	brown	بني	A2	adj.	He is wearing a brown jacket today.	هو يرتدي سترة بنية اليوم.	2026-04-08 18:29:37.113583+00
49	bus	حافلة	A2	n.	I take the bus to school every morning.	أركب الحافلة إلى المدرسة كل صباح.	2026-04-08 18:29:37.113583+00
50	buy	يشتري	A2	v.	I want to buy a new notebook.	أريد أن أشتري دفتر ملاحظات جديد.	2026-04-08 18:29:37.113583+00
52	cake	كعكة	A2	n.	We had cake and juice at the party.	أكلنا كعكة وعصير في الحفلة.	2026-04-08 18:29:37.113583+00
13	alone	وحده	A2	adv.	She lives alone in a small flat.	تعيش وحدها في شقة صغيرة.	2026-04-08 18:29:37.113583+00
16	answer	إجابة	A2	n.	Please write the answer in the box.	يرجى كتابة الإجابة في الصندوق.	2026-04-08 18:29:37.113583+00
19	area	منطقة	A2	n.	This area has many shops and parks.	هذه المنطقة بها العديد من المتاجر والحدائق.	2026-04-08 18:29:37.113583+00
20	arm	ذراع	A2	n.	She broke her arm playing football.	كسرت ذراعها وهي تلعب كرة القدم.	2026-04-08 18:29:37.113583+00
23	baby	رضيع	A2	n.	The baby is sleeping in the cot.	الطفل الرضيع ينام في السرير.	2026-04-08 18:29:37.113583+00
24	back	ظهر	A2	n.	He has pain in his back.	يشعر بألم في ظهره.	2026-04-08 18:29:37.113583+00
26	bag	حقيبة	A2	n.	Put your books in your bag.	ضع كتبك في حقيبتك.	2026-04-08 18:29:37.113583+00
27	ball	كرة	A2	n.	The children kicked the ball in the park.	ركل الأطفال الكرة في الحديقة.	2026-04-08 18:29:37.113583+00
28	bank	بنك	A2	n.	I go to the bank to get money.	أذهب إلى البنك للحصول على المال.	2026-04-08 18:29:37.113583+00
29	bathroom	حمام	A2	n.	The bathroom is on the first floor.	دورة المياه في الطابق الأول.	2026-04-08 18:29:37.113583+00
51	by	بواسطة	A2	prep.	The school is by the river.	المدرسة بجانب النهر.	2026-04-08 18:29:37.113583+00
53	call	يسمي	A2	v.	Please call me when you arrive home.	من فضلك اتصل بي عندما تصل إلى البيت.	2026-04-08 18:29:37.113583+00
1	able	قادر	A2	adj.	She is able to read and write in English.	هي قادرة على القراءة والكتابة باللغة الإنجليزية.	2026-04-08 18:29:37.113583+00
54	can	يستطيع	A2	moda.	She can speak three languages fluently.	هي تستطيع أن تتحدث ثلاث لغات بطلاقة.	2026-04-08 18:29:37.113583+00
55	car	سيارة	A2	n.	My father drives his car to work.	والدي يقود سيارته إلى العمل.	2026-04-08 18:29:37.113583+00
56	card	بطاقة	A2	n.	She sent me a birthday card.	أرسلت لي بطاقة عيد ميلاد.	2026-04-08 18:29:37.113583+00
57	carry	يحمل	A2	v.	Can you help me carry these books?	هل يمكنك مساعدتي في حمل هذه الكتب؟	2026-04-08 18:29:37.113583+00
58	cat	قطة	A2	n.	The cat is sleeping on the sofa.	القطة تنام على الأريكة.	2026-04-08 18:29:37.113583+00
59	chair	كرسي	A2	n.	Please sit on the chair in the corner.	من فضلك اجلس على الكرسي في الزاوية.	2026-04-08 18:29:37.113583+00
60	change	يغير	A2	v.	I need to change my shoes before PE.	أحتاج إلى تغيير حذائي قبل حصة الرياضة.	2026-04-08 18:29:37.113583+00
61	check	يتحقق	A2	v.	Always check your answers before submitting.	تحقق دائماً من إجاباتك قبل التسليم.	2026-04-08 18:29:37.113583+00
62	child	طفل	A2	n.	Every child has the right to go to school.	لكل طفل الحق في الذهاب إلى المدرسة.	2026-04-08 18:29:37.113583+00
63	city	مدينة	A2	n.	London is a very large city in England.	لندن مدينة كبيرة جداً في إنجلترا.	2026-04-08 18:29:37.113583+00
65	clean	نظيف	A2	adj.	Keep your desk clean and tidy.	حافظ على مكتبك نظيفاً ومرتباً.	2026-04-08 18:29:37.113583+00
66	close	قريب	A2	adj.	My house is close to the bus stop.	منزلي قريب من محطة الحافلات.	2026-04-08 18:29:37.113583+00
67	clothes	ملابس	A2	n.	She is wearing warm clothes in winter.	إنها ترتدي ملابس دافئة في فصل الشتاء.	2026-04-08 18:29:37.113583+00
68	cloud	غيمة	A2	n.	There is a large cloud in the sky.	هناك غيمة كبيرة في السماء.	2026-04-08 18:29:37.113583+00
69	cold	بارد	A2	adj.	It is very cold outside today.	الجو بارد جداً خارجاً اليوم.	2026-04-08 18:29:37.113583+00
70	colour	لون	A2	n.	What is your favourite colour?	ما هو لونك المفضل؟	2026-04-08 18:29:37.113583+00
71	computer	حاسوب	A2	n.	I use a computer to do my homework.	أستخدم حاسوباً لعمل واجباتي المدرسية.	2026-04-08 18:29:37.113583+00
72	cook	يطهو	A2	v.	My mother cooks dinner every evening.	أمي تطهو العشاء كل مساء.	2026-04-08 18:29:37.113583+00
73	country	دولة	A2	n.	France is a country in Europe.	فرنسا دولة في أوروبا.	2026-04-08 18:29:37.113583+00
74	cut	يقطع	A2	v.	Please cut the paper into four pieces.	من فضلك اقطع الورقة إلى أربع قطع.	2026-04-08 18:29:37.113583+00
75	dark	مظلم	A2	adj.	The room is very dark — turn on the light.	الغرفة مظلمة جداً — شغّل الضوء.	2026-04-08 18:29:37.113583+00
76	day	يوم	A2	n.	Today is a sunny day in spring.	اليوم يوم مشمس في فصل الربيع.	2026-04-08 18:29:37.113583+00
77	dog	كلب	A2	n.	My dog likes to run in the park.	كلبي يحب الركض في الحديقة.	2026-04-08 18:29:37.113583+00
78	door	باب	A2	n.	Please close the door when you leave.	من فضلك أغلق الباب عندما تغادر.	2026-04-08 18:29:37.113583+00
79	down	أسفل	A2	adv.	Please sit down and open your books.	من فضلك اجلس أسفل وافتح كتابك.	2026-04-08 18:29:37.113583+00
80	draw	يرسم	A2	v.	Can you draw a picture of your family?	هل تستطيع أن ترسم صورة لعائلتك؟	2026-04-08 18:29:37.113583+00
81	drink	يشرب	A2	v.	You should drink eight glasses of water a day.	يجب أن تشرب ثماني أكواب من الماء يومياً.	2026-04-08 18:29:37.113583+00
82	drive	يقود	A2	v.	My uncle can drive a car and a truck.	عمي يستطيع أن يقود سيارة وشاحنة.	2026-04-08 18:29:37.113583+00
83	dry	جاف	A2	adj.	The weather has been very dry this summer.	الطقس كان جافاً جداً هذا الصيف.	2026-04-08 18:29:37.113583+00
84	during	أثناء	A2	prep.	We must be quiet during the lesson.	يجب أن نكون هادئين أثناء الدرس.	2026-04-08 18:29:37.113583+00
85	each	كل	A2	det.	Each student must bring their own pencil.	كل طالب يجب أن يحضر قلمه الخاص.	2026-04-08 18:29:37.113583+00
86	early	مبكر	A2	adj.	I wake up early every morning for school.	أستيقظ مبكراً كل صباح للذهاب إلى المدرسة.	2026-04-08 18:29:37.113583+00
87	eat	يأكل	A2	v.	We eat three meals a day.	نحن نأكل ثلاث وجبات في اليوم.	2026-04-08 18:29:37.113583+00
88	egg	بيضة	A2	n.	I have an egg and toast for breakfast.	أتناول بيضة وخبزاً محمصاً على الإفطار.	2026-04-08 18:29:37.113583+00
89	end	نهاية	A2	n.	Write your name at the end of the page.	اكتب اسمك في نهاية الصفحة.	2026-04-08 18:29:37.113583+00
90	enjoy	يستمتع	A2	v.	I enjoy reading books in the evening.	أستمتع بقراءة الكتب في المساء.	2026-04-08 18:29:37.113583+00
91	enter	يدخل	A2	v.	Please knock before you enter the room.	من فضلك اطرق الباب قبل أن تدخل الغرفة.	2026-04-08 18:29:37.113583+00
92	every	كل	A2	det.	Every day is a new chance to learn.	كل يوم هو فرصة جديدة للتعلم.	2026-04-08 18:29:37.113583+00
93	eye	عين	A2	n.	She has beautiful green eyes.	لديها عيون خضراء جميلة.	2026-04-08 18:29:37.113583+00
94	face	وجه	A2	n.	Wash your face in the morning.	اغسل وجهك في الصباح.	2026-04-08 18:29:37.113583+00
96	family	عائلة	A2	n.	My family has four people: mum, dad, sister and me.	عائلتي تتكون من أربع أشخاص: الأم والأب والأخت وأنا.	2026-04-08 18:29:37.113583+00
97	far	بعيد	A2	adj.	Is the supermarket far from here?	هل السوبرماركت بعيد من هنا؟	2026-04-08 18:29:37.113583+00
98	fast	سريع	A2	adj.	The fast train goes to the city in one hour.	القطار السريع يذهب إلى المدينة في ساعة واحدة.	2026-04-08 18:29:37.113583+00
99	father	والد	A2	n.	My father is a teacher at a primary school.	والدي معلم في مدرسة ابتدائية.	2026-04-08 18:29:37.113583+00
100	feel	يشعر	A2	v.	I feel happy when I get a good grade.	أشعر بالسعادة عندما أحصل على درجة جيدة.	2026-04-08 18:29:37.113583+00
101	few	قليل	A2	det.	Only a few students came to school today.	عدد قليل فقط من الطلاب جاءوا إلى المدرسة اليوم.	2026-04-08 18:29:37.118504+00
102	finger	إصبع	A2	n.	She cut her finger while cooking.	قطعت إصبعها أثناء الطهي.	2026-04-08 18:29:37.118504+00
103	finish	ينهي	A2	v.	Please finish your work before the bell.	من فضلك أنهِ عملك قبل جرس الخروج.	2026-04-08 18:29:37.118504+00
95	fall	يسقط	A2	v.	Leaves fall from trees in autumn.	أوراق الأشجار تسقط في فصل الخريف.	2026-04-08 18:29:37.113583+00
104	fire	حريق	A2	n.	The fire station is on the main road.	محطة الحريق تقع على الطريق الرئيسي.	2026-04-08 18:29:37.118504+00
105	fish	سمك	A2	n.	We had fish and chips for dinner on Friday.	تناولنا السمك والبطاطس المقلية على العشاء يوم الجمعة.	2026-04-08 18:29:37.118504+00
106	floor	دور	A2	n.	The classroom is on the ground floor.	الفصل الدراسي يقع في الدور الأرضي.	2026-04-08 18:29:37.118504+00
107	flower	زهرة	A2	n.	She planted a red flower in the garden.	زرعت زهرة حمراء في الحديقة.	2026-04-08 18:29:37.118504+00
108	fly	يطير	A2	v.	Birds fly south in the winter.	الطيور تطير جنوباً في فصل الشتاء.	2026-04-08 18:29:37.118504+00
109	food	طعام	A2	n.	Healthy food is good for your body.	الطعام الصحي جيد لجسمك.	2026-04-08 18:29:37.118504+00
110	foot	قدم	A2	n.	He hurt his foot during the football match.	أصاب قدمه أثناء مباراة كرة القدم.	2026-04-08 18:29:37.118504+00
111	for	لـ	A2	prep.	This gift is for you from all of us.	هذه الهدية لك من كلنا.	2026-04-08 18:29:37.118504+00
112	friend	صديق	A2	n.	My best friend lives next door to me.	أفضل صديق لي يسكن بجانبنا مباشرة.	2026-04-08 18:29:37.118504+00
113	from	من	A2	prep.	She comes from a small town in the south.	تأتي من بلدة صغيرة في الجنوب.	2026-04-08 18:29:37.118504+00
114	fruit	فاكهة	A2	n.	Fruit is a healthy snack between meals.	الفاكهة وجبة خفيفة صحية بين الوجبات.	2026-04-08 18:29:37.118504+00
115	full	ممتلئ	A2	adj.	The glass is full of cold water.	الكأس ممتلئة بماء بارد.	2026-04-08 18:29:37.118504+00
116	fun	متعة	A2	n.	Learning English can be great fun.	تعلم اللغة الإنجليزية يمكن أن يكون متعة رائعة.	2026-04-08 18:29:37.118504+00
117	game	لعبة	A2	n.	We played a fun game in PE class today.	لعبنا لعبة ممتعة في درس التربية البدنية اليوم.	2026-04-08 18:29:37.118504+00
118	garden	حديقة	A2	n.	We grow tomatoes in our garden.	نزرع الطماطم في حديقتنا.	2026-04-08 18:29:37.118504+00
119	girl	فتاة	A2	n.	The girl is reading a book under the tree.	الفتاة تقرأ كتاباً تحت الشجرة.	2026-04-08 18:29:37.118504+00
120	good	جيد	A2	adj.	He is a good student who always works hard.	هو طالب جيد يعمل بجد دائماً.	2026-04-08 18:29:37.118504+00
121	great	رائع	A2	adj.	She had a great idea for the project.	كان لديها فكرة رائعة للمشروع.	2026-04-08 18:29:37.118504+00
122	green	أخضر	A2	adj.	Eat green vegetables every day.	كل الخضروات الخضراء كل يوم.	2026-04-08 18:29:37.118504+00
123	group	مجموعة	A2	n.	Work in your group to find the answer.	اعمل مع مجموعتك للعثور على الإجابة.	2026-04-08 18:29:37.118504+00
124	grow	ينمو	A2	v.	Plants need water and sunlight to grow.	النباتات تحتاج الماء والضوء لكي تنمو.	2026-04-08 18:29:37.118504+00
125	hand	يد	A2	n.	Raise your hand if you know the answer.	ارفع يدك إذا كنت تعرف الإجابة.	2026-04-08 18:29:37.118504+00
126	happy	سعيد	A2	adj.	I feel happy when I learn something new.	أشعر بالسعادة عندما أتعلم شيئاً جديداً.	2026-04-08 18:29:37.118504+00
127	hard	صعب	A2	adj.	The exam was hard but I did my best.	الامتحان كان صعباً لكنني بذلت قصارى جهدي.	2026-04-08 18:29:37.118504+00
129	hear	يسمع	A2	v.	Can you hear the teacher at the back?	هل يمكنك سماع المعلم من الخلف؟	2026-04-08 18:29:37.118504+00
130	help	يساعد	A2	v.	Please help your classmate if they are stuck.	يرجى مساعدة زميلك إذا واجه صعوبة.	2026-04-08 18:29:37.118504+00
133	hot	حار	A2	adj.	It is very hot in the desert.	الطقس حار جداً في الصحراء.	2026-04-08 18:29:37.118504+00
134	hour	ساعة	A2	n.	The lesson lasts one hour.	الدرس يستمر ساعة واحدة.	2026-04-08 18:29:37.118504+00
135	house	بيت / منزل	A2	n.	Their house has a red door and a garden.	منزلهم له باب أحمر وحديقة.	2026-04-08 18:29:37.118504+00
136	hungry	جوعان / جائع	A2	adj.	I am hungry — can I have a snack please?	أنا جائع - هل يمكنني تناول وجبة خفيفة من فضلك؟	2026-04-08 18:29:37.118504+00
137	in	في	A2	prep.	The books are in the cupboard by the door.	الكتب موجودة في الخزانة بجانب الباب.	2026-04-08 18:29:37.118504+00
138	into	إلى / في	A2	prep.	Pour the juice into the glass.	اسكب العصير في الكوب.	2026-04-08 18:29:37.118504+00
139	job	وظيفة	A2	n.	She has a job at the local library.	لديها وظيفة في مكتبة البلدة.	2026-04-08 18:29:37.118504+00
140	jump	يقفز	A2	v.	Can you jump over the rope?	هل يمكنك القفز فوق الحبل؟	2026-04-08 18:29:37.118504+00
141	keep	يحافظ على / يبقي	A2	v.	Keep your classroom clean and tidy.	حافظ على فصلك نظيفاً ومرتباً.	2026-04-08 18:29:37.118504+00
142	key	مفتاح	A2	n.	I lost the key to my locker this morning.	فقدت مفتاح خزانتي هذا الصباح.	2026-04-08 18:29:37.118504+00
143	kind	طيب / لطيف	A2	adj.	Be kind to everyone in your class.	كن طيباً مع الجميع في فصلك.	2026-04-08 18:29:37.118504+00
144	kitchen	مطبخ	A2	n.	My mother cooks in the kitchen.	والدتي تطبخ في المطبخ.	2026-04-08 18:29:37.118504+00
145	large	كبير	A2	adj.	The library has a large collection of books.	المكتبة لديها مجموعة كبيرة من الكتب.	2026-04-08 18:29:37.118504+00
148	learn	يتعلم	A2	v.	We learn something new every day at school.	نتعلم شيئاً جديداً كل يوم في المدرسة.	2026-04-08 18:29:37.118504+00
149	leave	يترك / يضع	A2	v.	Please leave your bag by the door.	من فضلك ضع حقيبتك بجانب الباب.	2026-04-08 18:29:37.118504+00
150	leg	ساق	A2	n.	She hurt her leg during the race.	أصيبت ساقها أثناء السباق.	2026-04-08 18:29:37.118504+00
151	letter	حرف	A2	n.	Write the first letter of your name.	اكتب الحرف الأول من اسمك.	2026-04-08 18:29:37.118504+00
152	light	ضوء	A2	n.	Turn on the light — it is dark in here.	أشعل الضوء - الغرفة مظلمة هنا.	2026-04-08 18:29:37.118504+00
153	listen	يستمع	A2	v.	Listen carefully to the instructions.	استمع بانتباه إلى التعليمات.	2026-04-08 18:29:37.118504+00
131	high	عالٍ	A2	adj.	The mountain is very high and covered in snow.	الجبل عالي جداً ومغطى بالثلج.	2026-04-08 18:29:37.118504+00
146	last	الماضي / الأخير	A2	adj.	Last week we learned about plants.	الأسبوع الماضي تعلمنا عن النباتات.	2026-04-08 18:29:37.118504+00
147	late	متأخر / متأخرة	A2	adj.	Please don't be late for the morning lesson.	من فضلك لا تتأخر عن درس الصباح.	2026-04-08 18:29:37.118504+00
154	little	قليل	A2	adj.	A little practice every day makes you better.	ممارسة قليلة كل يوم تجعلك أفضل.	2026-04-08 18:29:37.118504+00
155	live	يعيش	A2	v.	We live in a small town near the sea.	نعيش في بلدة صغيرة بالقرب من البحر.	2026-04-08 18:29:37.118504+00
156	long	طويل	A2	adj.	The river is very long and wide.	النهر طويل جداً وعريض.	2026-04-08 18:29:37.118504+00
157	look	ينظر	A2	v.	Look at the picture and describe it.	انظر إلى الصورة واشرحها.	2026-04-08 18:29:37.118504+00
158	lot	الكثير من	A2	n.	A lot of students enjoy reading in class.	الكثير من الطلاب يستمتعون بالقراءة في الفصل.	2026-04-08 18:29:37.118504+00
159	lunch	الغداء	A2	n.	We have lunch at twelve thirty.	نتناول الغداء في الساعة الثانية عشرة والنصف.	2026-04-08 18:29:37.118504+00
160	man	رجل	A2	n.	The man is reading a newspaper at the café.	الرجل يقرأ صحيفة في المقهى.	2026-04-08 18:29:37.118504+00
162	milk	الحليب	A2	n.	Milk is a healthy drink for children.	الحليب مشروب صحي للأطفال.	2026-04-08 18:29:37.118504+00
163	minute	دقيقة	A2	n.	We have five minutes before the lesson ends.	لدينا خمس دقائق قبل انتهاء الحصة.	2026-04-08 18:29:37.118504+00
164	money	المال	A2	n.	Save your money to buy something useful.	ادخر أموالك لشراء شيء مفيد.	2026-04-08 18:29:37.118504+00
165	month	شهر	A2	n.	December is the last month of the year.	ديسمبر هو آخر شهر في السنة.	2026-04-08 18:29:37.118504+00
166	more	أكثر	A2	det.	I need more time to finish this exercise.	أحتاج إلى مزيد من الوقت لإكمال هذا التمرين.	2026-04-08 18:29:37.118504+00
167	morning	صباح	A2	n.	Good morning — take out your books please.	صباح الخير — أخرجوا كتبكم من فضلكم.	2026-04-08 18:29:37.118504+00
168	mother	أم	A2	n.	My mother helps me with my homework.	أمي تساعدني في واجباتي المدرسية.	2026-04-08 18:29:37.118504+00
171	music	موسيقى	A2	n.	I love listening to music after school.	أحب الاستماع إلى الموسيقى بعد المدرسة.	2026-04-08 18:29:37.118504+00
172	name	اسم	A2	n.	Write your name at the top of the page.	اكتب اسمك في أعلى الصفحة.	2026-04-08 18:29:37.118504+00
173	near	بالقرب من	A2	prep.	The park is near the school.	الحديقة بالقرب من المدرسة.	2026-04-08 18:29:37.118504+00
174	new	جديد	A2	adj.	She has a new pencil case with her name on it.	لديها حقيبة أقلام جديدة مكتوب عليها اسمها.	2026-04-08 18:29:37.118504+00
175	next	القادم	A2	adj.	Next week we will study verbs.	الأسبوع القادم سندرس الأفعال.	2026-04-08 18:29:37.118504+00
176	nice	لطيف	A2	adj.	It is nice to help your classmates.	من اللطيف أن تساعد زملاءك في الفصل.	2026-04-08 18:29:37.118504+00
177	night	ليل	A2	n.	I do my homework in the evening before night.	أنجز واجباتي في المساء قبل الليل.	2026-04-08 18:29:37.118504+00
178	nose	أنف	A2	n.	Cover your nose and mouth when you sneeze.	غطّ أنفك وفمك عندما تعطس.	2026-04-08 18:29:37.118504+00
179	number	رقم	A2	n.	What is your lucky number?	ما هو رقمك المفضل؟	2026-04-08 18:29:37.118504+00
180	of	من	A2	prep.	The capital of France is Paris.	عاصمة فرنسا هي باريس.	2026-04-08 18:29:37.118504+00
182	often	غالباً	A2	adv.	I often read before going to bed.	أقرأ غالباً قبل الذهاب إلى النوم.	2026-04-08 18:29:37.118504+00
183	old	كبير في السن	A2	adj.	My grandmother is old and very wise.	جدتي كبيرة في السن وحكيمة جداً.	2026-04-08 18:29:37.118504+00
184	on	على	A2	prep.	Put your pen on the desk.	ضع قلمك على المكتب.	2026-04-08 18:29:37.118504+00
185	once	مرة واحدة	A2	adv.	I once visited the science museum with my class.	زرت متحف العلوم مع فصلي مرة واحدة.	2026-04-08 18:29:37.118504+00
186	only	فقط	A2	adv.	There is only one answer that is correct.	هناك إجابة واحدة فقط صحيحة.	2026-04-08 18:29:37.118504+00
188	other	الآخر	A2	det.	Look at the other examples in the book.	انظر إلى الأمثلة الأخرى في الكتاب.	2026-04-08 18:29:37.118504+00
189	out	خارج	A2	adv.	Go out and play in the fresh air.	اخرج والعب في الهواء الطلق.	2026-04-08 18:29:37.118504+00
190	outside	بالخارج	A2	adv.	We eat lunch outside when it is sunny.	نتناول الغداء بالخارج عندما تكون الشمس مشرقة.	2026-04-08 18:29:37.118504+00
191	over	فوق	A2	prep.	The rainbow appeared over the hill.	ظهر قوس قزح فوق التل.	2026-04-08 18:29:37.118504+00
192	page	صفحة	A2	n.	Turn to page forty-seven please.	توجه إلى الصفحة السابعة والأربعين من فضلك.	2026-04-08 18:29:37.118504+00
193	paper	ورقة	A2	n.	Write your answers on the paper.	اكتب إجاباتك على الورقة.	2026-04-08 18:29:37.118504+00
194	park	حديقة	A2	n.	We played football in the park on Saturday.	لعبنا كرة القدم في الحديقة يوم السبت.	2026-04-08 18:29:37.118504+00
195	part	جزء	A2	n.	This is the easy part of the test.	هذا هو الجزء السهل من الاختبار.	2026-04-08 18:29:37.118504+00
196	people	أشخاص	A2	n.	Many people come to this market on weekends.	يأتي الكثير من الأشخاص إلى هذا السوق في نهاية الأسبوع.	2026-04-08 18:29:37.118504+00
197	phone	هاتف	A2	n.	She uses her phone to call her parents.	تستخدم هاتفها للاتصال بوالديها.	2026-04-08 18:29:37.118504+00
198	picture	صورة	A2	n.	Draw a picture of your favourite animal.	ارسم صورة لحيوانك المفضل.	2026-04-08 18:29:37.118504+00
199	place	مكان	A2	n.	The library is a quiet place to study.	المكتبة مكان هادئ للدراسة.	2026-04-08 18:29:37.118504+00
200	plant	نبات	A2	n.	This plant needs water and sunlight every day.	هذا النبات يحتاج إلى الماء وأشعة الشمس كل يوم.	2026-04-08 18:29:37.118504+00
201	play	يلعب	A2	v.	Children play in the garden after school.	يلعب الأطفال في الحديقة بعد انتهاء الدراسة.	2026-04-08 18:29:37.122679+00
202	point	نقطة	A2	n.	Each correct answer is worth one point.	كل إجابة صحيحة تساوي نقطة واحدة.	2026-04-08 18:29:37.122679+00
170	much	كثير من	A2	det.	How much water do you drink a day?	كم كمية الماء التي تشربها في اليوم؟	2026-04-08 18:29:37.118504+00
181	off	بعيداً / خارجاً	A2	adv.	Turn off the lights when you leave.	أطفئ الأضواء عندما تغادر.	2026-04-08 18:29:37.118504+00
187	open	يفتح	A2	v.	Please open your books to page twelve.	من فضلك افتح كتابك على الصفحة الثانية عشرة.	2026-04-08 18:29:37.118504+00
169	mouth	فم	A2	n.	Open your mouth and say 'ah'.	افتح فمك وقل &#39;آ&#39;.	2026-04-08 18:29:37.118504+00
203	poor	فقير	A2	adj.	They gave food to the poor people in the town.	أعطوا الطعام للأشخاص الفقراء في المدينة.	2026-04-08 18:29:37.122679+00
204	question	سؤال	A2	n.	Ask a question if you do not understand.	اطرح سؤالاً إذا لم تفهم.	2026-04-08 18:29:37.122679+00
207	ready	جاهز	A2	adj.	Are you ready to begin the exercise?	هل أنت جاهز لبدء التمرين؟	2026-04-08 18:29:37.122679+00
208	red	أحمر	A2	adj.	She is wearing a red dress at the party.	ترتدي فستاناً أحمر في الحفلة.	2026-04-08 18:29:37.122679+00
210	rice	أرز	A2	n.	Rice is a staple food in many countries.	الأرز هو غذاء أساسي في كثير من الدول.	2026-04-08 18:29:37.122679+00
211	right	صحيح	A2	adj.	That is the right answer — well done!	تلك هي الإجابة الصحيحة — عمل ممتاز!	2026-04-08 18:29:37.122679+00
212	river	نهر	A2	n.	The river flows through the middle of the city.	يتدفق النهر عبر وسط المدينة.	2026-04-08 18:29:37.122679+00
213	room	غرفة	A2	n.	The classroom is a large and bright room.	الفصل الدراسي غرفة كبيرة وساطعة.	2026-04-08 18:29:37.122679+00
214	run	يركض	A2	v.	Run to the finish line as fast as you can.	اركض إلى خط النهاية بأسرع ما يمكن.	2026-04-08 18:29:37.122679+00
215	same	نفس	A2	adj.	We all have the same textbook this year.	نحن جميعاً لدينا نفس الكتاب المدرسي هذا العام.	2026-04-08 18:29:37.122679+00
216	school	مدرسة	A2	n.	I go to school five days a week.	أذهب إلى المدرسة خمسة أيام في الأسبوع.	2026-04-08 18:29:37.122679+00
218	sentence	جملة	A2	n.	Write a sentence using the new word.	اكتب جملة باستخدام الكلمة الجديدة.	2026-04-08 18:29:37.122679+00
219	short	قصير	A2	adj.	Write a short paragraph about your weekend.	اكتب فقرة قصيرة عن نهاية أسبوعك.	2026-04-08 18:29:37.122679+00
220	show	يعرض/يريك	A2	v.	Show me your work when you have finished.	أرِني عملك عندما تنتهي من الإجابة.	2026-04-08 18:29:37.122679+00
221	sing	يغني	A2	v.	We sing a song at the start of class.	نحن نغني أغنية في بداية الحصة.	2026-04-08 18:29:37.122679+00
222	sister	أخت	A2	n.	My sister is in the class above me.	أختي في الفصل الذي فوق فصلي.	2026-04-08 18:29:37.122679+00
223	sit	يجلس	A2	v.	Please sit down and listen carefully.	من فضلك اجلس واستمع بانتباه.	2026-04-08 18:29:37.122679+00
225	sleep	ينام	A2	v.	Children need to sleep for at least nine hours.	الأطفال يحتاجون إلى النوم لمدة تسع ساعات على الأقل.	2026-04-08 18:29:37.122679+00
226	slow	بطيء	A2	adj.	The slow reader reads each word carefully.	القارئ البطيء يقرأ كل كلمة بعناية.	2026-04-08 18:29:37.122679+00
227	small	صغير	A2	adj.	Our school has a small but friendly class.	فصلنا صغير لكنه ودود وجميل.	2026-04-08 18:29:37.122679+00
228	smile	يبتسم	A2	v.	Smile when you meet someone new.	ابتسم عندما تقابل شخصاً جديداً.	2026-04-08 18:29:37.122679+00
229	some	بعض	A2	det.	Would you like some water?	هل تود أن تشرب بعض الماء؟	2026-04-08 18:29:37.122679+00
230	sometimes	أحياناً	A2	adv.	I sometimes walk to school with my friend.	أحياناً أمشي إلى المدرسة مع صديقي.	2026-04-08 18:29:37.122679+00
231	song	أغنية	A2	n.	We learned a new song in music class.	تعلمنا أغنية جديدة في حصة الموسيقى.	2026-04-08 18:29:37.122679+00
232	sorry	آسف	A2	adj.	I am sorry I was late this morning.	أنا آسف لأنني تأخرت هذا الصباح.	2026-04-08 18:29:37.122679+00
233	speak	يتحدث	A2	v.	Speak slowly and clearly in the speaking test.	تحدث ببطء ووضوح في اختبار التحدث.	2026-04-08 18:29:37.122679+00
234	sport	رياضة	A2	n.	My favourite sport is swimming.	رياضتي المفضلة هي السباحة.	2026-04-08 18:29:37.122679+00
235	stand	يقف	A2	v.	Stand up straight when you speak in public.	قف بشكل مستقيم عندما تتحدث أمام الجمهور.	2026-04-08 18:29:37.122679+00
237	stop	يتوقف	A2	v.	Stop talking and listen to the teacher.	توقف عن الحديث واستمع إلى المعلم.	2026-04-08 18:29:37.122679+00
238	story	قصة	A2	n.	The teacher told us a funny story today.	روى لنا المعلم قصة مضحكة اليوم.	2026-04-08 18:29:37.122679+00
239	student	طالب	A2	n.	Every student must do their best in class.	كل طالب يجب أن يبذل قصارى جهده في الفصل.	2026-04-08 18:29:37.122679+00
240	study	يدرس	A2	v.	I study English for one hour every evening.	أدرس اللغة الإنجليزية لمدة ساعة واحدة كل مساء.	2026-04-08 18:29:37.122679+00
242	swim	يسبح	A2	v.	Can you swim in the sea safely?	هل يمكنك أن تسبح في البحر بأمان؟	2026-04-08 18:29:37.122679+00
243	table	طاولة	A2	n.	Put your books on the table by the door.	ضع كتبك على الطاولة بجانب الباب.	2026-04-08 18:29:37.122679+00
244	talk	يتحدث	A2	v.	Do not talk while the teacher is explaining.	لا تتحدث بينما المعلم يشرح الدرس.	2026-04-08 18:29:37.122679+00
245	teacher	معلم	A2	n.	My teacher is very patient and helpful.	معلمي صبور جداً ومساعد.	2026-04-08 18:29:37.122679+00
247	thing	شيء	A2	n.	A pencil is a useful thing in every classroom.	القلم الرصاص هو شيء مفيد في كل فصل دراسي.	2026-04-08 18:29:37.122679+00
248	time	وقت	A2	n.	What time does the lesson start today?	في أي وقت يبدأ الدرس اليوم؟	2026-04-08 18:29:37.122679+00
250	to	إلى	A2	prep.	I walk to school every morning.	أمشي إلى المدرسة كل صباح.	2026-04-08 18:29:37.122679+00
209	remember	يتذكر	A2	v.	Remember to bring your homework tomorrow.	تذكر أن تحضر واجبك المنزلي غداً.	2026-04-08 18:29:37.122679+00
217	sea	بحر	A2	n.	We swam in the sea on our holiday.	سبحنا في البحر أثناء إجازتنا.	2026-04-08 18:29:37.122679+00
224	sky	سماء	A2	n.	The sky is very clear and blue today.	السماء صافية وزرقاء جداً اليوم.	2026-04-08 18:29:37.122679+00
241	sun	شمس	A2	n.	The sun rises in the east every morning.	تشرق الشمس في الشرق كل صباح.	2026-04-08 18:29:37.122679+00
246	than	أكثر من / مقارنةً بـ	A2	conj.	She is taller than her brother by five centimetres.	هي أطول من أخيها بمقدار خمسة سنتيمترات.	2026-04-08 18:29:37.122679+00
249	tired	متعب	A2	adj.	I felt tired after the long spelling test.	شعرت بالتعب بعد اختبار الإملاء الطويل.	2026-04-08 18:29:37.122679+00
205	quick	سريع	A2	adj.	Let's do a quick review before the test.	دعنا نقوم بمراجعة سريعة قبل الاختبار.	2026-04-08 18:29:37.122679+00
251	today	اليوم	A2	n.	Today we will learn ten new vocabulary words.	سنتعلم عشر كلمات جديدة اليوم.	2026-04-08 18:29:37.122679+00
252	together	معاً	A2	adv.	We work together to find the best answer.	نعمل معاً لإيجاد أفضل إجابة.	2026-04-08 18:29:37.122679+00
253	tomorrow	غداً	A2	n.	Do your homework tonight — not tomorrow morning.	اعمل على واجبك الليلة - وليس غداً صباحاً.	2026-04-08 18:29:37.122679+00
255	train	قطار	A2	n.	We take the train to the city on Sundays.	نأخذ القطار إلى المدينة يوم الأحد.	2026-04-08 18:29:37.122679+00
256	tree	شجرة	A2	n.	There is a tall tree outside our classroom window.	هناك شجرة طويلة خارج نافذة فصلنا الدراسي.	2026-04-08 18:29:37.122679+00
257	try	يحاول	A2	v.	Always try your best in every task.	حاول دائماً أن تعطي أفضل ما لديك في كل مهمة.	2026-04-08 18:29:37.122679+00
258	turn	يقلب / يتحول	A2	v.	Turn to page forty-five in your textbook.	اقلب الصفحة إلى صفحة خمسة وأربعين في كتابك المدرسي.	2026-04-08 18:29:37.122679+00
259	under	تحت	A2	prep.	The cat is sleeping under the table.	القطة نائمة تحت الطاولة.	2026-04-08 18:29:37.122679+00
260	understand	يفهم	A2	v.	Do you understand the question?	هل تفهم السؤال؟	2026-04-08 18:29:37.122679+00
262	wait	ينتظر	A2	v.	Please wait outside until I call your name.	يرجى انتظر خارج الفصل حتى أناديك.	2026-04-08 18:29:37.122679+00
263	walk	يمشي	A2	v.	I walk to school because it is not far.	أمشي إلى المدرسة لأنها ليست بعيدة.	2026-04-08 18:29:37.122679+00
265	watch	يشاهد	A2	v.	Watch the video and answer the questions below.	شاهد الفيديو والإجابة عن الأسئلة أدناه.	2026-04-08 18:29:37.122679+00
266	water	ماء	A2	n.	Drink a glass of water before the exam.	اشرب كأس ماء قبل الامتحان.	2026-04-08 18:29:37.122679+00
267	week	أسبوع	A2	n.	There are seven days in a week.	هناك سبعة أيام في الأسبوع.	2026-04-08 18:29:37.122679+00
269	white	أبيض	A2	adj.	Write your answers on the white paper.	اكتب إجاباتك على الورقة البيضاء.	2026-04-08 18:29:37.122679+00
270	wide	واسع	A2	adj.	The road is wide enough for two buses.	الطريق واسع بما يكفي لحافلتين.	2026-04-08 18:29:37.122679+00
271	window	نافذة	A2	n.	Open the window to let in fresh air.	افتح النافذة لإدخال الهواء النقي.	2026-04-08 18:29:37.122679+00
272	with	مع	A2	prep.	Work with a partner to check your answers.	اعمل مع زميل للتحقق من إجاباتك.	2026-04-08 18:29:37.122679+00
273	woman	امرأة	A2	n.	The woman is a doctor at the local hospital.	المرأة هي طبيبة في المستشفى المحلي.	2026-04-08 18:29:37.122679+00
274	work	يعمل	A2	v.	We work in pairs during speaking activities.	نحن نعمل في أزواج أثناء أنشطة التحدث.	2026-04-08 18:29:37.122679+00
275	write	يكتب	A2	v.	Write the answer in your notebook.	اكتب الإجابة في دفترك.	2026-04-08 18:29:37.122679+00
276	year	سنة	A2	n.	I have been learning English for one year.	أتعلم اللغة الإنجليزية منذ سنة واحدة.	2026-04-08 18:29:37.122679+00
277	yellow	أصفر	A2	adj.	The sunflower has beautiful yellow petals.	لدى عباد الشمس بتلات صفراء جميلة.	2026-04-08 18:29:37.122679+00
278	yesterday	أمس	A2	n.	Yesterday we did a vocabulary quiz in class.	أمس أجرينا اختبار مفردات في الفصل.	2026-04-08 18:29:37.122679+00
281	adult	بالغ	A2	n.	Each adult in the group must sign the form.	يجب على كل بالغ في المجموعة توقيع الاستمارة.	2026-04-08 18:29:37.122679+00
282	afternoon	بعد الظهر	A2	n.	We have art class every Tuesday afternoon.	لدينا حصة فن كل يوم ثلاثاء بعد الظهر.	2026-04-08 18:29:37.122679+00
283	airport	مطار	A2	n.	The airport is busy every day of the week.	المطار مكتظ كل يوم من أيام الأسبوع.	2026-04-08 18:29:37.122679+00
284	around	حول	A2	prep.	There are trees around the school building.	هناك أشجار حول مبنى المدرسة.	2026-04-08 18:29:37.122679+00
286	beach	شاطئ	A2	n.	We built sandcastles on the beach last summer.	بنينا قصور الرمل على الشاطئ في الصيف الماضي.	2026-04-08 18:29:37.122679+00
287	beautiful	جميل	A2	adj.	The garden is beautiful in the spring.	الحديقة جميلة في فصل الربيع.	2026-04-08 18:29:37.122679+00
288	bicycle	دراجة	A2	n.	I ride my bicycle to school every morning.	أركب دراجتي إلى المدرسة كل صباح.	2026-04-08 18:29:37.122679+00
289	birthday	عيد ميلاد	A2	n.	My birthday is on the twelfth of April.	عيد ميلادي في الثاني عشر من أبريل.	2026-04-08 18:29:37.122679+00
290	breakfast	إفطار	A2	n.	I always eat breakfast before leaving the house.	أتناول الإفطار دائماً قبل مغادرة المنزل.	2026-04-08 18:29:37.122679+00
291	bridge	جسر	A2	n.	We crossed the bridge over the wide river.	عبرنا الجسر فوق النهر الواسع.	2026-04-08 18:29:37.122679+00
293	build	يبني	A2	v.	The children helped build a birdhouse in class.	ساعد الأطفال في بناء بيت للطيور في الفصل.	2026-04-08 18:29:37.122679+00
294	busy	مزدحم	A2	adj.	The town centre is very busy on Saturdays.	وسط المدينة مزدحم جداً يوم السبت.	2026-04-08 18:29:37.122679+00
295	butter	زبدة	A2	n.	I spread butter on my toast every morning.	أضع الزبدة على التوست كل صباح.	2026-04-08 18:29:37.122679+00
296	button	زر	A2	n.	Click the green button to start the quiz.	اضغط على الزر الأخضر لبدء الاختبار.	2026-04-08 18:29:37.122679+00
261	up	أعلى	A2	adv.	Put your hand up if you know the answer.	ارفع يدك إذا كنت تعرف الإجابة.	2026-04-08 18:29:37.122679+00
264	warm	دافئ	A2	adj.	The classroom is warm and comfortable in winter.	الفصل الدراسي دافئ ومريح في الشتاء.	2026-04-08 18:29:37.122679+00
268	well	جيداً	A2	adv.	She writes very well for her age.	تكتب بشكل جيد جداً لسنها.	2026-04-08 18:29:37.122679+00
279	young	شاب	A2	adj.	Young learners pick up new languages quickly.	المتعلمون الصغار يلتقطون اللغات الجديدة بسرعة.	2026-04-08 18:29:37.122679+00
280	ability	قدرة	A2	n.	She has the ability to learn new words very quickly.	لديها القدرة على تعلم كلمات جديدة بسرعة كبيرة.	2026-04-08 18:29:37.122679+00
292	bright	مشرق	A2	adj.	The classroom has bright lights and big windows.	الفصل الدراسي مضاء بأضواء ساطعة وله نوافذ كبيرة.	2026-04-08 18:29:37.122679+00
285	arrive	يصل	A2	v.	I usually arrive at school before eight o'clock.	عادة ما أصل إلى المدرسة قبل الثامنة صباحاً.	2026-04-08 18:29:37.122679+00
297	café	مقهى	A2	n.	We met at a small café near the library.	التقينا في مقهى صغير بالقرب من المكتبة.	2026-04-08 18:29:37.122679+00
298	capital	عاصمة	A2	n.	What is the capital city of Australia?	ما هي عاصمة أستراليا؟	2026-04-08 18:29:37.122679+00
299	careful	حذر	A2	adj.	Be careful when you cross the road.	كن حذراً عند عبور الطريق.	2026-04-08 18:29:37.122679+00
300	centre	مركز	A2	n.	The sports centre is open seven days a week.	مركز الرياضة مفتوح سبعة أيام في الأسبوع.	2026-04-08 18:29:37.122679+00
301	cheese	جبن	A2	n.	She put cheese and tomato on the sandwich.	وضعت الجبن والطماطم على الساندويتش.	2026-04-08 18:29:37.126284+00
302	chicken	دجاج	A2	n.	We had roast chicken for dinner on Sunday.	تناولنا دجاجاً مشوياً على العشاء يوم الأحد.	2026-04-08 18:29:37.126284+00
304	cinema	سينما	A2	n.	We went to the cinema to see a new film.	ذهبنا إلى السينما لمشاهدة فيلم جديد.	2026-04-08 18:29:37.126284+00
305	circle	دائرة	A2	n.	Draw a circle around the correct answer.	ارسم دائرة حول الإجابة الصحيحة.	2026-04-08 18:29:37.126284+00
306	clinic	عيادة	A2	n.	She went to the clinic for a check-up.	ذهبت إلى العيادة لإجراء فحص طبي.	2026-04-08 18:29:37.126284+00
308	club	نادي	A2	n.	I joined the English speaking club at school.	انضممت إلى نادي المتحدثين للغة الإنجليزية في المدرسة.	2026-04-08 18:29:37.126284+00
309	coat	معطف	A2	n.	Put on your coat before going outside.	ارتدِ معطفك قبل الخروج.	2026-04-08 18:29:37.126284+00
310	coffee	قهوة	A2	n.	She drinks one cup of coffee in the morning.	تشرب فنجان قهوة واحد في الصباح.	2026-04-08 18:29:37.126284+00
312	corner	زاوية	A2	n.	Turn left at the corner and then go straight.	انعطف يساراً عند الزاوية ثم استمر في السير مباشرة.	2026-04-08 18:29:37.126284+00
313	correct	صحيح	A2	adj.	Put a tick next to the correct answer.	ضع علامة بجانب الإجابة الصحيحة.	2026-04-08 18:29:37.126284+00
314	cow	بقرة	A2	n.	A cow gives milk that we use every day.	البقرة تعطي الحليب الذي نستخدمه كل يوم.	2026-04-08 18:29:37.126284+00
315	cup	فنجان	A2	n.	She drank a hot cup of tea before leaving.	شربت فنجان شاي ساخن قبل المغادرة.	2026-04-08 18:29:37.126284+00
316	cupboard	دولاب	A2	n.	The books are on the shelf inside the cupboard.	الكتب موجودة على الرف داخل الدولاب.	2026-04-08 18:29:37.126284+00
318	daughter	ابنة	A2	n.	Their daughter is studying at university now.	ابنتهم تدرس الآن في الجامعة.	2026-04-08 18:29:37.126284+00
321	desk	مكتب	A2	n.	There is a pen and a ruler on my desk.	يوجد قلم ومسطرة على مكتبي.	2026-04-08 18:29:37.126284+00
322	dictionary	قاموس	A2	n.	Use a dictionary to check the spelling.	استخدم القاموس للتحقق من الإملاء.	2026-04-08 18:29:37.126284+00
323	different	مختلف	A2	adj.	Each student has a different favourite subject.	كل طالب له موضوع مفضل مختلف.	2026-04-08 18:29:37.126284+00
324	difficult	صعب	A2	adj.	This grammar exercise is difficult but useful.	تمرين النحو هذا صعب لكنه مفيد.	2026-04-08 18:29:37.126284+00
325	dinner	العشاء	A2	n.	We all sit together for dinner every evening.	نجلس جميعاً معاً على العشاء كل مساء.	2026-04-08 18:29:37.126284+00
326	direction	اتجاه	A2	n.	Follow the direction signs to find the exit.	اتبع علامات الاتجاه للعثور على المخرج.	2026-04-08 18:29:37.126284+00
327	dirty	متسخ	A2	adj.	Wash dirty hands before eating any food.	اغسل اليدين المتسخة قبل تناول أي طعام.	2026-04-08 18:29:37.126284+00
329	dress	فستان	A2	n.	She is wearing a blue dress and white shoes.	ترتدي فستاناً أزرق وحذاء أبيض.	2026-04-08 18:29:37.126284+00
330	easy	سهل	A2	adj.	The first exercise was easy for everyone.	التمرين الأول كان سهلاً للجميع.	2026-04-08 18:29:37.126284+00
331	evening	مساء	A2	n.	I do my homework in the evening after dinner.	أقوم بواجبي المدرسي في المساء بعد العشاء.	2026-04-08 18:29:37.126284+00
332	everything	كل شيء	A2	pron.	Everything in the shop is on sale this week.	كل شيء في المتجر معروض للبيع هذا الأسبوع.	2026-04-08 18:29:37.126284+00
334	example	مثال	A2	n.	Give one example of a healthy food.	أعطِ مثالاً واحداً على طعام صحي.	2026-04-08 18:29:37.126284+00
337	factory	مصنع	A2	n.	My father works in a factory near our town.	والدي يعمل في مصنع بالقرب من مدينتنا.	2026-04-08 18:29:37.126284+00
338	flat	شقة	A2	n.	We live in a flat on the third floor.	نحن نسكن في شقة في الطابق الثالث.	2026-04-08 18:29:37.126284+00
339	forest	غابة	A2	n.	The forest is full of tall trees and wildlife.	الغابة مليئة بالأشجار الطويلة والحيوانات البرية.	2026-04-08 18:29:37.126284+00
341	free	مجاني	A2	adj.	The museum is free for children under twelve.	المتحف مجاني للأطفال دون سن اثني عشر سنة.	2026-04-08 18:29:37.126284+00
342	fresh	طازج	A2	adj.	Fresh vegetables and fruit are good for health.	الخضراوات والفواكه الطازجة مفيدة للصحة.	2026-04-08 18:29:37.126284+00
311	complete	يكمل	A2	v.	Complete the sentences using the words below.	أكمل الجمل باستخدام الكلمات أدناه.	2026-04-08 18:29:37.126284+00
317	dance	يرقص	A2	v.	We dance to music in our PE class on Fridays.	نرقص على الموسيقى في حصة التربية البدنية يوم الجمعة.	2026-04-08 18:29:37.126284+00
320	decide	يقرر	A2	v.	I need to decide which topic to write about.	أحتاج إلى اتخاذ قرار بشأن الموضوع الذي سأكتب عنه.	2026-04-08 18:29:37.126284+00
328	dream	يحلم	A2	v.	I dream of travelling to many different countries.	أحلم بالسفر إلى العديد من الدول المختلفة.	2026-04-08 18:29:37.126284+00
335	expensive	غالي	A2	adj.	The new phone is very expensive.	الهاتف الجديد مكلف جداً.	2026-04-08 18:29:37.126284+00
336	explain	يشرح	A2	v.	Can you explain the meaning of this word?	هل يمكنك شرح معنى هذه الكلمة؟	2026-04-08 18:29:37.126284+00
340	forget	ينسى	A2	v.	Do not forget to bring your notebook tomorrow.	لا تنسَ إحضار دفترك غداً.	2026-04-08 18:29:37.126284+00
307	clock	ساعة	A2	n.	The clock on the wall says it is two o'clock.	الساعة على الجدار تشير إلى الساعة الثانية.	2026-04-08 18:29:37.126284+00
343	glass	كوب	A2	n.	She drank a full glass of cold orange juice.	شربت كوباً ممتلئاً من عصير البرتقال البارد.	2026-04-08 18:29:37.126284+00
344	grammar	قواعد اللغة	A2	n.	Good grammar helps you write clear sentences.	القواعد الجيدة تساعدك على كتابة جمل واضحة.	2026-04-08 18:29:37.126284+00
346	health	صحة	A2	n.	Eating well and exercising is good for health.	الأكل الجيد والتمارين الرياضية مفيدة للصحة.	2026-04-08 18:29:37.126284+00
347	heavy	ثقيل	A2	adj.	The bag is too heavy for the young child.	الحقيبة ثقيلة جداً بالنسبة للطفل الصغير.	2026-04-08 18:29:37.126284+00
348	helpful	مفيد	A2	adj.	My teacher is very helpful and always explains things clearly.	معلمي مفيد جداً ويشرح الأشياء بوضوح دائماً.	2026-04-08 18:29:37.126284+00
349	holiday	عطلة	A2	n.	We went on holiday to the coast last summer.	ذهبنا في عطلة إلى الساحل في الصيف الماضي.	2026-04-08 18:29:37.126284+00
350	homework	واجب منزلي	A2	n.	Do your homework before watching television.	أنجز واجبك المنزلي قبل مشاهدة التلفاز.	2026-04-08 18:29:37.126284+00
351	hospital	مستشفى	A2	n.	The hospital is on the main road in the city.	المستشفى يقع على الطريق الرئيسي في المدينة.	2026-04-08 18:29:37.126284+00
352	hotel	فندق	A2	n.	We stayed at a small hotel near the beach.	أقمنا في فندق صغير بالقرب من الشاطئ.	2026-04-08 18:29:37.126284+00
353	ice	ثلج	A2	n.	Put some ice in your drink on a hot day.	ضع بعض الثلج في مشروبك في يوم حار.	2026-04-08 18:29:37.126284+00
354	idea	فكرة	A2	n.	She had a great idea for the class project.	كانت لديها فكرة رائعة لمشروع الفصل.	2026-04-08 18:29:37.126284+00
355	internet	الإنترنت	A2	n.	I use the internet to research new topics.	أستخدم الإنترنت للبحث عن مواضيع جديدة.	2026-04-08 18:29:37.126284+00
356	jacket	سترة	A2	n.	Take your jacket — it is cold outside today.	خذ سترتك - الجو بارد اليوم.	2026-04-08 18:29:37.126284+00
357	juice	عصير	A2	n.	I have a glass of orange juice every morning.	أشرب كوباً من عصير البرتقال كل صباح.	2026-04-08 18:29:37.126284+00
358	language	لغة	A2	n.	English is a world language spoken everywhere.	اللغة الإنجليزية لغة عالمية يتحدثها الناس في كل مكان.	2026-04-08 18:29:37.126284+00
359	lesson	درس	A2	n.	The English lesson is my favourite of the day.	درس اللغة الإنجليزية هو درسي المفضل في اليوم.	2026-04-08 18:29:37.126284+00
360	library	مكتبة	A2	n.	The library has hundreds of interesting books.	المكتبة تحتوي على مئات الكتب المثيرة للاهتمام.	2026-04-08 18:29:37.126284+00
361	lift	مصعد	A2	n.	Take the lift to the third floor of the building.	اركب المصعد إلى الطابق الثالث من المبنى.	2026-04-08 18:29:37.126284+00
362	map	خريطة	A2	n.	Look at the map and find the nearest train station.	انظر إلى الخريطة واعثر على أقرب محطة قطار.	2026-04-08 18:29:37.126284+00
363	market	سوق	A2	n.	We buy fresh food at the market every weekend.	نشتري الطعام الطازج من السوق كل نهاية أسبوع.	2026-04-08 18:29:37.126284+00
364	match	مباراة	A2	n.	We won the football match by three goals.	فزنا في مباراة كرة القدم بثلاثة أهداف.	2026-04-08 18:29:37.126284+00
365	meat	لحم	A2	n.	He does not eat meat — he is vegetarian.	هو لا يأكل اللحم - إنه نباتي.	2026-04-08 18:29:37.126284+00
367	menu	قائمة الطعام	A2	n.	Look at the menu and choose what you would like.	انظر إلى قائمة الطعام واختر ما تود أن تأكله.	2026-04-08 18:29:37.126284+00
368	miss	اشتاق إلى	A2	v.	I miss my friends when I am away from home.	أشتاق إلى أصدقائي عندما أكون بعيداً عن المنزل.	2026-04-08 18:29:37.126284+00
369	mountain	جبل	A2	n.	The mountain is covered in snow in winter.	الجبل مغطى بالثلج في فصل الشتاء.	2026-04-08 18:29:37.126284+00
371	newspaper	جريدة	A2	n.	My grandfather reads the newspaper every morning.	جدي يقرأ الجريدة كل صباح.	2026-04-08 18:29:37.126284+00
372	notebook	دفتر ملاحظات	A2	n.	Write new words in your vocabulary notebook.	اكتب الكلمات الجديدة في دفتر الكلمات الخاص بك.	2026-04-08 18:29:37.126284+00
373	office	مكتب	A2	n.	My mother works in an office in the city centre.	والدتي تعمل في مكتب في وسط المدينة.	2026-04-08 18:29:37.126284+00
374	orange	برتقالة	A2	n.	She peeled an orange for her lunch break.	قشرت برتقالة لفترة الغداء الخاصة بها.	2026-04-08 18:29:37.126284+00
375	pasta	معكرونة	A2	n.	My favourite meal is pasta with tomato sauce.	وجبتي المفضلة هي المعكرونة بصلصة الطماطم.	2026-04-08 18:29:37.126284+00
376	pen	قلم حبر	A2	n.	Use a black pen to complete the application form.	استخدم قلم حبر أسود لملء نموذج التقديم.	2026-04-08 18:29:37.126284+00
377	pencil	قلم رصاص	A2	n.	Draw the map in pencil first, then in pen.	ارسم الخريطة بقلم الرصاص أولاً، ثم باستخدام قلم الحبر.	2026-04-08 18:29:37.126284+00
378	person	شخص	A2	n.	Every person in the class has a different story.	لكل شخص في الفصل قصة مختلفة.	2026-04-08 18:29:37.126284+00
379	photo	صورة فوتوغرافية	A2	n.	She took a photo of the beautiful sunset.	التقطت صورة فوتوغرافية لغروب الشمس الجميل.	2026-04-08 18:29:37.126284+00
380	plate	طبق	A2	n.	Put your vegetables on the plate first.	ضع الخضروات على الطبق أولاً.	2026-04-08 18:29:37.126284+00
381	playground	ملعب	A2	n.	The children ran around the playground at break.	ركض الأطفال حول الملعب أثناء فترة الراحة.	2026-04-08 18:29:37.126284+00
382	pool	حمام سباحة	A2	n.	We swim in the school pool every Thursday.	نسبح في حمام السباحة بالمدرسة كل يوم خميس.	2026-04-08 18:29:37.126284+00
384	postcard	بطاقة بريدية	A2	n.	She sent me a postcard from her holiday.	أرسلت لي بطاقة بريدية من إجازتها.	2026-04-08 18:29:37.126284+00
385	potato	بطاطا	A2	n.	We had baked potato and salad for lunch.	تناولنا بطاطا مشوية مع السلطة في الغداء.	2026-04-08 18:29:37.126284+00
370	move	يتحرك	A2	v.	Move your chair closer to the desk please.	حرّك كرسيك بالقرب من المكتب من فضلك.	2026-04-08 18:29:37.126284+00
383	popular	شائع	A2	adj.	Football is a very popular sport in this country.	كرة القدم رياضة شهيرة جداً في هذا البلد.	2026-04-08 18:29:37.126284+00
366	meet	يلتقي	A2	v.	Let's meet at the library at four o'clock.	دعنا نلتقي في المكتبة الساعة الرابعة عصراً.	2026-04-08 18:29:37.126284+00
387	present	هدية	A2	n.	She gave me a book as a birthday present.	أعطتني كتاباً كهدية عيد ميلاد.	2026-04-08 18:29:37.126284+00
390	project	مشروع	A2	n.	We are doing a project on climate and weather.	نحن نعمل على مشروع حول المناخ والطقس.	2026-04-08 18:29:37.126284+00
391	quarter	ربع	A2	n.	It is a quarter past three in the afternoon.	الساعة الآن الثالثة وربع بعد الظهر.	2026-04-08 18:29:37.126284+00
392	queue	طابور	A2	n.	We stood in a queue to buy our tickets.	وقفنا في طابور لشراء تذاكرنا.	2026-04-08 18:29:37.126284+00
393	quiet	هادئ	A2	adj.	Please be quiet during the reading test.	من فضلك كن هادئاً أثناء اختبار القراءة.	2026-04-08 18:29:37.126284+00
394	rabbit	أرنب	A2	n.	The children have a white rabbit as a pet.	لدى الأطفال أرنب أبيض كحيوان أليف.	2026-04-08 18:29:37.126284+00
395	rain	مطر	A2	n.	The rain made the playground wet and slippery.	المطر جعل الملعب رطباً ومنزلقاً.	2026-04-08 18:29:37.126284+00
398	restaurant	مطعم	A2	n.	We had dinner at an Italian restaurant last night.	تناولنا العشاء في مطعم إيطالي الليلة الماضية.	2026-04-08 18:29:37.126284+00
400	road	طريق	A2	n.	Cross the road carefully at the traffic lights.	عبر الطريق بحذر عند إشارات المرور.	2026-04-08 18:29:37.126284+00
401	round	مستدير	A2	adj.	The planet Earth is round in shape.	كوكب الأرض مستدير الشكل.	2026-04-08 18:29:37.130163+00
402	safe	آمن	A2	adj.	It is safe to swim in this area of the beach.	من الآمن السباحة في هذه المنطقة من الشاطئ.	2026-04-08 18:29:37.130163+00
403	salt	ملح	A2	n.	Do not add too much salt to your food.	لا تضف الكثير من الملح إلى طعامك.	2026-04-08 18:29:37.130163+00
404	sandwich	ساندويتش	A2	n.	I had a cheese and tomato sandwich for lunch.	تناولت ساندويتش الجبن والطماطم على الغداء.	2026-04-08 18:29:37.130163+00
405	sharp	حاد	A2	adj.	Be careful — the knife is very sharp.	احذر - السكين حادة جداً.	2026-04-08 18:29:37.130163+00
406	shop	متجر	A2	n.	The bookshop is next to the post office.	متجر الكتب بجانب مكتب البريد.	2026-04-08 18:29:37.130163+00
408	shower	دش	A2	n.	I have a shower every morning before breakfast.	أستحم كل صباح قبل الإفطار.	2026-04-08 18:29:37.130163+00
409	sign	علامة	A2	n.	Read the sign before entering the building.	اقرأ العلامة قبل دخول المبنى.	2026-04-08 18:29:37.130163+00
410	simple	بسيط	A2	adj.	The instructions were simple and easy to follow.	التعليمات كانت بسيطة وسهلة الفهم.	2026-04-08 18:29:37.130163+00
411	size	حجم	A2	n.	What size shoes do you wear?	ما حجم الأحذية التي ترتديها؟	2026-04-08 18:29:37.130163+00
412	snow	ثلج	A2	n.	The snow covered the ground overnight.	الثلج غطى الأرض بين عشية وضحاها.	2026-04-08 18:29:37.130163+00
413	sofa	أريكة	A2	n.	The cat is asleep on the sofa again.	القط نائم على الأريكة مرة أخرى.	2026-04-08 18:29:37.130163+00
414	soup	حساء	A2	n.	I had hot tomato soup for lunch today.	تناولت حساء الطماطم الساخن على الغداء اليوم.	2026-04-08 18:29:37.130163+00
416	square	ساحة	A2	n.	The town square has a market every Sunday.	ساحة المدينة بها سوق كل يوم أحد.	2026-04-08 18:29:37.130163+00
417	stairs	درج	A2	n.	Walk up the stairs to the second floor.	اصعد الدرج إلى الطابق الثاني.	2026-04-08 18:29:37.130163+00
418	station	محطة	A2	n.	The train station is ten minutes from the school.	محطة القطار على بعد عشر دقائق من المدرسة.	2026-04-08 18:29:37.130163+00
419	street	شارع	A2	n.	The school is at the end of the main street.	المدرسة في نهاية الشارع الرئيسي.	2026-04-08 18:29:37.130163+00
420	sugar	سكر	A2	n.	Try not to eat too much sugar every day.	حاول ألا تأكل الكثير من السكر كل يوم.	2026-04-08 18:29:37.130163+00
421	summer	صيف	A2	n.	It is very hot in this country in summer.	الطقس حار جداً في هذا البلد في الصيف.	2026-04-08 18:29:37.130163+00
422	supermarket	سوبرماركت	A2	n.	We buy food at the supermarket every week.	نشتري الغذاء من السوبرماركت كل أسبوع.	2026-04-08 18:29:37.130163+00
423	sweet	حلو	A2	adj.	The mango is a sweet and juicy tropical fruit.	المانجو فاكهة استوائية حلوة وعصيرية.	2026-04-08 18:29:37.130163+00
424	tea	شاي	A2	n.	She drinks a cup of tea every evening.	تشرب فنجان شاي كل مساء.	2026-04-08 18:29:37.130163+00
425	test	اختبار	A2	n.	We have a vocabulary test every Friday morning.	لدينا اختبار المفردات كل صباح يوم الجمعة.	2026-04-08 18:29:37.130163+00
426	ticket	تذكرة	A2	n.	You need a ticket to enter the swimming pool.	تحتاج إلى تذكرة للدخول إلى حمام السباحة.	2026-04-08 18:29:37.130163+00
427	tidy	نظيف	A2	adj.	Keep your bedroom tidy and organised.	حافظ على غرفة نومك نظيفة ومنظمة.	2026-04-08 18:29:37.130163+00
428	tomato	طماطم	A2	n.	A tomato is a healthy vegetable used in cooking.	الطماطم هي خضار صحية تستخدم في الطهي.	2026-04-08 18:29:37.130163+00
429	tonight	الليلة	A2	n.	We are having a special dinner at home tonight.	سنتناول عشاء خاص في البيت الليلة.	2026-04-08 18:29:37.130163+00
430	tooth	سن	A2	n.	Brush your teeth twice a day.	نظف أسنانك مرتين في اليوم.	2026-04-08 18:29:37.130163+00
566	gift	هدية	A2	n.	She gave me a lovely gift for my birthday.	أعطتني هدية جميلة في عيد ميلادي.	2026-04-08 18:29:37.134069+00
388	price	سعر	A2	n.	What is the price of this dictionary?	كم سعر هذا القاموس؟	2026-04-08 18:29:37.126284+00
396	relax	يسترخي	A2	v.	I relax by reading a book or watching a film.	أسترخي بقراءة كتاب أو مشاهدة فيلم.	2026-04-08 18:29:37.126284+00
397	repeat	يكرر	A2	v.	Please repeat that sentence more slowly.	من فضلك كرر تلك الجملة بشكل أبطأ.	2026-04-08 18:29:37.126284+00
399	return	يعود	A2	v.	Please return the library book by Friday.	من فضلك أعد كتاب المكتبة بحلول يوم الجمعة.	2026-04-08 18:29:37.126284+00
407	shopping	تسوق	A2	n.	We go shopping for food every Saturday morning.	نذهب للتسوق من أجل الغذاء كل صباح يوم السبت.	2026-04-08 18:29:37.130163+00
415	spell	يتهجى	A2	v.	Can you spell your surname for me?	هل يمكنك أن تهجي اسم عائلتك لي؟	2026-04-08 18:29:37.130163+00
431	toy	لعبة	A2	n.	The child's favourite toy is a red racing car.	لعبة الطفل المفضلة هي سيارة سباق حمراء.	2026-04-08 18:29:37.130163+00
433	trip	رحلة	A2	n.	We are going on a class trip to the museum.	نحن ذاهبون في رحلة صفية إلى المتحف.	2026-04-08 18:29:37.130163+00
435	vegetable	خضار	A2	n.	Eat a variety of vegetables every day.	تناول مجموعة متنوعة من الخضار كل يوم.	2026-04-08 18:29:37.130163+00
436	village	قرية	A2	n.	She grew up in a small village in the countryside.	لقد نشأت في قرية صغيرة في الريف.	2026-04-08 18:29:37.130163+00
437	visit	يزور	A2	v.	We visit our grandparents every school holiday.	نزور أجدادنا في كل عطلة مدرسية.	2026-04-08 18:29:37.130163+00
439	wall	جدار	A2	n.	There is a world map on the wall of our classroom.	يوجد خريطة العالم على جدار فصلنا الدراسي.	2026-04-08 18:29:37.130163+00
441	website	موقع الويب	A2	n.	Visit the school website for the timetable.	زر موقع الويب الخاص بالمدرسة للاطلاع على الجدول الزمني.	2026-04-08 18:29:37.130163+00
442	weekend	نهاية الأسبوع	A2	n.	I relax and read books at the weekend.	أستريح وأقرأ الكتب في نهاية الأسبوع.	2026-04-08 18:29:37.130163+00
443	welcome	أهلاً وسهلاً	A2	excl.	Welcome to the first lesson of the new year.	أهلاً وسهلاً في الدرس الأول من السنة الجديدة.	2026-04-08 18:29:37.130163+00
444	wet	مبلل	A2	adj.	The grass is wet after the heavy rain.	العشب مبلل بعد المطر الغزير.	2026-04-08 18:29:37.130163+00
445	wheel	عجلة	A2	n.	The bicycle has a flat wheel and needs fixing.	الدراجة الهوائية بها عجلة مثقوبة وتحتاج إلى إصلاح.	2026-04-08 18:29:37.130163+00
446	winter	الشتاء	A2	n.	It snows in the mountains in winter.	تنزل الثلوج على الجبال في فصل الشتاء.	2026-04-08 18:29:37.130163+00
447	wrong	خاطئ	A2	adj.	Check your work — this answer is wrong.	تحقق من عملك - هذا الجواب خاطئ.	2026-04-08 18:29:37.130163+00
448	zoo	حديقة الحيوان	A2	n.	We saw elephants and lions at the zoo.	رأينا الفيلة والأسود في حديقة الحيوان.	2026-04-08 18:29:37.130163+00
450	accident	حادث	A2	n.	There was an accident on the road this morning.	حدث حادث على الطريق هذا الصباح.	2026-04-08 18:29:37.130163+00
452	alarm	منبه	A2	n.	Set your alarm clock for seven in the morning.	اضبط ساعة المنبه على الساعة السابعة صباحاً.	2026-04-08 18:29:37.130163+00
453	alphabet	الأبجدية	A2	n.	There are twenty-six letters in the English alphabet.	توجد ستة وعشرون حرفاً في الأبجدية الإنجليزية.	2026-04-08 18:29:37.130163+00
454	angry	غاضب	A2	adj.	The teacher was angry when nobody did the homework.	كان المعلم غاضباً عندما لم يقم أحد بعمل الواجب.	2026-04-08 18:29:37.130163+00
455	apartment	شقة	A2	n.	They live in a large apartment on the fifth floor.	يعيشون في شقة كبيرة في الطابق الخامس.	2026-04-08 18:29:37.130163+00
456	April	أبريل	A2	n.	My birthday is in April, in the spring.	عيد ميلادي في أبريل، في فصل الربيع.	2026-04-08 18:29:37.130163+00
457	arch	قوس	A2	n.	Walk through the stone arch to enter the garden.	امشِ عبر القوس الحجري لدخول الحديقة.	2026-04-08 18:29:37.130163+00
458	August	أغسطس	A2	n.	The hottest month in many countries is August.	أغسطس هو أكثر شهر حاراً في العديد من الدول.	2026-04-08 18:29:37.130163+00
460	autumn	الخريف	A2	n.	The leaves change colour and fall in autumn.	تتغير ألوان الأوراق وتسقط في فصل الخريف.	2026-04-08 18:29:37.130163+00
461	avenue	شارع	A2	n.	The school is on Park Avenue, near the library.	المدرسة تقع على شارع بارك، بالقرب من المكتبة.	2026-04-08 18:29:37.130163+00
462	balcony	شرفة	A2	n.	She reads outside on the balcony every morning.	تقرأ بالخارج على الشرفة كل صباح.	2026-04-08 18:29:37.130163+00
464	band	فرقة موسيقية	A2	n.	She plays guitar in the school music band.	تعزف الجيتار في فرقة الموسيقى بالمدرسة.	2026-04-08 18:29:37.130163+00
465	basket	سلة	A2	n.	Put the fruit in the basket on the table.	ضع الفاكهة في السلة على الطاولة.	2026-04-08 18:29:37.130163+00
466	bath	حمام	A2	n.	The children have a bath before they go to bed.	يستحم الأطفال قبل أن يذهبوا إلى السرير.	2026-04-08 18:29:37.130163+00
467	bear	دب	A2	n.	A polar bear lives in very cold icy regions.	يعيش الدب القطبي في مناطق باردة جداً وجليدية.	2026-04-08 18:29:37.130163+00
468	beef	لحم البقر	A2	n.	He ordered beef and vegetables for dinner.	طلب لحم البقر والخضروات لتناول العشاء.	2026-04-08 18:29:37.130163+00
469	belt	حزام	A2	n.	He wears a brown belt with his school trousers.	يرتدي حزاماً بنياً مع بنطلون المدرسة.	2026-04-08 18:29:37.130163+00
470	bench	مقعد	A2	n.	We sat on a wooden bench in the park.	جلسنا على مقعد خشبي في الحديقة.	2026-04-08 18:29:37.130163+00
471	bike	دراجة	A2	n.	She cycles to school on her red bike.	تركب على دراجتها الحمراء للذهاب إلى المدرسة.	2026-04-08 18:29:37.130163+00
473	biscuit	بسكويت	A2	n.	She had a biscuit and a glass of milk.	تناولت بسكويت وكوب من الحليب.	2026-04-08 18:29:37.130163+00
474	blanket	بطانية	A2	n.	Put a warm blanket on the bed in winter.	ضع بطانية دافئة على السرير في الشتاء.	2026-04-08 18:29:37.130163+00
475	blind	أعمى	A2	adj.	He has been blind since he was very young.	هو أعمى منذ أن كان صغيراً جداً.	2026-04-08 18:29:37.130163+00
434	uniform	زي رسمي	A2	n.	Students wear a blue and white uniform at school.	يرتدي الطلاب زياً مدرسياً أزرق وأبيض في المدرسة.	2026-04-08 18:29:37.130163+00
438	vocabulary	مفردات	A2	n.	Learning new vocabulary helps you communicate better.	تعلم مفردات جديدة يساعدك على التواصل بشكل أفضل.	2026-04-08 18:29:37.130163+00
440	weather	طقس	A2	n.	The weather is warm and sunny in July.	الطقس دافئ وشمسي في شهر يوليو.	2026-04-08 18:29:37.130163+00
449	abroad	في الخارج	A2	adv.	She went abroad for the first time last summer.	ذهبت بالخارج للمرة الأولى الصيف الماضي.	2026-04-08 18:29:37.130163+00
451	actor	ممثل	A2	n.	His favourite actor is in the new film.	ممثله المفضل يظهر في الفيلم الجديد.	2026-04-08 18:29:37.130163+00
459	aunt	عمة أو خالة	A2	n.	My aunt lives in another city far from us.	تعيش عمتي في مدينة أخرى بعيدة عنا.	2026-04-08 18:29:37.130163+00
463	banana	موز	A2	n.	A banana is a sweet and filling snack.	الموزة وجبة خفيفة حلوة ومشبعة.	2026-04-08 18:29:37.130163+00
472	bill	فاتورة	A2	n.	The waiter brought the bill at the end of the meal.	أحضر النادل الفاتورة في نهاية الوجبة.	2026-04-08 18:29:37.130163+00
476	blonde	أشقر	A2	adj.	The girl with the blonde hair is my cousin.	الفتاة ذات الشعر الأشقر هي ابنة عمي.	2026-04-08 18:29:37.130163+00
477	blow	ينفخ	A2	v.	Blow out all the candles on your birthday cake.	انفخ جميع الشموع على كعكة عيد ميلادك.	2026-04-08 18:29:37.130163+00
478	boot	حذاء طويل	A2	n.	Wear boots in the snow to keep your feet dry.	ارتد أحذية طويلة في الثلج لإبقاء قدميك جافة.	2026-04-08 18:29:37.130163+00
479	borrow	يستعير	A2	v.	Can I borrow your pencil for a minute?	هل يمكنني استعارة قلمك لدقيقة واحدة؟	2026-04-08 18:29:37.130163+00
480	bowl	وعاء	A2	n.	She had a bowl of warm soup for lunch.	تناولت وعاء من الحساء الدافئ على الغداء.	2026-04-08 18:29:37.130163+00
481	brave	شجاع	A2	adj.	The brave firefighter saved the people in the building.	رجل الإطفاء الشجاع أنقذ الناس في المبنى.	2026-04-08 18:29:37.130163+00
482	break	فترة راحة	A2	n.	We have a fifteen-minute break between lessons.	لدينا فترة راحة مدتها خمسة عشر دقيقة بين الحصص.	2026-04-08 18:29:37.130163+00
483	brick	لبنة	A2	n.	The old school building is made of red brick.	مبنى المدرسة القديم مصنوع من لبن أحمر.	2026-04-08 18:29:37.130163+00
484	bring	يحضر	A2	v.	Bring a pencil and a rubber to the test.	احضر قلماً وممحاة إلى الاختبار.	2026-04-08 18:29:37.130163+00
486	bucket	دلو	A2	n.	She carried a bucket of water from the tap.	حملت دلو من الماء من الصنبور.	2026-04-08 18:29:37.130163+00
488	cage	قفص	A2	n.	The parrot lives in a large cage in the living room.	يعيش الببغاء في قفص كبير في غرفة المعيشة.	2026-04-08 18:29:37.130163+00
489	calm	هادئ	A2	adj.	Stay calm and read each question carefully.	ابقَ هادئاً واقرأ كل سؤال بعناية.	2026-04-08 18:29:37.130163+00
490	camp	يخيم	A2	v.	We camped in the forest during the school trip.	خيمنا في الغابة خلال الرحلة المدرسية.	2026-04-08 18:29:37.130163+00
491	candle	شمعة	A2	n.	She lit a candle when the lights went out.	أشعلت شمعة عندما انقطع التيار الكهربائي.	2026-04-08 18:29:37.130163+00
492	cap	قبعة	A2	n.	He always wears a cap when he plays cricket.	يرتدي دائماً قبعة عندما يلعب الكريكيت.	2026-04-08 18:29:37.130163+00
493	catch	يمسك	A2	v.	Catch the ball with both hands.	أمسك الكرة بكلتا يديك.	2026-04-08 18:29:37.130163+00
494	cave	كهف	A2	n.	The explorers found a large cave near the beach.	وجد المستكشفون كهفاً كبيراً بالقرب من الشاطئ.	2026-04-08 18:29:37.130163+00
495	ceiling	سقف	A2	n.	The ceiling of the classroom is very high.	سقف الفصل الدراسي عالي جداً.	2026-04-08 18:29:37.130163+00
496	century	قرن	A2	n.	The school was built more than a century ago.	بُنيت المدرسة منذ أكثر من قرن.	2026-04-08 18:29:37.130163+00
497	chapter	فصل	A2	n.	Read the first chapter of the book tonight.	اقرأ الفصل الأول من الكتاب الليلة.	2026-04-08 18:29:37.130163+00
499	chase	يطارد	A2	v.	The dog chased the ball across the field.	طاردت الكلب الكرة عبر الملعب.	2026-04-08 18:29:37.130163+00
500	cheap	رخيص	A2	adj.	The market has cheap and fresh vegetables.	السوق يبيع خضروات رخيصة وطازجة.	2026-04-08 18:29:37.130163+00
501	cheek	خد	A2	n.	She kissed her grandmother on the cheek.	قبلت جدتها على الخد.	2026-04-08 18:29:37.134069+00
502	chin	ذقن	A2	n.	He stroked his chin and thought about the question.	مسح ذقنه وفكر في السؤال.	2026-04-08 18:29:37.134069+00
503	chip	رقاقة	A2	n.	We had fish and chips for Friday lunch.	تناولنا السمك مع الرقائق في غداء يوم الجمعة.	2026-04-08 18:29:37.134069+00
504	chocolate	شوكولاتة	A2	n.	She bought a bar of chocolate at the shop.	اشترت قطعة من الشوكولاتة من المتجر.	2026-04-08 18:29:37.134069+00
505	Christmas	عيد الميلاد	A2	n.	Families come together at Christmas to celebrate.	تجتمع العائلات في عيد الميلاد للاحتفال.	2026-04-08 18:29:37.134069+00
506	classroom	فصل دراسي	A2	n.	Our classroom has twenty desks and a whiteboard.	فصلنا الدراسي يحتوي على عشرين مكتبًا وسبورة بيضاء.	2026-04-08 18:29:37.134069+00
507	clever	ذكي	A2	adj.	She is a very clever student who loves science.	هي طالبة ذكية جدًا وتحب العلوم.	2026-04-08 18:29:37.134069+00
509	coin	عملة	A2	n.	He found an old coin on the ground near the park.	وجد عملة قديمة على الأرض بالقرب من الحديقة.	2026-04-08 18:29:37.134069+00
511	comic	كتاب كوميكس	A2	n.	He reads a comic book every weekend.	يقرأ كتاب كوميكس كل نهاية أسبوع.	2026-04-08 18:29:37.134069+00
512	conversation	محادثة	A2	n.	We had a short conversation in English.	كان لدينا محادثة قصيرة باللغة الإنجليزية.	2026-04-08 18:29:37.134069+00
514	corridor	ممر	A2	n.	Walk quietly in the corridor between classes.	امشِ بهدوء في الممر بين الحصص.	2026-04-08 18:29:37.134069+00
515	cousin	ابن/ابنة العم أو العمة	A2	n.	My cousin is visiting us during the holiday.	ابن عمي يزورنا خلال العطلة.	2026-04-08 18:29:37.134069+00
518	crowd	حشد	A2	n.	A large crowd gathered to watch the match.	تجمع حشد كبير لمشاهدة المباراة.	2026-04-08 18:29:37.134069+00
520	cucumber	خيار	A2	n.	Add cucumber and tomato to the salad.	أضف الخيار والطماطم إلى السلطة.	2026-04-08 18:29:37.134069+00
521	curtain	ستار	A2	n.	Open the curtains to let some sunlight in.	افتح الستائر لدخول أشعة الشمس.	2026-04-08 18:29:37.134069+00
487	burn	يحرق	A2	v.	Do not touch the stove — you might burn yourself.	لا تلمس الموقد - قد تحترق نفسك.	2026-04-08 18:29:37.130163+00
508	climb	يتسلق	A2	v.	We climbed the hill to get a better view.	تسلقنا التل للحصول على منظر أفضل.	2026-04-08 18:29:37.134069+00
510	collect	يجمع	A2	v.	She collects stamps from different countries.	تجمع الطوابع من دول مختلفة.	2026-04-08 18:29:37.134069+00
516	crash	يصطدم	A2	v.	The car crashed into the wall on the bend.	اصطدمت السيارة بالجدار في المنعطف.	2026-04-08 18:29:37.134069+00
517	cross	يعبر	A2	v.	Cross the road at the traffic lights.	عبر الطريق عند إشارات المرور.	2026-04-08 18:29:37.134069+00
519	cry	يبكي	A2	v.	She started to cry when she heard the sad news.	بدأت تبكي عندما سمعت الخبر الحزين.	2026-04-08 18:29:37.134069+00
498	charity	خيرية	A2	n.	We raised money for a local children's charity.	جمعنا المال لجمعية خيرية محلية للأطفال.	2026-04-08 18:29:37.130163+00
522	cushion	وسادة	A2	n.	She put a soft cushion on the hard chair.	وضعت وسادة ناعمة على الكرسي الصلب.	2026-04-08 18:29:37.134069+00
524	dangerous	خطير	A2	adj.	It is dangerous to cross the road without looking.	من الخطير عبور الطريق دون النظر حول.	2026-04-08 18:29:37.134069+00
526	deaf	أصم	A2	adj.	She speaks using sign language because she is deaf.	تتحدث باستخدام لغة الإشارة لأنها صماء.	2026-04-08 18:29:37.134069+00
527	December	ديسمبر	A2	n.	Christmas is celebrated on the 25th of December.	يتم الاحتفال بعيد الميلاد في الخامس والعشرين من ديسمبر.	2026-04-08 18:29:37.134069+00
530	desert	صحراء	A2	n.	A camel can survive for many days in the desert.	يمكن للجمل أن يبقى على قيد الحياة لعدة أيام في الصحراء.	2026-04-08 18:29:37.134069+00
531	diary	يوميات	A2	n.	She writes in her diary every evening before bed.	تكتب في يومياتها كل مساء قبل النوم.	2026-04-08 18:29:37.134069+00
533	disabled	معاق	A2	adj.	There is a lift for disabled students in the building.	يوجد مصعد للطلاب المعاقين في المبنى.	2026-04-08 18:29:37.134069+00
534	disco	حفلة راقصة	A2	n.	They danced all evening at the school disco.	رقصوا طوال المساء في حفلة المدرسة الراقصة.	2026-04-08 18:29:37.134069+00
535	dollar	دولار	A2	n.	The book costs ten dollars at the bookshop.	الكتاب يكلف عشرة دولارات في المكتبة.	2026-04-08 18:29:37.134069+00
536	dolphin	دولفين	A2	n.	Dolphins are very intelligent sea mammals.	الدلافين حيوانات بحرية ذكية جدًا.	2026-04-08 18:29:37.134069+00
539	eagle	نسر	A2	n.	An eagle flew high above the mountain.	حلق نسر عاليًا فوق الجبل.	2026-04-08 18:29:37.134069+00
540	Easter	عيد الفصح	A2	n.	We visited our relatives at Easter this year.	زرنا أقاربنا في عيد الفصح هذا العام.	2026-04-08 18:29:37.134069+00
541	elephant	فيل	A2	n.	An elephant is the largest land animal on Earth.	الفيل هو أكبر حيوان بري على الأرض.	2026-04-08 18:29:37.134069+00
542	email	بريد إلكتروني	A2	n.	Send your homework by email before midnight.	أرسل واجبك المنزلي عبر البريد الإلكتروني قبل منتصف الليل.	2026-04-08 18:29:37.134069+00
543	empty	فارغ	A2	adj.	The classroom was empty when I arrived early.	الفصل الدراسي كان فارغاً عندما وصلت مبكراً.	2026-04-08 18:29:37.134069+00
544	enormous	ضخم	A2	adj.	The library has an enormous collection of books.	المكتبة لديها مجموعة ضخمة من الكتب.	2026-04-08 18:29:37.134069+00
545	enough	كافٍ	A2	det.	Have you had enough food to eat?	هل تناولت طعاماً كافياً لتأكله؟	2026-04-08 18:29:37.134069+00
546	envelope	ظرف	A2	n.	Put the letter inside the envelope and seal it.	ضع الرسالة داخل الظرف وأغلقه.	2026-04-08 18:29:37.134069+00
547	equal	متساوٍ	A2	adj.	Everyone in the class has an equal chance to speak.	لكل شخص في الفصل فرصة متساوية للتحدث.	2026-04-08 18:29:37.134069+00
550	exercise	تمرين	A2	n.	We do exercise every day to stay fit and healthy.	نمارس التمارين كل يوم للبقاء بصحة جيدة وسليمة.	2026-04-08 18:29:37.134069+00
551	fax	فاكس	A2	n.	They sent the form to the office by fax.	أرسلوا النموذج إلى المكتب عبر الفاكس.	2026-04-08 18:29:37.134069+00
553	fence	سياج	A2	n.	There is a wooden fence around the school garden.	هناك سياج خشبي حول حديقة المدرسة.	2026-04-08 18:29:37.134069+00
554	field	حقل	A2	n.	The children played in the field behind the school.	لعب الأطفال في الحقل خلف المدرسة.	2026-04-08 18:29:37.134069+00
557	flag	علم	A2	n.	Every country in the world has its own flag.	كل دولة في العالم لها علمها الخاص بها.	2026-04-08 18:29:37.134069+00
558	flour	دقيق	A2	n.	Mix flour, eggs, and milk to make pancakes.	امزج الدقيق والبيض والحليب لتصنع الفطائر.	2026-04-08 18:29:37.134069+00
559	fork	شوكة	A2	n.	Use a fork to eat your pasta.	استخدم الشوكة لتناول المعكرونة.	2026-04-08 18:29:37.134069+00
560	fox	ثعلب	A2	n.	A fox ran across the road in front of the car.	عبر ثعلب الطريق أمام السيارة.	2026-04-08 18:29:37.134069+00
561	Friday	الجمعة	A2	n.	We have a spelling test every Friday morning.	لدينا اختبار إملاء كل صباح يوم الجمعة.	2026-04-08 18:29:37.134069+00
562	frog	ضفدع	A2	n.	There is a small green frog in the garden pond.	هناك ضفدع أخضر صغير في بركة الحديقة.	2026-04-08 18:29:37.134069+00
563	front	الأمام	A2	n.	Come to the front and write the answer on the board.	تقدم للأمام واكتب الإجابة على السبورة.	2026-04-08 18:29:37.134069+00
564	future	المستقبل	A2	n.	In the future, I want to be a doctor.	في المستقبل، أريد أن أصبح طبيباً.	2026-04-08 18:29:37.134069+00
565	gate	بوابة	A2	n.	Please close the school gate behind you.	يرجى إغلاق بوابة المدرسة خلفك.	2026-04-08 18:29:37.134069+00
528	deliver	يُسلِّم	A2	v.	The postman delivered a parcel this morning.	سلم عامل البريد طردًا هذا الصباح.	2026-04-08 18:29:37.134069+00
529	describe	يصف	A2	v.	Describe the picture using three sentences.	صف الصورة باستخدام ثلاث جمل.	2026-04-08 18:29:37.134069+00
532	dig	يحفر	A2	v.	The children dug a hole in the sand at the beach.	حفر الأطفال حفرة في الرمل على الشاطئ.	2026-04-08 18:29:37.134069+00
537	dull	ممل	A2	adj.	The weather was dull and grey all day.	الطقس كان كئيبًا وغائمًا طوال اليوم.	2026-04-08 18:29:37.134069+00
538	dump	يُلقي	A2	v.	Do not dump rubbish in the park.	لا تلقِ القمامة في الحديقة.	2026-04-08 18:29:37.134069+00
548	escape	يهرب	A2	v.	The bird escaped from its cage through the open window.	الطائر هرب من قفصه من خلال النافذة المفتوحة.	2026-04-08 18:29:37.134069+00
549	excuse	يعتذر	A2	v.	Excuse me — could you tell me where the library is?	أعتذر - هل يمكنك أن تخبرني أين توجد المكتبة؟	2026-04-08 18:29:37.134069+00
555	fit	لائق بدنياً	A2	adj.	Eating well and exercising helps you stay fit.	تناول الطعام الصحي والتمارين الرياضية تساعدك على البقاء بصحة جيدة.	2026-04-08 18:29:37.134069+00
556	fix	يُصلح	A2	v.	Can you fix the broken chair in the corner?	هل يمكنك إصلاح الكرسي المكسور في الزاوية؟	2026-04-08 18:29:37.134069+00
525	date	تاريخ	A2	n.	What is today's date?	ما هو تاريخ اليوم؟	2026-04-08 18:29:37.134069+00
567	gloves	قفازات	A2	n.	Put on gloves before going outside in winter.	ارتدِ القفازات قبل الخروج في الشتاء.	2026-04-08 18:29:37.134069+00
568	goal	هدف	A2	n.	He scored a goal in the last minute of the match.	سجل هدفاً في الدقيقة الأخيرة من المباراة.	2026-04-08 18:29:37.134069+00
570	gorilla	غوريلا	A2	n.	The gorilla at the zoo was very large and gentle.	الغوريلا في حديقة الحيوان كانت كبيرة وودية جداً.	2026-04-08 18:29:37.134069+00
571	grandfather	جد	A2	n.	My grandfather tells me stories from his childhood.	يحكي لي جدي قصصاً من طفولته.	2026-04-08 18:29:37.134069+00
572	grandmother	جدة	A2	n.	My grandmother makes the best food in the world.	جدتي تصنع أفضل طعام في العالم.	2026-04-08 18:29:37.134069+00
573	grass	عشب	A2	n.	Keep off the grass in the school garden.	لا تمشِ على العشب في حديقة المدرسة.	2026-04-08 18:29:37.134069+00
574	grey	رمادي	A2	adj.	The sky is grey and it looks like rain.	السماء رمادية اللون ويبدو أن الأمطار قادمة.	2026-04-08 18:29:37.134069+00
575	guitar	جيتار	A2	n.	She has been playing guitar since she was seven.	تعزف الجيتار منذ أن كانت في السابعة من عمرها.	2026-04-08 18:29:37.134069+00
576	ham	لحم خنزير	A2	n.	He had a ham and cheese sandwich at lunchtime.	تناول شطيرة لحم خنزير والجبن في وقت الغداء.	2026-04-08 18:29:37.134069+00
579	hat	قبعة	A2	n.	She wore a sun hat to protect her head from the sun.	ارتدت قبعة شمس لحماية رأسها من الشمس.	2026-04-08 18:29:37.134069+00
580	hero	بطل	A2	n.	The firefighter is a hero to everyone in the town.	رجل الإطفاء بطل بالنسبة للجميع في المدينة.	2026-04-08 18:29:37.134069+00
581	hill	تل	A2	n.	We ran up the steep hill in PE class.	ركضنا صعوداً على التل الشديد الانحدار في حصة التربية الرياضية.	2026-04-08 18:29:37.134069+00
582	hip	الورك	A2	n.	She hurt her hip when she fell in the playground.	أصيبت وركها عندما سقطت في ملعب المدرسة.	2026-04-08 18:29:37.134069+00
583	horse	حصان	A2	n.	She rides a horse at the stables every Saturday.	تركب حصاناً في الإسطبل كل يوم السبت.	2026-04-08 18:29:37.134069+00
586	hurt	يؤلم	A2	v.	It hurts when you fall and graze your knee.	يؤلم عندما تسقط وتسحج ركبتك.	2026-04-08 18:29:37.134069+00
587	insect	حشرة	A2	n.	The butterfly is a beautiful flying insect.	الفراشة حشرة طائرة جميلة.	2026-04-08 18:29:37.134069+00
589	January	يناير	A2	n.	School starts again in January after the winter break.	تبدأ المدرسة مرة أخرى في يناير بعد إجازة الشتاء.	2026-04-08 18:29:37.134069+00
590	joke	نكتة	A2	n.	He told a funny joke that made the whole class laugh.	روى نكتة مضحكة أضحكت كل الفصل.	2026-04-08 18:29:37.134069+00
591	July	يوليو	A2	n.	We have our longest school holiday in July.	لدينا أطول إجازة مدرسية في يوليو.	2026-04-08 18:29:37.134069+00
592	June	يونيو	A2	n.	Sports day is always held in June.	يُقام يوم الرياضة دائماً في يونيو.	2026-04-08 18:29:37.134069+00
595	lake	بحيرة	A2	n.	We went rowing on the lake in the park.	ذهبنا للتجديف على البحيرة في الحديقة.	2026-04-08 18:29:37.134069+00
597	lamp	مصباح	A2	n.	She turned on the lamp to read in the dark room.	أضاءت المصباح لتقرأ في الغرفة المظلمة.	2026-04-08 18:29:37.134069+00
600	lazy	كسول	A2	adj.	Do not be lazy — do your best in every lesson.	لا تكن كسولاً — بذل قصارى جهدك في كل درس.	2026-04-08 18:29:37.134069+00
601	leaf	ورقة	A2	n.	A single red leaf fell from the tree in autumn.	سقطت ورقة حمراء واحدة من الشجرة في الخريف.	2026-04-08 18:29:37.138276+00
603	lemon	ليمون	A2	n.	She squeezed a lemon into her glass of water.	عصرت ليمونة في كوب الماء الخاص بها.	2026-04-08 18:29:37.138276+00
604	lion	أسد	A2	n.	A lion is a strong and powerful wild cat.	الأسد قط برّي قوي وقادر.	2026-04-08 18:29:37.138276+00
605	lip	شفة	A2	n.	She put on lip balm because her lips were dry.	وضعت مرهم الشفاه لأن شفتيها كانتا جافتين.	2026-04-08 18:29:37.138276+00
606	list	قائمة	A2	n.	Write a list of ten new words from the lesson.	اكتب قائمة بعشر كلمات جديدة من الدرس.	2026-04-08 18:29:37.138276+00
608	log	جذع	A2	n.	They put a log on the fire to keep warm.	وضعوا جذع الشجرة على النار ليبقوا دافئين.	2026-04-08 18:29:37.138276+00
609	lonely	وحيد	A2	adj.	The new student felt lonely on her first day.	شعرت الطالبة الجديدة بالوحدة في يومها الأول.	2026-04-08 18:29:37.138276+00
6	address	عنوان	A2	n.	Please write your address on the form.	يرجى كتابة عنوانك على النموذج.	2026-04-08 18:29:37.113583+00
577	hamster	هامستر	A2	n.	The class has a hamster that lives in a small cage.	يوجد هامستر في الفصل يعيش في قفص صغير.	2026-04-08 18:29:37.134069+00
578	hang	يعلّق	A2	v.	Hang your coat on the hook by the door.	علّق معطفك على الخطاف بجانب الباب.	2026-04-08 18:29:37.134069+00
585	hurry	يُسرع	A2	v.	Hurry up or we will miss the school bus.	أسرع أو سنفقد حافلة المدرسة.	2026-04-08 18:29:37.134069+00
588	invite	يدعو	A2	v.	She invited all her classmates to her birthday party.	دعت جميع زملائها في الفصل إلى حفلة عيد ميلادها.	2026-04-08 18:29:37.134069+00
593	kick	يركل	A2	v.	Kick the ball into the goal as hard as you can.	ركل الكرة في الهدف بأقوى ما تستطيع.	2026-04-08 18:29:37.134069+00
596	lamb	خروف صغير	A2	n.	A lamb is a young sheep that is soft and white.	الحمل هو خروف صغير ناعم وأبيض.	2026-04-08 18:29:37.134069+00
598	land	يهبط	A2	v.	The plane will land at the airport at noon.	ستهبط الطائرة في المطار عند الظهيرة.	2026-04-08 18:29:37.134069+00
599	laugh	يضحك	A2	v.	The children laughed loudly at the funny story.	ضحك الأطفال بصوت عالٍ على القصة المضحكة.	2026-04-08 18:29:37.134069+00
602	lean	يستند	A2	v.	Lean your bicycle against the wall of the building.	استند دراجتك على جدار المبنى.	2026-04-08 18:29:37.138276+00
607	lock	يُغلق	A2	v.	Always lock the door when you leave the classroom.	أغلق الباب دائماً عندما تغادر الفصل.	2026-04-08 18:29:37.138276+00
610	loud	عالٍ	A2	adj.	The music was too loud in the room next door.	كانت الموسيقى عالية جداً في الغرفة المجاورة.	2026-04-08 18:29:37.138276+00
594	knock	يطرق	A2	v.	Always knock before entering the teacher's office.	اطرق الباب دائماً قبل الدخول إلى مكتب المعلم.	2026-04-08 18:29:37.134069+00
611	lovely	جميل	A2	adj.	What a lovely day to go to the park!	يا لها من حديقة جميلة للذهاب إليها!	2026-04-08 18:29:37.138276+00
612	lucky	محظوظ	A2	adj.	I was lucky to find a seat on the busy bus.	كنت محظوظاً بأنني وجدت مقعداً في الحافلة المكتظة.	2026-04-08 18:29:37.138276+00
613	mango	مانجو	A2	n.	A mango is a sweet and juicy tropical fruit.	المانجو فاكهة استوائية حلوة وعصيرية.	2026-04-08 18:29:37.138276+00
614	March	مارس	A2	n.	Spring begins in March in many countries.	يبدأ الربيع في مارس في العديد من الدول.	2026-04-08 18:29:37.138276+00
615	mayor	عمدة	A2	n.	The mayor opened the new community centre.	افتتح العمدة مركز المجتمع الجديد.	2026-04-08 18:29:37.138276+00
617	midnight	منتصف الليل	A2	n.	The party ended just after midnight.	انتهت الحفلة بعد منتصف الليل مباشرة.	2026-04-08 18:29:37.138276+00
618	mirror	مرآة	A2	n.	Look in the mirror to check your school uniform.	انظر في المرآة للتحقق من زيك المدرسي.	2026-04-08 18:29:37.138276+00
619	mix	يخلط	A2	v.	Mix the flour and butter together in the bowl.	اخلط الدقيق والزبدة معاً في الوعاء.	2026-04-08 18:29:37.138276+00
620	Monday	الاثنين	A2	n.	Monday is the first day of the school week.	الاثنين هو اليوم الأول من أسبوع الدراسة.	2026-04-08 18:29:37.138276+00
621	moon	قمر	A2	n.	The full moon lit up the sky last night.	أضاء القمر الكامل السماء الليلة الماضية.	2026-04-08 18:29:37.138276+00
622	mop	ممسحة	A2	n.	The cleaner used a mop to wash the floor.	استخدم عامل التنظيف ممسحة لغسل الأرضية.	2026-04-08 18:29:37.138276+00
623	mosque	مسجد	A2	n.	The mosque in our town is over three hundred years old.	المسجد في بلدتنا يزيد عمره عن ثلاثمائة سنة.	2026-04-08 18:29:37.138276+00
624	motor	محرك	A2	n.	The motor on the boat stopped working suddenly.	توقف محرك القارب فجأة عن العمل.	2026-04-08 18:29:37.138276+00
625	mud	طين	A2	n.	The children got mud on their boots in the field.	تسخ الأطفال أحذيتهم بالطين في الحقل.	2026-04-08 18:29:37.138276+00
626	museum	متحف	A2	n.	We visited the natural history museum on our school trip.	زرنا متحف التاريخ الطبيعي في رحلتنا المدرسية.	2026-04-08 18:29:37.138276+00
627	nail	مسمار	A2	n.	She painted her nails red for the school show.	طلت أظافرها باللون الأحمر لحفل المدرسة.	2026-04-08 18:29:37.138276+00
628	narrow	ضيق	A2	adj.	The street was very narrow and only one car could pass.	كانت الشارع ضيقة جداً ولا يمكن لسيارة واحدة فقط أن تعبر.	2026-04-08 18:29:37.138276+00
629	neck	رقبة	A2	n.	She wore a pretty necklace around her neck.	ارتدت قلادة جميلة حول رقبتها.	2026-04-08 18:29:37.138276+00
631	nest	عش	A2	n.	A bird built a nest in the tree outside our window.	بنت طائر عشاً في الشجرة خارج نافذتنا.	2026-04-08 18:29:37.138276+00
633	noon	الظهيرة	A2	n.	We finish our morning lessons at noon.	ننتهي من دروسنا الصباحية في الظهيرة.	2026-04-08 18:29:37.138276+00
634	November	نوفمبر	A2	n.	Bonfire Night is celebrated in November in Britain.	يتم الاحتفال بليلة الحريق في نوفمبر في بريطانيا.	2026-04-08 18:29:37.138276+00
635	October	أكتوبر	A2	n.	Autumn starts in October in the northern hemisphere.	يبدأ الخريف في أكتوبر في نصف الكرة الشمالي.	2026-04-08 18:29:37.138276+00
636	oil	زيت	A2	n.	She cooked the vegetables in a little olive oil.	طهت الخضروات في قليل من زيت الزيتون.	2026-04-08 18:29:37.138276+00
637	owl	بومة	A2	n.	An owl sleeps during the day and hunts at night.	تنام البومة خلال النهار وتصطاد في الليل.	2026-04-08 18:29:37.138276+00
638	pain	ألم	A2	n.	She felt pain in her knee after the long run.	شعرت بألم في ركبتها بعد الجري الطويل.	2026-04-08 18:29:37.138276+00
640	parents	والدان	A2	n.	My parents always help me with my homework.	والداي يساعدانني دائماً في واجباتي المدرسية.	2026-04-08 18:29:37.138276+00
641	party	حفلة	A2	n.	She had a birthday party with ten friends.	أقامت حفلة عيد ميلاد مع عشرة أصدقاء.	2026-04-08 18:29:37.138276+00
642	passport	جواز سفر	A2	n.	You need a passport to travel to another country.	تحتاج إلى جواز سفر للسفر إلى دولة أخرى.	2026-04-08 18:29:37.138276+00
644	patient	صبور	A2	adj.	A good teacher is always patient and encouraging.	المعلم الجيد يكون صبوراً وشجاعاً دائماً.	2026-04-08 18:29:37.138276+00
645	pear	كمثرى	A2	n.	She packed a pear and a sandwich for her lunch.	وضعت كمثرى وساندويتش في حقيبة طعامها.	2026-04-08 18:29:37.138276+00
646	peel	يقشر	A2	v.	Peel the orange and share it with your friend.	قشّر البرتقالة وشاركها مع صديقك.	2026-04-08 18:29:37.138276+00
648	pet	حيوان أليف	A2	n.	My pet is a small orange cat called Mango.	حيواني الأليف هو قطة برتقالية صغيرة تدعى مانجو.	2026-04-08 18:29:37.138276+00
649	pig	خنزير	A2	n.	A pig is a farm animal that lives in a pen.	الخنزير حيوان مزرعة يعيش في حظيرة.	2026-04-08 18:29:37.138276+00
650	pilot	طيار	A2	n.	She wants to be a pilot when she grows up.	تريد أن تصبح طيارة عندما تكبر.	2026-04-08 18:29:37.138276+00
651	pink	وردي	A2	adj.	She is wearing a pink dress and white shoes.	ترتدي فستاناً وردياً وحذاء أبيض.	2026-04-08 18:29:37.138276+00
652	pizza	بيتزا	A2	n.	We had pizza with tomato and cheese on Friday.	تناولنا البيتزا مع الطماطم والجبن يوم الجمعة.	2026-04-08 18:29:37.138276+00
653	plain	بسيط	A2	adj.	She prefers plain food without too many spices.	تفضل الطعام البسيط بدون الكثير من التوابل.	2026-04-08 18:29:37.138276+00
630	nephew	ابن أخ أو ابن أخت	A2	n.	Her nephew is only three years old.	ابن أخيها عمره ثلاث سنوات فقط.	2026-04-08 18:29:37.138276+00
632	niece	ابنة أخ أو أخت	A2	n.	Her niece is starting school for the first time.	ابنة أخيها تبدأ المدرسة للمرة الأولى.	2026-04-08 18:29:37.138276+00
639	paint	يطلي	A2	v.	We paint pictures every Thursday in art class.	نرسم صوراً كل يوم خميس في حصة الفن.	2026-04-08 18:29:37.138276+00
643	past	الماضي	A2	n.	Walk past the shop and turn left at the corner.	مر بجانب المتجر والتفت يساراً عند الزاوية.	2026-04-08 18:29:37.138276+00
647	penguin	بطريق	A2	n.	A penguin cannot fly but it can swim very well.	البطريق لا يستطيع الطيران لكنه يسبح بشكل جيد جداً.	2026-04-08 18:29:37.138276+00
654	plan	خطة	A2	n.	We made a plan for the school project last week.	وضعنا خطة للمشروع المدرسي الأسبوع الماضي.	2026-04-08 18:29:37.138276+00
655	plane	طائرة	A2	n.	We flew to Spain on a large plane.	طرنا إلى إسبانيا على متن طائرة كبيرة.	2026-04-08 18:29:37.138276+00
656	plug	قابس	A2	n.	Put the plug in the socket to charge the laptop.	أدخل القابس في المقبس لشحن جهاز الكمبيوتر المحمول.	2026-04-08 18:29:37.138276+00
657	pocket	جيب	A2	n.	He put his phone in his jacket pocket.	وضع هاتفه في جيب سترته.	2026-04-08 18:29:37.138276+00
658	poem	قصيدة	A2	n.	We read a short poem at the start of class.	قرأنا قصيدة قصيرة في بداية الفصل.	2026-04-08 18:29:37.138276+00
659	Saturday	السبت	A2	n.	We always visit the market on Saturday morning.	نزور السوق دائماً في صباح السبت.	2026-04-08 18:29:37.138276+00
660	Sunday	الأحد	A2	n.	My family spends time together on Sunday afternoon.	تقضي عائلتي الوقت معاً في فترة الظهيرة يوم الأحد.	2026-04-08 18:29:37.138276+00
661	Thursday	الخميس	A2	n.	We have PE class every Thursday.	لدينا حصة تربية بدنية كل يوم خميس.	2026-04-08 18:29:37.138276+00
662	Tuesday	الثلاثاء	A2	n.	Our English test is every Tuesday.	اختبار اللغة الإنجليزية لدينا كل يوم ثلاثاء.	2026-04-08 18:29:37.138276+00
663	Wednesday	الأربعاء	A2	n.	I have piano lessons on Wednesday evenings.	أخذ دروس البيانو في مساء الأربعاء.	2026-04-08 18:29:37.138276+00
664	September	سبتمبر	A2	n.	The new school year starts in September.	يبدأ العام الدراسي الجديد في سبتمبر.	2026-04-08 18:29:37.138276+00
665	wrist	معصم	A2	n.	She sprained her wrist during the basketball game.	أصابت معصمها بالالتواء أثناء مباراة كرة السلة.	2026-04-08 18:29:37.138276+00
666	worried	قلق	A2	adj.	I was worried about the exam, but I passed.	كنت قلقاً بشأن الامتحان لكنني نجحت فيه.	2026-04-08 18:29:37.138276+00
667	wolf	ذئب	A2	n.	A wolf is a wild animal related to the dog.	الذئب حيوان بري مرتبط بالكلب.	2026-04-08 18:29:37.138276+00
668	wife	زوجة	A2	n.	The teacher introduced his wife at the school event.	قدّم المعلم زوجته في الحفل المدرسي.	2026-04-08 18:29:37.138276+00
669	whisper	يهمس	A2	v.	Please do not whisper during the exam.	من فضلك لا تهمس أثناء الامتحان.	2026-04-08 18:29:37.138276+00
670	whale	حوت	A2	n.	A blue whale is the largest animal on Earth.	الحوت الأزرق هو أكبر حيوان على الأرض.	2026-04-08 18:29:37.138276+00
671	wash	يغسل	A2	v.	Always wash your hands before eating.	اغسل يديك دائماً قبل تناول الطعام.	2026-04-08 18:29:37.138276+00
672	wallet	محفظة	A2	n.	He left his wallet on the bus this morning.	نسي محفظته في الحافلة هذا الصباح.	2026-04-08 18:29:37.138276+00
673	wake	يستيقظ	A2	v.	I wake up at six thirty every school day.	أستيقظ في الساعة السادسة والنصف كل يوم دراسي.	2026-04-08 18:29:37.138276+00
674	violin	كمان	A2	n.	She has been learning the violin for three years.	تتعلم العزف على الكمان منذ ثلاث سنوات.	2026-04-08 18:29:37.138276+00
676	vacation	إجازة	A2	n.	We travelled to Spain during the summer vacation.	سافرنا إلى إسبانيا خلال الإجازة الصيفية.	2026-04-08 18:29:37.138276+00
677	upstairs	في الطابق العلوي	A2	adv.	The science room is upstairs on the second floor.	غرفة العلوم في الطابق العلوي في الدور الثاني.	2026-04-08 18:29:37.138276+00
679	umbrella	مظلة	A2	n.	Take an umbrella — it looks like rain.	خذ مظلة — يبدو أنها ستمطر.	2026-04-08 18:29:37.138276+00
680	towel	منشفة	A2	n.	Dry your hands with the towel near the sink.	جفف يديك بالمنشفة بجانب الحوض.	2026-04-08 18:29:37.138276+00
681	torch	مصباح يدوي	A2	n.	She used a torch to find her shoes in the dark.	استخدمت مصباحاً يدويّاً لإيجاد حذائها في الظلام.	2026-04-08 18:29:37.138276+00
682	toothbrush	فرشاة أسنان	A2	n.	Replace your toothbrush every three months.	استبدلي فرشاة أسنانك كل ثلاثة أشهر.	2026-04-08 18:29:37.138276+00
683	tiger	نمر	A2	n.	A tiger is a large and powerful wild cat.	النمر هو قطة برية كبيرة وقوية.	2026-04-08 18:29:37.138276+00
684	thirsty	عطشان	A2	adj.	I was thirsty after running in the hot sun.	شعرت بالعطش بعد الركض تحت أشعة الشمس الحارة.	2026-04-08 18:29:37.138276+00
685	thin	رفيع	A2	adj.	Write your name in thin letters at the top.	اكتب اسمك بأحرف رفيعة في الأعلى.	2026-04-08 18:29:37.138276+00
686	thick	سميك	A2	adj.	The dictionary is a thick and heavy book.	القاموس كتاب سميك وثقيل.	2026-04-08 18:29:37.138276+00
687	telephone	هاتف	A2	n.	My grandmother called me on the telephone.	اتصلت بي جدتي عبر الهاتف.	2026-04-08 18:29:37.138276+00
688	television	تلفاز	A2	n.	We watched a documentary on television last night.	شاهدنا وثائقياً على التلفاز الليلة الماضية.	2026-04-08 18:29:37.138276+00
689	table tennis	كرة الطاولة	A2	n.	She won the table tennis competition at school.	فازت بمسابقة كرة الطاولة في المدرسة.	2026-04-08 18:29:37.138276+00
690	timetable	جدول زمني	A2	n.	Check the timetable to find your next lesson.	تحقق من الجدول الزمني لمعرفة درسك التالي.	2026-04-08 18:29:37.138276+00
691	tap	صنبور	A2	n.	Turn off the tap after washing your hands.	أغلق الصنبور بعد غسل يديك.	2026-04-08 18:29:37.138276+00
692	accept	يقبل	A2	v.	Please accept my sincere apology for the delay.	يرجى قبول اعتذاري الصادق عن التأخير.	2026-04-08 18:29:37.138276+00
693	account	حساب	A2	n.	I opened a savings account at the bank last week.	فتحت حساب توفير في البنك الأسبوع الماضي.	2026-04-08 18:29:37.138276+00
695	active	نشيط	A2	adj.	She leads an active lifestyle and exercises every day.	تعيش حياة نشيطة وتمارس الرياضة كل يوم.	2026-04-08 18:29:37.138276+00
696	activity	نشاط	A2	n.	Swimming is a healthy and enjoyable physical activity.	السباحة نشاط بدني صحي وممتع.	2026-04-08 18:29:37.138276+00
697	afford	يستطيع تحمل تكلفة	A2	v.	We cannot afford a new car at the moment.	لا نستطيع تحمل تكلفة سيارة جديدة في الوقت الحالي.	2026-04-08 18:29:37.138276+00
678	uncle	عم أو خال	A2	n.	My uncle taught me how to ride a bicycle.	علمني عمي كيفية ركوب الدراجة.	2026-04-08 18:29:37.138276+00
694	action	فعل	A2	n.	Quick action saved the child from further danger.	الإجراء السريع أنقذ الطفل من خطر أكبر.	2026-04-08 18:29:37.138276+00
698	allow	يسمح	A2	v.	Students are not allowed to use phones in class.	لا يُسمح للطلاب باستخدام الهواتف في الفصل.	2026-04-08 18:29:37.138276+00
700	available	متاح	A2	adj.	The doctor is available for appointments on Tuesday.	الطبيب متاح لحجز المواعيد يوم الثلاثاء.	2026-04-08 18:29:37.138276+00
701	basic	أساسي	A2	adj.	You need basic reading and writing skills for this job.	تحتاج إلى مهارات قراءة وكتابة أساسية لهذه الوظيفة.	2026-04-08 18:29:37.141509+00
702	beauty	جمال	A2	n.	The natural beauty of the landscape was truly stunning.	كان جمال المناظر الطبيعية مذهلاً حقاً.	2026-04-08 18:29:37.141509+00
704	care	يعتني	A2	v.	We must care for our environment for future generations.	يجب أن نعتني بيئتنا للأجيال القادمة.	2026-04-08 18:29:37.141509+00
705	chance	فرصة	A2	n.	Every student deserves a fair second chance to improve.	كل طالب يستحق فرصة ثانية عادلة للتحسن.	2026-04-08 18:29:37.141509+00
706	connect	يربط	A2	v.	The new bridge connects the two islands efficiently.	يربط الجسر الجديد الجزيرتين بكفاءة.	2026-04-08 18:29:37.141509+00
707	continue	يستمر	A2	v.	She plans to continue her studies at university next year.	تخطط لمتابعة دراستها في الجامعة العام القادم.	2026-04-08 18:29:37.141509+00
709	create	ينشئ	A2	v.	Technology helps us create innovative solutions to problems.	تساعدنا التكنولوجيا على إنشاء حلول مبتكرة للمشاكل.	2026-04-08 18:29:37.141509+00
710	daily	يومي	A2	adj.	Daily physical exercise significantly improves your health.	يحسن النشاط البدني اليومي صحتك بشكل كبير.	2026-04-08 18:29:37.141509+00
712	double	يتضاعف	A2	v.	Sales figures doubled during the last two financial years.	تضاعفت أرقام المبيعات خلال السنتين الماليتين الأخيرتين.	2026-04-08 18:29:37.141509+00
713	earn	يكسب	A2	v.	She earns an excellent salary working as an engineer.	تكسب راتباً ممتازاً من عملها كمهندسة.	2026-04-08 18:29:37.141509+00
715	event	حدث	A2	n.	The international sports event attracted thousands of visitors.	جذب الحدث الرياضي الدولي آلاف الزوار.	2026-04-08 18:29:37.141509+00
716	fact	حقيقة	A2	n.	It is an established fact that exercise improves health.	إنها حقيقة ثابتة أن التمرين يحسن الصحة.	2026-04-08 18:29:37.141509+00
718	famous	مشهور	A2	adj.	Paris is internationally famous for the Eiffel Tower.	باريس مشهورة عالمياً بسبب برج إيفل.	2026-04-08 18:29:37.141509+00
719	follow	يتبع	A2	v.	Always follow all instructions very carefully and precisely.	اتبع جميع التعليمات بعناية وبدقة دائماً.	2026-04-08 18:29:37.141509+00
721	govern	يحكم	A2	v.	The newly elected president governs the entire country.	الرئيس المنتخب حديثاً يحكم البلد بأكمله.	2026-04-08 18:29:37.141509+00
722	government	حكومة	A2	n.	The government recently introduced important new education policies.	أدخلت الحكومة مؤخراً سياسات تعليمية مهمة جديدة.	2026-04-08 18:29:37.141509+00
723	happen	يحدث	A2	v.	What exactly will happen if we fail to act now?	ماذا بالضبط سيحدث إذا فشلنا في اتخاذ إجراء الآن؟	2026-04-08 18:29:37.141509+00
725	huge	ضخم	A2	adj.	There is a huge and growing global demand for clean energy.	هناك طلب عالمي ضخم ومتزايد على الطاقة النظيفة.	2026-04-08 18:29:37.141509+00
726	human	إنساني	A2	adj.	Access to clean and safe water is a basic human right.	الحصول على المياه النظيفة والآمنة حق إنساني أساسي.	2026-04-08 18:29:37.141509+00
727	image	صورة	A2	n.	The image clearly shows a sharp rise in global temperatures.	تظهر الصورة بوضوح ارتفاعاً حاداً في درجات الحرارة العالمية.	2026-04-08 18:29:37.141509+00
728	important	مهم	A2	adj.	It is vitally important to read every question very carefully.	من الحيوي جداً أن تقرأ كل سؤال بعناية فائقة.	2026-04-08 18:29:37.141509+00
729	improve	يحسّن	A2	v.	Regular and consistent practice will greatly improve your writing.	الممارسة المنتظمة والمستمرة ستحسّن كتابتك بشكل كبير.	2026-04-08 18:29:37.141509+00
730	information	معلومات	A2	n.	The internet now provides access to enormous amounts of information.	يوفر الإنترنت الآن إمكانية الوصول إلى كميات ضخمة من المعلومات.	2026-04-08 18:29:37.141509+00
731	international	دولي	A2	adj.	IELTS is a globally recognised international English proficiency exam.	الـ IELTS هو امتحان إنجليزي دولي معترف به عالمياً.	2026-04-08 18:29:37.141509+00
732	join	ينضم	A2	v.	You are welcome to join the after-school English club.	أنت مرحب بك في الانضمام إلى نادي اللغة الإنجليزية بعد الدوام.	2026-04-08 18:29:37.141509+00
734	level	مستوى	A2	n.	Her overall English level has clearly improved enormously.	مستوى اللغة الإنجليزية العام لديها تحسّن بشكل واضح وضخم.	2026-04-08 18:29:37.141509+00
735	life	حياة	A2	n.	Modern city life can become very stressful for many people.	يمكن أن تصبح حياة المدينة الحديثة مرهقة جداً للعديد من الناس.	2026-04-08 18:29:37.141509+00
708	cost	تكلفة	A2	n.	The cost of living in the capital has risen sharply.	ارتفعت تكلفة المعيشة في العاصمة بشكل حاد.	2026-04-08 18:29:37.141509+00
711	design	يصمم	A2	v.	She designed a beautiful and functional new poster.	صممت ملصقاً جديداً جميلاً وعملياً.	2026-04-08 18:29:37.141509+00
714	education	تعليم	A2	n.	Quality education is widely recognised as a basic human right.	يعترف على نطاق واسع بأن التعليم الجيد هو حق أساسي من حقوق الإنسان.	2026-04-08 18:29:37.141509+00
717	fail	يفشل	A2	v.	Students who do not prepare adequately often fail exams.	الطلاب الذين لا يستعدون بشكل كافٍ غالباً ما يرسبون في الامتحانات.	2026-04-08 18:29:37.141509+00
720	form	يُشكِّل	A2	v.	Water can form solid ice at extremely low temperatures.	الماء يتكون إلى جليد صلب عند درجات حرارة منخفضة جداً.	2026-04-08 18:29:37.141509+00
724	history	تاريخ	A2	n.	History teaches us many important and valuable life lessons.	يعلمنا التاريخ العديد من الدروس الحياتية المهمة والقيمة.	2026-04-08 18:29:37.141509+00
733	lead	يقود	A2	v.	A consistently poor diet can lead to serious health problems.	النظام الغذائي السيء باستمرار يمكن أن يؤدي إلى مشاكل صحية خطيرة.	2026-04-08 18:29:37.141509+00
703	begin	يبدأ	A2	v.	The lesson will begin at exactly eight o'clock.	سيبدأ الدرس في تمام الساعة الثامنة.	2026-04-08 18:29:37.141509+00
736	local	محلي	A2	adj.	Local governments are largely responsible for waste management.	الحكومات المحلية مسؤولة إلى حد كبير عن إدارة النفايات.	2026-04-08 18:29:37.141509+00
737	lose	يفقد	A2	v.	Many valuable species are losing their habitat to deforestation.	تفقد العديد من الأنواع القيمة موطنها بسبب إزالة الغابات.	2026-04-08 18:29:37.141509+00
738	low	منخفض	A2	adj.	Low-income families often struggle to afford healthy and nutritious food.	تناضل الأسر منخفضة الدخل غالباً للحصول على غذاء صحي ومغذي.	2026-04-08 18:29:37.141509+00
739	main	رئيسي	A2	adj.	What is the single main idea of this entire passage?	ما هي الفكرة الرئيسية الوحيدة في هذا النص بأكمله؟	2026-04-08 18:29:37.141509+00
740	mean	يعني	A2	v.	What does this particular graph actually mean?	ماذا يعني هذا الرسم البياني بالفعل؟	2026-04-08 18:29:37.141509+00
741	modern	حديث	A2	adj.	Modern cities face many serious and complex environmental challenges.	المدن الحديثة تواجه العديد من التحديات البيئية الخطيرة والمعقدة.	2026-04-08 18:29:37.141509+00
742	normal	طبيعي	A2	adj.	It is completely normal to feel very nervous before a test.	من الطبيعي تماماً الشعور بالعصبية الشديدة قبل الاختبار.	2026-04-08 18:29:37.141509+00
743	offer	يقدم	A2	v.	The school offers free English language classes for beginners.	توفر المدرسة دروساً مجانية في اللغة الإنجليزية للمبتدئين.	2026-04-08 18:29:37.141509+00
744	opinion	رأي	A2	n.	In my personal opinion, education is the true key to success.	برأيي الشخصي، التعليم هو المفتاح الحقيقي للنجاح.	2026-04-08 18:29:37.141509+00
746	pay	يدفع	A2	v.	All employers have a legal duty to pay fair and equal wages.	على جميع أصحاب العمل واجب قانوني في دفع أجور عادلة.	2026-04-08 18:29:37.141509+00
748	possible	ممكن	A2	adj.	Is it truly possible to solve the current global energy crisis?	هل من الممكن فعلاً حل أزمة الطاقة العالمية الحالية؟	2026-04-08 18:29:37.141509+00
750	primary	أساسي	A2	adj.	The primary cause of most air pollution is burning fossil fuels.	السبب الأساسي لمعظم تلوث الهواء هو حرق الوقود الأحفوري.	2026-04-08 18:29:37.141509+00
751	problem	مشكلة	A2	n.	Severe traffic congestion is a serious problem in modern urban areas.	الاختناق المروري الشديد هو مشكلة جدية في المناطق الحضرية الحديثة.	2026-04-08 18:29:37.141509+00
752	product	منتج	A2	n.	The innovative new product was very popular with all consumers.	كان المنتج الجديد المبتكر شهيراً جداً لدى جميع المستهلكين.	2026-04-08 18:29:37.141509+00
754	rule	قاعدة	A2	n.	Always follow all exam rules carefully and without exception.	اتبع جميع قواعد الامتحان بعناية وبدون استثناء.	2026-04-08 18:29:37.141509+00
755	save	يوفر	A2	v.	Simply turning off unused lights helps save valuable energy.	إطفاء الأضواء غير المستخدمة يساعد ببساطة على توفير الطاقة الثمينة.	2026-04-08 18:29:37.141509+00
756	send	يرسل	A2	v.	Please send your complete application by email without delay.	يرجى إرسال طلبك الكامل عبر البريد الإلكتروني دون تأخير.	2026-04-08 18:29:37.141509+00
757	set	يضع	A2	v.	Set a clear and realistic goal before you start studying.	ضع هدفاً واضحاً وواقعياً قبل أن تبدأ الدراسة.	2026-04-08 18:29:37.141509+00
758	share	يشارك	A2	v.	Please share all your interesting ideas with your partner.	يرجى مشاركة جميع أفكارك المثيرة مع شريكك.	2026-04-08 18:29:37.141509+00
759	spend	ينفق	A2	v.	Young people now spend considerably more time on social media.	الشباب الآن ينفقون وقتاً أكثر بكثير على وسائل التواصل الاجتماعي.	2026-04-08 18:29:37.141509+00
760	stay	يبقى	A2	v.	Try to stay completely focused and calm during the exam.	حاول أن تبقى منركزاً تماماً وهادئاً أثناء الامتحان.	2026-04-08 18:29:37.141509+00
761	strong	قوي	A2	adj.	You need a strong and well-supported argument for your view.	تحتاج إلى حجة قوية ومدعومة جيداً لرأيك.	2026-04-08 18:29:37.141509+00
764	suggest	يقترح	A2	v.	I strongly suggest that you review your vocabulary every single day.	أقترح بشدة أن تراجع مفرداتك كل يوم.	2026-04-08 18:29:37.141509+00
766	teach	يعلم	A2	v.	Truly good teachers teach students not just facts but how to think.	المعلمون الحقيقيون الجيدون يعلمون الطلاب ليس فقط الحقائق بل كيفية التفكير.	2026-04-08 18:29:37.141509+00
770	traditional	تقليدي	A2	adj.	Traditional farming methods are gradually being replaced by modern ones.	يتم استبدال طرق الزراعة التقليدية تدريجياً بطرق حديثة.	2026-04-08 18:29:37.141509+00
749	prepare	يُعِد	A2	v.	Always prepare your comprehensive notes thoroughly before any lecture.	احضر ملاحظاتك الشاملة بعناية قبل أي محاضرة.	2026-04-08 18:29:37.141509+00
753	rise	يرتفع	A2	v.	Average global temperatures have clearly risen significantly over the century.	ارتفعت متوسط درجات الحرارة العالمية بشكل واضح وكبير على مدى القرن.	2026-04-08 18:29:37.141509+00
762	subject	موضوع	A2	n.	English is now a compulsory subject in most schools worldwide.	اللغة الإنجليزية الآن مادة إلزامية في معظم المدارس في جميع أنحاء العالم.	2026-04-08 18:29:37.141509+00
763	success	نجاح	A2	n.	Consistent hard work and determination always lead to real success.	العمل الجاد والمثابرة المستمرة تؤدي دائماً إلى النجاح الحقيقي.	2026-04-08 18:29:37.141509+00
765	survey	استطلاع	A2	n.	A large-scale survey found that 70 percent preferred online learning.	استطلاع واسع النطاق وجد أن 70 في المائة فضلوا التعلم عبر الإنترنت.	2026-04-08 18:29:37.141509+00
767	technology	تكنولوجيا	A2	n.	Digital technology has completely transformed how we all communicate.	التكنولوجيا الرقمية غيرت تماماً الطريقة التي نتواصل بها جميعاً.	2026-04-08 18:29:37.141509+00
768	topic	موضوع	A2	n.	Always choose a familiar topic that you know really well.	اختر دائماً موضوعاً مألوفاً تعرفه جيداً حقاً.	2026-04-08 18:29:37.141509+00
769	total	إجمالي	A2	n.	The total number of enrolled students increased to five hundred.	العدد الإجمالي للطلاب المسجلين زاد إلى خمسمائة.	2026-04-08 18:29:37.141509+00
771	travel	يسافر	A2	v.	Far more people travel internationally by plane than ever before.	عدد أكبر بكثير من الناس يسافرون دولياً بالطائرة أكثر من أي وقت مضى.	2026-04-08 18:29:37.141509+00
772	trend	الاتجاه	A2	n.	The graph shows a very clear and consistent upward trend.	يظهر الرسم البياني اتجاهاً تصاعدياً واضحاً وثابتاً جداً.	2026-04-08 18:29:37.141509+00
773	true	صحيح	A2	adj.	It is absolutely true that regular exercise significantly reduces stress.	من الصحيح تماماً أن التمرين المنتظم يقلل الإجهاد بشكل كبير.	2026-04-08 18:29:37.141509+00
774	type	النوع	A2	n.	What type of graph have you been asked to describe?	ما نوع الرسم البياني الذي طُلب منك وصفه؟	2026-04-08 18:29:37.141509+00
775	urban	حضري	A2	adj.	Urban areas around the world are growing at an unprecedented rate.	تنمو المناطق الحضرية حول العالم بمعدل غير مسبوق.	2026-04-08 18:29:37.141509+00
776	way	الطريقة	A2	n.	Try to find a consistently better way to express your ideas.	حاول إيجاد طريقة أفضل باستمرار للتعبير عن أفكارك.	2026-04-08 18:29:37.141509+00
777	world	العالم	A2	n.	Climate change is now widely recognised as a global world problem.	يُعترف الآن على نطاق واسع بتغير المناخ كمشكلة عالمية.	2026-04-08 18:29:37.141509+00
778	childhood	الطفولة	A2	n.	A positive and happy childhood has a lasting beneficial effect.	للطفولة الإيجابية والسعيدة تأثير طويل الأمد مفيد.	2026-04-08 18:29:37.141509+00
779	college	الكلية	A2	n.	She studied for two years at college before going to university.	درست سنتين في الكلية قبل الالتحاق بالجامعة.	2026-04-08 18:29:37.141509+00
780	comfortable	مريح	A2	adj.	Modern office spaces are designed to be both comfortable and productive.	تم تصميم مساحات المكاتب الحديثة لتكون مريحة وإنتاجية.	2026-04-08 18:29:37.141509+00
781	competition	المنافسة	A2	n.	There is very strong and increasing competition for university places.	هناك منافسة قوية جداً ومتزايدة للالتحاق بالجامعة.	2026-04-08 18:29:37.141509+00
782	crowded	مكتظ، مزدحم	A2	adj.	The commuter train was so crowded that many passengers had to stand.	كانت قطار المسافرين مكتظة جداً لدرجة أن العديد من الركاب اضطروا للوقوف.	2026-04-08 18:29:37.141509+00
783	danger	خطر	A2	n.	Many wild and endangered animals face the very real danger of extinction.	تواجه العديد من الحيوانات البرية والمهددة بالانقراض خطراً حقيقياً جداً من الانقراض.	2026-04-08 18:29:37.141509+00
784	decision	قرار	A2	n.	Making consistently good decisions always requires very careful thinking.	اتخاذ قرارات جيدة بشكل متسق يتطلب دائماً تفكيراً دقيقاً جداً.	2026-04-08 18:29:37.141509+00
785	depend	يعتمد على	A2	v.	Many rural communities depend entirely on farming for their basic income.	تعتمد العديد من المجتمعات الريفية بشكل كامل على الزراعة لدخلها الأساسي.	2026-04-08 18:29:37.141509+00
787	digital	رقمي، ديجيتال	A2	adj.	Strong digital skills are now absolutely essential in the modern workplace.	مهارات الحوسبة الرقمية ضرورية جداً الآن في بيئة العمل الحديثة.	2026-04-08 18:29:37.141509+00
788	discover	يكتشف	A2	v.	Scientists regularly discover exciting new species in remote tropical areas.	يكتشف العلماء باستمرار أنواعاً جديدة ومثيرة في المناطق الاستوائية النائية.	2026-04-08 18:29:37.141509+00
789	electricity	كهرباء	A2	n.	Wind-generated electricity is clean and completely sustainable.	الكهرباء المولدة من الرياح نظيفة وآمنة تماماً.	2026-04-08 18:29:37.141509+00
790	fair	عادل	A2	adj.	A genuinely fair education system gives every child equal opportunities.	نظام التعليم العادل حقاً يعطي كل طفل فرصاً متساوية.	2026-04-08 18:29:37.141509+00
792	healthy	صحي	A2	adj.	Maintaining a genuinely healthy lifestyle reduces the risk of many diseases.	الحفاظ على نمط حياة صحي حقيقي يقلل من خطر العديد من الأمراض.	2026-04-08 18:29:37.141509+00
793	heat	حرارة	A2	n.	Extreme and prolonged heat is dangerous for all people and wildlife.	الحرارة الشديدة والمستمرة خطيرة لجميع الناس والحياة البرية.	2026-04-08 18:29:37.141509+00
794	island	جزيرة	A2	n.	Small island nations face existential threats from rising sea levels.	الدول الجزرية الصغيرة تواجه تهديدات وجودية من ارتفاع مستويات البحار.	2026-04-08 18:29:37.141509+00
795	issue	قضية	A2	n.	Plastic waste is now a major and urgent global environmental issue.	النفايات البلاستيكية أصبحت الآن قضية بيئية عالمية كبرى وعاجلة.	2026-04-08 18:29:37.141509+00
796	knowledge	معرفة	A2	n.	A solid knowledge of academic grammar is essential for the IELTS exam.	معرفة قوية بقواعد اللغة الأكاديمية ضرورية لامتحان الآيلتس.	2026-04-08 18:29:37.141509+00
797	law	قانون	A2	n.	Environmental protection laws must be enforced much more strictly.	يجب تطبيق قوانين حماية البيئة بصرامة أكثر بكثير.	2026-04-08 18:29:37.141509+00
798	leader	زعيم	A2	n.	World leaders met to discuss and agree on urgent climate action.	التقى قادة العالم لمناقشة والاتفاق على إجراء مناخي عاجل.	2026-04-08 18:29:37.141509+00
799	loss	فقدان	A2	n.	The accelerating loss of global biodiversity is extremely alarming.	الفقدان المتسارع للتنوع البيولوجي العالمي مثير للقلق الشديد.	2026-04-08 18:29:37.141509+00
800	neighbourhood	حي سكني	A2	n.	Green spaces and parks improve the overall quality of a neighbourhood.	تحسن المساحات الخضراء والحدائق من الجودة الإجمالية للحي السكني.	2026-04-08 18:29:37.141509+00
801	planet	كوكب	A2	n.	We have a moral duty to protect our planet for future generations.	لدينا واجب أخلاقي لحماية كوكبنا للأجيال القادمة.	2026-04-08 18:29:37.144805+00
802	plastic	بلاستيك	A2	n.	The problem of single-use plastic waste is very serious and urgent.	مشكلة نفايات البلاستيك ذات الاستخدام الواحد خطيرة جدًا وعاجلة.	2026-04-08 18:29:37.144805+00
836	chef	طاهي	A2	n.	She trained as a chef after finishing school.	تدربت كطاهية بعد الانتهاء من الدراسة.	2026-04-08 18:29:37.144805+00
786	destination	وجهة، مقصد	A2	n.	Paris is consistently one of the world's most popular tourist destinations.	باريس هي من أشهر الوجهات السياحية العالمية بشكل مستمر.	2026-04-08 18:29:37.141509+00
803	policy	سياسة	A2	n.	Strong and enforceable environmental policies are now urgently needed.	السياسات البيئية القوية والقابلة للتنفيذ مطلوبة بشكل عاجل الآن.	2026-04-08 18:29:37.144805+00
804	pollution	تلوث	A2	n.	Air pollution is responsible for millions of premature deaths every year.	تلوث الهواء مسؤول عن ملايين الوفيات المبكرة كل عام.	2026-04-08 18:29:37.144805+00
805	positive	إيجابي	A2	adj.	Renewable energy has a very positive long-term effect on the environment.	الطاقة المتجددة لها تأثير إيجابي جدًا طويل الأجل على البيئة.	2026-04-08 18:29:37.144805+00
806	progress	تقدم	A2	n.	Great and significant progress has been made in reducing carbon emissions.	تم إحراز تقدم كبير وهام في تقليل انبعاثات الكربون.	2026-04-08 18:29:37.144805+00
807	proper	سليم	A2	adj.	Proper and responsible waste disposal is absolutely essential for public health.	معالجة النفايات السليمة والمسؤولة ضرورية تمامًا للصحة العامة.	2026-04-08 18:29:37.144805+00
808	report	تفيد/تؤكد	A2	v.	The important study reports a significant and sustained increase in emissions.	تفيد الدراسة المهمة عن زيادة كبيرة ومستمرة في الانبعاثات.	2026-04-08 18:29:37.144805+00
809	research	بحث	A2	n.	New and significant research confirms the clear link between diet and health.	يؤكد البحث الجديد والمهم الصلة الواضحة بين النظام الغذائي والصحة.	2026-04-08 18:29:37.144805+00
811	step	خطوة	A2	n.	The very first step is to significantly reduce your energy consumption.	الخطوة الأولى هي تقليل استهلاكك للطاقة بشكل كبير.	2026-04-08 18:29:37.144805+00
812	temperature	درجة حرارة	A2	n.	Average global temperatures have risen by over one degree Celsius.	ارتفعت درجات الحرارة العالمية بمعدل يزيد عن درجة واحدة مئوية.	2026-04-08 18:29:37.144805+00
813	university	جامعة	A2	n.	She successfully applied to and was accepted by three leading universities.	تقدمت بنجاح والتحقت بثلاث جامعات رائدة.	2026-04-08 18:29:37.144805+00
814	useful	مفيد	A2	adj.	A wide and varied vocabulary is useful in all four IELTS skills.	المفردات الواسعة والمتنوعة مفيدة في جميع مهارات الآيلتس الأربع.	2026-04-08 18:29:37.144805+00
815	without	بدون	A2	prep.	Without urgent and decisive action, climate change will continue to worsen.	بدون إجراء عاجل وحاسم، سيستمر تغير المناخ في التفاقم.	2026-04-08 18:29:37.144805+00
816	zero	صفر	A2	n.	The ambitious goal is to reach zero net carbon emissions by 2050.	الهدف الطموح هو الوصول إلى انبعاثات كربون صفرية بحلول عام 2050.	2026-04-08 18:29:37.144805+00
817	balance	توازن	A2	n.	A healthy lifestyle requires a careful balance of work and rest.	نمط حياة صحي يتطلب توازناً دقيقاً بين العمل والراحة.	2026-04-08 18:29:37.144805+00
823	agreement	اتفاق	A2	n.	International agreement on climate targets remains very difficult to achieve.	الاتفاق الدولي على أهداف المناخ يبقى صعباً جداً على تحقيقه.	2026-04-08 18:29:37.144805+00
824	article	مقالة	A2	n.	The article argues that technology alone cannot solve climate change.	تؤكد المقالة أن التكنولوجيا وحدها لا يمكنها حل أزمة المناخ.	2026-04-08 18:29:37.144805+00
825	cover	يغطي	A2	v.	The study covers a broad range of social and environmental indicators.	تغطي الدراسة مجموعة واسعة من المؤشرات الاجتماعية والبيئية.	2026-04-08 18:29:37.144805+00
829	phrase	عبارة	A2	n.	Use a variety of academic phrases to express contrast and comparison.	استخدم مجموعة متنوعة من العبارات الأكاديمية للتعبير عن التباين والمقارنة.	2026-04-08 18:29:37.144805+00
832	announcement	إعلان	A2	n.	The school made an announcement about the change of timetable.	أصدرت المدرسة إعلاناً حول تغيير الجدول الزمني.	2026-04-08 18:29:37.144805+00
833	apologise	يعتذر	A2	v.	She apologised to her classmate for forgetting the project file.	اعتذرت لزميلتها عن نسيان ملف المشروع.	2026-04-08 18:29:37.144805+00
834	appointment	موعد	A2	n.	He made an appointment to see the doctor on Monday.	حدد موعداً لرؤية الطبيب يوم الاثنين.	2026-04-08 18:29:37.144805+00
819	experiment	التجربة	A2	n.	The controlled experiment successfully proved the scientists' hypothesis.	أثبتت التجربة المضبوطة بنجاح فرضية العلماء.	2026-04-08 18:29:37.144805+00
826	inform	يُبلغ / يُخبر	A2	v.	All policy decisions should always be informed by the best available evidence.	يجب أن تستند جميع قرارات السياسة دائماً إلى أفضل الأدلة المتاحة.	2026-04-08 18:29:37.144805+00
827	introduce	يُقدِّم / يُدخِل	A2	v.	The government introduced important new regulations to limit plastic use.	أدخلت الحكومة لوائح جديدة مهمة لتقليل استخدام البلاستيك.	2026-04-08 18:29:37.144805+00
828	mention	يذكر	A2	v.	The essay should clearly mention both the advantages and disadvantages.	يجب أن تذكر المقالة بوضوح كلاً من المميزات والعيوب.	2026-04-08 18:29:37.144805+00
831	update	يُحدِّث	A2	v.	The government pledged to update its climate targets every five years.	تعهدت الحكومة بتحديث أهدافها المناخية كل خمس سنوات.	2026-04-08 18:29:37.144805+00
835	celebration	احتفال	A2	n.	The end-of-year celebration was enjoyed by all the students.	استمتع جميع الطلاب باحتفالية نهاية العام.	2026-04-08 18:29:37.144805+00
818	experience	يختبر / يعاني من	A2	v.	Many migrants genuinely experience difficulties when adjusting to a new country.	يعاني العديد من المهاجرين من صعوبات حقيقية عند التكيف مع مكان جديد.	2026-04-08 18:29:37.144805+00
840	argue	يجادل	B1	v.	Try not to argue with your classmates.	حاول أن لا تجادل مع زملائك في الفصل.	2026-04-08 18:29:37.144805+00
841	absent	غائب	B1	adj.	He was absent from class yesterday due to illness.	كان غائباً عن الفصل أمس بسبب المرض.	2026-04-08 18:29:37.144805+00
842	achieve	يحقق	B1	v.	Hard work and determination help you achieve your goals.	العمل الشاق والعزيمة تساعدك على تحقيق أهدافك.	2026-04-08 18:29:37.144805+00
843	affect	يؤثر على	B1	v.	Pollution can seriously affect your long-term health.	التلوث يمكن أن يؤثر بشدة على صحتك على المدى الطويل.	2026-04-08 18:29:37.144805+00
844	aim	الهدف	B1	n.	Her main aim is to become a qualified doctor.	هدفها الرئيسي أن تصبح طبيبة مؤهلة.	2026-04-08 18:29:37.144805+00
845	amount	كمية	B1	n.	A large amount of water was wasted last year.	تم إهدار كمية كبيرة من الماء العام الماضي.	2026-04-08 18:29:37.144805+00
846	ancient	قديم	B1	adj.	Egypt has many remarkable ancient monuments.	لدى مصر العديد من الآثار القديمة الرائعة.	2026-04-08 18:29:37.144805+00
847	annual	سنوي	B1	adj.	The annual report is published at the end of December.	يتم نشر التقرير السنوي في نهاية ديسمبر.	2026-04-08 18:29:37.144805+00
849	attempt	يحاول	B1	v.	She will attempt the difficult exam again next month.	ستحاول الامتحان الصعب مرة أخرى في الشهر القادم.	2026-04-08 18:29:37.144805+00
850	attend	يحضر	B1	v.	All students are required to attend every lecture.	يُطلب من جميع الطلاب حضور كل محاضرة.	2026-04-08 18:29:37.144805+00
851	attract	يجذب	B1	v.	The city attracts millions of tourists each year.	تجذب المدينة ملايين السياح كل عام.	2026-04-08 18:29:37.144805+00
852	average	متوسط	B1	adj.	The average summer temperature here is thirty-five degrees.	متوسط درجة الحرارة في الصيف هنا خمسة وثلاثون درجة.	2026-04-08 18:29:37.144805+00
853	avoid	يتجنب	B1	v.	Try to avoid eating too much sugar and processed food.	حاول أن تتجنب تناول الكثير من السكريات والأطعمة المصنعة.	2026-04-08 18:29:37.144805+00
854	aware	مدرك	B1	adj.	Are you fully aware of the potential risks involved?	هل أنت مدرك تماماً للمخاطر المحتملة المتضمنة؟	2026-04-08 18:29:37.144805+00
855	behaviour	السلوك	B1	n.	Good behaviour is always expected in the classroom.	يتوقع دائماً السلوك الحسن في الفصل الدراسي.	2026-04-08 18:29:37.144805+00
856	benefit	فائدة	B1	n.	Regular exercise has many important health benefits.	للتمارين المنتظمة فوائد صحية عديدة ومهمة.	2026-04-08 18:29:37.144805+00
858	calculate	يحسب	B1	v.	Can you calculate the total cost of the project?	هل يمكنك حساب التكلفة الإجمالية للمشروع؟	2026-04-08 18:29:37.144805+00
859	cause	يسبب	B1	v.	Air pollution can cause serious respiratory diseases.	تلوث الهواء يمكن أن يسبب أمراض تنفسية خطيرة.	2026-04-08 18:29:37.144805+00
861	character	شخصية	B1	n.	The main character in the novel is very brave.	الشخصية الرئيسية في الرواية شجاعة جداً.	2026-04-08 18:29:37.144805+00
862	choice	اختيار	B1	n.	You have a clear choice between two different options.	لديك اختيار واضح بين خيارين مختلفين.	2026-04-08 18:29:37.144805+00
863	citizen	مواطن	B1	n.	Every citizen has a duty to obey the law.	لكل مواطن واجب في الالتزام بالقانون.	2026-04-08 18:29:37.144805+00
864	clear	واضح	B1	adj.	The exam instructions were clear and easy to follow.	كانت تعليمات الامتحان واضحة وسهلة المتابعة.	2026-04-08 18:29:37.144805+00
865	common	شائع	B1	adj.	Influenza is a very common illness during the winter.	الإنفلونزا مرض شائع جداً خلال فصل الشتاء.	2026-04-08 18:29:37.144805+00
866	community	مجتمع	B1	n.	The local community organised a successful clean-up event.	نظم المجتمع المحلي حدثاً ناجحاً لتنظيف البيئة.	2026-04-08 18:29:37.144805+00
867	compare	يقارن	B1	v.	Compare the two graphs carefully before writing your answer.	قارن بين الرسمين البيانيين بعناية قبل كتابة إجابتك.	2026-04-08 18:29:37.144805+00
868	concern	قلق	B1	n.	Air pollution is a major global environmental concern.	تلوث الهواء هو قلق بيئي عالمي رئيسي.	2026-04-08 18:29:37.144805+00
869	condition	حالة	B1	n.	The road conditions were extremely dangerous last night.	كانت أحوال الطريق خطيرة جداً في الليلة الماضية.	2026-04-08 18:29:37.144805+00
870	consider	يأخذ في الاعتبار	B1	v.	Always consider all your options before making a decision.	خذ جميع خياراتك في الاعتبار دائماً قبل اتخاذ قرار.	2026-04-08 18:29:37.144805+00
871	contribute	يساهم	B1	v.	Everyone can contribute positively to a better society.	يمكن للجميع أن يساهموا بشكل إيجابي في بناء مجتمع أفضل.	2026-04-08 18:29:37.144805+00
873	culture	الثقافة	B1	n.	Every culture has its own unique traditions and customs.	لكل ثقافة تقاليدها وعاداتها الفريدة الخاصة بها.	2026-04-08 18:29:37.144805+00
874	current	الحالي	B1	adj.	What is the current total population of the city?	ما هو إجمالي السكان الحالي للمدينة؟	2026-04-08 18:29:37.144805+00
875	damage	يضر	B1	v.	The heavy rain badly damaged many homes in the town.	ألحقت الأمطار الغزيرة أضراراً كبيرة بالعديد من المنازل في البلدة.	2026-04-08 18:29:37.144805+00
848	apply	يطبّق	B1	v.	You should apply for the scholarship before the deadline.	يجب أن تتقدم بطلب للحصول على المنحة قبل الموعد النهائي.	2026-04-08 18:29:37.144805+00
857	border	حدّ	B1	n.	They crossed the international border just after midnight.	عبروا الحدود الدولية بعد منتصف الليل مباشرة.	2026-04-08 18:29:37.144805+00
860	certain	معين	B1	adj.	I am certain that her answer is completely correct.	أنا متأكد تماماً من أن إجابتها صحيحة تماماً.	2026-04-08 18:29:37.144805+00
872	control	يتحكم في	B1	v.	Governments try to control levels of harmful air pollution.	تحاول الحكومات التحكم في مستويات تلوث الهواء الضار.	2026-04-08 18:29:37.144805+00
838	according	وفقاً لـ / حسب	A2	adv.	According to recent research, regular reading improves writing skills significantly over time.	وفقاً للبحث الحديث، القراءة المنتظمة تحسن مهارات الكتابة	2026-04-08 18:29:37.144805+00
876	data	البيانات	B1	n.	The data clearly shows a significant upward trend.	تظهر البيانات بوضوح اتجاهاً صعودياً كبيراً.	2026-04-08 18:29:37.144805+00
877	decrease	ينخفض	B1	v.	The number of wild birds has decreased in recent years.	انخفض عدد الطيور البرية في السنوات الأخيرة.	2026-04-08 18:29:37.144805+00
878	demand	الطلب	B1	n.	There is a very high demand for skilled workers now.	هناك طلب كبير جداً على العمال المهرة في الوقت الحالي.	2026-04-08 18:29:37.144805+00
880	difference	الفرق	B1	n.	What is the main difference between the two charts?	ما هو الفرق الرئيسي بين الرسمين البيانيين؟	2026-04-08 18:29:37.144805+00
881	direct	مباشر	B1	adj.	There is a clear direct link between diet and health.	هناك علاقة مباشرة واضحة بين النظام الغذائي والصحة.	2026-04-08 18:29:37.144805+00
883	distance	المسافة	B1	n.	The distance between the two cities is exactly 400 kilometres.	المسافة بين المدينتين هي بالضبط 400 كيلومتر.	2026-04-08 18:29:37.144805+00
884	document	الوثيقة	B1	n.	Please sign the official document before you leave.	يرجى التوقيع على الوثيقة الرسمية قبل مغادرتك.	2026-04-08 18:29:37.144805+00
885	economy	الاقتصاد	B1	n.	The national economy grew by three percent last year.	نما الاقتصاد الوطني بنسبة ثلاثة بالمائة العام الماضي.	2026-04-08 18:29:37.144805+00
886	effect	التأثير	B1	n.	Regular exercise has a very positive effect on the mind.	للنشاط البدني المنتظم تأثير إيجابي جداً على العقل.	2026-04-08 18:29:37.144805+00
887	effort	الجهد	B1	n.	Real and consistent effort is always required for success.	يتطلب النجاق دائماً جهداً حقيقياً ومستمراً.	2026-04-08 18:29:37.144805+00
888	election	الانتخابات	B1	n.	The election results will be officially announced tonight.	ستعلن نتائج الانتخابات رسمياً الليلة.	2026-04-08 18:29:37.144805+00
889	element	العنصر	B1	n.	Water is an essential element for all forms of life.	الماء عنصر أساسي لجميع أشكال الحياة.	2026-04-08 18:29:37.144805+00
890	energy	الطاقة	B1	n.	Solar energy is a clean and completely renewable source.	الطاقة الشمسية هي مصدر نظيف وقابل للتجدد تماماً.	2026-04-08 18:29:37.144805+00
891	environment	البيئة	B1	n.	We must protect the environment for all future generations.	يجب علينا حماية البيئة من أجل جميع الأجيال القادمة.	2026-04-08 18:29:37.144805+00
892	essential	ضروري	B1	adj.	Clean water is essential for the survival of all life.	المياه النظيفة ضرورية لبقاء جميع الكائنات الحية.	2026-04-08 18:29:37.144805+00
893	evidence	دليل	B1	n.	The evidence clearly and strongly supports the conclusion.	الدليل يدعم بوضوح وبقوة الخلاصة النهائية.	2026-04-08 18:29:37.144805+00
894	exist	يوجد	B1	v.	Many critically endangered species still exist today.	العديد من الأنواع المهددة بالانقراض لا تزال موجودة اليوم.	2026-04-08 18:29:37.144805+00
895	factor	عامل	B1	n.	A balanced diet is an important factor in good health.	النظام الغذائي المتوازن عامل مهم في الصحة الجيدة.	2026-04-08 18:29:37.144805+00
896	focus	يركز	B1	v.	Please focus on the main idea of the passage.	يرجى التركيز على الفكرة الرئيسية للنص.	2026-04-08 18:29:37.144805+00
897	global	عالمي	B1	adj.	Climate change is one of the most serious global problems.	تغير المناخ هو واحد من أخطر المشاكل العالمية.	2026-04-08 18:29:37.144805+00
898	growth	نمو	B1	n.	National economic growth slowed down considerably last year.	تباطأ النمو الاقتصادي الوطني بشكل كبير في السنة الماضية.	2026-04-08 18:29:37.144805+00
899	impact	تأثير	B1	n.	Technology has had a huge impact on daily modern life.	للتكنولوجيا تأثير ضخم على الحياة اليومية الحديثة.	2026-04-08 18:29:37.144805+00
900	include	يتضمن	B1	v.	Your formal report should always include a clear conclusion.	يجب أن يتضمن تقريرك الرسمي دائماً خاتمة واضحة.	2026-04-08 18:29:37.144805+00
901	increase	يزيد	B1	v.	The number of cars on the road increased by 20 percent.	زاد عدد السيارات على الطريق بنسبة 20 بالمائة.	2026-04-08 18:29:37.149545+00
902	industry	الصناعة	B1	n.	The international tourism industry is growing rapidly worldwide.	تنمو صناعة السياحة الدولية بسرعة في جميع أنحاء العالم.	2026-04-08 18:29:37.149545+00
903	involve	يتضمن	B1	v.	The ambitious project will involve a great deal of research.	سيتضمن المشروع الطموح قدراً كبيراً من البحث.	2026-04-08 18:29:37.149545+00
904	limit	يحد	B1	v.	We urgently need to limit our use of fossil fuels.	نحتاج بشكل عاجل إلى الحد من استخدامنا للوقود الأحفوري.	2026-04-08 18:29:37.149545+00
906	manage	يدير	B1	v.	It is genuinely difficult to manage your time well during exams.	من الصعب فعلاً إدارة وقتك بشكل جيد أثناء الامتحانات.	2026-04-08 18:29:37.149545+00
907	measure	يقيس	B1	v.	Scientists carefully measure temperature changes in degrees Celsius.	يقيس العلماء تغيرات درجة الحرارة بعناية بالدرجات المئوية.	2026-04-08 18:29:37.149545+00
908	method	طريقة	B1	n.	This is a reliable and proven method for testing water quality.	هذه طريقة موثوقة وثابتة لاختبار جودة المياه.	2026-04-08 18:29:37.149545+00
909	natural	طبيعي	B1	adj.	Major natural disasters can completely destroy entire communities.	الكوارث الطبيعية الكبرى يمكن أن تدمر المجتمعات بأكملها.	2026-04-08 18:29:37.149545+00
910	nature	طبيعة	B1	n.	Humans absolutely must learn to live in harmony with nature.	يجب على الإنسان أن يتعلم العيش في انسجام مع الطبيعة.	2026-04-08 18:29:37.149545+00
911	necessary	ضروري	B1	adj.	Is it really necessary to learn all the grammar rules?	هل من الضروري فعلاً تعلم جميع قواعد النحو؟	2026-04-08 18:29:37.149545+00
912	notice	يلاحظ	B1	v.	Did you clearly notice the sharp increase in the graph in 2010?	هل لاحظت الزيادة الحادة في الرسم البياني في عام 2010؟	2026-04-08 18:29:37.149545+00
1011	paragraph	فقرة	B1	n.	Always begin each paragraph with a very clear topic sentence.	ابدأ دائمًا كل فقرة بجملة موضوع واضحة جدًا.	2026-04-08 18:29:37.153092+00
882	discuss	يناقش	B1	v.	Let us discuss this important topic in small groups.	دعونا نناقش هذا الموضوع المهم في مجموعات صغيرة.	2026-04-08 18:29:37.144805+00
905	major	رئيسي	B1	adj.	Air pollution is now a major public health risk.	تلوث الهواء أصبح الآن خطراً صحياً عاماً كبيراً.	2026-04-08 18:29:37.149545+00
913	period	فترة	B1	n.	Over a ten-year period, average temperatures rose steadily worldwide.	على مدى فترة عشر سنوات، ارتفعت متوسط درجات الحرارة بشكل مستمر عالمياً.	2026-04-08 18:29:37.149545+00
915	prevent	يمنع	B1	v.	Mass vaccination campaigns help prevent many serious infectious diseases.	حملات التطعيم الجماعية تساعد في منع العديد من الأمراض المعدية الخطيرة.	2026-04-08 18:29:37.149545+00
916	produce	ينتج	B1	v.	Large factories regularly produce enormous quantities of industrial waste.	تنتج المصانع الكبيرة بانتظام كميات ضخمة جداً من النفايات الصناعية.	2026-04-08 18:29:37.149545+00
917	protect	يحمي	B1	v.	Governments have a duty to protect all remaining natural habitats.	للحكومات واجب حماية جميع الموارد الطبيعية المتبقية.	2026-04-08 18:29:37.149545+00
918	provide	يوفر	B1	v.	Public libraries provide completely free access to books and knowledge.	توفر المكتبات العامة إمكانية وصول مجانية تماماً إلى الكتب والمعرفة.	2026-04-08 18:29:37.149545+00
919	public	عام	B1	adj.	Efficient public transport systems reduce traffic and road congestion.	تقلل أنظمة النقل العام الفعالة من الاختناقات المرورية.	2026-04-08 18:29:37.149545+00
921	quality	جودة	B1	n.	The overall quality of air in cities has noticeably declined.	انخفضت جودة الهواء العامة في المدن بشكل ملحوظ.	2026-04-08 18:29:37.149545+00
922	raise	يرفع	B1	v.	The government has announced plans to raise the minimum wage.	أعلنت الحكومة عن خطط لرفع الحد الأدنى للأجور.	2026-04-08 18:29:37.149545+00
923	rate	معدل	B1	n.	The global birth rate has fallen in many developed countries.	انخفض معدل المواليد العالمي في العديد من الدول المتقدمة.	2026-04-08 18:29:37.149545+00
924	reach	يصل	B1	v.	Temperatures may reach record high levels again this coming summer.	قد تصل درجات الحرارة إلى مستويات قياسية جديدة في الصيف القادم.	2026-04-08 18:29:37.149545+00
925	reason	سبب	B1	n.	Always give a clear and relevant reason for your answer.	قدم دائماً سبباً واضحاً وذا صلة لإجابتك.	2026-04-08 18:29:37.149545+00
926	reduce	يقلل	B1	v.	We urgently need to dramatically reduce our plastic waste.	نحتاج بشكل عاجل إلى تقليل نفايات البلاستيك بشكل جذري.	2026-04-08 18:29:37.149545+00
927	region	منطقة	B1	n.	The northern region receives extremely little rainfall annually.	تتلقى المنطقة الشمالية كمية أمطار قليلة جداً سنوياً.	2026-04-08 18:29:37.149545+00
928	regular	منتظم	B1	adj.	Regular physical exercise genuinely improves both body and mind.	التمرين البدني المنتظم يحسن فعلاً الصحة البدنية والعقلية.	2026-04-08 18:29:37.149545+00
929	relate	يتعلق	B1	v.	This particular graph relates directly to global population growth.	يتعلق هذا الرسم البياني بشكل مباشر بنمو السكان العالمي.	2026-04-08 18:29:37.149545+00
930	require	يتطلب	B1	v.	IELTS Writing Task 1 requires a minimum of 150 words.	يتطلب المهمة الأولى في كتابة IELTS حداً أدنى من 150 كلمة.	2026-04-08 18:29:37.149545+00
931	result	نتيجة	B1	n.	The direct result of a consistently poor diet is poor health.	النتيجة المباشرة لنظام غذائي سيء باستمرار هي سوء الصحة.	2026-04-08 18:29:37.149545+00
932	role	دور	B1	n.	Education plays a truly vital role in national development.	تلعب التعليم دوراً حيوياً حقاً في التنمية الوطنية.	2026-04-08 18:29:37.149545+00
933	section	قسم	B1	n.	Read every single section of the text before answering.	اقرأ كل قسم من النص قبل الإجابة على الأسئلة.	2026-04-08 18:29:37.149545+00
936	skill	مهارة	B1	n.	Good academic writing is a key skill for all IELTS candidates.	الكتابة الأكاديمية الجيدة هي مهارة أساسية لجميع متقدمي اختبار IELTS.	2026-04-08 18:29:37.149545+00
939	source	مصدر	B1	n.	Sunlight is a clean and completely natural source of energy.	أشعة الشمس هي مصدر نظيف وطبيعي تماماً للطاقة.	2026-04-08 18:29:37.149545+00
940	state	ينص	B1	v.	Clearly state the main idea of your essay in the first sentence.	اذكر بوضوح الفكرة الرئيسية لمقالتك في الجملة الأولى.	2026-04-08 18:29:37.149545+00
942	support	يدعم	B1	v.	All evidence presented must clearly support your central argument.	جميع الأدلة المقدمة يجب أن تدعم حجتك الرئيسية بوضوح.	2026-04-08 18:29:37.149545+00
945	view	وجهة النظر	B1	n.	In my personal view, governments must invest more in clean energy.	في رأيي الشخصي، يجب على الحكومات أن تستثمر أكثر في الطاقة النظيفة.	2026-04-08 18:29:37.149545+00
920	purpose	هدف	B1	n.	The clear purpose of this graph is to show long-term trends.	الهدف الواضح من هذا الرسم البياني هو إظهار الاتجاهات طويلة الأجل.	2026-04-08 18:29:37.149545+00
934	serious	جدي، خطير	B1	adj.	Air pollution remains a very serious public health issue globally.	لا تزال تلوث الهواء تمثل مشكلة صحية عامة خطيرة جداً عالمياً.	2026-04-08 18:29:37.149545+00
935	situation	وضع	B1	n.	The current global environmental situation is getting steadily worse.	تتدهور الحالة البيئية العالمية الحالية بشكل متدرج.	2026-04-08 18:29:37.149545+00
937	society	مجتمع	B1	n.	Quality education benefits the entire fabric of our society.	التعليم الجيد يفيد نسيج المجتمع بأكمله.	2026-04-08 18:29:37.149545+00
938	solve	يحل	B1	v.	We urgently need to solve the serious problem of plastic waste.	نحتاج بشكل عاجل إلى حل مشكلة النفايات البلاستيكية الخطيرة.	2026-04-08 18:29:37.149545+00
941	structure	هيكل	B1	n.	A well-written essay always has a very clear overall structure.	المقالة المكتوبة بشكل جيد لديها دائماً هيكل عام واضح جداً.	2026-04-08 18:29:37.149545+00
943	system	نظام	B1	n.	The national education system urgently needs significant reform.	نظام التعليم الوطني يحتاج بشكل عاجل إلى إصلاح كبير.	2026-04-08 18:29:37.149545+00
944	value	قيمة	B1	n.	Education has enormous and lasting value for all of society.	التعليم له قيمة ضخمة ودائمة لكل المجتمع.	2026-04-08 18:29:37.149545+00
946	waste	نفايات	B1	n.	Industrial waste is widely recognised as a major source of pollution.	تُعترف النفايات الصناعية على نطاق واسع كمصدر رئيسي للتلوث.	2026-04-08 18:29:37.149545+00
1943	false	زائف، كاذب	A2	adj.	The statement turned out to be completely false.	اتضح أن البيان كان خاطئاً تماماً.	2026-04-08 18:29:37.188719+00
947	affordable	ميسور التكلفة	B1	adj.	Finding truly affordable housing is a growing problem in big cities.	إيجاد سكن ميسور التكلفة حقاً يصبح مشكلة متزايدة في المدن الكبرى.	2026-04-08 18:29:37.149545+00
950	appropriate	مناسب	B1	adj.	Always use appropriate academic vocabulary in your formal writing.	استخدم دائماً مفردات أكاديمية مناسبة في كتابتك الرسمية.	2026-04-08 18:29:37.149545+00
954	capable	قادر	B1	adj.	Every student is truly capable of passing with thorough preparation.	كل طالب قادر حقاً على النجاح مع التحضير الشامل.	2026-04-08 18:29:37.149545+00
955	career	مهنة	B1	n.	She has decided to pursue a career in environmental science.	قررت متابعة مهنة في العلوم البيئية.	2026-04-08 18:29:37.149545+00
958	combine	يجمع	B1	v.	You can combine regular exercise with a consistently healthy diet.	يمكنك جمع التمرينات المنتظمة مع نظام غذائي صحي متسق.	2026-04-08 18:29:37.149545+00
960	confident	واثق	B1	adj.	Confident and articulate speakers communicate far more effectively.	المتحدثون الواثقون والمفصحون يتواصلون بفعالية أكبر بكثير.	2026-04-08 18:29:37.149545+00
962	convenient	مناسب	B1	adj.	Online shopping has become extremely convenient for all busy people.	أصبح التسوق عبر الإنترنت مناسباً جداً لكل الأشخاص المشغولين.	2026-04-08 18:29:37.149545+00
964	creative	مبدع، خلاق	B1	adj.	Creative and original thinking is essential for solving complex problems.	التفكير المبدع والأصلي ضروري جداً لحل المشاكل المعقدة.	2026-04-08 18:29:37.149545+00
965	crop	محصول	B1	n.	Valuable crops are severely damaged by prolonged drought and extreme heat.	المحاصيل القيمة تتعرض لأضرار شديدة بسبب الجفاف الطويل والحرارة الشديدة.	2026-04-08 18:29:37.149545+00
966	debate	نقاش، جدل	B1	n.	There is a major ongoing public debate about the use of nuclear energy.	يوجد نقاش عام رئيسي مستمر حول استخدام الطاقة النووية.	2026-04-08 18:29:37.149545+00
967	diet	نظام غذائي، حمية	B1	n.	A healthy and balanced diet significantly reduces the risk of heart disease.	النظام الغذائي الصحي والمتوازن يقلل بشكل كبير من خطر أمراض القلب.	2026-04-08 18:29:37.149545+00
969	disease	مرض	B1	n.	Heart disease remains one of the leading causes of death globally.	أمراض القلب لا تزال من الأسباب الرئيسية للوفيات عالمياً.	2026-04-08 18:29:37.149545+00
970	domestic	محلي، داخلي	B1	adj.	Total domestic energy consumption has increased significantly in recent years.	زاد الاستهلاك المحلي للطاقة بشكل كبير في السنوات الأخيرة.	2026-04-08 18:29:37.149545+00
972	effective	فعال	B1	adj.	Regular vocabulary revision is an extremely effective study technique.	مراجعة المفردات المنتظمة تقنية دراسية فعالة جداً.	2026-04-08 18:29:37.149545+00
973	elderly	مسن، كبير السن	B1	adj.	Elderly people often benefit most from strong community support networks.	يستفيد كبار السن غالباً كثيراً من شبكات الدعم المجتمعي القوية.	2026-04-08 18:29:37.149545+00
974	employment	التوظيف، العمالة	B1	n.	Employment levels tend to rise consistently when the wider economy grows.	مستويات التوظيف تميل إلى الارتفاع بشكل متسق عندما ينمو الاقتصاد.	2026-04-08 18:29:37.149545+00
975	encourage	يشجع	B1	v.	All teachers should actively encourage their students to ask questions.	يجب على جميع المعلمين أن يشجعوا طلابهم بنشاط على طرح الأسئلة.	2026-04-08 18:29:37.149545+00
976	endangered	مهدد بالانقراض	B1	adj.	Many precious species are now endangered primarily due to habitat loss.	العديد من الأنواع الثمينة الآن مهددة بالانقراض بسبب فقدان الموائل.	2026-04-08 18:29:37.149545+00
977	expert	خبير	B1	n.	Leading climate experts agree that urgent and immediate action is needed.	يتفق خبراء المناخ البارزون على أن هناك حاجة ماسة لإجراء فوري.	2026-04-08 18:29:37.149545+00
978	export	يصدر	B1	v.	The country currently exports very large quantities of oil and natural gas.	تصدر الدولة حالياً كميات كبيرة جداً من النفط والغاز الطبيعي.	2026-04-08 18:29:37.149545+00
949	ambition	طموح	B1	n.	Her personal ambition is to work for a major international organisation.	طموحها الشخصي هو العمل في منظمة دولية كبرى.	2026-04-08 18:29:37.149545+00
952	attitude	موقف	B1	n.	A consistently positive attitude makes language learning significantly easier.	الموقف الإيجابي المتسق يجعل تعلم اللغة أسهل بكثير.	2026-04-08 18:29:37.149545+00
953	budget	ميزانية	B1	n.	The government significantly increased the national education budget this year.	زادت الحكومة ميزانية التعليم الوطنية بشكل كبير هذا العام.	2026-04-08 18:29:37.149545+00
956	chemical	مادة كيميائية	B1	n.	Some industrial chemicals can be extremely harmful to the environment.	بعض المواد الكيماوية الصناعية يمكن أن تكون ضارة جداً بالبيئة.	2026-04-08 18:29:37.149545+00
957	climate	مناخ	B1	n.	The climate in tropical regions is consistently hot and humid.	المناخ في المناطق الاستوائية حار ورطب باستمرار.	2026-04-08 18:29:37.149545+00
959	conclusion	خلاصة، استنتاج	B1	n.	The essay must end with a clear and well-reasoned conclusion.	يجب أن ينتهي المقال بخلاصة واضحة ومنطقية.	2026-04-08 18:29:37.149545+00
961	conservation	حفاظ	B1	n.	Active conservation of natural habitats is absolutely vital for wildlife.	الحفاظ الفعال على الموائل الطبيعية ضروري تماماً للحياة البرية.	2026-04-08 18:29:37.149545+00
963	cooperation	تعاون	B1	n.	International cooperation is urgently needed to effectively tackle pollution.	يُحتاج إلى التعاون الدولي بشكل عاجل لمعالجة التلوث بفعالية.	2026-04-08 18:29:37.149545+00
968	disadvantage	عيب، مساوئ	B1	n.	A major disadvantage of city life is the constant noise and pollution.	من أهم عيوب الحياة في المدينة الضجيج والتلوث المستمران.	2026-04-08 18:29:37.149545+00
951	atmosphere	غلاف جوي	B1	n.	The Earth's atmosphere is warming at an alarming and unprecedented rate.	يرتفع الغلاف الجوي للأرض بمعدل مثير للقلق وغير مسبوق.	2026-04-08 18:29:37.149545+00
979	extreme	متطرف، شديد	B1	adj.	Extreme and unpredictable weather events are becoming more frequent.	أحداث الطقس المتطرفة وغير المتوقعة تصبح أكثر تكراراً.	2026-04-08 18:29:37.149545+00
980	familiar	معتاد على، ملم بـ	B1	adj.	Students should become fully familiar with all IELTS task types.	يجب أن يصبح الطلاب ملمين تماماً بجميع أنواع مهام الآيلتس.	2026-04-08 18:29:37.149545+00
981	figure	رقم، شكل، بيان	B1	n.	The figure clearly shows a very sharp rise between 2010 and 2020.	يوضح الشكل بياني ارتفاعاً حاداً جداً بين عامي 2010 و 2020.	2026-04-08 18:29:37.149545+00
982	flexible	مرن	B1	adj.	Flexible working hours suit many employees considerably better.	ساعات العمل المرنة تناسب الموظفين بشكل أفضل بكثير.	2026-04-08 18:29:37.149545+00
983	flood	فيضان	B1	n.	Severe flooding caused very widespread damage to farmland and homes.	تسبب الفيضانات الشديدة أضراراً واسعة النطاق للأراضي الزراعية والمنازل.	2026-04-08 18:29:37.149545+00
984	formal	رسمي	B1	adj.	IELTS academic writing always requires a consistently formal style.	كتابة الآيلتس الأكاديمية تتطلب دائماً أسلوباً رسمياً متسقاً.	2026-04-08 18:29:37.149545+00
985	fuel	وقود	B1	n.	Burning fossil fuels is the main cause of greenhouse gas emissions.	حرق الوقود الأحفوري هو السبب الرئيسي لانبعاثات غازات الاحتباس الحراري.	2026-04-08 18:29:37.149545+00
986	fund	تمويل	B1	v.	The government plans to fund important new environmental research projects.	تخطط الحكومة لتمويل مشاريع بحثية بيئية جديدة مهمة.	2026-04-08 18:29:37.149545+00
987	gap	فجوة	B1	n.	The growing gap between rich and poor nations is deeply concerning.	الفجوة المتزايدة بين الدول الغنية والفقيرة مثيرة للقلق البالغ.	2026-04-08 18:29:37.149545+00
988	generation	جيل	B1	n.	Each new generation faces its own unique set of environmental challenges.	كل جيل جديد يواجه مجموعة فريدة خاصة به من التحديات البيئية.	2026-04-08 18:29:37.149545+00
989	gradually	تدريجياً	B1	adv.	Global average temperatures are gradually but steadily rising every decade.	درجات الحرارة العالمية العالمية ترتفع تدريجياً لكن بثبات كل عقد.	2026-04-08 18:29:37.149545+00
991	harvest	حصاد	B1	n.	A consistently poor harvest inevitably leads to serious food shortages.	الحصاد الضعيف المتكرر يؤدي حتماً إلى نقص غذائي خطير.	2026-04-08 18:29:37.149545+00
993	housing	إسكان	B1	n.	Truly affordable housing is extremely difficult to find in large cities.	الإسكان الحقيقي الميسور التكلفة يصعب جداً العثور عليه في المدن الكبرى.	2026-04-08 18:29:37.149545+00
994	hunger	جوع	B1	n.	Hunger continues to affect many millions of people in developing countries.	الجوع يستمر في التأثير على ملايين الأشخاص في الدول النامية.	2026-04-08 18:29:37.149545+00
996	income	دخل	B1	n.	Low-income families consistently struggle to access quality education.	العائلات ذات الدخل المنخفض تكافح باستمرار للوصول إلى تعليم جيد.	2026-04-08 18:29:37.149545+00
997	independent	مستقل	B1	adj.	Strong independent research skills are highly valued at university level.	مهارات البحث المستقل القوية تحظى بقيمة عالية على مستوى الجامعة.	2026-04-08 18:29:37.149545+00
998	individual	فرد	B1	n.	Every individual citizen can make a real difference to the environment.	كل فرد مواطن يمكنه أن يحدث فرقاً حقيقياً للبيئة.	2026-04-08 18:29:37.149545+00
999	leisure	وقت فراغ	B1	n.	People in developed countries generally have more personal leisure time.	الأشخاص في الدول المتقدمة لديهم عموماً وقت فراغ شخصي أكثر.	2026-04-08 18:29:37.149545+00
1000	location	موقع	B1	n.	The precise location of the school significantly affects student performance.	يؤثر الموقع الدقيق للمدرسة بشكل كبير على أداء الطلاب.	2026-04-08 18:29:37.149545+00
1001	material	مادة	B1	n.	Using recyclable materials helps significantly reduce landfill waste.	استخدام المواد القابلة لإعادة التدوير يساعد بشكل كبير في تقليل النفايات.	2026-04-08 18:29:37.153092+00
1002	media	وسائل إعلام	B1	n.	The media plays a very important role in raising public awareness.	تلعب وسائل الإعلام دوراً مهماً جداً في رفع الوعي العام.	2026-04-08 18:29:37.153092+00
1006	movement	حركة	B1	n.	The global environmental movement has grown enormously in recent years.	الحركة البيئية العالمية نمت بشكل هائل في السنوات الأخيرة.	2026-04-08 18:29:37.153092+00
1007	negative	سلبي	B1	adj.	Widespread pollution has a profoundly negative impact on public health.	التلوث الواسع النطاق له تأثير سلبي عميق على الصحة العامة.	2026-04-08 18:29:37.153092+00
1008	network	شبكة	B1	n.	A reliable and efficient transport network significantly reduces car use.	شبكة النقل الموثوقة والفعالة تقلل بشكل كبير من استخدام السيارات.	2026-04-08 18:29:37.153092+00
1009	option	خيار	B1	n.	Renewable energy is now a genuinely realistic option for many countries.	الطاقة المتجددة هي الآن خيار واقعي حقيقي للعديد من الدول.	2026-04-08 18:29:37.153092+00
1010	organic	عضوي	B1	adj.	Organic farming greatly reduces the use of harmful synthetic chemicals.	الزراعة العضوية تقلل كثيرًا من استخدام المواد الكيميائية الاصطناعية الضارة.	2026-04-08 18:29:37.153092+00
995	ignore	يتجاهل	B1	v.	We simply cannot continue to ignore the effects of climate change.	لا يمكننا ببساطة أن نستمر في تجاهل آثار تغير المناخ.	2026-04-08 18:29:37.149545+00
1004	mental	عقلي	B1	adj.	Mental health is just as critically important as physical health.	الصحة النفسية مهمة بنفس القدر الحرج من الصحة الجسدية.	2026-04-08 18:29:37.153092+00
1005	minimum	أدنى	B1	adj.	Last winter the minimum recorded temperature was minus ten degrees.	في فصل الشتاء الماضي، كانت أقل درجة حرارة مسجلة سالب عشر درجات.	2026-04-08 18:29:37.153092+00
1012	particular	معين	B1	adj.	Pay particular attention to all the linking words and phrases.	انتبه بشكل خاص إلى جميع كلمات الربط والعبارات.	2026-04-08 18:29:37.153092+00
1013	pattern	نمط	B1	n.	The graph shows a very clear and consistent pattern of increase.	يظهر الرسم البياني نمطًا واضحًا وثابتًا جدًا من الزيادة.	2026-04-08 18:29:37.153092+00
1014	performance	أداء	B1	n.	Consistent regular practice significantly improves exam performance.	الممارسة المنتظمة والمتسقة تحسن بشكل كبير من أداء الامتحان.	2026-04-08 18:29:37.153092+00
1015	physical	جسدي	B1	adj.	Regular physical activity significantly reduces the serious risk of obesity.	النشاط البدني المنتظم يقلل بشكل كبير من خطر السمنة الخطير.	2026-04-08 18:29:37.153092+00
1017	poverty	فقر	B1	n.	Poverty is closely linked to poor health and very low educational levels.	الفقر مرتبط ارتباطًا وثيقًا بسوء الصحة والمستويات التعليمية المنخفضة جدًا.	2026-04-08 18:29:37.153092+00
1018	prediction	تنبؤ	B1	n.	The scientific prediction for rising sea levels is genuinely alarming.	التنبؤ العلمي بارتفاع مستويات سطح البحر مثير للقلق حقًا.	2026-04-08 18:29:37.153092+00
1019	profit	ربح	B1	n.	Companies should never put short-term profit above environmental protection.	يجب على الشركات ألا تضع أبدًا الربح قصير الأجل فوق الحماية البيئية.	2026-04-08 18:29:37.153092+00
1020	protein	بروتين	B1	n.	Protein is a nutritionally essential part of a healthy balanced diet.	البروتين جزء غذائي ضروري من نظام غذائي صحي متوازن.	2026-04-08 18:29:37.153092+00
1021	prove	يثبت	B1	v.	The available data clearly proves that global temperatures are rising.	البيانات المتاحة تثبت بوضوح أن درجات الحرارة العالمية ترتفع.	2026-04-08 18:29:37.153092+00
1022	publish	ينشر	B1	v.	The important research was published in a prestigious international journal.	تم نشر البحث المهم في مجلة دولية مرموقة.	2026-04-08 18:29:37.153092+00
1023	rare	نادر	B1	adj.	Very rare species are always at the greatest risk from habitat loss.	الأنواع النادرة جدًا معرضة دائمًا لأعظم خطر من فقدان الموطن.	2026-04-08 18:29:37.153092+00
1024	recycle	يعيد تدوير	B1	v.	Most households now recycle paper, glass, and plastic regularly.	تعيد معظم الأسر الآن تدوير الورق والزجاج والبلاستيك بانتظام.	2026-04-08 18:29:37.153092+00
1025	relationship	علاقة	B1	n.	There is a very clear and direct relationship between poverty and pollution.	هناك علاقة واضحة جداً ومباشرة بين الفقر والتلوث.	2026-04-08 18:29:37.153092+00
1029	sample	عينة	B1	n.	The researcher carefully collected a large representative sample of river water.	جمع الباحث بعناية عينة كبيرة وممثلة من مياه النهر.	2026-04-08 18:29:37.153092+00
1032	species	أنواع/أنواع حية	B1	n.	Hundreds of important species become extinct every single year.	تنقرض مئات الأنواع المهمة كل عام واحد.	2026-04-08 18:29:37.153092+00
1037	stress	إجهاد/ضغط	B1	n.	Chronic and persistent stress is a major cause of serious health problems.	الإجهاد المزمن والمستمر هو السبب الرئيسي لمشاكل صحية خطيرة.	2026-04-08 18:29:37.153092+00
1039	suburb	ضاحية	B1	n.	Many growing families move to quieter and greener suburbs for a better life.	تنتقل العديد من الأسر المتنامية إلى ضواح أهدأ وأكثر اخضراراً لحياة أفضل.	2026-04-08 18:29:37.153092+00
1041	supply	إمدادات	B1	n.	The fresh water supply in many regions is under increasing threat.	إمدادات المياه العذبة في العديد من المناطق تواجه تهديداً متزايداً.	2026-04-08 18:29:37.153092+00
1042	surface	سطح	B1	n.	The average surface temperature of the ocean has risen noticeably.	ارتفعت متوسط درجة حرارة سطح المحيط بشكل ملحوظ.	2026-04-08 18:29:37.153092+00
1043	target	هدف	B1	n.	The government has set an ambitious target to plant a million trees.	وضعت الحكومة هدفاً طموحاً لزراعة مليون شجرة.	2026-04-08 18:29:37.153092+00
1044	task	مهمة	B1	n.	Read every part of the task very carefully before writing.	اقرأ كل جزء من المهمة بعناية فائقة قبل الكتابة.	2026-04-08 18:29:37.153092+00
1028	responsible	مسؤول	B1	adj.	All governments are responsible for adequately protecting natural resources.	جميع الحكومات مسؤولة عن حماية الموارد الطبيعية بشكل كاف.	2026-04-08 18:29:37.153092+00
1030	signal	يشير/يدل	B1	v.	The available data signals a genuinely worrying and persistent long-term trend.	تشير البيانات المتاحة إلى اتجاه طويل الأجل مقلق ومستمر حقاً.	2026-04-08 18:29:37.153092+00
1031	solar	شمسي	B1	adj.	Solar panels are now more affordable and accessible than ever before.	أصبحت الألواح الشمسية بأسعار معقولة وميسرة أكثر من أي وقت مضى.	2026-04-08 18:29:37.153092+00
1033	spread	ينتشر	B1	v.	Infectious disease can spread with alarming rapidity in crowded urban areas.	يمكن للأمراض المعدية أن تنتشر بسرعة مخيفة في المناطق الحضرية المكتظة.	2026-04-08 18:29:37.153092+00
1034	stable	مستقر	B1	adj.	A consistently stable and growing economy benefits all citizens.	اقتصاد مستقر ومتنام باستمرار يفيد جميع المواطنين.	2026-04-08 18:29:37.153092+00
1035	standard	معيار	B1	n.	Living standards have improved significantly in many developing countries.	تحسنت مستويات المعيشة بشكل كبير في العديد من الدول النامية.	2026-04-08 18:29:37.153092+00
1016	population	سكان	B1	n.	The world's total population is expected to reach ten billion.	يتوقع أن يصل إجمالي سكان العالم إلى عشرة مليارات.	2026-04-08 18:29:37.153092+00
1040	suitable	مناسب	B1	adj.	Always choose the most suitable vocabulary for your academic writing.	اختر دائماً المفردات الأكثر مناسبة لكتابتك الأكاديمية.	2026-04-08 18:29:37.153092+00
1036	steady	ثابت	B1	adj.	There was a steady and consistent increase in temperatures throughout the entire decade.	حدثت زيادة ثابتة ومستمرة في درجات الحرارة طوال الفترة.	2026-04-08 18:29:37.153092+00
1045	threat	تهديد	B1	n.	Large-scale deforestation is a very serious and growing threat to biodiversity.	إزالة الغابات على نطاق واسع تشكل تهديداً خطيراً ومتزايداً للتنوع البيولوجي.	2026-04-08 18:29:37.153092+00
1046	trade	تجارة	B1	n.	International trade has grown enormously and rapidly in recent decades.	نمت التجارة الدولية بشكل هائل وسريع في العقود الأخيرة.	2026-04-08 18:29:37.153092+00
1049	vehicle	مركبة	B1	n.	Electric vehicles produce far fewer harmful emissions than petrol cars.	المركبات الكهربائية تنتج انبعاثات ضارة أقل بكثير من السيارات التي تعمل بالبنزين.	2026-04-08 18:29:37.153092+00
1051	wealth	ثروة	B1	n.	Access to quality education is very closely linked to personal wealth.	الوصول إلى التعليم الجيد يرتبط ارتباطاً وثيقاً جداً بالثروة الشخصية.	2026-04-08 18:29:37.153092+00
1052	wildlife	الحياة البرية	B1	n.	Wildlife is significantly threatened by habitat loss and climate change.	تواجه الحياة البرية تهديداً كبيراً من فقدان الموائل وتغير المناخ.	2026-04-08 18:29:37.153092+00
1053	within	في غضون	B1	prep.	Major changes occurred rapidly within a very short and unexpected time period.	حدثت تغييرات رئيسية بسرعة في فترة زمنية قصيرة وغير متوقعة.	2026-04-08 18:29:37.153092+00
1054	access	وصول	B1	n.	Not everyone has equal access to quality healthcare.	لا يتمتع الجميع بوصول متساوٍ إلى الرعاية الصحية الجيدة.	2026-04-08 18:29:37.153092+00
1056	alternative	بديل	B1	n.	Cycling is a cheap and environmentally friendly alternative to driving.	ركوب الدراجات هو بديل رخيص وصديق للبيئة للقيادة.	2026-04-08 18:29:37.153092+00
1057	approach	نهج	B1	n.	A problem-solving approach is very useful in scientific research.	النهج القائم على حل المشاكل مفيد جداً في البحث العلمي.	2026-04-08 18:29:37.153092+00
1058	approximately	تقريباً	B1	adv.	The total population grew by approximately five percent per year.	نما إجمالي السكان بحوالي خمسة في المائة سنوياً.	2026-04-08 18:29:37.153092+00
1059	broad	واسع	B1	adj.	The essay covers a broad range of important environmental issues.	المقالة تغطي نطاقاً واسعاً من قضايا البيئة المهمة.	2026-04-08 18:29:37.153092+00
1061	challenge	تحدٍ	B1	n.	Climate change is arguably the greatest challenge of our time.	تغير المناخ يعتبر بلا شك أعظم تحدٍ في عصرنا.	2026-04-08 18:29:37.153092+00
1062	complex	معقد	B1	adj.	The relationship between poverty and health is more complex than it appears.	العلاقة بين الفقر والصحة أكثر تعقيداً مما تبدو.	2026-04-08 18:29:37.153092+00
1067	divide	يقسم	B1	v.	The country is divided into twelve clearly defined administrative regions.	الدولة مقسمة إلى اثني عشر منطقة إدارية محددة بوضوح.	2026-04-08 18:29:37.153092+00
1068	expand	يتوسع	B1	v.	The city has expanded dramatically in recent decades.	توسعت المدينة بشكل دراماتيكي في العقود الأخيرة.	2026-04-08 18:29:37.153092+00
1069	feature	الميزة	B1	n.	A key feature of strong academic writing is clarity and objectivity.	من أهم ميزات الكتابة الأكاديمية القوية الوضوح والموضوعية.	2026-04-08 18:29:37.153092+00
1070	function	الوظيفة	B1	n.	The primary function of this graph is to illustrate important long-term trends.	الوظيفة الأساسية لهذا الرسم البياني هي توضيح الاتجاهات الطويلة الأجل المهمة.	2026-04-08 18:29:37.153092+00
1071	highlight	يسلط الضوء	B1	v.	The report highlights the urgent need for greater investment in renewables.	يسلط التقرير الضوء على الحاجة العاجلة لاستثمار أكبر في الطاقة المتجددة.	2026-04-08 18:29:37.153092+00
1072	identify	يحدد	B1	v.	Always clearly identify the main features of the graph in your introduction.	حدد دائماً الميزات الرئيسية للرسم البياني بوضوح في المقدمة.	2026-04-08 18:29:37.153092+00
1073	influence	يؤثر	B1	v.	Social media powerfully influences the opinions and values of young people.	وسائل التواصل الاجتماعي تؤثر بقوة على آراء وقيم الشباب.	2026-04-08 18:29:37.153092+00
1075	labour	عمالة / قوى عاملة	B1	n.	Many key industries currently face a serious shortage of skilled labour.	تواجه العديد من الصناعات الرئيسية حالياً نقصاً خطيراً في القوى العاملة الماهرة.	2026-04-08 18:29:37.153092+00
1048	various	متنوعة	B1	adj.	There are various practical ways to significantly reduce energy consumption.	هناك طرق عملية متنوعة لتقليل استهلاك الطاقة بشكل كبير.	2026-04-08 18:29:37.153092+00
1055	advance	يتقدم	B1	v.	Science and technology continue to advance at a remarkable pace.	العلم والتكنولوجيا يستمران في التقدم بوتيرة مذهلة.	2026-04-08 18:29:37.153092+00
1063	concentrate	يركّز	B1	v.	You must concentrate very carefully during the listening test.	يجب عليك أن تركز بعناية شديدة أثناء اختبار الاستماع.	2026-04-08 18:29:37.153092+00
1065	contrast	يتناقض	B1	v.	The essay effectively contrasts the benefits of urban and rural life.	المقالة تقارن بفعالية بين فوائد الحياة الحضرية والريفية.	2026-04-08 18:29:37.153092+00
1050	volunteer	يتطوع	B1	v.	Many dedicated students regularly volunteer for worthwhile environmental conservation projects in their communities.	يتطوع العديد من الطلاب المخلصين بانتظام للعمل في مشاريع بيئية مفيدة.	2026-04-08 18:29:37.153092+00
1077	opposition	معارضة / رفض	B1	n.	The controversial new policy met with strong and widespread public opposition.	واجهت السياسة الجديدة المثيرة للجدل معارضة قوية وواسعة النطاق من الجمهور.	2026-04-08 18:29:37.153092+00
1079	process	عملية	B1	n.	Industrial recycling is a complex and multi-stage process.	إعادة التدوير الصناعية هي عملية معقدة ومتعددة المراحل.	2026-04-08 18:29:37.153092+00
1081	range	نطاق / مجموعة	B1	n.	A wide range of complex factors affects individual academic performance.	يؤثر نطاق واسع من العوامل المعقدة على الأداء الأكاديمي الفردي.	2026-04-08 18:29:37.153092+00
1082	realistic	واقعي	B1	adj.	Always set realistic and genuinely achievable targets in your study plan.	ضع دائماً أهدافاً واقعية وقابلة للتحقيق فعلاً في خطتك الدراسية.	2026-04-08 18:29:37.153092+00
1084	reject	يرفض	B1	v.	The independent committee formally rejected the controversial new proposal.	اللجنة المستقلة رفضت رسمياً الاقتراح الجديد المثير للجدل.	2026-04-08 18:29:37.153092+00
1085	represent	يمثل	B1	v.	The bar chart represents comparative data from ten different countries.	الرسم البياني يمثل بيانات مقارنة من عشر دول مختلفة.	2026-04-08 18:29:37.153092+00
1089	review	يراجع	B1	v.	Always carefully review your essay for grammatical errors before submitting.	راجع دائماً مقالتك بعناية للتحقق من الأخطاء النحوية قبل التسليم.	2026-04-08 18:29:37.153092+00
1092	rural	ريفي	B1	adj.	Rural communities often have access to fewer educational opportunities.	المجتمعات الريفية غالباً ما يكون لديها إمكانية الوصول إلى عدد أقل من الفرص التعليمية.	2026-04-08 18:29:37.153092+00
1093	scale	نطاق	B1	n.	Climate change is a problem that requires action on a truly global scale.	تغير المناخ هي مشكلة تتطلب إجراء على نطاق عالمي حقيقي.	2026-04-08 18:29:37.153092+00
1096	throughout	طوال	B1	prep.	Average temperatures rose steadily throughout every month of the year.	متوسط درجات الحرارة ارتفع بشكل مطرد طوال كل شهر من السنة.	2026-04-08 18:29:37.153092+00
1098	visible	مرئي	B1	adj.	The damaging effects of air pollution are now clearly visible in many cities.	آثار تلوث الهواء الضارة أصبحت الآن مرئية بوضوح في العديد من المدن.	2026-04-08 18:29:37.153092+00
1099	carbon	كربون	B1	n.	Reducing carbon emissions is the most urgent global environmental priority.	تقليل انبعاثات الكربون هو الأولوية البيئية العالمية الأكثر إلحاحاً.	2026-04-08 18:29:37.153092+00
1100	chart	رسم بياني	B1	n.	The chart shows changes in energy consumption over twenty years.	يوضح الرسم البياني التغيرات في استهلاك الطاقة على مدى عشرين عاماً.	2026-04-08 18:29:37.153092+00
1104	logical	منطقي	B1	adj.	A logical argument always progresses clearly from evidence to conclusion.	الحجة المنطقية تتقدم دائماً بوضوح من الأدلة إلى الخلاصة.	2026-04-08 18:29:37.157311+00
1105	occur	يحدث	B1	v.	Significant environmental damage can occur within a surprisingly short time.	يمكن أن يحدث ضرر بيئي كبير في فترة زمنية قصيرة بشكل مفاجئ.	2026-04-08 18:29:37.157311+00
1107	percentage	نسبة مئوية	B1	n.	The percentage of energy from renewable sources has doubled since 2010.	تضاعفت النسبة المئوية للطاقة من مصادر متجددة منذ عام 2010.	2026-04-08 18:29:37.157311+00
1087	respond	يستجيب	B1	v.	Students should always respond precisely to the exact question that is asked.	يجب على الطلاب أن يجيبوا دائماً بدقة على السؤال المحدد الذي يُطرح.	2026-04-08 18:29:37.153092+00
1090	revise	يراجع	B1	v.	You should revise all your key vocabulary notes at least once every week.	يجب عليك إعادة دراسة جميع ملاحظات المفردات الرئيسية مرة واحدة على الأقل كل أسبوع.	2026-04-08 18:29:37.153092+00
1091	risk	خطر	B1	n.	Long-term exposure to air pollution poses very serious risks to human health.	التعرض طويل الأمد لتلوث الهواء ينطوي على مخاطر جسيمة جداً لصحة الإنسان.	2026-04-08 18:29:37.153092+00
1101	confirm	يؤكد	B1	v.	The new data confirms that emissions are continuing to rise rapidly.	البيانات الجديدة تؤكد أن الانبعاثات تستمر في الارتفاع بسرعة.	2026-04-08 18:29:37.157311+00
1102	doubt	يشكك	B1	v.	Few scientists now doubt the link between human activity and climate change.	قلة من العلماء الآن يشككون في الصلة بين النشاط البشري وتغير المناخ.	2026-04-08 18:29:37.157311+00
1103	link	يربط	B1	v.	Researchers have firmly linked poor air quality to increased rates of asthma.	ربط الباحثون بقوة بين تدهور جودة الهواء وزيادة معدلات الإصابة بالربو.	2026-04-08 18:29:37.157311+00
1106	outline	يضع مخططاً	B1	v.	Carefully outline your essay plan before you begin writing it.	ضع مخططاً دقيقاً لخطة مقالتك قبل أن تبدأ الكتابة.	2026-04-08 18:29:37.157311+00
1094	solution	حل	B1	n.	There is no single simple solution to the enormous challenge of climate change.	لا يوجد حل واحد بسيط لمشكلة تغير المناخ الضخمة.	2026-04-08 18:29:37.153092+00
1080	promote	يعزز / يروّج	B1	v.	The government actively promotes the wider use of sustainable public transportation systems.	تعزز الحكومة بنشاط الاستخدام الأوسع للنقل العام المستدام.	2026-04-08 18:29:37.153092+00
1088	reveal	يكشف	B1	v.	The large-scale survey reveals some interesting and unexpected behavioural patterns among participants.	الاستطلاع الواسع النطاق يكشف عن بعض البيانات السلوكية المثيرة للاهتمام والمفاجئة.	2026-04-08 18:29:37.153092+00
1110	summary	ملخص	B1	n.	Write a two-sentence summary of the main trends as your introduction.	اكتب ملخصاً من جملتين عن الاتجاهات الرئيسية كمقدمتك.	2026-04-08 18:29:37.157311+00
1114	campaign	حملة	B1	n.	The awareness campaign succeeded in reducing plastic bag use dramatically.	نجحت حملة الوعي في تقليل استخدام أكياس البلاستيك بشكل درامي.	2026-04-08 18:29:37.157311+00
1115	colleague	زميل	B1	n.	She discussed her research findings with her colleague at the conference.	ناقشت نتائج بحثها مع زميلتها في المؤتمر.	2026-04-08 18:29:37.157311+00
1116	combination	مزيج	B1	n.	A combination of factors always contributes to academic success.	مزيج من العوامل يساهم دائماً في النجاح الأكاديمي.	2026-04-08 18:29:37.157311+00
1117	advantage	ميزة	B1	n.	One advantage of learning English is access to global information.	من مميزات تعلم اللغة الإنجليزية الحصول على المعلومات العالمية.	2026-04-08 18:29:37.157311+00
1119	agency	وكالة	B1	n.	A government agency was set up to monitor water quality.	تم تأسيس وكالة حكومية لمراقبة جودة المياه.	2026-04-08 18:29:37.157311+00
1120	approve	يوافق	B1	v.	The school council voted to approve the new uniform policy.	صوت مجلس المدرسة على الموافقة على سياسة الزي الموحد الجديدة.	2026-04-08 18:29:37.157311+00
1121	argument	حجة	B1	n.	The essay presented a clear and logical argument about climate change.	قدمت المقالة حجة واضحة ومنطقية حول تغير المناخ.	2026-04-08 18:29:37.157311+00
1123	audience	جمهور	B1	n.	The audience clapped enthusiastically at the end of the presentation.	صفق الجمهور بحماس في نهاية العرض التقديمي.	2026-04-08 18:29:37.157311+00
1124	bargain	صفقة	B1	n.	She found a real bargain at the second-hand bookshop.	وجدت صفقة رائعة في متجر الكتب المستعملة.	2026-04-08 18:29:37.157311+00
1125	biology	أحياء	B1	n.	She chose biology as one of her main subjects at school.	اختارت الأحياء كأحد موضوعاتها الرئيسية في المدرسة.	2026-04-08 18:29:37.157311+00
1126	boom	ازدهار	B1	n.	There was a boom in renewable energy investment last year.	حدث ازدهار في استثمارات الطاقة المتجددة العام الماضي.	2026-04-08 18:29:37.157311+00
1127	championship	بطولة	B1	n.	He won the national spelling championship last spring.	فاز ببطولة الإملاء الوطنية في الربيع الماضي.	2026-04-08 18:29:37.157311+00
1128	channel	قناة	B1	n.	This television channel broadcasts educational programmes for students.	هذه القناة التلفزيونية تبث برامج تعليمية للطلاب.	2026-04-08 18:29:37.157311+00
1130	deadline	موعد نهائي	B1	n.	The deadline for submitting applications is the end of this month.	الموعد النهائي لتقديم الطلبات هو نهاية هذا الشهر.	2026-04-08 18:29:37.157311+00
1131	disappointment	خيبة أمل	B1	n.	She felt disappointment when she missed the highest grade by one point.	شعرت بخيبة أمل عندما فاتتها أعلى درجة بنقطة واحدة.	2026-04-08 18:29:37.157311+00
1132	discussion	نقاش	B1	n.	The class had an interesting discussion about the benefits of technology.	أجرت الفصل نقاشاً مثيراً للاهتمام حول فوائد التكنولوجيا.	2026-04-08 18:29:37.157311+00
1133	gradual	تدريجي	B1	adj.	There has been a slow but gradual shift towards the use of renewable energy.	كان هناك تحول بطيء لكن تدريجي نحو استخدام الطاقة المتجددة.	2026-04-08 18:29:37.157311+00
1134	identical	متطابق	B1	adj.	The two comparative graphs show nearly identical long-term trends.	يظهر الرسمان البيانيان المقارنان اتجاهات طويلة الأجل متطابقة تقريباً.	2026-04-08 18:29:37.157311+00
1135	moderate	معتدل	B1	adj.	Moderate levels of regular physical exercise are highly beneficial for health.	مستويات معتدلة من التمارين البدنية المنتظمة مفيدة جداً للصحة.	2026-04-08 18:29:37.157311+00
1136	neutral	محايد	B1	adj.	All forms of academic writing should consistently maintain a neutral tone.	يجب أن تحافظ جميع أشكال الكتابة الأكاديمية باستمرار على نبرة محايدة.	2026-04-08 18:29:37.157311+00
1137	abundant	وفير	B1	adj.	Renewable resources are far more abundant than fossil fuels.	الموارد المتجددة أكثر وفرة بكثير من الوقود الأحفوري.	2026-04-08 18:29:37.157311+00
1138	confuse	يربك	B1	v.	Students often confuse similar academic words like affect and effect.	غالباً ما يربك الطلاب بين كلمات أكاديمية متشابهة مثل affect و effect.	2026-04-08 18:29:37.157311+00
1109	replace	يستبدل	B1	v.	Electric vehicles will gradually replace petrol-powered cars completely.	ستستبدل المركبات الكهربائية تدريجياً السيارات التي تعمل بالبنزين تماماً.	2026-04-08 18:29:37.157311+00
1111	underline	يُسطّر	B1	v.	Underline key words in the question before planning your response.	سطّر الكلمات الرئيسية في السؤال قبل التخطيط لإجابتك.	2026-04-08 18:29:37.157311+00
1113	appeal	يستأثر / يجذب	B1	v.	Sustainable travel options are beginning to appeal to a much wider audience.	تبدأ خيارات السفر المستدام في جذب جمهور أوسع بكثير.	2026-04-08 18:29:37.157311+00
1118	advertising	إعلانات	B1	n.	Advertising on social media can reach millions of people instantly.	الإعلانات على وسائل التواصل الاجتماعي يمكنها الوصول إلى ملايين الأشخاص فوراً.	2026-04-08 18:29:37.157311+00
1122	assignment	مهمة / واجب	B1	n.	Please submit your writing assignment by Friday at noon.	يرجى تسليم واجبك الكتابي بحلول يوم الجمعة الساعة الثانية عشرة ظهراً.	2026-04-08 18:29:37.157311+00
1139	enthusiasm	حماس / شغف	B1	n.	Enthusiasm for the research question is an important but not sufficient quality in academic inquiry.	الشغف تجاه سؤال البحث صفة مهمة لكن غير كافية في حد ذاتها	2026-04-08 18:29:37.157311+00
1112	worldwide	عالمياً	B1	adv.	Temperatures are rising worldwide as a direct result of greenhouse gas emissions.	ترتفع درجات الحرارة عالمياً كنتيجة مباشرة لانبعاثات غازات الاحتباس الحراري.	2026-04-08 18:29:37.157311+00
1129	committee	لجنة	B1	n.	A committee was formed to review the school's safety procedures.	تم تشكيل لجنة لمراجعة إجراءات السلامة في المدرسة.	2026-04-08 18:29:37.157311+00
1141	guidance	إرشادات / توجيهات	B1	n.	Clear guidance on ethical procedures is essential for all new researchers.	الإرشادات الواضحة حول الإجراءات الأخلاقية ضرورية لجميع الباحثين الجدد	2026-04-08 18:29:37.157311+00
1142	imagination	خيال / إبداع	B1	n.	Scientific imagination is as important as methodological rigor in great research.	الخيال العلمي مهم مثل الدقة المنهجية في البحث المتميز	2026-04-08 18:29:37.157311+00
1147	medication	دواء	B1	n.	The effects of the medication were carefully monitored throughout the trial.	تم مراقبة تأثيرات الدواء بعناية طوال فترة التجربة.	2026-04-08 18:29:37.157311+00
1148	patience	صبر	B1	n.	Patience is a fundamental virtue in longitudinal research.	الصبر هو فضيلة أساسية في البحث الطويل الأجل.	2026-04-08 18:29:37.157311+00
1149	qualification	مؤهل	B1	n.	The relevant qualification for this role is a postgraduate degree.	المؤهل ذو الصلة لهذا المنصب هو درجة دراسات عليا.	2026-04-08 18:29:37.157311+00
1153	abandon	يتخلى عن	B2	v.	Many people abandon bad habits after a health scare.	يتخلى كثير من الناس عن العادات السيئة بعد تحذير صحي.	2026-04-08 18:29:37.157311+00
1154	accurate	دقيق	B2	adj.	Your measurements must be accurate to get the right result.	قياساتك يجب أن تكون دقيقة للحصول على النتيجة الصحيحة.	2026-04-08 18:29:37.157311+00
1155	aid	مساعدة	B2	n.	The region received emergency aid after the flood.	تلقت المنطقة مساعدة طوارئ بعد الفيضان.	2026-04-08 18:29:37.157311+00
1156	aspect	جانب	B2	n.	Health and wellbeing are very important aspects of life.	الصحة والرفاهية جوانب مهمة جداً في الحياة.	2026-04-08 18:29:37.157311+00
1157	assist	يساعد	B2	v.	Volunteers assist elderly people with daily tasks.	يساعد المتطوعون كبار السن في المهام اليومية.	2026-04-08 18:29:37.157311+00
1158	category	فئة	B2	n.	Place each vocabulary word into the correct category.	ضع كل كلمة مفردات في الفئة الصحيحة.	2026-04-08 18:29:37.157311+00
1159	define	يعرّف	B2	v.	Please define the new word clearly in your own words.	يرجى تعريف الكلمة الجديدة بوضوح بكلماتك الخاصة.	2026-04-08 18:29:37.157311+00
1160	generate	يولد	B2	v.	Modern wind turbines can generate significant amounts of electricity.	توربينات الرياح الحديثة يمكنها أن تولد كميات كبيرة من الكهرباء.	2026-04-08 18:29:37.157311+00
1161	barrier	حاجز	B2	n.	Lack of funding can be a serious barrier to higher education access.	نقص التمويل يمكن أن يكون حاجزاً خطيراً أمام الوصول إلى التعليم العالي.	2026-04-08 18:29:37.157311+00
1162	drought	جفاف	B2	n.	A prolonged and severe drought can cause very serious food shortages.	الجفاف الطويل والشديد يمكن أن يسبب نقصاً حاداً في الغذاء.	2026-04-08 18:29:37.157311+00
1163	emission	انبعاث، انبعاثات	B2	n.	Vehicle emissions are now a major cause of urban air pollution.	انبعاثات المركبات أصبحت الآن سبباً رئيسياً لتلوث الهواء في المدن.	2026-04-08 18:29:37.157311+00
1165	gender	جنس/نوع اجتماعي	B2	n.	Achieving genuine gender equality remains a key global development goal.	تحقيق المساواة الحقيقية بين الجنسين يظل هدفاً تنموياً عالمياً رئيسياً.	2026-04-08 18:29:37.157311+00
1166	habitat	موطن طبيعي	B2	n.	Wetland areas provide an essential habitat for many migratory bird species.	مناطق الأراضي الرطبة توفر موطناً طبيعياً أساسياً لأنواع طيور مهاجرة عديدة.	2026-04-08 18:29:37.157311+00
1167	invest	الاستثمار	B2	v.	All countries should significantly invest in renewable energy sources.	يجب على جميع الدول أن تستثمر بشكل كبير في مصادر الطاقة المتجددة.	2026-04-08 18:29:37.157311+00
1168	marine	بحري	B2	adj.	Marine pollution now poses a very serious threat to all fish populations.	التلوث البحري يشكل الآن تهديداً حاداً جداً لجميع تجمعات الأسماك.	2026-04-08 18:29:37.157311+00
1169	migration	هجرة	B2	n.	Large-scale migration to cities is putting enormous pressure on services.	الهجرة واسعة النطاق إلى المدن تضع ضغطًا هائلاً على الخدمات.	2026-04-08 18:29:37.157311+00
1170	permanent	دائم	B2	adj.	Some forms of serious environmental damage are sadly permanent.	بعض أشكال الضرر البيئي الخطير للأسف دائمة.	2026-04-08 18:29:37.157311+00
1172	reform	إصلاح	B2	n.	Significant educational reform is urgently needed to better prepare students.	الإصلاح التعليمي الهام مطلوب بشكل عاجل لتحضير الطلاب بشكل أفضل.	2026-04-08 18:29:37.157311+00
1143	journalism	الصحافة / العمل الصحفي	B1	n.	Responsible journalism plays a critical role in communicating scientific findings to the general public.	العمل الصحفي المسؤول يلعب دوراً حيوياً في توصيل النتائج العلمية	2026-04-08 18:29:37.157311+00
1146	measurement	القياس / التقدير	B1	n.	Accurate measurement of the key variables is fundamental to any quantitative research study or investigation.	القياس الدقيق للمتغيرات الرئيسية أساسي لأي دراسة كمية	2026-04-08 18:29:37.157311+00
1171	purchase	يشتري	B2	v.	Many environmentally conscious consumers now purchase eco-friendly products to reduce their carbon footprint.	يشتري العديد من المستهلكين الواعين بيئيًا الآن منتجات صديقة للبيئة.	2026-04-08 18:29:37.157311+00
1164	extinction	انقراض	B2	n.	Many important species now face extinction if deforestation continues at its current rate.	تواجه العديد من الأنواع المهمة خطر الانقراض إذا استمرت إزالة الغابات.	2026-04-08 18:29:37.157311+00
1173	restore	استعادة	B2	v.	Major efforts are now being made to restore badly damaged ecosystems.	يتم الآن بذل جهود كبيرة لاستعادة النظم البيئية المتضررة بشدة.	2026-04-08 18:29:37.157311+00
1176	sustainable	مستدام	B2	adj.	Sustainable development carefully meets the needs of the present generation.	التنمية المستدامة تلبي احتياجات الجيل الحالي بعناية.	2026-04-08 18:29:37.157311+00
1177	welfare	رفاهية	B2	n.	The welfare of all animals must be considered in farming practices.	يجب أن تؤخذ رفاهية جميع الحيوانات في الاعتبار في الممارسات الزراعية.	2026-04-08 18:29:37.157311+00
1178	workforce	القوى العاملة	B2	n.	The modern workforce urgently needs new skills for the digital economy.	تحتاج القوى العاملة الحديثة بشكل عاجل إلى مهارات جديدة للاقتصاد الرقمي.	2026-04-08 18:29:37.157311+00
1179	abstract	مجرد	B2	adj.	Justice and freedom are important but abstract concepts.	العدالة والحرية هي مفاهيم مجردة لكنها مهمة.	2026-04-08 18:29:37.157311+00
1180	academic	أكاديمي	B2	adj.	Academic writing requires a formal tone and precise vocabulary.	الكتابة الأكاديمية تتطلب نبرة رسمية ومفردات دقيقة.	2026-04-08 18:29:37.157311+00
1181	accommodate	يستوعب	B2	v.	The new policy must accommodate different learning needs.	يجب أن تستوعب السياسة الجديدة احتياجات التعلم المختلفة.	2026-04-08 18:29:37.157311+00
1182	acknowledge	يعترف	B2	v.	The report acknowledges the urgent need for change.	التقرير يعترف بالحاجة الملحة للتغيير.	2026-04-08 18:29:37.157311+00
1183	adapt	يتكيف	B2	v.	Animals must adapt to survive in a changing environment.	يجب على الحيوانات أن تتكيف للبقاء على قيد الحياة في بيئة متغيرة.	2026-04-08 18:29:37.157311+00
1184	adequate	كافٍ	B2	adj.	Adequate sleep is absolutely essential for concentration and memory.	النوم الكافي ضروري تماماً للتركيز والذاكرة.	2026-04-08 18:29:37.157311+00
1185	administration	إدارة	B2	n.	The administration of large cities is becoming increasingly complex.	إدارة المدن الكبيرة تصبح معقدة بشكل متزايد.	2026-04-08 18:29:37.157311+00
1186	adopt	يتبنى	B2	v.	Many countries have now adopted cleaner energy policies.	اتبنت العديد من الدول الآن سياسات الطاقة النظيفة.	2026-04-08 18:29:37.157311+00
1187	alter	يغير	B2	v.	Climate change may significantly alter traditional rainfall patterns.	قد يغير تغير المناخ بشكل كبير أنماط الأمطار التقليدية.	2026-04-08 18:29:37.157311+00
1188	analyse	يحلل	B2	v.	Students must carefully analyse the data before writing their report.	يجب على الطلاب تحليل البيانات بعناية قبل كتابة تقريرهم.	2026-04-08 18:29:37.157311+00
1189	apparent	واضح	B2	adj.	It was apparent from the data that the trend was increasing.	كان واضحاً من البيانات أن الاتجاه كان في ازدياد.	2026-04-08 18:29:37.157311+00
1190	assess	يقيم	B2	v.	Teachers regularly assess students through both written and oral tests.	يقيم المعلمون الطلاب بانتظام من خلال الاختبارات المكتوبة والشفوية.	2026-04-08 18:29:37.157311+00
1191	assign	يكلف	B2	v.	The teacher assigned a detailed research task to each group.	كلف المعلم كل مجموعة بمهمة بحثية مفصلة.	2026-04-08 18:29:37.157311+00
1192	assume	يفترض	B2	v.	Do not assume that all your readers share the same background.	لا تفترض أن جميع قرائك يشاركون نفس الخلفية.	2026-04-08 18:29:37.157311+00
1193	authority	سلطة	B2	n.	Local authorities are responsible for waste collection and management.	السلطات المحلية مسؤولة عن جمع ومعالجة النفايات.	2026-04-08 18:29:37.157311+00
1195	circumstance	ظرف	B2	n.	The outcome of any situation depends heavily on the circumstances.	نتيجة أي موقف تعتمد بشكل كبير على الظروف المحيطة.	2026-04-08 18:29:37.157311+00
1198	commitment	التزام	B2	n.	IELTS success requires both genuine commitment and consistent practice.	النجاح في اختبار الآيلتس يتطلب التزاماً حقيقياً وممارسة مستمرة.	2026-04-08 18:29:37.157311+00
1199	component	مكون	B2	n.	Protein is an essential component of a genuinely balanced diet.	البروتين هو مكون أساسي في نظام غذائي متوازن حقاً.	2026-04-08 18:29:37.157311+00
1200	concept	مفهوم	B2	n.	Sustainability is one of the most important concepts in modern life.	الاستدامة هي واحدة من أهم المفاهيم في الحياة الحديثة.	2026-04-08 18:29:37.157311+00
1203	consequence	نتيجة	B2	n.	Pollution has very severe and long-term consequences for public health.	للتلوث نتائج خطيرة وطويلة الأجل على الصحة العامة.	2026-04-08 18:29:37.160986+00
1204	consistent	متسق	B2	adj.	A consistent study routine will lead to much better exam results.	روتين دراسي متسق سيؤدي إلى نتائج امتحانات أفضل بكثير.	2026-04-08 18:29:37.160986+00
1175	statistic	إحصاء	B2	n.	The latest statistics clearly show that air quality has improved.	تظهر الإحصائيات الأخيرة بوضوح أن جودة الهواء تحسنت.	2026-04-08 18:29:37.157311+00
1194	capacity	سعة	B2	n.	The new stadium has a total capacity of over 80,000 spectators.	الملعب الجديد له سعة إجمالية تزيد عن 80،000 متفرج.	2026-04-08 18:29:37.157311+00
1196	classify	يصنّف	B2	v.	Biologists carefully classify living organisms into clearly defined groups.	يصنف علماء الأحياء الكائنات الحية بعناية إلى مجموعات محددة بوضوح.	2026-04-08 18:29:37.157311+00
1197	collaborate	يتعاون	B2	v.	Students consistently learn more effectively when they collaborate on tasks.	الطلاب يتعلمون بفعالية أكبر عندما يتعاونون على المهام.	2026-04-08 18:29:37.157311+00
1201	conclude	يستنتج	B2	v.	The research report clearly concludes that immediate action is required.	تقرير البحث يستنتج بوضوح أن اتخاذ إجراء فوري ضروري.	2026-04-08 18:29:37.160986+00
1202	conduct	يُجري	B2	v.	Scientists carefully conduct experiments to test and validate hypotheses.	يجري العلماء التجارب بعناية لاختبار والتحقق من الفرضيات.	2026-04-08 18:29:37.160986+00
1205	construct	يبني	B2	v.	The government plans to construct several important new hospitals this year.	تخطط الحكومة لبناء عدة مستشفيات جديدة مهمة هذا العام.	2026-04-08 18:29:37.160986+00
1206	consume	يستهلك	B2	v.	Developed nations consume far more energy per person than developing ones.	الدول المتقدمة تستهلك طاقة أكثر بكثير للفرد الواحد من الدول النامية.	2026-04-08 18:29:37.160986+00
1215	diverse	متنوع	B2	adj.	The city has a rich and genuinely diverse multicultural population.	المدينة لديها سكان متعددي الثقافات غنيين ومتنوعين حقاً.	2026-04-08 18:29:37.160986+00
1216	dominant	مهيمن	B2	adj.	English has become the dominant language of international communication.	أصبحت اللغة الإنجليزية هي اللغة المهيمنة في التواصل الدولي.	2026-04-08 18:29:37.160986+00
1218	emerge	يظهر، ينشأ	B2	v.	Innovative new solutions are beginning to emerge to tackle climate change.	بدأت حلول مبتكرة جديدة تظهر للتعامل مع تغير المناخ.	2026-04-08 18:29:37.160986+00
1220	enable	يمكّن	B2	v.	Digital technology enables people to work productively from almost anywhere.	التكنولوجيا الرقمية تمكّن الناس من العمل بإنتاجية من أي مكان تقريباً.	2026-04-08 18:29:37.160986+00
1221	encounter	يواجه	B2	v.	Students frequently encounter unfamiliar vocabulary in reading test passages.	يواجه الطلاب بشكل متكرر مفردات غير مألوفة في نصوص اختبار القراءة.	2026-04-08 18:29:37.160986+00
1223	establish	ينشئ، يحدد	B2	v.	The new policy established stricter environmental guidelines for all businesses.	السياسة الجديدة وضعت إرشادات بيئية أكثر صرامة لجميع الشركات.	2026-04-08 18:29:37.160986+00
1224	evaluate	يقيّم	B2	v.	Students must evaluate both the strengths and weaknesses of each argument.	يجب على الطلاب تقييم نقاط القوة والضعف في كل حجة.	2026-04-08 18:29:37.160986+00
1225	evolve	يتطور	B2	v.	Languages are living systems that evolve and change constantly over time.	اللغات أنظمة حية تتطور وتتغير باستمرار عبر الزمن.	2026-04-08 18:29:37.160986+00
1226	exclude	يستبعد	B2	v.	The study excluded all participants who were below the age of eighteen.	استبعدت الدراسة جميع المشاركين الذين تقل أعمارهم عن ثمانية عشر سنة.	2026-04-08 18:29:37.160986+00
1228	expose	يعرّض	B2	v.	Living near industrial areas can expose residents to dangerous air toxins.	العيش بالقرب من المناطق الصناعية يعرّض السكان للسموم الهوائية الخطيرة.	2026-04-08 18:29:37.160986+00
1229	extent	المدى، الحد	B2	n.	The full extent of the environmental damage was not initially clear.	لم يكن الحد الكامل للأضرار البيئية واضحاً في البداية.	2026-04-08 18:29:37.160986+00
1231	fundamental	أساسي	B2	adj.	Access to clean water is a fundamental right of every human being.	الحصول على مياه نظيفة هو حق أساسي لكل إنسان.	2026-04-08 18:29:37.160986+00
1232	illustrate	يوضح	B2	v.	This clear diagram effectively illustrates the water cycle process.	يوضح هذا الرسم التوضيحي الواضح دورة الماء بفعالية.	2026-04-08 18:29:37.160986+00
1234	indicate	يشير	B2	v.	The survey clearly indicates that most people prefer living in cities.	يشير المسح بوضوح إلى أن معظم الناس يفضلون العيش في المدن.	2026-04-08 18:29:37.160986+00
1235	inequality	عدم المساواة	B2	n.	Growing economic inequality is increasing in many parts of the world.	يتزايد عدم المساواة الاقتصادية في أجزاء كثيرة من العالم.	2026-04-08 18:29:37.160986+00
1236	inevitable	حتمي	B2	adj.	In a rapidly changing world, some degree of social change is inevitable.	في عالم يتغير بسرعة، درجة معينة من التغيير الاجتماعي حتمية.	2026-04-08 18:29:37.160986+00
1237	initiative	مبادرة	B2	n.	The government launched an ambitious initiative to reduce single-use plastic.	أطلقت الحكومة مبادرة طموحة لتقليل استخدام البلاستيك أحادي الاستخدام.	2026-04-08 18:29:37.160986+00
1209	cope	يتعامل	B2	v.	Some coastal communities genuinely struggle to cope with severe flooding.	بعض المجتمعات الساحلية تجد صعوبة حقيقية في التعامل مع الفيضانات الشديدة.	2026-04-08 18:29:37.160986+00
1210	decline	يتراجع	B2	v.	Wild fish populations have declined very sharply due to overfishing.	أعداد الأسماك البرية تراجعت بشكل حاد جداً بسبب الصيد الجائر.	2026-04-08 18:29:37.160986+00
1211	dedicate	يكرّس	B2	v.	She dedicated more than ten years of her career to improving literacy.	كرّست أكثر من عشر سنوات من حياتها المهنية لتحسين محو الأمية.	2026-04-08 18:29:37.160986+00
1212	demonstrate	يوضح	B2	v.	The data clearly demonstrates a strong and consistent upward trend.	البيانات تثبت بوضوح اتجاهاً صعودياً قوياً ومتسقاً.	2026-04-08 18:29:37.160986+00
1213	detect	يكتشف	B2	v.	Satellites can now accurately detect changes in forest cover from space.	يمكن للأقمار الصناعية أن تكشف بدقة عن التغيرات في غطاء الغابات من الفضاء.	2026-04-08 18:29:37.160986+00
1217	dramatic	مثير	B2	adj.	There has been a very dramatic increase in online shopping worldwide.	حدث ارتفاع دراماتيكي جداً في التسوق الإلكتروني عالمياً.	2026-04-08 18:29:37.160986+00
1219	emphasis	تركيز	B2	n.	The IELTS course places great emphasis on developing writing skills.	يركز مساق الآيلتس بشكل كبير على تطوير مهارات الكتابة.	2026-04-08 18:29:37.160986+00
1222	ensure	يضمن	B2	v.	Please ensure that your essay is clearly organised before submitting.	يرجى التأكد من أن مقالتك منظمة بوضوح قبل تقديمها.	2026-04-08 18:29:37.160986+00
1230	foundation	أساس	B2	n.	A solid foundation in vocabulary is absolutely essential for IELTS success.	الأساس الصلب في المفردات ضروري تماماً لنجاح الآيلتس.	2026-04-08 18:29:37.160986+00
1233	imply	يستلزم	B2	v.	The available data implies that energy demand will continue to rise.	البيانات المتاحة تعني أن الطلب على الطاقة سيستمر في الارتفاع.	2026-04-08 18:29:37.160986+00
1208	controversy	جدل	B2	n.	The new energy policy caused considerable and widespread political debate across various sectors.	سياسة الطاقة الجديدة تسببت في جدل سياسي واسع ومعتبر.	2026-04-08 18:29:37.160986+00
1214	determine	حدّد	B2	v.	A combination of key factors determines a student's academic success.	مجموعة من العوامل الرئيسية تحدد نجاح الطالب الأكاديمي.	2026-04-08 18:29:37.160986+00
1243	minority	أقلية	B2	n.	All truly democratic societies must protect the rights of minority groups.	يجب على جميع المجتمعات الديمقراطية الحقيقية أن تحمي حقوق الأقليات.	2026-04-08 18:29:37.160986+00
1251	priority	أولوية	B2	n.	Reducing harmful carbon emissions must now be treated as a global priority.	يجب أن يتم الآن التعامل مع تقليل انبعاثات الكربون الضارة كأولوية عالمية.	2026-04-08 18:29:37.160986+00
1252	proportion	نسبة	B2	n.	A very large proportion of global energy still comes from fossil fuels.	تأتي نسبة كبيرة جداً من الطاقة العالمية لا تزال من الوقود الأحفوري.	2026-04-08 18:29:37.160986+00
1256	regulate	ينظم	B2	v.	Most governments strictly regulate the agricultural use of harmful pesticides.	معظم الحكومات تنظم بصرامة استخدام المبيدات الضارة في الزراعة.	2026-04-08 18:29:37.160986+00
1257	relevant	ذو صلة	B2	adj.	Ensure that all the information in your essay is directly relevant.	تأكد من أن جميع المعلومات في مقالتك ذات صلة مباشرة.	2026-04-08 18:29:37.160986+00
1258	rely	يعتمد على	B2	v.	Many rural communities rely almost entirely on subsistence agriculture.	العديد من المجتمعات الريفية تعتمد بشكل شبه كامل على الزراعة الكفافية.	2026-04-08 18:29:37.160986+00
1260	strategy	استراتيجية	B2	n.	A well-organised study strategy that includes regular revision is highly effective.	استراتيجية دراسة منظمة جيداً تتضمن المراجعة المنتظمة فعالة جداً.	2026-04-08 18:29:37.160986+00
1261	sufficient	كافٍ	B2	adj.	Is the evidence in the essay sufficient to support the conclusion?	هل الأدلة في المقالة كافية لدعم الخلاصة؟	2026-04-08 18:29:37.160986+00
1263	transform	يحول	B2	v.	Digital tools are rapidly and fundamentally transforming the modern classroom.	الأدوات الرقمية تحول بسرعة وبشكل جذري الفصل الدراسي الحديث.	2026-04-08 18:29:37.160986+00
1264	transition	انتقال	B2	n.	The country is making a very challenging transition to fully renewable energy.	الدولة تمر بانتقال صعب جداً إلى الطاقة المتجددة بالكامل.	2026-04-08 18:29:37.160986+00
1265	unique	فريد	B2	adj.	Every student has a unique and individual approach to learning.	لكل طالب أسلوب تعلم فريد وشخصي.	2026-04-08 18:29:37.160986+00
1266	valid	صحيح	B2	adj.	Provide relevant and valid evidence to support every main argument.	قدم أدلة ذات صلة وصحيحة لدعم كل حجة رئيسية.	2026-04-08 18:29:37.160986+00
1268	vital	حيوي	B2	adj.	Access to affordable clean water is absolutely vital for human survival.	الحصول على مياه نظيفة بأسعار معقولة أمر حيوي تماماً لبقاء الإنسان.	2026-04-08 18:29:37.160986+00
1303	coastal	ساحلي	B2	adj.	Coastal communities are most vulnerable to rising sea levels.	المجتمعات الساحلية الأكثر عرضة لارتفاع منسوب البحار.	2026-04-08 18:29:37.164528+00
1240	justify	يبرر	B2	v.	Every argument in your essay must be justified with relevant evidence.	يجب أن يكون كل حجة في مقالتك مدعومة ببيانات وأدلة ذات صلة.	2026-04-08 18:29:37.160986+00
1241	maintain	يحافظ على	B2	v.	It is genuinely challenging to maintain a balanced diet when busy.	من الصعب حقاً الحفاظ على نظام غذائي متوازن عندما تكون مشغولاً.	2026-04-08 18:29:37.160986+00
1242	migrate	يهاجر	B2	v.	Millions of birds migrate thousands of kilometres south during winter.	تهاجر ملايين الطيور آلاف الكيلومترات جنوباً خلال فصل الشتاء.	2026-04-08 18:29:37.160986+00
1245	motivate	يحفّز	B2	v.	Effective teachers find creative ways to genuinely motivate their students.	يجد المعلمون الفعالون طرقاً إبداعية لتحفيز طلابهم حقاً.	2026-04-08 18:29:37.160986+00
1246	objective	هدف	B2	n.	The primary objective of the project is to significantly reduce carbon emissions.	الهدف الأساسي للمشروع هو تقليل انبعاثات الكربون بشكل كبير.	2026-04-08 18:29:37.160986+00
1255	reflect	يعكس	B2	v.	A truly good essay should reflect the writer's original ideas and thinking.	المقالة الجيدة حقاً يجب أن تعكس أفكار وتفكير الكاتب الأصلية.	2026-04-08 18:29:37.160986+00
1248	participate	يشارك	B2	v.	All students are actively encouraged to participate in class discussions.	يتم تشجيع جميع الطلاب بنشاط على المشاركة في نقاشات الفصل.	2026-04-08 18:29:37.160986+00
1249	potential	محتمل	B2	adj.	Solar energy has enormous untapped potential as a global energy source.	لطاقة الشمس إمكانات هائلة غير مستغلة كمصدر طاقة عالمي.	2026-04-08 18:29:37.160986+00
1250	predict	يتنبأ	B2	v.	Climate scientists predict that global temperatures will continue to rise.	يتنبأ علماء المناخ بأن درجات الحرارة العالمية ستستمر في الارتفاع.	2026-04-08 18:29:37.160986+00
1259	restriction	قيد	B2	n.	There are strict legal restrictions on the use of certain harmful chemicals.	هناك قيود قانونية صارمة على استخدام بعض المواد الكيميائية الضارة.	2026-04-08 18:29:37.160986+00
1269	vulnerable	هش	B2	adj.	Elderly people are particularly vulnerable to the effects of extreme heat.	كبار السن معرضون بشكل خاص لآثار الحرارة الشديدة.	2026-04-08 18:29:37.160986+00
1253	propose	يقترح	B2	v.	The lead researcher proposed an innovative and practical solution to the environmental challenges faced by urban areas.	اقترح الباحث الرئيسي حلاً مبتكراً وعملياً للمشكلة.	2026-04-08 18:29:37.160986+00
1267	vary	يتباين	B2	v.	Individual test scores vary considerably depending on how well students prepare for the exam.	درجات الاختبار الفردية تختلف بشكل كبير حسب أداء الطلاب.	2026-04-08 18:29:37.160986+00
1271	associated	مرتبط	B2	adj.	The costs associated with climate inaction far exceed those of prevention.	التكاليف المرتبطة بعدم اتخاذ إجراء مناخي تفوق بكثير تكاليف الوقاية.	2026-04-08 18:29:37.160986+00
1272	burden	عبء	B2	n.	Poor communities often bear the greatest burden of environmental damage.	المجتمعات الفقيرة غالباً ما تتحمل أكبر عبء من الأضرار البيئية.	2026-04-08 18:29:37.160986+00
1273	comparable	قابل للمقارنة	B2	adj.	The two cities show comparable levels of urban air pollution.	تظهر المدينتان مستويات قابلة للمقارنة من تلوث الهواء الحضري.	2026-04-08 18:29:37.160986+00
1274	concrete	محسوس	B2	adj.	Use concrete examples to support abstract arguments in your essay.	استخدم أمثلة محسوسة لدعم الحجج المجردة في مقالتك.	2026-04-08 18:29:37.160986+00
1276	dependency	اعتماد	B2	n.	Fossil fuel dependency is one of the main barriers to climate progress.	الاعتماد على الوقود الأحفوري يعتبر أحد العوائق الرئيسية أمام التقدم المناخي.	2026-04-08 18:29:37.160986+00
1278	distribution	توزيع	B2	n.	The distribution of wealth remains deeply unequal across the globe.	توزيع الثروة يبقى غير متساوٍ بشكل عميق في جميع أنحاء العالم.	2026-04-08 18:29:37.160986+00
1281	expertise	خبرة	B2	n.	The project required the expertise of scientists from several disciplines.	تطلب المشروع خبرة العلماء من عدة تخصصات.	2026-04-08 18:29:37.160986+00
1282	instance	مثال	B2	n.	For instance, Sweden generates over half its energy from renewable sources.	على سبيل المثال، تولد السويد أكثر من نصف طاقتها من مصادر متجددة.	2026-04-08 18:29:37.160986+00
1283	overview	نظرة عامة	B2	n.	The introduction should provide a brief overview of the main trends.	يجب أن تقدم المقدمة نظرة عامة موجزة للاتجاهات الرئيسية.	2026-04-08 18:29:37.160986+00
1284	perspective	منظور	B2	n.	A global perspective is essential when discussing climate change.	المنظور العالمي ضروري عند مناقشة تغير المناخ.	2026-04-08 18:29:37.160986+00
1285	shift	تحول	B2	n.	There has been a significant cultural shift towards plant-based diets.	حدث تحول ثقافي كبير نحو الوجبات الغذائية النباتية.	2026-04-08 18:29:37.160986+00
1287	arise	ينشأ	B2	v.	Ethical questions arise when using artificial intelligence in research.	تنشأ أسئلة أخلاقية عند استخدام الذكاء الاصطناعي في البحث العلمي.	2026-04-08 18:29:37.160986+00
1288	awareness	وعي	B2	n.	Public awareness of environmental issues has increased significantly.	زاد الوعي العام بالقضايا البيئية بشكل كبير.	2026-04-08 18:29:37.160986+00
1289	framework	إطار عمل	B2	n.	An international framework is needed for consistent emissions monitoring.	يُحتاج إلى إطار عمل دولي لمراقبة الانبعاثات بشكل متسق.	2026-04-08 18:29:37.160986+00
1290	guideline	مبدأ توجيهي	B2	n.	Follow the published guidelines when planning your Task 2 essay.	اتبع المبادئ التوجيهية المنشورة عند التخطيط لمقالة المهمة 2.	2026-04-08 18:29:37.160986+00
1292	inadequate	غير كافٍ	B2	adj.	Wholly inadequate investment in public education severely limits development.	الاستثمار غير الكافي كلياً في التعليم العام يحد بشدة من التنمية.	2026-04-08 18:29:37.160986+00
1294	norm	معيار	B2	n.	Household recycling is becoming the accepted norm in many developed cities.	إعادة التدوير المنزلي أصبحت معياراً مقبولاً في العديد من المدن المتقدمة.	2026-04-08 18:29:37.160986+00
1295	adolescent	مراهق	B2	n.	Adolescents need clear guidance and consistent support at home.	المراهقون يحتاجون إلى توجيه واضح ودعم مستمر في البيت.	2026-04-08 18:29:37.160986+00
1296	advancement	تقدم	B2	n.	Technological advancement has transformed almost every industry.	التقدم التكنولوجي غيّر تقريباً كل صناعة.	2026-04-08 18:29:37.160986+00
1297	anxiety	قلق	B2	n.	Many students experience anxiety before important exams.	يشعر العديد من الطلاب بالقلق قبل الامتحانات المهمة.	2026-04-08 18:29:37.160986+00
1298	availability	توفر	B2	n.	The availability of clean water is a serious global concern.	توفر المياه النظيفة مصدر قلق عالمي خطير.	2026-04-08 18:29:37.160986+00
1299	boundary	حدود	B2	n.	The boundary between acceptable and unacceptable behaviour must be clear.	يجب أن تكون الحدود بين السلوك المقبول وغير المقبول واضحة.	2026-04-08 18:29:37.160986+00
1300	broadcast	يبث	B2	v.	The speech was broadcast live on national television and radio.	تم بث الخطاب مباشرة على التلفاز والراديو الوطني.	2026-04-08 18:29:37.160986+00
1301	capability	قدرة	B2	n.	The new technology increases the capability of small research teams.	التكنولوجيا الجديدة تزيد من قدرة فرق البحث الصغيرة.	2026-04-08 18:29:37.164528+00
1302	characteristic	خاصية	B2	n.	A key characteristic of good academic writing is clarity.	من خصائص الكتابة الأكاديمية الجيدة الوضوح.	2026-04-08 18:29:37.164528+00
1277	devote	يكرس	B2	v.	She devoted several years to researching the effects of ocean acidification.	كرست عدة سنوات لدراسة آثار تحمض المحيطات.	2026-04-08 18:29:37.160986+00
1279	engage	يشارك	B2	v.	Students who engage actively with feedback make faster progress.	الطلاب الذين يشاركون بنشاط مع الملاحظات يحققون تقدماً أسرع.	2026-04-08 18:29:37.160986+00
1280	exceed	يتجاوز	B2	v.	Current emissions far exceed the targets set in the Paris Agreement.	الانبعاثات الحالية تتجاوز بكثير الأهداف المحددة في اتفاق باريس.	2026-04-08 18:29:37.160986+00
1291	implement	ينفذ	B2	v.	New environmental policies must be implemented both quickly and effectively.	يجب تنفيذ السياسات البيئية الجديدة بسرعة وفعالية.	2026-04-08 18:29:37.160986+00
1293	innovation	ابتكار	B2	n.	Technological innovation is one of the most powerful drivers of economic growth and development.	الابتكار التكنولوجي هو أحد أقوى محركات النمو الاقتصادي.	2026-04-08 18:29:37.160986+00
1304	collective	جماعي	B2	adj.	Climate change requires a collective response from all countries.	تغير المناخ يتطلب رداً جماعياً من جميع الدول.	2026-04-08 18:29:37.164528+00
1307	curiosity	فضول	B2	n.	Curiosity is one of the most valuable qualities in a learner.	الفضول هو أحد أهم الصفات عند المتعلم.	2026-04-08 18:29:37.164528+00
1308	dedication	تفاني	B2	n.	Her dedication to studying every day was the key to her success.	كان تفانيها في الدراسة يومياً المفتاح إلى نجاحها.	2026-04-08 18:29:37.164528+00
1309	determination	إصرار	B2	n.	Determination and regular practice will improve your IELTS score.	الإصرار والممارسة المنتظمة ستحسن درجتك في الآيلتس.	2026-04-08 18:29:37.164528+00
1310	donation	تبرع	B2	n.	The school received a generous donation from a local business.	تلقت المدرسة تبرعاً سخياً من شركة محلية.	2026-04-08 18:29:37.164528+00
1316	aspire	يطمح	B2	v.	Many young students aspire to study at a leading international university.	يطمح العديد من الطلاب الشباب للدراسة في جامعة دولية رائدة.	2026-04-08 18:29:37.164528+00
1317	attribute	يعزو	B2	v.	Most climate scientists attribute the warming trend to human activity.	معظم علماء المناخ يعزون اتجاه الاحترار إلى النشاط البشري.	2026-04-08 18:29:37.164528+00
1318	biased	منحاز	B2	adj.	Media coverage of the political crisis was clearly and demonstrably biased.	غطاء الإعلام لأزمة سياسية كان منحازاً بوضوح وجلي.	2026-04-08 18:29:37.164528+00
1320	coherent	متماسك	B2	adj.	A coherent argument is both logically organised and internally consistent.	الحجة المتماسكة تكون منظمة منطقياً ومتسقة داخلياً.	2026-04-08 18:29:37.164528+00
1321	coincide	يتزامن	B2	v.	The severe drought coincided with an unusually warm and dry winter season.	الجفاف الشديد تزامن مع موسم شتاء غير عادي وجاف وحار.	2026-04-08 18:29:37.164528+00
1325	consensus	إجماع	B2	n.	There is now a broad international consensus on the need for climate action.	هناك الآن إجماع دولي واسع على الحاجة للعمل المناخي.	2026-04-08 18:29:37.164528+00
1327	credible	موثوق	B2	adj.	Students should always use credible and peer-reviewed sources in essays.	يجب على الطلاب استخدام مصادر موثوقة وخاضعة لمراجعة الأقران في المقالات.	2026-04-08 18:29:37.164528+00
1330	differentiate	يميز	B2	v.	Strong students can clearly differentiate between fact and opinion.	الطلاب الأقوياء يستطيعون التمييز بوضوح بين الحقائق والآراء.	2026-04-08 18:29:37.164528+00
1331	dimension	بُعد	B2	n.	The social dimension of widespread poverty is frequently overlooked.	البُعد الاجتماعي للفقر الواسع الانتشار غالباً ما يتم تجاهله.	2026-04-08 18:29:37.164528+00
1333	dynamic	ديناميكي	B2	adj.	Urban environments are inherently dynamic and constantly evolving over time.	البيئات الحضرية ديناميكية بطبيعتها وتتطور باستمرار بمرور الوقت.	2026-04-08 18:29:37.164528+00
1306	compromise	حل وسط	B2	n.	Both sides reached a compromise after several hours of negotiation.	توصل الطرفان إلى توافق بعد عدة ساعات من التفاوض.	2026-04-08 18:29:37.164528+00
1311	earnings	أرباح	B2	n.	Average earnings in the technology sector have risen significantly.	شهدت الأرباح المتوسطة في قطاع التكنولوجيا ارتفاعاً كبيراً.	2026-04-08 18:29:37.164528+00
1312	affirm	يؤكد	B2	v.	The new evidence affirms the link between diet and long-term health outcomes.	الأدلة الجديدة تؤكد الصلة بين النظام الغذائي والنتائج الصحية طويلة الأجل.	2026-04-08 18:29:37.164528+00
1313	amplify	يضخم	B2	v.	Social media algorithms can rapidly amplify false or misleading information.	خوارزميات وسائل التواصل الاجتماعي يمكنها تضخيم المعلومات الخاطئة أو المضللة بسرعة.	2026-04-08 18:29:37.164528+00
1314	anticipate	يتوقع	B2	v.	Economists widely anticipate a prolonged period of slower economic growth.	الاقتصاديون يتوقعون على نطاق واسع فترة طويلة من النمو الاقتصادي الأبطأ.	2026-04-08 18:29:37.164528+00
1315	articulate	يعبر عن	B2	v.	Effective writers are able to articulate complex ideas with great clarity.	الكتاب الفعالون قادرون على التعبير عن الأفكار المعقدة بوضوح كبير.	2026-04-08 18:29:37.164528+00
1319	catalyst	محفز	B2	n.	Education acts as a powerful catalyst for economic and social change.	التعليم يعمل كعامل حفز قوي للتغيير الاقتصادي والاجتماعي.	2026-04-08 18:29:37.164528+00
1326	contradict	يتناقض	B2	v.	The newly discovered evidence directly contradicts the findings of earlier studies on the subject.	الأدلة المكتشفة حديثاً تتناقض بشكل مباشر مع نتائج الدراسات السابقة.	2026-04-08 18:29:37.164528+00
1323	competence	كفاءة	B2	n.	Language competence is assessed across all four of the core IELTS skills.	يتم تقييم الكفاءة اللغوية عبر جميع المهارات الأساسية الأربع في IELTS.	2026-04-08 18:29:37.164528+00
1329	deplete	يستنزف	B2	v.	Fossil fuels are being depleted at an alarming and unsustainable rate.	تُستنزف الوقود الأحفوري بمعدل مثير للقلق وغير مستدام.	2026-04-08 18:29:37.164528+00
1332	discriminate	يميّز	B2	v.	It is both illegal and unethical to discriminate based on race or gender.	من غير القانوني وغير الأخلاقي التمييز على أساس العرق أو النوع الاجتماعي.	2026-04-08 18:29:37.164528+00
1322	compensate	يعوض	B2	v.	Higher wages partially compensate workers for difficult or dangerous working conditions.	الأجور الأعلى تعوض جزئياً العمال عن الأعمال الصعبة أو الخطرة.	2026-04-08 18:29:37.164528+00
1335	enhance	يحسّن	B2	v.	The effective use of technology can significantly enhance the quality of education and learning outcomes.	الاستخدام الفعال للتكنولوجيا يمكن أن يحسّن نوعية الحياة بشكل كبير.	2026-04-08 18:29:37.164528+00
1336	ethical	أخلاقي	B2	adj.	All forms of scientific research must be governed by strict ethical guidelines.	يجب أن تكون جميع أشكال البحث العلمي مرتبطة بإرشادات أخلاقية صارمة.	2026-04-08 18:29:37.164528+00
1337	evident	واضح	B2	adj.	It is clearly evident from the available data that global emissions are rising.	من الواضح تماماً من البيانات المتاحة أن الانبعاثات العالمية آخذة في الارتفاع.	2026-04-08 18:29:37.164528+00
1338	excessive	مفرط	B2	adj.	Excessive use of smartphones has been linked to mental health problems.	الاستخدام المفرط للهواتف الذكية قد ارتبط بمشاكل الصحة العقلية.	2026-04-08 18:29:37.164528+00
1339	explicit	صريح	B2	adj.	Always provide explicit and well-supported evidence to strengthen your claims.	قدم دائماً أدلة صريحة وموثوقة لتقوية ادعاءاتك.	2026-04-08 18:29:37.164528+00
1344	precise	دقيق	B2	adj.	Precise and carefully sourced data is essential for accurate analysis.	البيانات الدقيقة والمصدرة بعناية أساسية للتحليل الدقيق.	2026-04-08 18:29:37.164528+00
1354	transparent	شفاف	B2	adj.	All government financial decisions and spending should be fully transparent.	يجب أن تكون جميع القرارات المالية والإنفاقية للحكومة شفافة تماماً.	2026-04-08 18:29:37.164528+00
1356	variable	متغير	B2	n.	Temperature is the most important variable in the entire climate model.	درجة الحرارة هي أهم متغير في نموذج المناخ بأكمله.	2026-04-08 18:29:37.164528+00
1358	abbreviate	يختصر	B2	v.	You can abbreviate long titles in your essay after introducing them in full.	يمكنك اختصار العناوين الطويلة في مقالتك بعد إدراجها كاملة.	2026-04-08 18:29:37.164528+00
1362	absorb	يمتص	B2	v.	Forests absorb vast quantities of carbon dioxide from the atmosphere.	تمتص الغابات كميات هائلة من ثاني أكسيد الكربون من الغلاف الجوي.	2026-04-08 18:29:37.164528+00
1343	overlap	يتداخل	B2	v.	The findings of these two independent studies overlap considerably.	تتداخل نتائج هاتين الدراستين المستقلتين بشكل كبير.	2026-04-08 18:29:37.164528+00
1345	prioritise	يُعطي الأولوية	B2	v.	Governments should clearly prioritise substantial investment in clean energy.	يجب على الحكومات إعطاء الأولوية بوضوح للاستثمار الكبير في الطاقة النظيفة.	2026-04-08 18:29:37.164528+00
1347	refine	يُحسّن	B2	v.	The lead researcher refined the original theoretical model after initial testing.	حسّن الباحث الرئيسي النموذج النظري الأصلي بعد الاختبار الأولي.	2026-04-08 18:29:37.164528+00
1349	restrict	يقيّد	B2	v.	Some governments attempt to restrict public access to social media.	تحاول بعض الحكومات تقييد الوصول العام إلى وسائل التواصل الاجتماعي.	2026-04-08 18:29:37.164528+00
1350	retain	يحتفظ	B2	v.	Regularly reviewing new vocabulary is essential in order to retain it.	مراجعة المفردات الجديدة بانتظام ضرورية من أجل الاحتفاظ بها.	2026-04-08 18:29:37.164528+00
1346	radical	جذري	B2	adj.	A radical and fundamental change in our lifestyle is necessary to reduce environmental degradation and promote sustainability.	يلزم إجراء تغيير جذري وأساسي في أسلوب حياتنا لتقليل الانبعاثات.	2026-04-08 18:29:37.164528+00
1361	abolish	يُلغي	B2	v.	Several countries have abolished the death penalty in recent decades.	ألغت عدة دول عقوبة الإعدام في العقود الأخيرة.	2026-04-08 18:29:37.164528+00
1363	accuracy	دقة	B2	n.	Accuracy in data presentation is essential for a high IELTS score.	الدقة في عرض البيانات أمر ضروري للحصول على درجة عالية في اختبار الآيلتس.	2026-04-08 18:29:37.164528+00
1355	universal	عالمي	B2	adj.	Access to affordable clean water should be recognised as a universal human right.	يجب الاعتراف بالوصول إلى المياه النظيفة الميسورة كحق إنساني عالمي.	2026-04-08 18:29:37.164528+00
1348	resilient	مرن	B2	adj.	Resilient communities recover more quickly and effectively from natural disasters and crises.	المجتمعات المرنة تتعافى بسرعة وفعالية أكبر من الكوارث الطبيعية.	2026-04-08 18:29:37.164528+00
1366	coordinate	ينسق	B2	v.	Several international agencies coordinate their efforts to tackle cross-border environmental and social issues.	تنسق عدة وكالات دولية جهودها لمعالجة القضايا العابرة للحدود.	2026-04-08 18:29:37.164528+00
1340	extensive	واسع	B2	adj.	Extensive and systematic research has been conducted globally on climate change and its impacts.	تم إجراء بحث واسع ومنهجي على مستوى عالمي حول تغير المناخ.	2026-04-08 18:29:37.164528+00
1351	scope	نطاق	B2	n.	The scope of the research was limited by available time and financial constraints.	كان نطاق البحث محدوداً بالوقت المتاح والموارد المالية.	2026-04-08 18:29:37.164528+00
1371	identification	تحديد / تعريف	B2	n.	The identification of the main variable was the first and most critical step.	تحديد المتغير الرئيسي كان الخطوة الأولى والأكثر أهمية في الدراسة	2026-04-08 18:29:37.164528+00
1372	interpretation	تفسير / تحليل	B2	n.	A careful interpretation of results avoids overstating their significance.	التفسير الحذر للنتائج يتجنب المبالغة في أهميتها	2026-04-08 18:29:37.164528+00
1374	obligation	التزام	B2	n.	Researchers have a professional obligation to report their findings honestly.	للباحثين التزام مهني بالإبلاغ عن نتائجهم بصراحة وأمانة.	2026-04-08 18:29:37.164528+00
1375	participation	مشاركة	B2	n.	Active participation from all team members improved the quality of the project.	المشاركة الفعالة من جميع أعضاء الفريق حسّنت من جودة المشروع.	2026-04-08 18:29:37.164528+00
1378	legitimate	مشروع / صحيح	B2	adj.	There are clearly legitimate concerns about the protection of personal data.	هناك بوضوح مخاوف مشروعة بشأن حماية البيانات الشخصية.	2026-04-08 18:29:37.164528+00
1379	paradox	تناقض / مفارقة	B2	n.	It is a paradox that greater connectivity can lead to deeper personal isolation.	إنها مفارقة أن التواصل الأكبر يمكن أن يؤدي إلى عزلة شخصية أعمق.	2026-04-08 18:29:37.164528+00
1384	provoke	يثير، يستفز	B2	v.	The controversial study provoked significant debate across academic circles.	الدراسة المثيرة للجدل استفزت نقاشاً كبيراً في الأوساط الأكاديمية.	2026-04-08 18:29:37.164528+00
1385	sequence	تسلسل، ترتيب متتالي	B2	n.	A strong IELTS essay follows a clear and logical sequence of ideas.	مقالة IELTS القوية تتبع تسلسلاً واضحاً ومنطقياً للأفكار.	2026-04-08 18:29:37.164528+00
1387	avert	يمنع، يحول دون	B2	v.	Bold and immediate policy action could yet avert the worst climate outcomes.	يمكن للعمل السياسي الجريء والفوري أن يحول دون أسوأ النتائج المناخية.	2026-04-08 18:29:37.164528+00
1388	concede	يعترف	B2	v.	Even the most sceptical reviewers were eventually forced to concede the point.	حتى أكثر المراجعين تشكيكاً أجبروا في النهاية على الاعتراف بالنقطة.	2026-04-08 18:29:37.164528+00
1391	diligent	مجتهد	B2	adj.	Diligent and consistent revision of vocabulary is the most effective study habit.	المراجعة المجتهدة والمستمرة للمفردات هي أكثر عادة دراسية فعالة.	2026-04-08 18:29:37.164528+00
1383	infer	يستنتج	B2	v.	What can we legitimately infer from the limited data presented in the graph?	ماذا يمكننا أن نستنتج بشرعية من البيانات المحدودة المعروضة في الرسم البياني؟	2026-04-08 18:29:37.164528+00
1373	negotiation	تفاوض	B2	n.	Successful negotiation between stakeholders is often necessary in applied research to achieve mutually beneficial outcomes.	التفاوض الناجح بين أصحاب المصلحة ضروري غالباً في المجالات التطبيقية.	2026-04-08 18:29:37.164528+00
1376	placement	موضع	B2	n.	The placement of key information in the abstract affects the paper's visibility.	موضع المعلومات الأساسية في الملخص يؤثر على ظهور البحث.	2026-04-08 18:29:37.164528+00
1377	recommendation	توصية	B2	n.	The committee's recommendation was accepted and implemented promptly.	تمت الموافقة على توصية اللجنة وتنفيذها بسرعة.	2026-04-08 18:29:37.164528+00
1368	empower	يمكن	B2	v.	Access to quality education fundamentally empowers individuals to improve their socioeconomic status.	يمنح الوصول إلى التعليم الجيد الأفراد القدرة على تحسين ظروفهم بشكل معنوي.	2026-04-08 18:29:37.164528+00
1398	ambiguity	غموض، التباس	B2	n.	The inherent ambiguity of the original wording led to serious misinterpretation.	أدى الغموض المتأصل في الصيغة الأصلية إلى سوء فهم خطير.	2026-04-08 18:29:37.164528+00
1408	allege	يدعي، يزعم	B2	v.	The complaint alleged a systematic failure to obtain informed consent.	ادعت الشكوى فشلاً منهجياً في الحصول على الموافقة المستنيرة.	2026-04-08 18:29:37.168744+00
1414	analysis	تحليل	C1	n.	The analysis of the data showed some interesting results.	أظهر تحليل البيانات بعض النتائج المثيرة للاهتمام.	2026-04-08 18:29:37.168744+00
1415	biodiversity	التنوع البيولوجي	C1	n.	Tropical rainforests support an extraordinary level of global biodiversity.	تدعم غابات الأمازون المطيرة مستوى استثنائياً من التنوع البيولوجي العالمي.	2026-04-08 18:29:37.168744+00
1417	deforestation	إزالة الغابات	C1	n.	Large-scale deforestation leads directly to the loss of essential animal habitats.	إزالة الغابات على نطاق واسع تؤدي مباشرة إلى فقدان الموائل الحيوية للحيوانات.	2026-04-08 18:29:37.168744+00
1418	fertile	خصب، منتج	C1	adj.	Fertile and productive soil is absolutely necessary for successful farming.	التربة الخصبة والمنتجة ضرورية جداً للزراعة الناجحة.	2026-04-08 18:29:37.168744+00
1419	revenue	إيرادات	C1	n.	International tourism generates very significant revenue for local economies.	يولد السياحة الدولية إيرادات كبيرة جداً للاقتصادات المحلية.	2026-04-08 18:29:37.168744+00
1420	acquire	يكتسب	C1	v.	Children acquire language naturally through play and daily interaction.	يكتسب الأطفال اللغة بشكل طبيعي من خلال اللعب والتفاعل اليومي.	2026-04-08 18:29:37.168744+00
1421	advocate	يدعو	C1	v.	Health experts advocate regular physical activity for all ages.	يدعو خبراء الصحة إلى ممارسة النشاط البدني المنتظم لجميع الأعمار.	2026-04-08 18:29:37.168744+00
1422	allocate	يخصص	C1	v.	The government plans to allocate more funds to public education.	تخطط الحكومة لتخصيص المزيد من الأموال للتعليم العام.	2026-04-08 18:29:37.168744+00
1423	ambiguous	غامض	C1	adj.	The question was ambiguous and therefore difficult to interpret correctly.	كان السؤال غامضاً وبالتالي يصعب تفسيره بشكل صحيح.	2026-04-08 18:29:37.168744+00
1424	bias	انحياز	C1	n.	Media coverage of political issues can sometimes show significant bias.	التغطية الإعلامية للقضايا السياسية يمكن أن تظهر أحياناً انحيازاً كبيراً.	2026-04-08 18:29:37.168744+00
1425	conventional	تقليدي	C1	adj.	Conventional farming relies too heavily on artificial fertilisers.	الزراعة التقليدية تعتمد بشكل مفرط على الأسمدة الصناعية.	2026-04-08 18:29:37.168744+00
1426	criteria	معايير	C1	n.	IELTS essays are carefully judged against four main assessment criteria.	تُقيّم مقالات الآيلتس بعناية وفقاً لأربعة معايير تقييم رئيسية.	2026-04-08 18:29:37.168744+00
1989	wonder	يتساءل	A2	v.	She wondered what the future would bring.	تساءلت عما سيجلبه المستقبل.	2026-04-08 18:29:37.188719+00
1399	reflective	تأملي	B2	adj.	A reflective practitioner regularly and honestly examines their own assumptions to improve their professional practice.	الممارس التأملي يفحص بانتظام وصراحة افتراضاته الخاصة	2026-04-08 18:29:37.164528+00
1428	enforce	يفرض	C1	v.	Environmental regulations must now be enforced much more strictly.	يجب فرض اللوائح البيئية الآن بشكل أكثر صرامة.	2026-04-08 18:29:37.168744+00
1429	facilitate	يسهّل	C1	v.	Good transport infrastructure effectively facilitates economic growth.	البنية التحتية للنقل الجيدة تسهّل بفعالية النمو الاقتصادي.	2026-04-08 18:29:37.168744+00
1430	fluctuate	يتقلب	C1	v.	Global oil prices fluctuate constantly depending on supply and demand.	تتقلب أسعار النفط العالمية باستمرار حسب العرض والطلب.	2026-04-08 18:29:37.168744+00
1433	infrastructure	البنية التحتية	C1	n.	Poor infrastructure is one of the main limitations on economic development.	البنية التحتية الضعيفة هي أحد القيود الرئيسية على التنمية الاقتصادية.	2026-04-08 18:29:37.168744+00
1434	insight	رؤية / فهم عميق	C1	n.	The long-term study provides valuable insight into human behaviour patterns.	توفر الدراسة طويلة الأجل رؤية قيمة حول أنماط السلوك الإنساني.	2026-04-08 18:29:37.168744+00
1435	mechanism	آلية	C1	n.	Breathing is one of the most fundamental biological mechanisms of life.	التنفس هو إحدى أهم الآليات البيولوجية الأساسية للحياة.	2026-04-08 18:29:37.168744+00
1438	perception	إدراك / تصور	C1	n.	Our individual perception of the world is shaped by personal experience.	يتشكل إدراكنا الفردي للعالم من خلال الخبرة الشخصية.	2026-04-08 18:29:37.168744+00
1439	reinforce	يدعم	C1	v.	Well-chosen and relevant examples effectively reinforce the central argument.	الأمثلة المختارة بعناية والملائمة تدعم بفعالية الحجة الرئيسية.	2026-04-08 18:29:37.168744+00
1440	scenario	سيناريو	C1	n.	In the worst-case scenario, global sea levels could rise by two metres.	في أسوأ السيناريوهات، يمكن أن ترتفع مستويات سطح البحر العالمية بمقدار متر واحد.	2026-04-08 18:29:37.168744+00
1441	sector	قطاع	C1	n.	The renewable energy sector has been growing very rapidly for years.	قطاع الطاقة المتجددة كان ينمو بسرعة كبيرة جداً لسنوات عديدة.	2026-04-08 18:29:37.168744+00
1442	simultaneously	في نفس الوقت	C1	adv.	These two complex chemical processes occur simultaneously within the cell.	هذه العمليتان الكيميائيتان المعقدتان تحدثان في نفس الوقت داخل الخلية.	2026-04-08 18:29:37.168744+00
1443	specify	يحدد	C1	v.	Always specify clearly what type of graph you are describing.	حدد دائماً بوضوح نوع الرسم البياني الذي تصفه.	2026-04-08 18:29:37.168744+00
1444	statistical	إحصائي	C1	adj.	The report contains important and carefully analysed statistical data.	التقرير يحتوي على بيانات إحصائية مهمة وتم تحليلها بعناية.	2026-04-08 18:29:37.168744+00
1445	substitute	يستبدل	C1	v.	In many recipes you can easily substitute butter with a healthier alternative.	في العديد من الوصفات يمكنك بسهولة استبدال الزبدة ببديل أكثر صحة.	2026-04-08 18:29:37.168744+00
1446	trigger	يثير	C1	v.	Prolonged drought can trigger widespread food shortages and social unrest.	الجفاف المطول يمكن أن يثير نقصاً غذائياً واسع النطاق وعدم استقرار اجتماعي.	2026-04-08 18:29:37.168744+00
1447	ultimately	في النهاية	C1	adv.	Ultimately, both individuals and governments must take real responsibility.	في النهاية، يجب على الأفراد والحكومات جميعاً أن تتحمل مسؤولية حقيقية.	2026-04-08 18:29:37.168744+00
1454	interaction	تفاعل	C1	n.	The complex interaction between human activity and the climate is important.	التفاعل المعقد بين النشاط البشري والمناخ أمر مهم.	2026-04-08 18:29:37.168744+00
1990	absence	غياب	B1	n.	His absence from work was noticed by everyone.	لاحظ الجميع غيابه عن العمل.	2026-04-08 18:29:37.188719+00
1437	obtain	يحصل على	C1	v.	International students can usually obtain a visa at the local embassy.	يمكن للطلاب الدوليين عادة الحصول على تأشيرة في السفارة المحلية.	2026-04-08 18:29:37.168744+00
1448	undergo	يخضع	C1	v.	The global energy industry has undergone major and fundamental changes.	شهدت صناعة الطاقة العالمية تغييرات كبيرة وجوهرية.	2026-04-08 18:29:37.168744+00
1449	utilise	يستخدم	C1	v.	Students should actively utilise all available resources and support services.	يجب على الطلاب استخدام جميع الموارد والخدمات المتاحة بنشاط.	2026-04-08 18:29:37.168744+00
1450	accelerate	يسرّع	C1	v.	New policies could significantly accelerate the shift to clean energy.	يمكن للسياسات الجديدة أن تسرع بشكل كبير الانتقال إلى الطاقة النظيفة.	2026-04-08 18:29:37.168744+00
1451	attain	يحقق	C1	v.	Few students attain Band 8 without significant long-term preparation.	قلة من الطلاب يحققون Band 8 بدون تحضير طويل الأمد كبير.	2026-04-08 18:29:37.168744+00
1452	broaden	يوسّع	C1	v.	Reading widely helps broaden your academic vocabulary considerably.	القراءة الواسعة تساعد على توسيع مفرداتك الأكاديمية بشكل كبير.	2026-04-08 18:29:37.168744+00
1453	cite	يستشهد	C1	v.	Always cite your sources when using evidence in academic writing.	استشهد دائماً بمصادرك عند استخدام الأدلة في الكتابة الأكاديمية.	2026-04-08 18:29:37.168744+00
1455	minimise	يقلّل	C1	v.	Good planning helps minimise errors in IELTS writing tasks.	يساعد التخطيط الجيد على تقليل الأخطاء في مهام كتابة الآيلتس.	2026-04-08 18:29:37.168744+00
1456	sustain	يحافظ على	C1	v.	It is very difficult to sustain economic growth without environmental damage.	من الصعب جداً الحفاظ على النمو الاقتصادي بدون إضرار بالبيئة.	2026-04-08 18:29:37.168744+00
1457	accumulate	يتراكم	C1	v.	Debt can accumulate rapidly if spending is not carefully managed.	يمكن أن تتراكم الديون بسرعة إذا لم تُدار النفقات بعناية.	2026-04-08 18:29:37.168744+00
1431	hypothesis	الفرضية	C1	n.	The researcher carefully formulated and then tested a new scientific hypothesis to validate the theory.	صاغ الباحث بعناية فرضية علمية جديدة ثم اختبرها.	2026-04-08 18:29:37.168744+00
1462	incorporate	يدمج	C1	v.	Strong essays always incorporate a range of relevant and up-to-date data.	المقالات القوية تدمج دائماً مجموعة من البيانات الملائمة والحديثة.	2026-04-08 18:29:37.168744+00
1465	intervene	يتدخل	C1	v.	Governments must intervene effectively to regulate harmful industries.	يجب على الحكومات أن تتدخل بفعالية لتنظيم الصناعات الضارة.	2026-04-08 18:29:37.168744+00
1466	accompany	يرافق	C1	v.	Parents are asked to accompany their children on the school trip.	يطلب من الآباء أن يرافقوا أطفالهم في الرحلة المدرسية.	2026-04-08 18:29:37.168744+00
1467	automation	أتمتة	C1	n.	Automation is replacing many routine jobs in factories and offices.	الأتمتة تحل محل العديد من الوظائف الروتينية في المصانع والمكاتب.	2026-04-08 18:29:37.168744+00
1468	compassion	تعاطف	C1	n.	Showing compassion for others is an important human quality.	إظهار التعاطف تجاه الآخرين هو صفة إنسانية مهمة.	2026-04-08 18:29:37.168744+00
1469	duration	المدة	C1	n.	The duration of the exam is two hours and thirty minutes.	مدة الامتحان ساعتان وثلاثون دقيقة.	2026-04-08 18:29:37.168744+00
1470	editorial	افتتاحية	C1	n.	The newspaper published a strong editorial criticising the new policy.	نشرت الجريدة افتتاحية قوية تنتقد السياسة الجديدة.	2026-04-08 18:29:37.168744+00
1471	aggregate	المجموع	C1	n.	The aggregate data from all regions shows a consistent overall increase.	البيانات الإجمالية من جميع المناطق تظهر زيادة إجمالية ثابتة.	2026-04-08 18:29:37.168744+00
1472	arbitrary	تعسفي	C1	adj.	Critics argued that the selection process was arbitrary and unfair.	انتقد النقاد عملية الاختيار بأنها تعسفية وغير عادلة.	2026-04-08 18:29:37.168744+00
1473	benchmark	معيار	C1	n.	IELTS Band 7 is widely used as a benchmark for academic entry requirements.	يُستخدم نطاق IELTS 7 على نطاق واسع كمعيار لمتطلبات الدخول الأكاديمية.	2026-04-08 18:29:37.168744+00
1474	causal	سببي	C1	adj.	Researchers identified a clear causal link between diet and disease.	حدد الباحثون صلة سببية واضحة بين النظام الغذائي والمرض.	2026-04-08 18:29:37.168744+00
1475	commodity	سلعة	C1	n.	Clean water is an increasingly scarce and valuable commodity.	المياه النظيفة أصبحت سلعة نادرة وقيمة بشكل متزايد.	2026-04-08 18:29:37.168744+00
1477	concurrent	متزامن	C1	adj.	Two concurrent global trends are simultaneously reshaping the nature of work.	اتجاهان عالميان متزامنان يعيدان تشكيل طبيعة العمل في نفس الوقت.	2026-04-08 18:29:37.168744+00
1478	correlate	يرتبط	C1	v.	Academic achievement and early childhood nutrition tend to correlate strongly.	الإنجاز الأكاديمي والتغذية في الطفولة المبكرة يرتبطان بقوة.	2026-04-08 18:29:37.168744+00
1480	deviate	ينحرف	C1	v.	The final results deviate significantly from the original prediction.	النتائج النهائية تنحرف بشكل كبير عن التوقع الأصلي.	2026-04-08 18:29:37.168744+00
1481	diminish	ينخفض	C1	v.	Global biodiversity is rapidly diminishing due to widespread habitat destruction.	التنوع البيولوجي العالمي ينخفض بسرعة بسبب تدمير الموارد الطبيعية.	2026-04-08 18:29:37.168744+00
1483	empirical	تجريبي	C1	adj.	All scientific claims should be supported by solid empirical evidence.	يجب دعم جميع الادعاءات العلمية بأدلة تجريبية قوية وموثوقة.	2026-04-08 18:29:37.168744+00
1487	finite	محدود	C1	adj.	Fossil fuels are finite resources and will eventually run out completely.	الوقود الأحفوري موارد محدودة وستنفد في النهاية.	2026-04-08 18:29:37.168744+00
1488	fluctuation	تذبذب	C1	n.	There are significant seasonal fluctuations in annual rainfall across the region.	هناك تذبذبات موسمية كبيرة في معدل هطول الأمطار السنوي في المنطقة.	2026-04-08 18:29:37.168744+00
2201	symbolic	رمزي	B1	adj.	The gesture was symbolic of their commitment.	كان الفعل رمزاً لالتزامهم.	2026-04-08 18:29:37.200487+00
1459	comprehend	يفهم	C1	v.	Students must comprehend the full question before planning their answer.	يجب على الطلاب فهم السؤال كاملاً قبل التخطيط للإجابة.	2026-04-08 18:29:37.168744+00
1464	interdependent	مترابط	C1	adj.	Modern national economies are becoming increasingly interdependent.	الاقتصادات الوطنية الحديثة أصبحت متعاونة بشكل متزايد.	2026-04-08 18:29:37.168744+00
1476	comprise	يشمل	C1	v.	The committee comprises senior experts from over twenty countries.	اللجنة تتكون من خبراء كبار من أكثر من عشرين دولة.	2026-04-08 18:29:37.168744+00
1460	implication	دلالة	C1	n.	The study's findings have serious and far-reaching public health implications.	لنتائج الدراسة دلالات صحية عامة خطيرة وبعيدة المدى.	2026-04-08 18:29:37.168744+00
1486	erode	يتآكل	C1	v.	Coastal land is rapidly eroding as a direct consequence of rising sea levels.	تنجرف الأراضي الساحلية بسرعة كنتيجة مباشرة لارتفاع مستويات سطح البحر.	2026-04-08 18:29:37.168744+00
1461	incentive	حافز	C1	n.	Financial incentives can effectively encourage businesses to adopt green practices and technologies.	يمكن للحوافز المالية أن تشجع الشركات بفعالية على اعتماد الممارسات الخضراء.	2026-04-08 18:29:37.168744+00
1463	indicator	مؤشر	C1	n.	GDP alone is not a reliable indicator of a nation's overall wellbeing.	الناتج المحلي الإجمالي وحده ليس مؤشراً موثوقاً على الرفاهية العامة للدولة.	2026-04-08 18:29:37.168744+00
1490	hierarchy	تسلسل هرمي	C1	n.	A clear hierarchy of main ideas significantly improves essay cohesion.	يحسّن التسلسل الهرمي الواضح للأفكار الرئيسية تماسك المقالة بشكل كبير.	2026-04-08 18:29:37.168744+00
1493	indispensable	لا غنى عنه	C1	adj.	Critical thinking is an indispensable skill in academic study.	التفكير النقدي مهارة لا غنى عنها في الدراسة الأكاديمية.	2026-04-08 18:29:37.168744+00
1494	inherent	متأصل	C1	adj.	There is an inherent tension between rapid economic growth and sustainability.	هناك توتر متأصل بين النمو الاقتصادي السريع والاستدامة.	2026-04-08 18:29:37.168744+00
1501	perceive	يدرك	C1	v.	Different individuals perceive and assess risk very differently.	يدرك الأفراد المختلفون المخاطر ويقيمونها بطرق مختلفة جداً.	2026-04-08 18:29:37.172278+00
1502	persist	يستمر	C1	v.	The underlying problem will certainly persist unless sustained action is taken.	المشكلة الأساسية ستستمر بالتأكيد ما لم يتم اتخاذ إجراء مستدام.	2026-04-08 18:29:37.172278+00
1503	phenomenon	ظاهرة	C1	n.	Global warming is both a natural and a human-induced complex phenomenon.	الاحترار العالمي هو ظاهرة معقدة طبيعية وناجمة عن الإنسان.	2026-04-08 18:29:37.172278+00
1504	plausible	معقول	C1	adj.	The proposed argument is theoretically plausible but lacks strong evidence.	الحجة المقترحة معقولة من الناحية النظرية لكنها تفتقر إلى أدلة قوية.	2026-04-08 18:29:37.172278+00
1508	premise	الافتراض	C1	n.	The entire argument is constructed on a fundamentally flawed premise.	الحجة برمتها مبنية على افتراض معيب بشكل أساسي.	2026-04-08 18:29:37.172278+00
1510	profound	عميق	C1	adj.	Climate change will have a profound and lasting effect on human societies.	سيكون لتغير المناخ تأثير عميق وطويل الأمد على المجتمعات البشرية.	2026-04-08 18:29:37.172278+00
1512	proportional	متناسب	C1	adj.	Any response to environmental threats should be proportional to their severity.	يجب أن يكون أي رد على التهديدات البيئية متناسباً مع خطورتها.	2026-04-08 18:29:37.172278+00
1515	rationale	المنطق	C1	n.	Always provide a clear and well-argued rationale for your main argument.	قدم دائماً منطقاً واضحاً وحجة قوية لحجتك الرئيسية.	2026-04-08 18:29:37.172278+00
1500	parameter	معامل	C1	n.	The precise parameters of the experiment were very carefully defined.	تم تحديد معاملات التجربة الدقيقة بعناية فائقة.	2026-04-08 18:29:37.168744+00
1505	polarise	يستقطب	C1	v.	The controversial immigration debate has deeply polarised public opinion.	نقاش الهجرة المثير للجدل استقطب الرأي العام بشكل عميق.	2026-04-08 18:29:37.172278+00
1506	precede	يسبق	C1	v.	Periods of significant economic decline often precede social unrest.	فترات الانخفاض الاقتصادي الكبير غالباً ما تسبق الاضطرابات الاجتماعية.	2026-04-08 18:29:37.172278+00
1507	predominantly	في معظمه	C1	adv.	The economy of this region is predominantly and historically agricultural.	اقتصاد هذه المنطقة زراعي بشكل أساسي وتاريخي.	2026-04-08 18:29:37.172278+00
1509	prevalent	سائد	C1	adj.	Chronic non-communicable diseases are becoming increasingly prevalent.	الأمراض المزمنة غير المعدية تصبح منتشرة بشكل متزايد.	2026-04-08 18:29:37.172278+00
1491	imminent	وشيك	C1	adj.	Leading scientists warn of an imminent and potentially catastrophic climate crisis.	يحذر العلماء البارزون من كارثة مناخية وشيكة وكارثية محتملة.	2026-04-08 18:29:37.168744+00
1514	quantify	يحدد كميًا	C1	v.	It is inherently difficult to fully quantify the true social costs of inequality.	من الصعب بطبيعته تحديد كمية التكاليف الاجتماعية الحقيقية للعدم المساواة بشكل كامل.	2026-04-08 18:29:37.172278+00
1499	methodology	المنهجية	C1	n.	The study's clearly explained research methodology has been widely praised.	تم الإشادة على نطاق واسع بمنهجية البحث الموضحة بوضوح في الدراسة.	2026-04-08 18:29:37.168744+00
1518	respective	على التوالي	C1	adj.	The students returned quietly to their respective assigned seats.	عاد الطلاب بهدوء إلى مقاعدهم الخاصة المخصصة.	2026-04-08 18:29:37.172278+00
1495	intrinsic	جوهري	C1	adj.	Education has profound intrinsic value that extends far beyond its direct economic benefits to society.	للتعليم قيمة جوهرية تتجاوز فوائده الاقتصادية المباشرة.	2026-04-08 18:29:37.168744+00
1498	marginal	هامشي	C1	adj.	The statistical difference between the two comparison groups was only marginally significant.	الفرق الإحصائي بين مجموعتي المقارنة كان هامشياً فقط.	2026-04-08 18:29:37.168744+00
1492	imperative	ضروري	C1	adj.	It is absolutely imperative that all governments take immediate and decisive action to address climate change.	من الضروري تماماً أن تتخذ جميع الحكومات إجراءات فورية وحاسمة.	2026-04-08 18:29:37.168744+00
1517	replicate	يستنسخ	C1	v.	All scientific experiments should be independently replicable to ensure the validity and reliability of the results.	يجب أن تكون جميع التجارب العلمية قابلة للتكرار بشكل مستقل لضمان الموثوقية.	2026-04-08 18:29:37.172278+00
1516	readily	بسهولة	C1	adv.	High-quality academic information is now more readily available online than ever before.	المعلومات الأكاديمية عالية الجودة متاحة الآن بسهولة أكثر عبر الإنترنت.	2026-04-08 18:29:37.172278+00
1526	structural	هيكلي	C1	adj.	Deep structural inequality severely limits social and economic mobility.	عدم المساواة الهيكلية العميقة تحد بشدة من الحراك الاجتماعي والاقتصادي.	2026-04-08 18:29:37.172278+00
1529	subtle	دقيق	C1	adj.	There is a subtle but important distinction between the two main arguments.	هناك تمييز دقيق لكن مهم بين الحجتين الرئيسيتين.	2026-04-08 18:29:37.172278+00
1538	abstain	يمتنع	C1	v.	She chose to abstain from voting on the controversial proposal.	اختارت الامتناع عن التصويت على الاقتراح المثير للجدل.	2026-04-08 18:29:37.172278+00
1539	accrue	يتراكم	C1	v.	Benefits accrue gradually over time through consistent and regular practice.	تتراكم الفوائد تدريجياً بمرور الوقت من خلال الممارسة المستمرة والمنتظمة.	2026-04-08 18:29:37.172278+00
1540	addendum	ملحق	C1	n.	The final addendum to the report addressed previously overlooked issues.	عالج الملحق النهائي للتقرير القضايا المتغاضي عنها سابقاً.	2026-04-08 18:29:37.172278+00
1541	adjacent	متجاور	C1	adj.	The adjacent plot of land has been earmarked for a new community garden.	تم تخصيص قطعة الأرض المتجاورة لحديقة مجتمعية جديدة.	2026-04-08 18:29:37.172278+00
1542	allude	يلمح	C1	v.	The researcher alludes to earlier seminal work without directly citing it.	يلمح الباحث إلى الأعمال السابقة المهمة دون الاستشهاد بها مباشرة.	2026-04-08 18:29:37.172278+00
2202	tough	صعب	B1	adj.	The exam was tough but she passed it.	كان الامتحان صعباً لكنها اجتازته.	2026-04-08 18:29:37.200487+00
1536	validate	يُتحقق من صحة	C1	v.	The independent results successfully validate the central hypothesis of the study.	أكدت النتائج المستقلة فرضية الدراسة الأساسية بنجاح.	2026-04-08 18:29:37.172278+00
1524	speculate	يتكهن	C1	v.	Some researchers speculate that early diet may affect long-term memory development and cognitive function.	يتكهن بعض الباحثين بأن النظام الغذائي المبكر قد يؤثر على الذاكرة طويلة الأمد.	2026-04-08 18:29:37.172278+00
1523	solidarity	تضامن	C1	n.	International solidarity and genuine cooperation are absolutely essential in addressing global challenges effectively.	التضامن والتعاون الدولي ضروريان في معالجة المشاكل العالمية.	2026-04-08 18:29:37.172278+00
1527	subjective	ذاتي	C1	adj.	Personal opinions are inherently subjective and vary greatly between individuals and cultures.	الآراء الشخصية ذاتية بطبيعتها وتختلف بشكل كبير بين الأفراد.	2026-04-08 18:29:37.172278+00
1528	subsequent	لاحق	C1	adj.	Subsequent independent research fully confirmed the validity of the initial findings.	أكدت الأبحاث المستقلة اللاحقة صحة الفرضية الأولية.	2026-04-08 18:29:37.172278+00
1531	synthesise	يُركّب	C1	v.	Effective academic writers synthesise information from multiple credible sources to support their arguments.	يدمج الكتاب الأكاديميون الفعالون المعلومات من مصادر موثوقة متعددة.	2026-04-08 18:29:37.172278+00
1530	supplement	يكمل	C1	v.	Students are encouraged to supplement their studies with additional reading materials and online resources.	يُشجع الطلاب على إكمال دراستهم بمواد إضافية.	2026-04-08 18:29:37.172278+00
1533	threshold	عتبة	C1	n.	Achieving IELTS Band 7 is a very demanding and competitive threshold for many international students seeking academic and professional opportunities.	تحقيق الفرقة 7 في الآيلتس يمثل حداً أدنى صعباً وتنافسياً جداً.	2026-04-08 18:29:37.172278+00
1521	scrutiny	فحص دقيق	C1	n.	All government policies and spending decisions should be subject to close scrutiny and public accountability.	يجب أن تخضع جميع سياسات الحكومة وقرارات الإنفاق للفحص الدقيق.	2026-04-08 18:29:37.172278+00
1546	anomaly	شذوذ	C1	n.	The outlying data point was treated as a statistical anomaly and excluded from the final analysis to ensure accuracy.	تم التعامل مع نقطة البيانات الشاذة باعتبارها شذوذاً إحصائياً وتم استبعادها.	2026-04-08 18:29:37.172278+00
1567	cursory	سريع، سطحي	C1	adj.	A cursory and superficial reading of the available evidence is wholly insufficient.	القراءة السطحية والسريعة للأدلة المتاحة غير كافية تماماً.	2026-04-08 18:29:37.172278+00
1577	acute	حاد	C1	adj.	Many cities are experiencing an acute shortage of affordable housing.	تواجه العديد من المدن نقصاً حاداً في الإسكان الميسور التكلفة.	2026-04-08 18:29:37.172278+00
1578	ambivalent	متناقض الآراء	C1	adj.	Public opinion remains ambivalent on the issue of genetic engineering.	يبقى الرأي العام متناقض الآراء بشأن قضية الهندسة الوراثية.	2026-04-08 18:29:37.172278+00
2203	trust	يثق	B1	v.	She trusts her team to deliver results.	تثق بفريقها لتحقيق النتائج.	2026-04-08 18:29:37.200487+00
1551	benevolent	خيّر، إنساني	C1	adj.	The charitable organisation played a genuinely benevolent role in the local community by providing essential support to those in need.	لعبت المنظمة الخيرية دوراً إنسانياً حقيقياً في المجتمع المحلي.	2026-04-08 18:29:37.172278+00
1579	assimilate	يستوعب	C1	v.	It takes considerable time to fully assimilate all the ideas in complex texts.	يتطلب الأمر وقتاً كبيراً لاستيعاب جميع الأفكار في النصوص المعقدة بشكل كامل.	2026-04-08 18:29:37.172278+00
1552	bilateral	ثنائي	C1	adj.	The two nations concluded a landmark bilateral trade and environmental agreement to promote sustainable development.	أبرمت الدولتان الحدوديتان اتفاقية تجارية ثنائية تاريخية.	2026-04-08 18:29:37.172278+00
1583	conceive	يتصور	C1	v.	It is hard to conceive of a prosperous world without affordable clean energy.	من الصعب تصور عالم مزدهر بدون الطاقة النظيفة والميسورة التكلفة.	2026-04-08 18:29:37.172278+00
1584	decimate	يقضي على	C1	v.	Habitat loss has decimated many native bird populations worldwide.	أدى فقدان الموارد الطبيعية إلى القضاء على العديد من تجمعات الطيور المحلية في جميع أنحاء العالم.	2026-04-08 18:29:37.172278+00
1590	depreciate	ينخفض في القيمة	C1	v.	New assets can depreciate in value significantly within just a few years.	قد تنخفض قيمة الأصول الجديدة بشكل كبير في غضون بضع سنوات فقط.	2026-04-08 18:29:37.172278+00
1592	discern	يميز	C1	v.	It is possible to discern a clear and consistent pattern in the longitudinal data.	من الممكن تمييز نمط واضح ومتسق في البيانات الطولية.	2026-04-08 18:29:37.172278+00
1593	dissent	الاختلاف	C1	n.	Scientific dissent plays a valuable and important role in advancing knowledge.	يلعب الاختلاف العلمي دوراً قيماً ومهماً في تقدم المعرفة.	2026-04-08 18:29:37.172278+00
1606	immutable	ثابت، غير قابل للتغيير	C1	adj.	No physical law is truly immutable; all are subject to revision and refinement.	لا يوجد قانون فيزيائي ثابت تماماً؛ كلها قابلة للمراجعة والتطوير.	2026-04-08 18:29:37.176313+00
1667	stoic	رزين / متحمل	C1	adj.	A stoic acceptance of failure is not the same as a genuine willingness to learn.	التقبل الرزين للفشل ليس مثل الاستعداد الحقيقي للتعلم.	2026-04-08 18:29:37.176313+00
1582	compelling	مقنع	C1	adj.	The documentary presents a genuinely compelling case for fundamental reforms in environmental policy.	يقدم الفيلم الوثائقي حالة مقنعة حقاً لإجراء تغيير جذري.	2026-04-08 18:29:37.172278+00
1581	chronic	مزمن	C1	adj.	Chronic underfunding of public health systems leads to consistently poor health outcomes for vulnerable populations.	يؤدي التمويل المزمن الناقص لأنظمة الصحة العامة إلى نتائج سيئة متسقة.	2026-04-08 18:29:37.172278+00
1580	autonomous	مستقل ذاتياً	C1	adj.	Autonomous vehicles may fundamentally transform urban transportation by improving safety and reducing congestion.	قد تحول المركبات المستقلة ذاتياً النقل الحضري بشكل جذري.	2026-04-08 18:29:37.172278+00
1585	deficient	ناقص	C1	adj.	A diet chronically deficient in essential vitamins can lead to serious health complications and disorders.	النظام الغذائي الذي يعاني من نقص مزمن في الفيتامينات الأساسية قد يؤدي إلى مشاكل صحية خطيرة.	2026-04-08 18:29:37.172278+00
1586	deft	ماهر	C1	adj.	The author was remarkably deft in weaving together multiple strands of narrative and analysis.	كان المؤلف ماهراً بشكل ملحوظ في نسج خيوط متعددة من السرد معاً.	2026-04-08 18:29:37.172278+00
1588	delve	يتعمق	C1	v.	The doctoral thesis delves deeply into the philosophical underpinnings of modern ethical theory.	تتعمق أطروحة الدكتوراه في الأسس الفلسفية للنظرية الحديثة.	2026-04-08 18:29:37.172278+00
1587	deleterious	ضار	C1	adj.	The deleterious long-term effects of air pollution on child development are well documented in numerous scientific studies.	الآثار الضارة طويلة الأجل لتلوث الهواء على نمو الأطفال موثقة جيداً.	2026-04-08 18:29:37.172278+00
1589	denounce	يندد	C1	v.	Several leading scientists publicly denounced the deliberate misrepresentation of research findings in the media.	أدان عدة علماء بارزين الحجج المتعمدة والمضللة في العلن.	2026-04-08 18:29:37.172278+00
1591	desist	يتوقف	C1	v.	Governments must desist from subsidising the fossil fuel industries to promote sustainable energy alternatives.	يجب على الحكومات أن تتوقف عن دعم صناعات الوقود الأحفوري.	2026-04-08 18:29:37.172278+00
1594	distort	يشوه	C1	v.	Political bias and vested interests can distort the public's understanding of important social and economic issues.	يمكن للانحياز السياسي والمصالح الخاصة أن تشوه فهم الجمهور للقضايا.	2026-04-08 18:29:37.172278+00
1613	incorrigible	مستعصٍ على الإصلاح، عنيد	C1	adj.	An incorrigible resistance to evidence is a serious obstacle to progress.	المقاومة المستعصية للأدلة تشكل عائقاً خطيراً أمام التقدم.	2026-04-08 18:29:37.176313+00
1630	overt	صريح، واضح	C1	adj.	There is now an overt and unambiguous acknowledgement of the role of technology in shaping modern society.	هناك الآن اعترافاً صريحاً بدور النشاط البشري في تغير المناخ.	2026-04-08 18:29:37.176313+00
1617	innocuous	غير ضار، براء	C1	adj.	What appears innocuous on the surface may have serious and far-reaching consequences for society.	ما يبدو غير ضار على السطح قد يكون له عواقب خطيرة وبعيدة المدى.	2026-04-08 18:29:37.176313+00
1615	indignant	غاضب، مستاء	C1	adj.	Many scientists were justifiably indignant at the widespread misrepresentation of their research findings in the media.	العديد من العلماء كانوا مستاءين بحق من تحريف المعلومات العلمية على نطاق واسع.	2026-04-08 18:29:37.176313+00
1609	impervious	معزول عن، غير متأثر بـ	C1	adj.	Some policymakers appear completely impervious to the overwhelming evidence presented by scientific experts.	بعض صناع السياسات يبدون معزولين تماماً عن الأدلة العلمية.	2026-04-08 18:29:37.176313+00
1631	panacea	دواء شامل، حل سحري	C1	n.	Technology alone is definitely not a panacea for all of society's deepest, most complex challenges.	التكنولوجيا وحدها ليست حلاً شاملاً لجميع مشاكل المجتمع الأعمق.	2026-04-08 18:29:37.176313+00
1632	parochial	ضيق الأفق، محدود النظر	C1	adj.	A parochial and narrow perspective severely and fundamentally limits our ability to understand complex global issues.	المنظور الضيق يحد بشدة من فهمنا للقضايا العالمية الأوسع.	2026-04-08 18:29:37.176313+00
1633	pedantic	متحذلق، مفرط في الدقة الشكلية	C1	adj.	Overly pedantic criticism of minor errors can obscure the genuine value and impact of the work.	الانتقاد المتطرف للأخطاء البسيطة قد يحجب القيمة الحقيقية للحجة القوية.	2026-04-08 18:29:37.176313+00
1634	perfunctory	شكلي، سطحي	C1	adj.	A perfunctory and superficial review of the literature is wholly inadequate for conducting rigorous academic research.	المراجعة الشكلية والسطحية للدراسات السابقة غير كافية تماماً لبحث جيد.	2026-04-08 18:29:37.176313+00
1635	pervasive	منتشر، واسع الانتشار	C1	adj.	The pervasive and inescapable influence of technology on modern daily life is undeniable and continues to reshape society.	التأثير المنتشر والواسع للتكنولوجيا على الحياة اليومية الحديثة لا يمكن إنكاره.	2026-04-08 18:29:37.176313+00
1636	placate	يُهدِّئ، يُرضي	C1	v.	Short-term and largely cosmetic measures were hurriedly introduced to placate public concerns about environmental degradation.	تم إدخال تدابير قصيرة الأجل على عجل لإرضاء الجمهور المتنامي.	2026-04-08 18:29:37.176313+00
1611	incentivise	حفز، شجع	C1	v.	Governments should incentivise companies to invest heavily in sustainable technologies and practices.	يجب على الحكومات أن تحفز الشركات على الاستثمار بكثافة في التنمية المستدامة.	2026-04-08 18:29:37.176313+00
1616	inimical	معاد، ضار	C1	adj.	Short-termism is fundamentally inimical to sustainable and responsible development in any sector.	التركيز على المدى القصير معاد بطبيعته للتنمية المستدامة والمسؤولة.	2026-04-08 18:29:37.176313+00
1614	incumbent	واجب، ملزم	C1	adj.	It is incumbent upon all researchers to disclose any potential conflicts of interest to maintain transparency.	من واجب جميع الباحثين الكشف عن أي تضارب محتمل في المصالح.	2026-04-08 18:29:37.176313+00
1612	incoherent	غير متماسك، مشوش	C1	adj.	An incoherent and poorly structured argument will fail to persuade even the most open-minded audience.	الحجة غير المتماسكة والضعيفة البناء ستفشل في إقناع حتى المستمعين المتسامحين.	2026-04-08 18:29:37.176313+00
1643	prodigious	هائل / ضخم	C1	adj.	The sheer volume of data collected during the study was truly prodigious.	الحجم الخام للبيانات المجمعة خلال الدراسة كان هائلاً حقاً.	2026-04-08 18:29:37.176313+00
1652	repudiate	ينبذ / يرفض	C1	v.	The entire scientific community promptly repudiated the fraudulent research.	رفضت المجتمع العلمي بأكمله البحث الاحتيالي على الفور.	2026-04-08 18:29:37.176313+00
1659	scepticism	شك / تشكك	C1	n.	Healthy and principled scepticism is a fundamental virtue in all scientific inquiry.	التشكك الصحي والمبدئي فضيلة أساسية في جميع البحوث العلمية.	2026-04-08 18:29:37.176313+00
1653	residual	متبقي / عالق	C1	adj.	Some residual uncertainty about the precise rate of warming still remains among climate scientists.	لا يزال هناك بعض عدم اليقين المتبقي حول المعدل الدقيق للاحترار.	2026-04-08 18:29:37.176313+00
1637	plethora	وفرة / كثرة	C1	n.	A plethora of peer-reviewed studies now strongly confirms the link between diet and long-term health outcomes.	وفرة من الدراسات المحكمة تؤكد الآن الرابط بين النظام الغذائي و...	2026-04-08 18:29:37.176313+00
1692	narrative	سرد	C1	n.	A coherent narrative helps readers follow the logic of a complex argument.	السرد المتسق يساعد القراء على متابعة منطق الحجة المعقدة.	2026-04-08 18:29:37.176313+00
1695	elucidate	يوضح	C1	v.	The professor attempted to elucidate the most complex theoretical concepts.	حاول الأستاذ توضيح أعقد المفاهيم النظرية.	2026-04-08 18:29:37.176313+00
1693	persistence	مثابرة	C1	n.	The persistence of the effect over time confirmed the robustness of the finding.	استمرارية التأثير بمرور الوقت أكدت على قوة وثبات النتيجة.	2026-04-08 18:29:37.176313+00
1694	elicit	يستخلص / يستثير	C1	v.	The survey was designed specifically to elicit honest and candid responses.	تم تصميم الاستطلاع على وجه التحديد لاستخراج ردود صريحة وصادقة.	2026-04-08 18:29:37.176313+00
1698	engender	يولد	C1	v.	Prolonged economic instability inevitably engenders widespread social anxiety.	عدم الاستقرار الاقتصادي المستمر يولد حتماً قلقاً اجتماعياً واسع النطاق.	2026-04-08 18:29:37.176313+00
1699	equitable	عادل	C1	adj.	An equitable distribution of resources is central to social justice.	التوزيع العادل للموارد أساسي للعدالة الاجتماعية.	2026-04-08 18:29:37.176313+00
1700	erroneous	خاطئ	C1	adj.	The conclusion was based entirely on erroneous and flawed assumptions.	بنيت الخلاصة بالكامل على افتراضات خاطئة وقاصرة.	2026-04-08 18:29:37.176313+00
1701	exacerbate	يفاقم، يزيد سوءاً	C1	v.	Worsening drought will significantly exacerbate the risk of food insecurity.	تفاقم الجفاف سيزيد بشكل كبير من خطر انعدام الأمن الغذائي.	2026-04-08 18:29:37.180604+00
1702	exhaustive	شامل، استقصائي	C1	adj.	An exhaustive review of all relevant literature is expected in doctoral theses.	يتوقع إجراء استعراض شامل لجميع الأدبيات ذات الصلة في الأطروحات الدكتوراه.	2026-04-08 18:29:37.180604+00
1704	fallacy	مغالطة	C1	n.	It is a fallacy to assume that economic growth always reduces poverty.	من المغالطة افتراض أن النمو الاقتصادي يقلل دائماً من الفقر.	2026-04-08 18:29:37.180604+00
1705	feasibility	الجدوى، الإمكانية	C1	n.	A detailed feasibility study was conducted before the project commenced.	تم إجراء دراسة جدوى مفصلة قبل بدء المشروع.	2026-04-08 18:29:37.180604+00
1706	foster	ينمي، يعزز	C1	v.	Education should actively foster creativity and truly independent thought.	يجب أن يعزز التعليم الإبداع والتفكير المستقل الحقيقي.	2026-04-08 18:29:37.180604+00
1710	indigenous	أصلي، أصيل	C1	adj.	Indigenous knowledge systems offer valuable insights into local ecology.	توفر أنظمة المعارف الأصيلة رؤى قيمة حول البيئة المحلية.	2026-04-08 18:29:37.180604+00
1711	interdisciplinary	متعدد التخصصات	C1	adj.	An interdisciplinary approach draws on multiple fields of specialised study.	يستمد النهج متعدد التخصصات على مجالات متعددة من الدراسة المتخصصة.	2026-04-08 18:29:37.180604+00
1713	lexical	متعلق بالمفردات / لغوي	C1	adj.	A wide and sophisticated lexical range is directly rewarded in IELTS Writing.	نطاق مفردات واسع وراقٍ يكافأ مباشرة في كتابة اختبار آيلتس.	2026-04-08 18:29:37.180604+00
1714	lucid	واضح / جلي	C1	adj.	A lucid explanation helps readers follow even complex arguments easily.	شرح واضح يساعد القارئ على متابعة حتى الحجج المعقدة بسهولة.	2026-04-08 18:29:37.180604+00
1715	manifest	يظهر / يتجلى	C1	v.	The consequences of deforestation manifest as severe biodiversity collapse.	تظهر عواقب إزالة الغابات كانهيار شديد في التنوع البيولوجي.	2026-04-08 18:29:37.180604+00
1717	meticulous	دقيق جداً / متأنٍ	C1	adj.	The researcher was meticulous in documenting every stage of the experiment.	كان الباحث دقيقاً جداً في توثيق كل مرحلة من مراحل التجربة.	2026-04-08 18:29:37.180604+00
1721	negligible	تافه / ضئيل جداً	C1	adj.	The statistical difference between the two groups was entirely negligible.	الفرق الإحصائي بين المجموعتين كان تافهاً تماماً.	2026-04-08 18:29:37.180604+00
1722	nuanced	دقيق / متوازن	C1	adj.	This complex issue requires careful, nuanced, and contextualised analysis.	هذه المسألة المعقدة تتطلب تحليلاً دقيقاً ومتوازناً وموضوعياً.	2026-04-08 18:29:37.180604+00
1723	objectivity	موضوعية	C1	n.	Rigorous academic writing demands the highest possible level of objectivity.	تتطلب الكتابة الأكاديمية الصارمة أعلى مستويات الموضوعية.	2026-04-08 18:29:37.180604+00
1725	paradigm	نموذج / مثال	C1	n.	The unexpected discovery led to a major paradigm shift in the entire field.	أدى الاكتشاف غير المتوقع إلى تحول كبير في النموذج في المجال بأكمله.	2026-04-08 18:29:37.180604+00
1726	paramount	بالغ الأهمية / حتمي	C1	adj.	Complete accuracy is of paramount importance in all academic writing.	الدقة الكاملة ذات أهمية بالغة في جميع أشكال الكتابة الأكاديمية.	2026-04-08 18:29:37.180604+00
1729	permeate	ينتشر / يتسرب	C1	v.	The effects of digital technology permeate every aspect of contemporary life.	تنتشر تأثيرات التكنولوجيا الرقمية في كل جوانب الحياة المعاصرة.	2026-04-08 18:29:37.180604+00
1730	perpetuate	يديم / يحافظ على استمرار	C1	v.	Discriminatory practices inevitably perpetuate deep-rooted social inequality.	الممارسات التمييزية لا تحتمل أن تديم عدم المساواة الاجتماعية المتجذرة.	2026-04-08 18:29:37.180604+00
1731	pertinent	ذو صلة / متعلق	C1	adj.	Only the most directly pertinent evidence should be included in the argument.	يجب تضمين الأدلة الأكثر صلة مباشرة فقط في الحجة.	2026-04-08 18:29:37.180604+00
1732	pivotal	حاسم / أساسي	C1	adj.	The 2015 Paris Agreement was genuinely pivotal in global climate negotiations.	اتفاق باريس 2015 كان حاسماً بحقيقة في المفاوضات المناخية العالمية.	2026-04-08 18:29:37.180604+00
1734	posit	يفترض / يطرح	C1	v.	The researcher posited that early dietary patterns are the primary cause.	افترض الباحث أن الأنماط الغذائية المبكرة هي السبب الأساسي.	2026-04-08 18:29:37.180604+00
1737	reductive	مختزل، مبسط بشكل مفرط	C1	adj.	A reductive analysis inevitably misrepresents genuinely complex phenomena.	التحليل المختزل لا يمثل بشكل صحيح الظواهر المعقدة حقاً.	2026-04-08 18:29:37.180604+00
1740	aberrant	شاذ، غير طبيعي	C1	adj.	The aberrant data point was removed before the final statistical analysis.	تم حذف نقطة البيانات الشاذة قبل التحليل الإحصائي النهائي.	2026-04-08 18:29:37.180604+00
1743	adhere	يلتزم	C1	v.	All participants must adhere strictly to the published ethical guidelines.	يجب على جميع المشاركين الالتزام الصارم بالإرشادات الأخلاقية المنشورة	2026-04-08 18:29:37.180604+00
1744	adjudicate	يحكم	C1	v.	An independent panel of experts will adjudicate the complex legal dispute.	ستقوم لجنة مستقلة من الخبراء بالحكم في النزاع القانوني المعقد	2026-04-08 18:29:37.180604+00
1745	admonish	يوبخ	C1	v.	The committee admonished the agency for its persistent lack of transparency.	وبخت اللجنة الوكالة على افتقارها المستمر إلى الشفافية	2026-04-08 18:29:37.180604+00
1746	dogmatic	عقائدي	C1	adj.	A rigidly dogmatic approach to policy consistently ignores contrary evidence.	يتجاهل النهج العقائدي الجامد باستمرار الأدلة المعاكسة	2026-04-08 18:29:37.180604+00
1748	epistemology	نظرية المعرفة	C1	n.	Epistemology is the philosophical study of what constitutes knowledge.	نظرية المعرفة هي الدراسة الفلسفية لما يشكل المعرفة	2026-04-08 18:29:37.180604+00
1752	fallacious	خاطئ / مغلوط	C1	adj.	The argument is weakened by a number of clearly fallacious assumptions.	الحجة ضعيفة بسبب عدد من الافتراضات الخاطئة بوضوح.	2026-04-08 18:29:37.180604+00
1754	granular	تفصيلي / دقيق	C1	adj.	A granular analysis of the data reveals patterns invisible at the macro level.	التحليل التفصيلي للبيانات يكشف عن أنماط غير مرئية على المستوى الأعم.	2026-04-08 18:29:37.180604+00
2246	unknown	مجهول	B1	adj.	The cause of the problem is still unknown.	سبب المشكلة لا يزال مجهولاً.	2026-04-08 18:29:37.200487+00
1741	accentuate	يُبرز / يُشدد على	C1	v.	The report accentuates the widening inequality gap between rich and poor in modern society.	التقرير يؤكد على اتساع الفجوة في عدم المساواة بين الأغنياء والفقراء	2026-04-08 18:29:37.180604+00
1727	partisan	متحيز / انحيازي	C1	adj.	Openly partisan and ideologically biased reporting significantly distorts public understanding of complex political issues.	التقارير المتحيزة بشكل واضح تشوه بشكل كبير فهم الجمهور للسياسات.	2026-04-08 18:29:37.180604+00
1749	esoteric	غامض/متخصص جداً	C1	adj.	The highly esoteric nature of the paper's content severely limited its readership.	الطبيعة الغامضة جداً لمحتوى الورقة حدت بشدة من عدد قارئيها	2026-04-08 18:29:37.180604+00
1755	groundbreaking	ثوري / مبتكر	C1	adj.	The study's findings were widely described as truly groundbreaking by experts.	وصفت نتائج الدراسة على نطاق واسع بأنها ثورية حقاً من قبل الخبراء.	2026-04-08 18:29:37.180604+00
1761	impetus	حافز / دافع	C1	n.	The unexpected discovery provided the critical impetus for new research.	الاكتشاف غير المتوقع وفّر الحافز الحاسم لأبحاث جديدة.	2026-04-08 18:29:37.180604+00
1764	inextricable	لا ينفصل / متشابك	C1	adj.	Poverty and poor health are inextricably and deeply linked in complex ways.	الفقر والصحة السيئة لا ينفصلان ومرتبطان بعمق بطرق معقدة.	2026-04-08 18:29:37.180604+00
1765	insidious	خطير / دسيس	C1	adj.	The insidious and cumulative effects of misinformation accumulate over time.	التأثيرات الخطيرة والمتراكمة للمعلومات المضللة تتراكم بمرور الوقت.	2026-04-08 18:29:37.180604+00
1771	proponent	مؤيد، داعم	C1	n.	She is widely regarded as one of the most influential proponents of sustainable development in modern society.	تُعتبر من أبرز المؤيدين للتعليم الرقمي في المنطقة.	2026-04-08 18:29:37.180604+00
1772	proliferate	ينتشر، يتكاثر	C1	v.	Social media platforms have proliferated with extraordinary and unprecedented speed in recent years.	منصات وسائل التواصل الاجتماعي انتشرت بشكل غير مسبوق.	2026-04-08 18:29:37.180604+00
1756	hegemony	هيمنة / سيطرة	C1	n.	Cultural hegemony can systematically and insidiously suppress minority voices throughout society.	الهيمنة الثقافية يمكن أن تقمع بشكل منهجي أصوات الأقليات.	2026-04-08 18:29:37.180604+00
1762	inaccessible	غير متاح / عصي على الفهم	C1	adj.	Dense technical jargon can render academic texts largely inaccessible to readers without specialized knowledge.	المصطلحات التقنية الكثيفة يمكن أن تجعل النصوص الأكاديمية غير متاحة إلى حد كبير.	2026-04-08 18:29:37.180604+00
1766	mandate	ألزم / فرض	C1	v.	The updated legislation mandates the use of appropriate safety equipment at all construction sites.	يفرض التشريع المحدّث استخدام معدات السلامة المناسبة في جميع الأوقات.	2026-04-08 18:29:37.180604+00
1776	abeyance	تعليق، تأجيل	C1	n.	The controversial development plans were held in abeyance pending further review by the planning committee.	تم تعليق خطط التطوير المثيرة للجدل في انتظار مزيد من التحقيقات.	2026-04-08 18:29:37.180604+00
1782	belabour	يكرر، يلح على	C1	v.	There is little scholarly value in continuing to belabour a point that has already been thoroughly addressed.	لا توجد قيمة علمية في الاستمرار في الإلحاح على نقطة تم...	2026-04-08 18:29:37.180604+00
1781	assiduous	مجتهد، دؤوب	C1	adj.	Her notably assiduous and systematic approach to reviewing all available evidence greatly enhanced the accuracy of her conclusions.	نهجها المجتهد والمنهجي الملحوظ في مراجعة جميع...	2026-04-08 18:29:37.180604+00
1807	homogeneous	متجانس	C1	adj.	The study sample was too homogeneous to be truly representative.	كانت عينة الدراسة متجانسة جداً لتكون ممثلة حقاً.	2026-04-08 18:29:37.18419+00
1942	excited	متحمس	A2	adj.	The children were excited about the school trip.	كان الأطفال متحمسين للرحلة المدرسية.	2026-04-08 18:29:37.188719+00
1787	clandestine	سري، خفي	C1	adj.	The clandestine nature of the negotiations undermined subsequent public trust and confidence in the process.	الطبيعة السرية والخفية المتعمدة للعملية الحساسة الجارية...	2026-04-08 18:29:37.180604+00
1800	elusive	غامض، صعب المنال	C1	adj.	A truly satisfactory solution to the problem has so far proven frustratingly elusive.	حل مرضٍ حقا للمشكلة أثبت أنه بطريقة محبطة...	2026-04-08 18:29:37.180604+00
1799	egalitarian	مساواتي / يؤمن بالمساواة	C1	adj.	A truly egalitarian education system gives every child an equal opportunity.	نظام تعليمي متساوي حقيقي يعطي كل طفل فرصة متساوية.	2026-04-08 18:29:37.180604+00
1810	judicious	حكيم، متبصر	C1	adj.	A judicious and careful selection of reliable sources greatly strengthens any academic argument or research paper.	الاختيار الحكيم والحذر للمصادر الموثوقة يعزز أي دراسة بشكل كبير.	2026-04-08 18:29:37.18419+00
1814	acumen	حنكة، براعة	C1	n.	Her academic acumen and business insight made her a valued consultant.	حنكتها الأكاديمية وبصيرتها التجارية جعلتها مستشارة ذات قيمة.	2026-04-08 18:29:37.18419+00
1815	adamant	مصر، حازم	C1	adj.	The lead researcher was adamant that the methodology was entirely valid.	كان الباحث الرئيسي حازماً على أن المنهجية صحيحة تماماً.	2026-04-08 18:29:37.18419+00
1816	adroit	ماهر	C1	adj.	She was adroit at navigating the complex politics of her field.	كانت ماهرة في التعامل مع السياسات المعقدة في مجالها.	2026-04-08 18:29:37.18419+00
1818	ambivalence	تذبذب، عدم اليقين	C1	n.	There is considerable ambivalence among academics about AI in education.	هناك تذبذب كبير بين الأكاديميين حول الذكاء الاصطناعي في التعليم.	2026-04-08 18:29:37.18419+00
1819	anomalous	شاذ، غير عادي	C1	adj.	The anomalous findings were eventually explained by a calibration error.	تم شرح النتائج الشاذة في النهاية بسبب خطأ في المعايرة.	2026-04-08 18:29:37.18419+00
1820	antagonistic	عدائي	C1	adj.	An antagonistic tone in academic debate rarely advances understanding.	نبرة معادية في النقاش الأكاديمي نادراً ما تعزز الفهم.	2026-04-08 18:29:37.18419+00
1821	apathy	اللامبالاة	C1	n.	Public apathy about political issues remains a major democratic challenge.	تبقى اللامبالاة العامة حول القضايا السياسية تحدياً ديمقراطياً رئيسياً.	2026-04-08 18:29:37.18419+00
1822	apposite	مناسب، في محله	C1	adj.	She chose an apposite quotation that perfectly illustrated her argument.	اختارت اقتباساً مناسباً أوضح تماماً حجتها.	2026-04-08 18:29:37.18419+00
1823	ardent	حماسي، متحمس	C1	adj.	He was an ardent advocate for open-access academic publishing.	كان مدافعاً حماسياً عن نشر العلوم المفتوح الوصول.	2026-04-08 18:29:37.18419+00
1825	attest	يشهد، يؤكد	C1	v.	Multiple independent studies attest to the seriousness of the biodiversity crisis.	تشهد دراسات مستقلة متعددة على جسامة أزمة التنوع البيولوجي.	2026-04-08 18:29:37.18419+00
1826	audacity	جرأة، شجاعة	C1	n.	It takes intellectual audacity to challenge widely accepted paradigms.	يتطلب الأمر جرأة فكرية لتحدي النماذج المقبولة على نطاق واسع.	2026-04-08 18:29:37.18419+00
1827	austerity	تقشف	C1	n.	Years of austerity had severely depleted investment in public infrastructure.	استنزفت سنوات التقشف بشكل حاد الاستثمار في البنية التحتية العامة.	2026-04-08 18:29:37.18419+00
1829	avid	متحمس	C1	adj.	An avid reader of the latest journals, she was always ahead of her peers.	كقارئة متحمسة للمجلات الحديثة، كانت دائماً متقدمة على أقرانها.	2026-04-08 18:29:37.18419+00
1832	bolster	يعزز، يدعم	C1	v.	Additional case studies would significantly bolster the main argument.	ستعزز دراسات حالة إضافية الحجة الرئيسية بشكل كبير.	2026-04-08 18:29:37.18419+00
1834	candour	صراحة	C1	n.	The report was praised for its intellectual candour and honesty.	تم الثناء على التقرير لصراحته الفكرية وصدقه.	2026-04-08 18:29:37.18419+00
1835	categorical	قاطع	C1	adj.	We cannot yet make categorical claims without more robust evidence.	لا يمكننا إطلاق ادعاءات قاطعة بدون أدلة أكثر قوة.	2026-04-08 18:29:37.18419+00
1836	causality	سببية	C1	n.	Establishing causality, rather than correlation, is the key challenge here.	إقامة السببية، وليس مجرد الارتباط، هي التحدي الرئيسي هنا.	2026-04-08 18:29:37.18419+00
1837	caveat	تحفظ	C1	n.	The author added an important caveat about the generalisability of the findings.	أضاف المؤلف تحفظاً مهماً حول إمكانية تعميم النتائج.	2026-04-08 18:29:37.18419+00
1838	circumspect	حذر	C1	adj.	Researchers should be circumspect when interpreting early-stage results.	يجب أن يكون الباحثون حذرين عند تفسير النتائج في المراحل المبكرة.	2026-04-08 18:29:37.18419+00
1839	coerce	يكره، يرغم	C1	v.	Participants must never be coerced into taking part in any research study.	لا يجب أبداً إرغام المشاركين على المشاركة في أي دراسة بحثية.	2026-04-08 18:29:37.18419+00
1842	confound	يربك	C1	v.	Multiple confounding variables complicated the interpretation of the results.	متغيرات مربكة متعددة عقدت تفسير النتائج.	2026-04-08 18:29:37.18419+00
1843	constrain	يقيد	C1	v.	Limited funding severely constrained the scope of the fieldwork.	التمويل المحدود قيد بشدة نطاق العمل الميداني.	2026-04-08 18:29:37.18419+00
1812	laud	يشيد، يثني على	C1	v.	The groundbreaking study was widely lauded by experts for its rigorous and comprehensive methodology.	حظيت الدراسة الرائدة بثناء واسع من الخبراء لصرامتها.	2026-04-08 18:29:37.18419+00
1813	efficacious	فعال	C1	adj.	The intervention proved efficacious across a wide range of demographic groups and settings.	أثبتت التدخل فعاليته عبر مجموعة واسعة من المجموعات السكانية.	2026-04-08 18:29:37.18419+00
1846	cynicism	التشكك	C1	n.	Healthy cynicism towards extraordinary claims is a virtue in scientific inquiry.	التشكك الصحي تجاه الادعاءات غير العادية فضيلة في البحث العلمي.	2026-04-08 18:29:37.18419+00
1845	credence	المصداقية	C1	n.	The new data lends considerable credence to the previously contested hypothesis.	البيانات الجديدة توفر مصداقية كبيرة للنظرية المطعون فيها سابقاً.	2026-04-08 18:29:37.18419+00
1900	paradoxical	متناقض	C1	adj.	It is paradoxical that increasing connectivity can intensify social fragmentation.	من المتناقض أن زيادة الاتصالية يمكن أن تكثف التجزؤ الاجتماعي.	2026-04-08 18:29:37.18419+00
1895	obstinate	عنيد	C1	adj.	An obstinate refusal to engage with contradictory evidence is intellectually counterproductive and limits critical thinking.	الرفض العنيد للتعامل مع الأدلة المتناقضة يعتبر نقصاً فكرياً.	2026-04-08 18:29:37.18419+00
1897	outstrip	يتفوق على، يتجاوز	C1	v.	Demand for the new treatment quickly outstripped the available supply.	الطلب على العلاج الجديد تجاوز بسرعة الإمدادات المتاحة.	2026-04-08 18:29:37.18419+00
1876	garner	حصل على، استقطب	C1	v.	The innovative and well-designed study successfully managed to garner significant attention from the academic community.	الدراسة المبتكرة والمصممة جيداً نجحت في استقطاب اهتماماً واسعاً.	2026-04-08 18:29:37.18419+00
1899	palpable	محسوس، ملموس	C1	adj.	There was a palpable sense of anticipation when the landmark results were announced to the eager audience.	كان هناك شعور محسوس بالترقب عندما تم الإعلان عن النتائج المهمة.	2026-04-08 18:29:37.18419+00
1901	pedantry	تزمت حرفي	C1	n.	Excessive pedantry about minor technicalities obscures the substance of the argument and hinders effective communication.	التزمت الحرفي المفرط حول التفاصيل الصغيرة يخفي جوهر الموضوع.	2026-04-08 18:29:37.188719+00
1914	advice	نصيحة	A2	n.	Her advice helped me make a better decision.	ساعدتني نصيحتها على اتخاذ قرار أفضل.	2026-04-08 18:29:37.188719+00
1915	afraid	خائف	A2	adj.	The child was afraid of the dark room.	كان الطفل خائفاً من الغرفة المظلمة.	2026-04-08 18:29:37.188719+00
1916	ago	منذ	A2	adv.	She moved to the city two years ago.	انتقلت إلى المدينة منذ عامين.	2026-04-08 18:29:37.188719+00
1917	although	على الرغم من	A2	conj.	Although it was raining, we went for a walk.	على الرغم من المطر، ذهبنا في نزهة.	2026-04-08 18:29:37.188719+00
1918	announce	يُعلن	A2	v.	The company announced a new product launch.	أعلنت الشركة عن إطلاق منتج جديد.	2026-04-08 18:29:37.188719+00
1919	apologize	يعتذر	A2	v.	He apologized for arriving late to the meeting.	اعتذر عن التأخر في الوصول إلى الاجتماع.	2026-04-08 18:29:37.188719+00
1920	assistant	مساعد	A2	n.	The sales assistant helped me find the right size.	ساعدني مساعد المبيعات في إيجاد المقاس المناسب.	2026-04-08 18:29:37.188719+00
1921	awful	فظيع	A2	adj.	The weather was awful during our holiday.	كان الطقس فظيعاً خلال إجازتنا.	2026-04-08 18:29:37.188719+00
1922	background	خلفية	A2	n.	She comes from a musical family background.	تأتي من خلفية عائلية موسيقية.	2026-04-08 18:29:37.188719+00
1923	basement	قبو	A2	n.	They store old furniture in the basement.	يخزنون الأثاث القديم في القبو.	2026-04-08 18:29:37.188719+00
1924	belong	ينتمي	A2	v.	This book belongs to my older sister.	هذا الكتاب يخص أختي الكبرى.	2026-04-08 18:29:37.188719+00
1925	bottle	زجاجة	A2	n.	She carried a bottle of water in her bag.	حملت زجاجة ماء في حقيبتها.	2026-04-08 18:29:37.188719+00
1926	calendar	تقويم	A2	n.	She marked the important dates on the calendar.	علّمت التواريخ المهمة على التقويم.	2026-04-08 18:29:37.188719+00
1927	cancel	يلغي	A2	v.	They had to cancel the trip due to the storm.	اضطروا إلى إلغاء الرحلة بسبب العاصفة.	2026-04-08 18:29:37.188719+00
1928	cash	نقد	A2	n.	I paid for the groceries with cash.	دفعت ثمن البقالة نقداً.	2026-04-08 18:29:37.188719+00
1929	certificate	شهادة	A2	n.	She received a certificate after completing the course.	تلقت شهادة بعد إتمام الدورة.	2026-04-08 18:29:37.188719+00
1932	chest	صدر	A2	n.	He felt a pain in his chest after running.	شعر بألم في صدره بعد الجري.	2026-04-08 18:29:37.188719+00
1933	coast	ساحل	A2	n.	They spent their holiday on the Mediterranean coast.	قضوا إجازتهم على ساحل البحر المتوسط.	2026-04-08 18:29:37.188719+00
1934	complain	يشكو	A2	v.	The customer complained about the slow service.	شكا العميل من الخدمة البطيئة.	2026-04-08 18:29:37.188719+00
1935	content	راضٍ	A2	adj.	He was content with his simple life.	كان راضياً عن حياته البسيطة.	2026-04-08 18:29:37.188719+00
1936	correctly	بشكل صحيح	A2	adv.	She answered all the questions correctly.	أجابت على جميع الأسئلة بشكل صحيح.	2026-04-08 18:29:37.188719+00
1937	delicious	لذيذ	A2	adj.	The homemade soup was absolutely delicious.	كانت الحساء المطبوخ في البيت لذيذاً للغاية.	2026-04-08 18:29:37.188719+00
1938	dessert	حلوى	A2	n.	They ordered chocolate cake for dessert.	طلبوا كعكة الشوكولاتة حلوى.	2026-04-08 18:29:37.188719+00
1939	embarrassed	محرج	A2	adj.	She felt embarrassed when she forgot his name.	شعرت بالإحراج عندما نسيت اسمه.	2026-04-08 18:29:37.188719+00
1940	especially	بشكل خاص	A2	adv.	I love fruit, especially mangoes and oranges.	أحب الفاكهة، بشكل خاص المانجو والبرتقال.	2026-04-08 18:29:37.188719+00
1941	excellent	ممتاز	A2	adj.	The student's performance was excellent this year.	كان أداء الطالب ممتازاً هذا العام.	2026-04-08 18:29:37.188719+00
1930	charge	يفرض رسوماً	A2	v.	The hotel charges extra for breakfast.	يتقاضى الفندق رسوماً إضافية على الإفطار.	2026-04-08 18:29:37.188719+00
1931	chat	يتحدث بشكل غير رسمي	A2	v.	We chatted with the neighbors over the fence.	تحدثنا مع الجيران عبر السياج.	2026-04-08 18:29:37.188719+00
1902	perceptive	ذو بصيرة	C1	adj.	The most perceptive researchers notice patterns that others consistently overlook in their analyses.	الباحثون الأكثر ذو بصيرة يلاحظون أنماطاً لا يرى غيرهم.	2026-04-08 18:29:37.188719+00
1944	fantastic	رائع	A2	adj.	The view from the mountain top was fantastic.	كان المنظر من قمة الجبل رائعاً.	2026-04-08 18:29:37.188719+00
1945	fashion	موضة	A2	n.	She has always been interested in fashion design.	لطالما اهتمت بتصميم الأزياء.	2026-04-08 18:29:37.188719+00
1946	flight	رحلة جوية	A2	n.	Our flight to London takes about four hours.	رحلتنا إلى لندن تستغرق حوالي أربع ساعات.	2026-04-08 18:29:37.188719+00
1947	friendly	ودود	A2	adj.	The staff at the hotel were friendly and helpful.	كان موظفو الفندق ودودين ومتعاونين.	2026-04-08 18:29:37.188719+00
1948	grade	درجة	A2	n.	She received a high grade on her essay.	حصلت على درجة عالية في مقالتها.	2026-04-08 18:29:37.188719+00
1949	handsome	وسيم	A2	adj.	Her older brother is very handsome and tall.	أخوها الأكبر وسيم وطويل.	2026-04-08 18:29:37.188719+00
1950	honest	صادق	A2	adj.	She is known for being honest and reliable.	تُعرف بكونها صادقة وموثوقة.	2026-04-08 18:29:37.188719+00
1951	immediately	فوراً	A2	adv.	Please call me immediately if anything changes.	يرجى الاتصال بي فوراً إذا تغير أي شيء.	2026-04-08 18:29:37.188719+00
1952	incredible	لا يصدق	A2	adj.	The performance was simply incredible to watch.	كان الأداء ببساطة رائعاً للمشاهدة.	2026-04-08 18:29:37.188719+00
1953	journey	رحلة	A2	n.	The journey from London to Edinburgh takes five hours.	تستغرق الرحلة من لندن إلى إدنبرة خمس ساعات.	2026-04-08 18:29:37.188719+00
1954	laptop	حاسوب محمول	A2	n.	He carries his laptop to work every day.	يحمل حاسوبه المحمول إلى العمل كل يوم.	2026-04-08 18:29:37.188719+00
1955	leather	جلد	A2	n.	She bought a leather bag from the market.	اشترت حقيبة جلدية من السوق.	2026-04-08 18:29:37.188719+00
1956	magazine	مجلة	A2	n.	She reads a fashion magazine every month.	تقرأ مجلة أزياء كل شهر.	2026-04-08 18:29:37.188719+00
1957	manager	مدير	A2	n.	The manager spoke to the employees this morning.	تحدث المدير مع الموظفين هذا الصباح.	2026-04-08 18:29:37.188719+00
1958	meeting	اجتماع	A2	n.	The team had a meeting to discuss the new project.	عقد الفريق اجتماعاً لمناقشة المشروع الجديد.	2026-04-08 18:29:37.188719+00
1959	message	رسالة	A2	n.	She left a message on his phone while he was busy.	تركت له رسالة على هاتفه وهو مشغول.	2026-04-08 18:29:37.188719+00
1960	missing	مفقود	A2	adj.	The police are searching for a missing child.	تبحث الشرطة عن طفل مفقود.	2026-04-08 18:29:37.188719+00
1961	mistake	خطأ	A2	n.	He made a small mistake in the calculation.	ارتكب خطأ صغيراً في الحساب.	2026-04-08 18:29:37.188719+00
1962	neighbor	جار	A2	n.	My neighbor is very kind and always helps me.	جاري لطيف جداً ويساعدني دائماً.	2026-04-08 18:29:37.188719+00
1963	noise	ضوضاء	A2	n.	The noise from the construction site is very disturbing.	الضوضاء من موقع البناء مزعجة جداً.	2026-04-08 18:29:37.188719+00
1964	organized	منظم	A2	adj.	She is always organized and prepared for work.	هي دائماً منظمة ومستعدة للعمل.	2026-04-08 18:29:37.188719+00
1965	package	طرد	A2	n.	A package arrived for you this afternoon.	وصل طرد لك هذا الظهر.	2026-04-08 18:29:37.188719+00
1966	parking	مواقف السيارات	A2	n.	There is free parking behind the supermarket.	هناك موقف سيارات مجاني خلف السوبر ماركت.	2026-04-08 18:29:37.188719+00
1967	passenger	راكب	A2	n.	The train was full of passengers on Monday morning.	كان القطار ممتلئاً بالركاب صباح يوم الاثنين.	2026-04-08 18:29:37.188719+00
1968	perform	يؤدي	A2	v.	The band will perform at the concert tonight.	ستؤدي الفرقة الموسيقية في الحفل الليلة.	2026-04-08 18:29:37.188719+00
1969	polite	مؤدب	A2	adj.	The children were polite and respectful to the teacher.	كان الأطفال مؤدبين ومحترمين للمعلم.	2026-04-08 18:29:37.188719+00
1970	prefer	يفضل	A2	v.	I prefer tea to coffee in the morning.	أفضل الشاي على القهوة في الصباح.	2026-04-08 18:29:37.188719+00
1971	proud	فخور	A2	adj.	Her parents were proud of her achievements.	كان والداها فخورين بإنجازاتها.	2026-04-08 18:29:37.188719+00
1972	receipt	إيصال	A2	n.	Keep the receipt in case you want to return it.	احتفظ بالإيصال في حال أردت إعادته.	2026-04-08 18:29:37.188719+00
1973	receive	يتلقى	A2	v.	She received a letter from her old friend.	تلقت رسالة من صديقها القديم.	2026-04-08 18:29:37.188719+00
1974	recipe	وصفة	A2	n.	This is my grandmother's original recipe for bread.	هذه وصفة جدتي الأصلية للخبز.	2026-04-08 18:29:37.188719+00
1975	rent	يستأجر	A2	v.	They decided to rent a flat near the university.	قرروا استئجار شقة بالقرب من الجامعة.	2026-04-08 18:29:37.188719+00
1976	repair	يُصلح	A2	v.	The mechanic repaired the car engine yesterday.	أصلح الميكانيكي محرك السيارة أمس.	2026-04-08 18:29:37.188719+00
1977	reservation	حجز	A2	n.	She made a reservation at the restaurant for two.	حجزت طاولة في المطعم لشخصين.	2026-04-08 18:29:37.188719+00
1978	roof	سقف	A2	n.	The roof of the old house needs urgent repair.	يحتاج سقف البيت القديم إلى إصلاح عاجل.	2026-04-08 18:29:37.188719+00
1979	season	موسم	A2	n.	Spring is her favorite season of the year.	الربيع هو موسمها المفضل من العام.	2026-04-08 18:29:37.188719+00
1980	shelf	رف	A2	n.	She put the books back on the shelf.	وضعت الكتب على الرف مرة أخرى.	2026-04-08 18:29:37.188719+00
1981	similar	مشابه	A2	adj.	Their opinions are very similar on this topic.	آراؤهم متشابهة جداً في هذا الموضوع.	2026-04-08 18:29:37.188719+00
1982	stranger	غريب	A2	n.	Never share personal information with a stranger.	لا تشارك أبداً معلومات شخصية مع غريب.	2026-04-08 18:29:37.188719+00
1983	surprised	مندهش	A2	adj.	She was surprised by the unexpected good news.	كانت مندهشة من الأخبار الجيدة غير المتوقعة.	2026-04-08 18:29:37.188719+00
1984	taxi	سيارة أجرة	A2	n.	They took a taxi to the airport early morning.	أخذوا سيارة أجرة إلى المطار في الصباح الباكر.	2026-04-08 18:29:37.188719+00
1985	terrible	فظيع	A2	adj.	The traffic was terrible on the way to work.	كانت حركة المرور فظيعة في طريق العمل.	2026-04-08 18:29:37.188719+00
1986	traffic	حركة المرور	A2	n.	There was heavy traffic near the city center.	كانت حركة المرور كثيفة بالقرب من وسط المدينة.	2026-04-08 18:29:37.188719+00
1987	typical	نموذجي	A2	adj.	This is a typical example of a good essay.	هذا مثال نموذجي على مقال جيد.	2026-04-08 18:29:37.188719+00
1991	absolutely	تماماً	B1	adv.	She was absolutely right about the solution.	كانت محقة تماماً بشأن الحل.	2026-04-08 18:29:37.188719+00
1992	agenda	جدول الأعمال	B1	n.	The meeting agenda included three main topics.	تضمّن جدول أعمال الاجتماع ثلاثة موضوعات رئيسية.	2026-04-08 18:29:37.188719+00
1993	ambitious	طموح	B1	adj.	She is ambitious and always works toward bigger goals.	هي طموحة وتعمل دائماً نحو أهداف أكبر.	2026-04-08 18:29:37.188719+00
1995	behavior	سلوك	B1	n.	His behavior in class improved significantly this term.	تحسّن سلوكه في الفصل بشكل ملحوظ هذا الفصل الدراسي.	2026-04-08 18:29:37.188719+00
1996	blame	يُلقي اللوم	B1	v.	Don't blame others for your own mistakes.	لا تُلقِ اللوم على الآخرين بسبب أخطائك.	2026-04-08 18:29:37.188719+00
1997	bond	رابطة	B1	n.	The children formed a strong bond during the camp.	كوّن الأطفال رابطة قوية خلال المخيم.	2026-04-08 18:29:37.188719+00
1998	celebrate	يحتفل	B1	v.	They celebrated the end of the project with a dinner.	احتفلوا بنهاية المشروع بعشاء.	2026-04-08 18:29:37.188719+00
1999	claim	يدّعي	B1	v.	He claimed that he had never met her before.	ادّعى أنه لم يقابلها من قبل.	2026-04-08 18:29:37.188719+00
2000	clearly	بوضوح	B1	adv.	She explained the rules clearly to the new students.	شرحت القواعد بوضوح للطلاب الجدد.	2026-04-08 18:29:37.188719+00
2001	commit	يلتزم	B1	v.	He committed to finishing the report by Friday.	التزم بإنهاء التقرير بحلول يوم الجمعة.	2026-04-08 18:29:37.193174+00
2002	communicate	يتواصل	B1	v.	It is important to communicate clearly in the workplace.	من المهم التواصل بوضوح في مكان العمل.	2026-04-08 18:29:37.193174+00
2003	constant	مستمر	B1	adj.	The constant noise made it difficult to focus.	جعلت الضوضاء المستمرة التركيز أمراً صعباً.	2026-04-08 18:29:37.193174+00
2004	contain	يحتوي	B1	v.	The report contains detailed information about the findings.	يحتوي التقرير على معلومات تفصيلية حول النتائج.	2026-04-08 18:29:37.193174+00
2005	cooperate	يتعاون	B1	v.	Both teams cooperated well to complete the task.	تعاون الفريقان بشكل جيد لإنجاز المهمة.	2026-04-08 18:29:37.193174+00
2006	crucial	بالغ الأهمية	B1	adj.	The support of the community is crucial for success.	دعم المجتمع بالغ الأهمية للنجاح.	2026-04-08 18:29:37.193174+00
2007	custom	عادة	B1	n.	It is a local custom to bring gifts to new neighbors.	إحضار الهدايا للجيران الجدد عادة محلية.	2026-04-08 18:29:37.193174+00
2008	despite	على الرغم من	B1	prep.	Despite the rain, the event was a great success.	على الرغم من المطر، كانت الفعالية ناجحة جداً.	2026-04-08 18:29:37.193174+00
2010	difficulty	صعوبة	B1	n.	She faced many difficulties when starting her business.	واجهت صعوبات كثيرة عند بدء أعمالها التجارية.	2026-04-08 18:29:37.193174+00
2011	disappear	يختفي	B1	v.	The old tradition gradually disappeared over the years.	اختفت التقليدية القديمة تدريجياً على مر السنين.	2026-04-08 18:29:37.193174+00
2012	discipline	انضباط	B1	n.	Success in sport requires discipline and dedication.	يتطلب النجاح في الرياضة الانضباط والتفاني.	2026-04-08 18:29:37.193174+00
2013	discount	خصم	B1	n.	The store offered a 20% discount on all items.	قدّم المتجر خصماً بنسبة 20٪ على جميع المنتجات.	2026-04-08 18:29:37.193174+00
2014	distribute	يوزّع	B1	v.	They distributed food packages to those in need.	وزّعوا طرود الغذاء على المحتاجين.	2026-04-08 18:29:37.193174+00
2015	duty	واجب	B1	n.	It is our duty to help those who are less fortunate.	من واجبنا مساعدة من هم أقل حظاً.	2026-04-08 18:29:37.193174+00
2016	emotion	عاطفة	B1	n.	Music can express emotions that words cannot.	يمكن للموسيقى التعبير عن مشاعر لا تستطيع الكلمات التعبير عنها.	2026-04-08 18:29:37.193174+00
2017	emphasize	يُؤكّد	B1	v.	The teacher emphasized the importance of regular revision.	أكّد المعلم على أهمية المراجعة المنتظمة.	2026-04-08 18:29:37.193174+00
2018	employ	يوظّف	B1	v.	The factory employs over five hundred workers.	يوظّف المصنع أكثر من خمسمائة عامل.	2026-04-08 18:29:37.193174+00
2020	examine	يفحص	B1	v.	The doctor examined the patient carefully.	فحص الطبيب المريض بعناية.	2026-04-08 18:29:37.193174+00
2021	expect	يتوقع	B1	v.	We expect the results to arrive by end of month.	نتوقع وصول النتائج بنهاية الشهر.	2026-04-08 18:29:37.193174+00
2022	extend	يمدّد	B1	v.	They decided to extend the deadline by two weeks.	قرروا تمديد الموعد النهائي بأسبوعين.	2026-04-08 18:29:37.193174+00
2023	force	يُجبر	B1	v.	The storm forced them to cancel the outdoor event.	أجبرتهم العاصفة على إلغاء الحدث الخارجي.	2026-04-08 18:29:37.193174+00
2024	frequent	متكرر	B1	adj.	He makes frequent trips to the library for research.	يقوم برحلات متكررة إلى المكتبة للبحث.	2026-04-08 18:29:37.193174+00
2025	furthermore	علاوة على ذلك	B1	adv.	She is hardworking, and furthermore very creative.	إنها مجتهدة، وعلاوة على ذلك مبدعة جداً.	2026-04-08 18:29:37.193174+00
2026	guarantee	يضمن	B1	v.	Success is not guaranteed even with hard work.	النجاح غير مضمون حتى مع العمل الجاد.	2026-04-08 18:29:37.193174+00
2027	handle	يتعامل مع	B1	v.	She knows how to handle difficult situations professionally.	تعرف كيف تتعامل مع المواقف الصعبة باحترافية.	2026-04-08 18:29:37.193174+00
2028	however	ومع ذلك	B1	adv.	The plan was good; however, it needed more funding.	كانت الخطة جيدة؛ ومع ذلك، كانت بحاجة إلى مزيد من التمويل.	2026-04-08 18:29:37.193174+00
2029	institution	مؤسسة	B1	n.	The university is a respected academic institution.	الجامعة مؤسسة أكاديمية مرموقة.	2026-04-08 18:29:37.193174+00
2030	intend	ينوي	B1	v.	She intends to study medicine after high school.	تعتزم دراسة الطب بعد المرحلة الثانوية.	2026-04-08 18:29:37.193174+00
2031	interact	يتفاعل	B1	v.	Students learn better when they interact with each other.	يتعلم الطلاب بشكل أفضل عندما يتفاعلون مع بعضهم البعض.	2026-04-08 18:29:37.193174+00
2247	verbal	شفهي	B1	adj.	She gave a verbal presentation of her research.	قدّمت عرضاً شفهياً لبحثها.	2026-04-08 18:29:37.200487+00
2019	entire	كامل	B1	adj.	She read the entire book in one day.	قرأت الكتاب بأكمله في يوم واحد.	2026-04-08 18:29:37.193174+00
2032	labor	عمل	B1	n.	The labor market has changed significantly in recent years.	تغيّر سوق العمل بشكل ملحوظ في السنوات الأخيرة.	2026-04-08 18:29:37.193174+00
2033	leadership	قيادة	B1	n.	Good leadership is essential for any successful team.	القيادة الجيدة ضرورية لأي فريق ناجح.	2026-04-08 18:29:37.193174+00
2034	legislation	تشريع	B1	n.	New legislation was passed to protect workers' rights.	صدر تشريع جديد لحماية حقوق العمال.	2026-04-08 18:29:37.193174+00
2035	likely	مرجّح	B1	adj.	It is likely that she will get the job.	من المرجح أنها ستحصل على الوظيفة.	2026-04-08 18:29:37.193174+00
2036	majority	أغلبية	B1	n.	The majority of students preferred online learning.	فضّلت غالبية الطلاب التعلم عبر الإنترنت.	2026-04-08 18:29:37.193174+00
2037	manner	أسلوب	B1	n.	Please speak in a respectful manner at all times.	يرجى التحدث بأسلوب محترم في جميع الأوقات.	2026-04-08 18:29:37.193174+00
2038	negotiate	يتفاوض	B1	v.	They negotiated a better deal with the supplier.	تفاوضوا للحصول على صفقة أفضل مع المورد.	2026-04-08 18:29:37.193174+00
2040	operate	يعمل	B1	v.	The factory operates seven days a week.	يعمل المصنع سبعة أيام في الأسبوع.	2026-04-08 18:29:37.193174+00
2041	organization	منظمة	B1	n.	She works for an international aid organization.	تعمل لصالح منظمة مساعدات دولية.	2026-04-08 18:29:37.193174+00
2042	origin	أصل	B1	n.	Do you know the origin of this traditional dish?	هل تعرف أصل هذا الطبق التقليدي؟	2026-04-08 18:29:37.193174+00
2043	participant	مشارك	B1	n.	All participants must sign the agreement before starting.	يجب على جميع المشاركين التوقيع على الاتفاقية قبل البدء.	2026-04-08 18:29:37.193174+00
2044	partly	جزئياً	B1	adv.	The problem is partly due to poor planning.	المشكلة جزئياً بسبب ضعف التخطيط.	2026-04-08 18:29:37.193174+00
2045	pressure	ضغط	B1	n.	She works well even under significant pressure.	تعمل بشكل جيد حتى تحت ضغط كبير.	2026-04-08 18:29:37.193174+00
2046	principle	مبدأ	B1	n.	Honesty is a fundamental principle in any profession.	الصدق مبدأ أساسي في أي مهنة.	2026-04-08 18:29:37.193174+00
2047	productive	منتج	B1	adj.	She had a very productive day at work.	كان يومها في العمل منتجاً للغاية.	2026-04-08 18:29:37.193174+00
2048	professional	مهني	B1	adj.	She is known for her professional and helpful manner.	تُعرف بأسلوبها المهني والمتعاون.	2026-04-08 18:29:37.193174+00
2049	proposal	مقترح	B1	n.	The committee reviewed the proposal for a new building.	راجعت اللجنة المقترح الخاص بمبنى جديد.	2026-04-08 18:29:37.193174+00
2050	qualify	يؤهّل	B1	v.	You need to qualify for the exam by passing the test.	تحتاج إلى التأهل للامتحان من خلال اجتياز الاختبار.	2026-04-08 18:29:37.193174+00
2052	reality	واقع	B1	n.	The reality of the situation was more serious than expected.	كان واقع الوضع أكثر خطورة مما كان متوقعاً.	2026-04-08 18:29:37.193174+00
2054	routine	روتين	B1	n.	She follows a strict daily routine to stay organized.	تتبع روتيناً يومياً صارماً للبقاء منظمة.	2026-04-08 18:29:37.193174+00
2055	satisfy	يُرضي	B1	v.	The manager was satisfied with the team's performance.	كان المدير راضياً عن أداء الفريق.	2026-04-08 18:29:37.193174+00
2056	selection	اختيار	B1	n.	The store has a great selection of fresh food.	يتوفر في المتجر تشكيلة رائعة من الأغذية الطازجة.	2026-04-08 18:29:37.193174+00
2057	specific	محدد	B1	adj.	Please give specific examples to support your argument.	يرجى تقديم أمثلة محددة لدعم حجتك.	2026-04-08 18:29:37.193174+00
2058	statement	بيان	B1	n.	She made a clear statement about her position.	أدلت ببيان واضح حول موقفها.	2026-04-08 18:29:37.193174+00
2059	status	وضع	B1	n.	What is the current status of the project?	ما هو الوضع الحالي للمشروع؟	2026-04-08 18:29:37.193174+00
2060	strength	قوة	B1	n.	Her greatest strength is her ability to communicate.	أكبر قوة لديها هي قدرتها على التواصل.	2026-04-08 18:29:37.193174+00
2061	succeed	ينجح	B1	v.	She worked very hard and finally succeeded.	عملت بجد شديد ونجحت في النهاية.	2026-04-08 18:29:37.193174+00
2062	therefore	لذلك	B1	adv.	She studied hard; therefore, she passed the exam.	درست بجد؛ لذلك اجتازت الامتحان.	2026-04-08 18:29:37.193174+00
2063	variety	تنوع	B1	n.	A variety of teaching methods helps students learn.	يساعد تنوع طرق التدريس الطلاب على التعلم.	2026-04-08 18:29:37.193174+00
2064	version	نسخة	B1	n.	Please send me the latest version of the report.	يرجى إرسال آخر نسخة من التقرير إليّ.	2026-04-08 18:29:37.193174+00
2065	weakness	ضعف	B1	n.	She identified her weakness and worked to improve it.	حددت نقطة ضعفها وعملت على تحسينها.	2026-04-08 18:29:37.193174+00
2066	whereas	في حين أن	B1	conj.	She prefers tea, whereas her husband prefers coffee.	تفضّل الشاي، في حين أن زوجها يفضل القهوة.	2026-04-08 18:29:37.193174+00
2067	witness	شاهد	B1	n.	Several witnesses saw the accident happen.	رأى عدة شهود وقوع الحادث.	2026-04-08 18:29:37.193174+00
2068	additional	إضافي	B1	adj.	We need additional resources to complete the project.	نحن بحاجة إلى موارد إضافية لإتمام المشروع.	2026-04-08 18:29:37.193174+00
2069	admission	قبول	B1	n.	She received an admission letter from the university.	تلقت خطاب قبول من الجامعة.	2026-04-08 18:29:37.193174+00
2070	ahead	إلى الأمام	B1	adv.	We need to look ahead and plan for the future.	نحن بحاجة إلى النظر إلى الأمام والتخطيط للمستقبل.	2026-04-08 18:29:37.193174+00
2071	alert	يُنبّه	B1	v.	The system automatically alerts users to any changes.	ينبّه النظام تلقائياً المستخدمين إلى أي تغييرات.	2026-04-08 18:29:37.193174+00
2072	align	يُوائم	B1	v.	The project goals align with the company's strategy.	تتوافق أهداف المشروع مع استراتيجية الشركة.	2026-04-08 18:29:37.193174+00
2074	artistic	فني	B1	adj.	Her artistic talent was evident from a young age.	كان موهبتها الفنية واضحاً منذ سن مبكرة.	2026-04-08 18:29:37.193174+00
2039	obviously	بوضوح	B1	adv.	She was obviously upset about the news.	كانت من الواضح منزعجة من الأخبار.	2026-04-08 18:29:37.193174+00
2051	react	يستجيب	B1	v.	How did she react to the news?	كيف تفاعلت مع الأخبار؟	2026-04-08 18:29:37.193174+00
2053	recognize	يُدرك	B1	v.	She recognized the importance of early preparation.	أدركت أهمية الإعداد المبكر.	2026-04-08 18:29:37.193174+00
2075	associate	يربط	B1	v.	People often associate coffee with morning routines.	يربط الناس القهوة في الغالب بالروتين الصباحي.	2026-04-08 18:29:37.193174+00
2076	attendance	حضور	B1	n.	Regular attendance is required for passing the course.	الحضور المنتظم مطلوب لاجتياز الدورة.	2026-04-08 18:29:37.193174+00
2077	attractive	جذاب	B1	adj.	The new office design was very attractive and modern.	كان تصميم المكتب الجديد جذاباً وحديثاً.	2026-04-08 18:29:37.193174+00
2078	automatic	تلقائي	B1	adj.	The door has an automatic lock for security.	يحتوي الباب على قفل تلقائي من أجل الأمان.	2026-04-08 18:29:37.193174+00
2079	ban	يحظر	B1	v.	The government banned smoking in all public places.	حظرت الحكومة التدخين في جميع الأماكن العامة.	2026-04-08 18:29:37.193174+00
2080	beside	بجانب	B1	prep.	She sat beside her best friend during the lecture.	جلست بجانب صديقتها المقربة خلال المحاضرة.	2026-04-08 18:29:37.193174+00
2081	beyond	أبعد من	B1	prep.	His achievements go beyond what was expected.	تتجاوز إنجازاته ما كان متوقعاً.	2026-04-08 18:29:37.193174+00
2082	branch	فرع	B1	n.	The company opened a new branch in the city.	فتحت الشركة فرعاً جديداً في المدينة.	2026-04-08 18:29:37.193174+00
2083	central	مركزي	B1	adj.	The central theme of the essay is environmental change.	الموضوع المركزي للمقال هو التغيير البيئي.	2026-04-08 18:29:37.193174+00
2084	chain	سلسلة	B1	n.	The supermarket is part of a large chain.	يُعدّ السوبر ماركت جزءاً من سلسلة كبيرة.	2026-04-08 18:29:37.193174+00
2085	chief	رئيسي	B1	adj.	The chief concern is the safety of all passengers.	المخاوف الرئيسية هي سلامة جميع الركاب.	2026-04-08 18:29:37.193174+00
2086	collection	مجموعة	B1	n.	She has a large collection of classic novels.	لديها مجموعة كبيرة من الروايات الكلاسيكية.	2026-04-08 18:29:37.193174+00
2087	compete	يتنافس	B1	v.	Many students compete for the limited scholarships.	يتنافس كثير من الطلاب على المنح الدراسية المحدودة.	2026-04-08 18:29:37.193174+00
2088	complaint	شكوى	B1	n.	She filed a formal complaint about the poor service.	قدّمت شكوى رسمية بشأن الخدمة السيئة.	2026-04-08 18:29:37.193174+00
2089	confidence	ثقة	B1	n.	Practice helps build confidence in speaking.	تساعد الممارسة على بناء الثقة في التحدث.	2026-04-08 18:29:37.193174+00
2090	considerable	كبير	B1	adj.	The project required a considerable amount of time.	تطلّب المشروع قدراً كبيراً من الوقت.	2026-04-08 18:29:37.193174+00
2091	construction	بناء	B1	n.	Construction of the new school began last month.	بدأ بناء المدرسة الجديدة الشهر الماضي.	2026-04-08 18:29:37.193174+00
2092	consumption	استهلاك	B1	n.	Energy consumption has increased over the past decade.	ازداد استهلاك الطاقة على مدار العقد الماضي.	2026-04-08 18:29:37.193174+00
2093	contribution	مساهمة	B1	n.	Her contribution to the project was outstanding.	كانت مساهمتها في المشروع بارزة.	2026-04-08 18:29:37.193174+00
2096	crime	جريمة	B1	n.	Crime rates in the city have decreased this year.	انخفضت معدلات الجريمة في المدينة هذا العام.	2026-04-08 18:29:37.193174+00
2097	cultural	ثقافي	B1	adj.	She attended a cultural festival in the city.	حضرت مهرجاناً ثقافياً في المدينة.	2026-04-08 18:29:37.193174+00
2098	deal	صفقة	B1	n.	They agreed on a deal that benefited both sides.	اتفقوا على صفقة أفادت الجانبين.	2026-04-08 18:29:37.193174+00
2099	deny	يُنكر	B1	v.	He denied making any mistakes in the report.	أنكر ارتكابه أي أخطاء في التقرير.	2026-04-08 18:29:37.193174+00
2100	deserve	يستحق	B1	v.	She deserved the award for her hard work.	استحقت الجائزة بفضل عملها الجاد.	2026-04-08 18:29:37.193174+00
2101	dilemma	معضلة	B1	n.	She faced a difficult dilemma at work.	واجهت معضلة صعبة في العمل.	2026-04-08 18:29:37.197152+00
2102	discovery	اكتشاف	B1	n.	The scientific discovery changed medical understanding.	غيّر الاكتشاف العلمي الفهم الطبي.	2026-04-08 18:29:37.197152+00
2104	dispute	خلاف	B1	n.	There was a dispute between the two departments.	كان هناك خلاف بين القسمين.	2026-04-08 18:29:37.197152+00
2105	due	مستحق	B1	adj.	The report is due at the end of the month.	يُستحق تقديم التقرير في نهاية الشهر.	2026-04-08 18:29:37.197152+00
2106	eliminate	يُزيل	B1	v.	The new policy aims to eliminate food waste.	تهدف السياسة الجديدة إلى القضاء على هدر الطعام.	2026-04-08 18:29:37.197152+00
2107	entry	دخول	B1	n.	Entry to the museum is free on Sundays.	الدخول إلى المتحف مجاني أيام الأحد.	2026-04-08 18:29:37.197152+00
2108	eventually	في نهاية المطاف	B1	adv.	She eventually found the answer after hours of research.	وجدت الإجابة في نهاية المطاف بعد ساعات من البحث.	2026-04-08 18:29:37.197152+00
2109	exception	استثناء	B1	n.	This rule applies to everyone, with no exception.	تنطبق هذه القاعدة على الجميع دون استثناء.	2026-04-08 18:29:37.197152+00
2110	exchange	تبادل	B1	n.	She took part in a student exchange program.	شاركت في برنامج تبادل طلابي.	2026-04-08 18:29:37.197152+00
2112	explore	يستكشف	B1	v.	She loves to explore new cities when she travels.	تحب استكشاف مدن جديدة عند السفر.	2026-04-08 18:29:37.197152+00
2113	express	يُعبّر	B1	v.	She expressed her concerns to the manager calmly.	عبّرت عن مخاوفها للمدير بهدوء.	2026-04-08 18:29:37.197152+00
2114	failure	فشل	B1	n.	Failure is part of the learning process.	الفشل جزء من عملية التعلم.	2026-04-08 18:29:37.197152+00
2115	fear	خوف	B1	n.	She overcame her fear of public speaking.	تغلّبت على خوفها من التحدث أمام الجمهور.	2026-04-08 18:29:37.197152+00
2116	fee	رسوم	B1	n.	The course fee includes all study materials.	تشمل رسوم الدورة جميع المواد الدراسية.	2026-04-08 18:29:37.197152+00
2117	financial	مالي	B1	adj.	She received financial support to complete her degree.	تلقّت دعماً مالياً لإتمام شهادتها الجامعية.	2026-04-08 18:29:37.197152+00
2095	creation	إنشاء	B1	n.	The creation of new jobs is a government priority.	إيجاد وظائف جديدة أولوية حكومية.	2026-04-08 18:29:37.193174+00
2103	disorder	اضطراب	B1	n.	The files were in complete disorder after the move.	كانت الملفات في فوضى تامة بعد الانتقال.	2026-04-08 18:29:37.197152+00
2111	expense	نفقة	B1	n.	The company covers all travel expenses.	تتحمل الشركة جميع نفقات السفر.	2026-04-08 18:29:37.197152+00
2118	firm	شركة	B1	n.	She joined a large international law firm.	انضمت إلى شركة محاماة دولية كبيرة.	2026-04-08 18:29:37.197152+00
2119	fixed	ثابت	B1	adj.	The price is fixed and cannot be negotiated.	السعر ثابت ولا يمكن التفاوض عليه.	2026-04-08 18:29:37.197152+00
2120	forecast	توقعات	B1	n.	The economic forecast for next year is positive.	توقعات الاقتصاد للعام القادم إيجابية.	2026-04-08 18:29:37.197152+00
2122	forward	للأمام	B1	adv.	She always looks forward to new challenges.	دائماً تتطلع إلى التحديات الجديدة.	2026-04-08 18:29:37.197152+00
2123	freedom	حرية	B1	n.	Freedom of speech is a fundamental right.	حرية الكلام حق أساسي.	2026-04-08 18:29:37.197152+00
2124	gather	يجمع	B1	v.	She gathered all the information she needed for the report.	جمعت كل المعلومات التي تحتاجها للتقرير.	2026-04-08 18:29:37.197152+00
2125	genuine	حقيقي	B1	adj.	Her interest in helping others is genuine.	اهتمامها بمساعدة الآخرين حقيقي.	2026-04-08 18:29:37.197152+00
2126	geography	جغرافيا	B1	n.	Geography affects the way people live and work.	تؤثر الجغرافيا في طريقة حياة الناس وعملهم.	2026-04-08 18:29:37.197152+00
2127	gesture	إيماءة	B1	n.	A smile is a simple but powerful gesture.	الابتسامة إيماءة بسيطة لكنها قوية.	2026-04-08 18:29:37.197152+00
2128	glad	سعيد	B1	adj.	She was glad to receive the good news.	كانت سعيدة بتلقّي الخبر الجيد.	2026-04-08 18:29:37.197152+00
2129	grant	يمنح	B1	v.	She was granted a full scholarship to study abroad.	مُنحت منحة دراسية كاملة للدراسة في الخارج.	2026-04-08 18:29:37.197152+00
2130	grateful	ممتن	B1	adj.	She was truly grateful for all the support she received.	كانت ممتنة حقاً لكل الدعم الذي تلقّته.	2026-04-08 18:29:37.197152+00
2131	headquarters	مقر رئيسي	B1	n.	The company headquarters is located in New York.	يقع المقر الرئيسي للشركة في نيويورك.	2026-04-08 18:29:37.197152+00
2132	heritage	تراث	B1	n.	The museum preserves the cultural heritage of the region.	يحافظ المتحف على التراث الثقافي للمنطقة.	2026-04-08 18:29:37.197152+00
2133	hire	يُوظّف	B1	v.	The company hired ten new employees last month.	وظّفت الشركة عشرة موظفين جدد الشهر الماضي.	2026-04-08 18:29:37.197152+00
2134	historical	تاريخي	B1	adj.	The city has many historical sites worth visiting.	تمتلك المدينة العديد من المواقع التاريخية التي تستحق الزيارة.	2026-04-08 18:29:37.197152+00
2135	hope	يأمل	B1	v.	She hopes to start her own business one day.	تأمل في يوم ما أن تُنشئ أعمالها الخاصة.	2026-04-08 18:29:37.197152+00
2136	host	يستضيف	B1	v.	The city will host the international conference next year.	ستستضيف المدينة المؤتمر الدولي العام القادم.	2026-04-08 18:29:37.197152+00
2137	ideal	مثالي	B1	adj.	This location is ideal for a new school.	هذا الموقع مثالي لمدرسة جديدة.	2026-04-08 18:29:37.197152+00
2138	incident	حادثة	B1	n.	The police investigated the incident immediately.	حقّقت الشرطة في الحادثة فوراً.	2026-04-08 18:29:37.197152+00
2139	indeed	في الواقع	B1	adv.	She was indeed the most qualified candidate.	كانت في الواقع المرشحة الأكثر تأهلاً.	2026-04-08 18:29:37.197152+00
2140	informal	غير رسمي	B1	adj.	The meeting had an informal and relaxed atmosphere.	كان للاجتماع جو غير رسمي ومريح.	2026-04-08 18:29:37.197152+00
2142	inspire	يُلهم	B1	v.	Her teacher inspired her to pursue a career in medicine.	ألهمها معلمها لمتابعة مهنة في الطب.	2026-04-08 18:29:37.197152+00
2143	intention	نية	B1	n.	It was never his intention to offend anyone.	لم يكن في نيته أبداً إساءة أي شخص.	2026-04-08 18:29:37.197152+00
2144	investigation	تحقيق	B1	n.	An official investigation was launched into the accident.	أُطلق تحقيق رسمي في الحادث.	2026-04-08 18:29:37.197152+00
2145	item	عنصر	B1	n.	Please check each item on the list before submitting.	يرجى التحقق من كل عنصر في القائمة قبل التقديم.	2026-04-08 18:29:37.197152+00
2146	judge	يحكم	B1	v.	Try not to judge others without knowing their situation.	حاوِل ألا تحكم على الآخرين دون معرفة وضعهم.	2026-04-08 18:29:37.197152+00
2147	justice	عدالة	B1	n.	Everyone deserves access to justice and fair treatment.	يستحق الجميع الوصول إلى العدالة والمعاملة العادلة.	2026-04-08 18:29:37.197152+00
2148	lack	يفتقر إلى	B1	v.	She lacked the experience needed for the senior role.	كانت تفتقر إلى الخبرة اللازمة للمنصب الكبير.	2026-04-08 18:29:37.197152+00
2150	largely	إلى حد كبير	B1	adv.	The project was largely successful.	كان المشروع ناجحاً إلى حد كبير.	2026-04-08 18:29:37.197152+00
2151	lasting	دائم	B1	adj.	They hope to build a lasting partnership.	يأملون في بناء شراكة دائمة.	2026-04-08 18:29:37.197152+00
2152	layer	طبقة	B1	n.	The atmosphere has several distinct layers.	يحتوي الغلاف الجوي على عدة طبقات مميزة.	2026-04-08 18:29:37.197152+00
2153	legal	قانوني	B1	adj.	She sought legal advice before signing the contract.	طلبت مشورة قانونية قبل التوقيع على العقد.	2026-04-08 18:29:37.197152+00
2154	lifestyle	نمط حياة	B1	n.	A healthy lifestyle includes exercise and good nutrition.	يشمل نمط الحياة الصحي التمارين الرياضية والتغذية الجيدة.	2026-04-08 18:29:37.197152+00
2155	limited	محدود	B1	adj.	Resources are limited, so we must use them wisely.	الموارد محدودة، لذلك يجب علينا استخدامها بحكمة.	2026-04-08 18:29:37.197152+00
2156	loyalty	ولاء	B1	n.	Her loyalty to the team earned her great respect.	أكسبها ولاؤها للفريق احتراماً كبيراً.	2026-04-08 18:29:37.197152+00
2157	master	يتقن	B1	v.	She worked hard to master the English language.	عملت بجد لإتقان اللغة الإنجليزية.	2026-04-08 18:29:37.197152+00
2158	maximum	حد أقصى	B1	n.	The maximum speed on this road is sixty kilometres.	السرعة القصوى على هذا الطريق ستون كيلومتراً.	2026-04-08 18:29:37.197152+00
2159	meanwhile	في غضون ذلك	B1	adv.	She is studying hard; meanwhile, her friend is relaxing.	إنها تدرس بجد؛ في غضون ذلك، صديقتها تسترخي.	2026-04-08 18:29:37.197152+00
2121	formula	صيغة	B1	n.	She used a mathematical formula to solve the problem.	استخدمت معادلة رياضية لحل المشكلة.	2026-04-08 18:29:37.197152+00
2141	input	مدخلات	B1	n.	Her input was valuable to the success of the project.	كان إسهامها ذا قيمة لنجاح المشروع.	2026-04-08 18:29:37.197152+00
2160	minor	ثانوي	B1	adj.	There were only minor errors in the final report.	لم تكن هناك سوى أخطاء ثانوية في التقرير النهائي.	2026-04-08 18:29:37.197152+00
2161	model	نموذج	B1	n.	This country's education system is used as a model worldwide.	يُستخدم نظام التعليم في هذا البلد نموذجاً في جميع أنحاء العالم.	2026-04-08 18:29:37.197152+00
2162	moreover	علاوة على ذلك	B1	adv.	She is intelligent; moreover, she works very hard.	إنها ذكية؛ علاوة على ذلك، تعمل بجد شديد.	2026-04-08 18:29:37.197152+00
2163	mutual	متبادل	B1	adj.	The agreement was based on mutual benefit.	كانت الاتفاقية مبنية على المنفعة المتبادلة.	2026-04-08 18:29:37.197152+00
2164	nationwide	على مستوى البلاد	B1	adv.	The campaign was launched nationwide.	أُطلقت الحملة على مستوى البلاد.	2026-04-08 18:29:37.197152+00
2165	negatively	سلباً	B1	adv.	Stress can negatively affect your work performance.	يمكن أن يؤثر التوتر سلباً على أدائك في العمل.	2026-04-08 18:29:37.197152+00
2166	nevertheless	ومع ذلك	B1	adv.	The task was difficult; nevertheless, she completed it.	كانت المهمة صعبة؛ ومع ذلك، أكملتها.	2026-04-08 18:29:37.197152+00
2168	obstacle	عقبة	B1	n.	She faced many obstacles on her path to success.	واجهت عقبات كثيرة في طريقها نحو النجاح.	2026-04-08 18:29:37.197152+00
2172	mentality	عقلية	B1	n.	A growth mentality helps people improve over time.	العقلية الإيجابية تساعد الناس على التحسّن مع مرور الوقت.	2026-04-08 18:29:37.197152+00
2173	meaningful	ذو معنى	B1	adj.	She developed meaningful connections with her classmates.	طوّرت علاقات ذات معنى مع زملائها.	2026-04-08 18:29:37.197152+00
2174	lessen	يُقلّل	B1	v.	Regular exercise can lessen the effects of stress.	يمكن للتمارين المنتظمة تقليل آثار التوتر.	2026-04-08 18:29:37.197152+00
2175	massive	هائل	B1	adj.	There has been a massive increase in online shopping.	كانت هناك زيادة هائلة في التسوق عبر الإنترنت.	2026-04-08 18:29:37.197152+00
2176	membership	عضوية	B1	n.	Membership in the organization is open to all students.	العضوية في المنظمة مفتوحة لجميع الطلاب.	2026-04-08 18:29:37.197152+00
2177	momentum	زخم	B1	n.	The campaign gained momentum after the first event.	اكتسبت الحملة زخماً بعد الفعالية الأولى.	2026-04-08 18:29:37.197152+00
2178	motivation	دافع	B1	n.	She showed great motivation in completing all her tasks.	أظهرت دافعاً كبيراً في إتمام جميع مهامها.	2026-04-08 18:29:37.197152+00
2179	multiple	متعدد	B1	adj.	She referenced multiple studies in her essay.	استشهدت بدراسات متعددة في مقالتها.	2026-04-08 18:29:37.197152+00
2180	neglect	يُهمل	B1	v.	She neglected to include references in her report.	أهملت تضمين المراجع في تقريرها.	2026-04-08 18:29:37.197152+00
2181	occasion	مناسبة	B1	n.	She dressed formally for the official occasion.	ارتدت ملابس رسمية للمناسبة الرسمية.	2026-04-08 18:29:37.197152+00
2182	official	مسؤول	B1	n.	Government officials attended the conference.	حضر المسؤولون الحكوميون المؤتمر.	2026-04-08 18:29:37.197152+00
2184	partner	شريك	B1	n.	She worked with a partner on the research project.	عملت مع شريك في مشروع البحث.	2026-04-08 18:29:37.197152+00
2186	preference	تفضيل	B1	n.	Students have a clear preference for interactive learning.	لدى الطلاب تفضيل واضح للتعلم التفاعلي.	2026-04-08 18:29:37.197152+00
2187	preserve	يحافظ	B1	v.	It is important to preserve cultural traditions.	من المهم الحفاظ على التقاليد الثقافية.	2026-04-08 18:29:37.197152+00
2188	primarily	بشكل أساسي	B1	adv.	The course is primarily focused on academic writing.	الدورة تركّز بشكل أساسي على الكتابة الأكاديمية.	2026-04-08 18:29:37.197152+00
2189	qualified	مؤهّل	B1	adj.	She is highly qualified for the position.	إنها مؤهّلة بشكل عالٍ للمنصب.	2026-04-08 18:29:37.197152+00
2190	rapid	سريع	B1	adj.	The rapid growth of technology has changed society.	النمو السريع للتكنولوجيا غيّر المجتمع.	2026-04-08 18:29:37.197152+00
2191	rational	عقلاني	B1	adj.	She made a calm and rational decision.	اتخذت قراراً هادئاً وعقلانياً.	2026-04-08 18:29:37.197152+00
2192	secure	يُؤمِّن	B1	v.	She secured funding for her research project.	أمّنت تمويلاً لمشروعها البحثي.	2026-04-08 18:29:37.197152+00
2193	seek	يسعى	B1	v.	She always seeks to improve her professional skills.	إنها تسعى دائماً إلى تحسين مهاراتها المهنية.	2026-04-08 18:29:37.197152+00
2194	select	يختار	B1	v.	She was selected to lead the international team.	اختيرت لقيادة الفريق الدولي.	2026-04-08 18:29:37.197152+00
2195	sensitive	حساس	B1	adj.	This is a sensitive issue that requires careful discussion.	هذه قضية حساسة تتطلب نقاشاً دقيقاً.	2026-04-08 18:29:37.197152+00
2196	separate	يُفصل	B1	v.	It is important to separate personal and professional matters.	من المهم الفصل بين الأمور الشخصية والمهنية.	2026-04-08 18:29:37.197152+00
2197	series	سلسلة	B1	n.	She attended a series of lectures on language learning.	حضرت سلسلة من المحاضرات حول تعلم اللغة.	2026-04-08 18:29:37.197152+00
2198	shortage	نقص	B1	n.	There is a shortage of qualified teachers in the area.	هناك نقص في المعلمين المؤهلين في المنطقة.	2026-04-08 18:29:37.197152+00
2199	stability	استقرار	B1	n.	Political stability is important for economic growth.	الاستقرار السياسي مهم للنمو الاقتصادي.	2026-04-08 18:29:37.197152+00
2200	struggle	يكافح	B1	v.	She struggled to balance work and family life.	كافحت للتوفيق بين العمل والحياة الأسرية.	2026-04-08 18:29:37.197152+00
2169	numerous	عديدة	B1	adj.	There are numerous reasons to learn a second language.	هناك أسباب عديدة لتعلم لغة ثانية.	2026-04-08 18:29:37.197152+00
2170	navigate	يتنقل في	B1	v.	She learned to navigate the complex bureaucratic system.	تعلّمت التعامل مع النظام البيروقراطي المعقد.	2026-04-08 18:29:37.197152+00
2171	milestone	علامة فارقة	B1	n.	Passing the exam was a major milestone in her life.	كان اجتياز الامتحان حدثاً بارزاً في حياتها.	2026-04-08 18:29:37.197152+00
2183	outstanding	متميز	B1	adj.	Her academic performance was outstanding last year.	كان أداؤها الأكاديمي بارزاً العام الماضي.	2026-04-08 18:29:37.197152+00
2185	persistent	مستمر	B1	adj.	She was persistent in pursuing her academic goals.	كانت مثابرة في السعي وراء أهدافها الأكاديمية.	2026-04-08 18:29:37.197152+00
2204	unexpected	غير متوقع	B1	adj.	The news was completely unexpected.	كانت الأخبار غير متوقعة على الإطلاق.	2026-04-08 18:29:37.200487+00
2205	unfortunately	لسوء الحظ	B1	adv.	Unfortunately, they missed the last bus.	لسوء الحظ، فوّتوا الحافلة الأخيرة.	2026-04-08 18:29:37.200487+00
2206	unless	إلا إذا	B1	conj.	You will not succeed unless you work hard.	لن تنجح إلا إذا عملت بجد.	2026-04-08 18:29:37.200487+00
2207	urgent	عاجل	B1	adj.	She received an urgent message from her manager.	تلقّت رسالة عاجلة من مديرها.	2026-04-08 18:29:37.200487+00
2208	vast	هائل	B1	adj.	There is a vast amount of information available online.	هناك كمية هائلة من المعلومات المتاحة عبر الإنترنت.	2026-04-08 18:29:37.200487+00
2210	virtual	افتراضي	B1	adj.	The conference was held virtually this year.	عُقد المؤتمر بشكل افتراضي هذا العام.	2026-04-08 18:29:37.200487+00
2211	voluntary	طوعي	B1	adj.	Her participation in the project was entirely voluntary.	كانت مشاركتها في المشروع طوعية تماماً.	2026-04-08 18:29:37.200487+00
2212	worth	يستحق	B1	adj.	The effort was absolutely worth it in the end.	كان الجهد يستحق في نهاية المطاف.	2026-04-08 18:29:37.200487+00
2213	novel	جديد	B1	adj.	She presented a novel approach to the research problem.	قدّمت نهجاً جديداً للمشكلة البحثية.	2026-04-08 18:29:37.200487+00
2214	overall	شامل	B1	adj.	Her overall performance was excellent this year.	كان أداؤها الشامل ممتازاً هذا العام.	2026-04-08 18:29:37.200487+00
2215	overseas	في الخارج	B1	adv.	She studied overseas for two years.	درست في الخارج لمدة عامين.	2026-04-08 18:29:37.200487+00
2216	owner	مالك	B1	n.	The owner of the shop decided to expand his business.	قرّر مالك المتجر توسيع أعماله.	2026-04-08 18:29:37.200487+00
2218	peak	ذروة	B1	n.	The company reached its peak sales in summer.	وصلت الشركة إلى ذروة مبيعاتها في الصيف.	2026-04-08 18:29:37.200487+00
2219	permit	يسمح	B1	v.	The rules do not permit talking during the exam.	لا تُجيز القواعد التحدث أثناء الامتحان.	2026-04-08 18:29:37.200487+00
2220	personal	شخصي	B1	adj.	She shared some personal information about her background.	شاركت بعض المعلومات الشخصية عن خلفيتها.	2026-04-08 18:29:37.200487+00
2221	phase	مرحلة	B1	n.	The first phase of the project has been completed.	اكتملت المرحلة الأولى من المشروع.	2026-04-08 18:29:37.200487+00
2222	previous	سابق	B1	adj.	Her previous experience helped her get the job.	ساعدتها تجربتها السابقة في الحصول على الوظيفة.	2026-04-08 18:29:37.200487+00
2223	probably	على الأرجح	B1	adv.	She will probably finish the project by tomorrow.	على الأرجح ستنتهي من المشروع بحلول الغد.	2026-04-08 18:29:37.200487+00
2224	reasonable	معقول	B1	adj.	The price of the apartment was very reasonable.	كان سعر الشقة معقولاً جداً.	2026-04-08 18:29:37.200487+00
2225	recently	مؤخراً	B1	adv.	She recently completed a course in business management.	أكملت مؤخراً دورة في إدارة الأعمال.	2026-04-08 18:29:37.200487+00
2226	regional	إقليمي	B1	adj.	There are many regional differences in the country.	هناك اختلافات إقليمية كثيرة في البلاد.	2026-04-08 18:29:37.200487+00
2227	release	يُصدر	B1	v.	The company released its new app last week.	أصدرت الشركة تطبيقها الجديد الأسبوع الماضي.	2026-04-08 18:29:37.200487+00
2229	request	طلب	B1	n.	She made a formal request to change her assignment.	قدّمت طلباً رسمياً لتغيير مهمتها.	2026-04-08 18:29:37.200487+00
2230	resident	مقيم	B1	n.	Local residents opposed the plans for a new road.	عارض السكان المحليون خطط إنشاء طريق جديد.	2026-04-08 18:29:37.200487+00
2231	resolve	يحلّ	B1	v.	They managed to resolve the conflict peacefully.	تمكّنوا من حلّ النزاع بسلام.	2026-04-08 18:29:37.200487+00
2232	roughly	تقريباً	B1	adv.	The project will take roughly six months to finish.	سيستغرق المشروع ما يقارب ستة أشهر لإنهائه.	2026-04-08 18:29:37.200487+00
2233	slope	منحدر	B1	n.	The road has a steep slope leading to the valley.	الطريق فيه منحدر حاد يؤدي إلى الوادي.	2026-04-08 18:29:37.200487+00
2235	strengthen	يُقوّي	B1	v.	Regular practice helps strengthen your language skills.	تساعد الممارسة المنتظمة على تعزيز مهاراتك اللغوية.	2026-04-08 18:29:37.200487+00
2236	submit	يُقدّم	B1	v.	She submitted her assignment before the deadline.	قدّمت مهمتها قبل الموعد النهائي.	2026-04-08 18:29:37.200487+00
2237	subsequently	لاحقاً	B1	adv.	She was promoted and subsequently given a bigger team.	حظيت بترقية وأُعطيت لاحقاً فريقاً أكبر.	2026-04-08 18:29:37.200487+00
2238	summarize	يُلخّص	B1	v.	Please summarize the main points of the article.	يرجى تلخيص النقاط الرئيسية في المقال.	2026-04-08 18:29:37.200487+00
2239	temporary	مؤقت	B1	adj.	She took a temporary job while looking for something permanent.	أخذت وظيفة مؤقتة بينما تبحث عن شيء دائم.	2026-04-08 18:29:37.200487+00
2240	tend	يميل	B1	v.	Students tend to perform better with regular feedback.	يميل الطلاب إلى الأداء بشكل أفضل مع التغذية الراجعة المنتظمة.	2026-04-08 18:29:37.200487+00
2242	tolerance	تسامح	B1	n.	Tolerance and respect are key values in our school.	التسامح والاحترام من القيم الأساسية في مدرستنا.	2026-04-08 18:29:37.200487+00
2243	trace	يتتبع	B1	v.	She traced the history of the word back to Latin.	تتبّعت تاريخ الكلمة وعادت بها إلى اللاتينية.	2026-04-08 18:29:37.200487+00
2244	unify	يوحّد	B1	v.	The project aims to unify different departments under one system.	يهدف المشروع إلى توحيد الأقسام المختلفة تحت نظام واحد.	2026-04-08 18:29:37.200487+00
2245	unit	وحدة	B1	n.	Each unit of the course covers a different skill.	تغطي كل وحدة من الدورة مهارة مختلفة.	2026-04-08 18:29:37.200487+00
2217	pause	يتوقف	B1	v.	She paused for a moment before answering the question.	توقفت لحظة قبل الإجابة على السؤال.	2026-04-08 18:29:37.200487+00
2228	remarkable	ملحوظ	B1	adj.	She showed remarkable progress in her studies.	أظهرت تقدّماً رائعاً في دراستها.	2026-04-08 18:29:37.200487+00
2234	speculation	تكهن	B1	n.	There is a lot of speculation about the new policy.	هناك الكثير من التخمين حول السياسة الجديدة.	2026-04-08 18:29:37.200487+00
2241	thoughtful	متأمل	B1	adj.	She gave a thoughtful response to the question.	قدّمت إجابة مدروسة على السؤال.	2026-04-08 18:29:37.200487+00
2248	vocational	مهني	B1	adj.	She enrolled in a vocational training program.	انضمت إلى برنامج تدريب مهني.	2026-04-08 18:29:37.200487+00
2249	warn	يُحذّر	B1	v.	The teacher warned students about the difficult exam.	حذّر المعلم الطلاب من صعوبة الامتحان.	2026-04-08 18:29:37.200487+00
2250	weight	وزن	B1	n.	She gave equal weight to all factors in her decision.	أعطت وزناً متساوياً لجميع العوامل في قرارها.	2026-04-08 18:29:37.200487+00
2251	willingness	استعداد	B1	n.	Her willingness to help made her popular with colleagues.	جعلها استعدادها للمساعدة محبوبة لدى الزملاء.	2026-04-08 18:29:37.200487+00
2252	withdraw	ينسحب	B1	v.	She withdrew from the competition due to illness.	انسحبت من المسابقة بسبب المرض.	2026-04-08 18:29:37.200487+00
2253	annually	سنوياً	B1	adv.	The report is published annually.	يُنشر التقرير سنوياً.	2026-04-08 18:29:37.200487+00
2255	barely	بالكاد	B1	adv.	She barely had enough time to finish the report.	بالكاد كان لديها وقت كافٍ لإنهاء التقرير.	2026-04-08 18:29:37.200487+00
2256	beforehand	مسبقاً	B1	adv.	She prepared everything beforehand to save time.	أعدّت كل شيء مسبقاً لتوفير الوقت.	2026-04-08 18:29:37.200487+00
2257	boost	يُعزّز	B1	v.	Reading regularly boosts vocabulary and comprehension.	القراءة المنتظمة تُعزّز المفردات والفهم.	2026-04-08 18:29:37.200487+00
2259	cease	يتوقف	B1	v.	Construction work must cease during the school exams.	يجب أن تتوقف أعمال البناء خلال امتحانات المدرسة.	2026-04-08 18:29:37.200487+00
2260	clarify	يُوضّح	B1	v.	Can you clarify what you mean by that statement?	هل يمكنك توضيح ما تعنيه بذلك البيان؟	2026-04-08 18:29:37.200487+00
2261	constitute	يُكوّن	B1	v.	These ten points constitute the main argument of the essay.	هذه النقاط العشر تُكوّن الحجة الرئيسية للمقال.	2026-04-08 18:29:37.200487+00
2262	currently	حالياً	B1	adv.	She is currently enrolled in two courses.	هي مسجّلة حالياً في دورتين.	2026-04-08 18:29:37.200487+00
2263	dedicated	مخصص	B1	adj.	She is dedicated to improving education in her community.	إنها مكرّسة لتحسين التعليم في مجتمعها.	2026-04-08 18:29:37.200487+00
2264	delay	تأخير	B1	n.	A delay in the response caused major problems.	تسبّب التأخير في الاستجابة بمشاكل كبيرة.	2026-04-08 18:29:37.200487+00
2265	democratically	ديمقراطياً	B1	adv.	The committee was democratically elected by the members.	انتُخبت اللجنة ديمقراطياً من قِبَل الأعضاء.	2026-04-08 18:29:37.200487+00
2267	equality	مساواة	B1	n.	Equality in education is a fundamental human right.	المساواة في التعليم حق إنساني أساسي.	2026-04-08 18:29:37.200487+00
2268	estimate	يُقدّر	B1	v.	She estimated that the project would take three months.	قدّرت أن المشروع سيستغرق ثلاثة أشهر.	2026-04-08 18:29:37.200487+00
2270	extraordinary	استثنائي	B1	adj.	She showed extraordinary talent in the competition.	أظهرت موهبة استثنائية في المسابقة.	2026-04-08 18:29:37.200487+00
2272	final	نهائي	B1	adj.	The final exam will cover all topics from the course.	سيشمل الامتحان النهائي جميع موضوعات الدورة.	2026-04-08 18:29:37.200487+00
2273	firstly	أولاً	B1	adv.	Firstly, we need to define the problem clearly.	أولاً، نحن بحاجة إلى تحديد المشكلة بوضوح.	2026-04-08 18:29:37.200487+00
2274	impress	يُبهر	B1	v.	She impressed the panel with her clear presentation.	أبهرت اللجنة بعرضها الواضح.	2026-04-08 18:29:37.200487+00
2275	indication	مؤشر	B1	n.	Early results are a good indication of success.	النتائج المبكرة مؤشر جيد على النجاح.	2026-04-08 18:29:37.200487+00
2276	individually	بشكل فردي	B1	adv.	Students were assessed individually to measure progress.	قُيّم الطلاب بشكل فردي لقياس التقدم.	2026-04-08 18:29:37.200487+00
2277	initial	أولي	B1	adj.	The initial results were very encouraging.	كانت النتائج الأولية مشجعة جداً.	2026-04-08 18:29:37.200487+00
2278	innovative	مبتكر	B1	adj.	She brought innovative ideas to the project.	أحضرت أفكاراً مبتكرة إلى المشروع.	2026-04-08 18:29:37.200487+00
2279	long-term	طويل المدى	B1	adj.	Long-term planning is essential for educational success.	التخطيط طويل المدى ضروري للنجاح التعليمي.	2026-04-08 18:29:37.200487+00
2281	organise	ينظّم	B1	v.	She helped organise the annual student conference.	ساعدت في تنظيم المؤتمر الطلابي السنوي.	2026-04-08 18:29:37.200487+00
2282	precisely	بدقة	B1	adv.	She expressed her ideas precisely and clearly.	عبّرت عن أفكارها بدقة ووضوح.	2026-04-08 18:29:37.200487+00
2283	schedule	جدول	B1	n.	She follows a strict study schedule every day.	تتبع جدولاً دراسياً صارماً كل يوم.	2026-04-08 18:29:37.200487+00
2284	talent	موهبة	B1	n.	She has a natural talent for languages.	لديها موهبة طبيعية في اللغات.	2026-04-08 18:29:37.200487+00
2285	technically	من الناحية التقنية	B1	adv.	Technically, the answer is correct but lacks detail.	من الناحية التقنية، الإجابة صحيحة ولكنها تفتقر إلى التفاصيل.	2026-04-08 18:29:37.200487+00
2286	theme	موضوع	B1	n.	The main theme of the essay is environmental responsibility.	الموضوع الرئيسي للمقال هو المسؤولية البيئية.	2026-04-08 18:29:37.200487+00
2287	thoroughly	بشكل شامل	B1	adv.	She thoroughly reviewed each section of the report.	راجعت كل قسم من التقرير بشكل شامل.	2026-04-08 18:29:37.200487+00
2288	transparency	شفافية	B1	n.	Transparency in government builds public trust.	الشفافية في الحكومة تبني الثقة العامة.	2026-04-08 18:29:37.200487+00
2289	underlying	كامن	B1	adj.	The underlying cause of the problem was lack of planning.	كان السبب الكامن وراء المشكلة نقص التخطيط.	2026-04-08 18:29:37.200487+00
2258	broadly	على نحو عام	B1	adv.	The idea was broadly supported by the team.	حظيت الفكرة بدعم واسع من الفريق.	2026-04-08 18:29:37.200487+00
2266	division	انقسام	B1	n.	She works in the marketing division of the company.	تعمل في قسم التسويق في الشركة.	2026-04-08 18:29:37.200487+00
2269	exhibit	يعرض	B1	v.	She exhibited strong leadership skills from a young age.	أظهرت مهارات قيادية قوية منذ سن مبكرة.	2026-04-08 18:29:37.200487+00
2271	fairly	إلى حد ما	B1	adv.	All students must be treated fairly and equally.	يجب معاملة جميع الطلاب بشكل عادل ومتساوٍ.	2026-04-08 18:29:37.200487+00
2280	mainly	أساساً	B1	adv.	The students were mainly from urban areas.	كان الطلاب بشكل رئيسي من المناطق الحضرية.	2026-04-08 18:29:37.200487+00
2291	accessible	قابل للوصول	B2	adj.	The website should be accessible to all users.	ينبغي أن يكون الموقع الإلكتروني قابلاً للوصول لجميع المستخدمين.	2026-04-08 18:29:37.200487+00
2292	allocation	تخصيص	B2	n.	The allocation of resources must be done efficiently.	يجب أن يتم تخصيص الموارد بكفاءة.	2026-04-08 18:29:37.200487+00
2293	applicable	قابل للتطبيق	B2	adj.	These rules are applicable to all academic submissions.	هذه القواعد قابلة للتطبيق على جميع المقدمات الأكاديمية.	2026-04-08 18:29:37.200487+00
2294	assertion	تأكيد	B2	n.	Her assertion was supported by strong scientific evidence.	كان ادعاؤها مدعوماً بأدلة علمية قوية.	2026-04-08 18:29:37.200487+00
2295	assumption	افتراض	B2	n.	The study is based on the assumption that conditions are stable.	تستند الدراسة إلى افتراض أن الأوضاع مستقرة.	2026-04-08 18:29:37.200487+00
2296	categorize	يُصنّف	B2	v.	Scientists categorize species based on their characteristics.	يُصنّف العلماء الأنواع بناءً على خصائصها.	2026-04-08 18:29:37.200487+00
2297	complexity	تعقيد	B2	n.	The complexity of the issue requires careful analysis.	يتطلب تعقيد المسألة تحليلاً دقيقاً.	2026-04-08 18:29:37.200487+00
2298	comply	يمتثل	B2	v.	All students must comply with the academic regulations.	يجب على جميع الطلاب الامتثال للوائح الأكاديمية.	2026-04-08 18:29:37.200487+00
2299	conceptual	مفاهيمي	B2	adj.	The conceptual framework of the research is clearly defined.	الإطار المفاهيمي للبحث محدد بوضوح.	2026-04-08 18:29:37.200487+00
2300	consequently	وبالتالي	B2	adv.	She failed to prepare; consequently, she failed the exam.	أخفقت في الاستعداد؛ وبالتالي رسبت في الامتحان.	2026-04-08 18:29:37.200487+00
2301	contrasting	متناقض	B2	adj.	The two reports present contrasting views on the topic.	يقدّم التقريران وجهتَي نظر متناقضتَين حول الموضوع.	2026-04-08 18:29:37.204518+00
2302	correlation	ارتباط	B2	n.	There is a clear correlation between poverty and poor health.	هناك ارتباط واضح بين الفقر وتردّي الصحة.	2026-04-08 18:29:37.204518+00
2303	critique	نقد	B2	n.	She gave a detailed critique of the research methodology.	قدّمت نقداً مفصلاً لمنهجية البحث.	2026-04-08 18:29:37.204518+00
2304	definitive	قاطع	B2	adj.	The study does not provide a definitive answer.	لا تُقدّم الدراسة إجابة قاطعة.	2026-04-08 18:29:37.204518+00
2305	depict	يُصوّر	B2	v.	The graph depicts a steady increase over ten years.	يُصوّر الرسم البياني زيادة ثابتة على مدى عشر سنوات.	2026-04-08 18:29:37.204518+00
2306	discourse	خطاب	B2	n.	The academic discourse on climate change is evolving.	يتطوّر الخطاب الأكاديمي حول تغير المناخ.	2026-04-08 18:29:37.204518+00
2307	distinct	مميّز	B2	adj.	There are three distinct phases in the research process.	هناك ثلاث مراحل مميّزة في عملية البحث.	2026-04-08 18:29:37.204518+00
2308	dominance	هيمنة	B2	n.	The dominance of English in science is well-established.	هيمنة اللغة الإنجليزية في العلوم راسخة.	2026-04-08 18:29:37.204518+00
2309	encompass	يشمل	B2	v.	The course encompasses a broad range of academic topics.	تشمل الدورة مجموعة واسعة من الموضوعات الأكاديمية.	2026-04-08 18:29:37.204518+00
2310	entity	كيان	B2	n.	The organization functions as an independent legal entity.	تعمل المنظمة كيانًا قانونيًا مستقلاً.	2026-04-08 18:29:37.204518+00
2311	equivalent	معادل	B2	adj.	This qualification is equivalent to a university degree.	هذه المؤهلات معادلة للشهادة الجامعية.	2026-04-08 18:29:37.204518+00
2312	exclusively	حصراً	B2	adv.	The study focused exclusively on urban populations.	ركّزت الدراسة حصراً على السكان الحضريين.	2026-04-08 18:29:37.204518+00
2313	feasible	قابل للتنفيذ	B2	adj.	The plan is feasible given the available resources.	الخطة قابلة للتنفيذ في ضوء الموارد المتاحة.	2026-04-08 18:29:37.204518+00
2314	inconsistent	غير متسق	B2	adj.	The data was inconsistent with previous research findings.	كانت البيانات غير متسقة مع نتائج الأبحاث السابقة.	2026-04-08 18:29:37.204518+00
2315	integral	أساسي	B2	adj.	Community engagement is integral to the project's success.	المشاركة المجتمعية أساسية لنجاح المشروع.	2026-04-08 18:29:37.204518+00
2316	limitation	قيد	B2	n.	The study acknowledges its limitations clearly.	تُقرّ الدراسة بقيودها بوضوح.	2026-04-08 18:29:37.204518+00
2317	methodical	منهجي	B2	adj.	She takes a methodical approach to solving problems.	تتبنّى نهجاً منهجياً في حل المشكلات.	2026-04-08 18:29:37.204518+00
2318	notion	فكرة	B2	n.	The notion that hard work always leads to success is common.	فكرة أن العمل الجاد يؤدي دائماً إلى النجاح شائعة.	2026-04-08 18:29:37.204518+00
2319	observable	قابل للملاحظة	B2	adj.	The effect was observable across all test groups.	كان التأثير قابلاً للملاحظة في جميع مجموعات الاختبار.	2026-04-08 18:29:37.204518+00
2320	omit	يُغفل	B2	v.	Do not omit any relevant information from your essay.	لا تُغفل أي معلومة ذات صلة في مقالتك.	2026-04-08 18:29:37.204518+00
2321	output	ناتج	B2	n.	The economic output of the country increased last year.	ازداد الناتج الاقتصادي للبلاد العام الماضي.	2026-04-08 18:29:37.204518+00
2322	parallel	متوازٍ	B2	adj.	There is a parallel between the two cases in history.	هناك تشابه بين الحالتَين في التاريخ.	2026-04-08 18:29:37.204518+00
2323	phenomena	ظواهر	B2	n.	Climate phenomena are studied by meteorologists worldwide.	تدرس ظواهر المناخ علماء الأرصاد الجوية حول العالم.	2026-04-08 18:29:37.204518+00
2324	preceding	السابق	B2	adj.	The preceding section explains the context of the study.	يشرح القسم السابق سياق الدراسة.	2026-04-08 18:29:37.204518+00
2325	predominant	سائد	B2	adj.	The predominant view is that education reduces poverty.	الرأي السائد هو أن التعليم يُقلّل الفقر.	2026-04-08 18:29:37.204518+00
2326	prior	سابق	B2	adj.	Prior knowledge of statistics is helpful for this course.	المعرفة السابقة بالإحصاء مفيدة لهذه الدورة.	2026-04-08 18:29:37.204518+00
2327	reliable	موثوق	B2	adj.	The data from the survey is considered highly reliable.	تُعدّ البيانات الواردة من المسح موثوقة للغاية.	2026-04-08 18:29:37.204518+00
2328	significantly	بشكل ملحوظ	B2	adv.	The results improved significantly after the intervention.	تحسّنت النتائج بشكل ملحوظ بعد التدخل.	2026-04-08 18:29:37.204518+00
2329	straightforward	مباشر	B2	adj.	The process is straightforward once you understand the steps.	العملية مباشرة بمجرد فهم الخطوات.	2026-04-08 18:29:37.204518+00
2330	thereby	وبذلك	B2	adv.	The policy was changed, thereby improving efficiency.	تغيّرت السياسة، وبذلك تحسّنت الكفاءة.	2026-04-08 18:29:37.204518+00
2331	transformation	تحوّل	B2	n.	The transformation of the economy took many decades.	استغرق التحوّل في الاقتصاد عقوداً عديدة.	2026-04-08 18:29:37.204518+00
2332	validity	صحة	B2	n.	The validity of the findings depends on the sample size.	تعتمد صحة النتائج على حجم العينة.	2026-04-08 18:29:37.204518+00
2333	civic	مدني	B2	adj.	Voting is a civic duty in a democratic society.	التصويت واجب مدني في مجتمع ديمقراطي.	2026-04-08 18:29:37.204518+00
2334	coexist	يتعايش	B2	v.	Different communities can coexist peacefully.	يمكن للمجتمعات المختلفة التعايش بسلام.	2026-04-08 18:29:37.204518+00
2335	cognitive	معرفي	B2	adj.	Reading regularly improves cognitive development in children.	القراءة المنتظمة تُحسّن التطور المعرفي عند الأطفال.	2026-04-08 18:29:37.204518+00
2336	connotation	دلالة	B2	n.	The word has both positive and negative connotations.	للكلمة دلالات إيجابية وسلبية معاً.	2026-04-08 18:29:37.204518+00
2337	consistently	باستمرار	B2	adv.	She consistently performed well throughout the course.	أدّت أداءً جيداً باستمرار طوال الدورة.	2026-04-08 18:29:37.204518+00
2338	contradictory	متناقض	B2	adj.	The two studies produced contradictory findings.	أنتجت الدراستان نتائج متناقضة.	2026-04-08 18:29:37.204518+00
2339	convey	يُعبّر عن	B2	v.	She conveyed her ideas clearly through her writing.	عبّرت عن أفكارها بوضوح من خلال كتابتها.	2026-04-08 18:29:37.204518+00
2340	counterpart	نظير	B2	n.	The local managers met their international counterparts.	التقى المديرون المحليون بنظرائهم الدوليين.	2026-04-08 18:29:37.204518+00
2341	denote	يدل على	B2	v.	The symbol denotes a statistically significant result.	يدل الرمز على نتيجة ذات دلالة إحصائية.	2026-04-08 18:29:37.204518+00
2342	disproportionate	غير متناسب	B2	adj.	The punishment was disproportionate to the offence.	كانت العقوبة غير متناسبة مع الجريمة.	2026-04-08 18:29:37.204518+00
2343	domain	مجال	B2	n.	Artificial intelligence is transforming many domains.	يُحوّل الذكاء الاصطناعي مجالات عديدة.	2026-04-08 18:29:37.204518+00
2344	foremost	أبرز	B2	adj.	She is one of the foremost scholars in this field.	تُعدّ من أبرز الباحثين في هذا المجال.	2026-04-08 18:29:37.204518+00
2345	generic	عام	B2	adj.	She replaced the branded medicine with a generic version.	استبدلت الدواء الماركي بنسخة عامة.	2026-04-08 18:29:37.204518+00
2346	hierarchical	هرمي	B2	adj.	The company has a hierarchical management structure.	للشركة هيكل إداري هرمي.	2026-04-08 18:29:37.204518+00
2347	implicit	ضمني	B2	adj.	There was an implicit understanding between the two parties.	كان هناك تفاهم ضمني بين الطرفين.	2026-04-08 18:29:37.204518+00
2348	incidence	معدل تكرار	B2	n.	The incidence of the disease has increased over five years.	ارتفع معدل تكرار المرض على مدى خمس سنوات.	2026-04-08 18:29:37.204518+00
2349	induce	يُحدث	B2	v.	Stress can induce physical health problems.	يمكن للتوتر أن يُحدث مشاكل صحية جسدية.	2026-04-08 18:29:37.204518+00
2350	invariably	دائماً	B2	adv.	She invariably arrived on time for every meeting.	كانت دائماً تصل في الوقت المحدد لكل اجتماع.	2026-04-08 18:29:37.204518+00
2351	mediate	يتوسط	B2	v.	She was asked to mediate between the two departments.	طُلب منها التوسط بين القسمين.	2026-04-08 18:29:37.204518+00
2352	mobilize	يحشد	B2	v.	The charity mobilized volunteers across the country.	حشدت الجمعية الخيرية المتطوعين في جميع أنحاء البلاد.	2026-04-08 18:29:37.204518+00
2353	nuance	دقة في التمييز	B2	n.	Understanding cultural nuance is important in communication.	فهم الدقائق الثقافية مهم في التواصل.	2026-04-08 18:29:37.204518+00
2354	predominate	يسود	B2	v.	A scientific approach predominates in modern medicine.	يسود النهج العلمي في الطب الحديث.	2026-04-08 18:29:37.204518+00
2355	preliminary	أولي	B2	adj.	The preliminary results suggest a positive outcome.	تُشير النتائج الأولية إلى نتيجة إيجابية.	2026-04-08 18:29:37.204518+00
2356	prohibit	يحظر	B2	v.	The new law prohibits the use of single-use plastics.	يحظر القانون الجديد استخدام البلاستيك أحادي الاستخدام.	2026-04-08 18:29:37.204518+00
2357	reconcile	يوفّق	B2	v.	It is difficult to reconcile the two conflicting reports.	يصعب التوفيق بين التقريرَين المتعارضَين.	2026-04-08 18:29:37.204518+00
2358	reiterate	يُكرّر	B2	v.	The teacher reiterated the importance of revision.	كرّر المعلم أهمية المراجعة.	2026-04-08 18:29:37.204518+00
2359	relevance	صلة	B2	n.	The relevance of the research to daily life is clear.	صلة البحث بالحياة اليومية واضحة.	2026-04-08 18:29:37.204518+00
2360	representation	تمثيل	B2	n.	The study examines the representation of women in science.	تفحص الدراسة تمثيل المرأة في العلوم.	2026-04-08 18:29:37.204518+00
2361	salient	بارز	B2	adj.	The report highlighted the most salient points.	أبرز التقرير النقاط الأكثر بروزاً.	2026-04-08 18:29:37.204518+00
2362	stereotype	صورة نمطية	B2	n.	Stereotypes can prevent fair and equal treatment.	يمكن أن تحول الصور النمطية دون المعاملة العادلة والمتساوية.	2026-04-08 18:29:37.204518+00
2363	subjectivity	ذاتية	B2	n.	Subjectivity can influence the results of qualitative research.	يمكن للذاتية أن تؤثر في نتائج البحث النوعي.	2026-04-08 18:29:37.204518+00
2364	synthesis	تركيب	B2	n.	Her essay provided a synthesis of several key theories.	قدّمت مقالتها تركيباً لعدة نظريات رئيسية.	2026-04-08 18:29:37.204518+00
2365	temporal	زمني	B2	adj.	The study examined temporal changes over ten years.	فحصت الدراسة التغيرات الزمنية على مدى عشر سنوات.	2026-04-08 18:29:37.204518+00
2366	tentative	مبدئي	B2	adj.	The conclusions are tentative and require more research.	الاستنتاجات مبدئية وتتطلب مزيداً من البحث.	2026-04-08 18:29:37.204518+00
2367	thorough	شامل	B2	adj.	She conducted a thorough review of the relevant literature.	أجرت مراجعة شاملة للأدبيات ذات الصلة.	2026-04-08 18:29:37.204518+00
2368	unconventional	غير تقليدي	B2	adj.	Her unconventional approach produced surprising results.	أسفر نهجها غير التقليدي عن نتائج مفاجئة.	2026-04-08 18:29:37.204518+00
2369	vague	غامض	B2	adj.	The instructions were vague and difficult to follow.	كانت التعليمات غامضة ويصعب اتباعها.	2026-04-08 18:29:37.204518+00
2370	diverge	يتباين	B2	v.	The two approaches diverge on the key point.	يتباين النهجان في النقطة المحورية.	2026-04-08 18:29:37.204518+00
2371	obscure	غامض	B2	adj.	The argument was obscure and difficult to follow.	كانت الحجة غامضة ويصعب متابعتها.	2026-04-08 18:29:37.204518+00
2372	refute	يدحض	B2	v.	New evidence refuted the previously accepted theory.	دحضت الأدلة الجديدة النظرية المقبولة سابقاً.	2026-04-08 18:29:37.204518+00
2373	abstraction	تجريد	B2	n.	The level of abstraction in the theory makes it hard to test.	مستوى التجريد في النظرية يجعل اختبارها أمراً صعباً.	2026-04-08 18:29:37.204518+00
2374	chronological	زمني/تسلسلي	B2	adj.	The events are presented in chronological order.	تُعرض الأحداث بترتيب زمني.	2026-04-08 18:29:37.204518+00
2375	circumstantial	ظرفي	B2	adj.	The evidence against him was mainly circumstantial.	كانت الأدلة ضده ظرفية بشكل رئيسي.	2026-04-08 18:29:37.204518+00
2376	concur	يتفق	B2	v.	Most experts concur that the findings are significant.	يتفق معظم الخبراء على أن النتائج مهمة.	2026-04-08 18:29:37.204518+00
2377	counterproductive	عكس المطلوب	B2	adj.	Trying too hard can sometimes be counterproductive.	المحاولة المفرطة يمكن أن تكون أحياناً عكس المطلوب.	2026-04-08 18:29:37.204518+00
2378	criterion	معيار	B2	n.	The main criterion for selection was academic achievement.	المعيار الرئيسي للاختيار كان التحصيل الأكاديمي.	2026-04-08 18:29:37.204518+00
2379	decentralize	يُفوّض	B2	v.	The government plans to decentralize decision-making.	تخطط الحكومة لتفويض صنع القرار.	2026-04-08 18:29:37.204518+00
2380	decipher	يُفكّك	B2	v.	She managed to decipher the complex data set.	تمكّنت من فكّ رموز مجموعة البيانات المعقدة.	2026-04-08 18:29:37.204518+00
2381	empirically	تجريبياً	B2	adv.	The hypothesis was tested empirically in a controlled setting.	اختُبرت الفرضية تجريبياً في بيئة محكومة.	2026-04-08 18:29:37.204518+00
2383	inconclusive	غير حاسم	B2	adj.	The results were inconclusive and require more testing.	كانت النتائج غير حاسمة وتتطلب مزيداً من الاختبارات.	2026-04-08 18:29:37.204518+00
2384	overarching	شامل	B2	adj.	The overarching goal of the study is to improve education.	الهدف الشامل للدراسة هو تحسين التعليم.	2026-04-08 18:29:37.204518+00
2385	administer	يُدير	B1	verb	A nurse will administer the medication.	ستُعطي الممرضة الدواء.	2026-04-08 18:29:37.204518+00
2386	automate	يُؤتمت	B1	verb	Companies automate repetitive tasks to save time.	تؤتمت الشركات المهام المتكررة لتوفير الوقت.	2026-04-08 18:29:37.204518+00
2387	consult	يستشير	B1	verb	You should consult a doctor before taking that medication.	يجب عليك استشارة طبيب قبل تناول هذا الدواء.	2026-04-08 18:29:37.204518+00
2388	delegate	يُفوّض	B1	verb	A good leader knows how to delegate tasks.	يعرف القائد الجيد كيف يفوّض المهام.	2026-04-08 18:29:37.204518+00
2389	persuade	يُقنع	B1	verb	She tried to persuade her friend to join the club.	حاولت إقناع صديقتها بالانضمام إلى النادي.	2026-04-08 18:29:37.204518+00
2390	retrieve	يسترجع	B1	verb	She retrieved the file from the cloud storage.	استرجعت الملف من التخزين السحابي.	2026-04-08 18:29:37.204518+00
2391	simplify	يُبسّط	B1	verb	The teacher simplified the explanation for younger students.	بسّط المعلم الشرح للطلاب الأصغر سنًا.	2026-04-08 18:29:37.204518+00
2392	collaboration	تعاون	B1	noun	The project was a result of collaboration between two universities.	كان المشروع نتيجة تعاون بين جامعتين.	2026-04-08 18:29:37.204518+00
2393	creativity	إبداع	B1	noun	Creativity is an essential skill in the modern workplace.	الإبداع مهارة أساسية في بيئة العمل الحديثة.	2026-04-08 18:29:37.204518+00
2394	efficiency	كفاءة	B1	noun	The new system improved efficiency in the office.	حسّن النظام الجديد الكفاءة في المكتب.	2026-04-08 18:29:37.204518+00
2395	evolution	تطور	B1	noun	The evolution of technology has changed how we work.	غيّر تطور التكنولوجيا طريقة عملنا.	2026-04-08 18:29:37.204518+00
2396	flexibility	مرونة	B1	noun	Flexibility in working hours helps employees balance their lives.	تساعد المرونة في ساعات العمل الموظفين على تحقيق التوازن في حياتهم.	2026-04-08 18:29:37.204518+00
2397	habit	عادة	B1	noun	Reading every day is a good habit.	القراءة كل يوم عادة جيدة.	2026-04-08 18:29:37.204518+00
2398	identity	هوية	B1	noun	Language is an important part of cultural identity.	اللغة جزء مهم من الهوية الثقافية.	2026-04-08 18:29:37.204518+00
2399	independence	استقلالية	B1	noun	Children need independence to grow and learn.	يحتاج الأطفال إلى الاستقلالية للنمو والتعلم.	2026-04-08 18:29:37.204518+00
2400	intelligence	ذكاء	B1	noun	Emotional intelligence is as important as academic intelligence.	الذكاء العاطفي بنفس أهمية الذكاء الأكاديمي.	2026-04-08 18:29:37.204518+00
2401	nationality	جنسية	B1	noun	Her nationality is listed on the official document.	جنسيتها مذكورة في الوثيقة الرسمية.	2026-04-08 18:29:37.207876+00
2402	procedure	إجراء	B1	noun	Follow the correct procedure when applying for a visa.	اتبع الإجراء الصحيح عند التقدم للحصول على تأشيرة.	2026-04-08 18:29:37.207876+00
2404	rejection	رفض	B1	noun	Dealing with rejection is part of learning.	التعامل مع الرفض جزء من التعلم.	2026-04-08 18:29:37.207876+00
2405	resolution	قرار	B1	noun	The committee passed a resolution to improve services.	أصدرت اللجنة قرارًا لتحسين الخدمات.	2026-04-08 18:29:37.207876+00
2406	revision	مراجعة	B1	noun	Regular revision helps you remember information.	تساعدك المراجعة المنتظمة على تذكر المعلومات.	2026-04-08 18:29:37.207876+00
2407	submission	تقديم	B1	noun	The submission date for the essay is Friday.	موعد تقديم المقال هو الجمعة.	2026-04-08 18:29:37.207876+00
2408	symbol	رمز	B1	noun	The dove is a symbol of peace.	الحمامة رمز للسلام.	2026-04-08 18:29:37.207876+00
2409	variation	تباين	B1	noun	There is a wide variation in prices between shops.	هناك تباين كبير في الأسعار بين المحلات.	2026-04-08 18:29:37.207876+00
2410	vacancy	وظيفة شاغرة	B1	noun	There is a vacancy for a math teacher at the school.	هناك وظيفة شاغرة لمعلم رياضيات في المدرسة.	2026-04-08 18:29:37.207876+00
2403	regulation	تنظيم	B1	noun	All businesses must follow government regulations.	يجب على جميع الشركات اتباع اللوائح الحكومية.	2026-04-08 18:29:37.207876+00
2411	calculation	حساب	B1	noun	The calculation showed that costs exceeded the budget.	أظهر الحساب أن التكاليف تجاوزت الميزانية.	2026-04-08 18:29:37.207876+00
2412	equation	معادلة	B1	noun	Solve the equation and find the value of x.	حل المعادلة وأوجد قيمة x.	2026-04-08 18:29:37.207876+00
2413	specimen	عينة	B1	noun	The scientist examined the specimen under a microscope.	فحص العالِم العينة تحت المجهر.	2026-04-08 18:29:37.207876+00
2414	appetite	شهية	B1	noun	A good walk in fresh air improves your appetite.	تُحسّن نزهة جيدة في الهواء الطلق شهيتك.	2026-04-08 18:29:37.207876+00
2415	diagnosis	تشخيص	B1	noun	An early diagnosis can save lives.	يمكن للتشخيص المبكر أن ينقذ الأرواح.	2026-04-08 18:29:37.207876+00
2416	infection	عدوى	B1	noun	Washing your hands prevents the spread of infection.	غسل اليدين يمنع انتشار العدوى.	2026-04-08 18:29:37.207876+00
2417	nutrition	تغذية	B1	noun	Good nutrition is key to a healthy life.	التغذية الجيدة مفتاح حياة صحية.	2026-04-08 18:29:37.207876+00
2418	obesity	سمنة	B1	noun	Obesity is a growing health problem worldwide.	السمنة مشكلة صحية متنامية في جميع أنحاء العالم.	2026-04-08 18:29:37.207876+00
2419	prevention	وقاية	B1	noun	Prevention is better than cure.	الوقاية خير من العلاج.	2026-04-08 18:29:37.207876+00
2420	recovery	تعافٍ	B1	noun	Full recovery after surgery may take weeks.	قد يستغرق التعافي الكامل بعد الجراحة أسابيع.	2026-04-08 18:29:37.207876+00
2423	treatment	علاج	B1	noun	The doctor prescribed a new treatment for the condition.	وصف الطبيب علاجًا جديدًا للحالة.	2026-04-08 18:29:37.207876+00
2424	vaccine	لقاح	B1	noun	The vaccine helped control the spread of the disease.	ساعد اللقاح في السيطرة على انتشار المرض.	2026-04-08 18:29:37.207876+00
2425	currency	عملة	B1	noun	The euro is the currency used in many European countries.	اليورو هو العملة المستخدمة في كثير من الدول الأوروبية.	2026-04-08 18:29:37.207876+00
2426	debt	دين	B1	noun	She worked hard to pay off her debt.	عملت بجد لسداد ديونها.	2026-04-08 18:29:37.207876+00
2427	deficit	عجز	B1	noun	The government is trying to reduce the budget deficit.	تحاول الحكومة تقليص عجز الميزانية.	2026-04-08 18:29:37.207876+00
2428	expenditure	إنفاق	B1	noun	The company reviewed its annual expenditure.	راجعت الشركة إنفاقها السنوي.	2026-04-08 18:29:37.207876+00
2429	inflation	تضخم	B1	noun	High inflation makes everyday goods more expensive.	يجعل التضخم المرتفع السلع اليومية أغلى ثمنًا.	2026-04-08 18:29:37.207876+00
2430	investment	استثمار	B1	noun	Investing in education is the best investment for the future.	الاستثمار في التعليم هو أفضل استثمار للمستقبل.	2026-04-08 18:29:37.207876+00
2431	pension	معاش تقاعدي	B1	noun	He retired and started collecting his pension.	تقاعد وبدأ في تلقي معاشه التقاعدي.	2026-04-08 18:29:37.207876+00
2432	subsidy	دعم مالي	B1	noun	The government provides subsidies to farmers.	تقدم الحكومة دعمًا ماليًا للمزارعين.	2026-04-08 18:29:37.207876+00
2433	unemployment	بطالة	B1	noun	Unemployment rose sharply during the economic crisis.	ارتفعت البطالة بشكل حاد خلال الأزمة الاقتصادية.	2026-04-08 18:29:37.207876+00
2434	wage	أجر	B1	noun	The minimum wage was increased this year.	رُفع الحد الأدنى للأجور هذا العام.	2026-04-08 18:29:37.207876+00
2435	corruption	فساد	B1	noun	Corruption undermines public trust in government.	يُضعف الفساد ثقة الجمهور في الحكومة.	2026-04-08 18:29:37.207876+00
2436	discrimination	تمييز	B1	noun	Discrimination in the workplace is illegal.	التمييز في مكان العمل غير قانوني.	2026-04-08 18:29:37.207876+00
2437	inclusion	شمول	B1	noun	The school promotes inclusion for students of all abilities.	تُعزّز المدرسة الشمول لطلاب من جميع القدرات.	2026-04-08 18:29:37.207876+00
2438	parliament	برلمان	B1	noun	The bill was debated in parliament last week.	نوقش مشروع القانون في البرلمان الأسبوع الماضي.	2026-04-08 18:29:37.207876+00
2439	prejudice	تحيز	B1	noun	Prejudice is often based on ignorance.	كثيرًا ما يستند التحيز إلى الجهل.	2026-04-08 18:29:37.207876+00
2440	privilege	امتياز	B1	noun	Access to education should not be a privilege.	لا ينبغي أن يكون الوصول إلى التعليم امتيازًا.	2026-04-08 18:29:37.207876+00
2441	protest	احتجاج	B1	noun	Thousands joined the peaceful protest in the city centre.	انضم آلاف الأشخاص إلى الاحتجاج السلمي في وسط المدينة.	2026-04-08 18:29:37.207876+00
2442	vote	تصويت	B1	noun	Every citizen has the right to vote.	لكل مواطن الحق في التصويت.	2026-04-08 18:29:37.207876+00
2443	cooperative	متعاون	B1	adjective	A cooperative attitude helps the whole team.	يساعد الموقف المتعاون الفريق بأكمله.	2026-04-08 18:29:37.207876+00
2444	determined	مصمم	B1	adjective	She was determined to pass the exam.	كانت مصممة على اجتياز الامتحان.	2026-04-08 18:29:37.207876+00
2445	eligible	مؤهل	B1	adjective	You must be 18 to be eligible to vote.	يجب أن تبلغ 18 عامًا لتكون مؤهلًا للتصويت.	2026-04-08 18:29:37.207876+00
2446	emotional	عاطفي	B1	adjective	She gave an emotional speech about her journey.	ألقت خطابًا عاطفيًا حول مسيرتها.	2026-04-08 18:29:37.207876+00
2447	inclusive	شامل للجميع	B1	adjective	The school aims to be inclusive for all students.	تسعى المدرسة إلى أن تكون شاملة لجميع الطلاب.	2026-04-08 18:29:37.207876+00
2448	intellectual	فكري	B1	adjective	Reading is an important intellectual activity.	القراءة نشاط فكري مهم.	2026-04-08 18:29:37.207876+00
2449	intense	مكثف	B1	adjective	The training program is very intense.	برنامج التدريب مكثف جدًا.	2026-04-08 18:29:37.207876+00
2450	progressive	تقدمي	B1	adjective	The school has a progressive approach to teaching.	للمدرسة نهج تقدمي في التدريس.	2026-04-08 18:29:37.207876+00
2451	accordingly	وفقًا لذلك	B1	adverb	Please read the instructions and act accordingly.	يرجى قراءة التعليمات والتصرف وفقًا لذلك.	2026-04-08 18:29:37.207876+00
2452	automatically	تلقائيًا	B1	adverb	The lights turn off automatically after 10 minutes.	تنطفئ الأضواء تلقائيًا بعد 10 دقائق.	2026-04-08 18:29:37.207876+00
2453	continuously	بشكل مستمر	B1	adverb	The machine runs continuously day and night.	تعمل الآلة بشكل مستمر ليلًا ونهارًا.	2026-04-08 18:29:37.207876+00
2422	therapy	علاج	B1	noun	She attends therapy every week to manage her stress.	تحضر جلسات العلاج كل أسبوع للتعامل مع ضغوطها.	2026-04-08 18:29:37.207876+00
2454	deliberately	عمدًا	B1	adverb	He deliberately chose the hardest course.	اختار عمدًا المقرر الأصعب.	2026-04-08 18:29:37.207876+00
2455	efficiently	بكفاءة	B1	adverb	She manages her time efficiently.	تُدير وقتها بكفاءة.	2026-04-08 18:29:37.207876+00
2456	formally	رسميًا	B1	adverb	The contract was formally signed by both parties.	وُقّع العقد رسميًا من قِبَل الطرفين.	2026-04-08 18:29:37.207876+00
2457	frequently	بشكل متكرر	B1	adverb	She frequently visits the library.	تزور المكتبة بشكل متكرر.	2026-04-08 18:29:37.207876+00
2458	increasingly	بشكل متزايد	B1	adverb	Technology is becoming increasingly important in education.	تصبح التكنولوجيا بشكل متزايد أكثر أهمية في التعليم.	2026-04-08 18:29:37.207876+00
2459	initially	في البداية	B1	adverb	I was initially nervous about the presentation.	كنت في البداية متوترًا بشأن العرض التقديمي.	2026-04-08 18:29:37.207876+00
2460	necessarily	بالضرورة	B1	adverb	More money does not necessarily mean more happiness.	المزيد من المال لا يعني بالضرورة المزيد من السعادة.	2026-04-08 18:29:37.207876+00
2461	normally	عادةً	B1	adverb	I normally wake up at 6 am.	عادةً ما أستيقظ الساعة السادسة صباحًا.	2026-04-08 18:29:37.207876+00
2462	occasionally	أحيانًا	B1	adverb	We occasionally go out for dinner.	نخرج أحيانًا لتناول العشاء.	2026-04-08 18:29:37.207876+00
2463	particularly	بشكل خاص	B1	adverb	She was particularly interested in science.	كانت مهتمة بشكل خاص بالعلوم.	2026-04-08 18:29:37.207876+00
2464	relatively	نسبيًا	B1	adverb	The exam was relatively easy this year.	كان الامتحان سهلًا نسبيًا هذا العام.	2026-04-08 18:29:37.207876+00
2465	repeatedly	مرارًا وتكرارًا	B1	adverb	He tried repeatedly to solve the problem.	حاول مرارًا وتكرارًا حل المشكلة.	2026-04-08 18:29:37.207876+00
2466	specifically	تحديدًا	B1	adverb	She was looking for a job specifically in marketing.	كانت تبحث عن وظيفة تحديدًا في مجال التسويق.	2026-04-08 18:29:37.207876+00
2467	strongly	بشدة	B1	adverb	I strongly recommend this book to all students.	أوصي بشدة بهذا الكتاب لجميع الطلاب.	2026-04-08 18:29:37.207876+00
2468	successfully	بنجاح	B1	adverb	She successfully completed her training.	أتمّت تدريبها بنجاح.	2026-04-08 18:29:37.207876+00
2469	typically	عادةً	B1	adverb	Students typically spend four years at university.	يمضي الطلاب عادةً أربع سنوات في الجامعة.	2026-04-08 18:29:37.207876+00
2470	widely	على نطاق واسع	B1	adverb	The book is widely read in schools.	يُقرأ الكتاب على نطاق واسع في المدارس.	2026-04-08 18:29:37.207876+00
2471	applicant	مقدّم طلب	B1	noun	More than 500 applicants applied for the job.	تقدّم أكثر من 500 مقدّم طلب للوظيفة.	2026-04-08 18:29:37.207876+00
2472	employer	صاحب عمل	B1	noun	A good employer values the well-being of their staff.	يُقدّر صاحب العمل الجيد رفاهية موظفيه.	2026-04-08 18:29:37.207876+00
2473	graduate	خريج	B1	noun	She was among the top graduates of her year.	كانت من بين أفضل خريجي دفعتها.	2026-04-08 18:29:37.207876+00
2474	internship	تدريب مهني	B1	noun	He completed an internship at a law firm.	أكمل تدريبًا مهنيًا في مكتب محاماة.	2026-04-08 18:29:37.207876+00
2475	profession	مهنة	B1	noun	Teaching is a respected profession worldwide.	التدريس مهنة محترمة على مستوى العالم.	2026-04-08 18:29:37.207876+00
2476	promotion	ترقية	B1	noun	She worked hard and received a promotion last month.	عملت بجد وحصلت على ترقية الشهر الماضي.	2026-04-08 18:29:37.207876+00
2477	resignation	استقالة	B1	noun	He handed in his resignation after disagreeing with the manager.	قدّم استقالته بعد خلاف مع المدير.	2026-04-08 18:29:37.207876+00
2478	salary	راتب	B1	noun	The salary for this position starts at £25,000.	يبدأ راتب هذا المنصب من 25,000 جنيه إسترليني.	2026-04-08 18:29:37.207876+00
2479	entrepreneur	رائد أعمال	B1	noun	She became a successful entrepreneur at the age of 25.	أصبحت رائدة أعمال ناجحة في سن 25.	2026-04-08 18:29:37.207876+00
2480	productivity	إنتاجية	B1	noun	A comfortable workspace improves productivity.	يُحسّن مكان العمل المريح الإنتاجية.	2026-04-08 18:29:37.207876+00
2481	sustainability	استدامة	B1	noun	Sustainability is a major topic in modern business.	الاستدامة موضوع رئيسي في الأعمال الحديثة.	2026-04-08 18:29:37.207876+00
2483	draft	مسودة	B1	noun	Please review the draft before the final submission.	يرجى مراجعة المسودة قبل التسليم النهائي.	2026-04-08 18:29:37.207876+00
2484	reference	مرجع	B1	noun	She used several academic references in her essay.	استخدمت عدة مراجع أكاديمية في مقالها.	2026-04-08 18:29:37.207876+00
2485	presentation	عرض تقديمي	B1	noun	His presentation was clear and well-organised.	كان عرضه التقديمي واضحًا ومنظمًا جيدًا.	2026-04-08 18:29:37.207876+00
2486	bibliography	قائمة المراجع	B1	noun	Always include a bibliography at the end of your essay.	دائمًا أدرج قائمة المراجع في نهاية مقالك.	2026-04-08 18:29:37.207876+00
2487	plagiarism	انتحال	B1	noun	Plagiarism is taken very seriously at university.	يؤخذ الانتحال على محمل الجد في الجامعة.	2026-04-08 18:29:37.207876+00
2488	paraphrase	إعادة صياغة	B1	noun	Instead of copying, try to paraphrase the author's ideas.	بدلًا من النسخ، حاول إعادة صياغة أفكار المؤلف.	2026-04-08 18:29:37.207876+00
2489	quotation	اقتباس	B1	noun	He used a quotation from Shakespeare in his essay.	استخدم اقتباسًا من شكسبير في مقاله.	2026-04-08 18:29:37.207876+00
2490	thesis	أطروحة	B1	noun	She is writing her thesis on climate change.	تكتب أطروحتها حول تغير المناخ.	2026-04-08 18:29:37.207876+00
2491	syllabus	خطة المقرر	B1	noun	The teacher handed out the syllabus on the first day.	وزّع المعلم خطة المقرر في اليوم الأول.	2026-04-08 18:29:37.207876+00
2492	contamination	تلوث	B1	noun	Water contamination is a serious health risk.	تلوث المياه خطر صحي خطير.	2026-04-08 18:29:37.207876+00
2493	ecosystem	نظام بيئي	B1	noun	A balanced ecosystem supports all forms of life.	يدعم النظام البيئي المتوازن جميع أشكال الحياة.	2026-04-08 18:29:37.207876+00
2494	exhaust	عادم	B1	noun	Car exhaust contributes to air pollution.	يُسهم عادم السيارات في تلوث الهواء.	2026-04-08 18:29:37.207876+00
2495	fossil fuel	وقود أحفوري	B1	noun	Burning fossil fuels releases carbon dioxide.	يُطلق حرق الوقود الأحفوري ثاني أكسيد الكربون.	2026-04-08 18:29:37.207876+00
2496	greenhouse gas	غاز الاحتباس الحراري	B1	noun	Methane is a powerful greenhouse gas.	الميثان من أقوى غازات الاحتباس الحراري.	2026-04-08 18:29:37.207876+00
2497	landfill	مكب نفايات	B1	noun	Plastic waste ends up in landfills or the ocean.	ينتهي النفايات البلاستيكية في مكبات النفايات أو المحيط.	2026-04-08 18:29:37.207876+00
2498	toxic	سام	B1	adjective	Some industrial chemicals are highly toxic.	بعض المواد الكيميائية الصناعية سامة للغاية.	2026-04-08 18:29:37.207876+00
2499	wilderness	برية	B1	noun	The vast wilderness stretches across thousands of miles.	تمتد البرية الشاسعة عبر آلاف الأميال.	2026-04-08 18:29:37.207876+00
2500	algorithm	خوارزمية	B1	noun	Search engines use algorithms to rank websites.	تستخدم محركات البحث خوارزميات لترتيب المواقع.	2026-04-08 18:29:37.207876+00
2501	application	تطبيق	B1	noun	There are thousands of applications available to download.	يوجد آلاف التطبيقات المتاحة للتنزيل.	2026-04-08 18:29:37.211252+00
2502	artificial intelligence	ذكاء اصطناعي	B1	noun	Artificial intelligence is transforming many industries.	يُغيّر الذكاء الاصطناعي كثيرًا من الصناعات.	2026-04-08 18:29:37.211252+00
2503	bandwidth	عرض النطاق الترددي	B1	noun	Video streaming requires a high bandwidth connection.	يتطلب بث الفيديو اتصالًا بعرض نطاق ترددي عالٍ.	2026-04-08 18:29:37.211252+00
2504	browser	متصفح	B1	noun	Use a secure browser to protect your data online.	استخدم متصفحًا آمنًا لحماية بياناتك على الإنترنت.	2026-04-08 18:29:37.211252+00
2505	cloud computing	الحوسبة السحابية	B1	noun	Cloud computing allows you to store data online.	تتيح لك الحوسبة السحابية تخزين البيانات عبر الإنترنت.	2026-04-08 18:29:37.211252+00
2506	database	قاعدة بيانات	B1	noun	The company stores customer information in a secure database.	تحتفظ الشركة بمعلومات العملاء في قاعدة بيانات آمنة.	2026-04-08 18:29:37.211252+00
2507	encryption	تشفير	B1	noun	Encryption protects your personal data from hackers.	يحمي التشفير بياناتك الشخصية من القراصنة.	2026-04-08 18:29:37.211252+00
2509	interface	واجهة	B1	noun	The app has a user-friendly interface.	يمتلك التطبيق واجهة سهلة الاستخدام.	2026-04-08 18:29:37.211252+00
2510	platform	منصة	B1	noun	The company launched a new online learning platform.	أطلقت الشركة منصة تعلم عبر الإنترنت جديدة.	2026-04-08 18:29:37.211252+00
2511	password	كلمة مرور	B1	noun	Choose a strong password that includes numbers and symbols.	اختر كلمة مرور قوية تتضمن أرقامًا ورموزًا.	2026-04-08 18:29:37.211252+00
2513	upload	رفع	B1	verb	You can upload your files to the cloud.	يمكنك رفع ملفاتك إلى السحابة.	2026-04-08 18:29:37.211252+00
2514	download	تنزيل	B1	verb	Download the app from the official website.	نزّل التطبيق من الموقع الرسمي.	2026-04-08 18:29:37.211252+00
2515	cybersecurity	أمن إلكتروني	B1	noun	Cybersecurity is one of the fastest growing fields.	الأمن الإلكتروني من أسرع المجالات نموًا.	2026-04-08 18:29:37.211252+00
2516	prototype	نموذج أولي	B1	noun	Engineers built a prototype before mass production.	بنى المهندسون نموذجًا أوليًا قبل الإنتاج الضخم.	2026-04-08 18:29:37.211252+00
2517	abuse	إساءة	B1	noun	Any form of abuse at school is unacceptable.	أي شكل من أشكال الإساءة في المدرسة غير مقبول.	2026-04-08 18:29:37.211252+00
2518	addiction	إدمان	B1	noun	Addiction to social media affects many young people.	يؤثر الإدمان على وسائل التواصل الاجتماعي على كثير من الشباب.	2026-04-08 18:29:37.211252+00
2519	community service	خدمة مجتمعية	B1	noun	Students are encouraged to do community service.	يُشجَّع الطلاب على أداء الخدمة المجتمعية.	2026-04-08 18:29:37.211252+00
2520	counselor	مستشار	B1	noun	The school counselor helped students plan their careers.	ساعد المستشار المدرسي الطلاب في التخطيط لمسيرتهم المهنية.	2026-04-08 18:29:37.211252+00
2521	crisis	أزمة	B1	noun	The country faced a serious economic crisis.	واجهت البلاد أزمة اقتصادية حادة.	2026-04-08 18:29:37.211252+00
2522	domestic violence	عنف أسري	B1	noun	Domestic violence affects millions of families worldwide.	يؤثر العنف الأسري على ملايين العائلات في جميع أنحاء العالم.	2026-04-08 18:29:37.211252+00
2523	empathy	تعاطف	B1	noun	Empathy is the ability to understand how others feel.	التعاطف هو القدرة على فهم مشاعر الآخرين.	2026-04-08 18:29:37.211252+00
2524	epidemic	وباء	B1	noun	The flu epidemic spread rapidly through the city.	انتشر وباء الإنفلونزا بسرعة في المدينة.	2026-04-08 18:29:37.211252+00
2525	humanitarian	إنساني	B1	adjective	The charity provides humanitarian aid to refugees.	تقدم الجمعية الخيرية المساعدات الإنسانية للاجئين.	2026-04-08 18:29:37.211252+00
2526	mental health	صحة نفسية	B1	noun	Mental health is as important as physical health.	الصحة النفسية بنفس أهمية الصحة الجسدية.	2026-04-08 18:29:37.211252+00
2527	poverty line	خط الفقر	B1	noun	Millions of people live below the poverty line.	يعيش ملايين الأشخاص تحت خط الفقر.	2026-04-08 18:29:37.211252+00
2528	refugee	لاجئ	B1	noun	The charity helps refugees find homes and jobs.	تساعد الجمعية الخيرية اللاجئين على إيجاد المنازل والوظائف.	2026-04-08 18:29:37.211252+00
2529	assessment	تقييم	B1	noun	The teacher completed the assessment at the end of the unit.	أكمل المعلم التقييم في نهاية الوحدة.	2026-04-08 18:29:37.211252+00
2530	enroll	يسجّل	B1	verb	She enrolled in an online English course.	سجّلت في دورة إنجليزية عبر الإنترنت.	2026-04-08 18:29:37.211252+00
2531	examination	امتحان	B1	noun	The final examination is next Wednesday.	الامتحان النهائي يوم الأربعاء القادم.	2026-04-08 18:29:37.211252+00
2532	lecture	محاضرة	B1	noun	The lecture on climate change was very informative.	كانت المحاضرة حول تغير المناخ مفيدة جدًا.	2026-04-08 18:29:37.211252+00
2533	module	وحدة دراسية	B1	noun	This module covers the basics of grammar.	تغطي هذه الوحدة الدراسية أساسيات القواعد.	2026-04-08 18:29:37.211252+00
2534	scholarship	منحة دراسية	B1	noun	She received a scholarship to study abroad.	حصلت على منحة دراسية للدراسة في الخارج.	2026-04-08 18:29:37.211252+00
2512	software	برمجيات	B1	noun	Please install the latest version of the software.	يرجى تثبيت أحدث إصدار من البرنامج.	2026-04-08 18:29:37.211252+00
2535	semester	فصل دراسي	B1	noun	The new semester starts in September.	يبدأ الفصل الدراسي الجديد في سبتمبر.	2026-04-08 18:29:37.211252+00
2536	tutor	مدرس خاص	B1	noun	She hired a tutor to help her prepare for the exam.	استأجرت مدرسًا خاصًا لمساعدتها على الاستعداد للامتحان.	2026-04-08 18:29:37.211252+00
2537	tutorial	درس إرشادي	B1	noun	The tutorial explains how to use the software step by step.	يشرح الدرس الإرشادي كيفية استخدام البرنامج خطوة بخطوة.	2026-04-08 18:29:37.211252+00
2538	workshop	ورشة عمل	B1	noun	She attended a writing workshop last month.	حضرت ورشة كتابة الشهر الماضي.	2026-04-08 18:29:37.211252+00
2539	undergraduate	طالب جامعي	B1	noun	The library is open to all undergraduate students.	المكتبة مفتوحة لجميع الطلاب الجامعيين.	2026-04-08 18:29:37.211252+00
2540	postgraduate	طالب دراسات عليا	B1	noun	Postgraduate students must submit a research proposal.	يجب على طلاب الدراسات العليا تقديم مقترح بحثي.	2026-04-08 18:29:37.211252+00
2541	immune system	جهاز مناعي	B1	noun	Regular exercise strengthens the immune system.	تقوّي التمارين المنتظمة الجهاز المناعي.	2026-04-08 18:29:37.211252+00
2542	prescription	وصفة طبية	B1	noun	The doctor gave me a prescription for antibiotics.	أعطاني الطبيب وصفة طبية بالمضادات الحيوية.	2026-04-08 18:29:37.211252+00
2543	rehabilitation	إعادة تأهيل	B1	noun	Physical rehabilitation helps patients recover from injury.	تساعد إعادة التأهيل الجسدي المرضى على التعافي من الإصابات.	2026-04-08 18:29:37.211252+00
2544	surgery	عملية جراحية	B1	noun	He had surgery to repair his knee.	خضع لعملية جراحية لإصلاح ركبته.	2026-04-08 18:29:37.211252+00
2545	specialist	أخصائي	B1	noun	She was referred to a specialist for further tests.	تمت إحالتها إلى أخصائي لإجراء مزيد من الفحوصات.	2026-04-08 18:29:37.211252+00
2547	wellbeing	رفاهية	B1	noun	Schools focus on the wellbeing of all students.	تركز المدارس على رفاهية جميع الطلاب.	2026-04-08 18:29:37.211252+00
2548	accommodation	إقامة	B1	noun	The university provides accommodation for first-year students.	توفر الجامعة إقامة لطلاب السنة الأولى.	2026-04-08 18:29:37.211252+00
2549	departure	مغادرة	B1	noun	The departure time is listed on the ticket.	وقت المغادرة مدرج على التذكرة.	2026-04-08 18:29:37.211252+00
2550	itinerary	جدول رحلة	B1	noun	The tour guide handed out the itinerary for the trip.	وزّع المرشد السياحي جدول الرحلة.	2026-04-08 18:29:37.211252+00
2551	tourism	سياحة	B1	noun	Tourism is an important source of income for many countries.	السياحة مصدر دخل مهم لكثير من الدول.	2026-04-08 18:29:37.211252+00
2552	transit	عبور	B1	noun	The passengers were stuck in transit for six hours.	كان الركاب عالقين في العبور لست ساعات.	2026-04-08 18:29:37.211252+00
2553	visa	تأشيرة	B1	noun	You need a visa to enter some countries.	تحتاج إلى تأشيرة لدخول بعض الدول.	2026-04-08 18:29:37.211252+00
2554	accountability	مساءلة	B2	noun	There must be accountability for decisions that affect the public.	يجب أن تكون هناك مساءلة عن القرارات التي تؤثر على الجمهور.	2026-04-08 18:29:37.211252+00
2555	affiliation	انتماء	B2	noun	His political affiliation is well known.	انتماؤه السياسي معروف للجميع.	2026-04-08 18:29:37.211252+00
2556	alleviate	يخفف	B2	verb	Medication can alleviate the symptoms of the illness.	يمكن للأدوية أن تخفف أعراض المرض.	2026-04-08 18:29:37.211252+00
2557	anticipation	توقع	B2	noun	There was great anticipation before the announcement.	كان هناك توقع كبير قبل الإعلان.	2026-04-08 18:29:37.211252+00
2558	aspiration	طموح	B2	noun	Her greatest aspiration is to become a doctor.	أكبر طموحاتها هو أن تصبح طبيبة.	2026-04-08 18:29:37.211252+00
2559	autonomy	استقلالية	B2	noun	Students need a degree of autonomy in their learning.	يحتاج الطلاب إلى قدر من الاستقلالية في تعلمهم.	2026-04-08 18:29:37.211252+00
2560	brevity	إيجاز	B2	noun	The report is valued for its clarity and brevity.	يُقدَّر التقرير بوضوحه وإيجازه.	2026-04-08 18:29:37.211252+00
2561	bureaucracy	بيروقراطية	B2	noun	The bureaucracy slowed down the approval process.	أبطأت البيروقراطية عملية الموافقة.	2026-04-08 18:29:37.211252+00
2562	caution	حذر	B2	noun	Exercise caution when making important financial decisions.	مارس الحذر عند اتخاذ قرارات مالية مهمة.	2026-04-08 18:29:37.211252+00
2563	complication	تعقيد	B2	noun	The surgery went well despite some complications.	سارت العملية الجراحية على ما يرام على الرغم من بعض التعقيدات.	2026-04-08 18:29:37.211252+00
2564	constraint	قيد	B2	noun	Budget constraints limited what we could achieve.	حدّت قيود الميزانية مما يمكننا تحقيقه.	2026-04-08 18:29:37.211252+00
2565	contemplate	يتأمل	B2	verb	She contemplated her future career options.	تأملت خياراتها المهنية المستقبلية.	2026-04-08 18:29:37.211252+00
2566	conviction	اقتناع	B2	noun	She spoke with great conviction about the cause.	تحدثت باقتناع كبير بشأن القضية.	2026-04-08 18:29:37.211252+00
2567	decisive	حاسم	B2	adjective	The president made a decisive move to end the crisis.	اتخذ الرئيس خطوة حاسمة لإنهاء الأزمة.	2026-04-08 18:29:37.211252+00
2568	deficiency	نقص	B2	noun	A vitamin D deficiency can affect bone health.	يمكن أن يؤثر نقص فيتامين د على صحة العظام.	2026-04-08 18:29:37.211252+00
2570	detrimental	ضار	B2	adjective	Smoking is detrimental to your health.	التدخين ضار بصحتك.	2026-04-08 18:29:37.211252+00
2571	disrupt	يُعطّل	B2	verb	The storm disrupted transport across the region.	عطّل العاصفة النقل في جميع أنحاء المنطقة.	2026-04-08 18:29:37.211252+00
2572	drawback	عيب	B2	noun	One drawback of living in the city is the high cost.	أحد عيوب العيش في المدينة هو ارتفاع التكلفة.	2026-04-08 18:29:37.211252+00
2573	fragment	يُجزئ	B2	verb	The argument fragmented the group into two camps.	جزّأ النزاع المجموعة إلى فريقين.	2026-04-08 18:29:37.211252+00
2574	friction	احتكاك	B2	noun	Friction between colleagues can reduce productivity.	يمكن أن يُقلّل الاحتكاك بين الزملاء الإنتاجية.	2026-04-08 18:29:37.211252+00
2575	hybrid	هجين	B2	adjective	She drives a hybrid car to save fuel.	تقود سيارة هجينة لتوفير الوقود.	2026-04-08 18:29:37.211252+00
2569	degrade	يُدهوِر	B2	verb	Plastic waste degrades slowly and pollutes the environment.	تتدهور النفايات البلاستيكية ببطء وتلوث البيئة.	2026-04-08 18:29:37.211252+00
2576	implicitly	ضمنيًا	B2	adverb	The rule was implicitly understood by everyone.	القاعدة كانت مفهومة ضمنيًا لدى الجميع.	2026-04-08 18:29:37.211252+00
2577	inconsistency	عدم الاتساق	B2	noun	The inconsistency in the data raised concerns.	أثار عدم الاتساق في البيانات مخاوف.	2026-04-08 18:29:37.211252+00
2578	integrity	نزاهة	B2	noun	A leader must demonstrate integrity in all decisions.	يجب على القائد أن يُظهر النزاهة في جميع القرارات.	2026-04-08 18:29:37.211252+00
2579	intersection	تقاطع	B2	noun	The car accident happened at the main intersection.	وقع حادث السيارة عند التقاطع الرئيسي.	2026-04-08 18:29:37.211252+00
2580	irony	سخرية	B2	noun	The irony is that the most expensive option was the worst.	السخرية أن الخيار الأغلى كان الأسوأ.	2026-04-08 18:29:37.211252+00
2582	magnitude	حجم	B2	noun	The magnitude of the problem was not fully understood.	لم يُدرَك حجم المشكلة بشكل كامل.	2026-04-08 18:29:37.211252+00
2583	marginalize	يُهمّش	B2	verb	Poverty can marginalize entire communities.	يمكن أن يُهمّش الفقر مجتمعات بأكملها.	2026-04-08 18:29:37.211252+00
2584	mitigation	تخفيف	B2	noun	Mitigation strategies are needed to reduce flood damage.	تُحتاج استراتيجيات التخفيف لتقليل أضرار الفيضانات.	2026-04-08 18:29:37.211252+00
2585	neutralize	يُحيّد	B2	verb	The medicine neutralizes the effect of the toxin.	يُحيّد الدواء تأثير السم.	2026-04-08 18:29:37.211252+00
2587	optimistic	متفائل	B2	adjective	She remains optimistic about finding a solution.	تبقى متفائلة بشأن إيجاد حل.	2026-04-08 18:29:37.211252+00
2588	prioritize	يُعطي الأولوية	B2	verb	We need to prioritize the most urgent tasks first.	نحتاج إلى إعطاء الأولوية للمهام الأكثر إلحاحًا أولًا.	2026-04-08 18:29:37.211252+00
2589	prone	عرضة لـ	B2	adjective	Children are more prone to infection in winter.	الأطفال أكثر عرضة للعدوى في فصل الشتاء.	2026-04-08 18:29:37.211252+00
2590	rationalize	يُبرر	B2	verb	People often rationalize poor decisions.	كثيرًا ما يُبرر الناس القرارات السيئة.	2026-04-08 18:29:37.211252+00
2591	reciprocal	متبادل	B2	adjective	The two countries have a reciprocal trade agreement.	تمتلك البلدتان اتفاقية تجارية متبادلة.	2026-04-08 18:29:37.211252+00
2593	reluctant	متردد	B2	adjective	She was reluctant to accept the offer.	كانت مترددة في قبول العرض.	2026-04-08 18:29:37.211252+00
2594	resemble	يُشبه	B2	verb	The twins resemble each other closely.	يتشابه التوأم مع بعضهما البعض كثيرًا.	2026-04-08 18:29:37.211252+00
2595	restricted	مقيّد	B2	adjective	Access to the building is restricted to staff only.	الدخول إلى المبنى مقيّد للموظفين فقط.	2026-04-08 18:29:37.211252+00
2596	rigid	صارم	B2	adjective	The rules are too rigid and need to be updated.	القواعد صارمة جدًا وتحتاج إلى تحديث.	2026-04-08 18:29:37.211252+00
2597	sphere	مجال	B2	noun	Her work is in the sphere of international relations.	عملها في مجال العلاقات الدولية.	2026-04-08 18:29:37.211252+00
2598	stimulus	محفز	B2	noun	The government provided a stimulus package for the economy.	قدّمت الحكومة حزمة تحفيز للاقتصاد.	2026-04-08 18:29:37.211252+00
2599	susceptible	عرضة	B2	adjective	Older people are more susceptible to serious illness.	كبار السن أكثر عرضة للأمراض الخطيرة.	2026-04-08 18:29:37.211252+00
2600	tangible	ملموس	B2	adjective	There are tangible benefits to regular exercise.	هناك فوائد ملموسة للتمارين المنتظمة.	2026-04-08 18:29:37.211252+00
2601	trajectory	مسار	B2	noun	The trajectory of the company's growth has been impressive.	كان مسار نمو الشركة مثيرًا للإعجاب.	2026-04-08 18:29:37.214834+00
2602	virtue	فضيلة	B2	noun	Patience is a virtue, especially in difficult times.	الصبر فضيلة، خاصة في الأوقات الصعبة.	2026-04-08 18:29:37.214834+00
2603	volatile	متقلب	B2	adjective	Prices in the stock market can be very volatile.	يمكن أن تكون الأسعار في سوق الأوراق المالية متقلبة جدًا.	2026-04-08 18:29:37.214834+00
2604	worthwhile	يستحق العناء	B2	adjective	Learning a new language is a worthwhile challenge.	تعلّم لغة جديدة تحدٍّ يستحق العناء.	2026-04-08 18:29:37.214834+00
2605	allowance	بدل	B2	noun	She receives a monthly allowance from her parents.	تحصل على بدل شهري من والديها.	2026-04-08 18:29:37.214834+00
2606	anniversary	ذكرى سنوية	B2	noun	They celebrated their wedding anniversary at a restaurant.	احتفلوا بذكراهم السنوية للزواج في مطعم.	2026-04-08 18:29:37.214834+00
2607	bakery	مخبزة	B2	noun	We buy fresh bread from the bakery every morning.	نشتري الخبز الطازج من المخبزة كل صباح.	2026-04-08 18:29:37.214834+00
2608	brake	فرامل	B2	noun	Check the brakes before a long journey.	تحقق من الفرامل قبل رحلة طويلة.	2026-04-08 18:29:37.214834+00
2609	carpet	سجادة	B2	noun	The living room has a soft carpet.	غرفة الجلوس بها سجادة ناعمة.	2026-04-08 18:29:37.214834+00
2610	cashier	أمين صندوق	B2	noun	The cashier gave me the wrong change.	أعطاني أمين الصندوق فكة خاطئة.	2026-04-08 18:29:37.214834+00
2611	chimney	مدخنة	B2	noun	Smoke rose from the chimney of the old house.	تصاعد الدخان من مدخنة البيت القديم.	2026-04-08 18:29:37.214834+00
2612	closet	خزانة ملابس	B2	noun	All his clothes are in the closet.	جميع ملابسه في خزانة الملابس.	2026-04-08 18:29:37.214834+00
2614	crossing	معبر	B2	noun	Use the pedestrian crossing to cross the road.	استخدم المعبر المشاة لعبور الطريق.	2026-04-08 18:29:37.214834+00
2615	dairy	منتجات الألبان	B2	noun	She avoids dairy products because of an allergy.	تتجنب منتجات الألبان بسبب حساسية لديها.	2026-04-08 18:29:37.214834+00
2616	directions	تعليمات الطريق	B2	noun	Can you give me directions to the station?	هل يمكنك إعطائي تعليمات الطريق إلى المحطة؟	2026-04-08 18:29:37.214834+00
2617	drawer	درج	B2	noun	The keys are in the top drawer.	المفاتيح في الدرج العلوي.	2026-04-08 18:29:37.214834+00
2586	obsolete	متقادم	B2	adjective	Many jobs will become obsolete because of automation.	كثير من الوظائف ستصبح قديمة بسبب الأتمتة.	2026-04-08 18:29:37.211252+00
2592	reinstate	يُعيد تأهيل	B2	verb	The manager was reinstated after the investigation.	أُعيد المدير إلى منصبه بعد التحقيق.	2026-04-08 18:29:37.211252+00
2613	compliment	يُطري	B2	verb	He complimented her on her excellent presentation.	أطراها على عرضها التقديمي الممتاز.	2026-04-08 18:29:37.214834+00
2618	entrance	مدخل	B2	noun	The entrance to the museum is free on Sundays.	الدخول إلى المتحف مجاني أيام الأحد.	2026-04-08 18:29:37.214834+00
2619	exit	مخرج	B2	noun	Please use the emergency exit in case of fire.	يرجى استخدام مخرج الطوارئ في حالة الحريق.	2026-04-08 18:29:37.214834+00
2620	fault	خطأ	B2	noun	It was not my fault; I did not know about it.	لم يكن خطئي؛ لم أكن أعرف عنه.	2026-04-08 18:29:37.214834+00
2621	flavour	نكهة	B2	noun	This ice cream has a lovely vanilla flavour.	يتميز هذا الآيس كريم بنكهة الفانيليا اللذيذة.	2026-04-08 18:29:37.214834+00
2622	fluent	طليق	B2	adjective	She is fluent in both Arabic and English.	إنها طليقة في اللغتين العربية والإنجليزية.	2026-04-08 18:29:37.214834+00
2623	fog	ضباب	B2	noun	The fog made it difficult to see the road.	جعل الضباب رؤية الطريق أمرًا صعبًا.	2026-04-08 18:29:37.214834+00
2625	guest	ضيف	B2	noun	We are expecting three guests for dinner.	نتوقع ثلاثة ضيوف على العشاء.	2026-04-08 18:29:37.214834+00
2627	instruction	تعليمات	B2	noun	Read the instructions carefully before you begin.	اقرأ التعليمات بعناية قبل البدء.	2026-04-08 18:29:37.214834+00
2628	jar	برطمان	B2	noun	There is a jar of honey in the cupboard.	يوجد برطمان عسل في الخزانة.	2026-04-08 18:29:37.214834+00
2629	label	ملصق	B2	noun	Check the label for the expiry date.	تحقق من الملصق لمعرفة تاريخ الانتهاء.	2026-04-08 18:29:37.214834+00
2630	landlord	صاحب العقار	B2	noun	The landlord increased the rent this year.	رفع صاحب العقار الإيجار هذا العام.	2026-04-08 18:29:37.214834+00
2631	laundry	غسيل	B2	noun	I need to do the laundry today.	أحتاج إلى القيام بالغسيل اليوم.	2026-04-08 18:29:37.214834+00
2633	lend	يُعير	B2	verb	Can you lend me some money until next week?	هل يمكنك إعارتي بعض المال حتى الأسبوع القادم؟	2026-04-08 18:29:37.214834+00
2634	licence	رخصة	B2	noun	He has a driving licence.	لديه رخصة قيادة.	2026-04-08 18:29:37.214834+00
2635	luggage	أمتعة	B2	noun	Don't forget to collect your luggage from the carousel.	لا تنسَ جمع أمتعتك من السير.	2026-04-08 18:29:37.214834+00
2636	makeup	مستحضرات تجميل	B2	noun	She does not wear makeup every day.	هي لا ترتدي مستحضرات التجميل كل يوم.	2026-04-08 18:29:37.214834+00
2637	mask	قناع	B2	noun	Everyone wore a mask in the hospital.	ارتدى الجميع قناعًا في المستشفى.	2026-04-08 18:29:37.214834+00
2638	memory	ذاكرة	B2	noun	She has a very good memory for faces.	لديها ذاكرة جيدة جدًا للوجوه.	2026-04-08 18:29:37.214834+00
2639	mixture	خليط	B2	noun	Add a mixture of herbs to the sauce.	أضف خليطًا من الأعشاب إلى الصلصة.	2026-04-08 18:29:37.214834+00
2640	neighbour	جار	B2	noun	My neighbour is very friendly.	جاري ودود جدًا.	2026-04-08 18:29:37.214834+00
2641	noisy	صاخب	B2	adjective	The classroom was noisy and difficult to concentrate in.	كان الفصل الدراسي صاخبًا ومن الصعب التركيز فيه.	2026-04-08 18:29:37.214834+00
2643	petrol	بنزين	B2	noun	I need to fill up with petrol before the trip.	أحتاج إلى تعبئة البنزين قبل الرحلة.	2026-04-08 18:29:37.214834+00
2644	pharmacy	صيدلية	B2	noun	You can buy cough medicine at the pharmacy.	يمكنك شراء دواء السعال في الصيدلية.	2026-04-08 18:29:37.214834+00
2645	pillow	وسادة	B2	noun	She prefers a soft pillow when she sleeps.	تفضّل وسادة ناعمة عند النوم.	2026-04-08 18:29:37.214834+00
2646	postbox	صندوق البريد	B2	noun	I put the letter in the postbox.	وضعت الرسالة في صندوق البريد.	2026-04-08 18:29:37.214834+00
2647	refund	استرداد	B2	noun	She asked for a refund because the product was broken.	طلبت استردادًا لأن المنتج كان مكسورًا.	2026-04-08 18:29:37.214834+00
2648	scared	خائف	B2	adjective	She was scared of the dark when she was young.	كانت تخشى الظلام عندما كانت صغيرة.	2026-04-08 18:29:37.214834+00
2649	shade	ظل	B2	noun	We sat in the shade of a large tree.	جلسنا في ظل شجرة كبيرة.	2026-04-08 18:29:37.214834+00
2650	shine	يُضيء	B2	verb	The sun shines brightly in summer.	تُضيء الشمس بشدة في الصيف.	2026-04-08 18:29:37.214834+00
2651	shopping centre	مركز تسوق	B2	noun	The new shopping centre opened last month.	افتُتح مركز التسوق الجديد الشهر الماضي.	2026-04-08 18:29:37.214834+00
2652	sight	منظر	B2	noun	The sunset was a beautiful sight.	كان الغروب منظرًا جميلًا.	2026-04-08 18:29:37.214834+00
2653	skateboard	لوح التزلج	B2	noun	He can do tricks on his skateboard.	يمكنه القيام بحركات على لوح التزلج.	2026-04-08 18:29:37.214834+00
2654	stir	يُحرّك	B2	verb	Stir the soup gently to avoid burning it.	حرّك الحساء برفق لتجنب احتراقه.	2026-04-08 18:29:37.214834+00
2655	stove	موقد	B2	noun	Be careful when using the stove.	احذر عند استخدام الموقد.	2026-04-08 18:29:37.214834+00
2656	sweep	يكنس	B2	verb	She swept the floor every morning.	كانت تكنس الأرضية كل صباح.	2026-04-08 18:29:37.214834+00
2657	swimming pool	حمام سباحة	B2	noun	The hotel has an outdoor swimming pool.	يمتلك الفندق حمام سباحة في الخارج.	2026-04-08 18:29:37.214834+00
2660	teenager	مراهق	B2	noun	Many teenagers spend a lot of time online.	يقضي كثير من المراهقين وقتًا طويلًا على الإنترنت.	2026-04-08 18:29:37.214834+00
2661	throw	يرمي	B2	verb	She threw the ball to her friend.	رمت الكرة إلى صديقتها.	2026-04-08 18:29:37.214834+00
2662	tip	نصيحة	B2	noun	Here are some tips to improve your writing.	إليك بعض النصائح لتحسين كتابتك.	2026-04-08 18:29:37.214834+00
2663	tiny	صغير جدًا	B2	adjective	The baby's hands were tiny and soft.	كانت يدا الطفل صغيرتين جدًا وناعمتين.	2026-04-08 18:29:37.214834+00
2664	turn off	يُطفئ	B2	verb	Turn off the lights before you leave.	أطفئ الأضواء قبل أن تغادر.	2026-04-08 18:29:37.214834+00
2665	vegetarian	نباتي	B2	adjective	She is a vegetarian and does not eat meat.	هي نباتية ولا تأكل اللحوم.	2026-04-08 18:29:37.214834+00
2626	hug	يحتضن	B2	verb	She hugged her friend when they met.	عانقت صديقتها عندما التقيا.	2026-04-08 18:29:37.214834+00
2632	lawn	حديقة عشبية	B2	noun	He mows the lawn every weekend.	يقص العشب كل عطلة نهاية أسبوع.	2026-04-08 18:29:37.214834+00
2642	noodle	شعيرية	B2	noun	She cooked a bowl of noodle soup.	طهت وعاءً من حساء النودلز.	2026-04-08 18:29:37.214834+00
2658	tag	بطاقة	B2	noun	The price tag fell off the shirt.	سقط وسم السعر من القميص.	2026-04-08 18:29:37.214834+00
2659	taste	طعم	B2	noun	This soup has a lovely taste.	لهذا الحساء طعم رائع.	2026-04-08 18:29:37.214834+00
2666	visitor	زائر	B2	noun	The museum had over 10,000 visitors last month.	استقبل المتحف أكثر من 10,000 زائر الشهر الماضي.	2026-04-08 18:29:37.214834+00
2667	wardrobe	خزانة ملابس	B2	noun	She organised her wardrobe by colour.	رتّبت خزانة ملابسها حسب اللون.	2026-04-08 18:29:37.214834+00
2668	wave	موجة	B2	noun	She waved goodbye as the train left.	ودّعته بالتلويح ليده حين غادر القطار.	2026-04-08 18:29:37.214834+00
2669	weak	ضعيف	B2	adjective	He felt weak after being ill for a week.	شعر بالضعف بعد مرضه لمدة أسبوع.	2026-04-08 18:29:37.214834+00
2670	yell	يصرخ	B2	verb	Please do not yell in the library.	يرجى عدم الصراخ في المكتبة.	2026-04-08 18:29:37.214834+00
2671	yard	فناء	B2	noun	The children played in the yard after school.	لعب الأطفال في الفناء بعد المدرسة.	2026-04-08 18:29:37.214834+00
2672	zip	يُغلق بالسحاب	B2	verb	Zip up your jacket; it's cold outside.	أغلق سترتك بالسحاب؛ الجو بارد في الخارج.	2026-04-08 18:29:37.214834+00
2674	athlete	رياضي	B1	noun	The athlete trained for months before the championship.	تدرّب الرياضي لأشهر قبل البطولة.	2026-04-08 18:29:37.214834+00
2675	coach	مدرب	B1	noun	The coach motivated the team before the game.	حفّز المدرب الفريق قبل المباراة.	2026-04-08 18:29:37.214834+00
2676	cycling	ركوب الدراجة	B1	noun	Cycling is a great way to stay healthy and reduce pollution.	ركوب الدراجة طريقة رائعة للحفاظ على الصحة والحد من التلوث.	2026-04-08 18:29:37.214834+00
2677	gymnasium	صالة رياضية	B1	noun	He goes to the gymnasium every evening after work.	يذهب إلى الصالة الرياضية كل مساء بعد العمل.	2026-04-08 18:29:37.214834+00
2678	marathon	ماراثون	B1	noun	She completed the marathon in under four hours.	أكملت الماراثون في أقل من أربع ساعات.	2026-04-08 18:29:37.214834+00
2679	opponent	خصم	B1	noun	The team showed respect for their opponent after the match.	أظهر الفريق الاحترام لخصمه بعد المباراة.	2026-04-08 18:29:37.214834+00
2680	referee	حكم	B1	noun	The referee stopped the game due to a dangerous foul.	أوقف الحكم اللعبة بسبب خطأ خطير.	2026-04-08 18:29:37.214834+00
2681	rowing	التجديف	B1	noun	Rowing is a popular sport in many European universities.	التجديف رياضة شعبية في كثير من الجامعات الأوروبية.	2026-04-08 18:29:37.214834+00
2683	stadium	ملعب	B1	noun	The new stadium holds 60,000 spectators.	يتسع الملعب الجديد لـ 60,000 متفرج.	2026-04-08 18:29:37.214834+00
2686	workout	تمرين	B1	noun	A 30-minute workout in the morning improves focus.	تمرين 30 دقيقة في الصباح يُحسّن التركيز.	2026-04-08 18:29:37.214834+00
2687	architecture	هندسة معمارية	B1	noun	The architecture of the old city is breathtaking.	الهندسة المعمارية للمدينة القديمة رائعة.	2026-04-08 18:29:37.214834+00
2688	ballet	باليه	B1	noun	She has been learning ballet since she was five.	تتعلم الباليه منذ كانت في الخامسة من عمرها.	2026-04-08 18:29:37.214834+00
2689	biography	سيرة ذاتية	B1	noun	He read a biography of Albert Einstein last month.	قرأ سيرة ذاتية لألبرت أينشتاين الشهر الماضي.	2026-04-08 18:29:37.214834+00
2690	canvas	قماش رسم	B1	noun	The artist prepared a large canvas for her new painting.	أعدّت الفنانة قماش رسم كبيرًا للوحتها الجديدة.	2026-04-08 18:29:37.214834+00
2692	classical	كلاسيكي	B1	adjective	She enjoys listening to classical music in the evenings.	تستمتع بالاستماع إلى الموسيقى الكلاسيكية في المساء.	2026-04-08 18:29:37.214834+00
2693	comedy	كوميديا	B1	noun	His favourite type of film is a romantic comedy.	نوعه المفضل من الأفلام هو الكوميديا الرومانسية.	2026-04-08 18:29:37.214834+00
2694	concert	حفلة موسيقية	B1	noun	She attended a live concert at the national theatre.	حضرت حفلة موسيقية حية في المسرح الوطني.	2026-04-08 18:29:37.214834+00
2695	debut	أول ظهور	B1	noun	The young singer made her debut at the music festival.	قدّمت المغنية الشابة أول ظهور لها في مهرجان الموسيقى.	2026-04-08 18:29:37.214834+00
2696	documentary	فيلم وثائقي	B1	noun	The documentary about ocean pollution was very moving.	كان الفيلم الوثائقي حول تلوث المحيطات مؤثرًا جدًا.	2026-04-08 18:29:37.214834+00
2697	drama	دراما	B1	noun	She studied drama at university and now acts on stage.	درست الدراما في الجامعة وتمثّل الآن على المسرح.	2026-04-08 18:29:37.214834+00
2698	gallery	معرض فني	B1	noun	The art gallery displays works from local artists.	يعرض المعرض الفني أعمال الفنانين المحليين.	2026-04-08 18:29:37.214834+00
2700	illustration	رسم توضيحي	B1	noun	The children's book has beautiful illustrations on every page.	كتاب الأطفال يحتوي على رسوم توضيحية جميلة في كل صفحة.	2026-04-08 18:29:37.214834+00
2701	masterpiece	تحفة فنية	B1	noun	The Mona Lisa is considered a masterpiece of art.	تُعتبر الموناليزا تحفة فنية.	2026-04-08 18:29:37.218426+00
2702	melody	لحن	B1	noun	The melody of the song stayed in her head all day.	بقي لحن الأغنية في رأسها طوال اليوم.	2026-04-08 18:29:37.218426+00
2703	orchestra	أوركسترا	B1	noun	She plays violin in the school orchestra.	تعزف على الكمان في أوركسترا المدرسة.	2026-04-08 18:29:37.218426+00
2704	portrait	صورة شخصية	B1	noun	The artist painted a portrait of the queen.	رسم الفنان صورة شخصية للملكة.	2026-04-08 18:29:37.218426+00
2705	sculpture	نحت	B1	noun	The ancient sculpture was discovered during construction.	اكتُشف النحت القديم خلال أعمال البناء.	2026-04-08 18:29:37.218426+00
2706	sketch	رسم سريع	B1	noun	She drew a quick sketch of the building.	رسمت خطوطًا سريعة للمبنى.	2026-04-08 18:29:37.218426+00
2682	sprint	سباق السرعة	B1	noun	He won the 100-metre sprint by a small margin.	فاز بسباق العدو السريع 100 متر بفارق ضئيل.	2026-04-08 18:29:37.214834+00
2684	tournament	بطولة	B1	noun	The tennis tournament takes place every summer.	يُقام دوري التنس كل صيف.	2026-04-08 18:29:37.214834+00
2685	trophy	كأس تذكاري	B1	noun	The team proudly displayed the championship trophy.	عرض الفريق بفخر كأس البطولة.	2026-04-08 18:29:37.214834+00
2691	cartoon	رسوم متحركة	B1	noun	The children laughed at the funny cartoon characters.	ضحك الأطفال على شخصيات الكاريكاتير المضحكة.	2026-04-08 18:29:37.214834+00
2699	genre	نوع أدبي أو فني	B1	noun	Science fiction is her favourite reading genre.	الخيال العلمي هو النوع الأدبي المفضل لديها.	2026-04-08 18:29:37.214834+00
2707	symphony	سيمفونية	B1	noun	Beethoven's fifth symphony is one of the most famous in history.	سيمفونية بيتهوفن الخامسة من أشهر السيمفونيات في التاريخ.	2026-04-08 18:29:37.218426+00
2708	watercolour	ألوان مائية	B1	noun	She painted a landscape using watercolours.	رسمت منظرًا طبيعيًا باستخدام الألوان المائية.	2026-04-08 18:29:37.218426+00
2709	bankruptcy	إفلاس	B2	noun	The company declared bankruptcy after years of losses.	أعلنت الشركة إفلاسها بعد سنوات من الخسائر.	2026-04-08 18:29:37.218426+00
2710	broker	سمسار	B2	noun	A real estate broker helped them find their new home.	ساعدهم سمسار عقارات في إيجاد منزلهم الجديد.	2026-04-08 18:29:37.218426+00
2711	commerce	تجارة	B1	noun	E-commerce has changed how people shop around the world.	غيّرت التجارة الإلكترونية طريقة تسوق الناس حول العالم.	2026-04-08 18:29:37.218426+00
2712	competitor	منافس	B1	noun	The new product outperformed all its competitors.	تفوق المنتج الجديد على جميع منافسيه.	2026-04-08 18:29:37.218426+00
2713	consumer	مستهلك	B1	noun	Consumers are becoming more aware of environmental issues.	أصبح المستهلكون أكثر وعيًا بالقضايا البيئية.	2026-04-08 18:29:37.218426+00
2714	corporation	شركة كبرى	B2	noun	She works for a multinational corporation.	تعمل في شركة متعددة الجنسيات.	2026-04-08 18:29:37.218426+00
2715	dividend	أرباح الأسهم	B2	noun	Shareholders received their annual dividend payment.	حصل المساهمون على دفعة أرباح أسهمهم السنوية.	2026-04-08 18:29:37.218426+00
2716	franchise	امتياز تجاري	B2	noun	He bought a fast food franchise to start his business.	اشترى امتيازًا تجاريًا لوجبات سريعة لبدء عمله.	2026-04-08 18:29:37.218426+00
2717	manufacture	يُصنّع	B1	verb	The factory manufactures electronic components.	يُصنّع المصنع مكونات إلكترونية.	2026-04-08 18:29:37.218426+00
2718	merger	اندماج	B2	noun	The merger created one of the largest banks in the country.	أوجد الاندماج أحد أكبر البنوك في البلاد.	2026-04-08 18:29:37.218426+00
2719	monopoly	احتكار	B2	noun	The government broke up the company's monopoly on the market.	كسرت الحكومة احتكار الشركة على السوق.	2026-04-08 18:29:37.218426+00
2721	partnership	شراكة	B1	noun	The two firms entered into a business partnership.	دخلت الشركتان في شراكة تجارية.	2026-04-08 18:29:37.218426+00
2722	shareholder	مساهم	B2	noun	Shareholders voted to approve the new CEO.	صوّت المساهمون على الموافقة على الرئيس التنفيذي الجديد.	2026-04-08 18:29:37.218426+00
2723	subsidiary	شركة تابعة	B2	noun	The firm opened a subsidiary in Dubai.	فتحت الشركة فرعًا تابعًا لها في دبي.	2026-04-08 18:29:37.218426+00
2724	surplus	فائض	B2	noun	The country has a trade surplus this year.	تمتلك البلاد فائضًا تجاريًا هذا العام.	2026-04-08 18:29:37.218426+00
2725	tariff	تعرفة	B2	noun	The government imposed tariffs on imported goods.	فرضت الحكومة تعرفات على البضائع المستوردة.	2026-04-08 18:29:37.218426+00
2726	turnover	إجمالي مبيعات	B2	noun	The company's annual turnover exceeded five million pounds.	تجاوز إجمالي مبيعات الشركة السنوية خمسة ملايين جنيه.	2026-04-08 18:29:37.218426+00
2727	venture	مغامرة تجارية	B2	noun	The new business venture attracted significant investment.	جذبت المغامرة التجارية الجديدة استثمارات كبيرة.	2026-04-08 18:29:37.218426+00
2728	allegation	ادعاء	B2	noun	The allegations against him were proven false.	ثبت كذب الادعاءات الموجهة إليه.	2026-04-08 18:29:37.218426+00
2729	attorney	محامٍ	B2	noun	She hired an attorney to represent her in court.	استأجرت محاميًا لتمثيلها في المحكمة.	2026-04-08 18:29:37.218426+00
2730	clause	بند	B2	noun	There is a clause in the contract about late payment.	يوجد بند في العقد يتعلق بالدفع المتأخر.	2026-04-08 18:29:37.218426+00
2731	custody	حضانة	B2	noun	The court awarded custody of the children to their mother.	منحت المحكمة حضانة الأطفال لأمهم.	2026-04-08 18:29:37.218426+00
2733	fine	غرامة	B1	noun	He was given a fine for parking illegally.	صدر بحقه غرامة لأنه ركن سيارته بشكل غير قانوني.	2026-04-08 18:29:37.218426+00
2734	jury	هيئة المحلفين	B2	noun	The jury reached a verdict after three days.	توصلت هيئة المحلفين إلى حكم بعد ثلاثة أيام.	2026-04-08 18:29:37.218426+00
2735	lawsuit	دعوى قضائية	B2	noun	She filed a lawsuit against the company for unfair dismissal.	رفعت دعوى قضائية ضد الشركة بسبب الفصل غير العادل.	2026-04-08 18:29:37.218426+00
2736	liability	مسؤولية قانونية	B2	noun	The company admitted liability for the accident.	اعترفت الشركة بمسؤوليتها القانونية عن الحادث.	2026-04-08 18:29:37.218426+00
2737	offence	جريمة	B2	noun	Speeding is a serious driving offence.	السرعة الزائدة جريمة قيادة خطيرة.	2026-04-08 18:29:37.218426+00
2738	penalty	عقوبة	B1	noun	The penalty for late submission is a reduction in marks.	العقوبة على التأخر في التسليم هي خفض في الدرجات.	2026-04-08 18:29:37.218426+00
2739	prosecution	ملاحقة قضائية	B2	noun	The prosecution presented strong evidence in court.	قدّمت جهة الادعاء أدلة قوية في المحكمة.	2026-04-08 18:29:37.218426+00
2740	settlement	تسوية	B2	noun	The two companies reached a legal settlement.	توصلت الشركتان إلى تسوية قانونية.	2026-04-08 18:29:37.218426+00
2741	solicitor	محامٍ استشاري	B2	noun	She consulted a solicitor before signing the contract.	استشارت محاميًا قبل توقيع العقد.	2026-04-08 18:29:37.218426+00
2742	testimony	شهادة	B2	noun	His testimony was crucial in solving the case.	كانت شهادته حاسمة في حل القضية.	2026-04-08 18:29:37.218426+00
2743	verdict	حكم	B2	noun	The jury returned a verdict of not guilty.	أصدرت هيئة المحلفين حكمًا ببراءة المتهم.	2026-04-08 18:29:37.218426+00
2744	violation	انتهاك	B2	noun	The company was fined for a health and safety violation.	غُرّمت الشركة بسبب انتهاك قواعد الصحة والسلامة.	2026-04-08 18:29:37.218426+00
2745	caption	تعليق توضيحي	B1	noun	She added a caption to her photo on social media.	أضافت تعليقًا توضيحيًا لصورتها على وسائل التواصل الاجتماعي.	2026-04-08 18:29:37.218426+00
2732	defendant	مدّعى عليه	B2	noun	The defendant pleaded not guilty to all charges.	أنكر المتهم جميع التهم الموجهة إليه.	2026-04-08 18:29:37.218426+00
2746	columnist	كاتب عمود	B2	noun	He is a respected columnist for a national newspaper.	هو كاتب عمود محترم في صحيفة وطنية.	2026-04-08 18:29:37.218426+00
2747	commentary	تعليق	B1	noun	The sports commentary was entertaining and informative.	كان التعليق الرياضي ممتعًا ومفيدًا.	2026-04-08 18:29:37.218426+00
2748	correspondent	مراسل	B2	noun	She works as a foreign correspondent in the Middle East.	تعمل مراسلة أجنبية في الشرق الأوسط.	2026-04-08 18:29:37.218426+00
2749	coverage	تغطية	B1	noun	The news coverage of the event was extensive.	كانت التغطية الإخبارية للحدث شاملة.	2026-04-08 18:29:37.218426+00
2750	headline	عنوان رئيسي	B1	noun	The headline of the article grabbed everyone's attention.	جذب عنوان المقال الرئيسي انتباه الجميع.	2026-04-08 18:29:37.218426+00
2751	newsletter	نشرة إخبارية	B1	noun	The school sends a weekly newsletter to all parents.	ترسل المدرسة نشرة إخبارية أسبوعية لجميع الأولياء.	2026-04-08 18:29:37.218426+00
2752	podcast	بودكاست	B1	noun	She listens to an English learning podcast every morning.	تستمع إلى بودكاست لتعلم الإنجليزية كل صباح.	2026-04-08 18:29:37.218426+00
2753	propaganda	دعاية	B2	noun	The government used propaganda to influence public opinion.	استخدمت الحكومة الدعاية للتأثير على الرأي العام.	2026-04-08 18:29:37.218426+00
2754	subscription	اشتراك	B1	noun	She has a monthly subscription to an online streaming service.	لديها اشتراك شهري في خدمة بث عبر الإنترنت.	2026-04-08 18:29:37.218426+00
2755	tabloid	صحيفة مثيرة	B2	noun	Tabloid newspapers often focus on celebrity stories.	كثيرًا ما تركّز الصحف المثيرة على قصص المشاهير.	2026-04-08 18:29:37.218426+00
2756	atom	ذرة	B2	noun	An atom is the smallest unit of a chemical element.	الذرة هي أصغر وحدة في العنصر الكيميائي.	2026-04-08 18:29:37.218426+00
2757	compound	مركّب	B2	noun	Water is a compound of hydrogen and oxygen.	الماء مركّب من الهيدروجين والأكسجين.	2026-04-08 18:29:37.218426+00
2758	gene	جين	B2	noun	Scientists discovered a gene linked to heart disease.	اكتشف العلماء جينًا مرتبطًا بأمراض القلب.	2026-04-08 18:29:37.218426+00
2759	genetics	علم الوراثة	B2	noun	Genetics explains why some traits are inherited.	يشرح علم الوراثة سبب توارث بعض الصفات.	2026-04-08 18:29:37.218426+00
2760	molecule	جزيء	B2	noun	A molecule of water contains two hydrogen atoms.	يحتوي جزيء الماء على ذرتي هيدروجين.	2026-04-08 18:29:37.218426+00
2761	particle	جسيم	B2	noun	Subatomic particles are smaller than atoms.	الجسيمات دون الذرية أصغر من الذرات.	2026-04-08 18:29:37.218426+00
2763	radiation	إشعاع	B2	noun	Nuclear power plants must control radiation levels carefully.	يجب على محطات الطاقة النووية التحكم في مستويات الإشعاع بعناية.	2026-04-08 18:29:37.218426+00
2764	aquifer	طبقة مائية	B2	noun	The drought depleted the underground aquifer.	أنضب الجفاف الطبقة المائية الجوفية.	2026-04-08 18:29:37.218426+00
2765	carbon footprint	بصمة كربونية	B2	noun	Planting trees can help reduce your carbon footprint.	يمكن أن تساعد زراعة الأشجار في تقليص بصمتك الكربونية.	2026-04-08 18:29:37.218426+00
2766	ecological	بيئي	B2	adjective	The ecological impact of oil spills is devastating.	التأثير البيئي لانسكابات النفط مدمّر.	2026-04-08 18:29:37.218426+00
2767	erosion	تآكل	B2	noun	Soil erosion is a major problem in many farming regions.	تآكل التربة مشكلة كبرى في كثير من المناطق الزراعية.	2026-04-08 18:29:37.218426+00
2768	floodplain	سهل فيضي	B2	noun	Building on the floodplain is dangerous during heavy rain.	البناء على السهل الفيضي خطير أثناء الأمطار الغزيرة.	2026-04-08 18:29:37.218426+00
2769	geothermal	حراري أرضي	B2	adjective	Iceland uses geothermal energy to heat most of its buildings.	تستخدم آيسلندا الطاقة الحرارية الأرضية لتدفئة معظم مبانيها.	2026-04-08 18:29:37.218426+00
2770	overexploitation	استغلال مفرط	B2	noun	Overexploitation of fish stocks threatens the marine ecosystem.	يهدد الاستغلال المفرط لمخزون الأسماك النظام البيئي البحري.	2026-04-08 18:29:37.218426+00
2771	reforestation	إعادة تشجير	B2	noun	Reforestation programmes are helping to restore damaged land.	برامج إعادة التشجير تساعد في استصلاح الأراضي التالفة.	2026-04-08 18:29:37.218426+00
2772	saline	ملحي	B2	adjective	The soil became too saline for crops to grow.	أصبحت التربة ملحية جدًا لكي تنمو المحاصيل.	2026-04-08 18:29:37.218426+00
2773	sewage	مياه صرف	B2	noun	The city invested in upgrading its sewage treatment plant.	استثمرت المدينة في ترقية محطة معالجة مياه الصرف.	2026-04-08 18:29:37.218426+00
2774	solar panel	لوح طاقة شمسية	B1	noun	Solar panels on the roof provide electricity for the house.	توفر الألواح الشمسية على السطح كهرباء للمنزل.	2026-04-08 18:29:37.218426+00
2775	turbine	توربين	B2	noun	Wind turbines generate electricity without pollution.	توليد الكهرباء بتوربينات الرياح لا ينتج عنه تلوث.	2026-04-08 18:29:37.218426+00
2776	allergy	حساسية	B1	noun	She has an allergy to peanuts and must avoid them.	لديها حساسية من الفول السوداني ويجب عليها تجنبه.	2026-04-08 18:29:37.218426+00
2777	antibiotic	مضاد حيوي	B1	noun	The doctor prescribed antibiotics for the infection.	وصف الطبيب مضادات حيوية للعدوى.	2026-04-08 18:29:37.218426+00
2778	caffeine	كافيين	B1	noun	Too much caffeine can disrupt your sleep.	يمكن أن يُخلّ الكافيين الزائد بنومك.	2026-04-08 18:29:37.218426+00
2779	cardiovascular	قلبي وعائي	B2	adjective	Running is excellent for cardiovascular health.	الركض ممتاز لصحة القلب والأوعية الدموية.	2026-04-08 18:29:37.218426+00
2780	dehydration	جفاف	B1	noun	Dehydration can cause headaches and dizziness.	يمكن أن يسبب الجفاف الصداع والدوخة.	2026-04-08 18:29:37.218426+00
2781	dosage	جرعة	B2	noun	Follow the recommended dosage on the medicine label.	اتبع الجرعة الموصى بها على ملصق الدواء.	2026-04-08 18:29:37.218426+00
2782	hereditary	وراثي	B2	adjective	Some diseases are hereditary and run in families.	بعض الأمراض وراثية وتنتشر في العائلات.	2026-04-08 18:29:37.218426+00
2783	hormone	هرمون	B2	noun	Hormones play a key role in regulating body functions.	تلعب الهرمونات دورًا رئيسيًا في تنظيم وظائف الجسم.	2026-04-08 18:29:37.218426+00
2784	immune	مناعي	B2	adjective	A healthy diet keeps your immune system strong.	يُبقي النظام الغذائي الصحي جهازك المناعي قويًا.	2026-04-08 18:29:37.218426+00
2785	inflammation	التهاب	B2	noun	Exercise can reduce chronic inflammation in the body.	يمكن أن يقلل التمرين من الالتهاب المزمن في الجسم.	2026-04-08 18:29:37.218426+00
2786	physiotherapy	علاج طبيعي	B2	noun	After his knee surgery, he needed several weeks of physiotherapy.	بعد عملية ركبته، احتاج إلى أسابيع عديدة من العلاج الطبيعي.	2026-04-08 18:29:37.218426+00
2788	accomplishment	إنجاز	B1	noun	Finishing a marathon was a great personal accomplishment.	إتمام الماراثون كان إنجازًا شخصيًا رائعًا.	2026-04-08 18:29:37.218426+00
2789	affection	محبة	B1	noun	Children need affection and care to develop well.	يحتاج الأطفال إلى المحبة والرعاية للنمو بشكل جيد.	2026-04-08 18:29:37.218426+00
2790	aggression	عدوانية	B2	noun	Aggression in the classroom disrupts learning for everyone.	العدوانية في الفصل تعطّل التعلم للجميع.	2026-04-08 18:29:37.218426+00
2791	compliance	امتثال	B2	noun	All staff must ensure compliance with safety procedures.	يجب على جميع الموظفين ضمان الامتثال لإجراءات السلامة.	2026-04-08 18:29:37.218426+00
2792	concession	تنازل	B2	noun	Both sides made concessions to reach an agreement.	قدّم كلا الطرفين تنازلات للوصول إلى اتفاق.	2026-04-08 18:29:37.218426+00
2793	confrontation	مواجهة	B2	noun	She wanted to avoid a direct confrontation with her manager.	أرادت تجنب المواجهة المباشرة مع مديرها.	2026-04-08 18:29:37.218426+00
2794	credential	وثيقة اعتماد	B2	noun	She presented her credentials before the job interview.	قدّمت وثائق اعتمادها قبل مقابلة العمل.	2026-04-08 18:29:37.218426+00
2796	deterioration	تدهور	B2	noun	The deterioration in air quality is a serious health concern.	تدهور جودة الهواء مصدر قلق صحي خطير.	2026-04-08 18:29:37.218426+00
2797	discontent	استياء	B2	noun	Public discontent grew as living costs rose sharply.	ازداد الاستياء العام مع الارتفاع الحاد في تكاليف المعيشة.	2026-04-08 18:29:37.218426+00
2798	discretion	تقدير شخصي	B2	noun	Use your own discretion when making this decision.	استخدم تقديرك الشخصي عند اتخاذ هذا القرار.	2026-04-08 18:29:37.218426+00
2799	distinction	تمييز	B2	noun	She graduated with distinction from her university.	تخرجت بامتياز من جامعتها.	2026-04-08 18:29:37.218426+00
2800	dominate	يهيمن	B1	verb	One company tends to dominate the market in this sector.	تميل إحدى الشركات إلى الهيمنة على السوق في هذا القطاع.	2026-04-08 18:29:37.218426+00
2801	endurance	تحمّل	B2	noun	Long-distance running builds both physical and mental endurance.	يبني الجري لمسافات طويلة القدرة على التحمل جسديًا ونفسيًا.	2026-04-08 18:29:37.222692+00
2802	enforced	مفروض	B2	adjective	The new regulations are strictly enforced by the authorities.	تُطبّق السلطات اللوائح الجديدة بصرامة.	2026-04-08 18:29:37.222692+00
2803	exploitation	استغلال	B2	noun	The exploitation of natural resources must be controlled.	يجب التحكم في استغلال الموارد الطبيعية.	2026-04-08 18:29:37.222692+00
2804	gratitude	امتنان	B1	noun	She expressed her gratitude for all the support she received.	عبّرت عن امتنانها لكل الدعم الذي تلقّته.	2026-04-08 18:29:37.222692+00
2805	indifference	لامبالاة	B2	noun	Public indifference to the issue allowed it to grow.	سمحت اللامبالاة العامة بالقضية لها بالنمو.	2026-04-08 18:29:37.222692+00
2806	inference	استنتاج	B2	noun	Drawing a valid inference from data requires careful analysis.	استخلاص استنتاج صالح من البيانات يتطلب تحليلًا دقيقًا.	2026-04-08 18:29:37.222692+00
2807	isolation	عزلة	B1	noun	Social isolation can have a negative impact on mental health.	يمكن أن يكون للعزلة الاجتماعية تأثير سلبي على الصحة النفسية.	2026-04-08 18:29:37.222692+00
2808	legitimacy	شرعية	B2	noun	The government questioned the legitimacy of the protest.	شككت الحكومة في شرعية الاحتجاج.	2026-04-08 18:29:37.222692+00
2809	longevity	طول العمر	B2	noun	Regular exercise is linked to longevity.	ارتبطت التمارين المنتظمة بطول العمر.	2026-04-08 18:29:37.222692+00
2810	manipulation	تلاعب	B2	noun	The manipulation of data is a form of academic dishonesty.	التلاعب بالبيانات شكل من أشكال الغش الأكاديمي.	2026-04-08 18:29:37.222692+00
2811	misconception	سوء فهم	B2	noun	There are many misconceptions about learning a second language.	هناك العديد من سوء الفهم حول تعلم لغة ثانية.	2026-04-08 18:29:37.222692+00
2812	optimism	تفاؤل	B1	noun	Optimism can help you overcome difficult situations.	يمكن أن يساعدك التفاؤل على تجاوز المواقف الصعبة.	2026-04-08 18:29:37.222692+00
2813	perseverance	مثابرة	B1	noun	Perseverance is the key to success in language learning.	المثابرة مفتاح النجاح في تعلم اللغة.	2026-04-08 18:29:37.222692+00
2814	pessimism	تشاؤم	B2	noun	Pessimism can prevent people from reaching their potential.	يمكن أن يمنع التشاؤم الناس من تحقيق إمكاناتهم.	2026-04-08 18:29:37.222692+00
2815	precedent	سابقة	B2	noun	The court ruling set a legal precedent for future cases.	أرسى حكم المحكمة سابقة قانونية للقضايا المستقبلية.	2026-04-08 18:29:37.222692+00
2816	predictable	متوقع	B1	adjective	The ending of the film was entirely predictable.	كانت نهاية الفيلم متوقعة تمامًا.	2026-04-08 18:29:37.222692+00
2817	proactive	استباقي	B2	adjective	Being proactive means addressing problems before they arise.	الاستباقية تعني معالجة المشكلات قبل أن تظهر.	2026-04-08 18:29:37.222692+00
2819	repercussion	تداعية	B2	noun	The decision had serious repercussions for the whole team.	كان للقرار تداعيات خطيرة على الفريق بأكمله.	2026-04-08 18:29:37.222692+00
2795	cynical	ساخر متشكك	B2	adjective	He became cynical about politics after years of disappointment.	أصبح متشائمًا بشأن السياسة بعد سنوات من خيبات الأمل.	2026-04-08 18:29:37.218426+00
2818	reluctance	إحجام	B2	noun	Her reluctance to speak in public was holding her back.	ترددها في التحدث في الأماكن العامة كان يُعيقها.	2026-04-08 18:29:37.222692+00
2820	resilience	مرونة	B2	noun	Communities show remarkable resilience after natural disasters.	تُظهر المجتمعات صمودًا رائعًا بعد الكوارث الطبيعية.	2026-04-08 18:29:37.222692+00
2821	restraint	ضبط النفس	B2	noun	He showed great restraint in not responding to the criticism.	أظهر ضبطًا كبيرًا للنفس في عدم الرد على الانتقاد.	2026-04-08 18:29:37.222692+00
2823	sovereignty	سيادة	B2	noun	National sovereignty is a fundamental principle of international law.	السيادة الوطنية مبدأ أساسي من مبادئ القانون الدولي.	2026-04-08 18:29:37.222692+00
2824	spontaneous	عفوي	B2	adjective	The celebration was spontaneous and full of joy.	كان الاحتفال عفويًا ومليئًا بالفرح.	2026-04-08 18:29:37.222692+00
2825	subordinate	مرؤوس	B2	noun	A good manager treats their subordinates with respect.	يتعامل المدير الجيد مع مرؤوسيه باحترام.	2026-04-08 18:29:37.222692+00
2828	vulnerability	هشاشة	B2	noun	Children are in a state of vulnerability and need protection.	الأطفال في حالة من الهشاشة ويحتاجون إلى الحماية.	2026-04-08 18:29:37.222692+00
2830	bin	صندوق مهملات	A2	noun	Please put your rubbish in the bin.	يرجى وضع نفاياتك في صندوق المهملات.	2026-04-08 18:29:37.222692+00
2831	breeze	نسيم	A2	noun	A cool breeze made the summer day pleasant.	جعل النسيم البارد يوم الصيف لطيفًا.	2026-04-08 18:29:37.222692+00
2832	cafeteria	كافيتيريا	A2	noun	We ate lunch in the school cafeteria.	تناولنا الغداء في كافيتيريا المدرسة.	2026-04-08 18:29:37.222692+00
2833	chalk	طباشير	A2	noun	The teacher wrote the lesson on the board with chalk.	كتب المعلم الدرس على السبورة بالطباشير.	2026-04-08 18:29:37.222692+00
2834	chores	أعمال منزلية	A2	noun	She does her chores before watching television.	تُنجز أعمالها المنزلية قبل مشاهدة التلفزيون.	2026-04-08 18:29:37.222692+00
2835	clap	يصفق	A2	verb	The audience clapped loudly at the end of the show.	صفّق الجمهور بحماس في نهاية العرض.	2026-04-08 18:29:37.222692+00
2836	cliff	جرف صخري	A2	noun	They stood at the edge of the cliff and admired the sea.	وقفوا على حافة الجرف الصخري وأعجبوا بالبحر.	2026-04-08 18:29:37.222692+00
2837	cloudy	غائم	A2	adjective	It was a cloudy day but it did not rain.	كان يومًا غائمًا لكنه لم يمطر.	2026-04-08 18:29:37.222692+00
2839	compass	بوصلة	A2	noun	Hikers use a compass to find the right direction.	يستخدم المشاة البوصلة لمعرفة الاتجاه الصحيح.	2026-04-08 18:29:37.222692+00
2840	congratulate	يهنئ	A2	verb	Everyone congratulated him on passing his exam.	هنّأه الجميع على نجاحه في الامتحان.	2026-04-08 18:29:37.222692+00
2841	crispy	مقرمش	A2	adjective	She likes her toast crispy and golden.	تُحب خبزها المحمص مقرمشًا وذهبيًا.	2026-04-08 18:29:37.222692+00
2842	crossword	كلمات متقاطعة	A2	noun	She does the crossword in the newspaper every morning.	تحل الكلمات المتقاطعة في الجريدة كل صباح.	2026-04-08 18:29:37.222692+00
2843	damp	رطب	A2	adjective	The clothes were still damp when she took them out of the machine.	كانت الملابس لا تزال رطبة حين أخرجتها من الآلة.	2026-04-08 18:29:37.222692+00
2844	dizzy	دائخ	A2	adjective	She felt dizzy after spinning around quickly.	شعرت بالدوخة بعد الدوران بسرعة.	2026-04-08 18:29:37.222692+00
2845	drizzle	رذاذ	A2	noun	A light drizzle fell throughout the morning.	سقط رذاذ خفيف طوال الصباح.	2026-04-08 18:29:37.222692+00
2846	eraser	ممحاة	A2	noun	I need an eraser to fix my mistake.	أحتاج إلى ممحاة لتصحيح خطئي.	2026-04-08 18:29:37.222692+00
2847	fizzy	فوّار	A2	adjective	She prefers fizzy drinks to plain water.	تفضّل المشروبات الفوّارة على الماء العادي.	2026-04-08 18:29:37.222692+00
2848	flavourful	غني بالنكهة	A2	adjective	The soup was warm and flavourful.	كان الحساء دافئًا وغنيًا بالنكهة.	2026-04-08 18:29:37.222692+00
2850	footpath	مسار المشاة	A2	noun	We followed the footpath through the park.	اتبعنا مسار المشاة عبر الحديقة.	2026-04-08 18:29:37.222692+00
2851	handkerchief	منديل قماش	A2	noun	He kept a handkerchief in his jacket pocket.	احتفظ بمنديل في جيب سترته.	2026-04-08 18:29:37.222692+00
2853	housework	أعمال المنزل	A2	noun	They share the housework equally between them.	يتقاسمان أعمال المنزل بالتساوي.	2026-04-08 18:29:37.222692+00
2854	humid	رطب	A2	adjective	The weather was hot and humid in August.	كان الطقس حارًا ورطبًا في أغسطس.	2026-04-08 18:29:37.222692+00
2855	iceberg	جبل جليدي	A2	noun	Only a small part of an iceberg is visible above water.	جزء صغير فقط من الجبل الجليدي يظهر فوق الماء.	2026-04-08 18:29:37.222692+00
2856	ironing	كي الملابس	A2	noun	She does the ironing while watching television.	تقوم بكي الملابس أثناء مشاهدة التلفزيون.	2026-04-08 18:29:37.222692+00
2857	jellyfish	قنديل بحر	A2	noun	He saw a jellyfish floating near the shore.	رأى قنديل بحر يطفو قرب الشاطئ.	2026-04-08 18:29:37.222692+00
2859	jog	يركض ببطء	A2	verb	She jogs for 30 minutes every morning.	تركض ببطء لمدة 30 دقيقة كل صباح.	2026-04-08 18:29:37.222692+00
2860	jumper	كنزة	A2	noun	He wore a thick jumper because it was cold.	ارتدى كنزة سميكة لأن الجو كان باردًا.	2026-04-08 18:29:37.222692+00
2861	kettle	غلاية	A2	noun	She boiled the kettle to make a cup of tea.	أغلت الغلاية لصنع كوب من الشاي.	2026-04-08 18:29:37.222692+00
2826	tenacity	مثابرة	B2	noun	She achieved her goals through sheer tenacity.	حققت أهدافها من خلال المثابرة والإصرار المطلق.	2026-04-08 18:29:37.222692+00
2827	validation	تحقق من الصحة	B2	noun	Students need validation from their teachers to build confidence.	يحتاج الطلاب إلى التحقق من معلميهم لبناء الثقة.	2026-04-08 18:29:37.222692+00
2829	allergic	مصاب بحساسية	A2	adjective	She is allergic to cats and cannot keep one as a pet.	تعاني من حساسية تجاه القطط ولا يمكنها تربية واحدة.	2026-04-08 18:29:37.222692+00
2838	cobweb	بيت العنكبوت	A2	noun	There was a cobweb in the corner of the old room.	كان هناك خيط عنكبوت في زاوية الغرفة القديمة.	2026-04-08 18:29:37.222692+00
2849	flip-flops	شبشب مطاطي	A2	noun	He wore flip-flops on the beach.	ارتدى الشبشب على الشاطئ.	2026-04-08 18:29:37.222692+00
2852	hopeful	مفعم بالأمل	A2	adjective	She was hopeful that she would receive good news.	كانت متفائلة بأنها ستتلقى أخبارًا جيدة.	2026-04-08 18:29:37.222692+00
2858	jogger	عدّاء	A2	noun	The park was full of joggers early in the morning.	كانت الحديقة مليئة بالمتمرنين بالركض في الصباح الباكر.	2026-04-08 18:29:37.222692+00
2863	lantern	فانوس	A2	noun	They hung lanterns in the garden for the party.	علّقوا فوانيس في الحديقة للحفلة.	2026-04-08 18:29:37.222692+00
2864	lavender	خزامى	A2	noun	She planted lavender in her garden for its fragrance.	زرعت الخزامى في حديقتها لعطرها.	2026-04-08 18:29:37.222692+00
2865	lettuce	خس	A2	noun	She added lettuce and tomatoes to the salad.	أضافت خسًا وطماطم إلى السلطة.	2026-04-08 18:29:37.222692+00
2866	meadow	مرج	A2	noun	They picnicked in a meadow full of wildflowers.	قاموا بنزهة في مرج مليء بالزهور البرية.	2026-04-08 18:29:37.222692+00
2867	melt	يذوب	A2	verb	The ice cream began to melt in the hot sun.	بدأ الآيس كريم يذوب في الشمس الحارة.	2026-04-08 18:29:37.222692+00
2868	mint	نعناع	A2	noun	She added fresh mint to her tea.	أضافت نعناعًا طازجًا إلى شايها.	2026-04-08 18:29:37.222692+00
2869	miserable	بائس	A2	adjective	The cold wet weather made everyone feel miserable.	جعل الطقس البارد الرطب الجميع يشعرون بالبؤس.	2026-04-08 18:29:37.222692+00
2871	nightmare	كابوس	A2	noun	She had a terrible nightmare and woke up scared.	أصابها كابوس مرعب وأفاقت خائفة.	2026-04-08 18:29:37.222692+00
2872	nod	يومئ	A2	verb	She nodded to show she understood.	أومأت لتُظهر أنها فهمت.	2026-04-08 18:29:37.222692+00
2873	nursery	حضانة	A2	noun	The children attend the local nursery every morning.	يحضر الأطفال الحضانة المحلية كل صباح.	2026-04-08 18:29:37.222692+00
2874	ouch	آخ	A2	exclamation	Ouch! I burned my hand on the oven.	آخ! أحرقت يدي على الفرن.	2026-04-08 18:29:37.222692+00
2875	overcast	ملبّد بالغيوم	A2	adjective	The sky was overcast and it looked like rain.	كانت السماء ملبّدة بالغيوم وبدا أنه سيمطر.	2026-04-08 18:29:37.222692+00
2876	oyster	محار	A2	noun	He ordered a plate of fresh oysters at the restaurant.	طلب طبقًا من المحار الطازج في المطعم.	2026-04-08 18:29:37.222692+00
2878	parcel	طرد بريدي	A2	noun	A parcel arrived for her in the post this morning.	وصل لها طرد بريدي هذا الصباح.	2026-04-08 18:29:37.222692+00
2879	pavement	رصيف	A2	noun	Please walk on the pavement, not the road.	يرجى المشي على الرصيف لا على الطريق.	2026-04-08 18:29:37.222692+00
2880	pleasant	ممتع	A2	adjective	We had a pleasant evening with our neighbours.	قضينا أمسية ممتعة مع جيراننا.	2026-04-08 18:29:37.222692+00
2881	pond	بركة	A2	noun	There are ducks swimming on the pond in the park.	هناك بطات تسبح في البركة في الحديقة.	2026-04-08 18:29:37.222692+00
2882	porch	شرفة أمامية	A2	noun	She sat on the porch and read her book.	جلست على الشرفة الأمامية وقرأت كتابها.	2026-04-08 18:29:37.222692+00
2883	puddle	بركة مطر	A2	noun	The children jumped in the puddles after the rain.	قفز الأطفال في برك المطر بعد الأمطار.	2026-04-08 18:29:37.222692+00
2884	rucksack	حقيبة ظهر	A2	noun	She carried all her books in her rucksack.	حملت جميع كتبها في حقيبة الظهر.	2026-04-08 18:29:37.222692+00
2886	scarf	وشاح	A2	noun	She wrapped a woollen scarf around her neck.	لفّت وشاحًا صوفيًا حول رقبتها.	2026-04-08 18:29:37.222692+00
2887	scissors	مقص	A2	noun	She used scissors to cut the wrapping paper.	استخدمت المقص لقطع ورق التغليف.	2026-04-08 18:29:37.222692+00
2888	scout	كشاف	A2	noun	He was a scout as a child and loved camping.	كان كشافًا في طفولته وأحب التخييم.	2026-04-08 18:29:37.222692+00
2889	seagull	نورس	A2	noun	A seagull landed on the pier and stole her chips.	هبط نورس على الرصيف وسرق رقائقها المقلية.	2026-04-08 18:29:37.222692+00
2890	shed	سقيفة	A2	noun	He keeps his tools in the shed at the back of the garden.	يحتفظ بأدواته في السقيفة في الجزء الخلفي من الحديقة.	2026-04-08 18:29:37.222692+00
2891	sleepy	نعسان	A2	adjective	He was so sleepy that he fell asleep on the sofa.	كان نعسانًا جدًا لدرجة أنه نام على الأريكة.	2026-04-08 18:29:37.222692+00
2892	slippery	زلق	A2	adjective	The floor was slippery after mopping.	كانت الأرضية زلقة بعد المسح.	2026-04-08 18:29:37.222692+00
2893	smoothie	عصير كثيف	A2	noun	She made a banana and mango smoothie for breakfast.	صنعت عصيرًا كثيفًا من الموز والمانجو للإفطار.	2026-04-08 18:29:37.222692+00
2894	snack	وجبة خفيفة	A2	noun	She had a snack between lunch and dinner.	تناولت وجبة خفيفة بين الغداء والعشاء.	2026-04-08 18:29:37.222692+00
2895	sneeze	يعطس	A2	verb	She sneezed several times because of the dust.	عطست عدة مرات بسبب الغبار.	2026-04-08 18:29:37.222692+00
2896	souvenir	تذكار	A2	noun	She bought a souvenir for each member of her family.	اشترت تذكارًا لكل فرد من أفراد عائلتها.	2026-04-08 18:29:37.222692+00
2897	sponge	إسفنجة	A2	noun	She used a sponge to clean the kitchen counter.	استخدمت إسفنجة لتنظيف منضدة المطبخ.	2026-04-08 18:29:37.222692+00
2898	stain	بقعة	A2	noun	She tried to remove the coffee stain from her shirt.	حاولت إزالة بقعة القهوة من قميصها.	2026-04-08 18:29:37.222692+00
2899	statue	تمثال	A2	noun	There is a large statue in the middle of the square.	يوجد تمثال كبير في وسط الميدان.	2026-04-08 18:29:37.222692+00
2900	sticky	لزج	A2	adjective	The honey made her fingers sticky.	جعل العسل أصابعها لزجة.	2026-04-08 18:29:37.222692+00
2901	sting	يلسع	A2	verb	She was stung by a bee in the garden.	لسعها نحل في الحديقة.	2026-04-08 18:29:37.226595+00
2902	sunburn	حرق شمسي	A2	noun	She got a bad sunburn because she forgot her sunscreen.	أصيبت بحرق شمسي شديد لأنها نسيت واقي الشمس.	2026-04-08 18:29:37.226595+00
2903	sunscreen	واقي شمسي	A2	noun	Always apply sunscreen before going to the beach.	ضع دائمًا واقي الشمس قبل الذهاب إلى الشاطئ.	2026-04-08 18:29:37.226595+00
2904	sweat	يتعرق	A2	verb	He was sweating after running in the heat.	كان يتعرق بعد الركض في الحر.	2026-04-08 18:29:37.226595+00
2905	swing	أرجوحة	A2	noun	The children played on the swings in the park.	لعب الأطفال على الأراجيح في الحديقة.	2026-04-08 18:29:37.226595+00
2906	teddy bear	دب محشو	A2	noun	She slept with her teddy bear as a child.	كانت تنام مع دبها المحشو في طفولتها.	2026-04-08 18:29:37.226595+00
2877	pancake	فطيرة	A2	noun	She made pancakes for breakfast on Sunday.	صنعت فطائر مسطحة للإفطار يوم الأحد.	2026-04-08 18:29:37.222692+00
2885	rush	يتعجّل	A2	verb	Don't rush; we have plenty of time.	لا تتسرع؛ لدينا وقت كافٍ.	2026-04-08 18:29:37.222692+00
2907	thunder	رعد	A2	noun	The children were scared by the loud thunder.	خاف الأطفال من صوت الرعد العالي.	2026-04-08 18:29:37.226595+00
2908	toast	خبز محمص	A2	noun	She ate toast with jam for breakfast.	تناولت خبزًا محمصًا مع المربى للإفطار.	2026-04-08 18:29:37.226595+00
2909	tray	صينية	A2	noun	She carried the cups to the table on a tray.	حملت الأكواب إلى الطاولة على صينية.	2026-04-08 18:29:37.226595+00
2910	tribe	قبيلة	A2	noun	The documentary showed the life of an Amazon tribe.	أظهر الفيلم الوثائقي حياة قبيلة أمازون.	2026-04-08 18:29:37.226595+00
2911	trustworthy	جدير بالثقة	A2	adjective	She is a trustworthy person who always keeps her promises.	إنها شخصية جديرة بالثقة وتفي دائمًا بوعودها.	2026-04-08 18:29:37.226595+00
2912	tunnel	نفق	A2	noun	The train went through a long tunnel under the mountain.	مرّ القطار عبر نفق طويل تحت الجبل.	2026-04-08 18:29:37.226595+00
2914	upset	منزعج	A2	adjective	She was upset when she heard the bad news.	كانت منزعجة عندما سمعت الأخبار السيئة.	2026-04-08 18:29:37.226595+00
2915	vending machine	آلة بيع	A2	noun	She bought a bottle of water from the vending machine.	اشترت زجاجة ماء من آلة البيع.	2026-04-08 18:29:37.226595+00
2916	vest	سترة داخلية	A2	noun	He wore a vest under his shirt to stay warm.	ارتدى سترة داخلية تحت قميصه للبقاء دافئًا.	2026-04-08 18:29:37.226595+00
2917	volleyball	كرة الطائرة	A2	noun	She plays volleyball on the school team.	تلعب كرة الطائرة في فريق المدرسة.	2026-04-08 18:29:37.226595+00
2918	waterfall	شلال	A2	noun	They hiked to see the famous waterfall.	ساروا في رحلة لرؤية الشلال الشهير.	2026-04-08 18:29:37.226595+00
2919	webcam	كاميرا ويب	A2	noun	She used her webcam to join the online class.	استخدمت كاميرا الويب للانضمام إلى الفصل الإلكتروني.	2026-04-08 18:29:37.226595+00
2920	weigh	يزن	A2	verb	He weighed himself on the bathroom scales.	وزن نفسه على ميزان الحمام.	2026-04-08 18:29:37.226595+00
2921	wheelchair	كرسي متحرك	A2	noun	The hospital corridor is wide enough for a wheelchair.	الممر في المستشفى واسع بما يكفي للكرسي المتحرك.	2026-04-08 18:29:37.226595+00
2922	windy	عاصف	A2	adjective	It was a very windy day so she wore a hat.	كان يومًا عاصفًا جدًا لذا ارتدت قبعة.	2026-04-08 18:29:37.226595+00
2923	yoghurt	زبادي	A2	noun	She eats yoghurt with honey every morning.	تتناول الزبادي مع العسل كل صباح.	2026-04-08 18:29:37.226595+00
2924	agile	رشيق	B1	adjective	Agile employees adapt quickly to change.	يتكيف الموظفون الرشيقون بسرعة مع التغيير.	2026-04-08 18:29:37.226595+00
2925	blend	يمزج	B1	verb	She blended the fruits together to make a smoothie.	مزجت الفاكهة معًا لصنع عصير كثيف.	2026-04-08 18:29:37.226595+00
2926	cautious	حذر	B1	adjective	She was cautious about making any hasty decisions.	كانت حذرة من اتخاذ أي قرارات متسرعة.	2026-04-08 18:29:37.226595+00
2927	clutter	فوضى	B1	noun	She cleared the clutter from her desk to focus better.	أزالت الفوضى من مكتبها للتركيز بشكل أفضل.	2026-04-08 18:29:37.226595+00
2928	compensation	تعويض	B1	noun	She received financial compensation for the delay.	حصلت على تعويض مالي بسبب التأخير.	2026-04-08 18:29:37.226595+00
2929	confirmation	تأكيد	B1	noun	We are still waiting for confirmation of the booking.	لا نزال ننتظر تأكيد الحجز.	2026-04-08 18:29:37.226595+00
2930	contributor	مساهم	B1	noun	She is a major contributor to the team's success.	إنها مساهمة رئيسية في نجاح الفريق.	2026-04-08 18:29:37.226595+00
2931	decade	عقد	B1	noun	Technology has changed dramatically over the past decade.	تغيّرت التكنولوجيا بشكل كبير خلال العقد الماضي.	2026-04-08 18:29:37.226595+00
2932	delight	بهجة	B1	noun	The children's laughter was a delight to hear.	كان سماع ضحكات الأطفال بهجة.	2026-04-08 18:29:37.226595+00
2933	disappoint	يُخيّب الأمل	B1	verb	She did not want to disappoint her parents.	لم تكن تريد أن تُخيّب أمل والديها.	2026-04-08 18:29:37.226595+00
2934	eligibility	أهلية	B1	noun	Your eligibility for the grant depends on your income.	تعتمد أهليتك للمنحة على دخلك.	2026-04-08 18:29:37.226595+00
2935	exhausted	منهك	B1	adjective	He was exhausted after the long journey.	كان منهكًا بعد الرحلة الطويلة.	2026-04-08 18:29:37.226595+00
2936	expectation	توقع	B1	noun	Students must meet the expectations set by their teachers.	يجب على الطلاب تلبية التوقعات التي يضعها معلموهم.	2026-04-08 18:29:37.226595+00
2937	fascination	افتتان	B1	noun	She has always had a fascination with astronomy.	دائمًا ما كانت مفتونة بعلم الفلك.	2026-04-08 18:29:37.226595+00
2938	frustration	إحباط	B1	noun	She felt frustration when she could not solve the problem.	شعرت بالإحباط عندما لم تستطع حل المشكلة.	2026-04-08 18:29:37.226595+00
2939	hesitate	يتردد	B1	verb	Do not hesitate to ask if you have questions.	لا تتردد في السؤال إذا كان لديك أسئلة.	2026-04-08 18:29:37.226595+00
2940	incentivize	يُحفّز	B2	verb	The company incentivized workers with bonuses.	حفّزت الشركة العمال بالمكافآت.	2026-04-08 18:29:37.226595+00
2942	instinct	غريزة	B2	noun	She trusted her instinct and made the right decision.	وثقت بغريزتها واتخذت القرار الصحيح.	2026-04-08 18:29:37.226595+00
2943	landmark	معلم بارز	B1	noun	The Eiffel Tower is the most famous landmark in Paris.	برج إيفل هو أشهر معلم بارز في باريس.	2026-04-08 18:29:37.226595+00
2944	mediator	وسيط	B2	noun	A mediator helped resolve the dispute peacefully.	ساعد وسيط في حل النزاع بسلام.	2026-04-08 18:29:37.226595+00
2945	nourish	يغذّي	B1	verb	A good diet nourishes both body and mind.	يُغذّي النظام الغذائي الجيد الجسم والعقل معًا.	2026-04-08 18:29:37.226595+00
2946	oversee	يُشرف على	B2	verb	She was appointed to oversee the new project.	عُيّنت للإشراف على المشروع الجديد.	2026-04-08 18:29:37.226595+00
2947	outbreak	تفشٍّ	B2	noun	An outbreak of food poisoning closed the restaurant.	أدى تفشٍّ التسمم الغذائي إلى إغلاق المطعم.	2026-04-08 18:29:37.226595+00
2913	twins	توأمان	A2	noun	She has twins who are both interested in science.	لديها توأم مهتمان بالعلوم.	2026-04-08 18:29:37.226595+00
2948	outlook	نظرة عامة	B2	noun	The economic outlook for next year is uncertain.	التوقعات الاقتصادية للعام القادم غير مؤكدة.	2026-04-08 18:29:37.226595+00
2949	pathway	مسار	B1	noun	Education is the best pathway to a successful career.	التعليم هو أفضل مسار للحصول على مهنة ناجحة.	2026-04-08 18:29:37.226595+00
2950	precedence	أسبقية	B2	noun	Safety should always take precedence over speed.	يجب أن تأخذ السلامة دائمًا الأسبقية على السرعة.	2026-04-08 18:29:37.226595+00
2951	proficiency	إجادة	B2	noun	She demonstrated proficiency in four languages.	أثبتت إجادتها لأربع لغات.	2026-04-08 18:29:37.226595+00
2952	recall	يتذكر	B1	verb	She could not recall where she had put her keys.	لم تستطع تذكّر أين وضعت مفاتيحها.	2026-04-08 18:29:37.226595+00
2953	reinterpret	يُعيد التفسير	B2	verb	New evidence caused scientists to reinterpret the data.	دفعت الأدلة الجديدة العلماء إلى إعادة تفسير البيانات.	2026-04-08 18:29:37.226595+00
2954	remedy	علاج	B2	noun	There is no simple remedy for this complex problem.	لا يوجد علاج بسيط لهذه المشكلة المعقدة.	2026-04-08 18:29:37.226595+00
2955	reputation	سمعة	B1	noun	The school has an excellent reputation in the community.	تتمتع المدرسة بسمعة ممتازة في المجتمع.	2026-04-08 18:29:37.226595+00
2956	risky	محفوف بالمخاطر	B1	adjective	Investing all your money in one company is risky.	استثمار جميع أموالك في شركة واحدة أمر محفوف بالمخاطر.	2026-04-08 18:29:37.226595+00
2957	satisfactory	مرضٍ	B1	adjective	The results were satisfactory but could be improved.	كانت النتائج مرضية لكن يمكن تحسينها.	2026-04-08 18:29:37.226595+00
2958	strive	يسعى بجد	B1	verb	Students should strive to improve every day.	ينبغي على الطلاب السعي بجد للتحسن كل يوم.	2026-04-08 18:29:37.226595+00
2959	tackle	يتصدى لـ	B1	verb	We need to tackle the problem of air pollution seriously.	نحتاج إلى التصدي بجدية لمشكلة تلوث الهواء.	2026-04-08 18:29:37.226595+00
2961	upskill	يطور مهاراته	B2	verb	Many workers upskill through online courses.	يطوّر كثير من العمال مهاراتهم عبر الدورات الإلكترونية.	2026-04-08 18:29:37.226595+00
2962	welcoming	مُرحِّب	B1	adjective	The school has a welcoming atmosphere for new students.	المدرسة لديها جو مُرحِّب للطلاب الجدد.	2026-04-08 18:29:37.226595+00
2963	adjustment	تعديل	B1	noun	A small adjustment to the plan improved the outcome.	أدى تعديل صغير في الخطة إلى تحسين النتيجة.	2026-04-08 18:29:37.226595+00
2964	alignment	توافق	B2	noun	There must be alignment between the team's goals.	يجب أن يكون هناك توافق بين أهداف الفريق.	2026-04-08 18:29:37.226595+00
2965	appreciation	تقدير	B1	noun	She expressed her appreciation for all the support.	عبّرت عن تقديرها لكل الدعم الذي تلقّته.	2026-04-08 18:29:37.226595+00
2967	blueprint	مخطط تفصيلي	B2	noun	The architect showed the blueprint for the new building.	أظهر المهندس المعماري المخطط التفصيلي للمبنى الجديد.	2026-04-08 18:29:37.226595+00
2968	breakthrough	إنجاز كبير	B2	noun	Scientists made a major breakthrough in cancer research.	حقق العلماء إنجازًا كبيرًا في أبحاث السرطان.	2026-04-08 18:29:37.226595+00
2969	consecutive	متتالٍ	B2	adjective	She won the championship for three consecutive years.	فازت بالبطولة لثلاث سنوات متتالية.	2026-04-08 18:29:37.226595+00
2970	contentment	رضا	B2	noun	Simple pleasures often bring the greatest contentment.	كثيرًا ما تُعطي الملذات البسيطة أكبر قدر من الرضا.	2026-04-08 18:29:37.226595+00
2972	declaration	إعلان	B2	noun	The government made a formal declaration of emergency.	أصدرت الحكومة إعلانًا رسميًا لحالة الطوارئ.	2026-04-08 18:29:37.226595+00
2973	disclosure	إفصاح	B2	noun	Full disclosure of financial information is required by law.	يُلزم القانون بالإفصاح الكامل عن المعلومات المالية.	2026-04-08 18:29:37.226595+00
2974	exploration	استكشاف	B1	noun	The exploration of space has advanced our knowledge greatly.	أثرى استكشاف الفضاء معرفتنا بشكل كبير.	2026-04-08 18:29:37.226595+00
2976	generosity	كرم	B1	noun	Her generosity towards those in need was admirable.	كان كرمها تجاه المحتاجين مثيرًا للإعجاب.	2026-04-08 18:29:37.226595+00
2977	likelihood	احتمال	B2	noun	The likelihood of rain tomorrow is high.	احتمال سقوط المطر غدًا مرتفع.	2026-04-08 18:29:37.226595+00
2978	occurrence	حدوث	B2	noun	The occurrence of such events is becoming more frequent.	أصبح حدوث مثل هذه الأحداث أكثر تكرارًا.	2026-04-08 18:29:37.226595+00
2980	ownership	ملكية	B2	noun	Home ownership is a goal for many young people.	امتلاك منزل هدف لكثير من الشباب.	2026-04-08 18:29:37.226595+00
2981	popularity	شعبية	B1	noun	The popularity of online courses has grown rapidly.	نمت شعبية الدورات الإلكترونية بسرعة.	2026-04-08 18:29:37.226595+00
2982	precision	دقة	B2	noun	The surgeon performed the operation with great precision.	أجرى الجراح العملية بدقة عالية.	2026-04-08 18:29:37.226595+00
2983	reasoning	استدلال	B2	noun	Clear reasoning is important in academic writing.	الاستدلال الواضح مهم في الكتابة الأكاديمية.	2026-04-08 18:29:37.226595+00
2984	recognition	اعتراف	B1	noun	She received recognition for her contributions to the field.	حظيت باعتراف بمساهماتها في هذا المجال.	2026-04-08 18:29:37.226595+00
2985	reliance	اعتماد	B2	noun	Over-reliance on technology can reduce critical thinking.	يمكن أن يُقلّص الاعتماد المفرط على التكنولوجيا التفكير النقدي.	2026-04-08 18:29:37.226595+00
2986	sensitivity	حساسية	B2	noun	Cultural sensitivity is important when working internationally.	الحساسية الثقافية مهمة عند العمل على المستوى الدولي.	2026-04-08 18:29:37.226595+00
2987	stance	موقف	B2	noun	The government took a firm stance on the issue.	اتخذت الحكومة موقفًا حازمًا بشأن المسألة.	2026-04-08 18:29:37.226595+00
2966	attachment	ارتباط	B1	noun	Please open the attachment in the email.	يرجى فتح المرفق في البريد الإلكتروني.	2026-04-08 18:29:37.226595+00
2971	cultivation	تنمية	B2	noun	The cultivation of new habits takes time and effort.	تنمية عادات جديدة يستغرق وقتًا وجهدًا.	2026-04-08 18:29:37.226595+00
2975	fulfillment	تحقق	B2	noun	She found great fulfillment in teaching children.	وجدت إشباعًا كبيرًا في تعليم الأطفال.	2026-04-08 18:29:37.226595+00
2979	orientation	توجُّه	B2	noun	New students attend an orientation on the first day.	يحضر الطلاب الجدد جلسة توجيه في اليوم الأول.	2026-04-08 18:29:37.226595+00
2989	vigilance	يقظة	B2	noun	Constant vigilance is needed to prevent cybercrime.	مطلوب يقظة مستمرة لمنع الجرائم الإلكترونية.	2026-04-08 18:29:37.226595+00
2990	willpower	إرادة	B1	noun	Giving up sugar requires a lot of willpower.	التوقف عن السكر يتطلب قدرًا كبيرًا من الإرادة.	2026-04-08 18:29:37.226595+00
2991	workload	عبء عمل	B1	noun	The heavy workload left her with little free time.	تركها عبء العمل الثقيل بوقت فراغ ضئيل.	2026-04-08 18:29:37.226595+00
2992	worldview	رؤية للعالم	B2	noun	Travel can broaden your worldview significantly.	يمكن للسفر أن يُوسّع رؤيتك للعالم بشكل ملحوظ.	2026-04-08 18:29:37.226595+00
2994	zenith	ذروة	B2	noun	She reached the zenith of her career at age 40.	بلغت ذروة مسيرتها المهنية في سن 40.	2026-04-08 18:29:37.226595+00
2995	zealous	متحمس	B2	adjective	She was a zealous advocate for environmental protection.	كانت مدافعة متحمسة عن حماية البيئة.	2026-04-08 18:29:37.226595+00
2996	spectator	متفرج	B1	noun	Thousands of spectators attended the final match.	حضر آلاف المتفرجين المباراة النهائية.	2026-04-08 18:29:37.226595+00
2997	mosaic	فسيفساء	B2	noun	The floor was decorated with a beautiful ancient mosaic.	كانت الأرضية مزينة بفسيفساء قديمة جميلة.	2026-04-08 18:29:37.226595+00
2999	eloquent	بليغ	B2	adjective	She gave an eloquent speech that moved the whole audience.	ألقت خطابًا بليغًا أثّر في كل الجمهور.	2026-04-08 18:29:37.226595+00
3000	perpetual	دائم	B2	adjective	The region is in a state of perpetual conflict.	تعيش المنطقة في حالة صراع دائم.	2026-04-08 18:29:37.226595+00
64	class	صف	A2	n.	The class starts at nine in the morning.	يبدأ الفصل في الساعة التاسعة صباحاً.	2026-04-08 18:29:37.113583+00
128	head	رأس	A2	n.	Wear a helmet to protect your head.	ارتدِ خوذة لحماية رأسك.	2026-04-08 18:29:37.118504+00
161	many	كثير من	A2	det.	How many books have you read this year?	كم عدد الكتب التي قرأتها هذا العام؟	2026-04-08 18:29:37.118504+00
206	read	يقرأ	A2	v.	Read the passage carefully before answering.	اقرأ النص بعناية قبل الإجابة.	2026-04-08 18:29:37.122679+00
254	town	بلدة	A2	n.	I live in a small town near the mountains.	أسكن في بلدة صغيرة بالقرب من الجبال.	2026-04-08 18:29:37.122679+00
303	choose	يختار	A2	v.	Choose the correct answer and circle it.	اختر الإجابة الصحيحة وضع دائرة حولها.	2026-04-08 18:29:37.126284+00
345	guess	يخمّن	A2	v.	Try to guess the meaning from the context.	حاول أن تخمّن المعنى من السياق.	2026-04-08 18:29:37.126284+00
386	practice	ممارسة	A2	n.	Regular practice helps you improve your English.	التمرين المنتظم يساعدك على تحسين اللغة الإنجليزية.	2026-04-08 18:29:37.126284+00
432	translate	يترجم	A2	v.	Can you translate this sentence into Arabic?	هل يمكنك أن تترجم هذه الجملة إلى العربية؟	2026-04-08 18:29:37.130163+00
485	brush	يفرشي	A2	v.	Brush your teeth after every meal.	نظف أسنانك بالفرشاة بعد كل وجبة.	2026-04-08 18:29:37.130163+00
523	cycle	يركب دراجة	A2	v.	I cycle to the park at the weekend.	أركب دراجتي إلى الحديقة في نهاية الأسبوع.	2026-04-08 18:29:37.134069+00
569	gold	ذهب	A2	adj.	She won a gold medal at the swimming competition.	فازت بميدالية ذهبية في مسابقة السباحة.	2026-04-08 18:29:37.134069+00
584	hunt	يصطاد	A2	v.	In the past, people had to hunt for their food.	في الماضي، كان على الناس أن يصطادوا طعامهم.	2026-04-08 18:29:37.134069+00
616	meal	وجبة	A2	n.	A balanced meal includes protein, vegetables, and carbs.	تتضمن الوجبة المتوازنة البروتين والخضروات والكربوهيدرات.	2026-04-08 18:29:37.138276+00
675	van	شاحنة صغيرة	A2	n.	The school van picks students up every morning.	تقل الحافلة الصغيرة الطلاب كل صباح.	2026-04-08 18:29:37.138276+00
699	arrange	يرتب	A2	v.	Can you arrange a meeting for next Monday morning?	هل يمكنك تنظيم اجتماع يوم الاثنين في الصباح؟	2026-04-08 18:29:37.138276+00
745	order	نظام	A2	n.	In order to succeed in life, you absolutely must work hard.	لكي تنجح في الحياة، يجب أن تعمل بجد.	2026-04-08 18:29:37.141509+00
747	percent	بالمئة	A2	n.	Total sales figures rose by fifteen percent last year.	ارتفعت إجمالي أرقام المبيعات بنسبة خمسة عشر في المائة العام الماضي.	2026-04-08 18:29:37.141509+00
791	greenhouse	بيت زجاجي	A2	n.	Greenhouse gases effectively trap and retain heat in the atmosphere.	غازات الاحتباس الحراري تحبس وتحتفظ بالحرارة في الغلاف الجوي بفعالية.	2026-04-08 18:29:37.141509+00
810	smart	ذكي	A2	adj.	Smart cities use advanced technology to improve the quality of urban living.	تستخدم المدن الذكية التكنولوجيا المتقدمة لتحسين جودة الحياة الحضرية.	2026-04-08 18:29:37.144805+00
830	recognise	يتعرف على / يعترف بـ	A2	v.	Governments are beginning to recognise the true economic cost of inaction.	تبدأ الحكومات بالاعتراف بالتكلفة الاقتصادية الحقيقية للخمول.	2026-04-08 18:29:37.144805+00
837	code	رمز / كود	A2	n.	Students must follow the school code of conduct at all times.	يجب على الطلاب الالتزام بقانون السلوك المدرسي في جميع الأوقات.	2026-04-08 18:29:37.144805+00
879	develop	يطوّر	B1	v.	New technology is developing at an incredibly fast pace.	تتطور التكنولوجيا الجديدة بسرعة لا تصدق.	2026-04-08 18:29:37.144805+00
914	power	قوة	B1	n.	Solar power is now a widely accepted sustainable energy source.	الطاقة الشمسية أصبحت الآن مصدر طاقة مستدام معترفاً به على نطاق واسع.	2026-04-08 18:29:37.149545+00
948	agriculture	زراعة	B1	n.	Sustainable agriculture is the main source of income in rural areas.	الزراعة المستدامة هي المصدر الرئيسي للدخل في المناطق الريفية.	2026-04-08 18:29:37.149545+00
990	harm	يضر/يلحق الضرر	B1	v.	Plastic waste causes significant and lasting harm to marine life.	تسبب النفايات البلاستيكية ضرراً كبيراً ودائماً لحياة البحار.	2026-04-08 18:29:37.149545+00
2993	yielding	مُتسامح	B2	adjective	The new approach was more yielding in results.	كان النهج الجديد أكثر إنتاجًا من حيث النتائج.	2026-04-08 18:29:37.226595+00
2998	rhetoric	خطاب مُقنع	B2	noun	His speech was full of rhetoric but lacked concrete proposals.	كان خطابه مليئًا بالخطابة لكنه افتقر إلى مقترحات ملموسة.	2026-04-08 18:29:37.226595+00
1026	remain	يظل/يبقى	B1	v.	Temperatures remain dangerously high during the long summer months.	تبقى درجات الحرارة مرتفعة بشكل خطير خلال أشهر الصيف الطويلة.	2026-04-08 18:29:37.153092+00
1027	renewable	متجدد	B1	adj.	Renewable energy sources include wind, solar, and hydroelectric power.	تشمل مصادر الطاقة المتجددة الرياح والطاقة الشمسية والطاقة الكهرومائية.	2026-04-08 18:29:37.153092+00
1047	unemployed	عاطل عن العمل	B1	adj.	Many young people sadly remain unemployed for years after graduating.	يبقى العديد من الشباب للأسف عاطلين عن العمل لسنوات بعد التخرج.	2026-04-08 18:29:37.153092+00
1060	capture	يلتقط	B1	v.	Photographs can effectively capture very important historical moments.	الصور الفوتوغرافية يمكنها أن تلتقط اللحظات التاريخية المهمة جداً بفعالية.	2026-04-08 18:29:37.153092+00
1078	overcome	يتغلب على	B1	v.	With determination and good support, students can overcome most obstacles.	بالإصرار والدعم الجيد، يمكن للطلاب التغلب على معظم العقبات.	2026-04-08 18:29:37.153092+00
1108	refer	يرجع إلى	B1	v.	Always refer back to specific data when writing your Task 1 response.	دائماً ارجع إلى بيانات محددة عند كتابة إجابة المهمة 1.	2026-04-08 18:29:37.157311+00
1174	significant	هام / كبير	B2	adj.	There has been a very significant and sustained rise in global temperatures.	حدثت زيادة كبيرة جداً ومستمرة في درجات الحرارة العالمية.	2026-04-08 18:29:37.157311+00
1207	context	سياق	B2	n.	Always read a new vocabulary word in its full context.	اقرأ دائماً كلمة مفردات جديدة في سياقها الكامل.	2026-04-08 18:29:37.160986+00
1238	integrate	يدمج	B2	v.	Schools should integrate digital technology into daily classroom activities.	يجب على المدارس أن تدمج التكنولوجيا الرقمية في الأنشطة الصفية اليومية.	2026-04-08 18:29:37.160986+00
1239	interpret	يفسّر	B2	v.	It is essential to interpret all data objectively and without personal bias.	من الضروري تفسير جميع البيانات بموضوعية وبدون تحيز شخصي.	2026-04-08 18:29:37.160986+00
1244	monitor	يراقب	B2	v.	Environmental authorities continuously monitor air quality in all major cities.	تراقب السلطات البيئية بشكل مستمر جودة الهواء في جميع المدن الرئيسية.	2026-04-08 18:29:37.160986+00
1275	critical	حاسم	B2	adj.	Critical analysis of sources is a core skill at university level.	التحليل الحرج للمصادر هو مهارة أساسية على مستوى الجامعة.	2026-04-08 18:29:37.160986+00
1305	comprehension	فهم	B2	n.	Reading comprehension improves with regular and varied practice.	يتحسن فهم المقروء بالممارسة المنتظمة والمتنوعة.	2026-04-08 18:29:37.164528+00
1342	isolate	يعزل	B2	v.	The study successfully isolated the primary cause of the health problem.	نجحت الدراسة في عزل السبب الرئيسي للمشكلة الصحية.	2026-04-08 18:29:37.164528+00
1397	principled	صاحب مبادئ	B2	adj.	A principled approach to research design prioritises validity over convenience.	النهج المبني على مبادئ في تصميم البحث يعطي الأولوية للصحة على الراحة.	2026-04-08 18:29:37.164528+00
1427	derive	يشتق	C1	v.	Many English words derive their meaning from Greek or Latin roots.	العديد من الكلمات الإنجليزية تشتق معانيها من جذور يونانية أو لاتينية.	2026-04-08 18:29:37.168744+00
1458	compile	يجمّع	C1	v.	The team compiled data from multiple sources before writing the report.	جمعت الفريق البيانات من مصادر متعددة قبل كتابة التقرير.	2026-04-08 18:29:37.168744+00
2988	versatility	تعدد الاستخدامات	B2	noun	His versatility as an actor is impressive.	تعدد مواهبه كممثل أمر مثير للإعجاب.	2026-04-08 18:29:37.226595+00
1152	timely	في الوقت المناسب / مناسب توقيتاً	B1	adj.	A timely and well-targeted intervention can prevent minor problems from escalating into major issues.	تدخل في الوقت المناسب وموجه بشكل جيد يمكن أن يمنع المشاكل البسيطة من التفاقم	2026-04-08 18:29:37.157311+00
1482	disparity	تفاوت	C1	n.	There is a deeply troubling and growing disparity between wealthy and poor communities worldwide.	هناك عدم مساواة عميق ومقلق وآخذ في الازدياد بين الأغنياء والفقراء.	2026-04-08 18:29:37.168744+00
1497	leverage	يستغل	C1	v.	Schools can strategically leverage digital technology to significantly improve student engagement and learning outcomes.	يمكن للمدارس أن تستفيد بشكل استراتيجي من التكنولوجيا الرقمية لتحسين الأداء بشكل كبير.	2026-04-08 18:29:37.168744+00
1522	simulate	يحاكي	C1	v.	Scientists use sophisticated models to accurately simulate the effects of climate change on global ecosystems.	يستخدم العلماء نماذج متطورة لمحاكاة تأثيرات التغير المناخي بدقة.	2026-04-08 18:29:37.172278+00
1603	glean	يستخلص، يستنبط	C1	v.	Important insights can often be gleaned from careful analysis of qualitative data and participant feedback.	يمكن غالباً استخلاص رؤى مهمة من التحليل الدقيق للبيانات النوعية.	2026-04-08 18:29:37.176313+00
1618	instigate	يُثير، يُحرِّض	C1	v.	New and compelling data instigated a complete and thorough review of the existing research methodologies.	البيانات الجديدة والمقنعة أثارت مراجعة شاملة وكاملة للسياسة السابقة.	2026-04-08 18:29:37.176313+00
1739	abdicate	يتخلى عن / يتنصل من	C1	v.	Leaders must not abdicate their responsibility to act on climate change.	يجب ألا يتخلى القادة عن مسؤوليتهم في التعامل مع تغير المناخ.	2026-04-08 18:29:37.180604+00
1757	homogenise	يوحّد / يجعل متجانساً	C1	v.	Globalisation tends to progressively homogenise diverse cultural practices.	العولمة تميل إلى توحيد الممارسات الثقافية المتنوعة بشكل تدريجي.	2026-04-08 18:29:37.180604+00
1817	altruistic	إيثاري / نكران للذات	C1	adj.	Genuinely altruistic motivations are rare in highly competitive environments.	الدوافع الإيثارية الحقيقية نادرة في البيئات شديدة التنافس.	2026-04-08 18:29:37.18419+00
1844	counterintuitive	مخالف للحدس	C1	adj.	The counterintuitive results led to a thorough re-examination of the model.	النتائج التي تتعارض مع الحدس أدت إلى إعادة فحص شامل للنموذج.	2026-04-08 18:29:37.18419+00
1988	valley	وادٍ	A2	n.	The small village was hidden in the green valley.	كانت القرية الصغيرة مخفية في الوادي الأخضر.	2026-04-08 18:29:37.188719+00
1994	apparently	على ما يبدو	B1	adv.	Apparently, the results were better than expected.	يبدو أن النتائج كانت أفضل مما كان متوقعاً.	2026-04-08 18:29:37.188719+00
2009	detail	تفصيلة	B1	n.	She paid close attention to every detail of the plan.	أولت اهتماماً كبيراً لكل تفصيل من تفاصيل الخطة.	2026-04-08 18:29:37.193174+00
2073	ancestor	جَدّ	B1	n.	She researched her ancestors and family history.	بحثت في أجدادها وتاريخ عائلتها.	2026-04-08 18:29:37.193174+00
2094	count	يَعُدّ	B1	v.	Every vote counts in a democratic election.	كل صوت يُحسب في انتخابات ديمقراطية.	2026-04-08 18:29:37.193174+00
2149	landscape	مشهد طبيعي	B1	n.	The landscape of the countryside is beautiful in spring.	منظر الريف جميل في الربيع.	2026-04-08 18:29:37.197152+00
2167	notable	بارز	B1	adj.	There was a notable improvement in the students' results.	كان هناك تحسّن جدير بالملاحظة في نتائج الطلاب.	2026-04-08 18:29:37.197152+00
2209	verify	يتحقق	B1	v.	Please verify your email address before logging in.	يرجى التحقق من عنوان بريدك الإلكتروني قبل تسجيل الدخول.	2026-04-08 18:29:37.200487+00
2254	badly	بشدة	B1	adv.	The project was badly managed from the beginning.	أُدير المشروع بشكل سيئ من البداية.	2026-04-08 18:29:37.200487+00
2290	utilize	يستفيد من	B1	v.	She utilized all available resources to complete her essay.	استخدمت جميع الموارد المتاحة لإتمام مقالتها.	2026-04-08 18:29:37.200487+00
2382	extrapolation	استقراء خارجي	B2	n.	Her extrapolation of the data was criticized by peers.	تعرّض استقراؤها للبيانات لانتقاد الأقران.	2026-04-08 18:29:37.204518+00
2421	symptom	عَرَض	B1	noun	A sore throat is a common symptom of a cold.	التهاب الحلق من الأعراض الشائعة للزكام.	2026-04-08 18:29:37.207876+00
2482	mentorship	توجيه مهني	B1	noun	Mentorship can help young professionals develop faster.	يمكن للإرشاد أن يساعد المهنيين الشباب على التطور بشكل أسرع.	2026-04-08 18:29:37.207876+00
2508	hardware	عتاد	B1	noun	The computer hardware was damaged by the power surge.	تضررت أجهزة الحاسوب بسبب ارتفاع الطاقة المفاجئ.	2026-04-08 18:29:37.211252+00
2546	side effect	أثر جانبي	B1	noun	Every medication can have side effects.	يمكن أن تكون لكل دواء آثار جانبية.	2026-04-08 18:29:37.211252+00
2581	justification	تبرير	B2	noun	There is no justification for treating people unfairly.	لا يوجد مسوّغ لمعاملة الناس بشكل غير عادل.	2026-04-08 18:29:37.211252+00
2624	groceries	بقالة	B2	noun	I need to buy groceries for the week.	أحتاج إلى شراء مشتريات للأسبوع.	2026-04-08 18:29:37.214834+00
2673	aerobics	الأيروبيكس	B1	noun	She does aerobics three times a week to stay fit.	تمارس تمارين الهوائية ثلاث مرات في الأسبوع للبقاء بصحة جيدة.	2026-04-08 18:29:37.214834+00
2720	overhead	تكاليف تشغيلية	B2	noun	Reducing overheads helped the business increase profits.	ساعد تقليص التكاليف العامة الشركة على زيادة أرباحها.	2026-04-08 18:29:37.218426+00
2762	quantum	كم	B2	adjective	Quantum physics deals with very small particles.	تتعامل الفيزياء الكمية مع الجسيمات الصغيرة جدًا.	2026-04-08 18:29:37.218426+00
2787	sedentary	مستقر	B2	adjective	A sedentary lifestyle increases the risk of heart disease.	أسلوب الحياة الخامل يزيد من خطر الإصابة بأمراض القلب.	2026-04-08 18:29:37.218426+00
2822	skepticism	تشكيك	B2	noun	There was widespread skepticism about the new findings.	كان هناك تشككية واسعة النطاق بشأن النتائج الجديدة.	2026-04-08 18:29:37.222692+00
2862	knit	يحوك	A2	verb	She knits scarves for her grandchildren in winter.	تحيك الأوشحة لأحفادها في الشتاء.	2026-04-08 18:29:37.222692+00
2870	napkin	منديل مائدة	A2	noun	She placed a napkin on her lap before eating.	وضعت مناديل ورقية على حجرها قبل الأكل.	2026-04-08 18:29:37.222692+00
2941	indulge	يستمتع بـ	B2	verb	She occasionally indulges in chocolate as a treat.	تُطيع هواها أحيانًا وتتناول الشوكولاتة كمكافأة.	2026-04-08 18:29:37.226595+00
2960	undertake	يضطلع بـ	B2	verb	She decided to undertake a postgraduate degree.	قررت الإقدام على درجة الدراسات العليا.	2026-04-08 18:29:37.226595+00
1884	inexorable	لا يرحم، لا يلين	C1	adj.	The inexorable and accelerating rise in average global temperatures demands urgent and coordinated international action.	الارتفاع المتسارع لا يقاوم في درجات الحرارة العالمية يتطلب عملاً حاسماً.	2026-04-08 18:29:37.18419+00
1905	perturb	يُزعج، يُقلق	C1	v.	The unexpected findings perturbed the existing theoretical consensus significantly.	النتائج غير المتوقعة أقلقت الإجماع النظري الموجود.	2026-04-08 18:29:37.188719+00
820	recommend	ينصح / يوصي	A2	v.	Health experts strongly recommend reducing red meat consumption for better health outcomes.	ينصح خبراء الصحة بشدة بتقليل استهلاك لحم البقر الأحمر.	2026-04-08 18:29:37.144805+00
821	record	يسجّل	A2	v.	Scientists carefully record daily temperature changes at thousands of stations around the world.	يسجل العلماء بعناية التغييرات اليومية في درجات الحرارة في آلاف المحطات.	2026-04-08 18:29:37.144805+00
822	transport	نقل	A2	n.	Efficient and affordable transport systems help greatly reduce urban air pollution.	أنظمة النقل الفعالة والميسورة تساعد كثيراً في تقليل تلوث الهواء الحضري.	2026-04-08 18:29:37.144805+00
1095	theory	نظرية	B1	n.	Darwin's groundbreaking theory of evolution transformed our understanding of biological diversity and human origins.	نظرية التطور الرائدة لداروين غيرت فهمنا للحياة بشكل جذري.	2026-04-08 18:29:37.153092+00
1097	transfer	ينقل	B1	v.	Advanced clean energy technology should be transferred to developing countries to accelerate their sustainable development.	يجب نقل تكنولوجيا الطاقة النظيفة المتقدمة إلى الدول النامية.	2026-04-08 18:29:37.153092+00
1140	feedback	تعليقات / آراء بناءة	B1	n.	Constructive feedback from peer reviewers consistently improves the quality of academic research and publications.	تعليقات الزملاء البناءة تحسن باستمرار جودة البحث المنشور	2026-04-08 18:29:37.157311+00
1144	literacy	محو الأمية / القدرة على القراءة والكتابة	B1	n.	Data literacy is now a core skill required in most professional and academic settings.	ثقافة البيانات أصبحت الآن مهارة أساسية في معظم المجالات المهنية والأكاديمية	2026-04-08 18:29:37.157311+00
1145	management	إدارة / تسيير	B1	n.	Effective project management ensures that research is completed on time and within the allocated budget.	الإدارة الفعالة للمشروع تضمن إكمال البحث في الوقت المحدد وفي حدود الميزانية	2026-04-08 18:29:37.157311+00
1324	comprehensive	شامل	B2	adj.	The report provides a comprehensive overview of the main environmental issues facing modern society.	يقدم التقرير نظرة عامة شاملة على المشاكل البيئية الرئيسية.	2026-04-08 18:29:37.164528+00
1328	deliberate	متعمد	B2	adj.	The government made a deliberate and sustained effort to reduce industrial pollution over the past decade.	قامت الحكومة ببذل جهد متعمد ومستمر للحد من الانبعاثات الصناعية.	2026-04-08 18:29:37.164528+00
1334	elaborate	يوضح	B2	v.	Please elaborate on your central argument with specific and relevant examples from the text.	يرجى توضيح حجتك الأساسية بأمثلة وأدلة محددة وملائمة.	2026-04-08 18:29:37.164528+00
1352	stimulate	يحفز	B2	v.	Investment in public infrastructure can powerfully stimulate long-term economic growth and development.	الاستثمار في البنية التحتية العامة يمكن أن يحفز النمو الاقتصادي طويل الأمد بقوة.	2026-04-08 18:29:37.164528+00
1360	consolidate	يوحّد، يدمج	B2	v.	Merging overlapping departments helped significantly consolidate scarce resources and improve operational efficiency.	ساعد دمج الأقسام المتداخلة على توحيد الموارد النادرة بشكل كبير.	2026-04-08 18:29:37.164528+00
1364	circulate	ينتشر	B2	v.	Misinformation can circulate with alarming rapidity through large online communities and social media platforms.	يمكن للمعلومات المضللة أن تنتشر بسرعة مذهلة عبر المنصات الإلكترونية الكبيرة.	2026-04-08 18:29:37.164528+00
1365	collapse	ينهار	B2	v.	Several fragile ecosystems are at risk of collapsing under continued human pressure and environmental degradation.	تواجه العديد من النظم البيئية الهشة خطر الانهيار تحت الضغط البشري المستمر.	2026-04-08 18:29:37.164528+00
1367	displace	يُهجّر	B2	v.	Large-scale development has permanently displaced many local farming communities from their ancestral lands.	أدى التطوير الصناعي واسع النطاق إلى تشريد العديد من السكان المحليين بشكل دائم.	2026-04-08 18:29:37.164528+00
1369	relentless	لا هوادة فيه / مستمر	B2	adj.	The relentless, unceasing, and rapidly accelerating growth of global urbanisation poses formidable, complex, and genuinely urgent long-term challenges for sustainable development.	النمو المتسارع والمستمر للتحضر يشكل تهديداً رئيسياً طويل الأجل.	2026-04-08 18:29:37.164528+00
1370	turbulent	مضطرب / غير مستقر	B2	adj.	The turbulent political environment made long-term strategic planning challenging for many organizations.	البيئة السياسية المضطربة وغير المستقرة جعلت التخطيط الاستراتيجي طويل الأجل صعباً	2026-04-08 18:29:37.164528+00
1380	quantitative	كمي	B2	adj.	Quantitative methods allow for precise statistical comparison and analysis of data across different populations.	تسمح الطرق الكمية بالمقارنة الإحصائية الدقيقة والتحليل الشامل.	2026-04-08 18:29:37.164528+00
1381	deduce	يستنتج	B2	v.	Researchers can deduce important patterns from the careful analysis of large datasets.	يمكن للباحثين استنتاج أنماط مهمة من التحليل الدقيق للبيانات الكبيرة	2026-04-08 18:29:37.164528+00
1382	formidable	هائل / شاق	B2	adj.	The challenge of genuinely reversing the effects of climate change is increasingly recognized as one of the most pressing global issues.	تحدي عكس آثار تغير المناخ بشكل حقيقي هائل وشاق.	2026-04-08 18:29:37.164528+00
1386	frugal	بسيط، اقتصادي	B2	adj.	A genuinely frugal approach to resource use is absolutely central to sustainable development and environmental preservation.	نهج بسيط حقا لاستخدام الموارد أساسي تماما للتنمية...	2026-04-08 18:29:37.164528+00
1389	conscientious	دقيق في عمله	B2	adj.	A conscientious researcher always checks data for errors before drawing any conclusions.	الباحث الضميري يتحقق دائماً من البيانات للأخطاء قبل استخلاص النتائج.	2026-04-08 18:29:37.164528+00
1390	controversial	مثير للجدل	B2	adj.	The publication of the controversial findings sparked an immediate global debate among experts and policymakers.	نشر النتائج المثيرة للجدل أثار رد فعل عالمي فوري.	2026-04-08 18:29:37.164528+00
1392	esteem	احترام	B2	n.	She was widely and consistently held in the highest professional esteem by all her colleagues and clients.	كانت تحظى باحترام مهني عالي جداً من قبل جميع زملائها المتخصصين.	2026-04-08 18:29:37.164528+00
1393	hamper	يُعرقل، يُعيق	B2	v.	Inadequate and inconsistent research funding can significantly and seriously hinder scientific progress and innovation.	تمويل البحث غير الكافي والمتسق يمكنه أن يعرقل بشكل كبير التقدم.	2026-04-08 18:29:37.164528+00
1394	illuminate	يوضح، ينير	B2	v.	This elegantly and precisely designed study effectively illuminates the complex relationship between environmental factors and cognitive development.	هذه الدراسة المصممة بأناقة وبدقة توضح بفعالية الآليات الأساسية.	2026-04-08 18:29:37.164528+00
1395	inhibit	يثبط، يعيق	B2	v.	Overly restrictive and bureaucratic ethical guidelines can sometimes inhibit innovative research and progress.	الإرشادات الأخلاقية المقيدة بشكل مفرط قد تثبط أحياناً البحث الضروري.	2026-04-08 18:29:37.164528+00
1396	premature	مبكر جداً	B2	adj.	Drawing conclusions from such a small sample would be premature and potentially misleading.	استخلاص النتائج من عينة صغيرة كهذه سيكون مبكراً جداً وغير موثوق.	2026-04-08 18:29:37.164528+00
1496	irreversible	لا يمكن عكسه	C1	adj.	Scientists repeatedly warn that some of the most serious environmental problems require immediate global action.	يحذر العلماء من أن بعض أخطر الأضرار البيئية لا يمكن عكسها.	2026-04-08 18:29:37.168744+00
1511	projection	توقع	C1	n.	Current demographic projections strongly suggest that major cities will continue to experience significant population growth in the coming decades.	التوقعات السكانية الحالية تشير بقوة إلى أن المدن ستنمو.	2026-04-08 18:29:37.172278+00
1513	qualitative	نوعي	C1	adj.	Qualitative research explores meaning, lived experience, and interpretation in depth.	تستخدم الدراسة كلاً من الأساليب الإحصائية الكمية والدراسات الحالة النوعية.	2026-04-08 18:29:37.172278+00
1519	rigorous	صارم	C1	adj.	A rigorous and entirely transparent research methodology greatly and significantly enhances the credibility of the study.	منهجية بحثية صارمة وشفافة تحسن بشكل كبير من جودة البحث الأكاديمي.	2026-04-08 18:29:37.172278+00
1520	robust	قوي	C1	adj.	The central argument of the essay is supported by genuinely robust and well-researched evidence.	تدعم الحجة الأساسية للمقالة أدلة قوية ومقنعة.	2026-04-08 18:29:37.172278+00
1525	stark	صارخ	C1	adj.	There is a stark, deeply troubling, and undeniable contrast between wealthy and impoverished communities worldwide.	هناك تباين صارخ ومثير للقلق بين الدول الغنية والفقيرة.	2026-04-08 18:29:37.172278+00
1543	ameliorate	يحسن	C1	v.	Sustained investment in public health can ameliorate the worst effects of widespread disease and socio-economic disparities.	يمكن للاستثمار المستدام في الصحة العامة أن يساعد في تحسين أسوأ آثار الفقر.	2026-04-08 18:29:37.172278+00
1544	anachronistic	متناقض مع العصر، خارج عن زمنه	C1	adj.	Critics argue that the current regulatory framework is fundamentally inadequate for addressing emerging challenges.	ينتقد النقاد الإطار التنظيمي الحالي باعتباره متزامناً مع الزمن وعفا عليه.	2026-04-08 18:29:37.172278+00
1547	antithetical	معاكس تماماً	C1	adj.	Excessive consumerism is directly antithetical to sustainable development and must be addressed through comprehensive policy measures.	الاستهلاك المفرط معاكس تماماً لمبادئ التنمية المستدامة.	2026-04-08 18:29:37.172278+00
1548	attrition	استنزاف، تآكل	C1	n.	Staff attrition rates remained problematically high throughout the entire fiscal year.	معدلات استنزاف الموظفين كانت عالية بشكل غير معتاد ومقلق طوال الفترة.	2026-04-08 18:29:37.172278+00
1549	augment	يزيد، يعزز	C1	v.	Research capacity can be significantly augmented through genuine international collaboration and resource sharing.	يمكن زيادة القدرة البحثية بشكل كبير من خلال التعاون الحقيقي.	2026-04-08 18:29:37.172278+00
1550	axiom	بديهية، حقيقة مسلمة	C1	n.	It is a widely accepted axiom in development economics that education drives economic growth and social progress.	إنها بديهية مقبولة على نطاق واسع في اقتصاديات التنمية بأن التعليم يدفع النمو.	2026-04-08 18:29:37.172278+00
1553	burgeon	ينمو بسرعة، يزدهر	C1	v.	The renewable energy sector is burgeoning rapidly in response to climate change concerns worldwide.	قطاع الطاقة المتجددة ينمو بسرعة استجابة مباشرة لتغير المناخ.	2026-04-08 18:29:37.172278+00
1554	circumvent	يتجاوز، يلتف حول	C1	v.	Some corporations attempt to circumvent environmental regulations through loopholes in the law.	تحاول بعض الشركات الالتفاف حول اللوائح البيئية من خلال طرق غير قانونية.	2026-04-08 18:29:37.172278+00
1555	cogent	مقنع، قوي الحجة	C1	adj.	The paper presents a cogent, well-evidenced, and thoroughly coherent argument on the subject matter.	تقدم الورقة المنشورة حجة مقنعة وموثقة بشكل جيد ومنطقية بشكل متسق.	2026-04-08 18:29:37.172278+00
1556	coherence	اتساق	C1	n.	Logical coherence is arguably the single most important feature of academic writing.	الاتساق المنطقي هو ربما أهم ميزة واحدة للكتابة الفعالة.	2026-04-08 18:29:37.172278+00
1557	collateral	إضافي، ثانوي	C1	adj.	Significant collateral damage to biodiversity was an unintended policy consequence.	كانت الأضرار الإضافية على التنوع البيولوجي عاقبة غير مقصودة.	2026-04-08 18:29:37.172278+00
1558	concomitant	مصاحب، متزامن	C1	adj.	Economic growth was accompanied by concomitant and deeply troubling rises in inequality and environmental degradation.	صحب النمو الاقتصادي زيادات متزامنة ومثيرة للقلق في البطالة.	2026-04-08 18:29:37.172278+00
1559	conducive	مشجع، ملائم	C1	adj.	A stable and transparent political environment is highly conducive to sustainable economic growth and social development.	بيئة سياسية مستقرة وشفافة مشجعة جداً للاستثمار الأجنبي.	2026-04-08 18:29:37.172278+00
1560	conjecture	تخمين، افتراض	C1	n.	Without robust empirical evidence, the claim must be regarded as mere speculation.	بدون أدلة تجريبية قوية، يجب اعتبار الادعاء مجرد تخمين.	2026-04-08 18:29:37.172278+00
1561	contentious	مثير للجدل، مختلف فيه	C1	adj.	The proposed redistribution of wealth remains a deeply contentious political issue in many countries.	إعادة توزيع الثروة المقترحة تبقى قضية مثيرة للجدل بشكل عميق.	2026-04-08 18:29:37.172278+00
1562	contingent	مشروط، يعتمد على	C1	adj.	The ultimate outcome is highly contingent upon several currently unpredictable factors.	النتيجة النهائية مشروطة جداً بعدة عوامل غير متنبأ بها حالياً.	2026-04-08 18:29:37.172278+00
1563	converge	يتقارب، يتجمع	C1	v.	Multiple independent lines of research are converging on a single compelling conclusion.	خطوط بحثية مستقلة متعددة تتقارب الآن على فهم واحد.	2026-04-08 18:29:37.172278+00
1564	corroborate	يؤيد، يؤكد	C1	v.	The new findings clearly corroborate the central hypothesis proposed a decade ago.	تؤيد النتائج الجديدة بوضوح الفرضية الأساسية التي تم اقتراحها في البداية.	2026-04-08 18:29:37.172278+00
1565	credulous	ساذج، مصدق بسهولة	C1	adj.	Credulous readers may readily accept misinformation without adequate critical evaluation or verification.	القراء الساذجون وغير الناقدون قد يقبلون المعلومات الخاطئة بسهولة.	2026-04-08 18:29:37.172278+00
1566	culminate	يبلغ ذروته، ينتهي بـ	C1	v.	Years of dedicated research finally culminated in a landmark scientific discovery that transformed our understanding of genetics.	سنوات من البحث المخصص والدقيق انتهت أخيراً إلى اكتشاف تاريخي.	2026-04-08 18:29:37.172278+00
1568	dearth	نقص، قلة	C1	n.	There is a notable dearth of rigorous longitudinal studies on this important subject matter.	هناك نقص ملحوظ ومقلق في الدراسات الطولية الصارمة على هذا الموضوع.	2026-04-08 18:29:37.172278+00
1569	delineate	يحدد، يوضح حدود	C1	v.	The paper carefully delineates the conceptual boundaries of the proposed framework.	توضح الورقة بعناية وبدقة حدود المفهوم الأساسي للدراسة.	2026-04-08 18:29:37.172278+00
1570	demographic	السكان، التركيبة السكانية	C1	n.	The rapidly ageing demographic presents major long-term challenges for public health and social care systems.	التركيبة السكانية المتقادمة بسرعة تشكل تحديات طويلة الأجل كبرى.	2026-04-08 18:29:37.172278+00
1571	derivative	مشتق، غير أصلي	C1	adj.	Critics argued that the research was largely derivative and lacked genuine originality or insight.	يجادل النقاد على نطاق واسع بأن البحث كان غير أصلي في الغالب.	2026-04-08 18:29:37.172278+00
1572	dichotomy	ثنائية، انقسام	C1	n.	There is a fundamentally false dichotomy between economic growth and environmental sustainability.	هناك انقسام أساسي خاطئ بين النمو الاقتصادي والحفاظ على البيئة.	2026-04-08 18:29:37.172278+00
1573	diffuse	تنتشر، تتسع	C1	v.	Information can diffuse with extraordinary rapidity through large-scale social networks and digital platforms.	تنتشر المعلومات بسرعة غير عادية عبر منصات وسائل التواصل الاجتماعي الضخمة.	2026-04-08 18:29:37.172278+00
1574	discrepancy	تناقض، عدم توافق	C1	n.	There is a significant and unexplained discrepancy between the two sets of data presented in the report.	هناك تناقض كبير وغير مشروح بين مجموعتي البيانات.	2026-04-08 18:29:37.172278+00
1575	disseminate	ينشر، يعمم	C1	v.	Peer-reviewed journals effectively disseminate important research findings to a broad academic and professional audience.	تنشر المجلات الأكاديمية المحكمة نتائج البحث المهمة لجمهور واسع.	2026-04-08 18:29:37.172278+00
1576	divergent	متباعد، مختلف	C1	adj.	Deeply divergent political opinions make achieving genuine international consensus particularly challenging.	الآراء السياسية المتباعدة بشدة تجعل تحقيق توافق دولي حقيقي صعباً.	2026-04-08 18:29:37.172278+00
1595	efficacy	الفعالية	C1	n.	The efficacy of the new treatment has been confirmed and replicated by multiple independent studies.	تم تأكيد فعالية العلاج المبتكر الجديد من خلال دراسات متعددة.	2026-04-08 18:29:37.172278+00
1596	endemic	متفشٍّ	C1	adj.	Corruption is unfortunately endemic in some poorly governed and institutionally weak countries.	الفساد متفشي للأسف في بعض الدول المحكومة بشكل سيء وغير المستقرة.	2026-04-08 18:29:37.172278+00
1597	extol	يمجد	C1	v.	The comprehensive report extols the numerous virtues of a predominantly sustainable and eco-friendly approach.	يمجد التقرير الشامل العديد من فضائل النظام الاقتصادي السائد.	2026-04-08 18:29:37.172278+00
1598	facile	سطحي	C1	adj.	A facile response to a genuinely complex problem often creates further and unintended complications.	غالباً ما ينتج الرد السطحي على مشكلة معقدة حقاً عن مزيد من المشاكل.	2026-04-08 18:29:37.172278+00
1599	fervour	الحماس	C1	n.	The dedicated research team approached the entire ambitious project with meticulous planning and unwavering commitment.	اقترب الباحثون المكرسون من المشروع برمته بحماس ملحوظ.	2026-04-08 18:29:37.172278+00
1600	flagrant	صارخ	C1	adj.	The company's flagrant disregard for established safety regulations was widely condemned by industry experts and regulatory authorities.	كان تجاهل الشركة الصارخ لقواعد السلامة موضوع انتقاد واسع النطاق.	2026-04-08 18:29:37.172278+00
1601	flux	تذبذب، حالة عدم استقرار	C1	n.	The global economy is currently in a sustained state of considerable and unprecedented uncertainty.	الاقتصاد العالمي يمر حالياً بحالة من التذبذب الكبير وغير المتوقع.	2026-04-08 18:29:37.176313+00
1602	germane	ذو صلة مباشرة، وثيق الصلة	C1	adj.	Only the most directly germane evidence should be carefully presented in an academic essay or research paper.	يجب تقديم الأدلة الأكثر ارتباطاً مباشرة فقط في أي بحث أكاديمي.	2026-04-08 18:29:37.176313+00
1605	harbinger	مؤشر، بادرة	C1	n.	A significant drop in bee populations is a deeply troubling harbinger of ecological collapse and widespread agricultural failure.	الانخفاض الكبير في أعداد النحل يعتبر مؤشراً مقلقاً على الانهيار البيئي.	2026-04-08 18:29:37.176313+00
1608	impeccable	لا تشوبه شائبة، خالي من العيوب	C1	adj.	Her entire academic record throughout her undergraduate career was exceptional and earned her numerous scholarships.	سجلها الأكاديمي بأكمله طوال فترة دراستها الجامعية كان لا تشوبه شائبة.	2026-04-08 18:29:37.176313+00
1610	inadvertent	غير مقصود، عرضي	C1	adj.	The inadvertent release of sensitive data raised serious and immediate ethical concerns within the organization.	الكشف غير المقصود عن بيانات بحثية حساسة أثار مخاوف جدية.	2026-04-08 18:29:37.176313+00
1619	lucrative	مربح، ذو عائد مالي كبير	C1	adj.	The renewable energy sector is rapidly becoming increasingly lucrative for investors and governments worldwide.	قطاع الطاقة المتجددة أصبح سريعاً مربحاً بشكل متزايد للمستثمرين.	2026-04-08 18:29:37.176313+00
1620	malleable	قابل للتشكل، مرن	C1	adj.	Public opinion is surprisingly malleable and can be effectively shaped by media coverage and political messaging.	الرأي العام قابل للتشكل بشكل مفاجئ ويمكن تشكيله بفعالية من قبل وسائل الإعلام.	2026-04-08 18:29:37.176313+00
1621	mendacious	كاذب، مخادع	C1	adj.	Mendacious reporting of scientific data has serious and far-reaching consequences for the entire research community.	الإبلاغ الكاذب عن البيانات العلمية له عواقب خطيرة وبعيدة المدى.	2026-04-08 18:29:37.176313+00
1622	meritocratic	قائم على الكفاءة، تنافسي عادل	C1	adj.	A truly meritocratic education system should always reward genuine talent and hard work regardless of socioeconomic background.	نظام تعليمي قائم حقاً على الكفاءة يجب أن يكافئ المواهب الحقيقية والجهد.	2026-04-08 18:29:37.176313+00
1623	mundane	عادي، روتيني	C1	adj.	Even seemingly mundane and unremarkable data can reveal highly significant patterns when analyzed systematically.	حتى البيانات التي تبدو عادية يمكن أن تكشف عن اتجاهات مهمة جداً عند تحليلها.	2026-04-08 18:29:37.176313+00
1624	nebulous	غامض، غير واضح	C1	adj.	The stated policy goals were far too nebulous and vague to be meaningfully implemented or evaluated.	أهداف السياسة المعلنة كانت غامضة جداً بحيث لا يمكن قياسها بشكل معنوي.	2026-04-08 18:29:37.176313+00
1625	negate	يُلغي، يَنفي	C1	v.	The compelling new evidence entirely negated the previously widely accepted theory.	الأدلة الجديدة والمقنعة ألغت تماماً الفرضية المقبولة على نطاق واسع سابقاً.	2026-04-08 18:29:37.176313+00
1626	nefarious	شرير، فاسق	C1	adj.	The nefarious and illegal activities of some corporations have caused truly devastating environmental and social consequences.	الأنشطة الشريرة والغير قانونية لبعض الشركات تسببت في أضرار واسعة.	2026-04-08 18:29:37.176313+00
1627	obdurate	عنيد، مستعصٍ على الإقناع	C1	adj.	Obdurate institutional resistance to necessary change consistently and predictably impedes progress.	المقاومة العنيدة للتغيير الضروري داخل المؤسسات يبطئ التقدم.	2026-04-08 18:29:37.176313+00
1628	obsequious	خاضع، متملق	C1	adj.	Obsequious agreement with authority is entirely distinct from genuine and principled engagement with ideas.	الموافقة المتملقة على السلطة ليست الشيء ذاته كالتفكير الفكري الحقيقي.	2026-04-08 18:29:37.176313+00
1629	opaque	معتم، غير شفاف	C1	adj.	The deliberately opaque nature of government decision-making processes often undermines public trust and democratic accountability.	الطبيعة المعتمة لعمليات اتخاذ القرار الحكومية تضر بشكل أساسي بالديمقراطية.	2026-04-08 18:29:37.176313+00
1638	poignant	مؤثر / حزين	C1	adj.	The powerful documentary offered a deeply poignant and moving account of the refugees' harrowing journey across the border.	قدم الفيلم الوثائقي سردًا عميق التأثير للتغييرات التي لا يمكن عكسها.	2026-04-08 18:29:37.176313+00
1639	ponderous	ثقيل / معقد	C1	adj.	A ponderous and unnecessarily dense writing style can completely and fatally undermine the effectiveness of academic communication.	أسلوب الكتابة الثقيل والكثيف جدًا يمكن أن يخفي المعنى تماماً.	2026-04-08 18:29:37.176313+00
1640	precarious	غير آمن / حرج	C1	adj.	The ecological balance of our planet is now in an increasingly precarious and vulnerable state.	التوازن البيئي للكوكب في وضع متزايد الخطورة والهشاشة.	2026-04-08 18:29:37.176313+00
1641	preclude	يَمنع، يَحول دون	C1	v.	High and prohibitive costs should not preclude anyone from accessing quality education and healthcare services.	التكاليف العالية والممنوعة لا يجب أن تحول دون الوصول إلى التعليم الجيد.	2026-04-08 18:29:37.176313+00
1642	prescient	صاحب بصيرة / نبوي	C1	adj.	The early and repeated warnings of leading climate scientists have proved to be accurate and prescient.	تحذيرات علماء المناخ المبكرة والمتكررة أثبتت أنها بارعة بشكل ملحوظ.	2026-04-08 18:29:37.176313+00
1644	prolific	منتج / غزير الإنتاج	C1	adj.	She was an exceptionally prolific and highly influential researcher who contributed significantly to the advancement of her field.	كانت باحثة منتجة استثنائياً نشرت أكثر من مائتي...	2026-04-08 18:29:37.176313+00
1645	propagate	نشر / ينشر	C1	v.	It is deeply irresponsible and harmful to propagate deliberate misinformation in public discourse.	من المسؤول جداً أن ننشر المعلومات المضللة المتعمدة في الساحة العامة.	2026-04-08 18:29:37.176313+00
1646	proscribe	يحظر / يمنع	C1	v.	The use of deceptive or manipulative research methods is firmly proscribed by established ethical guidelines and professional standards.	استخدام أساليب البحث الخادعة أو المتلاعبة محظور بموجب...	2026-04-08 18:29:37.176313+00
1647	quintessential	أساسي / نموذجي	C1	adj.	This landmark paper is widely regarded as the quintessential example of truly groundbreaking research in the field.	هذه الورقة البحثية الأساسية هي المثال النموذجي للبحث متعدد التخصصات الحقيقي.	2026-04-08 18:29:37.176313+00
1648	recalcitrant	عنيد / متمرد	C1	adj.	Recalcitrant institutions and organisations are often the single greatest obstacle to meaningful social progress.	المؤسسات العنيدة غالباً ما تكون أكبر عائق منفرد للتغيير الحقيقي.	2026-04-08 18:29:37.176313+00
1649	rectify	يُصلِح، يُصحِّح	C1	v.	Urgent and decisive steps must be taken immediately to rectify the serious issues affecting the community.	يجب اتخاذ خطوات عاجلة لإصلاح الضرر الجسيم الذي سببته...	2026-04-08 18:29:37.176313+00
1650	redress	يُعالج، يُصحِّح	C1	v.	New and comprehensive legislation aims to redress longstanding and deeply entrenched social inequalities.	تهدف التشريعات الجديدة والشاملة إلى معالجة الظلم التاريخي القديم.	2026-04-08 18:29:37.176313+00
1651	remonstrate	يَحتج، يَعترض	C1	v.	Environmental activists publicly and passionately remonstrated with senior government officials during the conference.	احتج الناشطون البيئيون علناً مع كبار المسؤولين الحكوميين.	2026-04-08 18:29:37.176313+00
1654	resolute	حازم / قاطع	C1	adj.	A resolute and unwavering commitment to evidence-based policy is essential for achieving sustainable development goals.	الالتزام الحازم والراسخ بالسياسة القائمة على الأدلة ضروري.	2026-04-08 18:29:37.176313+00
1655	reticent	صامت / متحفظ	C1	adj.	Some key governments remain frustratingly reticent about committing to fully implement the proposed reforms.	تبقى بعض الحكومات صامتة بشكل محبط حول الالتزام بالاتفاقيات الملزمة.	2026-04-08 18:29:37.176313+00
1656	reverence	احترام / تقديس	C1	n.	The extraordinary findings were received with genuine reverence and widespread acclaim.	تلقيت الاكتشافات الرائدة باحترام حقيقي من قبل...	2026-04-08 18:29:37.176313+00
1657	rudimentary	أساسي / بدائي	C1	adj.	A rudimentary understanding of basic statistics is essential for correctly interpreting research data.	الفهم الأساسي للإحصائيات البسيطة ضروري لتفسير البيانات بشكل صحيح.	2026-04-08 18:29:37.176313+00
1658	sacrosanct	مقدس / لا يمس	C1	adj.	The fundamental and widely accepted principle of academic freedom should be upheld to foster innovation and critical thinking.	يجب معاملة المبدأ الأساسي لحرية البحث العلمي كمقدس.	2026-04-08 18:29:37.176313+00
1660	scrupulous	دقيق / مدقق	C1	adj.	A truly scrupulous researcher documents all data fully and transparently, even when the results are unexpected or unfavorable.	الباحث الدقيق يوثق جميع البيانات بشفافية، حتى عندما...	2026-04-08 18:29:37.176313+00
1661	singular	فريد / نادر	C1	adj.	The remarkable discovery was of truly singular and far-reaching importance to the advancement of scientific knowledge.	كان الاكتشاف ذو أهمية فريدة بعيدة المدى لجميع...	2026-04-08 18:29:37.176313+00
1662	sobering	مُقلِق، يدعو إلى التأمل الجاد	C1	adj.	The very latest climate projections provide a deeply sobering and urgent call for immediate global action.	إن أحدث التوقعات المناخية توفر تذكيراً مقلقاً بعمق بـ...	2026-04-08 18:29:37.176313+00
1663	solicit	يَطلب، يَستجدي	C1	v.	Researchers carefully and systematically solicited feedback from a broad and diverse range of participants.	طلب الباحثون بعناية الملاحظات من مجموعة واسعة وحقيقية من...	2026-04-08 18:29:37.176313+00
1664	speculative	تخميني / نظري	C1	adj.	Without adequate empirical support, the central and controversial argument remains unsubstantiated.	بدون دعم تجريبي كافٍ، يجب اعتبار الحجة المركزية تخمينية.	2026-04-08 18:29:37.176313+00
1665	steadfast	ثابت / راسخ	C1	adj.	A steadfast and unwavering commitment to evidence is the defining mark of a credible researcher.	الالتزام الثابت بالأدلة هو السمة المميزة للباحث الموثوق.	2026-04-08 18:29:37.176313+00
1666	stigmatise	يوصم / يلصق العار	C1	v.	It is both harmful and profoundly unjust to stigmatise entire communities based on the actions of a few individuals.	من الضار والظالم أن نوصم المجتمعات بناءً على معتقداتها.	2026-04-08 18:29:37.176313+00
1668	strident	حاد / صارخ	C1	adj.	Strident and uncompromising opposition to necessary reform often delays progress and undermines effective governance.	المعارضة الحادة للإصلاح الضروري غالباً ما تؤخر التغييرات المهمة.	2026-04-08 18:29:37.176313+00
1669	substantive	جوهري / مادي	C1	adj.	The comprehensive and thorough review produced substantive and insightful conclusions.	أسفرت المراجعة الشاملة عن توصيات جوهرية وقابلة للتطبيق فوراً.	2026-04-08 18:29:37.176313+00
1670	succumb	يستسلم / يخضع	C1	v.	Some vulnerable species will inevitably succumb to the cumulative and irreversible effects of habitat destruction.	ستستسلم بعض الأنواع حتماً لتأثيرات التسارع المتراكمة	2026-04-08 18:29:37.176313+00
1671	supplant	يحل محل / يستبدل	C1	v.	Digital media is rapidly and comprehensively supplanting traditional print as the primary source of information.	وسائل الإعلام الرقمية تستبدل بسرعة وشمولية وسائل الطباعة التقليدية	2026-04-08 18:29:37.176313+00
1672	symbiotic	تكافلي / متبادل النفع	C1	adj.	There is a mutually beneficial and deeply symbiotic relationship between humans and their natural environment.	توجد علاقة متبادلة النفع وتكافلية بين العلم والتطبيق	2026-04-08 18:29:37.176313+00
1673	temerity	تهوُّر، جرأة متهورة	C1	n.	It requires considerable intellectual temerity to openly and publicly challenge established scientific theories.	يتطلب الأمر جرأة فكرية كبيرة لتحدي المعتقدات العميقة علناً	2026-04-08 18:29:37.176313+00
1674	temperate	معتدل / متوازن	C1	adj.	A temperate and carefully measured tone is invariably and significantly more effective in persuasive communication.	النبرة المعتدلة والمقاسة بعناية دائماً أكثر إقناعاً من النبرة الحادة	2026-04-08 18:29:37.176313+00
1675	tenacious	مثابر / عنيد	C1	adj.	The most tenacious and determined researchers continue to pursue their goals despite numerous challenges.	الباحثون الأكثر مثابرة يستمرون في متابعة فرضياتهم حتى عندما يواجهون معارضة	2026-04-08 18:29:37.176313+00
1676	tepid	فاتر / ضعيف الحماس	C1	adj.	The international political response to the escalating crisis was widely and critically analyzed by experts.	كان الرد السياسي الدولي على الأزمة فاتراً وبحق يستحق الانتقاد	2026-04-08 18:29:37.176313+00
1677	timorous	خجول / متردد	C1	adj.	A timorous and overly cautious approach to essential policy reform produces minimal progress and persistent inefficiencies.	النهج المتردد والحذر بشكل مفرط تجاه إصلاح السياسة ينتج عنه فقط نتائج محدودة	2026-04-08 18:29:37.176313+00
1678	transient	عابر / مؤقت	C1	adj.	The apparent and initially encouraging economic recovery ultimately proved to be unsustainable.	تبين أن التعافي الاقتصادي الظاهري مؤقتاً بشكل مفاجئ وسرعان ما تراجع	2026-04-08 18:29:37.176313+00
1679	trite	مبتذل / سطحي	C1	adj.	Trite and entirely predictable conclusions significantly and unnecessarily diminish the impact of the argument.	الاستنتاجات المبتذلة والمتوقعة تقلل بشكل كبير من التأثير العام للدراسة	2026-04-08 18:29:37.176313+00
1680	untenable	غير قابل للدفاع / لا يمكن الاستمرار به	C1	adj.	Under sustained and rigorous critical scrutiny, the government's original policies were found to require significant revision.	تحت التدقيق المستمر، أصبح الموقف الأصلي للحكومة سياسياً لا يمكن الاستمرار به	2026-04-08 18:29:37.176313+00
1681	venerate	يجل / يحترم	C1	v.	Most intellectually open societies tend to venerate genuinely original thinkers for their contributions to knowledge and progress.	معظم المجتمعات تحترم المفكرين الأصليين الذين يطعنون في الأفكار التقليدية	2026-04-08 18:29:37.176313+00
1682	verbose	مسهب / طويل الكلام	C1	adj.	Unnecessarily verbose and repetitive writing consistently and fatally obscures the clarity of the main argument.	الكتابة المسهبة والطويلة بلا ضرورة غالباً ما تخفي بدلاً من توضيح الفكرة الأساسية	2026-04-08 18:29:37.176313+00
1683	veracious	صادق / أمين	C1	adj.	A fully veracious and wholly honest account of the data is the absolute and essential foundation for credible research.	الحساب الصادق والأمين للبيانات هو الأساس المطلق للعمل البحثي الجيد	2026-04-08 18:29:37.176313+00
1684	vindicate	يبرر / ينصف	C1	v.	Subsequent and widely observed events fully and comprehensively vindicated the initial hypothesis proposed by the researchers.	الأحداث اللاحقة برّرت بشكل كامل وشامل النتيجة الأصلية	2026-04-08 18:29:37.176313+00
1685	visceral	غريزي / عاطفي عميق	C1	adj.	The powerful and unflinching documentary provoked a deeply visceral and emotional response from viewers.	أثار الفيلم الوثائقي القوي رد فعل غريزياً وعاطفياً عميقاً لدى المشاهدين	2026-04-08 18:29:37.176313+00
1686	vitriolic	حاد / ساخر لاذع	C1	adj.	Vitriolic and unnecessarily personalised public debate rarely leads to constructive outcomes or mutual understanding.	النقاش العام الحاد والشخصاني نادراً ما يؤدي إلى نتائج بناءة أو دائمة	2026-04-08 18:29:37.176313+00
1687	voluminous	ضخم / وافر	C1	adj.	The voluminous and constantly growing body of evidence in favour of climate change mitigation is increasingly compelling.	الأدلة الضخمة والمتزايدة باستمرار لصالح اتخاذ إجراء مناخي فوري قوية جداً	2026-04-08 18:29:37.176313+00
1688	wane	يتلاشى / يقل	C1	v.	Public interest in the critical issue began to wane once the initial and intense media coverage subsided.	بدأ الاهتمام العام بهذه القضية الحرجة يتلاشى بعد الاهتمام الإعلامي الأولي	2026-04-08 18:29:37.176313+00
1689	warranted	مبرر / له ما يبرره	C1	adj.	The high degree of widespread public alarm about continuously rising pollution demands immediate governmental intervention.	درجة القلق العام حول تلوث الهواء المتزايد مبررة تماماً وحتمية	2026-04-08 18:29:37.176313+00
1690	withstand	يصمد / يقاوم	C1	v.	Strong, well-designed, and genuinely resilient democratic institutions must be established to ensure sustainable governance and social stability.	المؤسسات الديمقراطية القوية والمرنة يجب أن تكون قادرة على مقاومة التهديدات	2026-04-08 18:29:37.176313+00
1691	zealotry	تعصب / غلو	C1	n.	Zealotry, even in the service of an entirely worthy cause, can ultimately and inadvertently lead to negative consequences.	التعصب، حتى في خدمة قضية نبيلة، يمكن أن يقوض المصداقية في النهاية	2026-04-08 18:29:37.176313+00
1696	embody	يجسد	C1	v.	A truly democratic constitution should embody the most fundamental values of justice, equality, and freedom.	يجب أن تجسد الدستور الديمقراطي أهم قيم المجتمع.	2026-04-08 18:29:37.176313+00
1697	encapsulate	يلخص	C1	v.	A strong conclusion should effectively encapsulate the central argument of the essay.	يجب أن تلخص الخاتمة القوية الحجة الرئيسية للبحث بفعالية.	2026-04-08 18:29:37.176313+00
1703	extrapolate	يستقرئ، يستنتج	C1	v.	Researchers carefully and systematically extrapolated future long-term trends to inform policy decisions.	قام الباحثون بحذر باستقراء الاتجاهات المستقبلية من عقود من البيانات التاريخية.	2026-04-08 18:29:37.180604+00
1707	governance	الحوكمة، الإدارة الرشيدة	C1	n.	Effective and genuinely transparent governance is absolutely essential for maintaining public trust and democratic institutions.	الحوكمة الفعالة ضرورية تماماً لتحقيق التنمية المستدامة.	2026-04-08 18:29:37.180604+00
1708	holistic	شامل، متكامل	C1	adj.	A genuinely holistic approach considers physical, mental, and broader social dimensions of human wellbeing.	النهج الشامل للصحة يأخذ في الاعتبار الجوانب البدنية والعقلية والاجتماعية.	2026-04-08 18:29:37.180604+00
1709	ideology	الأيديولوجية	C1	n.	Government policy is inevitably and inescapably shaped by both ideological and practical considerations.	تتأثر السياسة الحكومية حتماً بالأيديولوجية والأدلة التجريبية.	2026-04-08 18:29:37.180604+00
1712	juxtapose	يضع جنباً إلى جنب / يقارن بين	C1	v.	The essay effectively and illuminatingly juxtaposes two opposing theoretical frameworks to highlight their fundamental differences.	تقارن المقالة بشكل فعال بين وجهات نظر نظرية معارضة.	2026-04-08 18:29:37.180604+00
1716	marginalise	يهمش / يقلل من أهمية	C1	v.	Economic policies that consistently marginalise the poorest communities are detrimental to overall societal development and stability.	السياسات الاقتصادية التي تهمش الفقراء هي في النهاية مدمرة.	2026-04-08 18:29:37.180604+00
1718	mitigate	يخفف / يقلل من	C1	v.	Strategic and ambitious tree-planting programmes can help significantly reduce carbon emissions and combat climate change.	يمكن لبرامج زراعة الأشجار أن تساعد بشكل كبير في تخفيف آثار تغير المناخ.	2026-04-08 18:29:37.180604+00
1719	multifaceted	متعدد الجوانب	C1	adj.	Climate change is an extraordinarily multifaceted and complex problem that requires urgent global cooperation and action.	تغير المناخ مشكلة غير عادية متعددة الجوانب تتطلب عدة حلول.	2026-04-08 18:29:37.180604+00
1720	nascent	وليد / ناشئ	C1	adj.	The nascent renewable energy industry still requires substantial and sustained government investment and policy support.	صناعة الطاقة المتجددة الناشئة لا تزال تتطلب دعماً حكومياً كبيراً.	2026-04-08 18:29:37.180604+00
1724	omnipresent	موجود في كل مكان / منتشر في كل مكان	C1	adj.	Digital technology has now become genuinely omnipresent in virtually every aspect of modern life.	أصبحت التكنولوجيا الرقمية موجودة بحقيقة في كل جوانب الحياة.	2026-04-08 18:29:37.180604+00
1728	pedagogy	علم التربية / الطرق التعليمية	C1	n.	Genuinely effective pedagogy is always carefully and thoughtfully adapted to the specific needs and contexts of learners.	الطرق التعليمية الفعالة تتكيف دائماً مع الاحتياجات المتنوعة للطلاب.	2026-04-08 18:29:37.180604+00
1733	polarisation	استقطاب / انقسام	C1	n.	Growing and deepening political polarisation makes effective international cooperation increasingly difficult to achieve.	يجعل الاستقطاب السياسي المتزايد التعاون الدولي الفعال أكثر صعوبة.	2026-04-08 18:29:37.180604+00
1735	postulate	يفترض / يضع افتراضاً	C1	v.	Classical economists traditionally postulate that fully free markets naturally tend toward equilibrium.	يفترض الاقتصاديون الكلاسيكيون أن الأسواق الحرة تميل بشكل طبيعي نحو التوازن.	2026-04-08 18:29:37.180604+00
1736	pragmatic	عملي / واقعي	C1	adj.	A genuinely pragmatic solution always carefully balances idealism with practical implementation and real-world constraints.	يحقق الحل العملي توازناً حذراً بين المثالية والجوانب العملية الواقعية.	2026-04-08 18:29:37.180604+00
1738	relegate	يُهمل / يُهمِّش	C1	v.	Environmental concerns have been consistently and irresponsibly relegated to the background in policy discussions.	تم تهميش الاهتمامات البيئية باستمرار على هامش النقاش.	2026-04-08 18:29:37.180604+00
1742	acrimonious	حاد/مرير	C1	adj.	The policy debate became deeply acrimonious as neither side was willing to compromise on key issues.	أصبح النقاش حول السياسة حاداً عندما رفضت كلا الجانبين التنازل	2026-04-08 18:29:37.180604+00
1747	empiricism	التجريبية	C1	n.	Empiricism holds that all genuine knowledge must ultimately be grounded in sensory experience and observation.	تؤكد التجريبية أن جميع المعرفة الحقيقية يجب أن تكون مستندة إلى الملاحظة	2026-04-08 18:29:37.180604+00
1750	exonerate	يُبرِّئ / يُعفي	C1	v.	Newly discovered forensic evidence completely exonerated the researcher of all allegations.	برّأت الأدلة المكتشفة حديثاً الباحث تماماً من أي اتهام.	2026-04-08 18:29:37.180604+00
1751	expedite	عجّل / أسرّع	C1	v.	Digital tools can greatly expedite the often time-consuming process of primary data collection and analysis.	يمكن للأدوات الرقمية أن تسرّع بشكل كبير من العملية المستهلكة للوقت في معالجة البيانات.	2026-04-08 18:29:37.180604+00
1753	fragmented	مجزأ / منقسم	C1	adj.	A highly fragmented policy framework significantly reduces the overall effectiveness of governmental initiatives.	إطار السياسة المجزأ بشكل كبير يقلل بشكل كبير من الفعالية الكلية.	2026-04-08 18:29:37.180604+00
1758	hyperbole	مبالغة / تهويل	C1	n.	Political speeches frequently and cynically rely on deliberate hyperbole to manipulate public opinion and emotions.	تعتمد الخطابات السياسية كثيراً على المبالغة المتعمدة لإثارة مشاعر قوية.	2026-04-08 18:29:37.180604+00
1759	iconoclast	هادم للأيقونات / منتقد جريء	C1	n.	The iconoclastic researcher bravely challenged many of the most firmly entrenched beliefs in the scientific community.	طعّن الباحث المنتقد الجريء في العديد من الافتراضات النظرية المقبولة بثبات.	2026-04-08 18:29:37.180604+00
1760	imperialism	الإمبريالية / السيطرة الاقتصادية	C1	n.	Economic imperialism can severely undermine the political and economic sovereignty of developing nations.	الإمبريالية الاقتصادية يمكن أن تقوض سيادة الدول النامية الأضعف.	2026-04-08 18:29:37.180604+00
1763	incisive	حاد / نافذ	C1	adj.	The journal article offers a remarkably incisive and penetrating critique of contemporary economic policy and its societal implications.	المقال يقدم نقداً حاداً وملحوظاً لنظام التعليم الحالي.	2026-04-08 18:29:37.180604+00
1767	normative	معياري / متعلق بالقيم	C1	adj.	The report makes explicit normative claims about what governments have a responsibility to implement.	يقدم التقرير ادعاءات معيارية واضحة حول ما يجب على الحكومات فعله.	2026-04-08 18:29:37.180604+00
1768	obfuscate	أغمّى / أخفى	C1	v.	Unnecessarily dense and specialised jargon can obfuscate rather than helpfully illuminate the subject matter.	المصطلحات الغامضة بلا ضرورة يمكن أن تخفي بدلاً من توضيح موضوع معقد.	2026-04-08 18:29:37.180604+00
1769	ontological	أنطولوجي / متعلق بطبيعة الوجود	C1	adj.	The research raises fundamental and profound ontological questions about the nature of human consciousness and existence.	يثير البحث أسئلة أساسية حول طبيعة الواقع والوجود.	2026-04-08 18:29:37.180604+00
1770	ostensibly	على ما يبدو / ظاهرياً	C1	adv.	The controversial policy was ostensibly introduced to protect important environmental resources from further degradation.	تم تقديم السياسة المثيرة للجدل على ما يبدو لحماية حقوق المستهلك.	2026-04-08 18:29:37.180604+00
1773	reify	يجسد، يحول إلى واقع ملموس	C1	v.	Academic language can subtly reify social distinctions and make fundamentally unequal power relations appear natural.	اللغة يمكنها أن تجسد التمييزات الاجتماعية بطريقة خفية وتجعل الفئات التعسفية تبدو حقيقية.	2026-04-08 18:29:37.180604+00
1774	scrutinise	يفحص، يدقق في	C1	v.	The independent committee agreed to carefully scrutinise all new evidence before making a final decision.	وافقت اللجنة على فحص جميع الأدلة الجديدة قبل تعديل موقفها.	2026-04-08 18:29:37.180604+00
1775	abrogate	ينسخ، يلغي	C1	v.	The government moved to abrogate the outdated and ineffective environmental regulations to promote sustainable development.	تحركت الحكومة بسرعة لإلغاء القوانين القديمة والغير فعالة تماماً.	2026-04-08 18:29:37.180604+00
1777	affinity	تقارب، ألفة	C1	n.	There is a clear affinity between linguistic ability and academic writing skills in higher education.	هناك تقارب واضح بين القدرة اللغوية والنجاح الأكاديمي.	2026-04-08 18:29:37.180604+00
1778	allay	يخفف / يهدئ	C1	v.	Stronger and clearer communication from authorities helped allay public fears effectively.	التواصل الأوضح والأكثر شفافية من السلطات يخفف بشكل كبير...	2026-04-08 18:29:37.180604+00
1779	approbation	استحسان، موافقة	C1	n.	The groundbreaking study received widespread approbation from the academic community.	تلقت الدراسة الرائدة استحسانًا واسع النطاق وحارًا من...	2026-04-08 18:29:37.180604+00
1780	arcane	غامض، سري	C1	adj.	The highly arcane nature of the research limited its accessibility to specialists in the field.	الطبيعة الغامضة والمتخصصة جدًا للبحث حدت بشكل كبير من...	2026-04-08 18:29:37.180604+00
1783	byzantine	معقد، متشابك	C1	adj.	The byzantine complexity of the regulatory framework frustrated even the most experienced legal professionals.	الإطار التنظيمي المعقد والمتشابك بلا داع يؤثر بشكل مستمر...	2026-04-08 18:29:37.180604+00
1784	cacophony	جلبة، ضوضاء	C1	n.	The competing voices in the policy debate created a cacophony of conflicting opinions and perspectives.	الأصوات المتنافسة والمتناقضة تماما في النقاش السياسي الجاري...	2026-04-08 18:29:37.180604+00
1785	capitulate	يستسلم / يذعن	C1	v.	Under sustained pressure from the public, the government eventually implemented new policies to address the concerns.	تحت ضغط مكثف وممتد من الجمهور والإعلام، استسلمت الحكومة...	2026-04-08 18:29:37.180604+00
1786	caustic	لاذع / قارص	C1	adj.	The caustic editorial drew considerable attention to the government's handling of the recent economic crisis.	افتتاحية حادة ولاذعة استقطبت اعتراضات كبيرة وتماما...	2026-04-08 18:29:37.180604+00
1788	coalesce	يتوحد / يندمج	C1	v.	Multiple research streams are beginning to coalesce into a single unified framework for understanding complex phenomena.	تيارات البحث المنفصلة والمختلفة سابقًا تجتمع الآن...	2026-04-08 18:29:37.180604+00
1789	compunction	الندم، الاستياء	C1	n.	The corporation showed no compunction in prioritising profit over environmental sustainability.	لم تبدِ الشركة أي ندم أو استياء على الإطلاق في إعطاء الأولوية بشكل منهجي ومستمر للأرباح قصيرة الأجل على حساب كل شيء آخر.	2026-04-08 18:29:37.180604+00
1790	contrite	نادم، آسف	C1	adj.	A genuinely contrite acknowledgement of past failures is essential for fostering trust and facilitating meaningful progress.	اعتراف عام صادق وصحيح بالندم على جميع الفشل السابق...	2026-04-08 18:29:37.180604+00
1791	diffidence	خجل، حياء	C1	n.	Her characteristic diffidence belied the sheer breadth and depth of her scholarly expertise.	خجلها المميز والمفاجئ إلى حد ما أخفى تماما بشكل مضلل...	2026-04-08 18:29:37.180604+00
1792	disinterested	محايد، نزيه	C1	adj.	All scientific inquiry should ideally be conducted by disinterested and impartial researchers to ensure objective and reliable results.	يجب أن يكون كل استقصاء علمي جاد وموثوق دائمًا محايدًا وحقيقيًا...	2026-04-08 18:29:37.180604+00
1793	ebullient	متحمس، مفعم بالحيوية	C1	adj.	The research team was ebullient following the unexpected and highly promising results of the experiment.	فريق البحث كان متحمسًا وعفويًا بحق ومعديًا في تفاؤله...	2026-04-08 18:29:37.180604+00
1794	edifice	البناء، الهيكل	C1	n.	The entire legislative edifice underpinning current environmental law urgently requires comprehensive reform to address emerging global challenges.	البناء التشريعي المعقد والقديم الذي يدعم قانون البيئة الحالي يتطلب الآن بشكل عاجل وشامل إعادة النظر فيه.	2026-04-08 18:29:37.180604+00
1795	egregious	فاضح، شنيع	C1	adj.	The report documented several egregious violations of fundamental human rights and freedoms.	وثقت التقارير المستقلة الشاملة والواسعة النطاق عدة انتهاكات فاضحة وغير مقبولة تماماً لجميع الحقوق الأساسية.	2026-04-08 18:29:37.180604+00
1796	incongruent	متناقض، غير متوافق	C1	adj.	The anomalous result was entirely incongruent with all of the previous findings and theories.	النتيجة الشاذة والمتوقعة تماما كانت متناقضة تماما...	2026-04-08 18:29:37.180604+00
1797	indeterminate	غير محدد، غامض	C1	adj.	The precise long-term outcome of the intervention remains stubbornly uncertain despite extensive research efforts.	النتيجة طويلة الأجل للتدخل السياسي المعقد تبقى غامضة وغير محددة في هذه المرحلة المبكرة.	2026-04-08 18:29:37.180604+00
1798	internalise	يستوعب، يتمثل	C1	v.	Students must deeply and thoroughly internalise key grammatical rules for effective written communication.	يجب على الطلاب استيعاب جميع القواعد النحوية الأساسية بعمق لتحقيق لغة دقيقة وطليقة.	2026-04-08 18:29:37.180604+00
1801	equivocal	غامض، متناقض	C1	adj.	The overall evidence on this important theoretical point remains genuinely inconclusive at this stage.	الأدلة الإجمالية على هذه النقطة المهمة تظل غامضة وحقيقية...	2026-04-08 18:29:37.18419+00
1802	erudite	عالم، مثقف	C1	adj.	The erudite professor consistently explained even the most complex concepts with remarkable clarity and insight.	شرح الأستاذ المثقف حتى أعقد المفاهيم ب...	2026-04-08 18:29:37.18419+00
1803	forsake	يتخلى، يهجر	C1	v.	Society must not forsake long-term environmental sustainability for short-term economic gains.	لا يجب على المجتمع أن يتخلى عن الاستدامة البيئية طويلة الأجل من أجل...	2026-04-08 18:29:37.18419+00
1804	hallmark	سمة مميزة، خصيصة	C1	n.	Precision and clarity of language are widely and consistently regarded as the cornerstones of effective communication.	تعتبر دقة اللغة على نطاق واسع السمة المميزة للكتابة الأكاديمية القوية.	2026-04-08 18:29:37.18419+00
1805	heterogeneous	متنوع، متغاير	C1	adj.	A more genuinely heterogeneous sample would be far more representative of the broader population being studied.	عينة أكثر تنوعا ستكون أكثر تمثيلا للمجموعة الأوسع...	2026-04-08 18:29:37.18419+00
1806	heuristic	استكشافي	C1	adj.	A heuristic approach allows researchers to solve complex problems through simplified methods and practical strategies.	يسمح النهج الاستكشافي للباحثين بحل المشاكل المعقدة من خلال	2026-04-08 18:29:37.18419+00
1808	intransigent	متصلب، غير متنازل	C1	adj.	Deeply intransigent political opposition to reform significantly delayed the implementation of crucial policy changes.	أخّر المعارضة السياسية المتصلبة بشكل كبير إقرار التدابير الأساسية.	2026-04-08 18:29:37.18419+00
1809	irrefutable	لا يقبل الجدل، قاطع	C1	adj.	The accumulated scientific evidence against the continued widespread use of fossil fuels has led to increased calls for renewable energy adoption.	الأدلة ضد الاستخدام الواسع المستمر للوقود الأحفوري لا تقبل الجدل الآن.	2026-04-08 18:29:37.18419+00
1811	latent	كامن	C1	adj.	There is considerable latent potential in many underserved and disadvantaged communities that remains largely untapped.	هناك إمكانيات كامنة ضخمة في العديد من المجتمعات المحرومة.	2026-04-08 18:29:37.18419+00
971	economic	اقتصادي	B1	adj.	Sustainable economic development must always be carefully balanced with environmental preservation and social equity.	يجب أن يكون التطور الاقتصادي المستدام متوازناً بعناية مع الاعتبارات البيئية.	2026-04-08 18:29:37.149545+00
1003	medical	طبي	B1	adj.	Major medical advances have significantly extended average global life expectancy over the past century.	حققت التطورات الطبية الرئيسية تحسنًا كبيرًا في متوسط العمر المتوقع عالميًا.	2026-04-08 18:29:37.153092+00
1038	strict	صارم	B1	adj.	Much stricter laws are urgently needed to adequately protect endangered species from extinction.	هناك حاجة ماسة إلى قوانين أصرم بكثير لحماية الأنواع المهددة بالانقراض.	2026-04-08 18:29:37.153092+00
839	introduction	مقدمة / بداية	A2	n.	The introduction should clearly state the research question and justify its significance within the field.	يجب أن تبين المقدمة بوضوح سؤال البحث وتبرر أهميته	2026-04-08 18:29:37.144805+00
992	household	أسرة/منزل	B1	n.	Average household energy consumption has increased significantly in recent years due to technological advancements and lifestyle changes.	متوسط استهلاك الطاقة المنزلية زاد بشكل كبير في الآونة الأخيرة.	2026-04-08 18:29:37.149545+00
1066	convince	يقنع	B1	v.	The scientific evidence convinced many governments to urgently act on climate change mitigation strategies.	الأدلة العلمية أقنعت عدداً من الحكومات باتخاذ إجراء عاجل بشأن المناخ.	2026-04-08 18:29:37.153092+00
1064	conflict	صراع	B1	n.	Many unnecessary conflicts arise from poor communication and misunderstandings between individuals.	ينشأ الكثير من الصراعات غير الضرورية من سوء التواصل.	2026-04-08 18:29:37.153092+00
1076	launch	يطلق / يطرح	B1	v.	The company successfully launched an innovative new range of electric vehicles last quarter.	أطلقت الشركة بنجاح خطاً جديداً ومبتكراً من سيارات السيارات الكهربائية.	2026-04-08 18:29:37.153092+00
1086	resource	مورد	B1	n.	Fresh water is increasingly recognised as a precious and finite natural resource essential for human survival.	المياه العذبة يتم الاعتراف بها بشكل متزايد كمورد طبيعي ثمين ومحدود.	2026-04-08 18:29:37.153092+00
1074	investigate	يحقق / يبحث	B1	v.	Researchers thoroughly investigated the long-term effects of urban air pollution on respiratory health.	قام الباحثون بالتحقيق الشامل في الآثار طويلة الأجل لتلوث الهواء في المناطق الحضرية.	2026-04-08 18:29:37.153092+00
1083	recover	يتعافى	B1	v.	The national economy is slowly and gradually recovering from the deep recession experienced last year.	الاقتصاد الوطني يتعافى ببطء وتدريج من الأزمة العميقة.	2026-04-08 18:29:37.153092+00
1150	diversity	التنوع، التعددية	B1	n.	Intellectual diversity within research teams consistently produces more innovative and comprehensive solutions.	يعمل التنوع الفكري داخل فرق البحث على إنتاج نتائج أفضل بشكل مستمر	2026-04-08 18:29:37.157311+00
1151	theoretical	نظري	B1	adj.	The paper is primarily theoretical, though it draws on a range of empirical studies to support its arguments.	الورقة نظرية بشكل أساسي، رغم أنها تستند على مجموعة من الدراسات التجريبية	2026-04-08 18:29:37.157311+00
1227	exploit	يستغل	B2	v.	Some multinational companies exploit natural resources in an unsustainable manner, causing long-term environmental damage.	تستغل بعض الشركات متعددة الجنسيات الموارد الطبيعية بطريقة غير مستدامة.	2026-04-08 18:29:37.160986+00
1270	widespread	واسع الانتشار	B2	adj.	There is now widespread international concern about rising levels of air pollution and its impact on public health.	هناك الآن قلق دولي واسع الانتشار بشأن مستويات تلوث الهواء المرتفعة.	2026-04-08 18:29:37.160986+00
1286	alongside	جانب	B2	prep.	Renewable energy must expand alongside improvements in overall energy efficiency and infrastructure development.	يجب أن تتوسع الطاقة المتجددة جنباً إلى جنب مع تحسينات الطاقة الشاملة.	2026-04-08 18:29:37.160986+00
1247	outcome	نتيجة	B2	n.	The actual outcome of the experiment was completely unexpected by the research team and required further analysis.	كانت النتيجة الفعلية للتجربة مفاجئة تماماً لفريق البحث.	2026-04-08 18:29:37.160986+00
1262	tension	توتر	B2	n.	There is a growing tension between economic development and environmental sustainability that requires careful policy planning.	هناك توتر متزايد بين التطور الاقتصادي والحماية البيئية.	2026-04-08 18:29:37.160986+00
1254	pursue	يسعى	B2	v.	After graduating, she decided to pursue a rewarding career in environmental science and sustainability.	قررت بعد التخرج متابعة مهنة مجزية في مجال حماية البيئة.	2026-04-08 18:29:37.160986+00
1357	yield	ينتج	B2	v.	New and improved agricultural methods consistently yield significantly higher crop production and enhanced food security.	طرق زراعية جديدة ومحسنة تنتج محاصيل أعلى بكثير بشكل متسق.	2026-04-08 18:29:37.164528+00
1353	systematic	منهجي	B2	adj.	A systematic and well-planned approach to revision consistently improves academic performance and knowledge retention.	نهج منهجي وموضح جيداً للمراجعة يحسن النتائج باستمرار.	2026-04-08 18:29:37.164528+00
1341	fragile	هش	B2	adj.	Many natural ecosystems are extremely fragile and easily disturbed by human activities and interventions.	العديد من الأنظمة البيئية الطبيعية هشة للغاية وسهل الإخلال بها.	2026-04-08 18:29:37.164528+00
1400	saturate	يُشبع	B2	v.	A market that is fully saturated with similar products leaves little room for new entrants to thrive.	السوق المشبعة بالكامل بمنتجات متشابهة تترك مجالاً قليلاً للمنتجات الجديدة	2026-04-08 18:29:37.164528+00
1359	apprehension	قلق، خوف	B2	n.	There is growing public apprehension about the long-term consequences of environmental degradation and climate change.	هناك قلق متزايد من الجمهور بشأن العواقب طويلة الأجل.	2026-04-08 18:29:37.164528+00
1401	skeptical	متشكك	B2	adj.	Peer reviewers are trained to be appropriately skeptical of extraordinary new claims in research.	يتم تدريب المراجعين على أن يكونوا متشككين بشكل مناسب من الادعاءات الجديدة غير العادية	2026-04-08 18:29:37.168744+00
1402	sophisticated	متطور	B2	adj.	A sophisticated understanding of statistics is increasingly expected in applied research and data analysis.	يتوقع بشكل متزايد فهم متطور للإحصائيات في العلوم التطبيقية	2026-04-08 18:29:37.168744+00
1404	superficial	سطحي	B2	adj.	A superficial engagement with the literature is insufficient for doctoral-level research and analysis.	الاشتباك السطحي مع الأدبيات غير كافٍ لمستوى الدكتوراه	2026-04-08 18:29:37.168744+00
1406	vibrant	نابض بالحياة، حيوي	B2	adj.	A vibrant and open intellectual culture encourages risk-taking and creative thinking among individuals.	ثقافة فكرية نابضة بالحياة ومنفتحة تشجع على تحمل المخاطر والإبداع.	2026-04-08 18:29:37.168744+00
1407	agitate	يحرض، يثير	B2	v.	The report agitated for a fundamental overhaul of the ethical review process to ensure greater transparency and accountability.	طالب التقرير بإعادة هيكلة جذرية لعملية المراجعة الأخلاقية.	2026-04-08 18:29:37.168744+00
1405	unprecedented	غير مسبوق	B2	adj.	The scale of the challenge is unprecedented in the entire history of the modern world.	نطاق التحدي غير مسبوق في كل التاريخ.	2026-04-08 18:29:37.168744+00
1409	appease	يسترضي، يهدئ	B2	v.	Minor concessions were offered to appease critics without addressing their fundamental concerns.	تم تقديم تنازلات طفيفة لاسترضاء النقاد دون معالجة.	2026-04-08 18:29:37.168744+00
1412	incite	يحرض، يثير	B2	v.	Sensationalised reporting of preliminary findings can incite unfounded public fear and misunderstanding.	الإبلاغ المثير عن النتائج الأولية يمكن أن يثير قلقاً عاماً لا أساس له	2026-04-08 18:29:37.168744+00
1410	exquisite	رائع، بالغ الجمال	B2	adj.	The exquisite precision of the measurement instrument was its principal advantage in scientific research.	الدقة البالغة لأداة القياس كانت ميزتها الرئيسية.	2026-04-08 18:29:37.168744+00
1403	steadily	بشكل ثابت	B2	adv.	Public support for renewable energy has steadily and consistently increased over the past decade.	تزايد الدعم العام للطاقة المتجددة بشكل ثابت ومستمر	2026-04-08 18:29:37.168744+00
1411	humility	التواضع، الاتضاع	B2	n.	Intellectual humility — the recognition that one may be wrong — is a crucial trait for effective learning and open-minded discussion.	التواضع الفكري — الاعتراف بأن المرء قد يكون مخطئاً — هو	2026-04-08 18:29:37.168744+00
1416	curriculum	منهج دراسي	C1	n.	The national school curriculum should include comprehensive environmental education to promote sustainable development.	يجب أن يتضمن المنهج الدراسي الوطني للمدارس التعليم البيئي الشامل.	2026-04-08 18:29:37.168744+00
1432	impose	يفرض	C1	v.	The government imposed much stricter regulations on industrial carbon emissions to combat climate change effectively.	فرضت الحكومة لوائح أكثر صرامة بشأن انبعاثات الكربون الصناعية.	2026-04-08 18:29:37.168744+00
1413	ingenuity	الإبداع، الذكاء	B2	n.	Methodological ingenuity is often required when the research question defies conventional approaches.	غالباً ما يلزم الإبداع في التصميم الكلاسيكي عندما يتحدى السؤال البحثي التصاميم التقليدية	2026-04-08 18:29:37.168744+00
1436	modify	يعدّل	C1	v.	The research team modified the original experimental design for greater accuracy and reliability.	قام فريق البحث بتعديل التصميم التجريبي الأصلي لتحقيق دقة أكبر.	2026-04-08 18:29:37.168744+00
1484	enumerate	يعدد	C1	v.	The detailed report enumerates the primary causes of environmental degradation and their impacts.	يعدد التقرير المفصل الأسباب الرئيسية للتدهور البيئي.	2026-04-08 18:29:37.168744+00
1485	equilibrium	توازن	C1	n.	Healthy natural ecosystems maintain a complex and delicate internal balance that supports biodiversity.	تحافظ الأنظمة البيئية الصحية على توازن معقد وحساس داخلي.	2026-04-08 18:29:37.168744+00
1479	cumulative	تراكمي	C1	adj.	The cumulative effects of long-term environmental pollution are extremely detrimental to ecosystems and human health.	الآثار التراكمية للتلوث البيئي طويل الأمد قاسية جداً.	2026-04-08 18:29:37.168744+00
1489	formulate	يصيغ	C1	v.	National governments must urgently formulate effective long-term strategies to address climate change.	يجب على الحكومات الوطنية أن تصيغ بسرعة سياسات فعالة طويلة الأجل.	2026-04-08 18:29:37.168744+00
1532	terminology	المصطلحات	C1	n.	All academic writing requires the use of precise and appropriate technical terminology to convey complex ideas clearly.	يتطلب جميع الكتابة الأكاديمية استخدام المصطلحات التقنية الدقيقة والمناسبة.	2026-04-08 18:29:37.172278+00
1534	undermine	يقوض	C1	v.	Widespread corruption fundamentally undermines public trust in democratic institutions and processes.	الفساد الواسع يقوض الثقة العامة في المؤسسات الديمقراطية بشكل أساسي.	2026-04-08 18:29:37.172278+00
1535	unravel	يكشف	C1	v.	Scientists are beginning to unravel the extraordinary complexities of the human brain.	يبدأ العلماء في كشف تعقيدات الدماغ البشري الاستثنائية.	2026-04-08 18:29:37.172278+00
1537	viable	قابل للتطبيق	C1	adj.	Solar energy is now a fully viable and cost-competitive alternative to fossil fuels worldwide.	الطاقة الشمسية الآن بديل قابل للتطبيق وتنافسي من حيث التكلفة للوقود الأحفوري.	2026-04-08 18:29:37.172278+00
1545	analogous	مشابه	C1	adj.	This complex process is analogous to the way the human immune system identifies and neutralizes foreign pathogens.	هذه العملية المعقدة مشابهة للطريقة التي يعمل بها الجهاز المناعي البشري.	2026-04-08 18:29:37.172278+00
1604	gratuitous	غير ضروري، لا مبرر له	C1	adj.	Gratuitous complexity in academic writing always obscures rather than clarifies the intended message.	التعقيد غير الضروري في الكتابة الأكاديمية يحجب الرسالة بدلاً من توضيحها.	2026-04-08 18:29:37.176313+00
1607	impartial	محايد، غير متحيز	C1	adj.	An impartial and thorough review of all the evidence is essential for good decision-making in any judicial process.	المراجعة المحايدة والشاملة لجميع الأدلة ضرورية للحكم الجيد.	2026-04-08 18:29:37.176313+00
1824	arduous	شاق، متعب	C1	adj.	The process of longitudinal data collection was arduous but ultimately rewarding for the research outcomes.	كانت عملية جمع البيانات الطولية شاقة لكنها كانت مفيدة في النهاية.	2026-04-08 18:29:37.18419+00
1828	avarice	جشع	C1	n.	Corporate avarice has too often been prioritised over environmental sustainability and social responsibility.	تم إعطاء الأولوية للجشع الشركاتي على حساب البيئة مراراً وتكراراً.	2026-04-08 18:29:37.18419+00
1831	belie	ينافي، يناقض	C1	v.	The simplicity of the model belied the profound complexity of the underlying processes involved.	بساطة النموذج تنافي التعقيد العميق للمنطق الأساسي.	2026-04-08 18:29:37.18419+00
1830	banal	تافه، مبتذل	C1	adj.	A banal conclusion suggests that the writer has not engaged deeply with the subject matter or critical analysis.	الخلاصة التافهة تشير إلى أن الكاتب لم يتعمق في الموضوع.	2026-04-08 18:29:37.18419+00
1840	cohesion	التماسك	C1	n.	The essay lacks cohesion — the ideas do not connect smoothly between paragraphs.	المقالة تفتقر إلى التماسك — الأفكار لا تتصل بسلاسة بين الفقرات.	2026-04-08 18:29:37.18419+00
1833	candid	صريح، مباشر	C1	adj.	A candid acknowledgement of limitations always strengthens academic credibility and fosters trust.	الاعتراف الصريح بالقيود يعزز دائماً العمل الأكاديمي.	2026-04-08 18:29:37.18419+00
1841	commensurate	متناسب	C1	adj.	The level of funding should be commensurate with the scale of the proposed project.	يجب أن يكون مستوى التمويل متناسباً مع حجم المشروع المقترح.	2026-04-08 18:29:37.18419+00
1850	dormant	كامن	C1	adj.	Dormant environmental risks can become suddenly critical if preventative measures are neglected.	المخاطر البيئية الكامنة يمكن أن تصبح حرجة فجأة إذا فشلت التدابير الوقائية.	2026-04-08 18:29:37.18419+00
1848	divisive	انقسامي	C1	adj.	The divisive nature of the ongoing debate has made it extremely difficult to reach a consensus among experts.	الطبيعة الانقسامية للنقاش الجاري جعلت من الصعب جداً الوصول إلى توافق.	2026-04-08 18:29:37.18419+00
1849	dogma	العقيدة	C1	n.	Scientific dogma, however well-established, must always remain open to revision and critical scrutiny.	العقيدة العلمية، مهما كانت راسخة، يجب أن تبقى دائماً مفتوحة للنقاش.	2026-04-08 18:29:37.18419+00
1854	edify	ينور	C1	v.	The primary purpose of academic publication is ultimately to edify and advance knowledge within the scholarly community.	الهدف الأساسي للنشر الأكاديمي هو في النهاية تنوير والمساهمة في التقدم.	2026-04-08 18:29:37.18419+00
1851	dubious	مريب	C1	adj.	The methodology of the original study was widely regarded as dubious and lacked sufficient empirical support.	منهجية الدراسة الأصلية اعتبرت على نطاق واسع مريبة وغير موثوقة.	2026-04-08 18:29:37.18419+00
1847	debunk	يفند	C1	v.	The paper systematically debunked several long-standing misconceptions in the field of environmental science.	الورقة بحثية فندت بشكل منهجي عدة مفاهيم خاطئة راسخة في المجال.	2026-04-08 18:29:37.18419+00
1852	duplicity	الخداع	C1	n.	Any form of duplicity in the reporting of research data constitutes a serious breach of academic integrity.	أي شكل من أشكال الخداع في الإبلاغ عن بيانات البحث يشكل انتهاكاً خطيراً.	2026-04-08 18:29:37.18419+00
1853	eclectic	انتقائي	C1	adj.	Her eclectic research methodology drew productively on methods from several disciplines to enhance the study's robustness.	منهجيتها البحثية الانتقائية استفادت بشكل منتج من طرق من عدة تخصصات.	2026-04-08 18:29:37.18419+00
1855	eminent	بارز	C1	adj.	The paper was authored jointly by two of the most eminent and widely respected scholars in the field.	تمت كتابة الورقة بشكل مشترك من قبل اثنين من أبرز الباحثين المعروفين عالمياً.	2026-04-08 18:29:37.18419+00
1860	evade	يتفادى	C1	v.	Some powerful corporations continue to evade meaningful regulatory oversight and accountability.	بعض الشركات القوية تستمر في التفادي من الخضوع لتنظيم حقيقي وفعال.	2026-04-08 18:29:37.18419+00
1859	errant	ضال، خاطئ	C1	adj.	The errant methodology in the original study inevitably led to seriously flawed conclusions.	المنهجية غير الصحيحة في الدراسة الأصلية أدت حتماً إلى نتائج خطيرة الخطأ.	2026-04-08 18:29:37.18419+00
1861	evoke	يستحضر	C1	v.	The powerful and carefully designed visual data immediately evoked a strong emotional response from the audience.	البيانات المرئية القوية والمصممة بعناية استحضرت فوراً استجابة عاطفية قوية.	2026-04-08 18:29:37.18419+00
1856	enigmatic	غامض	C1	adj.	The enigmatic and puzzling results of the initial experiment prompted a much deeper investigation into the underlying mechanisms.	النتائج الغامضة والمحيرة للتجربة الأولية دفعت إلى إعادة فحص أعمق بكثير.	2026-04-08 18:29:37.18419+00
1862	exacting	صارم	C1	adj.	The exacting and uncompromising standards of the peer review process ensure the quality and credibility of academic publications.	المعايير الصارمة والثابتة لعملية المراجعة من قبل الأقران مهمة جداً.	2026-04-08 18:29:37.18419+00
1857	ephemeral	زائل	C1	adj.	The positive impact of poorly designed short-term interventions is often limited and unsustainable.	التأثير الإيجابي للتدخلات قصيرة الأجل المصممة بشكل سيء عادة ما يكون زائلاً.	2026-04-08 18:29:37.18419+00
1858	equanimity	الهدوء	C1	n.	The most effective researchers consistently approach unexpected setbacks with resilience and adaptability.	أكثر الباحثين فعالية يتعاملون باستمرار مع النكسات غير المتوقعة بهدوء وسكينة.	2026-04-08 18:29:37.18419+00
1863	exemplify	يجسد	C1	v.	This carefully designed study effectively exemplifies all the best practices in research methodology and data analysis.	هذه الدراسة المصممة بعناية تجسد بفعالية جميع أفضل الممارسات في المجال.	2026-04-08 18:29:37.18419+00
1865	exponent	الممثل	C1	n.	She was widely regarded as the most prominent and influential exponent of an emerging artistic movement.	كانت تعتبر على نطاق واسع أبرز ممثل ومؤثر لنهج تحليلي جديد تماماً.	2026-04-08 18:29:37.18419+00
1864	expedient	مناسب للظرف، براغماتي	C1	adj.	An expedient and short-term solution that deliberately ignores root causes will ultimately fail to provide lasting benefits.	الحل الانتهازي قصير الأجل الذي يتجاهل عن قصد الأسباب الجذرية سيفشل حتماً.	2026-04-08 18:29:37.18419+00
1866	fabricate	يختلق	C1	v.	The researcher was found to have deliberately fabricated key data points in the final report submitted for peer review.	اكتُشف أن الباحث اختلق عن قصد نقاط بيانات رئيسية.	2026-04-08 18:29:37.18419+00
1867	fallible	قابل للخطأ	C1	adj.	All researchers are inherently fallible, which is precisely why rigorous and systematic methodologies are essential.	جميع الباحثين قابلون بطبيعتهم للخطأ، وهو السبب بالضبط في أهمية المراجعة الصارمة.	2026-04-08 18:29:37.18419+00
1869	ferment	تخمر، اضطراب	C1	n.	The new and unexpected findings created considerable and wide-ranging implications for future research.	النتائج الجديدة والمفاجئة أحدثت تخمراً واعتباراً كبيراً وواسع النطاق.	2026-04-08 18:29:37.18419+00
1868	fastidious	دقيق ومتشدد	C1	adj.	A fastidious and meticulous approach to all aspects of data collection is the key to ensuring accuracy and reliability.	النهج الدقيق والمتشدد في جميع جوانب جمع البيانات هو الأساس.	2026-04-08 18:29:37.18419+00
1870	fervent	متحمس، غيور	C1	adj.	She was a fervent and passionate lifelong advocate for open-access academic publishing and knowledge sharing.	كانت مناصرة متحمسة وشغوفة مدى الحياة للوصول المفتوح للأبحاث الأكاديمية.	2026-04-08 18:29:37.18419+00
1872	foment	يثير، يشعل	C1	v.	Deliberate and calculated misinformation can effectively foment dangerous social unrest and division.	المعلومات المضللة المتعمدة والمحسوبة يمكنها أن تثير بفعالية تهديدات خطيرة.	2026-04-08 18:29:37.18419+00
1871	finesse	براعة، دقة	C1	n.	Handling the sensitive and complex ethical dimensions of the study required careful consideration and adherence to established guidelines.	التعامل مع الجوانب الأخلاقية الحساسة والمعقدة للدراسة تطلب براعة.	2026-04-08 18:29:37.18419+00
1875	futile	عبثي، بلا جدوى	C1	adj.	Without significant and sustained political will, isolated efforts to meaningfully address complex social issues are unlikely to succeed.	بدون إرادة سياسية كبيرة ومستدامة، الجهود المعزولة ستكون عبثية.	2026-04-08 18:29:37.18419+00
1873	forthright	صريح، مباشر	C1	adj.	A forthright and fully transparent account of all significant methodological considerations is essential for the validity of the research.	يجب أن يكون الحساب صريحاً وشفافاً تماماً لجميع الخطوات المنهجية الهامة.	2026-04-08 18:29:37.18419+00
1874	fragility	هشاشة	C1	n.	The fragility of the complex and interconnected ecosystem was not fully understood until significant damage had occurred.	لم يتم فهم هشاشة النظام البيئي المعقد والمترابط بالكامل.	2026-04-08 18:29:37.18419+00
1877	gravity	خطورة، جسامة	C1	n.	The genuine gravity of the escalating climate crisis demands an immediate and coordinated global response.	خطورة أزمة المناخ المتفاقمة تتطلب استجابة فورية وحاسمة.	2026-04-08 18:29:37.18419+00
1878	hubris	غرور، تكبر	C1	n.	Intellectual hubris, or excessive and unjustified confidence in one's own knowledge, can hinder critical thinking and learning.	الغرور الفكري، أو الثقة المفرطة والمبالغ فيها بقدرات المرء، مضر.	2026-04-08 18:29:37.18419+00
1880	incorruptible	لا يفسد، نزيه	C1	adj.	The long-term integrity of science depends fundamentally on fully incorruptible research practices and ethical standards.	يعتمد السلامة طويلة الأجل للعلم بشكل أساسي على باحثين نزهاء تماماً.	2026-04-08 18:29:37.18419+00
1879	inadmissible	غير مقبول	C1	adj.	Evidence obtained through unethical or coercive means is entirely inadmissible in a court of law.	الأدلة التي تم الحصول عليها من خلال وسائل غير أخلاقية أو قسرية غير مقبولة تماماً.	2026-04-08 18:29:37.18419+00
1883	ineluctable	حتمي، لا مفر منه	C1	adj.	The ineluctable conclusion drawn from all available data is that truly immediate action is necessary to mitigate the crisis.	الاستنتاج الحتمي المستخلص من جميع البيانات المتاحة هو أن عملاً فورياً ضروري.	2026-04-08 18:29:37.18419+00
1882	indisputable	لا يقبل النقاش، حاسم	C1	adj.	The accumulated evidence that sustained human activity is the primary driver supports urgent environmental policy reforms.	الأدلة المتراكمة على أن النشاط البشري هو المحرك الأساسي حاسمة تماماً.	2026-04-08 18:29:37.18419+00
1881	indefatigable	لا يكل، دؤوب	C1	adj.	An indefatigable and unwavering personal commitment to accuracy and excellence is essential for success in any professional field.	الالتزام الشخصي الدؤوب والثابت بالدقة والأمانة ضروري تماماً.	2026-04-08 18:29:37.18419+00
1885	infallible	معصوم عن الخطأ	C1	adj.	No scientific method or framework is ever fully infallible; all findings must be critically evaluated and tested.	لا توجد طريقة أو إطار علمي معصوم تماماً عن الخطأ؛ يجب التحقق من جميع النتائج.	2026-04-08 18:29:37.18419+00
1886	innate	فطري، طبيعي	C1	adj.	A genuine love of learning and an innate intellectual curiosity are widely regarded as essential qualities for academic success.	حب التعلم والفضول الفكري الفطري يعتبران أساسيين للنجاح الأكاديمي.	2026-04-08 18:29:37.18419+00
1887	insightful	بصير، ثاقب النظر	C1	adj.	Her insightful and original analysis of the complex data revealed important trends and correlations.	تحليلها البصير والأصلي للبيانات المعقدة كشف عن اكتشافات مهمة.	2026-04-08 18:29:37.18419+00
1888	intrepid	شجاع، جريء	C1	adj.	The intrepid and dedicated researcher determinedly continued her demanding pursuit of groundbreaking discoveries.	الباحثة الشجاعة والمكرسة واصلت بثبات عملها الشاق والمطول.	2026-04-08 18:29:37.18419+00
1890	laconic	موجز، قصير	C1	adj.	His characteristically laconic writing style made even the most demanding readers appreciate his clarity.	أسلوبه الموجز المميز جعل حتى أكثر المقالات تعقيداً يسهل فهمها.	2026-04-08 18:29:37.18419+00
1889	laborious	شاق، متعب	C1	adj.	The laborious and time-consuming process of primary data collection required careful planning and substantial resources to ensure accuracy.	العملية الشاقة والمستهلكة لجمع البيانات الأساسية تطلبت موارد كبيرة.	2026-04-08 18:29:37.18419+00
1892	lenient	متساهل، لين	C1	adj.	The assessment committee was somewhat lenient in its evaluation of the first draft submitted by the students.	كانت لجنة التقييم متساهلة إلى حد ما في تقييمها للمسودة الأولى.	2026-04-08 18:29:37.18419+00
1891	laudable	جدير بالإشادة	C1	adj.	The strong institutional commitment to open-access publishing is a laudable effort to promote knowledge dissemination.	التزام المؤسسة القوي بالنشر المفتوح الوصول خطوة جديرة بالإشادة.	2026-04-08 18:29:37.18419+00
1893	lucidity	وضوح	C1	n.	The remarkable lucidity of her writing allowed even a non-specialist audience to grasp complex concepts easily.	الوضوح الرائع في كتابتها سمح حتى للقارئ غير المتخصص بفهم المحتوى.	2026-04-08 18:29:37.18419+00
1896	ostentatious	متباهٍ	C1	adj.	Ostentatious use of obscure vocabulary rarely improves the quality of written communication.	الاستخدام المتباهي للمفردات الغامضة نادراً ما يحسّن جودة الكتابة.	2026-04-08 18:29:37.18419+00
1894	meander	يتحول، يتعرج	C1	v.	A well-structured academic essay should never meander aimlessly; every paragraph must contribute to the central argument.	لا ينبغي لمقالة أكاديمية منظمة جيداً أن تتعرج بلا هدف؛ كل جزء له غرض.	2026-04-08 18:29:37.18419+00
1898	painstaking	دقيق، متقن	C1	adj.	The painstaking reconstruction of the original dataset took over a year to complete and verify for accuracy.	إعادة البناء الدقيقة لمجموعة البيانات الأصلية استغرقت أكثر من سنة.	2026-04-08 18:29:37.18419+00
1903	perennial	مستمر، دائم	C1	adj.	Underfunding of education is a perennial problem in many developing countries that hampers progress.	نقص التمويل في التعليم مشكلة دائمة في العديد من الدول النامية.	2026-04-08 18:29:37.188719+00
1907	polemical	جدلي	C1	adj.	The polemical tone of the essay undermined its potential impact on serious academic discourse.	النبرة الجدلية للمقالة قللت من تأثيرها المحتمل على الباحثين الجادين.	2026-04-08 18:29:37.188719+00
1904	perspicacious	حكيم، ذو فهم عميق	C1	adj.	Her perspicacious reading of the data revealed a previously unrecognised pattern in the results.	قراءتها الحكيمة للبيانات كشفت عن نمط لم يُعترف به من قبل.	2026-04-08 18:29:37.188719+00
1906	plausibility	المعقولية، الاحتمالية	C1	n.	The plausibility of the proposed mechanism was immediately challenged by several experts in the field.	طُعن في معقولية الآلية المقترحة فوراً من قبل الخبراء.	2026-04-08 18:29:37.188719+00
1908	preamble	ديباجة، مقدمة طويلة	C1	n.	The lengthy preamble delayed the reader from reaching the paper's central argument.	المقدمة الطويلة أخرت القارئ عن الوصول إلى النقطة المركزية للبحث.	2026-04-08 18:29:37.188719+00
1911	propensity	ميل، نزعة	C1	n.	There is a propensity among some researchers to overstate the certainty of their findings in order to gain greater recognition.	هناك نزعة بين بعض الباحثين للمبالغة في تأكيد يقينية النتائج.	2026-04-08 18:29:37.188719+00
1913	proportionate	متناسب	C1	adj.	A proportionate response to emerging evidence neither overstates nor underestimates the significance of the findings.	الاستجابة المتناسبة للأدلة الناشئة لا تبالغ ولا تقلل من أهميتها.	2026-04-08 18:29:37.188719+00
1912	propitious	مناسب، موات	C1	adj.	The timing was propitious — public and political attention was focused on the issue.	التوقيت كان موات - الاهتمام العام والسياسي كان منصباً على القضية.	2026-04-08 18:29:37.188719+00
1910	probing	استقصائي، مفصل	C1	adj.	The committee's probing questions exposed several inconsistencies in the witness's testimony.	الأسئلة الاستقصائية للجنة كشفت عن عدة تناقضات في النتائج.	2026-04-08 18:29:37.188719+00
1909	preeminent	بارز، متفوق	C1	adj.	She is the preeminent authority on this specific aspect of cognitive psychology.	هي السلطة البارزة في هذا الجانب المحدد من العلوم المعرفية.	2026-04-08 18:29:37.188719+00
132	home	بيت / منزل	A2	n.	I go home at three o'clock every day.	أذهب إلى البيت الساعة الثالثة كل يوم.	2026-04-08 18:29:37.118504+00
236	start	يبدأ	A2	v.	We start school at eight o'clock every morning.	نبدأ الدراسة في الساعة الثامنة صباحاً كل يوم.	2026-04-08 18:29:37.122679+00
319	dear	عزيز	A2	adj.	Begin the letter with the words 'Dear Sir'.	ابدأ الرسالة بكلمات &quot;حضرة السيد&quot;.	2026-04-08 18:29:37.126284+00
333	exam	امتحان	A2	n.	The exam starts at nine o'clock sharp.	الامتحان يبدأ الساعة التاسعة صباحاً بالضبط.	2026-04-08 18:29:37.126284+00
389	programme	برنامج	A2	n.	The television programme starts at seven o'clock.	البرنامج التلفزيوني يبدأ في تمام الساعة السابعة.	2026-04-08 18:29:37.126284+00
513	copy	ينسخ	A2	v.	Do not copy your classmate's work.	لا تنسخ عمل زميلك في الفصل.	2026-04-08 18:29:37.134069+00
552	February	فبراير	A2	n.	Valentine's Day is on the 14th of February.	عيد الحب يصادف في الرابع عشر من شباط.	2026-04-08 18:29:37.134069+00
\.


--
-- Data for Name: lesson_completions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."lesson_completions" ("id", "email", "lesson_id", "completed_at") FROM stdin;
\.


--
-- Data for Name: lessons; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."lessons" ("id", "course", "title", "vimeo_url", "order_index", "created_at") FROM stdin;
\.


--
-- Data for Name: notification_reads; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."notification_reads" ("id", "notification_id", "email", "opened_at") FROM stdin;
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."notifications" ("id", "message", "type", "audience", "level", "scheduled_at", "sent_at", "created_at", "created_by") FROM stdin;
9	Final fan-out check	announcement	all	\N	\N	2026-04-24 19:37:55.899+00	2026-04-24 19:37:55.908202+00	admin
\.


--
-- Data for Name: orwell_coach_summaries; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."orwell_coach_summaries" ("id", "email", "at_submission_count", "summary", "created_at") FROM stdin;
\.


--
-- Data for Name: orwell_submissions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."orwell_submissions" ("id", "email", "assignment_id", "category", "status", "band", "word_count", "created_at", "text", "feedback", "task_type_label", "prompt", "compare_report") FROM stdin;
1	test@example.com	task1-13	task1	skipped	\N	\N	2026-04-16 19:53:06.977111+00	\N	\N	\N	\N	\N
2	test@example.com	task2-9	task2	submitted	4.5	253	2026-04-20 16:47:03.119+00	\N	\N	\N	\N	\N
3	test@example.com	para-11	paragraph	submitted	\N	63	2026-04-20 16:51:06.268+00	\N	\N	\N	\N	\N
\.


--
-- Data for Name: progress; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."progress" ("id", "flashcard_id", "known", "reviewed_at", "email") FROM stdin;
2	2	t	2026-04-15 01:39:54.38+00	student2@test.com
\.


--
-- Data for Name: push_subscriptions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."push_subscriptions" ("id", "email", "endpoint", "keys", "created_at") FROM stdin;
\.


--
-- Data for Name: quiz_scores; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."quiz_scores" ("id", "email", "mode", "level", "total", "correct", "wrong", "completed_at") FROM stdin;
1	test@example.com	multiple-choice	ALL	20	19	1	2026-04-16 05:11:39.645271+00
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."reviews" ("id", "email", "name", "comment", "rating", "status", "created_at", "reviewed_at", "admin_reply", "admin_reply_at") FROM stdin;
1	test_student@example.com	Sara A.	LEXO has been an amazing companion for my IELTS prep — the flashcards and Orwell writing checker are gold!	5	approved	2026-04-24 20:19:07.74789+00	2026-04-24 20:19:07.74789+00	\N	\N
\.


--
-- Data for Name: sentence_sessions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."sentence_sessions" ("id", "email", "level", "total_words", "first_attempt_correct", "needed_correction", "avg_vocab_band", "avg_grammar_band", "common_mistakes", "items", "ended_early", "completed_at") FROM stdin;
\.


--
-- Data for Name: settings; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."settings" ("key", "value") FROM stdin;
site_password	ielts2025
admin_avatar	data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==
\.


--
-- Data for Name: stories; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."stories" ("id", "title", "title_arabic", "content", "content_arabic", "level", "order_index", "created_at") FROM stdin;
1	The First Day at School	أول يوم في المدرسة	Ahmed was nervous on his first day at the new school. He woke up early, wore his best clothes, and ate breakfast quickly. His mother told him to be confident and to smile at everyone.\n\nAt school, the teacher introduced Ahmed to the class. The students were friendly. A boy named Omar sat next to him and showed him where to put his bag. During the lesson, Ahmed listened carefully and wrote new words in his notebook.\n\nAt lunchtime, Ahmed ate with Omar and two other students. They talked about football and their favourite subjects. Ahmed liked mathematics, but Omar preferred English.\n\nBy the end of the day, Ahmed felt happy. He had found a new friend and learned many new things. He told his mother that school was a wonderful place, and he could not wait to return the next morning.	كان أحمد متوتراً في أول يوم له في المدرسة الجديدة. استيقظ مبكراً، وارتدى أفضل ملابسه، وأكل إفطاره بسرعة. طلبت منه والدته أن يكون واثقاً من نفسه وأن يبتسم للجميع.\n\nفي المدرسة، قدّم المعلم أحمد إلى الفصل. كان الطلاب ودودين. جلس بجانبه ولد اسمه عمر وأراه أين يضع حقيبته. خلال الدرس، استمع أحمد باهتمام وكتب كلمات جديدة في دفتره.\n\nفي وقت الغداء، أكل أحمد مع عمر وطالبين آخرين. تحدثوا عن كرة القدم والمواد الدراسية المفضلة لديهم. أحبّ أحمد الرياضيات، لكن عمر فضّل اللغة الإنجليزية.\n\nفي نهاية اليوم، شعر أحمد بالسعادة. لقد وجد صديقاً جديداً وتعلّم أشياء كثيرة. أخبر والدته أن المدرسة مكان رائع، ولم يستطع الانتظار للعودة إليها في صباح اليوم التالي.	A2	1	2026-04-09 20:30:06.298036+00
2	A Walk in the Park	نزهة في الحديقة	Every Sunday, Sara and her family go to the park near their house. The park is large and beautiful, with tall trees, colourful flowers, and a small lake. Children play near the water and feed the ducks with pieces of bread.\n\nSara always brings a bag of food for the birds. Her father sits on a bench and reads the newspaper, while her mother walks slowly with her younger sister. They talk and enjoy the fresh air.\n\nSometimes the family meets their neighbours in the park. They say hello and have a short conversation. The children play together on the grass while the adults relax.\n\nAfter two hours, the family feels calm and happy. Before they leave, they buy ice cream from a small shop at the gate. Sara always chooses strawberry flavour. It is her favourite. She says the park is the best place in the city.	كل يوم أحد، تذهب سارة وعائلتها إلى الحديقة القريبة من منزلهم. الحديقة واسعة وجميلة، بها أشجار طويلة وزهور ملونة وبحيرة صغيرة. يلعب الأطفال بالقرب من الماء ويطعمون البط بقطع الخبز.\n\nتحضر سارة دائماً كيساً من الطعام للطيور. يجلس والدها على مقعد ويقرأ الجريدة، بينما تمشي والدتها ببطء مع أختها الصغيرة. يتحدثان ويستمتعان بالهواء النقي.\n\nأحياناً تلتقي العائلة بجيرانها في الحديقة. يتبادلون التحية ويتحدثون قليلاً. يلعب الأطفال معاً على العشب بينما يستريح الكبار.\n\nبعد ساعتين، تشعر العائلة بالهدوء والسعادة. قبل المغادرة، يشترون آيس كريم من متجر صغير عند البوابة. تختار سارة دائماً نكهة الفراولة. إنها نكهتها المفضلة. تقول إن الحديقة هي أفضل مكان في المدينة.	A2	2	2026-04-09 20:30:06.298036+00
3	The New Neighbour	الجار الجديد	A new family moved into the house next door last week. They have two children — a boy of ten and a girl of eight. The father's name is Khalid and the mother's name is Layla.\n\nOn the first day, Sara's mother made a large dish of food and took it to the new family. Layla opened the door and smiled warmly. She said "thank you" many times and invited Sara's mother inside for tea.\n\nThe two women talked for an hour. They discovered that their children go to the same school. Sara was happy to hear this. She decided to knock on the door the next morning and walk to school with the new girl, whose name was Nour.\n\nThe next day, Sara and Nour walked to school together. They talked and laughed all the way. By the time they arrived, they were already good friends. Good neighbours, Sara thought, make life much better.	انتقلت عائلة جديدة إلى المنزل المجاور الأسبوع الماضي. لديهم طفلان — ولد عمره عشر سنوات وفتاة عمرها ثماني سنوات. اسم الأب خالد واسم الأم ليلى.\n\nفي اليوم الأول، أعدّت والدة سارة طبقاً كبيراً من الطعام وأخذته إلى العائلة الجديدة. فتحت ليلى الباب وابتسمت بدفء. قالت "شكراً" مرات عديدة ودعت والدة سارة للدخول لتناول الشاي.\n\nتحدثت المرأتان لمدة ساعة. اكتشفتا أن أطفالهما يذهبون إلى نفس المدرسة. سعدت سارة بسماع ذلك. قررت أن تطرق الباب في صباح اليوم التالي وتمشي إلى المدرسة مع الفتاة الجديدة التي اسمها نور.\n\nفي اليوم التالي، مشت سارة ونور معاً إلى المدرسة. تحدثتا وضحكتا طوال الطريق. حين وصلتا، كانتا قد أصبحتا صديقتين جيدتين. الجيران الطيبون، فكّرت سارة، يجعلون الحياة أفضل بكثير.	A2	3	2026-04-09 20:30:06.298036+00
4	My Favourite Season	موسمي المفضل	My favourite season is spring. After the cold winter, the weather becomes warm and pleasant. The sun shines every day, and the sky is bright blue. Flowers begin to grow in gardens and parks, and the trees have fresh green leaves.\n\nIn spring, I like to open the windows in the morning and listen to the birds. Their sounds make me feel happy and relaxed. I also enjoy going for walks in the evening when the air is cool and fresh.\n\nSpring is also the season for outdoor activities. Children play in the street and ride their bicycles. Families go on picnics in the park and eat together under the trees.\n\nSome people prefer summer or winter, but I think spring is the most beautiful season. Everything looks new and alive. After the long dark days of winter, spring gives us hope and energy for the rest of the year.	موسمي المفضل هو الربيع. بعد الشتاء البارد، يصبح الطقس دافئاً ولطيفاً. تشرق الشمس كل يوم، والسماء زرقاء مشرقة. تبدأ الزهور بالنمو في الحدائق والمتنزهات، والأشجار لها أوراق خضراء طازجة.\n\nفي الربيع، أحبّ فتح النوافذ في الصباح والاستماع إلى الطيور. أصواتها تجعلني أشعر بالسعادة والاسترخاء. أستمتع أيضاً بالمشي في المساء حين يكون الهواء بارداً ومنعشاً.\n\nالربيع هو أيضاً موسم الأنشطة الخارجية. يلعب الأطفال في الشارع ويركبون دراجاتهم. تخرج العائلات في نزهات إلى الحديقة وتأكل معاً تحت الأشجار.\n\nيفضّل بعض الناس الصيف أو الشتاء، لكنني أعتقد أن الربيع هو أجمل الفصول. كل شيء يبدو جديداً وحياً. بعد الأيام الطويلة المظلمة في الشتاء، يمنحنا الربيع الأمل والطاقة لبقية العام.	A2	4	2026-04-09 20:30:06.298036+00
9	Healthy Habits	العادات الصحية	Dr Samira often tells her patients that good health is not the result of a single action, but a collection of daily habits. She has seen many people make dramatic changes to their lifestyle and then feel frustrated when the results take time to appear.\n\nThe most important habit, she says, is sleep. Adults need seven to eight hours of quality rest each night. Without adequate sleep, the body cannot repair itself, the mind becomes less sharp, and the immune system weakens.\n\nPhysical activity is equally essential. This does not mean spending hours at the gym. A thirty-minute walk each day is enough to reduce the risk of heart disease, improve mood, and maintain a healthy weight.\n\nDiet matters too, but Dr Samira avoids telling patients to follow strict plans. Instead, she advises them to eat more vegetables and fruit, drink plenty of water, and reduce processed food. Small, sustainable changes are far more effective than extreme diets that last only a few weeks. "Health," she says, "is built one ordinary day at a time."	كثيراً ما تخبر الدكتورة سميرة مرضاها بأن الصحة الجيدة ليست نتيجة فعل واحد، بل مجموعة من العادات اليومية. لقد رأت كثيراً من الناس يُجرون تغييرات جذرية على أسلوب حياتهم ثم يشعرون بالإحباط حين يستغرق ظهور النتائج وقتاً.\n\nتقول إن أهم عادة هي النوم. يحتاج البالغون من سبع إلى ثماني ساعات من الراحة الجيدة كل ليلة. بدون نوم كافٍ، لا يستطيع الجسم إصلاح نفسه، ويصبح الذهن أقل حدة، ويضعف الجهاز المناعي.\n\nالنشاط البدني ضروري بالقدر ذاته. هذا لا يعني قضاء ساعات في الصالة الرياضية. المشي لمدة ثلاثين دقيقة يومياً كافٍ لتقليل خطر الإصابة بأمراض القلب وتحسين المزاج والحفاظ على وزن صحي.\n\nيهمّ الغذاء أيضاً، لكن الدكتورة سميرة تتجنّب إخبار المرضى باتباع خطط صارمة. بدلاً من ذلك، تنصحهم بتناول المزيد من الخضروات والفواكه وشرب الكثير من الماء وتقليل الأطعمة المصنّعة. التغييرات الصغيرة المستدامة أكثر فعالية بكثير من الأنظمة الغذائية المتطرفة التي لا تدوم سوى أسابيع قليلة. تقول: "الصحة تُبنى يوماً عادياً واحداً في كل مرة."	B1	4	2026-04-09 20:30:06.298036+00
5	A Day at the Market	يوم في السوق	Every Friday morning, Hassan goes to the local market with his mother. The market is a busy and exciting place. There are many stalls selling vegetables, fruit, meat, fish, and clothes. The colours and smells are everywhere.\n\nHassan's mother always makes a list before she goes. She buys tomatoes, onions, potatoes, and fresh herbs. Hassan carries the bags and helps her choose the best fruit. He squeezes the oranges to check if they are fresh.\n\nAt the market, everyone knows each other. The sellers call out the prices and offer discounts to their regular customers. Hassan's mother often bargains for a lower price. Sometimes she succeeds, and this makes her very happy.\n\nAfter shopping, they stop at a small café and drink tea. Hassan always orders a glass of fresh juice. The market is hard work, but Hassan enjoys it because he feels helpful and learns how to manage money.	كل صباح جمعة، يذهب حسن إلى السوق المحلي مع والدته. السوق مكان مزدحم ومثير. هناك كثير من الأكشاك التي تبيع الخضروات والفواكه واللحوم والسمك والملابس. الألوان والروائح في كل مكان.\n\nتصنع والدة حسن قائمة دائماً قبل أن تذهب. تشتري الطماطم والبصل والبطاطس والأعشاب الطازجة. يحمل حسن الأكياس ويساعدها في اختيار أفضل الفواكه. يضغط على البرتقال للتحقق من أنه طازج.\n\nفي السوق، الجميع يعرف بعضهم. يصيح البائعون بالأسعار ويقدمون خصومات لزبائنهم المنتظمين. كثيراً ما تساوم والدة حسن للحصول على سعر أقل. وأحياناً تنجح، وهذا يجعلها سعيدة جداً.\n\nبعد التسوق، يتوقفان في مقهى صغير ويشربان الشاي. يطلب حسن دائماً كوباً من العصير الطازج. العمل في السوق شاق، لكن حسن يستمتع به لأنه يشعر أنه مفيد ويتعلم كيفية إدارة المال.	A2	5	2026-04-09 20:30:06.298036+00
6	The City That Changed	المدينة التي تغيّرت	When Rania returned to her hometown after five years abroad, she could not believe how much it had changed. New buildings had replaced the old ones. Wide roads had been built where narrow lanes once existed. Shopping centres stood where small local shops had served the community for generations.\n\nRania felt a mixture of admiration and sadness. The city was clearly more modern and efficient. Public transport had improved, and the streets were cleaner. The economy had grown, and more people seemed to have comfortable lives.\n\nHowever, something important had been lost. The community spirit that she remembered was less visible. People walked quickly and stared at their phones. The old bakery where everyone gathered in the morning had been replaced by a chain restaurant.\n\nRania sat in a café and thought about progress. Development brings many benefits, but it also changes the character of a place. She wondered whether her city had become better or simply different. Perhaps both things were true at the same time.	حين عادت رانيا إلى مدينتها بعد خمس سنوات في الخارج، لم تستطع تصديق مقدار ما تغيّر. أُزيلت المباني القديمة وحلّت محلها مبانٍ جديدة. شُقّت طرق عريضة حيث كانت توجد أزقة ضيقة. قامت مراكز التسوق حيث خدمت محلات صغيرة المجتمع لأجيال.\n\nشعرت رانيا بمزيج من الإعجاب والحزن. كانت المدينة بوضوح أكثر حداثة وكفاءة. تحسّنت وسائل النقل العام، والشوارع أنظف. نمت الاقتصاد وبدا أن الناس يعيشون حياة مريحة أكثر.\n\nغير أن شيئاً مهماً قد فُقد. كانت روح المجتمع التي تذكرها أقل وضوحاً. يمشي الناس بسرعة ويحدّقون في هواتفهم. حلّ مطعم من سلسلة كبيرة محلّ المخبز القديم الذي كان الجميع يجتمع فيه صباحاً.\n\nجلست رانيا في مقهى وفكّرت في التقدم. يجلب التطوير فوائد كثيرة، لكنه أيضاً يغيّر طابع المكان. تساءلت إن كانت مدينتها قد أصبحت أفضل أم مختلفة فقط. ربما كان كلا الأمرين صحيحاً في الوقت نفسه.	B1	1	2026-04-09 20:30:06.298036+00
7	A Dream Job	وظيفة الأحلام	Since he was a child, Yusuf had wanted to become a doctor. His mother was a nurse, and he admired her dedication to helping others. He studied hard throughout school and eventually earned a place at medical school.\n\nThe training was long and demanding. Yusuf spent years studying anatomy, practising procedures, and working night shifts at the hospital. There were moments when he felt exhausted and doubted himself. But he always remembered why he had chosen this path.\n\nAfter qualifying, Yusuf worked in a busy hospital in the city. Every day brought new challenges. He treated patients with different conditions and worked alongside experienced colleagues who taught him valuable lessons.\n\nOne afternoon, an elderly man thanked Yusuf personally after a successful operation. The man held his hand and said, "You have given me more time with my family." In that moment, Yusuf understood that his career was not just a job. It was a responsibility and a privilege. He could not imagine doing anything else.	منذ طفولته، أراد يوسف أن يصبح طبيباً. كانت والدته ممرضة، وأعجبه تفانيها في مساعدة الآخرين. درس بجدية طوال سنوات المدرسة وحصل في نهاية المطاف على مكان في كلية الطب.\n\nكان التدريب طويلاً ومرهقاً. أمضى يوسف سنوات يدرس علم التشريح ويتدرب على الإجراءات الطبية ويعمل في نوبات ليلية بالمستشفى. كانت هناك لحظات يشعر فيها بالإرهاق ويشك في نفسه. لكنه دائماً تذكّر سبب اختياره هذا المسار.\n\nبعد التخرج، عمل يوسف في مستشفى مزدحم في المدينة. كل يوم جلب تحديات جديدة. عالج مرضى بحالات مختلفة وعمل مع زملاء متمرسين علّموه دروساً قيّمة.\n\nفي أحد الأيام، شكره رجل مسن شخصياً بعد عملية جراحية ناجحة. أمسك الرجل بيده وقال: "لقد منحتني مزيداً من الوقت مع عائلتي." في تلك اللحظة، أدرك يوسف أن مهنته ليست مجرد وظيفة. كانت مسؤولية وامتيازاً. لم يستطع تخيّل فعل أي شيء آخر.	B1	2	2026-04-09 20:30:06.298036+00
8	The Importance of Reading	أهمية القراءة	Nadia discovered her love for reading when she was nine years old. Her grandfather gave her a collection of short stories, and she read all of them in a single weekend. From that moment, books became her closest companions.\n\nAs she grew older, Nadia realised that reading had given her many advantages. Her vocabulary expanded naturally, and she could express herself clearly in both spoken and written communication. She understood complex ideas more easily than her classmates.\n\nReading also developed her imagination and empathy. By entering the lives of characters from different cultures and backgrounds, she began to understand the world from perspectives very different from her own. This made her more open-minded and less judgemental.\n\nAt university, Nadia studied literature and became a teacher. She now encourages her students to read for pleasure, not only for exams. "A book," she tells them, "takes you somewhere new without you ever leaving your chair. There is no cheaper or more powerful form of travel in the world."	اكتشفت ناديا حبّها للقراءة وهي في التاسعة من عمرها. أهداها جدها مجموعة من القصص القصيرة، فقرأتها جميعاً في عطلة نهاية أسبوع واحدة. منذ تلك اللحظة، أصبحت الكتب رفيقاتها الأقرب.\n\nمع تقدمها في العمر، أدركت ناديا أن القراءة منحتها مزايا كثيرة. اتسعت مفرداتها بشكل طبيعي، وأصبحت قادرة على التعبير عن نفسها بوضوح في التواصل الشفهي والكتابي. وكانت تفهم الأفكار المعقدة بسهولة أكبر من زملائها.\n\nطوّرت القراءة أيضاً خيالها وتعاطفها. من خلال دخول حيوات شخصيات من ثقافات وخلفيات مختلفة، بدأت تفهم العالم من وجهات نظر مختلفة جداً عن وجهة نظرها. جعلها هذا أكثر انفتاحاً وأقل حكماً على الآخرين.\n\nفي الجامعة، درست ناديا الأدب وأصبحت معلمة. تشجّع طلابها الآن على القراءة للمتعة، وليس فقط للامتحانات. تقول لهم: "الكتاب يأخذك إلى مكان جديد دون أن تغادر كرسيك. لا يوجد شكل أرخص أو أقوى للسفر في العالم."	B1	3	2026-04-09 20:30:06.298036+00
10	Technology in Daily Life	التكنولوجيا في الحياة اليومية	Ten years ago, Tariq would have found it difficult to imagine how technology would change his daily routine. Today, he uses his smartphone to wake up, check the weather, pay for his coffee, and navigate through the city — all before nine in the morning.\n\nAt work, he uses software to communicate with colleagues in different countries, manage his schedule, and analyse data. Tasks that previously required hours can now be completed in minutes. This efficiency has allowed him to focus on the creative parts of his job.\n\nAt home, smart devices control the heating, lighting, and security of his apartment. He can monitor everything remotely from his phone. When he wants to relax, he streams films and music, reads e-books, or video-calls his family abroad.\n\nTariq appreciates these conveniences but also recognises the risks. He sometimes spends too much time on screens and finds it difficult to switch off at night. He has started setting boundaries — no phone after ten, and one day each week completely offline. Technology, he has learned, works best when you remain in control of it.	قبل عشر سنوات، كان من الصعب على طارق تخيّل كيف ستغيّر التكنولوجيا روتينه اليومي. اليوم، يستخدم هاتفه الذكي للاستيقاظ وفحص حالة الطقس ودفع ثمن قهوته والتنقل في المدينة — كل ذلك قبل التاسعة صباحاً.\n\nفي العمل، يستخدم برامج للتواصل مع الزملاء في بلدان مختلفة وإدارة جدوله وتحليل البيانات. المهام التي كانت تستغرق ساعات يمكن الآن إنجازها في دقائق. أتاحت له هذه الكفاءة التركيز على الجوانب الإبداعية في عمله.\n\nفي المنزل، تتحكم الأجهزة الذكية في التدفئة والإضاءة وأمان شقته. يمكنه مراقبة كل شيء عن بُعد من هاتفه. حين يريد الاسترخاء، يبثّ الأفلام والموسيقى ويقرأ الكتب الإلكترونية أو يتصل بعائلته في الخارج عبر الفيديو.\n\nيقدّر طارق هذه المزايا، لكنه يدرك أيضاً المخاطر. أحياناً يقضي وقتاً طويلاً أمام الشاشات ويجد صعوبة في التوقف ليلاً. بدأ يضع حدوداً — لا هاتف بعد العاشرة، ويوم واحد في الأسبوع بعيداً تماماً عن الإنترنت. تعلّم أن التكنولوجيا تعمل على أفضل وجه حين تظل أنت في السيطرة عليها.	B1	5	2026-04-09 20:30:06.298036+00
11	The Green City	المدينة الخضراء	The concept of a sustainable city was once considered an idealistic vision, but several urban centres around the world have demonstrated that environmentally responsible development is both practical and economically viable.\n\nCopenhagen, for example, has invested heavily in cycling infrastructure, renewable energy, and green architecture. The city aims to become carbon neutral by 2025. Its residents benefit from clean air, efficient public transport, and a high quality of life. The economic benefits have also been significant — green industries have created thousands of jobs and attracted international investment.\n\nHowever, sustainable urban development presents challenges. It requires substantial upfront investment, long-term political commitment, and genuine public engagement. Critics argue that these green initiatives often benefit wealthier residents while displacing lower-income communities from city centres.\n\nThe lesson from successful green cities is that environmental policy must be accompanied by social equity. Sustainable development cannot be achieved by technology alone; it demands a fundamental shift in how communities prioritise growth, consumption, and the relationship between human society and the natural environment.	كان مفهوم المدينة المستدامة يُعدّ في السابق رؤية مثالية، لكن عدة مراكز حضرية حول العالم أثبتت أن التنمية المسؤولة بيئياً عملية ومجدية اقتصادياً في آنٍ واحد.\n\nكوبنهاغن، على سبيل المثال، استثمرت بكثافة في البنية التحتية للدراجات والطاقة المتجددة والعمارة الخضراء. تهدف المدينة إلى تحقيق حياد الكربون بحلول عام 2025. يستفيد سكانها من الهواء النقي والنقل العام الفعّال ومستوى معيشة مرتفع. وقد كانت الفوائد الاقتصادية كبيرة أيضاً — فقد خلقت الصناعات الخضراء آلاف فرص العمل واستقطبت الاستثمار الدولي.\n\nغير أن التنمية الحضرية المستدامة تطرح تحديات. فهي تستلزم استثماراً أولياً ضخماً والتزاماً سياسياً طويل الأمد ومشاركة شعبية حقيقية. يرى المنتقدون أن هذه المبادرات الخضراء كثيراً ما تفيد السكان الأثرياء مع تهميش المجتمعات ذات الدخل المنخفض من مراكز المدن.\n\nالدرس المستخلص من المدن الخضراء الناجحة هو أن السياسة البيئية يجب أن تترافق مع العدالة الاجتماعية. لا يمكن تحقيق التنمية المستدامة بالتكنولوجيا وحدها؛ فهي تتطلب تحولاً جوهرياً في كيفية إعطاء المجتمعات الأولوية للنمو والاستهلاك والعلاقة بين المجتمع الإنساني والبيئة الطبيعية.	B2	1	2026-04-09 20:30:06.298036+00
12	Bridges Between Cultures	جسور بين الثقافات	When Layla arrived in London as an international student, she expected to feel overwhelmed by the cultural differences. What she did not expect was how much she would learn about her own culture by encountering another.\n\nIn her first weeks, small misunderstandings were common. She interpreted directness as rudeness and silence as disapproval. Her British classmates, meanwhile, sometimes found her warmth excessive and her communication style indirect. These friction points were uncomfortable but ultimately valuable.\n\nOver months of shared seminars, group projects, and social events, genuine friendships developed. Layla began to appreciate the British emphasis on individual space and understatement. Her colleagues, in turn, discovered the generosity and community spirit embedded in her background.\n\nWhat Layla found most surprising was that cultural exchange did not require her to abandon her identity. Instead, it broadened it. She returned home with a deeper appreciation for her own traditions and a far greater capacity to understand those who see the world differently. True cultural understanding, she concluded, is not about becoming the same — it is about developing the curiosity to understand why others are different.	حين وصلت ليلى إلى لندن كطالبة دولية، توقعت أن تشعر بالإرهاق من الاختلافات الثقافية. ما لم تتوقعه هو مقدار ما ستتعلمه عن ثقافتها الخاصة من خلال مواجهة ثقافة أخرى.\n\nفي أسابيعها الأولى، كانت سوء الفهم البسيطة شائعة. فسّرت المباشرة على أنها وقاحة، والصمت على أنه استياء. في المقابل، وجد زملاؤها البريطانيون أحياناً أن دفءها مبالغ فيه وأسلوب تواصلها غير مباشر. كانت نقاط الاحتكاك هذه مزعجة، لكنها كانت ذات قيمة في نهاية المطاف.\n\nعلى مدار أشهر من الندوات المشتركة والمشاريع الجماعية والفعاليات الاجتماعية، نشأت صداقات حقيقية. بدأت ليلى تقدّر التأكيد البريطاني على المساحة الفردية والتحفظ في التعبير. وبالمقابل، اكتشف زملاؤها الكرم وروح المجتمع المتجذّرين في خلفيتها.\n\nما وجدته ليلى أكثر إثارة للدهشة هو أن التبادل الثقافي لم يتطلّب منها التخلي عن هويتها. بل وسّعها. عادت إلى وطنها بتقدير أعمق لتقاليدها الخاصة وقدرة أكبر بكثير على فهم من يرون العالم بشكل مختلف. خلصت إلى أن الفهم الثقافي الحقيقي لا يعني أن تصبح مثل الآخرين — بل أن تنمّي الفضول لفهم سبب اختلافهم.	B2	2	2026-04-09 20:30:06.298036+00
13	The Price of Progress	ثمن التقدم	The Industrial Revolution transformed human society in ways that are still felt today. Within a single century, societies moved from agricultural economies to industrial ones, from rural communities to urban centres, and from manual labour to mechanised production. The consequences — both positive and negative — were enormous.\n\nOn the positive side, industrialisation created unprecedented economic growth. Standards of living improved dramatically for many people. Medical advances extended life expectancy. Education became more widely available. Transportation shrank the effective distance between communities.\n\nYet the price of this progress was significant. Environmental degradation accompanied industrial expansion. Rivers became polluted, air quality deteriorated, and natural habitats were destroyed. Social inequalities widened as wealthy factory owners accumulated capital while workers endured long hours in dangerous conditions.\n\nThe legacy of the Industrial Revolution challenges contemporary societies to examine progress critically. Economic development and environmental sustainability are not inevitably in conflict, but reconciling them requires deliberate policy choices. The lesson of history is that the costs of progress are real and must be distributed fairly — not passed silently to future generations or to communities that are least responsible for causing them.	حوّلت الثورة الصناعية المجتمع الإنساني بطرق لا تزال تُشعر بها حتى اليوم. في غضون قرن واحد، انتقلت المجتمعات من الاقتصادات الزراعية إلى الصناعية، ومن المجتمعات الريفية إلى المراكز الحضرية، ومن العمل اليدوي إلى الإنتاج الآلي. وكانت العواقب — الإيجابية والسلبية على حد سواء — هائلة.\n\nعلى الجانب الإيجابي، أفرز التصنيع نمواً اقتصادياً غير مسبوق. تحسّنت مستويات المعيشة تحسناً درامياً لكثير من الناس. ومدّدت التطورات الطبية متوسط العمر المتوقع. وأصبح التعليم متاحاً على نطاق أوسع. وقلّصت وسائل النقل المسافة الفعلية بين المجتمعات.\n\nغير أن ثمن هذا التقدم كان كبيراً. رافق التوسع الصناعي تدهورٌ بيئي. تلوّثت الأنهار وتراجعت جودة الهواء ودُمّرت الموائل الطبيعية. واتسعت التفاوتات الاجتماعية إذ راكم أصحاب المصانع الأثرياء رؤوس الأموال بينما عانى العمال من ساعات طويلة في ظروف خطرة.\n\nيتحدى إرث الثورة الصناعية المجتمعات المعاصرة لمراجعة التقدم بعين ناقدة. لا يتعارض التطوير الاقتصادي والاستدامة البيئية بالضرورة، لكن التوفيق بينهما يستلزم خيارات سياسية متعمّدة. الدرس الذي تعلّمناه من التاريخ هو أن تكاليف التقدم حقيقية ويجب توزيعها بعدالة — لا أن تُمرَّر بصمت إلى الأجيال القادمة أو إلى المجتمعات الأقل مسؤولية عن التسبب بها.	B2	3	2026-04-09 20:30:06.298036+00
14	Knowledge and Power	المعرفة والقوة	The philosopher Francis Bacon famously wrote that knowledge is power. In the twenty-first century, this statement has acquired new dimensions. In an age where information is generated and shared at unprecedented speed, the ability to access, evaluate, and apply knowledge has become the most important form of capital.\n\nEducation systems around the world are grappling with this reality. Traditional models that prioritise memorisation and reproduction of facts are increasingly inadequate. Employers and researchers now seek individuals who can think critically, communicate persuasively, adapt to new challenges, and collaborate across disciplines.\n\nYet access to quality education remains deeply unequal. Students in wealthy nations benefit from well-funded schools, experienced teachers, and reliable technology. Those in less developed regions often lack basic resources. This educational inequality perpetuates economic inequality across generations.\n\nAddressing this challenge requires more than financial investment. It requires reimagining the purpose of education itself. If knowledge is indeed power, then the most urgent task is to ensure that this power is distributed as widely and equitably as possible. An educated global population is not only a moral ideal — it is the foundation of a stable and innovative world.	كتب الفيلسوف فرانسيس بيكون قولته الشهيرة بأن المعرفة قوة. في القرن الحادي والعشرين، اكتسب هذا القول أبعاداً جديدة. في عصر تُولَد فيه المعلومات وتُشارَك بسرعة غير مسبوقة، أصبحت القدرة على الوصول إلى المعرفة وتقييمها وتطبيقها أهم أشكال رأس المال.\n\nتتصارع منظومات التعليم في العالم مع هذا الواقع. النماذج التقليدية التي تُعطي الأولوية للحفظ وإعادة إنتاج الحقائق باتت غير كافية بصورة متزايدة. يسعى أصحاب العمل والباحثون الآن إلى أفراد يستطيعون التفكير النقدي والتواصل بإقناع والتكيف مع التحديات الجديدة والتعاون عبر التخصصات.\n\nغير أن الوصول إلى التعليم الجيد لا يزال غير متكافئ بعمق. يستفيد الطلاب في الدول الغنية من مدارس ممولة جيداً ومعلمين متمرسين وتقنية موثوقة. في حين يفتقر كثيرون في المناطق الأقل نمواً إلى الموارد الأساسية. وهذا التفاوت التعليمي يديم التفاوت الاقتصادي عبر الأجيال.\n\nمعالجة هذا التحدي تستلزم أكثر من استثمار مالي. تستلزم إعادة تصوّر الغرض من التعليم ذاته. إذا كانت المعرفة قوة حقاً، فإن المهمة الأكثر إلحاحاً هي ضمان توزيع هذه القوة على أوسع نطاق ممكن وبأكبر قدر من الإنصاف. السكان المتعلمون على المستوى العالمي ليسوا مثالاً أخلاقياً فحسب — بل هم أساس عالم مستقر ومبتكر.	B2	4	2026-04-09 20:30:06.298036+00
15	Urban Migration	الهجرة إلى المدن	For the first time in human history, more than half the world's population lives in cities. This shift from rural to urban living represents one of the most significant demographic transformations of the modern era, with profound consequences for economies, environments, and social structures.\n\nThe reasons why people migrate to cities are well understood. Urban areas generally offer more employment opportunities, better access to education and healthcare, and a wider range of cultural and social experiences. For ambitious young people in particular, cities represent possibility and upward mobility.\n\nHowever, rapid urbanisation creates enormous pressures. Infrastructure struggles to accommodate growing populations. Housing becomes unaffordable. Traffic congestion worsens. Inequality intensifies as the wealthy and the poor occupy increasingly separate urban worlds.\n\nMeanwhile, rural areas often suffer from the consequences of outward migration. As younger generations leave, communities lose vitality, local services decline, and agricultural productivity is affected.\n\nSustainable urban policy must therefore address both the push factors that drive people away from rural areas and the pull factors that attract them to cities. The goal is not to reverse migration — a largely impossible and undesirable aim — but to manage its effects in ways that benefit both urban and rural communities.	لأول مرة في تاريخ البشرية، يقطن أكثر من نصف سكان العالم في المدن. يمثّل هذا التحوّل من الحياة الريفية إلى الحضرية أحد أهم التحولات الديموغرافية في العصر الحديث، مع عواقب عميقة على الاقتصادات والبيئات والهياكل الاجتماعية.\n\nالأسباب التي تدفع الناس إلى الهجرة إلى المدن معروفة جيداً. تتيح المناطق الحضرية عموماً فرص عمل أكثر وأفضل وصولاً إلى التعليم والرعاية الصحية ومجموعة أوسع من التجارب الثقافية والاجتماعية. وبالنسبة للشباب الطموح بشكل خاص، تمثّل المدن إمكانية التقدم الاجتماعي.\n\nغير أن التحضّر السريع يخلق ضغوطاً هائلة. تعجز البنية التحتية عن استيعاب السكان المتنامين. يصبح السكن غير ميسور التكلفة. يزداد الاختناق المروري سوءاً. ويتعمّق التفاوت مع انفصال الأثرياء والفقراء بصورة متزايدة في عوالم حضرية منفصلة.\n\nوفي المقابل، كثيراً ما تعاني المناطق الريفية من تبعات الهجرة الخارجية. مع رحيل الأجيال الشابة، تفقد المجتمعات حيويتها وتتراجع الخدمات المحلية وتتأثر الإنتاجية الزراعية.\n\nلذلك يجب على السياسة الحضرية المستدامة أن تعالج عوامل الدفع التي تطرد الناس من المناطق الريفية وعوامل الجذب التي تستقطبهم إلى المدن. الهدف ليس عكس مسار الهجرة — وهو هدف يصعب تحقيقه إلى حد بعيد وغير مرغوب به — بل إدارة آثارها بطرق تعود بالنفع على المجتمعات الحضرية والريفية على حد سواء.	B2	5	2026-04-09 20:30:06.298036+00
16	The Digital Divide	الهوة الرقمية	The proliferation of digital technology has generated extraordinary opportunities for economic participation, educational access, and civic engagement. Yet the benefits of this transformation have not been distributed equally. The term "digital divide" describes the persistent gap between those who have meaningful access to digital tools and those who do not — a divide that maps closely onto existing inequalities of class, geography, age, and gender.\n\nIn high-income countries, the digital divide is often framed as a question of digital literacy rather than access. Most citizens have smartphones and internet connections, but a significant proportion lack the skills to navigate digital environments critically, evaluate online information accurately, or protect their data from commercial and governmental surveillance.\n\nIn lower-income regions, the challenge is more fundamental. Unreliable electricity, unaffordable devices, and inadequate telecommunications infrastructure exclude billions from the digital economy entirely. For these populations, the gap is not merely inconvenient — it compounds disadvantage across every dimension of life, from healthcare access to financial inclusion.\n\nClosing the digital divide requires coordinated international investment, regulatory frameworks that prioritise universal access, and educational programmes that develop genuine digital capability rather than superficial familiarity. Without such intervention, digital technology risks becoming yet another mechanism through which existing power structures are entrenched rather than challenged.	أفرز انتشار التكنولوجيا الرقمية فرصاً استثنائية للمشاركة الاقتصادية والوصول إلى التعليم والمشاركة المدنية. غير أن فوائد هذا التحوّل لم تُوزَّع بالتساوي. يصف مصطلح "الهوة الرقمية" الفجوة القائمة بين من يتمتعون بوصول حقيقي إلى الأدوات الرقمية ومن لا يتمتعون بذلك — فجوة ترتبط ارتباطاً وثيقاً بالتفاوتات القائمة في الطبقة الاجتماعية والجغرافيا والعمر والنوع الاجتماعي.\n\nفي البلدان ذات الدخل المرتفع، كثيراً ما تُصاغ الهوة الرقمية باعتبارها مسألة محو الأمية الرقمية لا الوصول. يمتلك معظم المواطنين هواتف ذكية واتصالات بالإنترنت، لكن نسبة كبيرة منهم تفتقر إلى المهارات اللازمة للتعامل مع البيئات الرقمية بصورة نقدية أو تقييم المعلومات الإلكترونية بدقة أو حماية بياناتهم من مراقبة تجارية وحكومية.\n\nفي المناطق ذات الدخل المنخفض، يكون التحدي أكثر جوهرية. الكهرباء غير المنتظمة والأجهزة مرتفعة التكلفة والبنية التحتية للاتصالات غير الكافية تستبعد مليارات البشر من الاقتصاد الرقمي كلياً. بالنسبة لهؤلاء السكان، لا تعدو الهوة كونها مجرد إزعاج — بل تُضاعف التهميش عبر كل أبعاد الحياة، من الوصول إلى الرعاية الصحية إلى الشمول المالي.\n\nيستلزم سدّ الهوة الرقمية استثماراً دولياً منسّقاً وأطراً تنظيمية تُعطي الأولوية للوصول الشامل وبرامج تعليمية تنمّي القدرة الرقمية الحقيقية لا المعرفة السطحية. بدون مثل هذا التدخل، تخاطر التكنولوجيا الرقمية بأن تصبح آليةً أخرى لترسيخ هياكل القوة القائمة بدلاً من تحديها.	C1	1	2026-04-09 20:30:06.298036+00
17	Sustainability and Society	الاستدامة والمجتمع	The concept of sustainability has undergone considerable evolution since its popularisation in the 1987 Brundtland Report, which defined sustainable development as meeting the needs of the present without compromising the ability of future generations to meet their own needs. What began as an environmental framework has since expanded into a comprehensive philosophy encompassing economic equity, social justice, and cultural preservation.\n\nContemporary debates around sustainability reveal a fundamental tension between two competing visions of change. The first, often described as "green capitalism," holds that market mechanisms, technological innovation, and corporate responsibility can deliver sustainable outcomes without dismantling existing economic structures. The second perspective, more radical in character, argues that sustainability is incompatible with the logic of infinite growth that underpins capitalist economies. On this view, genuine sustainability requires not merely cleaner production but a fundamental reconceptualisation of prosperity itself.\n\nWhat both perspectives acknowledge, however, is that behavioural change at the individual level — while necessary — is wholly insufficient on its own. Systemic transformation requires regulatory intervention, international cooperation, and a willingness among political actors to impose costs on powerful industries whose activities generate significant environmental harm.\n\nThe urgency of the climate crisis renders these debates more than academic. The decisions made by policymakers, corporations, and civil society in the coming decade will determine not merely the character of future societies but, in some scenarios, their very possibility.	شهد مفهوم الاستدامة تطوراً ملحوظاً منذ شيوعه في تقرير برونتلاند عام 1987، الذي عرّف التنمية المستدامة بأنها تلبية احتياجات الحاضر دون المساس بقدرة الأجيال القادمة على تلبية احتياجاتها. ما بدأ إطاراً بيئياً توسّع منذ ذلك الحين ليصبح فلسفة شاملة تحتضن الإنصاف الاقتصادي والعدالة الاجتماعية والحفاظ على الثقافة.\n\nتكشف النقاشات المعاصرة حول الاستدامة عن توتر جوهري بين رؤيتين متنافستين للتغيير. الأولى، التي يُطلق عليها كثيراً "الرأسمالية الخضراء"، ترى أن آليات السوق والابتكار التكنولوجي والمسؤولية الشركاتية يمكنها تحقيق نتائج مستدامة دون تفكيك الهياكل الاقتصادية القائمة. أما المنظور الثاني، الأكثر جذرية، فيجادل بأن الاستدامة لا تتوافق مع منطق النمو اللانهائي الذي يقوم عليه الاقتصاد الرأسمالي. ووفق هذا الرأي، تستلزم الاستدامة الحقيقية ليس إنتاجاً أنظف فحسب، بل إعادة تصوّر جوهرية لمفهوم الازدهار ذاته.\n\nغير أن ما يُقرّ به كلا المنظورين هو أن التغيير السلوكي على المستوى الفردي — وإن كان ضرورياً — يظل وحده غير كافٍ بالمرة. يستلزم التحوّل المنظومي تدخلاً تنظيمياً وتعاوناً دولياً واستعداداً لدى الفاعلين السياسيين لفرض تكاليف على الصناعات النافذة التي تتسبب أنشطتها في أضرار بيئية جسيمة.\n\nتجعل أزمة المناخ الملحّة هذه النقاشات أكثر من مجرد أكاديمية. القرارات التي يتخذها صانعو السياسات والشركات والمجتمع المدني في العقد القادم ستحدد ليس فقط طابع المجتمعات المستقبلية، بل في بعض السيناريوهات، إمكانية وجودها ذاتها.	C1	2	2026-04-09 20:30:06.298036+00
18	The Ethics of Artificial Intelligence	أخلاقيات الذكاء الاصطناعي	Artificial intelligence systems are increasingly making or informing decisions that affect human lives in significant ways: assessing creditworthiness, predicting recidivism, screening job applications, diagnosing medical conditions, and moderating online speech. These applications raise profound ethical questions that existing regulatory and philosophical frameworks are struggling to address.\n\nOne central concern is algorithmic bias. Machine learning models are trained on historical data, which inevitably encodes the prejudices and inequalities of the societies that generated it. A predictive policing algorithm trained on data from racially biased law enforcement practices will, absent intervention, perpetuate and potentially amplify those biases. When consequential decisions are delegated to such systems, the mechanisms of discrimination become less visible and therefore harder to contest.\n\nA second concern relates to accountability. When an automated system makes a harmful decision — wrongly denying a loan, misidentifying a suspect, recommending an inappropriate medical treatment — establishing legal and moral responsibility is deeply complex. The diffusion of responsibility across data providers, algorithm designers, deploying organisations, and regulatory bodies can create conditions in which no single actor is held meaningfully accountable.\n\nThese challenges suggest that the development and deployment of AI cannot be left solely to market forces or technical communities. It requires sustained engagement from ethicists, legal scholars, civil society organisations, and affected communities — and a regulatory environment willing to prioritise human dignity over technological efficiency.	باتت أنظمة الذكاء الاصطناعي تتخذ قرارات متزايدة الأثر على حيوات البشر أو تُوجّهها بطرق شتى: تقييم الجدارة الائتمانية والتنبؤ بالعود إلى الجريمة وفرز طلبات التوظيف وتشخيص الحالات الطبية والإشراف على الخطاب عبر الإنترنت. تطرح هذه التطبيقات أسئلة أخلاقية عميقة تعجز الأطر التنظيمية والفلسفية القائمة عن الإجابة عنها.\n\nمن أبرز المخاوف التحيّز الخوارزمي. تُدرَّب نماذج التعلم الآلي على بيانات تاريخية تعكس حتماً تحيزات المجتمعات التي أنتجتها وتفاوتاتها. إن خوارزمية للتنبؤ بالجرائم مُدرَّبة على بيانات من ممارسات شرطية متحيّزة عنصرياً ستعيد إنتاج تلك التحيزات وربما تضخيمها في غياب التدخل. وحين تُفوَّض قرارات ذات عواقب إلى مثل هذه الأنظمة، تصبح آليات التمييز أقل وضوحاً وبالتالي أصعب طعناً.\n\nثمة مخاوف ثانية تتعلق بالمساءلة. حين يتخذ نظام آلي قراراً ضاراً — رفض قرض بصورة خاطئة أو تحديد هوية مشتبه به بشكل خاطئ أو التوصية بعلاج طبي غير ملائم — تغدو إرساء المسؤولية القانونية والأخلاقية أمراً بالغ التعقيد. يمكن لتشتت المسؤولية بين موفري البيانات ومصممي الخوارزميات والمنظمات المشغّلة والهيئات التنظيمية أن يهيئ ظروفاً لا يُحاسَب فيها أيّ فاعل منفرد بصورة حقيقية.\n\nتشير هذه التحديات إلى أن تطوير الذكاء الاصطناعي ونشره لا يمكن تركهما لقوى السوق أو المجتمعات التقنية وحدها. فهو يستلزم انخراطاً مستداماً من علماء الأخلاق والباحثين القانونيين ومنظمات المجتمع المدني والمجتمعات المتأثرة — وبيئة تنظيمية مستعدة لإعطاء الأولوية للكرامة الإنسانية على حساب الكفاءة التكنولوجية.	C1	3	2026-04-09 20:30:06.298036+00
19	Globalisation and Identity	العولمة والهوية	The relationship between globalisation and cultural identity has been a site of intense scholarly and political debate for several decades. Advocates of globalisation argue that the increased mobility of people, ideas, and cultural products enriches societies by exposing them to diverse influences. Critics, however, contend that economic and cultural globalisation functions primarily as a vehicle for the dissemination of Western — and specifically American — values, aesthetics, and consumer practices, at the expense of local traditions and linguistic diversity.\n\nNeither position adequately captures the complexity of the actual processes underway. Cultural exchange under conditions of globalisation is rarely a simple matter of dominant cultures overwhelming subordinate ones. Instead, societies engage in complex negotiations, selectively adopting elements of global culture while reinterpreting or resisting others in light of local values and historical experience.\n\nThe concept of hybridity, developed extensively in postcolonial theory, offers a more nuanced framework for understanding these dynamics. Cultural identities are not static, bounded entities that exist prior to contact with other cultures; they are continuously constituted through processes of encounter, exchange, and transformation.\n\nWhat requires careful attention is the power differential that structures these encounters. When cultural exchange occurs between societies with vastly unequal economic and political resources, the outcomes are unlikely to be symmetrical. Preserving linguistic and cultural diversity in an era of globalisation thus demands active policy intervention — not as an exercise in nostalgic nationalism, but as a commitment to the epistemic and aesthetic richness that human diversity makes possible.	شكّلت العلاقة بين العولمة والهوية الثقافية موضع جدل أكاديمي وسياسي حاد منذ عدة عقود. يجادل المؤيدون للعولمة بأن الحركة المتزايدة للناس والأفكار والمنتجات الثقافية تُثري المجتمعات بتعريضها لتأثيرات متنوعة. في المقابل، يرى المنتقدون أن العولمة الاقتصادية والثقافية تعمل في المقام الأول كوسيلة لنشر القيم والجماليات والممارسات الاستهلاكية الغربية — وتحديداً الأمريكية — على حساب التقاليد المحلية والتنوع اللغوي.\n\nلا يلتقط أيٌّ من الموقفين تعقيد العمليات الجارية فعلياً. نادراً ما يكون التبادل الثقافي في ظروف العولمة مجرد مسألة سيطرة الثقافات المهيمنة على الثقافات التابعة. بدلاً من ذلك، تنخرط المجتمعات في تفاوضات معقدة، تتبنى بانتقاء عناصر من الثقافة العالمية بينما تعيد تأويل عناصر أخرى أو تقاومها في ضوء القيم المحلية والتجربة التاريخية.\n\nيقدم مفهوم الهجنة، الذي طوّرته النظرية ما بعد الاستعمارية على نطاق واسع، إطاراً أكثر دقة لفهم هذه الديناميكيات. فالهويات الثقافية ليست كيانات جامدة ومحددة المعالم توجد قبل الاحتكاك بثقافات أخرى؛ بل تتشكّل باستمرار عبر عمليات اللقاء والتبادل والتحوّل.\n\nما يستلزم عناية دقيقة هو التفاوت في القوة الذي يُهيكل هذه اللقاءات. حين يجري التبادل الثقافي بين مجتمعات ذات موارد اقتصادية وسياسية متفاوتة تفاوتاً شاسعاً، فمن غير المرجح أن تكون النتائج متماثلة. إن الحفاظ على التنوع اللغوي والثقافي في عصر العولمة يتطلب إذاً تدخلاً سياسياً فاعلاً — ليس بوصفه ممارسة قومية نوستالجية، بل التزاماً بالثراء المعرفي والجمالي الذي يتيحه التنوع الإنساني.	C1	4	2026-04-09 20:30:06.298036+00
20	The Future of Work	مستقبل العمل	Automation and artificial intelligence are transforming the labour market at a pace and scale that has no clear historical precedent. While technological displacement of workers is not a new phenomenon — the agricultural and industrial revolutions both generated significant occupational disruption — the current wave of automation is distinguished by its potential to affect cognitive as well as physical tasks, expanding its reach across professional, creative, and service sectors previously assumed to be immune.\n\nOptimistic accounts emphasise the historical pattern of technology-driven job creation. Each previous wave of automation has, over time, generated new categories of employment that could not have been anticipated before the relevant technologies emerged. Proponents of this view argue that fears of mass technological unemployment are therefore misplaced — a form of the "lump of labour" fallacy.\n\nMore cautionary analyses point out that the speed of the current transition may preclude the gradual adaptation that historically smoothed occupational disruption. When jobs disappear faster than new ones are created, or when the skills required by emerging industries are inaccessible to displaced workers, the social consequences — in the form of unemployment, wage compression, and inequality — can be severe.\n\nWhat seems clear is that the future of work will be shaped less by technological inevitability than by political choices. How societies choose to invest in education and retraining, regulate automated labour, structure social protection, and distribute the productivity gains of automation will determine whether technological progress translates into broadly shared prosperity or deepening economic stratification.	تُحوّل الأتمتة والذكاء الاصطناعي سوق العمل بوتيرة وحجم لا سابق له في التاريخ. وعلى الرغم من أن الإزاحة التكنولوجية للعمال ليست ظاهرة جديدة — إذ أفرزت الثوراتان الزراعية والصناعية اضطراباً مهنياً كبيراً — يتميّز الموج الحالي من الأتمتة بإمكانية تأثيره على المهام الإدراكية فضلاً عن الجسدية، مما يوسّع نطاقه ليشمل القطاعات المهنية والإبداعية والخدمية التي كان يُفترض سابقاً أنها في مأمن من ذلك.\n\nتُبرز التقديرات المتفائلة النمط التاريخي لخلق الوظائف بدفع من التكنولوجيا. فقد أفرزت كل موجة سابقة من الأتمتة، على مدار الوقت، فئات جديدة من التوظيف لم يكن بالإمكان توقعها قبل ظهور التقنيات ذات الصلة. يجادل أنصار هذا الرأي بأن المخاوف من البطالة التكنولوجية الجماعية في غير محلها إذاً — وهي ضرب من "مغالطة كتلة العمل".\n\nتشير التحليلات الأكثر تحفظاً إلى أن وتيرة التحوّل الراهن ربما تحول دون التكيّف التدريجي الذي لطّف تاريخياً الاضطراب المهني. حين تختفي الوظائف بأسرع من إنشاء وظائف جديدة، أو حين تكون المهارات التي تتطلبها الصناعات الناشئة بعيدة المنال عن العمال المُهجَّرين، يمكن أن تكون العواقب الاجتماعية — في صورة بطالة وضغط على الأجور وتفاوت — وخيمة.\n\nما يبدو واضحاً هو أن مستقبل العمل ستُشكّله الخيارات السياسية أكثر مما تُشكّله الحتمية التكنولوجية. كيف تختار المجتمعات الاستثمار في التعليم وإعادة التدريب وتنظيم العمل الآلي وهيكلة الحماية الاجتماعية وتوزيع مكاسب الإنتاجية الناجمة عن الأتمتة — هذا ما سيحدد ما إذا كان التقدم التكنولوجي يُترجَم إلى ازدهار مشترك على نطاق واسع أم إلى تعمّق التطبّق الاقتصادي.	C1	5	2026-04-09 20:30:06.298036+00
116	Gig Workers Fighting for Their Rights	عمال الغيغ يناضلون من أجل حقوقهم	The gig economy has transformed the way millions of people work around the world. Platforms like Uber, Deliveroo, and Fiverr offer workers the flexibility to choose their own hours and work independently. However, this freedom often comes at a significant cost, as most gig workers lack access to basic employment benefits such as paid leave, health insurance, and pension contributions.\n\nIn recent years, workers have begun pushing back against these conditions. Legal battles in several countries have forced courts to reconsider whether gig workers should be classified as employees rather than independent contractors. A landmark ruling in the United Kingdom determined that Uber drivers were entitled to minimum wage guarantees and holiday pay.\n\nDespite these victories, campaigners argue that much more needs to be done. As the gig economy continues to expand rapidly, governments face increasing pressure to modernise labour laws and ensure that all workers, regardless of their employment status, receive fair and adequate protection.	غيّر اقتصاد الغيغ الطريقةَ التي يعمل بها ملايين الأشخاص حول العالم. تتيح منصات مثل أوبر وديليفرو وفايفر للعمال المرونةَ في اختيار ساعات عملهم والعمل بشكل مستقل. غير أن هذه الحرية كثيرًا ما تأتي بتكلفة باهظة، إذ يفتقر معظم عمال الغيغ إلى المزايا الوظيفية الأساسية كالإجازات مدفوعة الأجر والتأمين الصحي ومساهمات التقاعد.\n\nفي السنوات الأخيرة، بدأ العمال يتصدّون لهذه الأوضاع. وقد أجبرت المعارك القانونية في دول عديدة المحاكمَ على إعادة النظر في تصنيف عمال الغيغ، هل ينبغي اعتبارهم موظفين أم متعاقدين مستقلين. وقضت محكمة بريطانية في حكم بارز بأن سائقي أوبر يستحقون ضمانات الحد الأدنى للأجر وبدل الإجازة.\n\nورغم هذه الانتصارات، يرى الناشطون أن ثمة الكثير مما يجب فعله. ومع التوسع السريع لاقتصاد الغيغ، تواجه الحكومات ضغوطًا متزايدة لتحديث قوانين العمل وضمان حصول جميع العمال، بصرف النظر عن وضعهم الوظيفي، على حماية عادلة وكافية.	B2	11	2026-04-09 21:22:32.084249+00
21	A Quiet Morning at the Library	صباح هادئ في المكتبة	Every Saturday morning, Sara walks to the local library near her home. She loves the quiet atmosphere and the smell of old books. The library opens at nine o'clock, and Sara usually arrives early to find a good seat by the window.\n\nShe borrows two or three books each week. Last Saturday, she found a great book about cooking and another one about animals. The librarian helped her find them quickly.\n\nSara thinks the library is a wonderful place to learn and relax. She always leaves feeling happy and ready for the rest of her day.	كل صباح يوم السبت، تمشي سارة إلى المكتبة المحلية القريبة من منزلها. تحب الأجواء الهادئة ورائحة الكتب القديمة. تفتح المكتبة في التاسعة صباحاً، وعادةً ما تصل سارة مبكراً لتجد مقعداً جيداً بجانب النافذة.\n\nتستعير كتابين أو ثلاثة كل أسبوع. في السبت الماضي، وجدت كتاباً رائعاً عن الطبخ وآخر عن الحيوانات. ساعدها أمين المكتبة في إيجادهما بسرعة.\n\nتعتقد سارة أن المكتبة مكان رائع للتعلم والاسترخاء. وهي دائماً تغادر وهي سعيدة ومستعدة لبقية يومها.	A2	6	2026-04-09 21:01:29.123305+00
22	Learning to Cook Pasta at Home	تعلّم طهي المعكرونة في المنزل	Ahmed decided to cook dinner for his family last Friday. He chose pasta because it is simple and easy to make. First, he boiled water in a large pot and added a little salt. Then he put the pasta in and waited for twelve minutes.\n\nWhile the pasta was cooking, he made a tomato sauce. He used tomatoes, garlic, and olive oil. He mixed everything together and let it cook slowly on low heat.\n\nWhen the food was ready, his family sat together and enjoyed the meal. His mother said it was delicious. Ahmed felt very proud and decided to cook more often.	قرر أحمد طهي العشاء لعائلته الجمعة الماضية. اختار المعكرونة لأنها بسيطة وسهلة التحضير. أولاً، أغلى الماء في قدر كبير وأضاف القليل من الملح. ثم وضع المعكرونة وانتظر اثنتي عشرة دقيقة.\n\nبينما كانت المعكرونة تُطهى، حضّر صلصة الطماطم. استخدم الطماطم والثوم وزيت الزيتون. خلط كل شيء معاً وتركه يُطهى ببطء على نار هادئة.\n\nعندما كان الطعام جاهزاً، جلست عائلته معاً واستمتعوا بالوجبة. قالت أمه إنها كانت لذيذة. شعر أحمد بالفخر الشديد وقرر أن يطبخ أكثر.	A2	7	2026-04-09 21:01:29.470138+00
23	Taking the Bus to Work	أخذ الحافلة إلى العمل	Maria takes the bus to work every day. She wakes up at seven o'clock and walks five minutes to the bus stop. The number 14 bus comes every twenty minutes, so she checks the timetable on her phone before leaving home.\n\nShe buys a monthly bus pass because it is cheaper than paying every day. On the bus, she usually reads a book or listens to music. The journey takes about thirty minutes, and she arrives at work feeling relaxed.\n\nMaria likes taking the bus because she does not need to worry about traffic or parking. It is also better for the environment.	تأخذ ماريا الحافلة إلى العمل كل يوم. تستيقظ في السابعة صباحاً وتمشي خمس دقائق إلى محطة الحافلة. تأتي الحافلة رقم 14 كل عشرين دقيقة، لذا تتحقق من الجدول الزمني على هاتفها قبل مغادرة المنزل.\n\nتشتري تصريح حافلة شهري لأنه أرخص من الدفع كل يوم. في الحافلة، عادةً ما تقرأ كتاباً أو تستمع إلى الموسيقى. تستغرق الرحلة حوالي ثلاثين دقيقة، وتصل إلى العمل وهي تشعر بالراحة.\n\nتحب ماريا أخذ الحافلة لأنها لا تحتاج إلى القلق بشأن حركة المرور أو مواقف السيارات. كما أنها أفضل للبيئة.	A2	8	2026-04-09 21:01:29.474761+00
24	Making New Friends at the Office	تكوين صداقات جديدة في المكتب	On his first day at the new job, James felt a little nervous. He did not know anyone in the office. During the morning break, he went to the kitchen to make coffee. A woman named Lisa was already there and smiled at him warmly.\n\nLisa introduced herself and asked James about his previous job. They talked for a few minutes and discovered they both liked football. She invited him to have lunch with her team.\n\nAt lunch, James met three more colleagues. Everyone was friendly and welcoming. By the end of the day, James felt much more comfortable and was happy he had started this new job.	في يومه الأول في وظيفته الجديدة، شعر جيمس بالتوتر قليلاً. لم يكن يعرف أحداً في المكتب. خلال استراحة الصباح، ذهب إلى المطبخ لإعداد القهوة. كانت امرأة تُدعى ليزا هناك بالفعل وابتسمت له بدفء.\n\nقدّمت ليزا نفسها وسألت جيمس عن وظيفته السابقة. تحدثا لبضع دقائق واكتشفا أن كليهما يحبان كرة القدم. دعته لتناول الغداء مع فريقها.\n\nفي الغداء، التقى جيمس بثلاثة زملاء آخرين. كان الجميع ودودين ومرحّبين. بنهاية اليوم، شعر جيمس براحة أكبر وكان سعيداً لأنه بدأ هذه الوظيفة الجديدة.	A2	9	2026-04-09 21:01:29.479492+00
25	Shopping for Clothes on Saturday	التسوق للملابس يوم السبت	Last Saturday, Nadia went shopping for new clothes. She needed a warm jacket for winter and a pair of comfortable trousers for work. She went to a large shopping centre in the city centre because it has many different shops.\n\nIn the first shop, she found a blue jacket she liked. She tried it on and it fitted perfectly. The price was reasonable, so she bought it. In the next shop, she found black trousers that were on sale. She saved fifteen pounds.\n\nAfter two hours of shopping, Nadia was tired but happy. She had everything she needed. She stopped at a café for a hot drink before going home.	السبت الماضي، ذهبت ناديا للتسوق لشراء ملابس جديدة. كانت بحاجة إلى جاكيت دافئ للشتاء وبنطال مريح للعمل. ذهبت إلى مركز تسوق كبير في وسط المدينة لأن فيه محلات مختلفة كثيرة.\n\nفي المحل الأول، وجدت جاكيتاً أزرق أعجبها. جرّبته فناسبها تماماً. كان السعر معقولاً فاشترته. في المحل التالي، وجدت بنطالاً أسود كان في تخفيضات. وفّرت خمسة عشر جنيهاً.\n\nبعد ساعتين من التسوق، كانت ناديا متعبة لكنها سعيدة. حصلت على كل ما تحتاجه. توقفت في مقهى لتشرب مشروباً ساخناً قبل العودة إلى المنزل.	A2	10	2026-04-09 21:01:29.483105+00
26	A Special Birthday Party for Sara	حفلة عيد ميلاد مميزة لسارة	Last Saturday, Sara had a birthday party at her house. She invited ten friends from school. Her mother made a big chocolate cake with pink flowers on top. Everyone sang the birthday song and Sara smiled happily.\n\nThe friends played games in the garden and listened to music. Sara opened her presents and said thank you to everyone. She received books, colourful pens, and a small toy.\n\nAt the end of the party, Sara's father took photos of everyone. Sara said it was the best birthday she ever had. Her friends went home feeling very happy.	الأسبوع الماضي يوم السبت، أقامت سارة حفلة عيد ميلاد في منزلها. دعت عشرة أصدقاء من المدرسة. صنعت والدتها كعكة شوكولاتة كبيرة مزينة بزهور وردية اللون. غنى الجميع أغنية عيد الميلاد وابتسمت سارة بسعادة.\n\nلعب الأصدقاء ألعاباً في الحديقة واستمعوا إلى الموسيقى. فتحت سارة هداياها وشكرت الجميع. حصلت على كتب وأقلام ملونة ولعبة صغيرة.\n\nفي نهاية الحفلة، التقط والد سارة صوراً للجميع. قالت سارة إنه كان أجمل عيد ميلاد في حياتها. عاد أصدقاؤها إلى منازلهم وهم سعداء جداً.	A2	11	2026-04-09 21:02:19.81459+00
27	My Healthy Morning Exercise Routine	روتيني الصباحي الصحي للتمرين	Every morning, Ahmed wakes up at six o'clock. He drinks a glass of water and puts on his sports shoes. Then he goes to the park near his house to exercise. He likes to run for thirty minutes along the path by the trees.\n\nAfter running, Ahmed does some simple stretching exercises for his arms and legs. He breathes slowly and feels relaxed. Sometimes his neighbour joins him and they exercise together.\n\nWhen Ahmed returns home, he takes a shower and eats a healthy breakfast with eggs and fruit. He feels strong and ready for the day ahead.	كل صباح، يستيقظ أحمد في الساعة السادسة. يشرب كوباً من الماء ويرتدي حذاءه الرياضي. ثم يذهب إلى الحديقة القريبة من منزله للتمرين. يحب أن يركض لمدة ثلاثين دقيقة على الممر المحاذي للأشجار.\n\nبعد الركض، يقوم أحمد ببعض تمارين التمدد البسيطة لذراعيه وساقيه. يتنفس ببطء ويشعر بالاسترخاء. أحياناً يرافقه جاره ويتمرنان معاً.\n\nعندما يعود أحمد إلى المنزل، يأخذ دشاً ويتناول فطوراً صحياً يحتوي على البيض والفاكهة. يشعر بقوة وجاهزية لمواجهة يومه.	A2	12	2026-04-09 21:02:19.822402+00
28	Visiting the Doctor for a Check-up	زيارة الطبيب لإجراء فحص طبي	Mia was not feeling well last Monday. She had a sore throat and a headache. Her mother called the doctor's office and made an appointment for the afternoon. Mia felt a little nervous about going.\n\nAt the clinic, a friendly nurse checked Mia's temperature and blood pressure. Then the doctor came in and asked Mia some questions. He looked at her throat with a small light and listened to her chest.\n\nThe doctor said Mia had a small infection. He gave her mother a prescription for medicine. He told Mia to rest, drink water, and eat warm soup. Mia felt better after two days.	لم تكن ميا تشعر بصحة جيدة يوم الاثنين الماضي. كانت تعاني من التهاب في الحلق وصداع. اتصلت والدتها بعيادة الطبيب وحجزت موعداً في فترة بعد الظهر. شعرت ميا ببعض التوتر من الذهاب.\n\nفي العيادة، قاست ممرضة لطيفة درجة حرارة ميا وضغط دمها. ثم دخل الطبيب وطرح على ميا بعض الأسئلة. فحص حلقها بمصباح صغير واستمع إلى صدرها.\n\nقال الطبيب إن ميا تعاني من التهاب بسيط. أعطى والدتها وصفة طبية للدواء. وأخبر ميا بالراحة وشرب الماء وتناول الحساء الدافئ. شعرت ميا بتحسن بعد يومين.	A2	13	2026-04-09 21:02:19.825668+00
29	How to Send a Professional Email	كيفية إرسال بريد إلكتروني احترافي	Sending an email is easy and useful. First, you need to open your email account on a computer or phone. Click the button that says 'Compose' or 'New Message'. Type the email address of the person you want to contact in the 'To' box.\n\nNext, write a short subject in the subject line. For example, you can write 'Question about the meeting'. In the main area, write your message clearly. Start with a greeting like 'Dear Mr Ali' and finish with 'Kind regards' and your name.\n\nBefore you send the email, read it again carefully. Check for spelling mistakes. When you are happy, click 'Send'. The person will receive your email very quickly.	إرسال البريد الإلكتروني أمر سهل ومفيد. أولاً، تحتاج إلى فتح حساب بريدك الإلكتروني على الحاسوب أو الهاتف. انقر على زر 'إنشاء' أو 'رسالة جديدة'. اكتب عنوان البريد الإلكتروني للشخص الذي تريد التواصل معه في خانة 'إلى'.\n\nبعد ذلك، اكتب موضوعاً قصيراً في خانة الموضوع. على سبيل المثال، يمكنك كتابة 'سؤال حول الاجتماع'. في المنطقة الرئيسية، اكتب رسالتك بوضوح. ابدأ بتحية مثل 'عزيزي السيد علي' وأنهِ بـ 'مع أطيب التحيات' واسمك.\n\nقبل إرسال البريد الإلكتروني، اقرأه مرة أخرى بعناية. تحقق من الأخطاء الإملائية. عندما تكون راضياً، انقر على 'إرسال'. سيصل بريدك الإلكتروني للشخص بسرعة كبيرة.	A2	14	2026-04-09 21:02:19.829715+00
30	Learning to Ride a Bicycle Together	تعلم ركوب الدراجة معاً	Last summer, Karim decided to learn how to ride a bicycle. His older brother Hassan agreed to help him. They went to a large quiet car park where there was plenty of space. Karim felt excited but also a little scared.\n\nHassan held the back of the bicycle while Karim sat on the seat and held the handlebars. Karim pushed the pedals slowly. He fell off two times, but Hassan told him not to give up. They practised every afternoon for one week.\n\nOn the seventh day, Karim rode the bicycle alone without any help. He laughed with joy and felt very proud. Hassan clapped and said he was an excellent student.	في الصيف الماضي، قرر كريم تعلم ركوب الدراجة. وافق أخوه الأكبر حسان على مساعدته. ذهبا إلى موقف سيارات كبير وهادئ حيث كان هناك مساحة كافية. شعر كريم بالإثارة لكنه كان خائفاً قليلاً أيضاً.\n\nأمسك حسان بالجزء الخلفي من الدراجة بينما جلس كريم على المقعد وأمسك بالمقود. ضغط كريم على الدواسات ببطء. سقط مرتين، لكن حسان أخبره بعدم الاستسلام. تدربا كل فترة ما بعد الظهر لمدة أسبوع.\n\nفي اليوم السابع، ركب كريم الدراجة وحده دون أي مساعدة. ضحك من شدة الفرح وشعر بالفخر الشديد. صفق حسان وقال إنه طالب ممتاز.	A2	15	2026-04-09 21:02:19.833371+00
31	A Rainy Day Spent at Home	يوم ممطر في المنزل	Last Saturday, it rained all day. The sky was grey and the streets were wet. Sara decided to stay inside and enjoy a quiet day at home.\n\nShe made a hot cup of tea and sat near the window. She watched the rain fall on the garden and read her favourite book. Later, she baked some cookies and listened to soft music.\n\nBy evening, Sara felt very relaxed. She thought that rainy days at home could be really nice. Sometimes, doing simple things is the best way to rest.	في الأسبوع الماضي، أمطرت طوال اليوم. كانت السماء رمادية والشوارع مبللة. قررت سارة أن تبقى في المنزل وتستمتع بيوم هادئ.\n\nأعدّت كوبًا من الشاي الساخن وجلست بالقرب من النافذة. راقبت المطر وهو يسقط على الحديقة وقرأت كتابها المفضل. لاحقًا، خبزت بعض الكعك واستمعت إلى موسيقى هادئة.\n\nبحلول المساء، شعرت سارة بالاسترخاء التام. فكّرت أن الأيام الممطرة في المنزل يمكن أن تكون جميلة حقًا. أحيانًا، فعل الأشياء البسيطة هو أفضل طريقة للراحة.	A2	16	2026-04-09 21:03:07.617174+00
32	Our Exciting Trip to the Museum	رحلتنا المثيرة إلى المتحف	Last week, our class went on a school trip to the city museum. We travelled by bus and arrived there at ten o'clock in the morning. Everyone was very excited.\n\nInside the museum, we saw old maps, ancient tools, and beautiful paintings. Our teacher explained the history of each object. We asked many questions and learned a lot of new things.\n\nBefore we left, we bought small souvenirs from the museum shop. On the bus back to school, everyone talked about their favourite part of the trip. It was a wonderful and educational day.	الأسبوع الماضي، ذهب صفنا في رحلة مدرسية إلى متحف المدينة. سافرنا بالحافلة ووصلنا هناك في العاشرة صباحًا. كان الجميع متحمسًا جدًا.\n\nداخل المتحف، رأينا خرائط قديمة وأدوات أثرية ولوحات جميلة. شرح لنا معلمنا تاريخ كل قطعة. طرحنا أسئلة كثيرة وتعلمنا أشياء جديدة كثيرة.\n\nقبل مغادرتنا، اشترينا تذكارات صغيرة من متجر المتحف. في الحافلة عائدين إلى المدرسة، تحدث الجميع عن جزئهم المفضل من الرحلة. كان يومًا رائعًا ومفيدًا.	A2	17	2026-04-09 21:03:07.6562+00
33	A Long Call with My Family	مكالمة طويلة مع عائلتي	Ahmed lives far from his family. He moved to a new city for work six months ago. Every Sunday evening, he calls his parents to talk and share news.\n\nLast Sunday, he spoke with his mother for almost one hour. She told him about his sister's new job and the family dinner they had on Friday. Ahmed felt happy to hear their voices and know they were well.\n\nAfter the call, Ahmed made dinner and smiled to himself. Even though he was far away, the phone call made him feel close to home. He could not wait for next Sunday.	يعيش أحمد بعيدًا عن عائلته. انتقل إلى مدينة جديدة للعمل منذ ستة أشهر. كل أحد مساءً، يتصل بوالديه ليتحدث معهم ويشاركهم الأخبار.\n\nفي الأحد الماضي، تحدث مع والدته لمدة قاربت الساعة. أخبرته عن عمل أخته الجديد وعشاء العائلة الذي أقاموه يوم الجمعة. شعر أحمد بالسعادة حين سمع أصواتهم وعلم أنهم بخير.\n\nبعد المكالمة، أعد أحمد العشاء وابتسم في سره. على الرغم من بُعده، جعلته المكالمة يشعر بالقرب من المنزل. كان يتطلع بفارغ الصبر إلى الأحد القادم.	A2	18	2026-04-09 21:03:07.660186+00
34	We Painted the Living Room Together	طلينا غرفة المعيشة معًا	Last weekend, Layla and her brother decided to paint the living room. They chose a light blue colour because it looked calm and fresh. They bought paint, brushes, and plastic sheets to cover the floor.\n\nThey started early in the morning. First, they moved the furniture to the centre of the room. Then, they painted the walls carefully. It took about four hours to finish. They laughed a lot and made a small mess.\n\nWhen the paint dried, the room looked completely different. Layla was very happy with the result. Her brother said it was the most fun he had all month.	في عطلة نهاية الأسبوع الماضية، قررت ليلى وأخوها طلاء غرفة المعيشة. اختارا اللون الأزرق الفاتح لأنه بدا هادئًا ومنعشًا. اشترا الطلاء والفراشي وأغطية بلاستيكية لتغطية الأرضية.\n\nبدآ مبكرًا في الصباح. أولًا، نقلا الأثاث إلى وسط الغرفة. ثم طليا الجدران بعناية. استغرق الأمر نحو أربع ساعات لإنهاء العمل. ضحكا كثيرًا وأحدثا فوضى صغيرة.\n\nعندما جفّ الطلاء، بدت الغرفة مختلفة تمامًا. كانت ليلى سعيدة جدًا بالنتيجة. قال أخوها إنه كان أكثر شيء ممتع قضاه طوال الشهر.	A2	19	2026-04-09 21:03:07.664047+00
35	A Fun Day at the Zoo	يوم ممتع في حديقة الحيوانات	On Friday, Mia and her family visited the local zoo. It was a sunny day and many families were there. Mia's little brother was very excited because it was his first time at the zoo.\n\nThey saw lions, elephants, monkeys, and colourful birds. Mia's favourite animal was the giraffe because of its long neck. A zookeeper told them interesting facts about each animal and how they eat and sleep.\n\nAt lunchtime, they sat on the grass and ate sandwiches. Before leaving, they took many photos near the flamingos. Mia's brother said he wanted to come back every week. It was a perfect family day out.	يوم الجمعة، زارت ميا وعائلتها حديقة الحيوانات المحلية. كان الجو مشمسًا وكان هناك كثير من العائلات. كان أخو ميا الصغير متحمسًا جدًا لأنها كانت زيارته الأولى لحديقة الحيوانات.\n\nرأوا أسودًا وأفيالًا وقردة وطيورًا ملونة. كان الحيوان المفضل لميا هو الزرافة بسبب رقبتها الطويلة. أخبرهم حارس الحديقة بحقائق مثيرة عن كل حيوان وطريقة أكله ونومه.\n\nوقت الغداء، جلسوا على العشب وأكلوا السندويشات. قبل المغادرة، التقطوا صورًا كثيرة بالقرب من طيور الفلامنغو. قال أخو ميا إنه يريد العودة كل أسبوع. كان يومًا عائليًا مثاليًا.	A2	20	2026-04-09 21:03:07.667131+00
36	A Special Dinner at the Restaurant	عشاء مميز في المطعم	Last Saturday, Maria and her family went to a new Italian restaurant in the city centre. The restaurant was very clean and the staff were friendly. Maria looked at the menu and chose pasta with tomato sauce. Her children ordered pizza.\n\nThe food arrived after twenty minutes. It smelled wonderful and tasted delicious. The waiter brought extra bread and asked if everything was okay. Maria said the meal was excellent.\n\nAt the end of the evening, they paid the bill and left a tip for the waiter. The whole family agreed they would return to the restaurant very soon.	الأسبوع الماضي، ذهبت ماريا وعائلتها إلى مطعم إيطالي جديد في وسط المدينة. كان المطعم نظيفاً جداً والموظفون كانوا ودودين. نظرت ماريا إلى القائمة واختارت المعكرونة بصلصة الطماطم. طلب أطفالها البيتزا.\n\nوصل الطعام بعد عشرين دقيقة. كانت رائحته رائعة وطعمه لذيذاً. أحضر النادل خبزاً إضافياً وسأل إذا كان كل شيء على ما يرام. قالت ماريا إن الوجبة كانت ممتازة.\n\nفي نهاية المساء، دفعوا الفاتورة وتركوا إكرامية للنادل. اتفقت العائلة بأكملها على أنهم سيعودون إلى المطعم قريباً جداً.	A2	21	2026-04-09 21:03:56.382458+00
37	The Search for a Lost Pet	البحث عن حيوان أليف مفقود	One morning, Tom woke up and noticed that his small dog, Biscuit, was not in the house. He looked in every room but could not find him. Tom felt very worried and went outside to search the neighbourhood.\n\nHe walked around the streets and called Biscuit's name loudly. He also asked his neighbours if they had seen the dog. One neighbour said she saw a small brown dog near the park.\n\nTom ran to the park and found Biscuit sitting under a big tree. He was very happy and hugged his dog tightly. He put a new collar with his phone number on Biscuit that same afternoon.	في صباح أحد الأيام، استيقظ توم ولاحظ أن كلبه الصغير، بسكويت، لم يكن في المنزل. بحث في كل غرفة لكنه لم يجده. شعر توم بقلق شديد وخرج للبحث في الحي.\n\nسار في الشوارع ونادى باسم بسكويت بصوت عالٍ. كما سأل جيرانه إذا كانوا قد رأوا الكلب. قالت إحدى الجارات إنها رأت كلباً صغيراً بنياً بالقرب من الحديقة.\n\nركض توم إلى الحديقة ووجد بسكويت جالساً تحت شجرة كبيرة. كان سعيداً جداً وعانق كلبه بقوة. وضع طوقاً جديداً عليه يحمل رقم هاتفه في نفس الظهيرة.	A2	22	2026-04-09 21:03:56.398698+00
38	Growing Vegetables in the Garden	زراعة الخضروات في الحديقة	Sara decided to plant a small vegetable garden in her backyard. She bought seeds for tomatoes, cucumbers, and carrots from the local shop. First, she prepared the soil by digging it carefully and removing old plants and stones.\n\nEvery morning, Sara watered the plants and checked if they were growing well. She also added some plant food to the soil each week. After two months, small green vegetables began to appear on the plants.\n\nBy summer, Sara had many fresh vegetables to eat and share with her neighbours. She felt proud of her work and decided to plant more vegetables the following year.	قررت سارة زراعة حديقة خضروات صغيرة في فنائها الخلفي. اشترت بذور الطماطم والخيار والجزر من المتجر المحلي. أولاً، أعدت التربة بحفرها بعناية وإزالة النباتات القديمة والحجارة.\n\nكل صباح، كانت سارة تسقي النباتات وتتحقق من نموها بشكل جيد. كما كانت تضيف سماداً للتربة كل أسبوع. بعد شهرين، بدأت خضروات خضراء صغيرة بالظهور على النباتات.\n\nبحلول الصيف، كان لدى سارة الكثير من الخضروات الطازجة لتأكلها وتشاركها مع جيرانها. شعرت بالفخر من عملها وقررت زراعة المزيد من الخضروات في العام التالي.	A2	23	2026-04-09 21:03:56.402384+00
39	Writing a Letter to an Old Friend	كتابة رسالة إلى صديق قديم	Ahmed decided to write a letter to his old school friend, Carlos, who now lived in Spain. He sat at his desk and thought about what to write. He wanted to share news about his new job and his family.\n\nAhmed wrote about his life in a simple and friendly way. He told Carlos about his new apartment, his hobbies, and a funny story about his cat. He also asked Carlos questions about his life and invited him to visit.\n\nWhen he finished, Ahmed read the letter again and added a friendly ending. He put the letter in an envelope, wrote the address carefully, and walked to the post office to send it.	قرر أحمد كتابة رسالة إلى صديقه القديم من المدرسة، كارلوس، الذي يعيش الآن في إسبانيا. جلس على مكتبه وفكر فيما سيكتب. أراد مشاركة أخبار عن وظيفته الجديدة وعائلته.\n\nكتب أحمد عن حياته بأسلوب بسيط وودود. أخبر كارلوس عن شقته الجديدة وهواياته وقصة مضحكة عن قطته. كما طرح على كارلوس أسئلة عن حياته ودعاه للزيارة.\n\nعندما انتهى، قرأ أحمد الرسالة مرة أخرى وأضاف خاتمة ودية. وضع الرسالة في مظروف وكتب العنوان بعناية ومشى إلى مكتب البريد لإرسالها.	A2	24	2026-04-09 21:03:56.406005+00
40	An Exciting Local Football Match	مباراة كرة قدم محلية مثيرة	Last Sunday, the two best teams in the town played a football match at the local stadium. Hundreds of people came to watch and the crowd was very loud and excited. Both teams wore bright colours and the players looked ready to win.\n\nThe first half was very close with no goals. In the second half, a young player from the home team scored a beautiful goal. The crowd jumped and cheered loudly. The other team tried hard but could not score.\n\nThe match ended one to zero. The winning team celebrated on the field while fans took photos and waved their scarves. Everyone said it was a fantastic afternoon of football.	الأحد الماضي، لعب أفضل فريقين في المدينة مباراة كرة قدم في الملعب المحلي. جاء المئات من الناس للمشاهدة وكان الجمهور صاخباً ومتحمساً جداً. ارتدى الفريقان ألواناً زاهية وبدا اللاعبون مستعدين للفوز.\n\nكانت الشوط الأول متقارباً جداً دون أهداف. في الشوط الثاني، سجل لاعب شاب من الفريق المضيف هدفاً جميلاً. قفز الجمهور وهتف بصوت عالٍ. حاول الفريق الآخر بجد لكنه لم يستطع التسجيل.\n\nانتهت المباراة بنتيجة واحد لصفر. احتفل الفريق الفائز في الملعب بينما التقط المشجعون الصور وهزوا أوشحتهم. قال الجميع إنه كان بعد ظهر رائع من كرة القدم.	A2	25	2026-04-09 21:03:56.409148+00
41	My First Visit to the Dentist	زيارتي الأولى لطبيب الأسنان	Last week, Sara went to the dentist for the first time. She felt a little nervous when she sat in the big chair. The dentist smiled and said, "Don't worry. I will be very gentle." Sara felt better after hearing that.\n\nThe dentist checked all of Sara's teeth carefully. He told her that two of her teeth had small problems. He cleaned her teeth and gave her some medicine. The whole visit took about thirty minutes.\n\nWhen Sara left the clinic, she felt happy and relieved. She learned that visiting the dentist is not scary at all. Now she plans to go every six months.	الأسبوع الماضي، ذهبت سارة إلى طبيب الأسنان للمرة الأولى. شعرت بقليل من التوتر عندما جلست على الكرسي الكبير. ابتسم الطبيب وقال: "لا تقلقي، سأكون لطيفاً جداً." شعرت سارة بتحسن بعد أن سمعت ذلك.\n\nفحص الطبيب جميع أسنان سارة بعناية. أخبرها أن اثنتين من أسنانها بها مشاكل صغيرة. نظّف أسنانها وأعطاها بعض الدواء. استغرقت الزيارة بأكملها حوالي ثلاثين دقيقة.\n\nعندما غادرت سارة العيادة، شعرت بالسعادة والارتياح. تعلمت أن زيارة طبيب الأسنان ليست مخيفة على الإطلاق. الآن تخطط للذهاب كل ستة أشهر.	A2	26	2026-04-09 21:04:42.935148+00
42	Getting Ready for a Big Exam	الاستعداد لامتحان مهم	Ahmed had an important English exam in three days. He was worried because he had not studied enough. He decided to make a simple study plan to help him prepare.\n\nEvery morning, Ahmed read new vocabulary words and wrote them in a notebook. In the afternoon, he practised reading short passages and answered questions about them. He also asked his friend Layla to help him practise speaking English for thirty minutes each day.\n\nOn the day of the exam, Ahmed felt calm and ready. He answered most of the questions correctly. When he received his results, he was very proud of himself.	كان أحمد لديه امتحان إنجليزي مهم بعد ثلاثة أيام. كان قلقاً لأنه لم يدرس بما فيه الكفاية. قرر أن يضع خطة دراسة بسيطة لمساعدته على الاستعداد.\n\nكل صباح، قرأ أحمد كلمات مفردات جديدة وكتبها في دفتر. في فترة بعد الظهر، تدرّب على قراءة نصوص قصيرة وأجاب على أسئلة حولها. طلب أيضاً من صديقته ليلى مساعدته في التدرب على التحدث بالإنجليزية لمدة ثلاثين دقيقة كل يوم.\n\nفي يوم الامتحان، شعر أحمد بالهدوء والاستعداد. أجاب على معظم الأسئلة بشكل صحيح. عندما حصل على نتائجه، كان فخوراً جداً بنفسه.	A2	27	2026-04-09 21:04:42.939471+00
43	Learning a Beautiful New Song	تعلّم أغنية جديدة جميلة	Mia wanted to learn a new song for her school concert. She chose a simple but beautiful song about nature. She listened to it many times on her phone to remember the melody well.\n\nEvery evening, Mia practised singing the song in her bedroom. At first, she made many mistakes with the words and the rhythm. Her mother helped her by clapping her hands to keep the beat. Slowly, Mia started to improve.\n\nAfter two weeks of practice, Mia performed the song perfectly at the concert. Everyone clapped loudly and her teacher said she did an excellent job. Mia felt very happy.	أرادت ميا تعلم أغنية جديدة لحفل مدرستها. اختارت أغنية بسيطة لكنها جميلة عن الطبيعة. استمعت إليها كثيراً على هاتفها لتتذكر اللحن جيداً.\n\nكل مساء، تدربت ميا على غناء الأغنية في غرفتها. في البداية، ارتكبت كثيراً من الأخطاء في الكلمات والإيقاع. ساعدتها أمها بالتصفيق لمتابعة الإيقاع. ببطء، بدأت ميا تتحسن.\n\nبعد أسبوعين من التدريب، أدّت ميا الأغنية بشكل مثالي في الحفل. صفّق الجميع بحرارة وقال معلمها إنها أدت عملاً رائعاً. شعرت ميا بسعادة كبيرة.	A2	28	2026-04-09 21:04:42.942632+00
44	Our Exciting Trip to the Forest	رحلتنا المثيرة إلى الغابة	Last summer, Tom and his family went on a camping trip to the forest. They packed food, sleeping bags, and warm clothes into their car. Tom was very excited because it was his first time sleeping outside.\n\nWhen they arrived, they set up their tent near a small river. Tom helped his father collect dry wood to make a fire. In the evening, they cooked simple food over the fire and told funny stories together.\n\nThat night, Tom looked up at the sky and saw thousands of bright stars. He had never seen so many stars before. He decided that camping was his favourite activity.	في الصيف الماضي، ذهب توم وعائلته في رحلة تخييم إلى الغابة. حزموا الطعام وأكياس النوم والملابس الدافئة في سيارتهم. كان توم متحمساً جداً لأنه كانت المرة الأولى التي ينام فيها في الخارج.\n\nعندما وصلوا، نصبوا خيمتهم بالقرب من نهر صغير. ساعد توم والده في جمع الخشب الجاف لإشعال النار. في المساء، طبخوا طعاماً بسيطاً على النار وتبادلوا قصصاً مضحكة معاً.\n\nفي تلك الليلة، نظر توم إلى السماء ورأى آلاف النجوم المضيئة. لم يسبق له أن رأى هذا العدد الكبير من النجوم. قرر أن التخييم هو نشاطه المفضل.	A2	29	2026-04-09 21:04:42.945671+00
45	Finding the Perfect Birthday Gift	إيجاد هدية عيد الميلاد المثالية	Nour wanted to buy a special gift for her best friend's birthday. She went to the shopping mall with her mother to look for something nice. She did not know what to buy at first.\n\nNour walked around many shops and looked at different things. She saw some books, some jewellery, and some clothes. Then she remembered that her friend loved drawing. She found a beautiful set of coloured pencils and a sketchbook in an art shop.\n\nNour bought the gift and wrapped it carefully with pretty paper and a ribbon. When her friend opened it, she smiled and hugged Nour tightly. It was truly the perfect gift.	أرادت نور شراء هدية مميزة لعيد ميلاد صديقتها المقربة. ذهبت إلى مركز التسوق مع أمها للبحث عن شيء جميل. لم تكن تعرف ماذا تشتري في البداية.\n\nتجوّلت نور في متاجر كثيرة ونظرت إلى أشياء مختلفة. رأت بعض الكتب والمجوهرات والملابس. ثم تذكرت أن صديقتها تحب الرسم. وجدت طقماً جميلاً من أقلام التلوين ودفتر رسم في متجر للفنون.\n\nاشترت نور الهدية ولفّتها بعناية بورق جميل وشريط. عندما فتحتها صديقتها، ابتسمت واحتضنت نور بقوة. كانت حقاً الهدية المثالية.	A2	30	2026-04-09 21:04:42.948087+00
46	Helping My Neighbour Move House	مساعدة جاري في الانتقال إلى منزل جديد	Last Saturday, my neighbour Mr. Ahmed told me he was moving to a new apartment. He looked tired and worried because he had many heavy boxes. I decided to help him right away.\n\nI called two friends, and we all went to his house in the morning. We carried boxes, moved furniture, and cleaned the old rooms. It was hard work, but we finished everything by the afternoon.\n\nMr. Ahmed was very happy and grateful. He made us a delicious meal to say thank you. Helping a neighbour felt wonderful, and we became much closer friends after that day.	في يوم السبت الماضي، أخبرني جاري السيد أحمد أنه سينتقل إلى شقة جديدة. بدا متعبًا وقلقًا لأن لديه صناديق ثقيلة كثيرة. قررت مساعدته على الفور.\n\nاتصلت بصديقين، وذهبنا جميعًا إلى منزله في الصباح. حملنا الصناديق، ونقلنا الأثاث، ونظفنا الغرف القديمة. كان العمل شاقًا، لكننا أنهينا كل شيء بحلول بعد الظهر.\n\nكان السيد أحمد سعيدًا وممتنًا جدًا. أعدّ لنا وجبة لذيذة شكرًا لنا. شعرت بسعادة كبيرة لمساعدة جار، وأصبحنا أصدقاء أكثر قربًا بعد ذلك اليوم.	A2	31	2026-04-09 21:05:32.649611+00
47	A Perfect Family Picnic Day	يوم نزهة عائلية رائع	Last Sunday, our family decided to have a picnic in the park near our home. My mother prepared sandwiches, fruit, and juice the night before. Everyone woke up early and felt very excited.\n\nWe found a nice spot under a large tree. The children played football while the adults talked and relaxed. We ate our food together and enjoyed the fresh air and warm sunshine.\n\nIn the afternoon, we walked around the lake and fed some ducks. By evening, everyone felt happy and relaxed. My father said it was the best family day we had in a long time.	في يوم الأحد الماضي، قررت عائلتنا القيام بنزهة في الحديقة القريبة من منزلنا. أعدّت أمي السندويشات والفاكهة والعصير في الليلة السابقة. استيقظ الجميع مبكرًا وكانوا متحمسين جدًا.\n\nوجدنا مكانًا جميلًا تحت شجرة كبيرة. لعب الأطفال كرة القدم بينما تحدث الكبار واسترخوا. تناولنا طعامنا معًا واستمتعنا بالهواء النقي وأشعة الشمس الدافئة.\n\nفي فترة بعد الظهر، تجولنا حول البحيرة وأطعمنا بعض البط. بحلول المساء، شعر الجميع بالسعادة والراحة. قال والدي إنه كان أفضل يوم عائلي مررنا به منذ وقت طويل.	A2	32	2026-04-09 21:05:32.688438+00
48	Finding the Right New Job	إيجاد الوظيفة الجديدة المناسبة	Sara worked in a small shop for three years, but she wanted a better job. She searched online every evening and found many interesting positions. She updated her CV and wrote careful application letters.\n\nAfter two weeks, a company called her for an interview. She prepared well by practising common questions with her sister. On the day of the interview, she wore smart clothes and arrived early. She spoke clearly and smiled confidently.\n\nOne week later, the company offered her the job. Sara was very excited and accepted immediately. She learned that preparation and confidence are the most important things in finding a good job.	عملت سارة في متجر صغير لمدة ثلاث سنوات، لكنها أرادت وظيفة أفضل. كانت تبحث على الإنترنت كل مساء ووجدت مناصب مثيرة للاهتمام كثيرة. حدّثت سيرتها الذاتية وكتبت رسائل طلب عمل بعناية.\n\nبعد أسبوعين، اتصلت بها إحدى الشركات لإجراء مقابلة. استعدت جيدًا بالتدرب على الأسئلة الشائعة مع أختها. في يوم المقابلة، ارتدت ملابس أنيقة ووصلت مبكرًا. تحدثت بوضوح وابتسمت بثقة.\n\nبعد أسبوع، عرضت عليها الشركة الوظيفة. كانت سارة متحمسة جدًا وقبلت على الفور. تعلمت أن الاستعداد والثقة هما أهم الأشياء في إيجاد وظيفة جيدة.	A2	33	2026-04-09 21:05:32.692318+00
49	Learning to Swim at Last	تعلّم السباحة أخيرًا	Khalid was twelve years old and afraid of water. All his friends could swim, but he always stayed at the side of the pool. His parents decided to find him a swimming teacher.\n\nHis teacher, Miss Nour, was kind and patient. She started with simple exercises in the shallow water. Every lesson, Khalid felt a little more comfortable. After one month, he could float and kick his legs without help.\n\nBy the end of summer, Khalid swam across the pool for the first time. His family cheered loudly. He felt so proud and free in the water. He wished he had learned to swim much earlier.	كان خالد في الثانية عشرة من عمره وكان يخاف من الماء. كان جميع أصدقائه يعرفون السباحة، لكنه كان يبقى دائمًا على جانب حوض السباحة. قرر والداه إيجاد معلم سباحة له.\n\nكانت معلمته الآنسة نور لطيفة وصبورة. بدأت بتمارين بسيطة في الجزء الضحل من الماء. في كل درس، كان خالد يشعر براحة أكبر قليلًا. بعد شهر واحد، أصبح قادرًا على الطفو وتحريك قدميه بدون مساعدة.\n\nبنهاية الصيف، سبح خالد عبر حوض السباحة للمرة الأولى. هتفت عائلته بصوت عالٍ. شعر بالفخر الشديد والحرية في الماء. تمنى لو تعلّم السباحة في وقت أبكر بكثير.	A2	34	2026-04-09 21:05:32.695954+00
50	A Wonderful Surprise Visitor Arrives	وصول زائر مفاجئ رائع	One quiet Friday afternoon, the doorbell rang at Mona's house. She was not expecting anyone. When she opened the door, she could not believe her eyes. Her aunt Fatima was standing there with a big smile and two large bags.\n\nAunt Fatima lived far away in another city and had not visited for two years. The whole family was surprised and very happy. Mona's mother quickly made tea and brought out snacks. Everyone sat together, talking and laughing for hours.\n\nThat evening, they cooked a big dinner and shared old family stories. Aunt Fatima stayed for one week. It was a special and memorable time for the whole family.	في بعد ظهر يوم الجمعة الهادئ، رنّ جرس باب منزل منى. لم تكن تتوقع أحدًا. عندما فتحت الباب، لم تصدق عينيها. كانت عمتها فاطمة واقفة هناك بابتسامة عريضة وحقيبتين كبيرتين.\n\nكانت عمة فاطمة تعيش بعيدًا في مدينة أخرى ولم تزرهم منذ عامين. فوجئت العائلة كلها وكانت سعيدة جدًا. أعدت والدة منى الشاي بسرعة وأحضرت المقبلات. جلس الجميع معًا يتحدثون ويضحكون لساعات.\n\nفي تلك الليلة، طبخوا عشاءً كبيرًا وتبادلوا ذكريات العائلة القديمة. مكثت عمة فاطمة لمدة أسبوع. كان وقتًا خاصًا ولا يُنسى للعائلة كلها.	A2	35	2026-04-09 21:05:32.699767+00
51	My Bicycle Needed a Big Repair	دراجتي احتاجت إلى إصلاح كبير	Last Monday, I was riding my bicycle to school when I heard a loud noise. The back wheel stopped turning and I almost fell off. I walked the rest of the way and arrived late to class.\n\nAfter school, my father looked at the bicycle. He said the chain was broken and one tyre was flat. We took it to a small repair shop near our house.\n\nThe mechanic fixed everything in about one hour. He replaced the chain and put air in the tyre. Now my bicycle works perfectly again and I ride it every day.	يوم الاثنين الماضي، كنت أركب دراجتي إلى المدرسة عندما سمعت صوتاً عالياً. توقف العجل الخلفي عن الدوران وكدت أقع. مشيت بقية الطريق ووصلت متأخراً إلى الفصل.\n\nبعد المدرسة، نظر والدي إلى الدراجة. قال إن السلسلة كانت مكسورة وأن إحدى الإطارات كانت مثقوبة. أخذناها إلى محل إصلاح صغير بالقرب من بيتنا.\n\nأصلح الميكانيكي كل شيء في حوالي ساعة واحدة. استبدل السلسلة وضخ هواءً في الإطار. الآن تعمل دراجتي بشكل مثالي مرة أخرى وأركبها كل يوم.	A2	36	2026-04-09 21:06:19.694469+00
52	The Quiet and Helpful School Library	مكتبة المدرسة الهادئة والمفيدة	Our school library is a wonderful place to learn and study. It has hundreds of books about many different subjects, including science, history, and stories. There are also computers that students can use to find information for their homework.\n\nThe librarian, Mr. Hassan, is always happy to help. He knows where every book is and can suggest good books for different ages. He also organises reading groups every Wednesday afternoon.\n\nI visit the library at least twice a week. It is quiet and comfortable, and I can concentrate much better there than at home. I have read fifteen books this year already.	مكتبة مدرستنا مكان رائع للتعلم والدراسة. تحتوي على مئات الكتب في مواضيع مختلفة كثيرة، منها العلوم والتاريخ والقصص. كما يوجد فيها حواسيب يمكن للطلاب استخدامها للبحث عن معلومات لواجباتهم.\n\nأمين المكتبة، السيد حسن، يسعده دائماً تقديم المساعدة. يعرف مكان كل كتاب ويستطيع اقتراح كتب جيدة لمختلف الأعمار. كما ينظم مجموعات للقراءة كل يوم أربعاء بعد الظهر.\n\nأزور المكتبة مرتين على الأقل كل أسبوع. إنها هادئة ومريحة، ويمكنني التركيز فيها بشكل أفضل بكثير من المنزل. لقد قرأت خمسة عشر كتاباً هذا العام بالفعل.	A2	37	2026-04-09 21:06:19.701949+00
53	An Exciting Train Journey to the City	رحلة قطار مثيرة إلى المدينة	Last weekend, my family and I took a train to the city centre. We bought our tickets at the station and waited on the platform. The train arrived exactly on time, which made my mother very happy.\n\nThe journey took about forty minutes. We sat next to a large window and watched the green fields and small villages pass by. My younger brother counted the tunnels and found six of them.\n\nWhen we arrived, we walked to a large market and had lunch at a nice restaurant. The train journey home was also enjoyable. We all agreed it was a perfect day out.	في عطلة نهاية الأسبوع الماضية، ركبت أنا وعائلتي القطار إلى وسط المدينة. اشترينا تذاكرنا في المحطة وانتظرنا على الرصيف. وصل القطار في الوقت المحدد تماماً، مما أسعد أمي كثيراً.\n\nاستغرقت الرحلة حوالي أربعين دقيقة. جلسنا بجانب نافذة كبيرة وشاهدنا الحقول الخضراء والقرى الصغيرة تمر أمامنا. أخي الأصغر عدّ الأنفاق ووجد ستة منها.\n\nعندما وصلنا، مشينا إلى سوق كبير وتناولنا الغداء في مطعم جميل. كانت رحلة القطار عودةً ممتعة أيضاً. اتفقنا جميعاً على أنها كانت يوماً رائعاً خارج المنزل.	A2	38	2026-04-09 21:06:19.705622+00
54	Feeding the Birds Every Morning	إطعام الطيور كل صباح	Every morning before school, I spend ten minutes feeding the birds in our garden. My grandmother taught me to do this two years ago. She said birds need extra food in winter because it is hard for them to find enough to eat.\n\nI put different kinds of seeds and small pieces of bread on a wooden board near the garden wall. Sometimes I also add pieces of apple or banana. Many birds visit our garden now, including sparrows, pigeons, and sometimes a beautiful blue bird.\n\nWatching the birds eat makes me feel calm and happy. I have learned the names of twelve different birds so far this year.	كل صباح قبل المدرسة، أقضي عشر دقائق في إطعام الطيور في حديقتنا. علمتني جدتي أن أفعل هذا منذ سنتين. قالت إن الطيور تحتاج إلى طعام إضافي في الشتاء لأنه يصعب عليها إيجاد ما يكفيها من الطعام.\n\nأضع أنواعاً مختلفة من البذور وقطعاً صغيرة من الخبز على لوح خشبي بالقرب من جدار الحديقة. وأحياناً أضيف أيضاً قطعاً من التفاح أو الموز. كثير من الطيور تزور حديقتنا الآن، منها العصافير والحمام وأحياناً طائر أزرق جميل.\n\nمشاهدة الطيور وهي تأكل تجعلني أشعر بالهدوء والسعادة. لقد تعلمت أسماء اثني عشر نوعاً مختلفاً من الطيور حتى الآن هذا العام.	A2	39	2026-04-09 21:06:19.717409+00
55	My Favourite Hobby on Weekends	هوايتي المفضلة في عطلة نهاية الأسبوع	Every Saturday, I spend the afternoon drawing and painting. I started this hobby when I was nine years old. My art teacher gave me my first set of coloured pencils and I immediately loved it.\n\nI usually draw things I see around me, like my street, my family, or interesting buildings. Sometimes I copy pictures from nature books and try to make them look real. I keep all my finished drawings in a large folder under my bed.\n\nDrawing helps me relax after a busy week at school. My parents always encourage me and say my work is improving. I hope to take an art class next year.	كل يوم سبت، أقضي بعد الظهر في الرسم والتلوين. بدأت هذه الهواية عندما كان عمري تسع سنوات. أعطاني مدرس الرسم أول مجموعة أقلام ملونة وأحببتها على الفور.\n\nعادةً أرسم أشياء أراها من حولي، مثل شارعي وعائلتي أو المباني المثيرة للاهتمام. وأحياناً أنسخ صوراً من كتب الطبيعة وأحاول أن أجعلها تبدو حقيقية. أحتفظ بجميع رسوماتي المنتهية في ملف كبير تحت سريري.\n\nالرسم يساعدني على الاسترخاء بعد أسبوع مشغول في المدرسة. دائماً يشجعني والداي ويقولان إن عملي يتحسن. آمل أن ألتحق بفصل فنون العام القادم.	A2	40	2026-04-09 21:06:19.720422+00
56	Our Bright and Happy New Classroom	فصلنا الدراسي الجديد المشرق والسعيد	On Monday morning, our class moved into a new classroom. It was bigger and brighter than our old room. There were large windows on one side, and sunlight came in all day. The walls were painted white and yellow.\n\nOur teacher, Ms. Sara, put colourful posters on the walls. There were maps, alphabet charts, and pictures of animals. Every student had a new desk and a comfortable chair.\n\nWe all felt very happy in our new classroom. It was clean and quiet, and it was easy to study there. We hope to learn many new things this year.	في صباح يوم الاثنين، انتقل فصلنا إلى غرفة دراسية جديدة. كانت أكبر وأكثر إضاءةً من غرفتنا القديمة. كانت هناك نوافذ كبيرة على أحد الجانبين، وكان ضوء الشمس يدخل طوال اليوم. كانت الجدران مطلية باللونين الأبيض والأصفر.\n\nوضعت معلمتنا الأستاذة سارة ملصقات ملونة على الجدران. كان هناك خرائط ولوحات الأبجدية وصور للحيوانات. كان لكل طالب مكتب جديد وكرسي مريح.\n\nشعرنا جميعاً بسعادة كبيرة في فصلنا الدراسي الجديد. كان نظيفاً وهادئاً، وكان من السهل الدراسة فيه. نأمل أن نتعلم أشياء جديدة كثيرة هذا العام.	A2	41	2026-04-09 21:07:07.391262+00
57	A Warm Cup of Tea Together	كوب شاي دافئ معاً	Every Friday afternoon, Layla invites her two best friends to her home for tea. They sit together in the living room and talk about their week. It is their favourite time together.\n\nLayla makes the tea with fresh mint leaves and a little sugar. She also puts some biscuits and small cakes on the table. The smell of the tea fills the whole room.\n\nHer friends, Noor and Dina, always arrive on time because they love this tradition. They laugh, share stories, and enjoy the warm drinks. These simple Friday meetings make them feel close and happy.	كل جمعة بعد الظهر، تدعو ليلى أفضل صديقتيها إلى منزلها لتناول الشاي. يجلسون معاً في غرفة المعيشة ويتحدثون عن أسبوعهم. إنه وقتهم المفضل معاً.\n\nتصنع ليلى الشاي بأوراق النعناع الطازجة وقليل من السكر. كما تضع بعض البسكويت والكعك الصغير على الطاولة. تملأ رائحة الشاي الغرفة بأكملها.\n\nصديقتاها نور ودينا تصلان دائماً في الوقت المحدد لأنهما تحبان هذا التقليد. يضحكون ويتبادلون القصص ويستمتعون بالمشروبات الدافئة. هذه اللقاءات البسيطة كل جمعة تجعلهم يشعرون بالقرب من بعضهم والسعادة.	A2	42	2026-04-09 21:07:07.395274+00
58	Oh No, I Lost My Keys!	يا إلهي، لقد فقدت مفاتيحي!	One evening, Omar came home from work and could not find his keys. He checked his coat pockets, his bag, and his trousers. He looked on the kitchen table and under the sofa. The keys were not anywhere.\n\nOmar felt very worried. He called his office but nobody answered. He sat down and tried to think carefully. Where did he go today? He went to the market, the bank, and the coffee shop.\n\nFinally, he called the coffee shop. The man there said, "Yes! We have your keys. You left them on the table this morning." Omar laughed with relief and went to get them.	في إحدى الأمسيات، عاد عمر من العمل ولم يستطع إيجاد مفاتيحه. فتّش في جيوب معطفه وحقيبته وسرواله. بحث على طاولة المطبخ وتحت الأريكة. لم تكن المفاتيح في أي مكان.\n\nشعر عمر بقلق شديد. اتصل بمكتبه لكن لم يرد أحد. جلس وحاول أن يفكر بعناية. أين ذهب اليوم؟ ذهب إلى السوق والبنك والمقهى.\n\nأخيراً، اتصل بالمقهى. قال له الرجل هناك: "نعم! مفاتيحك موجودة عندنا. لقد تركتها على الطاولة هذا الصباح." ضحك عمر بارتياح وذهب ليأخذها.	A2	43	2026-04-09 21:07:07.398741+00
59	Writing the Weekly Shopping List	كتابة قائمة التسوق الأسبوعية	Every Saturday morning, Hana sits at the kitchen table and writes her shopping list. She opens the fridge and the cupboards to see what she needs. She writes everything on a small piece of paper.\n\nThis week, she needs milk, eggs, bread, tomatoes, chicken, rice, and some fruit. She also wants to buy soap and shampoo from the pharmacy. She checks the list two times to make sure she did not forget anything.\n\nHana takes her bag and her list and walks to the local market. She likes shopping in the morning because it is not busy. She finishes quickly and comes home happy.	كل صباح سبت، تجلس هناء على طاولة المطبخ وتكتب قائمة تسوقها. تفتح الثلاجة والخزانات لترى ما تحتاجه. تكتب كل شيء على ورقة صغيرة.\n\nهذا الأسبوع، تحتاج إلى الحليب والبيض والخبز والطماطم والدجاج والأرز وبعض الفاكهة. كما تريد شراء الصابون والشامبو من الصيدلية. تراجع القائمة مرتين للتأكد من أنها لم تنسَ شيئاً.\n\nتأخذ هناء حقيبتها وقائمتها وتمشي إلى السوق المحلي. تحب التسوق في الصباح لأنه لا يكون مزدحماً. تنتهي بسرعة وتعود إلى المنزل سعيدة.	A2	44	2026-04-09 21:07:07.401903+00
60	Learning to Bake Fresh Bread	تعلّم خبز الخبز الطازج	Last Sunday, Rania decided to bake bread at home for the first time. She found a simple recipe online. She needed flour, water, salt, sugar, and yeast. She mixed everything together in a large bowl.\n\nAfter mixing, she left the dough to rest for one hour. The dough grew bigger and smelled wonderful. Then she put it in the oven and waited for thirty minutes. The whole kitchen filled with a warm, fresh smell.\n\nWhen the bread was ready, Rania took it out of the oven. It was golden and beautiful. She shared it with her family at dinner. Everyone said it was delicious, and Rania felt very proud.	الأحد الماضي، قررت رانيا خبز الخبز في المنزل لأول مرة. وجدت وصفة بسيطة على الإنترنت. احتاجت إلى الدقيق والماء والملح والسكر والخميرة. خلطت كل شيء معاً في وعاء كبير.\n\nبعد الخلط، تركت العجينة لترتاح لمدة ساعة واحدة. كبرت العجينة وأصدرت رائحة رائعة. ثم وضعتها في الفرن وانتظرت ثلاثين دقيقة. امتلأت المطبخ بأكمله برائحة دافئة وطازجة.\n\nعندما كان الخبز جاهزاً، أخرجته رانيا من الفرن. كان ذهبي اللون وجميلاً. شاركته مع عائلتها على العشاء. قال الجميع إنه كان لذيذاً، وشعرت رانيا بفخر كبير.	A2	45	2026-04-09 21:07:07.405091+00
61	A Quiet Walk in the Morning	نزهة هادئة في الصباح	Every morning, Sarah wakes up early and goes for a walk near her house. The streets are quiet and the air is fresh. She likes to watch the birds and listen to their sounds. Sometimes she sees her neighbours walking their dogs.\n\nSarah walks for about thirty minutes. She passes a small park and a bakery that smells very good. After her walk, she feels happy and ready for the day. She thinks that a morning walk is a great way to start the day.	كل صباح، تستيقظ سارة مبكرًا وتخرج للمشي بالقرب من منزلها. الشوارع هادئة والهواء منعش. تحب أن تراقب الطيور وتستمع إلى أصواتها. وأحيانًا ترى جيرانها يمشون مع كلابهم.\n\nتمشي سارة لمدة ثلاثين دقيقة تقريبًا. تمر بجانب حديقة صغيرة ومخبز يفوح منه رائحة رائعة. بعد نزهتها، تشعر بالسعادة وتكون مستعدة لبدء يومها. وتعتقد أن المشي في الصباح طريقة رائعة لبدء اليوم.	A2	46	2026-04-09 21:07:50.734061+00
62	Our Kind and Friendly New Teacher	معلمنا الجديد اللطيف والودود	Last Monday, a new teacher came to our school. His name is Mr. Ahmed. He is young and has a big, friendly smile. He teaches English, and he makes the lessons very interesting.\n\nIn his first class, Mr. Ahmed asked everyone to introduce themselves. He listened carefully to each student and remembered all their names. He told the class funny stories to help them learn new words.\n\nAll the students like Mr. Ahmed very much. They look forward to his classes every day. Everyone agrees that he is one of the best teachers in the school.	يوم الاثنين الماضي، جاء معلم جديد إلى مدرستنا. اسمه الأستاذ أحمد. هو شاب ويملك ابتسامة كبيرة وودودة. يدرّس اللغة الإنجليزية، ويجعل الدروس ممتعة للغاية.\n\nفي أول حصة له، طلب الأستاذ أحمد من الجميع أن يقدّموا أنفسهم. استمع بعناية إلى كل طالب وتذكّر أسماءهم جميعًا. وروى للفصل قصصًا مضحكة لمساعدتهم على تعلّم كلمات جديدة.\n\nجميع الطلاب يحبون الأستاذ أحمد كثيرًا. وينتظرون حصصه كل يوم بفارغ الصبر. ويتفق الجميع على أنه من أفضل المعلمين في المدرسة.	A2	47	2026-04-09 21:07:50.741596+00
63	A Beautiful and Sunny Afternoon	بعد ظهر جميل ومشمس	Last Saturday was a beautiful sunny day. Mia and her brother Tom decided to spend the afternoon outside. They went to the park near their home and found a quiet spot under a big tree.\n\nMia read her favourite book while Tom played with a football. Later, they had a picnic with sandwiches and cold juice. They talked and laughed together for a long time.\n\nWhen the sun started to go down, they walked home slowly. Both of them felt relaxed and happy. Mia said it was one of the best afternoons she had enjoyed in a long time.	كان يوم السبت الماضي يومًا مشمسًا جميلًا. قرّرت ميا وأخوها توم قضاء فترة ما بعد الظهر في الخارج. ذهبا إلى الحديقة القريبة من منزلهما ووجدا مكانًا هادئًا تحت شجرة كبيرة.\n\nقرأت ميا كتابها المفضل بينما لعب توم بالكرة. وفي وقت لاحق، تناولا طعام نزهتهما من السندويشات وعصير بارد. تحدّثا وضحكا معًا لفترة طويلة.\n\nعندما بدأت الشمس في الغروب، مشيا نحو المنزل ببطء. شعر كلاهما بالاسترخاء والسعادة. قالت ميا إنه كان من أجمل فترات ما بعد الظهر التي استمتعت بها منذ وقت طويل.	A2	48	2026-04-09 21:07:50.744846+00
64	Washing Clothes on the Weekend	غسيل الملابس في عطلة نهاية الأسبوع	Every Saturday, Ali helps his mother wash the clothes. First, they sort the clothes into two groups — light colours and dark colours. Then Ali puts them into the washing machine and adds the soap.\n\nWhile the machine is working, Ali and his mother have tea in the kitchen. After about an hour, the clothes are clean and wet. They take the clothes outside and hang them on a line to dry in the sun.\n\nIn the evening, they fold the dry clothes and put them away. Ali likes helping his mother. He says that working together makes the job much easier and more fun.	كل يوم سبت، يساعد علي والدته في غسل الملابس. أولًا، يفرزان الملابس إلى مجموعتين — الألوان الفاتحة والألوان الداكنة. ثم يضع علي الملابس في الغسالة ويضيف الصابون.\n\nبينما تعمل الغسالة، يشرب علي ووالدته الشاي في المطبخ. بعد حوالي ساعة، تكون الملابس نظيفة ومبللة. يأخذان الملابس إلى الخارج ويعلّقانها على حبل لتجفّ في الشمس.\n\nفي المساء، يطويان الملابس الجافة ويضعانها في أماكنها. يحب علي مساعدة والدته. ويقول إن العمل معًا يجعل المهمة أسهل بكثير وأكثر متعة.	A2	49	2026-04-09 21:07:50.748219+00
65	A Special Visit to the Grandparents	زيارة خاصة للأجداد	Last week, Layla and her family visited her grandparents in the countryside. Her grandparents live in a small, comfortable house with a beautiful garden. Layla loves going there because it is quiet and peaceful.\n\nHer grandmother cooked a delicious meal with fresh vegetables from the garden. They all sat together at a big table and ate slowly, talking and sharing stories. Layla's grandfather showed her old family photos and told funny stories about the past.\n\nAfter lunch, they walked in the garden and drank tea outside. When it was time to leave, Layla hugged her grandparents tightly. She promised to visit them again very soon.	الأسبوع الماضي، زارت ليلى وعائلتها جديها في الريف. يعيش جداها في منزل صغير ومريح مع حديقة جميلة. تحب ليلى الذهاب إلى هناك لأن المكان هادئ ومريح للنفس.\n\nطهّت جدتها وجبة لذيذة بالخضروات الطازجة من الحديقة. جلسوا جميعًا معًا على طاولة كبيرة وأكلوا ببطء وهم يتحدثون ويتبادلون القصص. وأراها جدها صورًا عائلية قديمة وروى لها قصصًا مضحكة عن الماضي.\n\nبعد الغداء، تجوّلوا في الحديقة وشربوا الشاي في الخارج. وعندما حان وقت المغادرة، احتضنت ليلى جديها بحنان. ووعدتهما بزيارتهما مرة أخرى قريبًا جدًا.	A2	50	2026-04-09 21:07:50.751211+00
66	Starting Fresh: A New Career at 35	بداية جديدة: مهنة مختلفة في سن الخامسة والثلاثين	At the age of 35, Sarah decided to leave her stable job in banking and become a nurse. Many people thought she was making a mistake, but she felt that her work no longer gave her a sense of purpose. She wanted to help others in a more direct way.\n\nSarah spent two years studying at a local college while also working part-time to pay her bills. It was a difficult period, but she stayed focused on her goal. She often felt tired and stressed, yet she never considered giving up.\n\nToday, Sarah works in a busy hospital and says it is the best decision she ever made. She believes it is never too late to follow your passion and build a life that feels meaningful.	في سن الخامسة والثلاثين، قررت سارة أن تترك وظيفتها المستقرة في مجال المصرفية وتصبح ممرضة. اعتقد كثير من الناس أنها ترتكب خطأً، لكنها شعرت أن عملها لم يعد يمنحها إحساساً بالهدف. أرادت مساعدة الآخرين بطريقة أكثر مباشرة.\n\nأمضت سارة عامين في الدراسة بكلية محلية بينما كانت تعمل بدوام جزئي لدفع فواتيرها. كانت فترة صعبة، لكنها ظلت مركزة على هدفها. كانت تشعر في أغلب الأحيان بالتعب والتوتر، غير أنها لم تفكر قط في الاستسلام.\n\nتعمل سارة اليوم في مستشفى مزدحم وتقول إنه أفضل قرار اتخذته في حياتها. وهي تؤمن بأنه لا يوجد وقت متأخر لاتباع شغفك وبناء حياة تشعر فيها بالمعنى.	B1	6	2026-04-09 21:08:51.120891+00
67	How Volunteering Changed My Life	كيف غيّر التطوع حياتي	When James lost his job two years ago, he decided to spend some of his free time volunteering at a local food bank. He helped sort and distribute food to families in need every Saturday morning. At first, he saw it as a way to stay busy, but soon he discovered something more valuable.\n\nThrough volunteering, James met people from very different backgrounds. He listened to their stories and began to understand challenges he had never thought about before. The experience made him more empathetic and grateful for what he had.\n\nEventually, James was offered a paid position at a community charity organisation. He believes that volunteering not only helped the people around him but also gave him new skills, confidence, and a clearer sense of direction in his own life.	عندما فقد جيمس وظيفته قبل عامين، قرر أن يقضي بعض وقت فراغه في التطوع في بنك غذاء محلي. كان يساعد في فرز الطعام وتوزيعه على الأسر المحتاجة كل صباح سبت. في البداية، رأى في ذلك طريقة للبقاء مشغولاً، لكنه سرعان ما اكتشف شيئاً أكثر قيمة.\n\nمن خلال التطوع، التقى جيمس بأشخاص من خلفيات متباينة جداً. استمع إلى قصصهم وبدأ يفهم تحديات لم يفكر فيها من قبل قط. جعلته هذه التجربة أكثر تعاطفاً وامتناناً لما يملكه.\n\nفي نهاية المطاف، عُرض على جيمس منصب مدفوع في منظمة خيرية مجتمعية. ويعتقد أن التطوع لم يساعد الناس من حوله فحسب، بل أكسبه أيضاً مهارات جديدة وثقة بالنفس وشعوراً أوضح بالاتجاه في حياته.	B1	7	2026-04-09 21:08:51.126901+00
68	Are We Spending Too Much Time Online?	هل نقضي وقتاً طويلاً على الإنترنت؟	A recent study found that the average person spends around three hours a day on social media platforms. Many users check their phones first thing in the morning and last thing before sleeping. While these apps help people stay connected, researchers are beginning to question their effect on mental health.\n\nSome studies suggest that spending too much time on social media can increase feelings of anxiety and loneliness, especially among young people. Comparing your own life to the carefully edited photos and posts of others can create unrealistic expectations and low self-esteem.\n\nHowever, experts also point out that social media is not entirely harmful. It can be a powerful tool for learning, sharing ideas, and building communities. The key, they say, is balance. Using these platforms with awareness and setting clear time limits can make a real difference.	كشفت دراسة حديثة أن الشخص العادي يقضي نحو ثلاث ساعات يومياً على منصات التواصل الاجتماعي. يتحقق كثير من المستخدمين من هواتفهم أول شيء في الصباح وآخر شيء قبل النوم. وبينما تساعد هذه التطبيقات الناس على البقاء على تواصل، يبدأ الباحثون في التساؤل عن تأثيرها على الصحة النفسية.\n\nتشير بعض الدراسات إلى أن قضاء وقت طويل جداً على وسائل التواصل الاجتماعي يمكن أن يزيد مشاعر القلق والوحدة، خاصة بين الشباب. إذ يمكن أن تُفضي مقارنة حياتك بالصور والمنشورات المُحررة بعناية للآخرين إلى توقعات غير واقعية وتدني تقدير الذات.\n\nغير أن الخبراء يُشيرون أيضاً إلى أن وسائل التواصل الاجتماعي ليست ضارة كلياً. فهي أداة فعّالة للتعلم وتبادل الأفكار وبناء المجتمعات. والمفتاح، كما يقولون، هو التوازن، إذ يمكن لاستخدام هذه المنصات بوعي ووضع حدود زمنية واضحة أن يُحدث فارقاً حقيقياً.	B1	8	2026-04-09 21:08:51.130202+00
69	One Year That Changed Everything	عام واحد غيّر كل شيء	After finishing university, Mia decided to take a gap year before starting her career. Instead of travelling for fun, she chose to teach English at a small school in rural Cambodia. She had never lived abroad before, and the first few weeks were a real challenge.\n\nMia struggled with the language barrier and the very different lifestyle. There was no reliable internet, the food was unfamiliar, and she often felt homesick. However, she gradually adapted and formed strong friendships with local teachers and students.\n\nBy the end of the year, Mia felt more independent, patient, and open-minded than ever before. The experience showed her how much she was capable of when pushed outside her comfort zone. She returned home with a new perspective on life and a deep appreciation for different cultures.	بعد تخرجها من الجامعة، قررت ميا أخذ سنة فجوة قبل بدء مسيرتها المهنية. وبدلاً من السفر للمتعة، اختارت تدريس اللغة الإنجليزية في مدرسة صغيرة في ريف كمبوديا. لم تكن قد عاشت في الخارج من قبل قط، وكانت الأسابيع الأولى تحدياً حقيقياً.\n\nعانت ميا من حاجز اللغة وأسلوب الحياة المختلف جداً. لم يكن هناك إنترنت موثوق، كان الطعام غير مألوف، وكانت تشعر كثيراً بالحنين إلى الوطن. بيد أنها تكيّفت تدريجياً وكوّنت صداقات متينة مع المعلمين والطلاب المحليين.\n\nبنهاية العام، شعرت ميا بأنها أصبحت أكثر استقلالية وصبراً وانفتاحاً على الآخرين من أي وقت مضى. وقد أظهرت لها التجربة مدى ما تستطيع تحقيقه حين تخرج من منطقة راحتها. عادت إلى وطنها وهي تحمل رؤية جديدة للحياة وتقديراً عميقاً للثقافات المختلفة.	B1	9	2026-04-09 21:08:51.133804+00
70	The Surprising Benefits of Learning Another Language	الفوائد المدهشة لتعلم لغة أخرى	Learning a second language is often seen as a difficult task, but research suggests the benefits are well worth the effort. Studies have shown that bilingual people tend to have better memory, stronger concentration, and improved problem-solving skills compared to those who speak only one language.\n\nBeyond the mental advantages, knowing another language opens many doors. It can improve your career prospects, allow you to travel more confidently, and help you connect with people from different cultures on a deeper level. Many learners also report that the process itself is enjoyable and rewarding.\n\nExperts recommend starting with short daily practice sessions rather than long occasional ones. Listening to music, watching films, and having conversations in the target language are all effective methods. With patience and consistency, even busy adults can make significant progress in a new language.	كثيراً ما يُنظر إلى تعلم لغة ثانية باعتباره مهمة صعبة، لكن الأبحاث تشير إلى أن فوائده تستحق الجهد المبذول. فقد أثبتت الدراسات أن الأشخاص ثنائيي اللغة يتمتعون بذاكرة أفضل وتركيز أقوى ومهارات أفضل في حل المشكلات مقارنةً بمن يتحدث لغة واحدة فقط.\n\nوبعيداً عن المزايا الذهنية، تفتح معرفة لغة أخرى أبواباً عديدة. فهي تحسّن آفاقك المهنية وتتيح لك السفر بثقة أكبر وتساعدك على التواصل مع أشخاص من ثقافات مختلفة على مستوى أعمق. كما يُفيد كثير من المتعلمين بأن العملية ذاتها ممتعة ومُجزية.\n\nيوصي الخبراء بالبدء بجلسات تدريب يومية قصيرة بدلاً من جلسات طويلة متقطعة. والاستماع إلى الموسيقى ومشاهدة الأفلام وإجراء المحادثات بالغة المستهدفة كلها أساليب فعّالة. ومع الصبر والمثابرة، يستطيع حتى البالغون المشغولون إحراز تقدم ملحوظ في لغة جديدة.	B1	10	2026-04-09 21:08:51.136827+00
71	Simple Ways to Recycle at Home	طرق بسيطة لإعادة التدوير في المنزل	Many families are now trying to reduce the amount of waste they produce at home. Recycling is one of the easiest ways to help the environment. By separating paper, plastic, and glass into different bins, households can make a big difference without spending much time or money.\n\nSome people also find creative ways to reuse items instead of throwing them away. Old jars can become storage containers, and newspapers can be used for wrapping. Children can get involved too, making recycling a fun family activity.\n\nLocal councils in many cities now provide coloured bins to make sorting easier. When communities work together, the results can be impressive. Even small changes in daily habits can lead to a cleaner, healthier planet for future generations.	تحاول كثير من الأسر الآن تقليل كمية النفايات التي تنتجها في المنزل. وتُعدّ إعادة التدوير من أسهل الطرق للمساعدة في حماية البيئة. فمن خلال فصل الورق والبلاستيك والزجاج في حاويات مختلفة، يمكن للأسر إحداث فرق كبير دون إنفاق الكثير من الوقت أو المال.\n\nيجد بعض الناس أيضًا طرقًا إبداعية لإعادة استخدام الأشياء بدلاً من التخلص منها. إذ يمكن أن تصبح البرطمانات القديمة حاويات للتخزين، وتُستخدم الصحف في التغليف. ويمكن للأطفال المشاركة أيضًا، مما يجعل إعادة التدوير نشاطًا عائليًا ممتعًا.\n\nتوفر المجالس المحلية في كثير من المدن الآن حاويات ملوّنة لتسهيل عملية الفرز. وحين تتعاون المجتمعات معًا، يمكن أن تكون النتائج مذهلة. فحتى التغييرات الصغيرة في العادات اليومية يمكن أن تؤدي إلى كوكب أنظف وأكثر صحة للأجيال القادمة.	B1	11	2026-04-09 21:09:50.876175+00
72	How Online Shopping Is Changing Habits	كيف تُغيّر التسوق الإلكتروني العادات	Online shopping has become a major part of everyday life for millions of people around the world. Instead of visiting physical stores, shoppers can now browse thousands of products from their phones or computers. This convenience has changed the way people think about buying things.\n\nMany customers enjoy comparing prices quickly and reading reviews before making a decision. Delivery services have also improved significantly, with some companies offering next-day or even same-day shipping. However, returning items can sometimes be complicated and time-consuming.\n\nDespite its advantages, online shopping has caused difficulties for smaller local businesses that cannot compete with large internet retailers. Experts suggest that consumers should try to balance their online purchases with support for local shops. This approach can help communities stay economically healthy while still enjoying the benefits of modern technology.	أصبح التسوق عبر الإنترنت جزءًا أساسيًا من الحياة اليومية لملايين الأشخاص حول العالم. فبدلاً من زيارة المتاجر الفعلية، يمكن للمتسوقين الآن تصفح آلاف المنتجات من هواتفهم أو حواسيبهم. وقد غيّرت هذه السهولة طريقة تفكير الناس في شراء الأشياء.\n\nيستمتع كثير من العملاء بمقارنة الأسعار بسرعة وقراءة التقييمات قبل اتخاذ قرار الشراء. كما تحسّنت خدمات التوصيل بشكل ملحوظ، إذ تقدم بعض الشركات شحنًا في اليوم التالي أو حتى في نفس اليوم. غير أن إعادة المنتجات قد تكون أحيانًا معقدة وتستغرق وقتًا طويلاً.\n\nعلى الرغم من مزاياه، تسبّب التسوق الإلكتروني في صعوبات للشركات المحلية الصغيرة التي لا تستطيع منافسة كبار تجار الإنترنت. ويقترح الخبراء أن يحاول المستهلكون الموازنة بين مشترياتهم الإلكترونية ودعم المحلات المحلية، مما يساعد المجتمعات على البقاء بصحة اقتصادية جيدة مع الاستمتاع بفوائد التكنولوجيا الحديثة.	B1	12	2026-04-09 21:09:50.912265+00
73	Starting Fresh in a New City	البداية من جديد في مدينة جديدة	Moving to a new city can be both exciting and challenging. For many people, it is an opportunity to build a new life, find better work, or study at a well-known university. However, leaving familiar places and people behind can feel lonely at first.\n\nOne of the most important things when settling into a new city is building a social network. Joining local clubs, attending community events, or simply talking to neighbours can help newcomers feel more comfortable. Many cities also have support groups specifically for people who have recently moved.\n\nOver time, most people adjust well to their new environment. Learning about local traditions, discovering favourite restaurants, and understanding public transport systems all become part of the experience. With patience and an open mind, a new city can eventually feel like home.	يمكن أن يكون الانتقال إلى مدينة جديدة مثيرًا وصعبًا في آنٍ واحد. بالنسبة لكثير من الناس، إنه فرصة لبناء حياة جديدة، أو إيجاد عمل أفضل، أو الدراسة في جامعة مشهورة. ومع ذلك، قد يشعر الشخص بالوحدة في البداية عند مغادرة الأماكن والناس المألوفين.\n\nمن أهم الأشياء عند الاستقرار في مدينة جديدة هو بناء شبكة علاقات اجتماعية. فالانضمام إلى الأندية المحلية، وحضور الفعاليات المجتمعية، أو مجرد التحدث مع الجيران يمكن أن يساعد الوافدين الجدد على الشعور بالراحة. كما توفر كثير من المدن مجموعات دعم مخصصة للأشخاص الذين انتقلوا مؤخرًا.\n\nمع مرور الوقت، يتأقلم معظم الناس بشكل جيد مع بيئتهم الجديدة. إذ يصبح التعرف على التقاليد المحلية، واكتشاف المطاعم المفضلة، وفهم أنظمة المواصلات العامة جزءًا من التجربة. ومع الصبر والعقل المنفتح، يمكن أن تشعر المدينة الجديدة في نهاية المطاف وكأنها وطن.	B1	13	2026-04-09 21:09:50.915719+00
74	The Benefits of Having a Part-Time Job	فوائد امتلاك وظيفة بدوام جزئي	Many students and young adults choose to work part-time while continuing their studies or pursuing other goals. A part-time job offers a regular income without requiring a full-time commitment. This balance allows people to earn money and gain experience at the same time.\n\nWorking part-time helps develop important skills such as communication, time management, and teamwork. Employers often value candidates who have practical work experience, even if it is limited. A part-time role in a café, shop, or office can therefore improve future job prospects considerably.\n\nOf course, balancing work and study can be difficult. It is important to manage time carefully and avoid taking on too many hours. With good planning, however, a part-time job can be a rewarding experience that builds confidence and prepares young people for their future careers.	يختار كثير من الطلاب والشباب العمل بدوام جزئي بينما يواصلون دراستهم أو يسعون لتحقيق أهداف أخرى. إذ توفر الوظيفة بدوام جزئي دخلاً منتظمًا دون الحاجة إلى الالتزام بدوام كامل. ويتيح هذا التوازن للناس كسب المال واكتساب الخبرة في نفس الوقت.\n\nيساعد العمل بدوام جزئي على تطوير مهارات مهمة مثل التواصل وإدارة الوقت والعمل الجماعي. وكثيرًا ما يُقدّر أصحاب العمل المرشحين الذين لديهم خبرة عملية، حتى لو كانت محدودة. لذا يمكن للعمل بدوام جزئي في مقهى أو متجر أو مكتب أن يحسّن فرص العمل المستقبلية بشكل كبير.\n\nبالطبع، قد يكون الموازنة بين العمل والدراسة أمرًا صعبًا. لذا من المهم إدارة الوقت بعناية وتجنب أخذ ساعات عمل كثيرة جدًا. ومع ذلك، مع التخطيط الجيد، يمكن أن تكون الوظيفة بدوام جزئي تجربة مجزية تبني الثقة بالنفس وتُعدّ الشباب لمساراتهم المهنية المستقبلية.	B1	14	2026-04-09 21:09:51.027828+00
75	Celebrating Culture Through Local Festivals	الاحتفال بالثقافة من خلال المهرجانات المحلية	Cultural festivals are a wonderful way for communities to celebrate their traditions, history, and identity. From music and dance to food and art, these events bring people together and create a strong sense of belonging. Many festivals attract both local residents and tourists from around the world.\n\nParticipating in a cultural festival allows people to learn about different ways of life in an enjoyable and relaxed setting. Children especially benefit from seeing traditional costumes, tasting unfamiliar foods, and listening to folk music. These experiences can broaden their understanding of the world from a young age.\n\nFestivals also provide economic benefits for local communities. Small businesses, food stalls, and craftspeople all gain customers during these events. As a result, many local governments actively support festivals as a way to promote tourism and strengthen cultural pride within their regions.	تُعدّ المهرجانات الثقافية طريقة رائعة للمجتمعات للاحتفال بتقاليدها وتاريخها وهويتها. فمن الموسيقى والرقص إلى الطعام والفن، تجمع هذه الفعاليات الناس معًا وتخلق إحساسًا قويًا بالانتماء. وتجذب كثير من المهرجانات السكان المحليين والسياح من جميع أنحاء العالم.\n\nتتيح المشاركة في مهرجان ثقافي للناس التعرف على أساليب حياة مختلفة في بيئة ممتعة ومريحة. ويستفيد الأطفال بشكل خاص من رؤية الأزياء التقليدية، وتذوق الأطعمة غير المألوفة، والاستماع إلى الموسيقى الشعبية. يمكن أن توسّع هذه التجارب فهمهم للعالم منذ سن مبكرة.\n\nتوفر المهرجانات أيضًا فوائد اقتصادية للمجتمعات المحلية. إذ تكسب الشركات الصغيرة وبائعو الطعام والحرفيون عملاء خلال هذه الفعاليات. ونتيجةً لذلك، تدعم كثير من الحكومات المحلية المهرجانات بشكل فعّال كوسيلة لتعزيز السياحة وتقوية الفخر الثقافي في مناطقها.	B1	15	2026-04-09 21:09:51.030961+00
76	Starting Over at Thirty-Five	البداية من جديد في سن الخامسة والثلاثين	At the age of thirty-five, Sarah made a decision that surprised everyone around her. After working as an accountant for over ten years, she decided to leave her stable job and train to become a nurse. Many people thought she was making a mistake, but Sarah felt that her current career no longer gave her any satisfaction.\n\nThe training was difficult and expensive, and Sarah had to study while also taking care of her two children. However, she remained focused and motivated throughout the process. She attended evening classes and used online resources to help her study.\n\nTwo years later, Sarah successfully completed her nursing qualification. She now works at a local hospital and says she has never felt happier in her professional life. Her story shows that it is never too late to follow your passion.	في سن الخامسة والثلاثين، اتخذت سارة قراراً فاجأ الجميع من حولها. بعد عملها كمحاسبة لأكثر من عشر سنوات، قررت ترك وظيفتها المستقرة والتدرب لتصبح ممرضة. اعتقد كثير من الناس أنها ترتكب خطأً، لكن سارة شعرت أن مسيرتها المهنية الحالية لم تعد تمنحها أي رضا.\n\nكان التدريب صعباً ومكلفاً، وكان على سارة الدراسة مع رعاية طفليها في الوقت ذاته. ومع ذلك، ظلت مركزة ومتحفزة طوال هذه العملية. حضرت دروساً مسائية واستخدمت موارد الإنترنت لمساعدتها في الدراسة.\n\nبعد عامين، أتمت سارة بنجاح مؤهلها في التمريض. تعمل الآن في مستشفى محلي وتقول إنها لم تشعر بسعادة أكبر في حياتها المهنية. تُظهر قصتها أنه لا يوجد وقت متأخر لاتباع شغفك.	B1	16	2026-04-09 21:12:03.963114+00
77	Giving Time to Help Others	تخصيص الوقت لمساعدة الآخرين	Every Saturday morning, a group of volunteers meets at the local community centre to help elderly residents with their shopping and housework. The group was started three years ago by a retired teacher named James, who noticed that many older people in his neighbourhood struggled to complete everyday tasks on their own.\n\nThe volunteers come from all different backgrounds. Some are students, while others are working adults who want to give something back to their community. Each volunteer receives basic training before they begin, so they know how to help people safely and respectfully.\n\nThe programme has grown significantly since it began. James says the most rewarding part is seeing the friendships that develop between volunteers and residents. Many participants say that volunteering has also improved their own mental health and given them a stronger sense of purpose.	كل صباح سبت، يجتمع مجموعة من المتطوعين في مركز المجتمع المحلي لمساعدة كبار السن في التسوق وأعمال المنزل. أسّس هذه المجموعة قبل ثلاث سنوات مدرس متقاعد يدعى جيمس، الذي لاحظ أن كثيراً من كبار السن في حيّه يعانون في إنجاز مهامهم اليومية بمفردهم.\n\nيأتي المتطوعون من خلفيات مختلفة تماماً. بعضهم طلاب، وبعضهم بالغون يعملون ويريدون تقديم شيء لمجتمعهم. يتلقى كل متطوع تدريباً أساسياً قبل أن يبدأ، حتى يعرف كيفية مساعدة الناس بأمان واحترام.\n\nنما البرنامج بشكل ملحوظ منذ انطلاقه. يقول جيمس إن أكثر ما يُشعره بالرضا هو رؤية الصداقات التي تنشأ بين المتطوعين والسكان. يقول كثير من المشاركين إن التطوع حسّن أيضاً صحتهم النفسية ومنحهم إحساساً أقوى بالهدف.	B1	17	2026-04-09 21:12:03.99719+00
78	How Social Media Changes Daily Life	كيف تغيّر وسائل التواصل الاجتماعي الحياة اليومية	A recent study found that the average person spends nearly three hours each day on social media platforms. For many people, checking their phone first thing in the morning has become a daily habit. Researchers are concerned that this constant connection to social media may be affecting people's ability to concentrate and relax.\n\nHowever, social media also has clear benefits. It allows people to stay in contact with friends and family who live far away, and it gives users access to news and information instantly. Many small businesses also use social media to reach new customers and grow their brand.\n\nExperts suggest finding a healthy balance. Setting limits on screen time and taking regular breaks from social media can help people feel less stressed. Being more conscious about how and when we use these platforms is an important step toward better digital habits.	وجدت دراسة حديثة أن الشخص العادي يقضي ما يقارب ثلاث ساعات يومياً على منصات التواصل الاجتماعي. بالنسبة لكثير من الناس، أصبح التحقق من هواتفهم أول شيء في الصباح عادة يومية. يشعر الباحثون بالقلق من أن هذا الارتباط المستمر بوسائل التواصل الاجتماعي قد يؤثر على قدرة الناس على التركيز والاسترخاء.\n\nومع ذلك، لوسائل التواصل الاجتماعي فوائد واضحة أيضاً. فهي تتيح للناس البقاء على تواصل مع الأصدقاء والعائلة الذين يعيشون بعيداً، وتمنح المستخدمين وصولاً فورياً إلى الأخبار والمعلومات. كما تستخدم كثير من الشركات الصغيرة وسائل التواصل الاجتماعي للوصول إلى عملاء جدد وتنمية علامتها التجارية.\n\nيقترح الخبراء إيجاد توازن صحي. يمكن أن يساعد تحديد وقت استخدام الشاشة وأخذ فترات راحة منتظمة من وسائل التواصل الاجتماعي على الشعور بضغط أقل. إن الوعي أكثر بكيفية ووقت استخدام هذه المنصات هو خطوة مهمة نحو عادات رقمية أفضل.	B1	18	2026-04-09 21:12:04.008885+00
79	A Year of Travel and Discovery	عام من السفر والاكتشاف	After finishing university, Tom decided to take a gap year before starting his career. Instead of looking for a job immediately, he spent twelve months travelling through Southeast Asia, volunteering, and learning about different cultures. His parents were initially worried, but Tom convinced them that the experience would be valuable for his personal development.\n\nDuring his travels, Tom worked on an organic farm in Thailand, taught English to children in Vietnam, and helped build homes for local families in Cambodia. Each experience taught him new skills and gave him a deeper understanding of the world outside his own country.\n\nWhen Tom returned home, he felt more confident, independent, and open-minded than before. He found a job within a few months, and his employer was impressed by the practical skills and life experience he had gained. Tom believes his gap year was the best decision he ever made.	بعد إنهاء الجامعة، قرر توم أخذ سنة فاصلة قبل بدء مسيرته المهنية. بدلاً من البحث عن عمل فوراً، أمضى اثني عشر شهراً يتنقل عبر جنوب شرق آسيا، ويتطوع، ويتعلم عن ثقافات مختلفة. كان والداه قلقَين في البداية، لكن توم أقنعهما بأن التجربة ستكون قيّمة لنموه الشخصي.\n\nخلال رحلاته، عمل توم في مزرعة عضوية في تايلاند، وعلّم اللغة الإنجليزية للأطفال في فيتنام، وساعد في بناء منازل للعائلات المحلية في كمبوديا. علّمته كل تجربة مهارات جديدة ومنحته فهماً أعمق للعالم خارج بلده.\n\nعندما عاد توم إلى المنزل، شعر بثقة أكبر واستقلالية وانفتاح على العالم أكثر من ذي قبل. وجد وظيفة في غضون أشهر قليلة، وأُعجب صاحب العمل بالمهارات العملية وخبرة الحياة التي اكتسبها. يعتقد توم أن سنته الفاصلة كانت أفضل قرار اتخذه في حياته.	B1	19	2026-04-09 21:12:04.012846+00
80	The Journey of Learning Arabic	رحلة تعلم اللغة العربية	Learning a second language is a challenging but rewarding experience. Maria, a Spanish teacher from Barcelona, decided to learn Arabic at the age of thirty. She was motivated by her love of Middle Eastern culture and her desire to communicate with her Arabic-speaking neighbours. She began with online lessons three times a week and quickly discovered that Arabic was more complex than she had expected.\n\nOne of the biggest challenges was learning a completely different writing system. Maria practised writing Arabic letters every day and listened to Arabic radio programmes to improve her understanding. She also joined a local language exchange group where she could practise speaking with native speakers.\n\nAfter two years of consistent effort, Maria can now hold basic conversations in Arabic and read simple texts. She says that learning a new language has not only given her practical skills but has also helped her appreciate other cultures in a much deeper way.	تعلم لغة ثانية تجربة صعبة لكنها مجزية. قررت ماريا، معلمة اللغة الإسبانية من برشلونة، تعلم اللغة العربية في سن الثلاثين. كان دافعها حبها للثقافة الشرق أوسطية ورغبتها في التواصل مع جيرانها الناطقين بالعربية. بدأت بدروس عبر الإنترنت ثلاث مرات في الأسبوع، واكتشفت سريعاً أن العربية أكثر تعقيداً مما كانت تتوقع.\n\nكان من أكبر التحديات تعلم نظام كتابة مختلف تماماً. مارست ماريا كتابة الحروف العربية كل يوم واستمعت إلى برامج الراديو العربية لتحسين فهمها. انضمت أيضاً إلى مجموعة تبادل لغوي محلية حيث يمكنها التدرب على الكلام مع الناطقين الأصليين.\n\nبعد عامين من الجهد المستمر، تستطيع ماريا الآن إجراء محادثات أساسية بالعربية وقراءة نصوص بسيطة. تقول إن تعلم لغة جديدة لم يمنحها مهارات عملية فحسب، بل ساعدها أيضاً على تقدير الثقافات الأخرى بطريقة أعمق بكثير.	B1	20	2026-04-09 21:12:04.015914+00
81	Simple Ways to Recycle at Home	طرق بسيطة لإعادة التدوير في المنزل	Many families are now trying to produce less waste at home. One of the easiest ways to do this is by separating rubbish into different bins. Glass, paper, and plastic can all be recycled if they are clean and dry. Some local councils collect these materials directly from your door each week.\n\nAnother good habit is to reuse items before throwing them away. Old jars can store food, and cardboard boxes can be used for storage. Buying fewer plastic bags by using cloth bags at the supermarket also makes a big difference.\n\nThese small changes do not take much time or effort, but they can have a positive effect on the environment. When more people recycle regularly, less rubbish ends up in landfill sites, which helps keep the planet cleaner for future generations.	تحاول كثير من العائلات الآن تقليل النفايات في المنزل. ومن أسهل الطرق للقيام بذلك هو فصل القمامة في صناديق مختلفة. يمكن إعادة تدوير الزجاج والورق والبلاستيك إذا كانت نظيفة وجافة. وتقوم بعض المجالس المحلية بجمع هذه المواد من أمام بابك مباشرة كل أسبوع.\n\nعادة جيدة أخرى هي إعادة استخدام الأشياء قبل التخلص منها. يمكن استخدام البرطمانات القديمة لتخزين الطعام، وصناديق الكرتون للتخزين. كما أن شراء عدد أقل من الأكياس البلاستيكية باستخدام الأكياس القماشية في السوبرماركت يحدث فرقاً كبيراً.\n\nهذه التغييرات الصغيرة لا تستغرق وقتاً أو جهداً كبيراً، لكنها يمكن أن يكون لها تأثير إيجابي على البيئة. عندما يعيد المزيد من الناس التدوير بانتظام، ينتهي المطاف بكميات أقل من القمامة في مواقع الطمر، مما يساعد في إبقاء الكوكب أنظف للأجيال القادمة.	B1	21	2026-04-09 21:13:06.990031+00
82	How Online Shopping Has Changed Us	كيف غيّرت التسوق عبر الإنترنت حياتنا	Online shopping has become a normal part of daily life for millions of people around the world. Instead of visiting physical stores, shoppers can now browse thousands of products from their phones or computers. Items are delivered directly to their homes, often within just one or two days.\n\nThis convenience has changed the way people think about buying things. Many customers read reviews from other buyers before making a decision. They also compare prices across different websites to find the best deal. Discount codes and special offers make online shopping even more attractive.\n\nHowever, there are some disadvantages. Returning unwanted items can be complicated, and some people spend more money than they planned. Online shopping also affects local businesses, as fewer customers visit small shops in town centres. Despite these issues, most people agree that shopping online saves both time and energy.	أصبح التسوق عبر الإنترنت جزءاً طبيعياً من الحياة اليومية لملايين الأشخاص حول العالم. بدلاً من زيارة المتاجر الفعلية، يمكن للمتسوقين الآن تصفح آلاف المنتجات من هواتفهم أو أجهزة الكمبيوتر. وتُوصَّل العناصر مباشرة إلى منازلهم، غالباً في يوم أو يومين فقط.\n\nغيّرت هذه الراحة طريقة تفكير الناس في شراء الأشياء. يقرأ كثير من العملاء مراجعات المشترين الآخرين قبل اتخاذ قرارهم. كما يقارنون الأسعار عبر مواقع مختلفة للعثور على أفضل صفقة. وتجعل رموز الخصم والعروض الخاصة التسوق عبر الإنترنت أكثر جاذبية.\n\nومع ذلك، هناك بعض العيوب. قد يكون إرجاع العناصر غير المرغوب فيها أمراً معقداً، وقد ينفق بعض الأشخاص أكثر مما خططوا له. يؤثر التسوق عبر الإنترنت أيضاً على الشركات المحلية، إذ يزور عدد أقل من العملاء المتاجر الصغيرة في مراكز المدن. على الرغم من هذه المشكلات، يتفق معظم الناس على أن التسوق عبر الإنترنت يوفر الوقت والجهد.	B1	22	2026-04-09 21:13:07.023036+00
83	Starting Fresh in a New City	البداية من جديد في مدينة جديدة	Moving to a new city can be both exciting and challenging at the same time. Everything feels unfamiliar at first — the streets, the transport system, and even the local shops. It takes time to feel comfortable and to understand how things work in a new place.\n\nOne of the biggest challenges is building a social life from scratch. Without friends or family nearby, some people feel lonely during the first few months. Joining local clubs, taking classes, or volunteering are good ways to meet new people and feel more connected to the community.\n\nDespite the difficulties, moving to a new city often brings great opportunities. People discover new interests, develop greater independence, and sometimes find better jobs or education. Many people who have moved say that the experience made them stronger and more confident. With patience and an open mind, settling in becomes easier over time.	يمكن أن يكون الانتقال إلى مدينة جديدة مثيراً وصعباً في نفس الوقت. كل شيء يبدو غير مألوف في البداية — الشوارع ونظام المواصلات وحتى المحلات المحلية. يستغرق الأمر وقتاً لتشعر بالراحة وتفهم كيف تسير الأمور في مكان جديد.\n\nأحد أكبر التحديات هو بناء حياة اجتماعية من الصفر. بدون أصدقاء أو عائلة بالقرب، يشعر بعض الناس بالوحدة خلال الأشهر القليلة الأولى. الانضمام إلى الأندية المحلية أو أخذ دروس أو التطوع طرق جيدة للقاء أشخاص جدد والشعور بارتباط أكبر بالمجتمع.\n\nعلى الرغم من الصعوبات، كثيراً ما يجلب الانتقال إلى مدينة جديدة فرصاً رائعة. يكتشف الناس اهتمامات جديدة، ويطورون استقلالية أكبر، وأحياناً يجدون وظائف أو تعليماً أفضل. يقول كثير ممن انتقلوا إلى مدن جديدة إن التجربة جعلتهم أقوى وأكثر ثقة بالنفس. مع الصبر وعقلية منفتحة، يصبح الاستقرار أسهل مع مرور الوقت.	B1	23	2026-04-09 21:13:07.036826+00
84	Benefits of Having a Part-Time Job	فوائد العمل بدوام جزئي	Many students and young people choose to work part-time while they study or look for a full-time position. A part-time job usually involves working fewer than thirty hours per week, which allows people to manage other responsibilities at the same time.\n\nOne of the main benefits is gaining practical work experience. Employers often look for candidates who have already worked in a professional environment, even in a basic role. Part-time jobs also help people develop useful skills such as communication, time management, and teamwork. These are qualities that are valuable in almost every career.\n\nIn addition, earning a regular income gives young people more financial independence. They can pay for their own transport, social activities, or even save money for the future. Although balancing work and study can be tiring, most people feel that the experience is worth the effort in the long run.	يختار كثير من الطلاب والشباب العمل بدوام جزئي أثناء الدراسة أو البحث عن وظيفة بدوام كامل. يتضمن العمل بدوام جزئي عادةً العمل أقل من ثلاثين ساعة في الأسبوع، مما يتيح للناس إدارة مسؤوليات أخرى في نفس الوقت.\n\nأحد الفوائد الرئيسية هو اكتساب خبرة عملية. كثيراً ما يبحث أصحاب العمل عن مرشحين عملوا بالفعل في بيئة مهنية، حتى في دور أساسي. تساعد الوظائف بدوام جزئي أيضاً الناس على تطوير مهارات مفيدة كالتواصل وإدارة الوقت والعمل الجماعي. وهذه صفات قيّمة في كل مهنة تقريباً.\n\nبالإضافة إلى ذلك، يمنح كسب دخل منتظم الشباب استقلالية مالية أكبر. يمكنهم الدفع مقابل مواصلاتهم وأنشطتهم الاجتماعية أو حتى ادخار المال للمستقبل. على الرغم من أن الموازنة بين العمل والدراسة قد تكون مرهقة، يشعر معظم الناس أن التجربة تستحق الجهد على المدى البعيد.	B1	24	2026-04-09 21:13:07.040624+00
85	Cultural Festivals Bring Communities Together	المهرجانات الثقافية تجمع المجتمعات معاً	Cultural festivals are special events that celebrate the traditions, food, music, and art of a particular group of people. They take place all over the world and attract both local residents and tourists. Some festivals have been celebrated for hundreds of years and remain an important part of community identity.\n\nThese events give people a chance to share their heritage with others and to learn about different cultures. Visitors can taste traditional food, watch live performances, and buy handmade crafts. For many attendees, a festival is also a chance to feel proud of where they come from.\n\nFestivals also have economic benefits for local areas. They bring more visitors to a region, which supports restaurants, hotels, and small businesses. Many cities actively promote their cultural festivals to attract tourism throughout the year. Overall, these celebrations play an important role in both preserving culture and strengthening community bonds.	المهرجانات الثقافية فعاليات خاصة تحتفل بتقاليد وطعام وموسيقى وفن مجموعة معينة من الناس. تُقام في جميع أنحاء العالم وتستقطب السكان المحليين والسياح على حد سواء. وقد احتُفل ببعض المهرجانات منذ مئات السنين، ولا تزال جزءاً مهماً من هوية المجتمع.\n\nتمنح هذه الفعاليات الناس فرصة لمشاركة تراثهم مع الآخرين والتعرف على ثقافات مختلفة. يمكن للزوار تذوق الأطعمة التقليدية ومشاهدة العروض الحية وشراء الحرف اليدوية. بالنسبة لكثير من الحاضرين، يُعد المهرجان أيضاً فرصة للشعور بالفخر بجذورهم.\n\nللمهرجانات أيضاً فوائد اقتصادية للمناطق المحلية. إذ تجلب المزيد من الزوار إلى المنطقة، مما يدعم المطاعم والفنادق والشركات الصغيرة. تعمل كثير من المدن بنشاط على الترويج لمهرجاناتها الثقافية لاستقطاب السياحة على مدار العام. بشكل عام، تؤدي هذه الاحتفالات دوراً مهماً في الحفاظ على الثقافة وتعزيز الروابط المجتمعية.	B1	25	2026-04-09 21:13:07.043277+00
86	Eating Well Without Spending Much	الأكل الصحي دون إنفاق الكثير	Many people think that eating healthy food is expensive, but this is not always true. With a little planning, it is possible to prepare nutritious meals on a tight budget. Buying seasonal vegetables and fruits, for example, is usually much cheaper than buying imported ones.\n\nCooking at home instead of eating at restaurants can also save a lot of money. Simple dishes like lentil soup, rice with vegetables, or homemade bread are both healthy and affordable. Buying ingredients in larger quantities can reduce the cost even further.\n\nPlanning your meals for the week before you go shopping is another useful habit. It helps you avoid buying things you do not need and reduces food waste. With some effort, good nutrition does not have to cost a lot.	يعتقد كثير من الناس أن تناول الطعام الصحي أمر مكلف، لكن هذا ليس صحيحاً دائماً. مع القليل من التخطيط، يمكن تحضير وجبات مغذية بميزانية محدودة. شراء الخضروات والفواكه الموسمية، على سبيل المثال، يكون عادةً أرخص بكثير من شراء المستوردة منها.\n\nالطهي في المنزل بدلاً من تناول الطعام في المطاعم يمكن أن يوفر أيضاً الكثير من المال. الأطباق البسيطة كشوربة العدس والأرز مع الخضار والخبز المنزلي تُعدّ صحية وبأسعار معقولة. شراء المكونات بكميات أكبر يمكن أن يقلل التكلفة أكثر.\n\nالتخطيط لوجباتك خلال الأسبوع قبل الذهاب للتسوق عادة مفيدة أخرى. إذ يساعدك على تجنب شراء ما لا تحتاجه ويقلل من هدر الطعام. مع بعض الجهد، لا يجب أن تكون التغذية الجيدة مكلفة.	B1	26	2026-04-09 21:14:07.532841+00
87	The Rise of Working From Home	ظاهرة العمل من المنزل	Working from home has become very common in recent years, especially after the global pandemic changed the way many companies operate. Millions of employees around the world now complete their tasks without travelling to an office every day. This shift has brought both advantages and challenges.\n\nOne major benefit is saving time and money on commuting. People can use those extra hours for exercise, family activities, or simply resting. Many workers also report feeling less stressed when they work in a comfortable home environment.\n\nHowever, working from home is not easy for everyone. Some people find it difficult to concentrate because of distractions like children, noise, or household tasks. Others miss the social interaction of an office. Finding a good balance between work and personal life remains an important challenge for remote workers.	أصبح العمل من المنزل شائعاً جداً في السنوات الأخيرة، خاصةً بعد أن غيّر الوباء العالمي طريقة عمل كثير من الشركات. يُكمل ملايين الموظفين حول العالم الآن مهامهم دون السفر إلى المكتب كل يوم. وقد أحدث هذا التحول مزايا وتحديات في آنٍ واحد.\n\nمن أبرز الفوائد توفير الوقت والمال الذي كان يُنفق في التنقل. يمكن للناس استخدام تلك الساعات الإضافية في الرياضة أو الأنشطة العائلية أو الراحة. كما يشعر كثير من العمال بضغط نفسي أقل حين يعملون في بيئة منزلية مريحة.\n\nغير أن العمل من المنزل ليس سهلاً على الجميع. يجد بعض الأشخاص صعوبة في التركيز بسبب مشتتات كالأطفال والضوضاء والمهام المنزلية. ويفتقد آخرون التفاعل الاجتماعي في المكتب. ويبقى إيجاد توازن جيد بين العمل والحياة الشخصية تحدياً مهماً للعاملين عن بُعد.	B1	27	2026-04-09 21:14:07.537278+00
88	How Public Transport Shapes Our Cities	كيف يُشكّل النقل العام مدننا	Public transport plays a vital role in modern cities. Buses, trains, and metro systems allow millions of people to move around quickly and efficiently without using private cars. This reduces traffic congestion and helps lower air pollution, making cities more pleasant and healthier places to live.\n\nMany countries invest heavily in developing their public transport networks. Cities like Tokyo, London, and Singapore are known worldwide for having reliable and well-organised systems. In these cities, most residents prefer using public transport over driving because it is faster and more affordable.\n\nHowever, not all cities have efficient public transport. In some places, services are slow, infrequent, or do not reach many areas. Improving these systems requires significant government investment and careful planning. When public transport works well, it benefits not just individual passengers but the entire community.	يؤدي النقل العام دوراً حيوياً في المدن الحديثة. تُتيح الحافلات والقطارات وأنظمة المترو لملايين الأشخاص التنقل بسرعة وكفاءة دون استخدام السيارات الخاصة. مما يقلل من الازدحام المروري ويساعد على خفض تلوث الهواء، مما يجعل المدن أماكن أكثر متعة وصحة للعيش.\n\nتستثمر دول كثيرة بشكل كبير في تطوير شبكات النقل العام لديها. وتشتهر مدن مثل طوكيو ولندن وسنغافورة عالمياً بأنظمتها الموثوقة والمنظمة جيداً. في هذه المدن، يفضل معظم السكان استخدام النقل العام على القيادة لأنه أسرع وأقل تكلفة.\n\nلكن ليس لجميع المدن وسائل نقل عام فعّالة. في بعض الأماكن تكون الخدمات بطيئة أو غير منتظمة أو لا تصل إلى كثير من المناطق. يتطلب تحسين هذه الأنظمة استثماراً حكومياً كبيراً وتخطيطاً دقيقاً. حين يعمل النقل العام بشكل جيد، يستفيد منه ليس فقط الركاب بل المجتمع بأسره.	B1	28	2026-04-09 21:14:07.539658+00
89	A Holiday I Will Never Forget	إجازة لن أنساها أبداً	Last summer, I travelled with my family to a small coastal town in the south of Portugal. It was our first time visiting the country, and we were all very excited. The journey took about four hours by plane, and when we arrived, the warm sunshine and fresh sea air immediately made us feel relaxed.\n\nWe spent most of our days exploring the narrow streets of the old town, visiting local markets, and eating fresh seafood by the beach. The people were extremely friendly and welcoming, which made us feel very comfortable throughout our stay.\n\nOne evening, we watched a beautiful sunset from a cliff above the ocean. The sky turned bright orange and pink, and everything felt peaceful and perfect. It was a truly special moment that our family still talks about today. I hope to return to Portugal one day.	في الصيف الماضي، سافرت مع عائلتي إلى مدينة ساحلية صغيرة في جنوب البرتغال. كانت زيارتنا الأولى للبلاد وكنا جميعاً متحمسين جداً. استغرقت الرحلة نحو أربع ساعات بالطائرة، وحين وصلنا جعلنا دفء الشمس وهواء البحر المنعش نشعر بالاسترخاء فوراً.\n\nأمضينا معظم أيامنا نستكشف الأزقة الضيقة في المدينة القديمة، ونزور الأسواق المحلية، ونتناول المأكولات البحرية الطازجة على الشاطئ. كان الناس ودودين للغاية ومرحبين، مما جعلنا نشعر بالراحة طوال فترة إقامتنا.\n\nفي إحدى الأمسيات، شاهدنا غروباً شمسياً رائعاً من فوق منحدر يطل على المحيط. تحوّل السماء إلى اللون البرتقالي الزاهي والوردي، وساد شعور بالهدوء والكمال. كانت لحظة استثنائية حقاً لا تزال عائلتنا تتحدث عنها حتى اليوم. أتمنى أن أعود إلى البرتغال يوماً ما.	B1	29	2026-04-09 21:14:07.543327+00
117	Education Inequality Holding Students Back	عدم المساواة في التعليم يُعيق الطلاب	Access to quality education remains deeply unequal across many societies. Children from wealthy families typically attend well-resourced schools with experienced teachers, modern facilities, and a wide range of extracurricular activities. In contrast, students from lower-income backgrounds often attend underfunded schools where overcrowded classrooms and limited resources make learning considerably more difficult.\n\nThis disparity has long-term consequences that extend well beyond the classroom. Research consistently shows that students who receive a stronger early education are more likely to attend university, secure higher-paying jobs, and enjoy better health outcomes throughout their lives. Meanwhile, those who lack access to quality schooling frequently find themselves trapped in cycles of poverty that are extremely difficult to escape.\n\nSeveral governments have introduced targeted policies to address these gaps, including increased funding for disadvantaged schools and scholarship programmes for talented students from low-income families. Nevertheless, experts warn that without deeper structural reforms, educational inequality will continue to reproduce social disadvantage from one generation to the next.	لا يزال الوصول إلى التعليم الجيد متفاوتًا بشكل عميق في كثير من المجتمعات. يرتاد أبناء الأسر الميسورة عادةً مدارسَ جيدة التجهيز تضم معلمين ذوي خبرة ومرافق حديثة وأنشطة لا منهجية متنوعة. في المقابل، يلتحق الطلاب من الأسر ذات الدخل المنخفض في الغالب بمدارس تعاني نقصًا في التمويل، حيث تجعل الفصول المكتظة والموارد الشحيحة التعلمَ أكثر صعوبة.\n\nولهذا التفاوت عواقب بعيدة المدى تتخطى جدران الفصل الدراسي. تُظهر الأبحاث باستمرار أن الطلاب الذين يتلقون تعليمًا مبكرًا أقوى أكثر ميلًا لالتحاق بالجامعات والحصول على وظائف ذات رواتب أعلى والتمتع بصحة أفضل على مدار حياتهم. في حين يجد الذين يفتقرون إلى التعليم الجيد أنفسهم محاصرين في دوامات الفقر يصعب الفكاك منها.\n\nأطلقت حكومات عدة سياسات موجّهة لسد هذه الفجوات، منها زيادة تمويل المدارس المحرومة ومنح دراسية للطلاب الموهوبين من الأسر محدودة الدخل. بيد أن الخبراء يحذرون من أنه بغياب إصلاحات هيكلية أعمق، سيستمر عدم المساواة في التعليم في إعادة إنتاج التهميش الاجتماعي من جيل إلى آخر.	B2	12	2026-04-09 21:22:32.12017+00
90	Smart Ways to Save for the Future	طرق ذكية للادخار من أجل المستقبل	Saving money is one of the most important financial habits a person can develop. Whether you are saving for education, a home, retirement, or emergencies, putting money aside regularly can make a big difference over time. Even small amounts saved consistently can grow into a significant sum.\n\nOne effective strategy is to set a monthly savings goal and treat it like a necessary expense. As soon as you receive your salary, transfer a fixed amount directly into a savings account before spending on anything else. This method, often called paying yourself first, helps build savings without relying on willpower.\n\nAvoiding unnecessary purchases is equally important. Before buying something, ask yourself whether you truly need it or simply want it. Reducing small daily expenses, like expensive coffee or unused subscriptions, can free up more money for your savings goals over the long term.	يُعدّ الادخار من أهم العادات المالية التي يمكن للشخص تطويرها. سواء كنت تدخر من أجل التعليم أو المنزل أو التقاعد أو حالات الطوارئ، فإن تخصيص مبلغ بانتظام يمكن أن يُحدث فرقاً كبيراً بمرور الوقت. حتى المبالغ الصغيرة المدخرة باستمرار يمكن أن تتراكم لتصبح مبلغاً كبيراً.\n\nمن الاستراتيجيات الفعّالة تحديد هدف ادخار شهري والتعامل معه كنفقة ضرورية. بمجرد استلام راتبك، حوّل مبلغاً ثابتاً مباشرةً إلى حساب ادخار قبل الإنفاق على أي شيء آخر. تساعد هذه الطريقة، التي تُعرف بـ'ادفع لنفسك أولاً'، على بناء المدخرات دون الاعتماد على قوة الإرادة.\n\nتجنّب المشتريات غير الضرورية لا يقل أهمية. قبل شراء أي شيء، اسأل نفسك إن كنت تحتاجه فعلاً أم تريده فحسب. تقليل النفقات اليومية الصغيرة كالقهوة الغالية أو الاشتراكات غير المستخدمة يمكن أن يوفر مزيداً من المال لأهدافك الادخارية على المدى البعيد.	B1	30	2026-04-09 21:14:07.546924+00
91	Managing Stress in the Workplace	إدارة التوتر في بيئة العمل	Many employees today feel stressed at work due to heavy workloads, tight deadlines, and pressure from managers. This kind of stress can affect both physical health and mental wellbeing. If it is not managed properly, it can lead to serious problems such as burnout and anxiety.\n\nThere are several effective ways to reduce workplace stress. Taking short breaks during the day, talking to a trusted colleague, and organizing tasks into a clear list can all help. Exercise and enough sleep are also important for staying calm and focused.\n\nEmployers also have a responsibility to support their staff. Offering flexible working hours, providing mental health resources, and encouraging open communication can create a healthier work environment. When both employees and managers work together, stress becomes much easier to manage.	يشعر كثير من الموظفين اليوم بالتوتر في العمل بسبب الأعباء الثقيلة والمواعيد النهائية الضيقة والضغط من المديرين. يمكن أن يؤثر هذا النوع من التوتر على الصحة الجسدية والعقلية معاً. وإذا لم تتم إدارته بشكل صحيح، فقد يؤدي إلى مشكلات خطيرة مثل الإرهاق الوظيفي والقلق.\n\nهناك عدة طرق فعّالة للحد من التوتر في مكان العمل. يمكن أن تساعد أخذ فترات راحة قصيرة خلال اليوم، والتحدث إلى زميل موثوق، وتنظيم المهام في قائمة واضحة. كما أن ممارسة الرياضة والحصول على قسط كافٍ من النوم مهمان للحفاظ على الهدوء والتركيز.\n\nيتحمل أصحاب العمل أيضاً مسؤولية دعم موظفيهم. يمكن أن يُسهم تقديم ساعات عمل مرنة وتوفير موارد الصحة النفسية وتشجيع التواصل المفتوح في خلق بيئة عمل أكثر صحة. وعندما يتعاون الموظفون والمديرون معاً، يصبح التعامل مع التوتر أمراً أسهل بكثير.	B1	31	2026-04-09 21:15:08.650667+00
92	Applying to a University Abroad	التقدم للالتحاق بجامعة في الخارج	Applying to a university in another country can be an exciting but challenging process. Students must research different universities, compare programs, and check the entry requirements carefully. Most universities abroad require academic transcripts, a personal statement, and proof of English language ability, such as an IELTS score.\n\nOnce a student chooses a university, they must complete an online application form and submit all required documents before the deadline. It is important to check each university's specific requirements, as they can vary greatly. Some universities may also ask for letters of recommendation from teachers.\n\nAfter submitting the application, students usually wait several weeks for a response. If accepted, they will receive an offer letter, which they need to apply for a student visa. Planning ahead and staying organized makes the entire process much smoother.	يمكن أن تكون عملية التقدم إلى جامعة في بلد آخر تجربةً مثيرة ولكنها مليئة بالتحديات. يجب على الطلاب البحث في الجامعات المختلفة ومقارنة البرامج والتحقق بعناية من متطلبات القبول. تشترط معظم الجامعات في الخارج تقديم كشوف الدرجات الأكاديمية وخطاب الدوافع الشخصية وإثبات مستوى اللغة الإنجليزية، مثل درجة IELTS.\n\nبمجرد اختيار الطالب لجامعته، يجب عليه ملء استمارة التقدم الإلكترونية وتقديم جميع المستندات المطلوبة قبل الموعد النهائي. من المهم التحقق من المتطلبات الخاصة بكل جامعة، إذ قد تتفاوت كثيراً. وقد تطلب بعض الجامعات أيضاً خطابات توصية من المعلمين.\n\nبعد تقديم الطلب، ينتظر الطلاب عادةً عدة أسابيع للحصول على رد. وفي حال القبول، يتلقون خطاب قبول رسمياً يحتاجون إليه للتقدم بطلب تأشيرة طالب. ويُسهم التخطيط المسبق والتنظيم الجيد في جعل العملية برمتها أكثر سلاسة.	B1	32	2026-04-09 21:15:08.65536+00
93	Using Renewable Energy at Home	استخدام الطاقة المتجددة في المنزل	More and more homeowners are choosing to use renewable energy sources to power their homes. Solar panels are one of the most popular options. They are installed on rooftops and convert sunlight into electricity, which can reduce monthly energy bills significantly. In many countries, homeowners can even sell extra electricity back to the national grid.\n\nAnother common choice is a heat pump, which uses natural energy from the air or ground to heat the home. Although the initial cost of installing these systems can be high, government grants and subsidies are often available to help cover the expenses.\n\nSwitching to renewable energy not only saves money in the long term but also helps protect the environment by reducing carbon emissions. Many experts believe that home renewable energy will become standard in the near future.	يختار عدد متزايد من أصحاب المنازل استخدام مصادر الطاقة المتجددة لتشغيل منازلهم. تُعدّ الألواح الشمسية من أكثر الخيارات شيوعاً، إذ تُركَّب على أسطح المنازل وتحوّل أشعة الشمس إلى كهرباء، مما يُقلل من فواتير الطاقة الشهرية بشكل ملحوظ. وفي كثير من الدول، يمكن لأصحاب المنازل بيع الكهرباء الفائضة إلى شبكة الطاقة الوطنية.\n\nخيار آخر شائع هو مضخة الحرارة، التي تستخدم الطاقة الطبيعية من الهواء أو الأرض لتدفئة المنزل. وعلى الرغم من أن التكلفة الأولية لتركيب هذه الأنظمة قد تكون مرتفعة، إلا أن المنح الحكومية والدعم المالي متاحان في الغالب للمساعدة في تغطية النفقات.\n\nلا يوفر التحول إلى الطاقة المتجددة المال على المدى البعيد فحسب، بل يُسهم أيضاً في حماية البيئة من خلال تقليل انبعاثات الكربون. ويعتقد كثير من الخبراء أن الطاقة المتجددة المنزلية ستصبح أمراً معتاداً في المستقبل القريب.	B1	33	2026-04-09 21:15:08.658689+00
94	A Community Charity Project Brings Change	مشروع خيري مجتمعي يُحدث التغيير	A small group of volunteers in the city of Leeds recently launched a charity project to help elderly residents who live alone. The project, called 'Friendly Neighbors,' organizes weekly visits, grocery shopping assistance, and social events for isolated older people. It began with just ten volunteers but has now grown to over eighty members.\n\nFunding for the project comes from local businesses, community donations, and a small grant from the city council. The organizers use this money to cover transport costs, buy supplies, and run monthly community lunches where residents can meet and socialize.\n\nThe impact of the project has been remarkable. Many elderly participants say they feel less lonely and more connected to their community. Local officials have praised the initiative and are now considering expanding similar programs to other parts of the city.	أطلقت مجموعة صغيرة من المتطوعين في مدينة ليدز مؤخراً مشروعاً خيرياً لمساعدة كبار السن الذين يعيشون وحدهم. يُنظّم المشروع، المعروف بـ'الجيران الودودون'، زيارات أسبوعية ومساعدة في التسوق وفعاليات اجتماعية لكبار السن المنعزلين. بدأ المشروع بعشرة متطوعين فقط، وقد نما الآن ليضم أكثر من ثمانين عضواً.\n\nيأتي تمويل المشروع من الشركات المحلية والتبرعات المجتمعية ومنحة صغيرة من المجلس البلدي. يستخدم المنظمون هذه الأموال لتغطية تكاليف النقل وشراء المستلزمات وإقامة غدوات مجتمعية شهرية يجتمع فيها السكان ويتواصلون اجتماعياً.\n\nكان تأثير المشروع لافتاً للنظر. يقول كثير من المشاركين من كبار السن إنهم يشعرون بوحدة أقل وارتباط أكبر بمجتمعهم. وقد أشاد المسؤولون المحليون بهذه المبادرة ويدرسون حالياً توسيع برامج مماثلة في مناطق أخرى من المدينة.	B1	34	2026-04-09 21:15:08.662526+00
95	Travel Insurance and Staying Safe Abroad	التأمين على السفر والسلامة في الخارج	Travelling to a foreign country can be a wonderful experience, but it is important to be prepared for unexpected situations. One of the most essential steps before any trip is purchasing travel insurance. A good policy will cover medical emergencies, lost luggage, cancelled flights, and even emergency evacuation if necessary.\n\nWhen choosing travel insurance, it is important to read the policy carefully. Some cheaper plans do not cover certain activities such as adventure sports or travel to high-risk regions. Travellers should also make sure the coverage amount is sufficient for the country they are visiting, as medical costs vary greatly around the world.\n\nBeyond insurance, staying safe abroad requires common sense. Keeping copies of important documents, avoiding unfamiliar areas at night, and registering with your country's embassy can all make a significant difference if problems arise during your trip.	يمكن أن يكون السفر إلى بلد أجنبي تجربةً رائعة، ولكن من المهم الاستعداد للمواقف غير المتوقعة. من أهم الخطوات قبل أي رحلة هو الحصول على تأمين سفر. تغطي وثيقة التأمين الجيدة حالات الطوارئ الطبية والأمتعة المفقودة والرحلات الملغاة، بل وعمليات الإخلاء الطارئ عند الضرورة.\n\nعند اختيار تأمين السفر، من المهم قراءة الوثيقة بعناية. فبعض الخطط الأرخص لا تغطي أنشطة معينة مثل الرياضات المغامرة أو السفر إلى المناطق عالية الخطورة. يجب على المسافرين أيضاً التأكد من أن مبلغ التغطية كافٍ للبلد الذي يزورونه، إذ تتفاوت التكاليف الطبية كثيراً حول العالم.\n\nبالإضافة إلى التأمين، يتطلب البقاء آمناً في الخارج استخدام الحس السليم. يمكن أن يُحدث الاحتفاظ بنسخ من الوثائق المهمة وتجنب المناطق غير المألوفة ليلاً والتسجيل لدى سفارة بلدك فرقاً كبيراً إذا نشأت مشكلات أثناء رحلتك.	B1	35	2026-04-09 21:15:08.666138+00
96	Growing Together in Our Community Garden	ننمو معاً في حديقتنا المجتمعية	In the heart of the city, a small piece of land has been transformed into a beautiful community garden. Residents from different backgrounds come together every weekend to plant vegetables, flowers, and herbs. The garden provides fresh food for local families and creates a peaceful space where people can relax.\n\nThe project started three years ago when a group of neighbours decided to use an empty lot. They raised money through local donations and received support from the city council. Today, over fifty families have their own small plots.\n\nBeyond growing food, the garden has become a place for sharing knowledge and building friendships. Children learn where their food comes from, and older residents teach traditional growing methods. It is a simple idea that has brought real benefits to the whole community.	في قلب المدينة، تحوّلت قطعة أرض صغيرة إلى حديقة مجتمعية جميلة. يجتمع السكان من خلفيات مختلفة كل عطلة نهاية أسبوع لزراعة الخضروات والزهور والأعشاب. توفر الحديقة غذاءً طازجاً للعائلات المحلية وتخلق مساحة هادئة يمكن للناس فيها الاسترخاء.\n\nبدأ المشروع قبل ثلاث سنوات عندما قرّرت مجموعة من الجيران استخدام قطعة أرض فارغة. جمعوا الأموال من خلال التبرعات المحلية وحصلوا على دعم من المجلس البلدي. واليوم، تمتلك أكثر من خمسين عائلة قطعها الصغيرة الخاصة.\n\nإلى جانب زراعة الغذاء، أصبحت الحديقة مكاناً لتبادل المعرفة وبناء الصداقات. يتعلم الأطفال من أين تأتي طعامهم، ويعلّم كبار السن الأساليب التقليدية في الزراعة. إنها فكرة بسيطة أفادت المجتمع بأكمله بشكل حقيقي.	B1	36	2026-04-09 21:16:08.791689+00
97	Switching Off for the Weekend	إيقاف التواصل الرقمي في عطلة نهاية الأسبوع	Many people today feel stressed because they spend too much time looking at screens. Phones, laptops, and social media can make it difficult to truly rest. As a result, a growing number of people are trying what is called a digital detox weekend, where they switch off all their devices for two full days.\n\nDuring these weekends, people read books, spend time in nature, cook meals, and have face-to-face conversations. Many report that they sleep better and feel calmer after just one weekend without technology.\n\nHowever, a digital detox is not always easy. Some people feel anxious without their phones at first. Experts suggest starting slowly by turning off notifications for a few hours each day. Over time, it becomes easier to enjoy life without constantly checking a screen.	يشعر كثير من الناس اليوم بالتوتر بسبب قضاء وقت طويل أمام الشاشات. يمكن للهواتف والحواسيب ووسائل التواصل الاجتماعي أن تجعل الراحة الحقيقية أمراً صعباً. لذلك، يجرّب عدد متزايد من الناس ما يُعرف بعطلة نهاية الأسبوع الخالية من الرقميات، حيث يوقفون جميع أجهزتهم لمدة يومين كاملين.\n\nخلال هذه العطلات، يقرأ الناس الكتب ويقضون وقتاً في الطبيعة ويطبخون الوجبات ويتحدثون وجهاً لوجه. يُفيد كثيرون بأنهم ينامون بشكل أفضل ويشعرون بهدوء أكبر بعد عطلة واحدة فقط بعيداً عن التكنولوجيا.\n\nومع ذلك، لا يكون التخلص من الرقميات سهلاً دائماً. يشعر بعض الناس بالقلق في البداية دون هواتفهم. يقترح الخبراء البدء ببطء عن طريق إيقاف الإشعارات لبضع ساعات يومياً. بمرور الوقت، يصبح الاستمتاع بالحياة دون التحقق المستمر من الشاشة أمراً أيسر.	B1	37	2026-04-09 21:16:08.796853+00
98	How to Start Your Small Business	كيف تبدأ مشروعك التجاري الصغير	Starting a small business can be exciting, but it also requires careful planning. The first step is to identify a product or service that people actually need. It is important to research your market and understand who your customers will be. Many new business owners also create a simple business plan to organise their ideas and manage their money.\n\nFunding is often the biggest challenge. Some people use their savings, while others apply for small business loans or seek support from family and friends. Free advice is also available from local business centres and online resources.\n\nSuccess does not happen overnight. Most small businesses face difficulties in the first year. However, with determination, flexibility, and a willingness to learn from mistakes, many entrepreneurs eventually build something they are proud of. Starting small is perfectly fine.	يمكن أن يكون بدء مشروع تجاري صغير أمراً مثيراً، لكنه يتطلب أيضاً تخطيطاً دقيقاً. الخطوة الأولى هي تحديد منتج أو خدمة يحتاجها الناس فعلاً. من المهم دراسة السوق وفهم من سيكون عملاؤك. كما يضع كثير من أصحاب الأعمال الجدد خطة عمل بسيطة لتنظيم أفكارهم وإدارة أموالهم.\n\nغالباً ما يكون التمويل التحدي الأكبر. يستخدم بعض الناس مدخراتهم، بينما يتقدم آخرون للحصول على قروض للأعمال الصغيرة أو يطلبون الدعم من العائلة والأصدقاء. كما تتوفر نصائح مجانية من مراكز الأعمال المحلية والموارد الإلكترونية.\n\nلا يحدث النجاح بين عشية وضحاها. تواجه معظم الأعمال الصغيرة صعوبات في السنة الأولى. غير أنه مع التصميم والمرونة والاستعداد للتعلم من الأخطاء، يبني كثير من رواد الأعمال في نهاية المطاف شيئاً يفخرون به. البدء بخطوات صغيرة أمر جيد تماماً.	B1	38	2026-04-09 21:16:08.800749+00
99	Learning Never Stops at Any Age	التعلم لا يتوقف في أي سنّ	Many people believe that learning is only for young people in school. However, research shows that the human brain can develop and grow at any age. This idea, known as lifelong learning, encourages people to keep gaining new knowledge and skills throughout their entire lives.\n\nLifelong learning can take many forms. Some people attend evening classes after work, while others watch online tutorials or join local clubs. Learning a new language, playing a musical instrument, or developing a professional skill are all excellent examples. The key is to stay curious and open to new experiences.\n\nThe benefits are significant. Continuing to learn helps keep the mind sharp, improves confidence, and can even open new career opportunities. Studies also suggest that mentally active people are less likely to develop memory problems as they age. It is never too late to begin.	يعتقد كثير من الناس أن التعلم مخصص للشباب في المدارس فحسب. غير أن الأبحاث تُظهر أن الدماغ البشري يمكنه التطور والنمو في أي سنّ. هذه الفكرة، المعروفة بالتعلم مدى الحياة، تشجع الناس على مواصلة اكتساب المعرفة والمهارات الجديدة طوال حياتهم.\n\nيمكن أن يتخذ التعلم مدى الحياة أشكالاً عديدة. يحضر بعض الناس دروساً مسائية بعد العمل، بينما يشاهد آخرون دروساً تعليمية عبر الإنترنت أو ينضمون إلى نوادٍ محلية. تعلّم لغة جديدة أو العزف على آلة موسيقية أو تطوير مهارة مهنية كلها أمثلة ممتازة. المفتاح هو الحفاظ على الفضول والانفتاح على التجارب الجديدة.\n\nالفوائد كبيرة. يساعد الاستمرار في التعلم على إبقاء العقل نشطاً وتحسين الثقة بالنفس، وقد يفتح حتى فرص عمل جديدة. تشير الدراسات أيضاً إلى أن الأشخاص النشطين ذهنياً أقل عرضة لمشاكل الذاكرة مع التقدم في العمر. لا يوجد وقت متأخر للبدء.	B1	39	2026-04-09 21:16:08.804113+00
100	Sports Can Improve Your Mental Health	الرياضة يمكن أن تحسّن صحتك النفسية	Most people know that exercise is good for the body, but fewer realise how powerful it can be for mental health. Regular physical activity, such as running, swimming, or playing team sports, has been shown to reduce feelings of stress, anxiety, and depression. Even a short thirty-minute walk can improve a person's mood significantly.\n\nWhen we exercise, the brain releases chemicals called endorphins, which create feelings of happiness and energy. Team sports have an additional benefit because they also involve social connection. Playing with others builds friendships and gives people a sense of belonging, which is important for emotional wellbeing.\n\nExperts recommend at least 150 minutes of moderate exercise each week. You do not need to be a professional athlete to benefit. Simply choosing an activity you enjoy and doing it regularly can make a big difference to how you feel every day.	يعرف معظم الناس أن الرياضة مفيدة للجسم، لكن قلّة منهم يُدركون مدى تأثيرها القوي على الصحة النفسية. ثبت أن النشاط البدني المنتظم، كالجري والسباحة وممارسة الرياضات الجماعية، يقلل من مشاعر التوتر والقلق والاكتئاب. حتى المشي لمدة ثلاثين دقيقة يمكن أن يحسّن مزاج الشخص بشكل ملحوظ.\n\nعندما نمارس الرياضة، يُفرز الدماغ مواد كيميائية تُسمى الإندورفينات، والتي تخلق مشاعر السعادة والطاقة. للرياضات الجماعية فائدة إضافية لأنها تتضمن أيضاً التواصل الاجتماعي. يبني اللعب مع الآخرين الصداقات ويمنح الناس شعوراً بالانتماء، وهو أمر مهم للصحة العاطفية.\n\nيوصي الخبراء بممارسة ما لا يقل عن 150 دقيقة من التمارين المعتدلة أسبوعياً. لست بحاجة إلى أن تكون رياضياً محترفاً لتحقيق الفائدة. يمكن لمجرد اختيار نشاط تستمتع به وممارسته بانتظام أن يُحدث فرقاً كبيراً في طريقة شعورك كل يوم.	B1	40	2026-04-09 21:16:08.816553+00
101	The Growing Problem of City Noise	مشكلة الضوضاء المتزايدة في المدن	Living in a busy city can be exciting, but it also comes with serious challenges. One of the biggest problems that many city residents face is noise pollution. Traffic, construction work, and loud music from shops and restaurants can make it very difficult for people to relax or sleep properly.\n\nResearchers have found that constant noise can cause health problems such as stress, high blood pressure, and even hearing damage over time. Children who live near busy roads often find it harder to concentrate at school.\n\nSome cities are now taking action to reduce noise levels. They are creating quiet zones in parks, setting limits on construction hours, and encouraging people to use electric vehicles. These steps show that city life can be improved when communities work together toward a healthier environment.	قد يكون العيش في مدينة صاخبة أمرًا مثيرًا، لكنه يأتي أيضًا مع تحديات جدية. ومن أبرز المشكلات التي يواجهها كثير من سكان المدن هي تلوث الضوضاء. إذ يمكن أن تجعل حركة المرور وأعمال البناء والموسيقى الصاخبة من المحلات والمطاعم الاسترخاء أو النوم الجيد أمرًا بالغ الصعوبة.\n\nوقد وجد الباحثون أن الضوضاء المستمرة قد تسبب مشكلات صحية كالتوتر وارتفاع ضغط الدم، بل وتلف السمع على المدى البعيد. كما يجد الأطفال الذين يعيشون بالقرب من الطرق المزدحمة صعوبةً أكبر في التركيز في المدرسة.\n\nبدأت بعض المدن الآن في اتخاذ إجراءات للحد من مستويات الضوضاء، من بينها إنشاء مناطق هادئة في الحدائق، وتحديد ساعات البناء المسموح بها، وتشجيع الناس على استخدام السيارات الكهربائية. تُظهر هذه الخطوات أن الحياة في المدينة يمكن تحسينها حين تتعاون المجتمعات من أجل بيئة أكثر صحة.	B1	41	2026-04-09 21:17:15.395676+00
102	Leaving Medicine to Become a Chef	ترك الطب ليصبح طاهيًا	After working as a doctor for twelve years, Sara decided to make a surprising change. She left her well-paid job at a hospital and enrolled in a professional cooking school. Many people around her thought she was making a big mistake, but Sara felt that cooking was her true passion.\n\nThe first year was not easy. Sara had to learn many new skills while living on a much smaller income. She practiced recipes every evening and worked part-time in a local restaurant to gain experience. There were moments when she doubted her decision.\n\nToday, Sara owns a successful small restaurant that focuses on healthy Mediterranean food. She says she has never felt happier in her work. Her story shows that it is never too late to follow your dreams, even when the path is difficult.	بعد اثني عشر عامًا من العمل طبيبةً، قررت سارة إجراء تغيير مفاجئ في حياتها. فتركت وظيفتها ذات الراتب المرتفع في مستشفى والتحقت بمدرسة طهي احترافية. اعتقد كثير من المقربين منها أنها ترتكب خطأً كبيرًا، لكن سارة كانت تشعر أن الطهي هو شغفها الحقيقي.\n\nلم تكن السنة الأولى سهلة، إذ كان عليها تعلم مهارات جديدة كثيرة مع التعامل مع دخل أقل بكثير. كانت تتدرب على الوصفات كل مساء وتعمل بدوام جزئي في مطعم محلي لاكتساب الخبرة. وكانت هناك لحظات شكّت فيها في قرارها.\n\nتمتلك سارة اليوم مطعمًا صغيرًا ناجحًا يركز على الطعام المتوسطي الصحي. وتقول إنها لم تشعر قط بسعادة أكبر في عملها. تُثبت قصتها أنه لا يوجد وقت متأخر لاتباع أحلامك، حتى حين يكون الطريق صعبًا.	B1	42	2026-04-09 21:17:15.434044+00
103	Simple Ways to Reduce Food Waste	طرق بسيطة للحد من هدر الطعام	Every year, millions of tons of food are thrown away around the world. This is not only a waste of money but also causes serious harm to the environment. When food ends up in landfills, it releases greenhouse gases that contribute to climate change. The good news is that small changes in daily habits can make a big difference.\n\nOne effective method is meal planning. By deciding what you will eat during the week before shopping, you can buy only what you need. Storing food correctly also helps it stay fresh for longer. For example, keeping certain fruits and vegetables in the refrigerator can prevent them from spoiling quickly.\n\nDonating extra food to local charities or composting leftovers are also great options. When communities work together to reduce waste, both people and the planet benefit greatly.	يُرمى كل عام ملايين الأطنان من الطعام حول العالم. وهذا لا يُعدّ هدرًا للمال فحسب، بل يُلحق أيضًا ضررًا بالغًا بالبيئة. فعندما ينتهي الطعام في مكبات النفايات، يُطلق غازات دفيئة تُسهم في تغير المناخ. والخبر السار أن تغييرات صغيرة في العادات اليومية يمكن أن تُحدث فرقًا كبيرًا.\n\nومن الأساليب الفعّالة التخطيط للوجبات، إذ يمكنك من خلال تحديد ما ستأكله خلال الأسبوع قبل التسوق أن تشتري فقط ما تحتاجه. كما يساعد تخزين الطعام بشكل صحيح في إبقائه طازجًا لفترة أطول، فمثلًا، يمنع حفظ بعض الفواكه والخضروات في الثلاجة فسادها بسرعة.\n\nكما تُعدّ التبرع بالطعام الزائد للجمعيات الخيرية المحلية أو تحويل البقايا إلى سماد خيارات رائعة أيضًا. وحين تتعاون المجتمعات للحد من الهدر، يستفيد الناس والكوكب معًا استفادةً كبيرة.	B1	43	2026-04-09 21:17:15.437674+00
104	Discovering Hidden Gems in Your City	اكتشاف الكنوز الخفية في مدينتك	Many people spend a lot of money traveling to famous destinations abroad, while forgetting the interesting places that exist right in their own cities. Local tourism, sometimes called "staycation" travel, is becoming more popular as people look for affordable and convenient ways to explore.\n\nSmall neighborhoods often have fascinating history, unique cafés, street art, and local markets that regular tourists never see. Walking tours organized by local guides can reveal stories about a city's past that most residents do not know. These experiences help people feel more connected to the place where they live.\n\nSupporting local tourism also benefits the community economically. When people spend money at nearby businesses instead of large international companies, more income stays within the local area. So next time you plan a trip, consider exploring your own city first — you might be pleasantly surprised.	يُنفق كثير من الناس أموالًا طائلة للسفر إلى وجهات شهيرة في الخارج، بينما ينسون الأماكن المثيرة الموجودة في مدنهم. وبات السياحة المحلية، التي تُعرف أحيانًا بسياحة "الإقامة في المنزل"، أكثر شعبية مع سعي الناس إلى طرق ميسورة ومريحة للاستكشاف.\n\nكثيرًا ما تمتلك الأحياء الصغيرة تاريخًا رائعًا ومقاهي فريدة وفنونًا جدارية وأسواقًا محلية لا يراها السياح العاديون قط. ويمكن للجولات المشية التي ينظمها مرشدون محليون أن تكشف عن قصص من تاريخ المدينة لا يعلمها معظم السكان. وتساعد هذه التجارب الناسَ على الشعور بارتباط أعمق بالمكان الذي يعيشون فيه.\n\nكما أن دعم السياحة المحلية يُفيد المجتمع اقتصاديًا، فحين يُنفق الناس أموالهم في الأعمال التجارية القريبة بدلًا من الشركات الدولية الكبرى، يبقى المزيد من الدخل داخل المنطقة المحلية. لذا في المرة القادمة التي تخطط فيها لرحلة، فكّر أولًا في استكشاف مدينتك — فقد تُفاجأ بما تجده.	B1	44	2026-04-09 21:17:15.441279+00
105	How to Succeed in a Job Interview	كيف تنجح في مقابلة العمل	A job interview can feel very stressful, but good preparation can make a huge difference. Before the interview, it is important to research the company carefully. Understanding what the company does and what it values shows the interviewer that you are serious and motivated. You should also prepare answers to common questions such as "Tell me about yourself" and "What are your strengths?"\n\nYour appearance and body language matter as much as your words. Dressing neatly, arriving on time, and maintaining eye contact show that you are professional and confident. Speaking clearly and listening carefully to each question will help you give thoughtful answers.\n\nAfter the interview, sending a short thank-you message to the interviewer is a polite and professional habit that many candidates forget. Small details like this can leave a lasting positive impression and improve your chances of getting the job.	قد تبدو مقابلة العمل مُرهِقة للغاية، لكن الإعداد الجيد يمكن أن يُحدث فرقًا كبيرًا. فقبل المقابلة، من المهم البحث عن الشركة بعناية، إذ يُظهر فهمُ ما تفعله الشركة وما تُقدّره للقائم بالمقابلة أنك جاد ومتحفز. كما ينبغي لك الاستعداد للإجابة عن الأسئلة الشائعة مثل "حدّثنا عن نفسك" و"ما هي نقاط قوتك؟"\n\nومظهرك ولغة جسدك لا تقلان أهميةً عن كلامك. فارتداء ملابس أنيقة والحضور في الوقت المحدد والحفاظ على التواصل البصري يدل على احترافيتك وثقتك بنفسك. كما أن التحدث بوضوح والإنصات الجيد لكل سؤال سيساعدانك على تقديم إجابات مدروسة.\n\nبعد المقابلة، يُعدّ إرسال رسالة شكر قصيرة إلى المحاور عادةً مهذبة واحترافية يغفل عنها كثير من المتقدمين. فالتفاصيل الصغيرة كهذه يمكن أن تترك انطباعًا إيجابيًا دائمًا وتُحسّن فرصك في الحصول على الوظيفة.	B1	45	2026-04-09 21:17:15.453393+00
106	Parents and Screens: Finding the Balance	الآباء والشاشات: إيجاد التوازن	Many parents today worry about how much time their children spend on phones and tablets. Studies show that children between the ages of five and twelve spend an average of four hours a day looking at screens. Experts say this can affect sleep, concentration, and social skills if it is not managed carefully.\n\nHowever, not all screen time is harmful. Educational apps, video calls with family members, and creative programmes can support children's development. The key is for parents to be involved and to choose content wisely.\n\nMost child development specialists recommend setting clear daily limits and having technology-free times, such as during meals and before bed. Open conversations between parents and children about online safety are also considered essential for healthy digital habits.	يقلق كثير من الآباء اليوم بشأن الوقت الذي يقضيه أطفالهم على الهواتف والأجهزة اللوحية. تُظهر الدراسات أن الأطفال بين سن الخامسة والثانية عشرة يقضون في المتوسط أربع ساعات يومياً أمام الشاشات. يقول الخبراء إن ذلك قد يؤثر على النوم والتركيز والمهارات الاجتماعية إذا لم يُدار بعناية.\n\nومع ذلك، ليس كل وقت الشاشات ضاراً. فالتطبيقات التعليمية ومكالمات الفيديو مع أفراد الأسرة والبرامج الإبداعية يمكن أن تدعم نمو الأطفال. والمفتاح هو أن يكون الآباء مشاركين وأن يختاروا المحتوى بحكمة.\n\nيوصي معظم متخصصي تطور الطفل بوضع حدود يومية واضحة وتخصيص أوقات خالية من التكنولوجيا، كأوقات الوجبات وما قبل النوم. كما تُعدّ المحادثات المفتوحة بين الآباء والأطفال حول السلامة على الإنترنت ضرورية لتكوين عادات رقمية صحية.	B1	46	2026-04-09 21:18:19.584432+00
107	My First Time Voting	تجربتي في التصويت للمرة الأولى	When Sara turned eighteen, she registered to vote for the first time. She had watched her parents discuss elections for years, and she was excited to finally have her own voice in the process. Before the election day, she spent several evenings reading about the different candidates and their plans for education and housing.\n\nOn the day of the election, Sara walked to her local polling station with her mother. The queue was long, but the atmosphere was calm and friendly. A volunteer handed her a ballot paper and explained clearly where to mark her choice.\n\nInside the voting booth, Sara felt a strong sense of responsibility. She made her decision carefully and placed the folded paper into the box. Walking home, she felt proud that she had participated in something so important to her community.	عندما بلغت سارة الثامنة عشرة من عمرها، سجّلت للتصويت للمرة الأولى. كانت قد شاهدت والديها يتناقشان حول الانتخابات لسنوات، وكانت متحمسة لأن يكون لها صوتها الخاص في هذه العملية. قبل يوم الانتخابات، قضت عدة أمسيات تقرأ عن المرشحين المختلفين وخططهم في مجالي التعليم والإسكان.\n\nفي يوم الانتخابات، مشت سارة إلى مركز الاقتراع المحلي برفقة والدتها. كان الطابور طويلاً، لكن الأجواء كانت هادئة وودية. سلّمها أحد المتطوعين ورقة الاقتراع وشرح لها بوضوح أين تضع علامة اختيارها.\n\nداخل كشك التصويت، شعرت سارة بإحساس قوي بالمسؤولية. اتخذت قرارها بعناية ووضعت الورقة المطوية في الصندوق. وهي عائدة إلى المنزل، شعرت بالفخر لمشاركتها في شيء بالغ الأهمية لمجتمعها.	B1	47	2026-04-09 21:18:19.617982+00
108	Copenhagen: The World's Greatest Cycling City	كوبنهاغن: أعظم مدينة للدراجات في العالم	Copenhagen, the capital of Denmark, is widely known as one of the best cities in the world for cycling. More than sixty percent of residents cycle to work or school every day, regardless of the weather. The city has over three hundred and ninety kilometres of dedicated cycle lanes, making it safe and convenient for people of all ages.\n\nThe local government has invested heavily in cycling infrastructure over several decades. Wide, clearly marked lanes are separated from car traffic, and special traffic lights for cyclists reduce waiting times at busy junctions.\n\nCycling in Copenhagen is not just practical — it is also a cultural habit. Children learn to ride bikes at a young age, and cycling is seen as a normal part of daily life. The city's approach has inspired many other cities around the world to improve their own cycling networks.	تُعدّ كوبنهاغن، عاصمة الدنمارك، من أفضل مدن العالم للدراجات على نطاق واسع. يتنقل أكثر من ستين بالمئة من السكان بالدراجة إلى العمل أو المدرسة كل يوم، بغض النظر عن الطقس. تمتلك المدينة أكثر من ثلاثمئة وتسعين كيلومتراً من مسارات الدراجات المخصصة، مما يجعلها آمنة ومريحة للناس من جميع الأعمار.\n\nاستثمرت الحكومة المحلية بكثافة في البنية التحتية للدراجات على مدى عقود عديدة. المسارات العريضة والمُعلَّمة بوضوح مفصولة عن حركة السيارات، وإشارات المرور الخاصة بالدراجين تقلل من أوقات الانتظار عند التقاطعات المزدحمة.\n\nركوب الدراجة في كوبنهاغن ليس عملياً فحسب، بل هو أيضاً عادة ثقافية. يتعلم الأطفال ركوب الدراجات في سن مبكرة، ويُنظر إلى ذلك باعتباره جزءاً طبيعياً من الحياة اليومية. وقد ألهم نهج المدينة كثيراً من مدن العالم لتحسين شبكات الدراجات الخاصة بها.	B1	48	2026-04-09 21:18:19.621921+00
109	Learning to Drive: Nerves and Progress	تعلّم القيادة: التوتر والتقدم	Learning to drive is a significant milestone for many young people. At first, sitting behind the wheel can feel overwhelming. There are mirrors to check, gears to change, and other road users to watch — all at the same time. Most beginners feel nervous during their early lessons, and making small mistakes is a completely normal part of the learning process.\n\nA good driving instructor makes a big difference. Patient teachers who explain things clearly and encourage students to ask questions help learners feel more confident over time. Regular practice between lessons also helps new drivers improve their skills more quickly.\n\nMost learners need between thirty and fifty hours of practice before passing their driving test. The journey requires patience and commitment, but successfully passing the test brings a wonderful sense of independence and achievement that makes all the hard work worthwhile.	يُعدّ تعلّم القيادة مرحلة مهمة في حياة كثير من الشباب. في البداية، قد يبدو الجلوس خلف عجلة القيادة أمراً مرهقاً. فهناك مرايا يجب مراجعتها، وتروس يجب تغييرها، ومستخدمو الطريق الآخرون يجب مراقبتهم — وكل ذلك في آنٍ واحد. يشعر معظم المبتدئين بالتوتر خلال دروسهم الأولى، والوقوع في أخطاء بسيطة هو جزء طبيعي تماماً من عملية التعلم.\n\nيُحدث مدرّب القيادة الجيد فرقاً كبيراً. المعلمون الصبورون الذين يشرحون الأمور بوضوح ويشجعون الطلاب على طرح الأسئلة يساعدون المتعلمين على اكتساب الثقة بمرور الوقت. كما يساعد التدرب المنتظم بين الدروس السائقين الجدد على تحسين مهاراتهم بشكل أسرع.\n\nيحتاج معظم المتعلمين إلى ما بين ثلاثين وخمسين ساعة من التدريب قبل اجتياز اختبار القيادة. تتطلب هذه الرحلة الصبر والالتزام، لكن اجتياز الاختبار بنجاح يمنح شعوراً رائعاً بالاستقلالية والإنجاز يجعل كل الجهد المبذول يستحق العناء.	B1	49	2026-04-09 21:18:19.633758+00
110	The Book Club That Changed Everything	نادي الكتاب الذي غيّر كل شيء	When Layla moved to a new city, she felt lonely and struggled to meet people. A colleague suggested she join a local book club that met every two weeks at a nearby café. Layla was hesitant at first because she had not read much fiction since school, but she decided to give it a try.\n\nThe group was small and welcoming, with eight members of different ages and backgrounds. Each month they chose a different book together and came prepared with thoughts and opinions. Layla was surprised by how lively and enjoyable the discussions were, even when members strongly disagreed with each other.\n\nAfter a few months, the book club had become the highlight of Layla's social life. She had discovered new authors she loved, improved her critical thinking skills, and — most importantly — made genuine friendships that helped her finally feel at home in her new city.	عندما انتقلت ليلى إلى مدينة جديدة، شعرت بالوحدة وعانت من صعوبة في التعرف على أناس جدد. اقترحت عليها زميلة في العمل الانضمام إلى نادي كتاب محلي يجتمع كل أسبوعين في مقهى قريب. ترددت ليلى في البداية لأنها لم تقرأ كثيراً من الروايات منذ المدرسة، لكنها قررت تجربة الأمر.\n\nكانت المجموعة صغيرة ومرحّبة، وتضم ثمانية أعضاء من أعمار وخلفيات مختلفة. كانوا يختارون معاً كتاباً مختلفاً كل شهر ويأتون مستعدين بأفكارهم وآرائهم. فاجأها مدى حيوية النقاشات ومتعتها، حتى عندما كان الأعضاء يختلفون بشدة مع بعضهم البعض.\n\nبعد بضعة أشهر، أصبح نادي الكتاب أبرز ما تنتظره ليلى في حياتها الاجتماعية. اكتشفت مؤلفين جدداً أحبتهم، وطوّرت مهارات تفكيرها النقدي، والأهم من ذلك كله — كوّنت صداقات حقيقية ساعدتها أخيراً على الشعور بالانتماء إلى مدينتها الجديدة.	B1	50	2026-04-09 21:18:19.637425+00
111	Freedom or Exploitation in Gig Work	الحرية أم الاستغلال في العمل المؤقت	The gig economy has transformed the way millions of people earn a living. Platforms like ride-sharing apps and food delivery services offer workers the flexibility to choose their own hours and be their own boss. For many, this represents an attractive alternative to the rigid structure of traditional employment.\n\nHowever, critics argue that this freedom comes at a significant cost. Gig workers are typically classified as independent contractors rather than employees, which means they receive no sick pay, no pension contributions, and no guaranteed minimum wage. If they fall ill or face an accident, there is no financial safety net to protect them.\n\nGovernments around the world are now under pressure to update labor laws to reflect this new reality. Some countries have introduced legislation requiring platforms to provide basic protections for gig workers. The debate ultimately centers on a fundamental question: should economic flexibility come at the expense of worker security?	غيّر اقتصاد العمل المؤقت الطريقة التي يكسب بها الملايين قوتهم. توفر منصات مثل تطبيقات مشاركة الركوب وخدمات توصيل الطعام للعمال مرونة اختيار ساعات عملهم وأن يكونوا أصحاب قرارهم. بالنسبة لكثيرين، يمثل هذا بديلاً جذاباً عن الهيكل الصارم للتوظيف التقليدي.\n\nغير أن المنتقدين يرون أن هذه الحرية تأتي بتكلفة باهظة. يُصنَّف عمال الاقتصاد المؤقت عادةً كمقاولين مستقلين لا كموظفين، مما يعني أنهم لا يحصلون على إجازة مرضية مدفوعة، ولا مساهمات في صندوق التقاعد، ولا حد أدنى مضمون للأجور. وإن مرضوا أو تعرضوا لحادث، فلا شبكة أمان مالية تحميهم.\n\nتتعرض حكومات حول العالم الآن لضغوط لتحديث قوانين العمل لتعكس هذا الواقع الجديد. أصدرت بعض الدول تشريعات تلزم المنصات بتوفير حماية أساسية لعمال القطاع. يتمحور النقاش في نهاية المطاف حول سؤال جوهري: هل يجب أن تأتي المرونة الاقتصادية على حساب أمن العامل؟	B2	6	2026-04-09 21:19:38.741083+00
112	The Unequal Path to Education	الطريق غير المتكافئ نحو التعليم	Education is often described as the great equalizer, a system that gives every child an equal opportunity to succeed regardless of their background. In reality, however, a student's chances of academic success are closely linked to their family's socioeconomic status. Children from wealthier households benefit from private tutoring, better-resourced schools, and stable home environments that support learning.\n\nBy contrast, students from low-income families frequently attend underfunded schools with larger class sizes and fewer qualified teachers. Many must balance schoolwork with part-time jobs to help support their families, leaving them with less time and energy for studying. These disadvantages accumulate over time, making it harder to access higher education and well-paid careers.\n\nAddressing this inequality requires more than simply building new schools. Policymakers must invest in early childhood education, provide financial support for disadvantaged students, and ensure that quality teaching is distributed fairly across communities. Without deliberate intervention, education will continue to reflect rather than reduce social inequality.	كثيراً ما يُوصف التعليم بأنه المُعادِل العظيم، النظام الذي يمنح كل طفل فرصة متساوية للنجاح بغض النظر عن خلفيته. غير أن الواقع يُظهر أن فرص النجاح الأكاديمي للطالب ترتبط ارتباطاً وثيقاً بالوضع الاجتماعي والاقتصادي لأسرته. يستفيد الأطفال من الأسر الميسورة من دروس خصوصية، ومدارس أفضل تجهيزاً، وبيئات منزلية مستقرة تدعم التعلم.\n\nفي المقابل، يرتاد الطلاب من الأسر ذات الدخل المنخفض في الغالب مدارس تعاني من نقص التمويل، وأعداد طلاب أكبر، وعدد أقل من المعلمين المؤهلين. ويضطر كثيرون منهم للموازنة بين الدراسة والعمل بدوام جزئي لمساعدة أسرهم، مما يتركهم بوقت وطاقة أقل للمذاكرة. تتراكم هذه المساوئ مع مرور الوقت، مما يُصعّب الوصول إلى التعليم العالي والمهن ذات الرواتب الجيدة.\n\nيتطلب معالجة هذا التفاوت أكثر من مجرد بناء مدارس جديدة. يجب على صانعي السياسات الاستثمار في تعليم الطفولة المبكرة، وتقديم دعم مالي للطلاب المحرومين، وضمان توزيع التعليم الجيد بشكل عادل بين المجتمعات. بدون تدخل مقصود، سيستمر التعليم في عكس التفاوت الاجتماعي بدلاً من تقليصه.	B2	7	2026-04-09 21:19:38.745683+00
113	How Advertising Shapes Our Desires	كيف يُشكّل الإعلان رغباتنا	Modern advertising goes far beyond simply informing consumers about products. It is a sophisticated psychological discipline designed to influence how people think, feel, and ultimately behave. Advertisers study human emotions and cognitive biases to craft messages that bypass rational thinking and speak directly to deeper desires, such as the need for belonging, status, or security.\n\nOne common technique is associating products with aspirational lifestyles. A perfume advertisement rarely describes the scent itself; instead, it presents images of beauty, romance, and luxury. This creates an emotional connection between the product and the life the consumer imagines for themselves. Repetition also plays a crucial role, as frequent exposure to a brand gradually builds familiarity and trust.\n\nDigital technology has made advertising even more targeted and personalized. Algorithms analyze browsing habits and social media behavior to deliver advertisements at precisely the moment a consumer is most likely to be receptive. Understanding these strategies is increasingly important for consumers who wish to make truly independent purchasing decisions.	يتجاوز الإعلان الحديث مجرد إعلام المستهلكين بالمنتجات. فهو تخصص نفسي متطور مصمم للتأثير على طريقة تفكير الناس وشعورهم وسلوكهم في نهاية المطاف. يدرس المعلنون المشاعر البشرية والتحيزات المعرفية لصياغة رسائل تتجاوز التفكير العقلاني وتخاطب مباشرة الرغبات الأعمق، كالحاجة إلى الانتماء والمكانة الاجتماعية أو الأمان.\n\nمن التقنيات الشائعة ربط المنتجات بأساليب حياة طموحة. نادراً ما يصف إعلان العطر الرائحة ذاتها؛ بل يعرض صوراً للجمال والرومانسية والفخامة. يخلق هذا رابطاً عاطفياً بين المنتج والحياة التي يتخيلها المستهلك لنفسه. كما يؤدي التكرار دوراً محورياً، إذ يبني التعرض المتكرر لعلامة تجارية ألفة وثقة تدريجياً.\n\nجعلت التكنولوجيا الرقمية الإعلان أكثر استهدافاً وتخصيصاً. تحلل الخوارزميات عادات التصفح وسلوك وسائل التواصل الاجتماعي لعرض الإعلانات في اللحظة التي يكون فيها المستهلك أكثر استعداداً للتقبل. أصبح فهم هذه الاستراتيجيات أمراً بالغ الأهمية للمستهلكين الراغبين في اتخاذ قرارات شراء مستقلة حقاً.	B2	8	2026-04-09 21:19:38.7488+00
114	Building a New Life Abroad	بناء حياة جديدة في الخارج	Migration offers individuals the promise of safety, opportunity, and a better future. Yet the process of building a new life in a foreign country is rarely straightforward. Migrants frequently face a complex set of challenges that extend well beyond learning a new language. Navigating unfamiliar bureaucratic systems, finding suitable employment, and securing affordable housing can all prove overwhelming, particularly in the early months of arrival.\n\nCultural integration presents an equally significant challenge. Migrants must often balance preserving their own cultural identity with adapting to the norms and expectations of their new society. This tension can create feelings of isolation and identity conflict, especially among younger migrants who are caught between two distinct worlds.\n\nSuccessful integration depends not only on the efforts of migrants themselves but also on the willingness of host communities to be welcoming and inclusive. Government programs offering language classes, employment guidance, and community support have proven effective in helping newcomers contribute meaningfully to their adopted societies while maintaining their cultural heritage.	تمنح الهجرة الأفراد وعداً بالأمان والفرصة ومستقبل أفضل. غير أن عملية بناء حياة جديدة في بلد أجنبي نادراً ما تكون سهلة. يواجه المهاجرون في الغالب مجموعة معقدة من التحديات تتجاوز تعلم لغة جديدة. فالتعامل مع أنظمة بيروقراطية غير مألوفة، وإيجاد عمل مناسب، وتأمين سكن بأسعار معقولة، قد يكون أموراً مرهقة، لا سيما في الأشهر الأولى من الوصول.\n\nيُشكّل الاندماج الثقافي تحدياً لا يقل أهمية. كثيراً ما يضطر المهاجرون للموازنة بين الحفاظ على هويتهم الثقافية والتكيف مع أعراف وتوقعات مجتمعهم الجديد. يمكن أن يخلق هذا التوتر مشاعر من العزلة وصراع الهوية، خاصة بين المهاجرين الأصغر سناً الذين يجدون أنفسهم بين عالمين مختلفين.\n\nيعتمد الاندماج الناجح ليس فقط على جهود المهاجرين أنفسهم، بل أيضاً على استعداد مجتمعات الاستقبال للترحيب والشمول. أثبتت البرامج الحكومية التي تقدم دروساً لغوية وتوجيهاً وظيفياً ودعماً مجتمعياً فعاليتها في مساعدة الوافدين الجدد على المساهمة بشكل حقيقي في مجتمعاتهم المُتبنَّاة مع الحفاظ على تراثهم الثقافي.	B2	9	2026-04-09 21:19:38.752843+00
115	Artificial Intelligence Transforms Modern Workplaces	الذكاء الاصطناعي يُحوّل بيئات العمل الحديثة	Artificial intelligence is rapidly reshaping the global workforce, automating tasks that were once exclusively performed by humans. From customer service chatbots to sophisticated data analysis tools, AI systems are now capable of completing complex cognitive tasks with remarkable speed and accuracy. Many businesses argue that this technology increases efficiency and reduces operational costs significantly.\n\nHowever, the widespread adoption of AI raises serious concerns about employment. Economists predict that automation will displace millions of workers in sectors such as manufacturing, retail, and finance over the coming decades. While new technology has historically created new categories of jobs, there is genuine uncertainty about whether the pace of creation will match the pace of displacement this time around.\n\nPreparing the workforce for an AI-driven economy requires substantial investment in education and retraining programs. Workers need opportunities to develop skills in areas where human judgment, creativity, and emotional intelligence remain superior to machine capabilities. Governments and businesses must collaborate to ensure that the benefits of AI are distributed broadly rather than concentrated among a privileged few.	يُعيد الذكاء الاصطناعي تشكيل القوى العاملة العالمية بسرعة، مُؤتمِتاً مهاماً كانت تُؤدَّى حصرياً من قبل البشر. من روبوتات الدردشة لخدمة العملاء إلى أدوات تحليل البيانات المتطورة، أصبحت أنظمة الذكاء الاصطناعي قادرة على إنجاز مهام معرفية معقدة بسرعة ودقة ملحوظتين. تؤكد كثير من الشركات أن هذه التقنية تزيد من الكفاءة وتقلل التكاليف التشغيلية بشكل ملموس.\n\nغير أن التبني الواسع للذكاء الاصطناعي يثير مخاوف جدية بشأن التوظيف. يتوقع الاقتصاديون أن تُهجّر الأتمتة ملايين العمال في قطاعات كالتصنيع والتجزئة والمال على مدى العقود القادمة. وبينما أوجدت التكنولوجيا الجديدة تاريخياً فئات جديدة من الوظائف، ثمة شك حقيقي حول ما إذا كانت وتيرة الخلق ستواكب وتيرة التهجير هذه المرة.\n\nيستلزم إعداد القوى العاملة لاقتصاد يقوده الذكاء الاصطناعي استثماراً جوهرياً في برامج التعليم وإعادة التدريب. يحتاج العمال إلى فرص لتطوير مهارات في مجالات يظل فيها الحكم البشري والإبداع والذكاء العاطفي متفوقاً على قدرات الآلة. يجب على الحكومات والشركات التعاون لضمان توزيع فوائد الذكاء الاصطناعي على نطاق واسع بدلاً من تركيزها في أيدي قلة مُتميّزة.	B2	10	2026-04-09 21:19:38.756949+00
118	How Advertising Shapes Our Choices	كيف يُشكّل الإعلان خياراتنا	Modern advertising is far more sophisticated than simply promoting a product. Marketers draw heavily on psychological research to design campaigns that influence consumer behaviour at a subconscious level. Techniques such as emotional storytelling, social proof, and scarcity messaging are carefully crafted to trigger specific feelings and drive purchasing decisions without consumers fully realising it.\n\nOne particularly powerful strategy involves associating products with positive emotions and aspirational lifestyles. Luxury car advertisements rarely focus on engine specifications; instead, they present images of freedom, success, and status. Similarly, food brands frequently use warm colours and nostalgic imagery to evoke feelings of comfort and belonging, making their products feel emotionally necessary rather than merely convenient.\n\nAs digital technology advances, advertisers now collect vast amounts of personal data to deliver highly personalised messages at precisely the right moment. While this increases the effectiveness of campaigns significantly, it also raises serious ethical questions about privacy, manipulation, and the extent to which consumers can genuinely make free and informed choices in today's media environment.	الإعلان الحديث أكثر تطورًا بكثير من مجرد الترويج لمنتج. يعتمد المسوّقون اعتمادًا كبيرًا على الأبحاث النفسية لتصميم حملات تؤثر في سلوك المستهلك على المستوى اللاواعي. وتُصمَّم تقنيات كالسرد العاطفي والإثبات الاجتماعي ورسائل الندرة بعناية لإثارة مشاعر بعينها وتحفيز قرارات الشراء دون أن يدرك المستهلكون ذلك تمامًا.\n\nومن أبرز الاستراتيجيات تأثيرًا ربطُ المنتجات بعواطف إيجابية وأساليب حياة طموحة. نادرًا ما تركز إعلانات السيارات الفاخرة على المواصفات التقنية، بل تقدّم صورًا عن الحرية والنجاح والمكانة الاجتماعية. وبالمثل، تستخدم علامات الأغذية التجارية ألوانًا دافئة وصورًا تحمل حنينًا للماضي لاستحضار مشاعر الراحة والانتماء، مما يجعل منتجاتها تبدو ضرورة عاطفية لا مجرد وسيلة للراحة.\n\nمع التقدم التقني الرقمي، بات المعلنون يجمعون كميات ضخمة من البيانات الشخصية لإيصال رسائل مخصصة في اللحظة المناسبة تمامًا. وبينما يزيد هذا من فاعلية الحملات بشكل ملحوظ، فإنه يُثير أيضًا تساؤلات أخلاقية جدية حول الخصوصية والتلاعب ومدى قدرة المستهلكين على اتخاذ خيارات حرة ومستنيرة في بيئة الإعلام الراهنة.	B2	13	2026-04-09 21:22:32.125116+00
119	Building a New Life Through Migration	بناء حياة جديدة عبر الهجرة	Migration offers individuals the opportunity to escape hardship and pursue better prospects, but the process of settling into a new country is rarely straightforward. Newcomers frequently encounter a complex range of challenges, including language barriers, unfamiliar cultural norms, difficulties in having their qualifications recognised, and the emotional burden of leaving behind family and familiar surroundings.\n\nIntegration is a two-way process that requires effort from both migrants and the host society. While newcomers must adapt to local customs and expectations, receiving communities also bear responsibility for creating welcoming environments and removing unnecessary barriers. Discrimination in housing and employment remains a significant obstacle for many migrants, preventing them from fully contributing to their new society.\n\nCountries that have invested in comprehensive integration programmes, including language classes, mentorship schemes, and community outreach initiatives, tend to report more positive outcomes for both migrants and native residents alike. Research suggests that well-integrated migrants contribute significantly to economic growth, cultural enrichment, and social cohesion, ultimately benefiting their adopted countries in multiple meaningful ways.	تتيح الهجرة للأفراد فرصة الهروب من الظروف الصعبة والسعي نحو آفاق أفضل، غير أن الاستقرار في بلد جديد نادرًا ما يكون أمرًا يسيرًا. كثيرًا ما يواجه الوافدون الجدد تحديات متشعبة، منها الحواجز اللغوية والأعراف الثقافية غير المألوفة وصعوبات الاعتراف بمؤهلاتهم والعبء العاطفي لمفارقة ذويهم وبيئتهم المعهودة.\n\nالاندماج عملية ثنائية الاتجاه تستلزم جهدًا من المهاجرين ومن المجتمع المضيف على حد سواء. فبينما يتعين على الوافدين التكيف مع العادات المحلية والتوقعات السائدة، تتحمل المجتمعات المستقبِلة مسؤولية خلق بيئات ترحيبية وإزالة العقبات غير الضرورية. ولا يزال التمييز في السكن والعمل عائقًا كبيرًا أمام كثير من المهاجرين، يحول دون مشاركتهم الكاملة في مجتمعاتهم الجديدة.\n\nتُسجّل الدول التي استثمرت في برامج اندماج شاملة، تضم دروسًا لغوية وبرامج إرشاد ومبادرات تواصل مجتمعي، نتائج أكثر إيجابية للمهاجرين والسكان الأصليين معًا. وتشير الأبحاث إلى أن المهاجرين المندمجين جيدًا يسهمون إسهامًا ملموسًا في النمو الاقتصادي والإثراء الثقافي والتماسك الاجتماعي، مما يعود بالنفع على بلدانهم المُتبنَّاة بطرق متعددة وذات معنى.	B2	14	2026-04-09 21:22:32.137772+00
120	Artificial Intelligence Changing the Workplace	الذكاء الاصطناعي يُغيّر بيئة العمل	Artificial intelligence is rapidly reshaping the modern workplace, automating tasks that were once performed exclusively by humans. From data analysis and customer service chatbots to advanced medical diagnostics, AI systems are proving capable of completing complex tasks with remarkable speed and accuracy. Many businesses are embracing these tools enthusiastically, citing significant gains in efficiency and cost reduction.\n\nHowever, this technological shift raises profound concerns about employment. Economists warn that certain job categories, particularly those involving repetitive or predictable tasks, face a genuine risk of being eliminated entirely. Workers in manufacturing, administration, and retail are among those most vulnerable to displacement. This has intensified debates about the need for large-scale workforce retraining programmes and stronger social safety nets.\n\nNot everyone views AI as a threat. Optimists argue that, historically, new technologies have always created more jobs than they destroyed, simply in different sectors and forms. They suggest that AI will free humans from mundane tasks, allowing workers to focus on creative, interpersonal, and strategic roles where human judgement and empathy remain irreplaceable and highly valued.	يُعيد الذكاء الاصطناعي بسرعة رسمَ ملامح بيئة العمل الحديثة، إذ يُؤتمت مهام كانت تُنجز حصرًا بأيدٍ بشرية. من تحليل البيانات وروبوتات خدمة العملاء إلى التشخيص الطبي المتقدم، تُثبت أنظمة الذكاء الاصطناعي قدرتها على إنجاز مهام معقدة بسرعة ودقة مدهشتين. وتتبنى كثير من الشركات هذه الأدوات بحماس، مستشهدةً بمكاسب ملموسة في الكفاءة وخفض التكاليف.\n\nغير أن هذا التحول التكنولوجي يُثير مخاوف عميقة بشأن التوظيف. يحذر الاقتصاديون من أن فئات وظيفية بعينها، لا سيما تلك التي تنطوي على مهام متكررة أو متوقعة، تواجه خطرًا حقيقيًا بالاندثار الكلي. ويقع العمال في التصنيع والإدارة والتجزئة في صدارة الفئات الأكثر عرضة للتهجير، مما أجّج الجدل حول الحاجة إلى برامج واسعة لإعادة تأهيل القوى العاملة وشبكات أمان اجتماعي أمتن.\n\nليس الجميع يرى في الذكاء الاصطناعي تهديدًا. يرى المتفائلون أن التقنيات الجديدة عبر التاريخ دائمًا ما خلقت وظائف أكثر مما أتلفت، وإن كان ذلك في قطاعات وأشكال مغايرة. ويرون أن الذكاء الاصطناعي سيحرر البشر من المهام الروتينية، مما يتيح للعمال التركيز على الأدوار الإبداعية والتواصلية والاستراتيجية، حيث تبقى الحكمة البشرية والتعاطف الإنساني لا غنى عنهما وذا قيمة عالية.	B2	15	2026-04-09 21:22:32.141432+00
121	The Silent Crisis of Vanishing Species	الأزمة الصامتة لانقراض الأنواع	Biodiversity refers to the variety of life on Earth, from tiny microorganisms to large mammals. Scientists warn that we are currently experiencing one of the most significant mass extinction events in the planet's history. Human activities such as deforestation, pollution, and climate change are driving thousands of species toward extinction every year.\n\nThe consequences of this loss extend far beyond the disappearance of individual animals or plants. Ecosystems depend on complex relationships between species, and when one disappears, it can trigger a chain reaction affecting many others. Coral reefs, tropical rainforests, and wetlands are among the most threatened environments on Earth.\n\nConservation efforts are underway globally, including the establishment of protected areas and international agreements to reduce harmful emissions. However, experts argue that these measures remain insufficient without fundamental changes in how humans consume resources. Protecting biodiversity is not simply an environmental concern — it is essential for human survival itself.	يشير التنوع البيولوجي إلى تنوع الحياة على كوكب الأرض، بدءًا من الكائنات الدقيقة وصولًا إلى الثدييات الكبيرة. يحذّر العلماء من أننا نشهد حاليًا أحد أشد أحداث الانقراض الجماعي خطورةً في تاريخ الكوكب. إذ تدفع الأنشطة البشرية كإزالة الغابات والتلوث وتغير المناخ آلاف الأنواع نحو الانقراض كل عام.\n\nتمتد تداعيات هذا الفقدان إلى ما هو أبعد من مجرد اختفاء حيوانات أو نباتات بعينها. فالنظم البيئية تعتمد على علاقات معقدة بين الأنواع المختلفة، وحين يختفي نوع واحد، قد يُطلق ذلك سلسلة من ردود الفعل تؤثر على أنواع كثيرة أخرى. وتُعدّ الشعاب المرجانية والغابات الاستوائية المطيرة والأراضي الرطبة من أكثر البيئات تعرضًا للتهديد على وجه الأرض.\n\nتجري جهود الحفاظ على البيئة على المستوى العالمي، وتشمل إنشاء مناطق محمية وإبرام اتفاقيات دولية للحد من الانبعاثات الضارة. غير أن الخبراء يؤكدون أن هذه الإجراءات لا تزال غير كافية دون إجراء تغييرات جوهرية في طريقة استهلاك الإنسان للموارد. فحماية التنوع البيولوجي ليست مجرد قضية بيئية — بل هي ضرورة لا غنى عنها لبقاء الإنسان نفسه.	B2	16	2026-04-09 21:23:55.801211+00
122	Breaking the Silence on Mental Health	كسر الصمت حول الصحة النفسية	Despite growing awareness campaigns, mental health stigma remains a deeply rooted problem in many societies around the world. People suffering from conditions such as depression, anxiety, or schizophrenia often face discrimination, misunderstanding, and social isolation. This stigma frequently prevents individuals from seeking the professional help they genuinely need.\n\nCultural attitudes play a significant role in shaping how mental illness is perceived. In many communities, admitting psychological difficulties is seen as a sign of weakness or personal failure. As a result, sufferers tend to conceal their struggles, which can cause their conditions to worsen considerably over time.\n\nFortunately, attitudes are gradually shifting. Public figures sharing their personal experiences with mental health challenges have helped normalize these conversations. Educational programs in schools and workplaces are also making progress in reducing harmful stereotypes. Experts emphasize that treating mental health with the same seriousness as physical health is essential for building more compassionate and productive societies.	على الرغم من حملات التوعية المتزايدة، لا يزال الوصم المرتبط بالصحة النفسية مشكلةً متجذرة في كثير من المجتمعات حول العالم. إذ يواجه الأشخاص المصابون بحالات كالاكتئاب والقلق والفصام في أغلب الأحيان التمييز وسوء الفهم والعزل الاجتماعي. وكثيرًا ما يحول هذا الوصم دون إقدام الأفراد على طلب المساعدة المتخصصة التي يحتاجونها فعلًا.\n\nتؤدي الاتجاهات الثقافية دورًا بارزًا في تشكيل النظرة إلى المرض النفسي. ففي كثير من المجتمعات، يُنظر إلى الاعتراف بالصعوبات النفسية باعتباره علامةً على الضعف أو الفشل الشخصي. ونتيجةً لذلك، يميل المصابون إلى إخفاء معاناتهم، مما قد يؤدي إلى تفاقم حالتهم بشكل ملحوظ مع مرور الوقت.\n\nلحسن الحظ، تتحول الاتجاهات تدريجيًا نحو الأفضل. فقد أسهم مشاركة الشخصيات العامة لتجاربهم الشخصية مع تحديات الصحة النفسية في تطبيع هذه المحادثات. كما تُحرز البرامج التعليمية في المدارس وبيئات العمل تقدمًا ملموسًا في الحد من الصور النمطية الضارة. ويؤكد الخبراء أن التعامل مع الصحة النفسية بنفس الجدية التي تُعامل بها الصحة الجسدية أمرٌ ضروري لبناء مجتمعات أكثر تعاطفًا وإنتاجية.	B2	17	2026-04-09 21:23:55.836062+00
123	Can Newspapers Survive the Digital Age?	هل تستطيع الصحف البقاء في العصر الرقمي؟	For centuries, printed newspapers served as the primary source of information for millions of people worldwide. However, the rapid rise of digital technology and social media platforms has dramatically transformed the media landscape. Circulation figures for print newspapers have been declining steadily across most developed nations since the early 2000s.\n\nAdvertising revenue, which once sustained the newspaper industry, has largely migrated to online platforms such as Google and social media giants. Many well-established publications have been forced to reduce their staff, scale back print editions, or shut down entirely. Smaller regional newspapers have been particularly vulnerable to these economic pressures.\n\nDespite these challenges, some newspapers have successfully adapted by developing strong digital subscription models and investing in high-quality investigative journalism. Readers appear willing to pay for trusted, in-depth reporting that algorithms and social media cannot reliably provide. The future of newspapers may look very different from the past, but quality journalism itself remains as relevant and necessary as ever.	لقرون عديدة، كانت الصحف المطبوعة تمثل المصدر الرئيسي للمعلومات لملايين الأشخاص حول العالم. غير أن الصعود المتسارع للتكنولوجيا الرقمية ومنصات التواصل الاجتماعي قد غيّر المشهد الإعلامي تغييرًا جذريًا. وقد شهدت أرقام توزيع الصحف المطبوعة تراجعًا مستمرًا في معظم الدول المتقدمة منذ مطلع الألفية الثالثة.\n\nانتقلت عائدات الإعلانات التي كانت تُعيل صناعة الصحف في السابق إلى المنصات الإلكترونية كغوغل وعمالقة التواصل الاجتماعي. وقد اضطرت كثير من المطبوعات العريقة إلى تقليص موظفيها أو الحدّ من طبعاتها الورقية أو إغلاق أبوابها كليًا. وكانت الصحف الإقليمية الأصغر حجمًا الأشد عرضةً لهذه الضغوط الاقتصادية.\n\nعلى الرغم من هذه التحديات، نجحت بعض الصحف في التكيف مع الواقع الجديد من خلال تطوير نماذج اشتراك رقمية قوية والاستثمار في الصحافة الاستقصائية عالية الجودة. ويبدو أن القراء على استعداد للدفع مقابل التقارير الموثوقة والمعمّقة التي لا تستطيع الخوارزميات ووسائل التواصل الاجتماعي توفيرها باستمرار. قد يبدو مستقبل الصحف مختلفًا جدًا عن ماضيها، لكن الصحافة الجادة تظل بالقدر ذاته من الأهمية والضرورة.	B2	18	2026-04-09 21:23:55.843411+00
124	Feeding the World's Most Vulnerable People	إطعام أكثر سكان العالم هشاشةً	Food security remains one of the most pressing challenges facing developing nations today. According to the United Nations, approximately 733 million people experience chronic hunger globally, with sub-Saharan Africa and South Asia being the most severely affected regions. Climate change, political instability, and poverty create a complex combination of factors that make achieving consistent food access extremely difficult.\n\nSmallholder farmers, who produce a significant portion of food in developing countries, are particularly vulnerable to unpredictable weather patterns and rising input costs. Without adequate infrastructure, storage facilities, and market access, large quantities of harvested food are lost before reaching consumers. This waste further deepens the food insecurity problem in communities that can least afford it.\n\nInternational organizations and local governments are pursuing various strategies to address these challenges. These include investing in drought-resistant crop varieties, improving rural infrastructure, and supporting women farmers who play a crucial role in household food production. Experts agree that sustainable, locally-driven solutions tend to produce better long-term results than short-term aid alone.	يظل الأمن الغذائي أحد أشد التحديات إلحاحًا التي تواجه الدول النامية في وقتنا الراهن. وفقًا للأمم المتحدة، يعاني نحو 733 مليون شخص من الجوع المزمن على مستوى العالم، وتُعدّ منطقتا أفريقيا جنوب الصحراء الكبرى وجنوب آسيا الأشد تضررًا. ويُفرز تغير المناخ والاضطراب السياسي والفقر مجتمعةً خليطًا معقدًا من العوامل التي تجعل تحقيق الحصول المستدام على الغذاء أمرًا بالغ الصعوبة.\n\nيُعدّ صغار المزارعين، الذين ينتجون جزءًا كبيرًا من الغذاء في الدول النامية، الأكثر عرضةً لأنماط الطقس غير المتوقعة وارتفاع تكاليف المدخلات. وفي غياب البنية التحتية الملائمة ومرافق التخزين والوصول إلى الأسواق، تُفقد كميات كبيرة من المحاصيل قبل أن تصل إلى المستهلكين. ويُعمّق هذا الهدر مشكلة انعدام الأمن الغذائي في المجتمعات الأقل قدرةً على تحمّل تبعاته.\n\nتتبنى المنظمات الدولية والحكومات المحلية استراتيجيات متنوعة لمواجهة هذه التحديات. وتشمل هذه الاستراتيجيات الاستثمار في أصناف المحاصيل المقاومة للجفاف، وتحسين البنية التحتية في الريف، ودعم المزارعات اللواتي يؤدين دورًا محوريًا في إنتاج الغذاء على مستوى الأسرة. ويتفق الخبراء على أن الحلول المستدامة المنبثقة محليًا تُفضي في الغالب إلى نتائج أفضل على المدى البعيد مقارنةً بالمساعدات الآنية وحدها.	B2	19	2026-04-09 21:23:55.855761+00
125	Women and Men on Our Screens	المرأة والرجل على شاشاتنا	Gender representation in media has long been a subject of intense debate among researchers, journalists, and the general public. Studies consistently show that women remain underrepresented in leading roles in film and television, while men dominate positions both in front of and behind the camera. When women do appear, they are frequently portrayed through narrow and stereotypical lenses.\n\nThese patterns of representation matter because media shapes public perceptions and social expectations. Young people who grow up watching limited or distorted portrayals of gender may internalize beliefs that restrict their own ambitions and opportunities. Research suggests that more diverse and authentic representation positively influences how audiences understand gender roles in real life.\n\nIn recent years, there has been measurable progress. Movements such as MeToo and Time's Up have pressured the entertainment industry to take gender equality more seriously. Female-led productions have demonstrated strong commercial success, challenging the assumption that audiences prefer male-dominated stories. Nevertheless, experts caution that meaningful systemic change requires sustained effort and genuine commitment from decision-makers at every level.	طالما كان تمثيل الجنسين في وسائل الإعلام موضع جدل واسع بين الباحثين والصحفيين والرأي العام. تكشف الدراسات باستمرار أن المرأة لا تزال ممثلة تمثيلًا ناقصًا في الأدوار القيادية في السينما والتلفزيون، في حين يهيمن الرجال على المناصب أمام الكاميرا وخلفها على حدٍّ سواء. وحين تظهر المرأة، كثيرًا ما يجري تصويرها من خلال قوالب نمطية ضيقة.\n\nتكتسب هذه الأنماط في التمثيل أهميةً بالغة لأن وسائل الإعلام تُشكّل التصورات العامة والتوقعات الاجتماعية. فالشباب الذين ينشأون على مشاهدة صور محدودة أو مشوهة عن الجنسين قد يستبطنون معتقدات تُقيّد طموحاتهم وفرصهم. وتشير الأبحاث إلى أن التمثيل الأكثر تنوعًا وأصالةً يؤثر إيجابًا في كيفية فهم المشاهدين لأدوار الجنسين في الحياة الواقعية.\n\nشهدت السنوات الأخيرة تقدمًا ملموسًا في هذا الملف. إذ ضغطت حركات من قبيل MeToo وTime's Up على صناعة الترفيه لتأخذ المساواة بين الجنسين على محمل الجد. وقد أثبتت الإنتاجات التي تقودها نساء نجاحًا تجاريًا لافتًا، مما يدحض الافتراض القائل بأن الجمهور يُفضّل القصص التي يهيمن عليها الرجال. ومع ذلك، يُحذّر الخبراء من أن التغيير البنيوي الحقيقي يستلزم جهدًا مستمرًا والتزامًا صادقًا من صناع القرار على كافة المستويات.	B2	20	2026-04-09 21:23:55.859789+00
126	The Growing Global Obesity Crisis	أزمة السمنة العالمية المتفاقمة	Over the past few decades, obesity has transformed from a concern affecting wealthy nations into a truly global epidemic. The World Health Organization reports that more than one billion people worldwide are now classified as obese, a figure that has nearly tripled since 1975. Experts attribute this alarming rise to increasingly sedentary lifestyles, the widespread availability of processed foods, and aggressive marketing by the fast-food industry.\n\nThe consequences extend far beyond individual health. Obesity significantly raises the risk of developing type 2 diabetes, cardiovascular disease, and certain cancers. Healthcare systems in both developed and developing countries are struggling under the financial burden of treating these conditions, diverting resources from other critical medical priorities.\n\nAddressing the epidemic requires more than personal responsibility. Governments are being urged to introduce sugar taxes, restrict junk food advertising aimed at children, and invest in community exercise programs. Without coordinated action at every level of society, the crisis is likely to deepen considerably.	على مدى العقود الماضية، تحولت السمنة من مشكلة تقتصر على الدول الغنية إلى وباء عالمي حقيقي. تشير منظمة الصحة العالمية إلى أن أكثر من مليار شخص حول العالم يُصنَّفون حالياً ضمن فئة البدناء، وهو رقم تضاعف ثلاث مرات تقريباً منذ عام 1975. ويعزو الخبراء هذا الارتفاع المقلق إلى أنماط الحياة الخاملة المتزايدة، وانتشار الأطعمة المصنّعة، والتسويق المكثف من قِبل صناعة الوجبات السريعة.\n\nتمتد التداعيات إلى ما هو أبعد من صحة الفرد. إذ ترفع السمنة بشكل ملحوظ خطر الإصابة بمرض السكري من النوع الثاني وأمراض القلب والأوعية الدموية وبعض أنواع السرطان. وتئن أنظمة الرعاية الصحية في الدول المتقدمة والنامية على حد سواء تحت العبء المالي لعلاج هذه الحالات، مما يُحوّل الموارد عن أولويات طبية حيوية أخرى.\n\nمعالجة هذا الوباء تستلزم أكثر من مجرد المسؤولية الفردية. تُحثّ الحكومات على فرض ضرائب على السكر، وتقييد إعلانات الوجبات غير الصحية الموجهة للأطفال، والاستثمار في برامج التمارين المجتمعية. فبدون تحرك منسق على جميع مستويات المجتمع، من المرجح أن تتفاقم الأزمة بشكل ملحوظ.	B2	21	2026-04-09 21:25:20.257842+00
127	Green Spaces and Urban Mental Wellbeing	المساحات الخضراء والصحة النفسية في المدن	As cities continue to expand rapidly, access to parks, gardens, and natural environments has become an increasingly important issue for urban planners and public health officials. Research consistently demonstrates that regular exposure to green spaces is associated with reduced levels of stress, anxiety, and depression among city dwellers. Even brief visits to a local park can produce measurable improvements in mood and cognitive function.\n\nDespite this evidence, green spaces are often among the first casualties of urban development. As land values rise and housing demand intensifies, parks are frequently replaced by buildings, leaving densely populated neighbourhoods without adequate access to nature. This trend disproportionately affects lower-income communities, who typically have fewer alternatives for outdoor recreation.\n\nForward-thinking cities are now integrating green infrastructure into their development plans. Rooftop gardens, urban forests, and tree-lined streets are being prioritised alongside traditional parks. Experts argue that investing in green spaces is not merely an aesthetic choice but a fundamental component of building healthier, more resilient urban communities.	مع التوسع السريع المستمر للمدن، أصبح الوصول إلى الحدائق والبساتين والبيئات الطبيعية قضية بالغة الأهمية لمخططي المدن ومسؤولي الصحة العامة. تُثبت الأبحاث باستمرار أن التعرض المنتظم للمساحات الخضراء مرتبط بانخفاض مستويات التوتر والقلق والاكتئاب لدى سكان المدن. حتى الزيارات القصيرة لحديقة محلية يمكنها إحداث تحسينات ملموسة في المزاج والوظائف الإدراكية.\n\nعلى الرغم من هذه الأدلة، كثيراً ما تكون المساحات الخضراء أولى ضحايا التطوير العمراني. مع ارتفاع أسعار الأراضي وتصاعد الطلب على الإسكان، تُستبدل الحدائق في أغلب الأحيان بالمباني، مما يحرم الأحياء المكتظة بالسكان من الوصول الكافي إلى الطبيعة. ويؤثر هذا التوجه بشكل غير متناسب على المجتمعات ذات الدخل المنخفض التي تملك عادةً خيارات أقل للترفيه في الهواء الطلق.\n\nتعمل المدن ذات التفكير المستقبلي الآن على دمج البنية التحتية الخضراء في خططها التنموية. يجري إيلاء الأولوية لحدائق الأسطح والغابات الحضرية والشوارع المشجرة جنباً إلى جنب مع الحدائق التقليدية. يرى الخبراء أن الاستثمار في المساحات الخضراء ليس مجرد خيار جمالي، بل هو عنصر جوهري لبناء مجتمعات حضرية أكثر صحة وصموداً.	B2	22	2026-04-09 21:25:20.297984+00
128	Social Media's Hidden Psychological Dangers	المخاطر النفسية الخفية لوسائل التواصل الاجتماعي	Social media platforms have fundamentally altered the way people communicate, share information, and perceive themselves. While these tools offer genuine benefits such as global connectivity and community building, a growing body of research points to serious psychological consequences, particularly among younger users. Studies have linked heavy social media use to increased rates of depression, loneliness, and poor self-image.\n\nOne significant factor is the culture of comparison that platforms actively encourage. Carefully curated posts presenting idealised versions of people's lives create unrealistic standards that many users feel pressured to meet. Algorithms designed to maximise engagement tend to amplify emotionally provocative content, drawing users into cycles of outrage, anxiety, or inadequacy that can be difficult to escape.\n\nAddressing these issues requires action from both individuals and institutions. Digital literacy education can help users navigate platforms more critically, while regulators are increasingly pressuring companies to design less addictive products. Many mental health professionals now recommend regular breaks from social media as a straightforward strategy for improving overall psychological wellbeing.	غيّرت منصات التواصل الاجتماعي بشكل جذري طريقة تواصل الناس وتبادل المعلومات وتصوّرهم لأنفسهم. وبينما تقدم هذه الأدوات فوائد حقيقية كالتواصل العالمي وبناء المجتمعات، يشير حجم متزايد من الأبحاث إلى تداعيات نفسية خطيرة، لا سيما بين المستخدمين الأصغر سناً. وقد ربطت الدراسات بين الاستخدام المكثف لوسائل التواصل الاجتماعي وارتفاع معدلات الاكتئاب والوحدة وتدني الصورة الذاتية.\n\nأحد العوامل المهمة هو ثقافة المقارنة التي تشجعها المنصات بفاعلية. إذ تخلق المنشورات المُنتقاة بعناية التي تقدم صوراً مثالية لحياة الناس معايير غير واقعية يشعر كثير من المستخدمين بضغط للوفاء بها. كما تميل الخوارزميات المصممة لتعظيم التفاعل إلى تضخيم المحتوى المثير للعواطف، مما يجر المستخدمين في دوامات من الاستياء والقلق أو الشعور بالنقص يصعب الخروج منها.\n\nتعالجة هذه القضايا يستلزم تحركاً من الأفراد والمؤسسات على حد سواء. يمكن لتعليم الإلمام الرقمي أن يساعد المستخدمين على التعامل مع المنصات بنقدية أكبر، فيما يضغط المنظمون بشكل متزايد على الشركات لتصميم منتجات أقل إدماناً. ويوصي كثير من متخصصي الصحة النفسية الآن بأخذ فترات راحة منتظمة من وسائل التواصل الاجتماعي كاستراتيجية مباشرة لتحسين الرفاهية النفسية العامة.	B2	23	2026-04-09 21:25:20.311685+00
129	Is Space Exploration Worth the Cost?	هل استكشاف الفضاء يستحق تكلفته؟	Space exploration has captured human imagination for generations, but its enormous financial cost continues to provoke heated debate. National space agencies and private companies spend billions of dollars annually on missions, satellites, and research programs. Critics argue that this money would be better directed toward addressing urgent problems on Earth, such as poverty, climate change, and inadequate healthcare in developing nations.\n\nProponents, however, point to the substantial indirect benefits that space investment generates. Technologies developed for space missions have produced innovations now used in everyday life, including GPS navigation, water purification systems, and advanced medical imaging equipment. Furthermore, studying other planets provides invaluable data about Earth's climate history and potential environmental futures.\n\nThe emergence of private companies like SpaceX has shifted the financial dynamic considerably, reducing the burden on government budgets while accelerating technological development. Many scientists argue that the long-term survival of humanity may ultimately depend on our ability to become a multi-planetary species, making current investment not just justifiable but essential.	أسر استكشاف الفضاء خيال البشرية لأجيال، غير أن تكلفته الباهظة لا تزال تثير جدلاً واسعاً. تُنفق وكالات الفضاء الوطنية والشركات الخاصة مليارات الدولارات سنوياً على البعثات والأقمار الاصطناعية وبرامج الأبحاث. يرى المنتقدون أن هذه الأموال كان من الأجدر توجيهها لمعالجة مشكلات ملحّة على الأرض، كالفقر وتغير المناخ وضعف الرعاية الصحية في الدول النامية.\n\nبيد أن المؤيدين يُشيرون إلى الفوائد غير المباشرة الجوهرية التي يولّدها الاستثمار في الفضاء. فقد أسفرت التقنيات المطوّرة لمهمات الفضاء عن ابتكارات تُستخدم الآن في الحياة اليومية، منها نظام تحديد المواقع والملاحة، وأنظمة تنقية المياه، وأجهزة التصوير الطبي المتقدمة. فضلاً عن ذلك، يوفر دراسة الكواكب الأخرى بيانات لا تقدّر بثمن حول التاريخ المناخي للأرض ومستقبلاتها البيئية المحتملة.\n\nأدى ظهور شركات خاصة كـ SpaceX إلى تحول ملحوظ في الديناميكية المالية، إذ خفّف العبء عن الميزانيات الحكومية مع تسريع وتيرة التطور التكنولوجي. يرى كثير من العلماء أن بقاء البشرية على المدى البعيد قد يعتمد في نهاية المطاف على قدرتنا على أن نصبح كائنات متعددة الكواكب، مما يجعل الاستثمار الحالي أمراً مبرراً بل وضرورياً.	B2	24	2026-04-09 21:25:20.318259+00
130	Antibiotic Resistance: A Silent Threat	مقاومة المضادات الحيوية: تهديد صامت	Antibiotic resistance has been described by leading health authorities as one of the most serious threats to global public health in the twenty-first century. When bacteria evolve the ability to survive antibiotic treatment, infections that were once easily curable can become life-threatening. The World Health Organization warns that without urgent action, common surgical procedures and cancer treatments could become far more dangerous due to the risk of untreatable infections.\n\nThe crisis has been accelerated by the widespread overuse and misuse of antibiotics. Patients frequently demand prescriptions for viral infections, against which antibiotics are entirely ineffective. Equally concerning is the routine use of antibiotics in livestock farming to promote faster animal growth, which contributes significantly to resistance developing in bacteria that can spread to humans.\n\nTackling resistance demands a coordinated global response. Stricter regulations on antibiotic prescriptions, increased investment in developing new drugs, and public awareness campaigns about responsible antibiotic use are all considered essential measures. Scientists also warn that time is running short to implement these strategies effectively.	وصفت كبرى السلطات الصحية مقاومة المضادات الحيوية بأنها من أشد التهديدات خطورة على الصحة العامة العالمية في القرن الحادي والعشرين. حين تطوّر البكتيريا قدرتها على البقاء رغم العلاج بالمضادات الحيوية، يمكن أن تتحول الالتهابات التي كانت تُعالج بسهولة إلى حالات مهددة للحياة. وتحذر منظمة الصحة العالمية من أنه دون اتخاذ إجراءات عاجلة، قد تغدو العمليات الجراحية الشائعة وعلاجات السرطان أكثر خطورة بكثير بسبب خطر الالتهابات التي لا يمكن علاجها.\n\nتفاقمت الأزمة بسبب الإفراط في استخدام المضادات الحيوية وإساءة استخدامها على نطاق واسع. كثيراً ما يطلب المرضى وصفات طبية لعلاج الالتهابات الفيروسية التي لا تجدي معها المضادات الحيوية البتة. ولا يقل خطورة عن ذلك الاستخدام الروتيني للمضادات الحيوية في تربية الماشية لتعزيز نمو الحيوانات بشكل أسرع، مما يُسهم بشكل ملحوظ في تطور المقاومة في البكتيريا التي يمكن أن تنتقل إلى البشر.\n\nمواجهة المقاومة تستلزم استجابة عالمية منسقة. تُعدّ تشديد اللوائح المنظِّمة لوصف المضادات الحيوية، وزيادة الاستثمار في تطوير أدوية جديدة، وتنفيذ حملات توعية عامة حول الاستخدام المسؤول للمضادات الحيوية، جميعها تدابير ضرورية. كما يحذر العلماء من أن الوقت بدأ ينفد لتطبيق هذه الاستراتيجيات بفعالية.	B2	25	2026-04-09 21:25:20.321545+00
131	The Slow Death of Reading Culture	الموت البطيء لثقافة القراءة	In recent decades, reading for pleasure has declined significantly across many societies. Research suggests that the average adult now spends fewer than seventeen minutes per day reading books, compared to several hours scrolling through social media feeds. Many educators and cultural critics argue that this shift represents a serious loss for society as a whole.\n\nThe causes are complex and deeply rooted in technological change. Smartphones and streaming platforms offer constant entertainment that requires little mental effort, making the sustained concentration demanded by books feel increasingly uncomfortable. Publishers have responded by producing shorter, more visually driven content, yet this has done little to reverse the trend.\n\nDespite this gloomy picture, some encouraging signs remain. Independent bookshops have experienced a modest revival in several cities, and book clubs continue to attract dedicated members. Literacy advocates believe that reconnecting reading with social experience may be the key to making it relevant again for younger generations.	في العقود الأخيرة، تراجعت القراءة للمتعة تراجعًا ملحوظًا في كثير من المجتمعات. تشير الأبحاث إلى أن متوسط وقت البالغ في قراءة الكتب لا يتجاوز سبع عشرة دقيقة يوميًا، في مقابل ساعات طويلة يقضيها في تصفح وسائل التواصل الاجتماعي. يرى كثير من المعلمين والمثقفين أن هذا التحول يُشكّل خسارة جسيمة للمجتمع بأسره.\n\nأسباب هذه الظاهرة معقدة ومتجذرة في التحولات التكنولوجية. فالهواتف الذكية ومنصات البث توفر ترفيهًا متواصلًا لا يستلزم جهدًا ذهنيًا كبيرًا، مما يجعل التركيز المستدام الذي تتطلبه الكتب أمرًا مرهقًا بشكل متزايد. وقد استجاب الناشرون بإنتاج محتوى أقصر وأكثر اعتمادًا على الصور، غير أن ذلك لم يُوقف هذا الاتجاه.\n\nعلى الرغم من هذه الصورة القاتمة، ثمة بوادر أمل. إذ شهدت المكتبات المستقلة انتعاشًا متواضعًا في بعض المدن، ولا تزال نوادي الكتاب تجذب أعضاء متحمسين. ويعتقد المدافعون عن تعزيز القراءة أن ربطها بالتجربة الاجتماعية قد يكون المفتاح لإعادة إحيائها لدى الأجيال الشابة.	B2	26	2026-04-09 21:26:42.997137+00
132	Electric Vehicles and the Infrastructure Gap	السيارات الكهربائية وفجوة البنية التحتية	Electric vehicles are transforming the global automotive industry at a remarkable pace. Sales figures have risen sharply over the past five years, with some countries now reporting that one in three new cars sold runs entirely on electricity. Governments have welcomed this shift as a crucial step toward meeting their carbon reduction targets.\n\nHowever, a significant challenge remains largely unresolved: the lack of adequate charging infrastructure. In rural areas and smaller towns, drivers frequently struggle to find reliable charging stations, making long journeys stressful and impractical. Analysts warn that without substantial investment in this network, widespread adoption of electric vehicles will remain out of reach for many ordinary consumers.\n\nSeveral nations are responding with ambitious infrastructure programmes, pledging billions in public funding to expand charging networks along major highways and in residential areas. Private energy companies are also entering the market, sensing considerable commercial opportunity. Whether supply can keep pace with growing demand, however, remains an open question.	تُحدث السيارات الكهربائية تحولًا جذريًا في صناعة السيارات العالمية بوتيرة لافتة. ارتفعت أرقام المبيعات ارتفاعًا حادًا خلال السنوات الخمس الماضية، إذ تُفيد بعض الدول بأن سيارة من كل ثلاث سيارات جديدة تعمل بالكهرباء بالكامل. وقد رحّبت الحكومات بهذا التحول باعتباره خطوة محورية نحو تحقيق أهداف خفض الكربون.\n\nبيد أن ثمة تحديًا جوهريًا لا يزال دون حل: غياب البنية التحتية الكافية لمحطات الشحن. في المناطق الريفية والمدن الصغيرة، يعاني السائقون من صعوبة إيجاد محطات شحن موثوقة، مما يجعل الرحلات الطويلة مُجهِدة وغير عملية. ويُحذّر المحللون من أنه دون استثمار ضخم في هذه الشبكة، سيظل انتشار السيارات الكهربائية بعيد المنال بالنسبة لكثير من المستهلكين العاديين.\n\nتستجيب عدة دول بإطلاق برامج طموحة للبنية التحتية، مخصصةً مليارات الدولارات من التمويل العام لتوسيع شبكات الشحن على الطرق السريعة وفي المناطق السكنية. وتدخل شركات الطاقة الخاصة هذا السوق أيضًا، مُدركةً ما يتيحه من فرص تجارية واعدة. غير أن ما إذا كان العرض سيواكب الطلب المتزايد يبقى سؤالًا مفتوحًا.	B2	27	2026-04-09 21:26:43.027737+00
133	Your Data and Who Controls It	بياناتك ومن يتحكم فيها	Every time a person browses a website, uses a mobile application, or makes an online purchase, vast amounts of personal data are collected, stored, and frequently sold to third parties. Most users remain largely unaware of the scale of this surveillance, clicking through lengthy privacy agreements without reading a single line. Technology companies have built enormously profitable businesses on this foundation.\n\nConcerns about data privacy have intensified in recent years following several high-profile scandals involving the misuse of personal information. Regulators in Europe introduced the General Data Protection Regulation, commonly known as GDPR, which grants citizens greater control over their own data and imposes heavy fines on organisations that violate these rules. Other regions have begun developing similar legislation.\n\nCritics argue, however, that existing laws are still insufficient. Enforcement remains inconsistent, and the technical complexity of modern data systems makes genuine transparency nearly impossible for average users. Many privacy advocates believe that fundamental reform of the digital economy is ultimately necessary to protect individual rights.	في كل مرة يتصفح فيها شخص موقعًا إلكترونيًا أو يستخدم تطبيقًا على هاتفه أو يُجري عملية شراء عبر الإنترنت، تُجمَع كميات هائلة من بياناته الشخصية وتُخزَّن وتُباع في أغلب الأحيان لأطراف ثالثة. ويجهل معظم المستخدمين حجم هذه المراقبة، إذ يوافقون على اتفاقيات الخصوصية الطويلة دون قراءة سطر واحد منها. وقد بنت شركات التكنولوجيا أعمالًا تجارية بالغة الربحية على هذا الأساس.\n\nتصاعدت المخاوف المتعلقة بخصوصية البيانات في السنوات الأخيرة في أعقاب عدة فضائح بارزة تتعلق بإساءة استخدام المعلومات الشخصية. أصدر المنظمون في أوروبا اللائحة العامة لحماية البيانات المعروفة بـ GDPR، التي تمنح المواطنين سيطرة أكبر على بياناتهم وتفرض غرامات باهظة على المؤسسات التي تنتهك هذه القواعد. وبدأت مناطق أخرى في سنّ تشريعات مماثلة.\n\nغير أن المنتقدين يرون أن القوانين القائمة لا تزال قاصرة. فالتطبيق يبقى متفاوتًا، والتعقيد التقني لأنظمة البيانات الحديثة يجعل الشفافية الحقيقية شبه مستحيلة بالنسبة للمستخدم العادي. ويعتقد كثير من المدافعين عن الخصوصية أن إصلاحًا جذريًا للاقتصاد الرقمي بات ضرورة حتمية لحماية حقوق الأفراد.	B2	28	2026-04-09 21:26:43.039704+00
134	Fleeing Home Because of Climate	الفرار من الوطن بسبب المناخ	Across the world, millions of people are being forced to abandon their homes not because of war or political persecution, but because of environmental devastation. Rising sea levels are swallowing low-lying coastal communities, prolonged droughts are destroying agricultural livelihoods, and intensifying storms are rendering entire regions uninhabitable. These displaced individuals are increasingly referred to as climate refugees.\n\nUnlike conventional refugees, climate migrants currently receive no formal legal protection under international law. The 1951 Refugee Convention does not recognise environmental factors as valid grounds for asylum, leaving millions of vulnerable people in a deeply uncertain legal position. Humanitarian organisations have repeatedly called for this framework to be updated and expanded.\n\nThe problem is expected to worsen considerably in the coming decades. The World Bank estimates that over two hundred million people could be internally displaced by climate change by 2050. Experts stress that wealthy nations, which bear the greatest responsibility for historical carbon emissions, have a moral obligation to lead international efforts to address this growing crisis.	في أرجاء العالم، يُضطر ملايين الأشخاص إلى النزوح عن بيوتهم ليس بسبب الحرب أو الاضطهاد السياسي، بل بسبب الكوارث البيئية. فارتفاع مستويات سطح البحر يبتلع المجتمعات الساحلية المنخفضة، والجفاف المطوّل يدمر سبل العيش الزراعية، والعواصف المتصاعدة تجعل مناطق بأكملها غير صالحة للسكن. ويُشار إلى هؤلاء النازحين بشكل متزايد بـ"اللاجئين المناخيين".\n\nعلى خلاف اللاجئين التقليديين، لا يحظى المهاجرون المناخيون حاليًا بأي حماية قانونية رسمية في إطار القانون الدولي. فاتفاقية اللاجئين لعام 1951 لا تعترف بالعوامل البيئية سببًا مشروعًا لطلب اللجوء، مما يترك الملايين من الفئات الهشة في وضع قانوني بالغ الهشاشة. وقد طالبت المنظمات الإنسانية مرارًا بتحديث هذا الإطار وتوسيعه.\n\nمن المتوقع أن تتفاقم هذه المشكلة بصورة ملحوظة في العقود القادمة. يُقدّر البنك الدولي أن أكثر من مئتي مليون شخص قد يُهجَّرون داخليًا بفعل تغير المناخ بحلول عام 2050. ويؤكد الخبراء أن الدول الغنية، التي تتحمل المسؤولية الأكبر عن الانبعاثات الكربونية التاريخية، ملزمة أخلاقيًا بقيادة الجهود الدولية لمعالجة هذه الأزمة المتنامية.	B2	29	2026-04-09 21:26:43.04382+00
135	The Rise of the Sharing Economy	صعود اقتصاد المشاركة	The sharing economy has fundamentally altered the way many people access goods and services. Platforms such as Airbnb and Uber allow individuals to monetise their underused assets, whether a spare bedroom or a private vehicle, by connecting them directly with consumers through digital marketplaces. This model has grown into a global industry worth hundreds of billions of dollars.\n\nProponents argue that the sharing economy promotes more efficient use of existing resources, reduces unnecessary consumption, and creates flexible income opportunities for participants. For consumers, it often provides cheaper and more convenient alternatives to traditional services. In densely populated urban areas particularly, these platforms have become deeply embedded in everyday life.\n\nCritics, however, raise serious concerns about worker rights, taxation, and the impact on established industries. Drivers and hosts are typically classified as independent contractors rather than employees, which means they receive few of the legal protections afforded to conventional workers. Regulators worldwide are still struggling to develop appropriate frameworks to govern this relatively new and rapidly evolving economic model.	غيّر اقتصاد المشاركة بشكل جذري طريقة وصول كثير من الناس إلى السلع والخدمات. تتيح منصات مثل Airbnb وUber للأفراد تحقيق الدخل من أصولهم غير المستغلة، سواء كانت غرفة نوم إضافية أو سيارة خاصة، وذلك بربطهم مباشرةً بالمستهلكين عبر الأسواق الرقمية. وقد نما هذا النموذج ليصبح صناعة عالمية تُقدَّر بمئات المليارات من الدولارات.\n\nيرى المؤيدون أن اقتصاد المشاركة يعزز الاستخدام الأكفأ للموارد القائمة، ويُقلص الاستهلاك غير الضروري، ويوفر فرص دخل مرنة للمشاركين. أما المستهلكون فكثيرًا ما يجدون فيه بدائل أرخص وأكثر ملاءمة من الخدمات التقليدية. وفي المناطق الحضرية المكتظة بالسكان تحديدًا، باتت هذه المنصات جزءًا لا يتجزأ من الحياة اليومية.\n\nبيد أن المنتقدين يُثيرون مخاوف جدية تتعلق بحقوق العمال والضرائب والتأثير على القطاعات التقليدية. فالسائقون وأصحاب المنازل يُصنَّفون عادةً متعاقدين مستقلين لا موظفين، مما يحرمهم من كثير من الحمايات القانونية الممنوحة للعمال التقليديين. ولا يزال المنظمون في أنحاء العالم يكافحون لوضع أطر تنظيمية ملائمة تحكم هذا النموذج الاقتصادي الجديد والمتطور بسرعة.	B2	30	2026-04-09 21:26:43.047539+00
136	Rethinking Punishment in Modern Justice	إعادة التفكير في العقوبة في العدالة الحديثة	Criminal justice reform has become one of the most debated topics in contemporary society. Many experts argue that traditional prison systems focus too heavily on punishment rather than rehabilitation. As a result, released prisoners often struggle to reintegrate into society, leading to high rates of reoffending. Reformers believe that addressing the root causes of crime — such as poverty, lack of education, and mental health issues — is far more effective than simply incarcerating individuals.\n\nSeveral countries have already adopted progressive approaches with promising results. Norway, for example, prioritises rehabilitation over punishment, offering inmates education, vocational training, and psychological support. Its reoffending rate is among the lowest in the world, suggesting that treating prisoners with dignity genuinely works.\n\nCritics, however, worry that lenient systems fail victims and send the wrong message to potential offenders. Striking the right balance between justice, compassion, and public safety remains a profound challenge for governments worldwide.	باتت إصلاحات العدالة الجنائية من أكثر الموضوعات التي تُثير الجدل في المجتمعات المعاصرة. يرى كثير من الخبراء أن أنظمة السجون التقليدية تُركّز بشكل مفرط على العقوبة بدلاً من إعادة التأهيل. ونتيجةً لذلك، يعاني المفرج عنهم في الغالب من صعوبات في الاندماج من جديد في المجتمع، مما يؤدي إلى ارتفاع معدلات العودة إلى الجريمة. ويرى المصلحون أن معالجة الأسباب الجذرية للجريمة — كالفقر وضعف التعليم والمشكلات الصحية النفسية — أكثر فاعلية بكثير من مجرد سجن الأفراد.\n\nتبنّت دول عديدة بالفعل مناهج تقدمية أسفرت عن نتائج مشجّعة. فالنرويج مثلاً تُقدّم إعادة التأهيل على العقوبة، وتوفر للسجناء التعليم والتدريب المهني والدعم النفسي، وتُسجّل من بين أدنى معدلات العودة إلى الجريمة في العالم.\n\nبيد أن المنتقدين يخشون أن تُخفق الأنظمة المتساهلة في إنصاف الضحايا وأن تُرسل رسائل خاطئة للمجرمين المحتملين. ويبقى إيجاد التوازن الصحيح بين العدالة والرحمة والأمن العام تحدياً عميقاً تواجهه الحكومات حول العالم.	B2	31	2026-04-09 21:28:05.345089+00
137	Gene Editing and the Ethics Debate	تحرير الجينات والجدل الأخلاقي	Advances in gene editing technology, particularly the development of CRISPR, have opened extraordinary possibilities in medicine and science. Scientists can now modify DNA with unprecedented precision, offering potential cures for inherited diseases such as cystic fibrosis and sickle cell anaemia. For millions of patients and families affected by genetic conditions, these breakthroughs represent genuine hope.\n\nHowever, the technology raises profound ethical questions. One major concern is the prospect of "designer babies" — children whose genetic traits are selected or enhanced before birth. Critics warn this could lead to new forms of inequality, where only wealthy families can afford genetic enhancements for their children. There is also the risk of unintended consequences, as altering one gene may affect others in unpredictable ways.\n\nMost scientists agree that strict international regulations are essential to prevent misuse. While gene editing holds enormous promise, humanity must proceed carefully, ensuring scientific progress does not outpace our moral and ethical frameworks.	فتحت التطورات في تقنية تحرير الجينات، ولا سيما تطوير تقنية كريسبر، آفاقاً استثنائية في الطب والعلوم. يستطيع العلماء اليوم تعديل الحمض النووي بدقة غير مسبوقة، مما يُتيح علاجات محتملة لأمراض وراثية كالتليف الكيسي وفقر الدم المنجلي. وبالنسبة لملايين المرضى والعائلات المتأثرة بالحالات الجينية، تمثّل هذه الاكتشافات أملاً حقيقياً.\n\nغير أن هذه التقنية تُثير تساؤلات أخلاقية عميقة. ومن أبرز المخاوف احتمال ظهور "الأطفال المُصمَّمين" — أي الأطفال الذين تُنتقى صفاتهم الجينية أو تُعزَّز قبل الولادة. ويُحذّر المنتقدون من أن ذلك قد يُفضي إلى أشكال جديدة من عدم المساواة، حيث لا تتمكن سوى الأسر الثرية من تحمّل تكاليف التحسينات الجينية لأطفالها.\n\nيتفق معظم العلماء على أن اللوائح الدولية الصارمة ضرورية لمنع إساءة استخدام هذه التقنية. وبينما تنطوي على إمكانات هائلة، يجب على البشرية المضي بحذر شديد لضمان ألا يتجاوز التقدم العلمي أُطرنا الأخلاقية والمعنوية.	B2	32	2026-04-09 21:28:05.378431+00
138	Why Art Matters to Society	لماذا يهم الفن للمجتمع	Art has played a central role in human civilisation for thousands of years. From ancient cave paintings to modern digital installations, creative expression reflects the values, struggles, and aspirations of society. Art allows communities to process collective experiences — whether grief, joy, or political upheaval — and preserves cultural identity across generations. Without art, much of what makes us distinctly human would be lost.\n\nBeyond its cultural significance, art also contributes meaningfully to mental health and social cohesion. Studies have shown that engaging with art — whether creating or simply observing it — can reduce stress, improve emotional wellbeing, and foster empathy. Public art projects in particular have been effective in revitalising neglected communities and encouraging civic pride.\n\nDespite these benefits, arts funding in many countries continues to decline. Governments increasingly prioritise science and technology education, viewing art as a luxury rather than a necessity. This perspective is short-sighted; a society that neglects creativity ultimately undermines its own capacity for innovation and emotional resilience.	أدّى الفن دوراً محورياً في الحضارة الإنسانية على مدى آلاف السنين. من رسومات الكهوف القديمة إلى التركيبات الرقمية المعاصرة، يعكس التعبير الإبداعي قيم المجتمع ونضالاته وتطلعاته. يُتيح الفن للمجتمعات استيعاب تجاربها الجماعية — سواء أكانت حزناً أم فرحاً أم اضطراباً سياسياً — ويحفظ الهوية الثقافية عبر الأجيال.\n\nفضلاً عن أهميته الثقافية، يُسهم الفن أيضاً إسهاماً ذا قيمة في الصحة النفسية والتماسك الاجتماعي. كشفت الدراسات أن التفاعل مع الفن — سواء بالإنتاج أو المشاهدة — يُقلّل التوتر ويُحسّن الرفاه العاطفي ويُعزّز التعاطف. وقد أثبتت مشاريع الفن العام بصفة خاصة فاعليتها في إحياء المجتمعات المهمّشة وتشجيع الفخر المدني.\n\nعلى الرغم من هذه الفوائد، يستمر تراجع تمويل الفنون في كثير من الدول. وتُولي الحكومات الأولوية بشكل متزايد لتعليم العلوم والتكنولوجيا، إذ تنظر إلى الفن باعتباره رفاهية لا ضرورة. هذا المنظور قاصر؛ فالمجتمع الذي يُهمل الإبداع يُقوّض في نهاية المطاف قدرته على الابتكار والمرونة العاطفية.	B2	33	2026-04-09 21:28:05.382604+00
139	Animal Testing: Necessity or Cruelty?	تجارب الحيوانات: ضرورة أم قسوة؟	Animal testing has been a cornerstone of scientific and medical research for over a century. Many life-saving vaccines, surgical techniques, and treatments for diseases such as cancer and diabetes were developed using animal subjects. Supporters argue that without such testing, the risks of trialling new substances directly on humans would be unacceptably high, and medical progress would be significantly delayed.\n\nHowever, opponents raise serious ethical concerns about the suffering caused to animals in laboratories. Each year, millions of mice, rats, rabbits, and other creatures endure painful experiments, often with limited regulatory oversight. Animal rights advocates contend that causing deliberate harm to sentient beings is morally unjustifiable, regardless of the potential benefits to humans.\n\nFortunately, advances in technology are providing credible alternatives. Computer modelling, cell cultures, and organ-on-a-chip technology can simulate human biological responses with increasing accuracy. Many scientists now advocate for the "three Rs" framework — replacing, reducing, and refining animal use in research — as a responsible path forward.	شكّلت تجارب الحيوانات ركيزةً أساسية في البحث العلمي والطبي لأكثر من قرن. فقد طُوِّرت كثير من اللقاحات المنقذة للحياة والتقنيات الجراحية والعلاجات لأمراض كالسرطان والسكري باستخدام حيوانات تجارب. ويرى المؤيدون أنه من دون هذه الاختبارات، ستكون مخاطر تجربة المواد الجديدة مباشرةً على البشر مقبولةً بدرجة غير مقبولة، وسيتعطّل التقدم الطبي تعطلاً ملحوظاً.\n\nبيد أن المعارضين يُثيرون مخاوف أخلاقية جدية بشأن المعاناة التي تتعرض لها الحيوانات في المختبرات. يُعاني الملايين منها سنوياً من تجارب مؤلمة في ظل رقابة تنظيمية محدودة. ويؤكد المدافعون عن حقوق الحيوان أن إلحاق الأذى المتعمد بكائنات واعية أمر لا يمكن تبريره أخلاقياً.\n\nلحسن الحظ، تُقدّم التطورات التكنولوجية بدائل موثوقة. إذ يمكن لنمذجة الحاسوب وزراعة الخلايا وتقنية "الأعضاء على رقاقة" محاكاة الاستجابات البيولوجية البشرية بدقة متزايدة. ويدعو كثير من العلماء الآن إلى اعتماد إطار "الثلاثة رَاءات" — الاستبدال والتقليل والتحسين — بوصفه مساراً مسؤولاً نحو المستقبل.	B2	34	2026-04-09 21:28:05.394254+00
140	The Hidden Burden of Modern Parenting	العبء الخفي للأبوة والأمومة الحديثة	Modern parenting involves far more than feeding and caring for children. Alongside these visible responsibilities, many parents — particularly mothers — carry what psychologists call the "mental load": the constant invisible work of planning, organising, and anticipating the needs of an entire family. This includes remembering school deadlines, scheduling medical appointments, managing household budgets, and monitoring children's emotional development. This cognitive labour rarely receives recognition, yet it consumes enormous mental energy.\n\nResearch consistently shows that this burden falls disproportionately on women, even in households where both partners work full-time. Many mothers report feeling perpetually exhausted, not from physical tasks alone, but from the relentless mental effort of keeping family life functioning smoothly. This invisible workload contributes significantly to burnout and relationship stress.\n\nAddressing this imbalance requires more than goodwill. Couples benefit from deliberate conversations about fair division of responsibilities, while employers and governments can help by offering flexible working arrangements and adequate parental leave policies for both parents equally.	تنطوي الأبوة والأمومة الحديثة على أكثر بكثير من مجرد إطعام الأطفال والعناية بهم. إلى جانب هذه المسؤوليات الظاهرة، يحمل كثير من الآباء — ولا سيما الأمهات — ما يُسميه علماء النفس "العبء الذهني": وهو العمل الخفي المتواصل في التخطيط والتنظيم والتنبؤ باحتياجات الأسرة بأكملها. يشمل ذلك تذكّر مواعيد المدرسة وجدولة المواعيد الطبية وإدارة ميزانية المنزل ومتابعة النمو العاطفي للأطفال. وهذا الجهد المعرفي نادراً ما يحظى بالتقدير، غير أنه يستنزف طاقةً ذهنية هائلة.\n\nتُظهر الأبحاث باستمرار أن هذا العبء يقع بشكل غير متناسب على كاهل المرأة، حتى في الأسر التي يعمل فيها كلا الشريكين بدوام كامل. كثير من الأمهات يشعرن بالإنهاك الدائم، لا من المهام الجسدية وحدها، بل من الجهد الذهني المتواصل للحفاظ على سير الحياة الأسرية بسلاسة.\n\nمعالجة هذا الخلل تتطلب أكثر من مجرد حسن النية. تستفيد الأزواج من محادثات متعمّدة حول التوزيع العادل للمسؤوليات، فيما يمكن لأصحاب العمل والحكومات المساعدة من خلال توفير ترتيبات عمل مرنة وسياسات إجازة أبوية كافية لكلا الوالدين على قدم المساواة.	B2	35	2026-04-09 21:28:05.397949+00
141	Alone Together: Loneliness in Modern Cities	وحيدون معاً: الوحدة في المدن الحديثة	Modern cities are home to millions of people, yet loneliness has become one of the most serious social problems of our time. Surveys consistently show that urban residents often feel more isolated than people living in smaller towns or rural areas. Despite being surrounded by crowds, many city dwellers struggle to form meaningful connections with their neighbours or colleagues.\n\nSeveral factors contribute to this paradox. Fast-paced lifestyles, long working hours, and heavy reliance on digital communication have replaced face-to-face interaction. Many people move to cities for work, leaving behind their support networks of family and friends. High-rise apartments, where residents rarely speak to one another, further reinforce a culture of disconnection.\n\nExperts warn that chronic loneliness has serious consequences for both mental and physical health, comparable to smoking fifteen cigarettes a day. Governments and community organisations are now developing initiatives such as neighbourhood social clubs and shared public spaces to help people reconnect and build stronger urban communities.	تحتضن المدن الحديثة الملايين من البشر، غير أن الوحدة باتت واحدة من أشد المشكلات الاجتماعية خطورةً في عصرنا. تُظهر الدراسات باستمرار أن سكان المدن يشعرون بالعزلة أكثر من سكان البلدات الصغيرة أو المناطق الريفية. وعلى الرغم من الازدحام الذي يحيط بهم، يجد كثير من سكان المدن صعوبةً في بناء علاقات حقيقية مع جيرانهم أو زملائهم.\n\nثمة عوامل عدة تُفضي إلى هذا التناقض؛ إذ حلّت أنماط الحياة المتسارعة، وساعات العمل الطويلة، والاعتماد الكبير على التواصل الرقمي محلَّ التفاعل المباشر بين الناس. كما أن كثيرين ينتقلون إلى المدن بحثاً عن العمل، تاركين وراءهم شبكة دعمهم من الأهل والأصدقاء. وتزيد الشقق في الأبراج الشاهقة، حيث نادراً ما يتحدث السكان إلى بعضهم، من ترسيخ ثقافة الانفصال.\n\nيحذّر الخبراء من أن الوحدة المزمنة تُلقي بظلالها الثقيلة على الصحة النفسية والجسدية، وأن تأثيرها يُعادل تدخين خمس عشرة سيجارة يومياً. لذا، تعكف الحكومات والمنظمات المجتمعية على تطوير مبادرات كالنوادي الاجتماعية في الأحياء والفضاءات العامة المشتركة، بهدف مساعدة الناس على التواصل وبناء مجتمعات حضرية أكثر تماسكاً.	B2	36	2026-04-09 21:29:37.773935+00
142	Shopping Reimagined: The Future of Retail	إعادة تصوّر التسوق: مستقبل تجارة التجزئة	The retail industry is undergoing a dramatic transformation. The rapid growth of online shopping has forced traditional brick-and-mortar stores to rethink their purpose and adapt to changing consumer expectations. Many high street shops have closed permanently, unable to compete with the convenience and competitive pricing offered by e-commerce giants.\n\nHowever, physical retail is far from dead. Forward-thinking retailers are reinventing the in-store experience by combining technology with personalised service. Augmented reality allows customers to virtually try on clothing or visualise furniture in their homes before purchasing. Meanwhile, cashierless stores, where AI-powered cameras track what shoppers take from shelves, are eliminating long queues and making transactions seamless.\n\nSustainability is also reshaping consumer behaviour. Growing numbers of shoppers actively seek out brands that demonstrate environmental responsibility, from eco-friendly packaging to ethical supply chains. Retail experts predict that the most successful stores of the future will be those offering unique, memorable experiences that online platforms simply cannot replicate.	تشهد صناعة التجزئة تحولاً جذرياً عميقاً. فقد دفع النمو المتسارع للتسوق الإلكتروني المتاجرَ التقليدية إلى إعادة النظر في دورها والتكيّف مع التوقعات المتغيرة للمستهلكين. وقد أغلقت محلات كثيرة في الشوارع التجارية أبوابها نهائياً، عاجزةً عن منافسة الراحة والأسعار التنافسية التي تقدمها عمالقة التجارة الإلكترونية.\n\nبيد أن التجزئة التقليدية لم تلفظ أنفاسها بعد. فالتجار المبتكرون يعيدون اختراع تجربة التسوق داخل المتاجر بالجمع بين التكنولوجيا والخدمة الشخصية. إذ تُتيح تقنية الواقع المعزز للعملاء تجربة الملابس افتراضياً أو تخيّل الأثاث في منازلهم قبل الشراء. كما تنتشر المتاجر التي لا تحتاج إلى صرّافين، حيث تتتبع كاميرات مدعومة بالذكاء الاصطناعي ما يأخذه المتسوقون من الرفوف، مما يُلغي طوابير الانتظار ويجعل المعاملات سلسة.\n\nكذلك تُعيد الاستدامة تشكيل سلوك المستهلكين؛ إذ يبحث عدد متزايد من المتسوقين عن العلامات التجارية التي تُثبت مسؤوليتها البيئية، من التغليف الصديق للبيئة إلى سلاسل التوريد الأخلاقية. ويتوقع خبراء التجزئة أن المتاجر الأكثر نجاحاً في المستقبل ستكون تلك التي تقدم تجارب فريدة ولا تُنسى لا تستطيع المنصات الرقمية تقليدها.	B2	37	2026-04-09 21:29:37.777895+00
162	When History Lives in the Body	حين يعيش التاريخ في الجسد	Trauma, researchers have discovered, does not necessarily end with the individual who experienced it. Studies of communities that have endured war, famine, or systematic oppression reveal that psychological and even physiological effects can persist across generations. This phenomenon, termed intergenerational trauma, has profound implications for public health policy and our understanding of inequality.\n\nEpigenetic research suggests that extreme stress can alter gene expression in ways that are heritable, meaning that the children and grandchildren of survivors may carry biological markers of suffering they never personally experienced. Meanwhile, psychological transmission occurs through disrupted parenting patterns, collective grief, and cultural narratives of loss that shape a child's earliest understanding of the world.\n\nPublic health professionals argue that treating these communities requires acknowledging historical injustices rather than simply addressing present-day symptoms. Programmes that incorporate cultural healing practices alongside conventional therapy have shown promising results in indigenous and refugee populations. Ignoring the historical dimension of suffering, critics warn, risks perpetuating cycles of disadvantage by mistaking structural wounds for individual failings. Genuine healing demands both medical intervention and collective acknowledgement of the past.	اكتشف الباحثون أن الصدمة لا تنتهي بالضرورة مع الفرد الذي عاشها. تكشف دراسات المجتمعات التي عانت من الحروب أو المجاعات أو الاضطهاد الممنهج أن التأثيرات النفسية وحتى الفسيولوجية يمكن أن تمتد عبر الأجيال. هذه الظاهرة، المعروفة بالصدمة بين الأجيال، لها تداعيات عميقة على سياسات الصحة العامة وفهمنا لأسباب عدم المساواة.\n\nتشير الأبحاث الإيبيجينية إلى أن الضغط الشديد يمكن أن يُغيّر التعبير الجيني بطرق وراثية، مما يعني أن أبناء وأحفاد الناجين قد يحملون علامات بيولوجية لمعاناة لم يعيشوها شخصياً. في الوقت ذاته، تحدث النقل النفسي عبر أنماط التنشئة المضطربة، والحزن الجماعي، والروايات الثقافية للخسارة التي تشكّل الفهم الأول للطفل عن العالم.\n\nيرى المختصون في الصحة العامة أن معالجة هذه المجتمعات تستلزم الاعتراف بالمظالم التاريخية بدلاً من الاكتفاء بمعالجة الأعراض الراهنة. أظهرت البرامج التي تدمج ممارسات الشفاء الثقافي مع العلاج التقليدي نتائج واعدة في المجتمعات الأصلية واللاجئين. يحذر المنتقدون من أن تجاهل البعد التاريخي للمعاناة يخاطر بإدامة دورات الحرمان بالخلط بين الجروح البنيوية والإخفاقات الفردية.	C1	12	2026-04-09 21:37:34.714736+00
143	The Growing Gap: Understanding Income Inequality	الفجوة المتسعة: فهم عدم المساواة في الدخل	Income inequality refers to the unequal distribution of earnings among individuals within a society. In recent decades, the gap between the wealthiest and the poorest members of society has widened significantly in many countries. According to global reports, the richest one percent of the world's population now controls more wealth than the remaining ninety-nine percent combined.\n\nEconomists identify multiple causes for this growing divide. Technological advancement has created highly paid jobs for skilled workers while simultaneously making many lower-skilled positions redundant. Additionally, policies such as tax cuts for corporations and reductions in social welfare programmes have tended to benefit wealthier individuals disproportionately. Globalisation has further complicated the picture by shifting manufacturing jobs to lower-wage countries.\n\nThe consequences of extreme inequality extend beyond economics. High levels of inequality are linked to increased crime rates, poorer public health outcomes, and reduced social mobility, meaning fewer people can improve their economic circumstances regardless of their effort or talent. Addressing this issue requires coordinated policy action at both national and international levels.	يُشير مصطلح عدم المساواة في الدخل إلى التوزيع غير المتكافئ للدخل بين أفراد المجتمع. وقد اتسعت الفجوة في العقود الأخيرة بين الأثرياء والفقراء اتساعاً ملحوظاً في دول كثيرة. فوفقاً للتقارير العالمية، يسيطر أغنى واحد بالمئة من سكان العالم على ثروات تفوق ما يملكه الـ99 بالمئة الباقون مجتمعين.\n\nيُحدد الاقتصاديون أسباباً متعددة لهذه الفجوة المتنامية؛ فالتقدم التكنولوجي أوجد وظائف مدفوعة الأجر بسخاء للعمال المهرة، في حين جعل كثيراً من الوظائف الأقل تخصصاً عديمة الجدوى. علاوةً على ذلك، أفادت سياسات كتخفيض الضرائب على الشركات وتقليص برامج الرعاية الاجتماعية الأثرياءَ بصورة غير متناسبة. وزاد العولمة الأمرَ تعقيداً بنقل وظائف التصنيع إلى بلدان ذات أجور أدنى.\n\nتمتد تداعيات التفاوت الحاد في الثروة إلى أبعد من الاقتصاد؛ إذ ترتبط معدلات عدم المساواة المرتفعة بارتفاع الجريمة وتردّي الصحة العامة وتراجع الحراك الاجتماعي، بمعنى أن فرص الأفراد في تحسين أوضاعهم الاقتصادية تتضاءل بصرف النظر عن جهودهم أو مواهبهم. ومعالجة هذه المشكلة تستلزم عملاً سياسياً منسقاً على المستويين الوطني والدولي.	B2	38	2026-04-09 21:29:37.781105+00
144	Borrowing Culture: The Appropriation Debate	استعارة الثقافة: الجدل حول الاستيلاء الثقافي	Cultural appropriation occurs when elements of a minority culture are adopted by members of a dominant culture, often without proper understanding, acknowledgement, or respect. The debate surrounding this practice has intensified in recent years, particularly in fashion, music, and the arts. Critics argue that such borrowing exploits historically marginalised communities while ignoring the deeper significance of their traditions.\n\nHowever, distinguishing between appropriation and cultural exchange is complex. Many scholars point out that cultures have always influenced one another throughout history, and that this cross-cultural interaction has enriched human civilisation. The central question is whether the adoption of cultural elements is done with awareness and genuine appreciation or whether it reduces sacred traditions to mere fashion trends or entertainment.\n\nContext and power dynamics play a crucial role in this discussion. When a dominant group profits commercially from another culture's heritage while that community faces discrimination, the ethical concerns become particularly significant. Respectful engagement, collaboration with cultural communities, and giving appropriate credit are widely recommended as constructive ways to navigate cultural exchange responsibly.	يحدث الاستيلاء الثقافي حين يتبنّى أفراد من ثقافة مهيمنة عناصر من ثقافة أقلية، غالباً دون فهم أو اعتراف أو احترام كافٍ. وقد اشتدّ الجدل حول هذه الممارسة في السنوات الأخيرة، ولا سيما في مجالات الموضة والموسيقى والفنون. ويرى المنتقدون أن هذا الاستعارة تستغل مجتمعات مهمّشة تاريخياً مع تجاهل المعنى العميق لتقاليدها.\n\nغير أن التمييز بين الاستيلاء الثقافي والتبادل الثقافي أمر بالغ التعقيد. يُشير كثير من الباحثين إلى أن الثقافات تأثرت ببعضها على مرّ التاريخ، وأن هذا التفاعل بين الثقافات أثرى الحضارة الإنسانية. والسؤال الجوهري هو: هل يجري تبنّي العناصر الثقافية بوعي وتقدير حقيقيين، أم أنه يُختزل التقاليد المقدسة إلى مجرد صيحات موضة أو ترفيه؟\n\nيؤدي السياق وموازين القوى دوراً محورياً في هذا النقاش. فحين تجني مجموعة مهيمنة أرباحاً تجارية من تراث ثقافة أخرى في حين يواجه أبناء تلك الثقافة التمييز، تبرز المخاوف الأخلاقية بصورة جلية. ويوصي كثيرون بالتعامل المحترم، والتعاون مع المجتمعات الثقافية، ومنح الفضل لأصحابه، بوصفها سبلاً بنّاءة للتعامل مع التبادل الثقافي بمسؤولية.	B2	39	2026-04-09 21:29:37.784455+00
145	Running Dry: The Global Water Crisis	نضوب المياه: أزمة المياه العالمية	Water scarcity is one of the most pressing environmental challenges facing humanity today. Approximately two billion people worldwide currently lack access to safe drinking water, and experts warn that this figure could rise dramatically by 2050 due to population growth, climate change, and unsustainable consumption patterns. Regions such as sub-Saharan Africa, the Middle East, and parts of South Asia are already experiencing severe water stress.\n\nAgriculture is by far the largest consumer of freshwater resources, accounting for roughly seventy percent of global water usage. Inefficient irrigation methods waste enormous quantities of water, while industrial pollution contaminates rivers and groundwater reserves that communities depend on. Rapid urbanisation places additional pressure on already strained water infrastructure in many developing nations.\n\nAddressing water scarcity requires urgent action on multiple fronts. Governments must invest in modern water treatment and recycling technologies, promote water-efficient farming practices, and establish stronger international agreements to manage shared water resources fairly. Individual behavioural changes, such as reducing household water waste, also form an important part of the solution.	تُعدّ شُح المياه من أشد التحديات البيئية إلحاحاً التي تواجه البشرية اليوم. فنحو ملياري شخص حول العالم يفتقرون حالياً إلى مياه الشرب النظيفة، ويحذّر الخبراء من أن هذا الرقم قد يرتفع ارتفاعاً حاداً بحلول عام 2050 بسبب النمو السكاني والتغير المناخي وأنماط الاستهلاك غير المستدامة. وتعاني مناطق كأفريقيا جنوب الصحراء الكبرى والشرق الأوسط وأجزاء من جنوب آسيا بالفعل من إجهاد مائي حاد.\n\nتستهلك الزراعة بفارق كبير الحصة الأكبر من موارد المياه العذبة، إذ تمثل نحو سبعين بالمئة من الاستخدام العالمي للمياه. وتُهدر أساليب الري غير الفعّالة كميات هائلة من المياه، فيما يُلوّث التلوث الصناعي الأنهار والمياه الجوفية التي تعتمد عليها المجتمعات. ويُلقي التوسع العمراني السريع ضغطاً إضافياً على البنية التحتية للمياه المُثقَلة أصلاً في كثير من الدول النامية.\n\nتصدّي شُح المياه يستلزم إجراءات عاجلة على أصعدة متعددة. فعلى الحكومات الاستثمار في تقنيات حديثة لمعالجة المياه وإعادة تدويرها، وتعزيز ممارسات الزراعة الموفّرة للمياه، وإرساء اتفاقيات دولية أقوى لإدارة الموارد المائية المشتركة بصورة عادلة. كما تُشكّل التغييرات السلوكية الفردية، كتقليل هدر المياه المنزلية، جزءاً مهماً من الحل.	B2	40	2026-04-09 21:29:37.787547+00
146	Gig Workers Fighting for Their Rights	عمال الغيغ يناضلون من أجل حقوقهم	The gig economy has transformed the way millions of people work around the world. Platforms such as Uber, Deliveroo, and Fiverr allow individuals to offer their services on a flexible, short-term basis. While this model provides freedom and independence, it often leaves workers without basic protections such as sick pay, pension contributions, or guaranteed minimum wages.\n\nIn recent years, gig workers have increasingly organised themselves to demand better conditions. Several landmark court cases in the United Kingdom ruled that delivery drivers and ride-share operators should be classified as workers rather than self-employed contractors, entitling them to certain legal rights.\n\nHowever, progress remains slow and uneven across different countries. Many workers continue to rely on unstable income with little safety net. Policymakers face the challenge of updating labour laws that were designed for a traditional employment model, one that no longer reflects the reality of modern work.	أحدث اقتصاد الغيغ تحولاً جذرياً في طريقة عمل ملايين الأشخاص حول العالم. تتيح منصات مثل أوبر وديليفرو وفايفر للأفراد تقديم خدماتهم بصورة مرنة وقصيرة الأمد. وبينما يوفر هذا النموذج الحرية والاستقلالية، فإنه كثيراً ما يحرم العمال من الحماية الأساسية كإجازات المرض المدفوعة ومعاشات التقاعد والحد الأدنى المضمون للأجور.\n\nفي السنوات الأخيرة، بات عمال الغيغ ينظمون أنفسهم بشكل متزايد للمطالبة بظروف عمل أفضل. وقد أصدرت عدة محاكم بارزة في المملكة المتحدة أحكاماً تقضي بتصنيف سائقي التوصيل ومشغلي مشاركة الركوب كعمال وليس متعاقدين مستقلين، مما يمنحهم حقوقاً قانونية معينة.\n\nغير أن التقدم لا يزال بطيئاً وغير متكافئ بين الدول المختلفة. ويواصل كثير من العمال الاعتماد على دخل غير مستقر مع شبكة أمان هزيلة. ويواجه صانعو السياسات تحدي تحديث قوانين العمل التي صُممت لنموذج توظيف تقليدي لم يعد يعكس واقع العمل الحديث.	B2	41	2026-04-09 21:32:30.557639+00
147	Education Inequality Across Social Classes	عدم المساواة في التعليم بين الطبقات الاجتماعية	Access to quality education remains one of the most persistent forms of social inequality in the modern world. Children from wealthier families often attend well-funded private schools with smaller class sizes, experienced teachers, and a wide range of extracurricular activities. In contrast, students from low-income backgrounds frequently attend underfunded state schools where resources are severely limited.\n\nThis disparity creates a cycle that is difficult to break. Children with access to better education are more likely to gain entry to prestigious universities, secure well-paying jobs, and achieve upward social mobility. Meanwhile, those from disadvantaged backgrounds face significant barriers at every stage of their academic journey.\n\nGovernments have introduced various initiatives to address this imbalance, including scholarships, free school meals, and additional funding for schools in deprived areas. However, critics argue that these measures are insufficient and that deeper structural reforms are needed to create a genuinely fair educational system for all children.	لا يزال الوصول إلى التعليم الجيد من أكثر أشكال عدم المساواة الاجتماعية استمراراً في العالم الحديث. فكثيراً ما يلتحق أبناء الأسر الميسورة بمدارس خاصة جيدة التمويل، تتميز بفصول أقل عدداً ومعلمين ذوي خبرة وأنشطة لا منهجية متنوعة. في المقابل، يرتاد الطلاب من الأسر ذات الدخل المنخفض في الغالب مدارس حكومية تعاني نقص التمويل وشح الموارد.\n\nيُفرز هذا التفاوت حلقة مفرغة يصعب كسرها. إذ إن الأطفال الذين يحظون بتعليم أفضل هم أكثر احتمالاً للالتحاق بالجامعات المرموقة والحصول على وظائف مجزية وتحقيق الارتقاء الاجتماعي. في حين يواجه أبناء الفئات المحرومة عقبات جوهرية في كل مرحلة من مراحل مسيرتهم الأكاديمية.\n\nأطلقت الحكومات مبادرات متعددة لمعالجة هذا الخلل، منها المنح الدراسية ووجبات الطعام المجانية وتخصيص تمويل إضافي للمدارس في المناطق المحرومة. بيد أن المنتقدين يرون أن هذه التدابير غير كافية، وأن إصلاحات هيكلية أعمق ضرورية لبناء نظام تعليمي عادل حقاً لجميع الأطفال.	B2	42	2026-04-09 21:32:30.592542+00
148	How Advertising Shapes Our Decisions	كيف يشكّل الإعلان قراراتنا	Advertising is far more sophisticated than simply promoting a product. Modern marketing campaigns are carefully designed using psychological principles to influence consumer behaviour in subtle and often unconscious ways. Techniques such as emotional storytelling, social proof, and scarcity messaging are commonly used to persuade people to make purchases they might not otherwise consider.\n\nOne powerful strategy involves associating a brand with positive emotions or aspirational lifestyles. Luxury car advertisements, for example, rarely focus on technical specifications. Instead, they depict successful, attractive individuals enjoying freedom and status. This approach appeals to consumers' desire for identity and belonging rather than their rational judgement.\n\nResearchers have found that repeated exposure to advertisements, even those people claim to dislike, can gradually build brand familiarity and trust. This phenomenon, known as the mere exposure effect, explains why companies invest enormous budgets in repetitive advertising campaigns. Understanding these mechanisms can help consumers make more informed and independent choices in their daily lives.	الإعلان أكثر تعقيداً بكثير من مجرد الترويج لمنتج. فحملات التسويق الحديثة تُصمَّم بعناية وفق مبادئ نفسية للتأثير في سلوك المستهلك بأساليب خفية وغير واعية في أغلب الأحيان. وتُستخدم تقنيات كالسرد العاطفي والإثبات الاجتماعي ورسائل الندرة على نطاق واسع لإقناع الناس بإجراء عمليات شراء ربما لم يفكروا فيها أصلاً.\n\nمن أبرز الاستراتيجيات الفعّالة ربط العلامة التجارية بمشاعر إيجابية أو أنماط حياة طموحة. فإعلانات السيارات الفارهة، على سبيل المثال، نادراً ما تركز على المواصفات التقنية، بل تُصوّر شخصيات ناجحة وجذابة تستمتع بالحرية والمكانة. يستهدف هذا النهج رغبة المستهلكين في تحديد هويتهم والانتماء، لا حكمهم العقلاني.\n\nتوصّل الباحثون إلى أن التعرض المتكرر للإعلانات، حتى تلك التي يدّعي الناس كرهها، يمكن أن يبني تدريجياً ألفة الجمهور بالعلامة التجارية وثقته بها. هذه الظاهرة المعروفة بـ«أثر مجرد التعرض» تفسر سبب ضخ الشركات ميزانيات ضخمة في حملات إعلانية متكررة. وفهم هذه الآليات يعين المستهلكين على اتخاذ خيارات أكثر وعياً واستقلالية في حياتهم اليومية.	B2	43	2026-04-09 21:32:30.605442+00
149	The Struggles of Migration and Integration	تحديات الهجرة والاندماج	Moving to a new country is rarely as straightforward as many people imagine. Migrants face a complex set of challenges that extend well beyond learning a new language. Cultural differences, unfamiliar bureaucratic systems, and social isolation can make the process of integration deeply overwhelming, particularly for those who have fled conflict or poverty.\n\nFinding employment is often one of the most significant obstacles. Even highly qualified migrants frequently discover that their foreign qualifications are not recognised in their new country, forcing them to accept jobs far below their skill level. This not only affects their financial stability but can also damage their sense of identity and self-worth.\n\nCommunities and governments play a crucial role in easing this transition. Successful integration programmes typically combine language support, cultural orientation, and employment assistance. Research consistently shows that migrants who feel welcomed and valued make significant positive contributions to their host societies, enriching both the economy and the cultural fabric of the nation.	نادراً ما يكون الانتقال إلى بلد جديد بالسهولة التي يتخيلها كثيرون. يواجه المهاجرون جملة من التحديات المعقدة تتجاوز بكثير تعلّم لغة جديدة. فالاختلافات الثقافية والأنظمة البيروقراطية غير المألوفة والعزلة الاجتماعية قد تجعل مسار الاندماج ثقيلاً للغاية، لا سيما لمن فرّوا من النزاعات أو الفقر.\n\nويُعدّ إيجاد عمل من أبرز العقبات. إذ يكتشف المهاجرون ذوو الكفاءات العالية في أغلب الأحيان أن مؤهلاتهم الأجنبية غير معترف بها في بلدهم الجديد، مما يضطرهم إلى قبول وظائف تقل كثيراً عن مستوى خبراتهم. لا يؤثر ذلك على استقرارهم المالي فحسب، بل قد يمس إحساسهم بهويتهم وقيمتهم الذاتية.\n\nتؤدي المجتمعات والحكومات دوراً محورياً في تيسير هذا الانتقال. فبرامج الاندماج الناجحة تجمع عادةً بين دعم اللغة والتوجيه الثقافي والمساعدة في التوظيف. وتُثبت الأبحاث باستمرار أن المهاجرين الذين يشعرون بالترحيب والتقدير يُقدّمون إسهامات إيجابية بارزة لمجتمعاتهم المضيفة، مما يُثري اقتصادها ونسيجها الثقافي معاً.	B2	44	2026-04-09 21:32:30.609759+00
150	Artificial Intelligence Reshaping Modern Workplaces	الذكاء الاصطناعي يُعيد تشكيل بيئات العمل الحديثة	Artificial intelligence is rapidly changing the nature of work across virtually every industry. Tasks that once required human expertise, such as data analysis, customer service, and even medical diagnosis, can now be performed faster and more accurately by intelligent systems. This technological shift is creating both exciting opportunities and serious concerns for workers worldwide.\n\nProponents argue that AI will eliminate repetitive, tedious tasks, freeing humans to focus on creative, strategic, and interpersonal work. Historically, technological revolutions have ultimately created more jobs than they destroyed, and many economists believe AI will follow a similar pattern. New roles in AI development, maintenance, and ethics are already emerging across various sectors.\n\nHowever, critics warn that this transition will not be smooth or equitable. Workers in routine-based occupations, particularly those with limited access to retraining opportunities, risk being left behind. Governments and businesses must invest heavily in education and skills development to ensure that the benefits of artificial intelligence are shared broadly across society.	يغيّر الذكاء الاصطناعي بسرعة متسارعة طبيعة العمل في كل القطاعات تقريباً. فالمهام التي كانت تستلزم خبرة بشرية، كتحليل البيانات وخدمة العملاء بل والتشخيص الطبي، باتت الأنظمة الذكية تؤديها بشكل أسرع وأكثر دقة. ويخلق هذا التحول التكنولوجي فرصاً مثيرة ومخاوف جدية في آنٍ واحد للعمال حول العالم.\n\nيرى المؤيدون أن الذكاء الاصطناعي سيُلغي المهام المتكررة والمملة، مما يتيح للبشر التركيز على العمل الإبداعي والاستراتيجي والعلائقي. وتاريخياً، أفرزت الثورات التكنولوجية وظائف أكثر مما أزالت، ويعتقد كثير من الاقتصاديين أن الذكاء الاصطناعي سيسير على النهج ذاته. وتبرز بالفعل أدوار جديدة في تطوير الذكاء الاصطناعي وصيانته وأخلاقياته عبر قطاعات متعددة.\n\nبيد أن المنتقدين يحذرون من أن هذا التحول لن يكون سلساً أو عادلاً. فالعمال في المهن القائمة على الروتين، ولا سيما ذوو الوصول المحدود إلى فرص إعادة التدريب، يخاطرون بالتهميش. ولذا يتعين على الحكومات والشركات الاستثمار بكثافة في التعليم وتنمية المهارات لضمان توزيع عادل لفوائد الذكاء الاصطناعي على المجتمع بأسره.	B2	45	2026-04-09 21:32:30.613904+00
151	The Silent Crisis of Vanishing Species	الأزمة الصامتة لانقراض الأنواع	Biodiversity refers to the enormous variety of life on Earth, from microscopic bacteria to towering rainforest trees. Scientists estimate that our planet currently hosts around eight million species, yet many are disappearing at an alarming rate. Researchers warn that we are experiencing the sixth mass extinction in Earth's history, driven primarily by human activity rather than natural causes.\n\nDeforestation, pollution, climate change, and the expansion of agriculture are the leading threats to wildlife habitats worldwide. When a species disappears, the entire ecosystem it supported is weakened, often triggering a chain reaction that affects countless other organisms. Coral reefs, tropical forests, and wetlands are among the most severely threatened environments today.\n\nConservation efforts have achieved some success, with certain endangered species recovering thanks to legal protection and habitat restoration. However, experts agree that without significant changes to global consumption patterns and land use policies, the loss of biodiversity will continue at a devastating pace.	يشير التنوع البيولوجي إلى التنوع الهائل للحياة على كوكب الأرض، بدءًا من البكتيريا المجهرية وصولًا إلى أشجار الغابات المطيرة الشاهقة. يُقدّر العلماء أن كوكبنا يضم حاليًا نحو ثمانية ملايين نوع، غير أن كثيرًا منها يختفي بمعدل مثير للقلق. ويُحذّر الباحثون من أننا نشهد حاليًا حالة الانقراض الجماعي السادسة في تاريخ الأرض، مدفوعةً في المقام الأول بالنشاط البشري لا بالأسباب الطبيعية.\n\nتُعدّ إزالة الغابات والتلوث وتغير المناخ والتوسع في الزراعة أبرز التهديدات التي تواجه موائل الحياة البرية حول العالم. وحين يختفي نوع ما، يضعف النظام البيئي الذي كان يدعمه بأسره، مما يُطلق في الغالب سلسلة من ردود الفعل تؤثر في كائنات حية لا حصر لها. وتُعدّ الشعاب المرجانية والغابات الاستوائية والأراضي الرطبة من أكثر البيئات تعرضًا للخطر اليوم.\n\nحققت جهود الحفاظ على البيئة بعض النجاحات، إذ تعافت أنواع مهددة بالانقراض بفضل الحماية القانونية وإعادة تأهيل الموائل. بيد أن الخبراء يتفقون على أنه دون إجراء تغييرات جوهرية في أنماط الاستهلاك العالمي وسياسات استخدام الأراضي، فإن فقدان التنوع البيولوجي سيستمر بوتيرة مدمرة.	B2	46	2026-04-09 21:34:03.502314+00
152	Breaking the Silence Around Mental Illness	كسر الصمت حول مرض الصحة النفسية	Mental health stigma remains one of the most significant barriers preventing people from seeking the help they need. Despite growing public awareness campaigns, many individuals who experience depression, anxiety, or other psychological conditions still fear judgment from family members, colleagues, and society at large. This fear frequently leads people to suffer in silence for years before finally reaching out to a professional.\n\nCultural attitudes play a particularly powerful role in shaping how mental illness is perceived. In many communities, admitting to emotional struggles is associated with weakness or personal failure, making it extremely difficult for individuals to openly discuss their experiences. Younger generations, however, appear more willing to challenge these attitudes, partly due to greater exposure to mental health discussions on social media platforms.\n\nHealthcare professionals and educators argue that meaningful change requires long-term investment in public education. Schools, workplaces, and government institutions must actively promote environments where emotional wellbeing is valued equally alongside physical health, ensuring that no one feels ashamed to seek support.	لا يزال الوصم المرتبط بالصحة النفسية أحد أبرز العوائق التي تحول دون إقدام الناس على طلب المساعدة التي يحتاجون إليها. وعلى الرغم من حملات التوعية العامة المتنامية، لا يزال كثير من الأفراد الذين يعانون من الاكتئاب والقلق أو غيرها من الحالات النفسية يخشون إصدار الأحكام عليهم من قبل ذويهم وزملائهم والمجتمع عمومًا. وكثيرًا ما تدفع هذه المخاوف الناس إلى المعاناة في صمت لسنوات قبل أن يلجأوا أخيرًا إلى متخصص.\n\nتؤدي المواقف الثقافية دورًا بالغ الأثر في تشكيل طريقة النظر إلى الأمراض النفسية. ففي كثير من المجتمعات، يُقرن الاعتراف بالمعاناة العاطفية بالضعف أو الإخفاق الشخصي، مما يجعل الحديث المفتوح عن هذه التجارب أمرًا عسيرًا للغاية. غير أن الأجيال الأصغر تبدو أكثر استعدادًا لتحدي هذه المواقف، ويعود ذلك جزئيًا إلى تعرضها الأوسع لنقاشات الصحة النفسية على منصات التواصل الاجتماعي.\n\nيرى المختصون في الرعاية الصحية والمربون أن التغيير الحقيقي يستلزم استثمارًا طويل الأمد في التثقيف العام. وينبغي للمدارس وبيئات العمل والمؤسسات الحكومية أن تعزز بصورة فاعلة البيئات التي تُقدَّر فيها الصحة النفسية بالقدر ذاته الذي تُقدَّر به الصحة الجسدية، حتى لا يشعر أحد بالخجل من طلب الدعم.	B2	47	2026-04-09 21:34:03.536665+00
153	Can Newspapers Survive the Digital Age?	هل تستطيع الصحف النجاة في العصر الرقمي؟	For centuries, printed newspapers served as the primary source of information for communities around the world. However, the rapid rise of digital media has fundamentally transformed the news industry, forcing traditional publishers to reconsider their entire business model. Circulation figures for print newspapers have declined sharply across most developed countries, with many well-established titles either closing permanently or moving exclusively online.\n\nAdvertising revenue, which once sustained the newspaper industry, has shifted dramatically toward digital platforms such as social media networks and search engines. This financial pressure has led to significant newsroom staff reductions, raising concerns about the quality and depth of investigative journalism. Critics argue that as experienced journalists are replaced by cheaper alternatives, accountability reporting suffers considerably.\n\nDespite these challenges, some newspapers have successfully adapted by developing digital subscription models and producing high-quality multimedia content. Readers who value reliable, in-depth reporting have demonstrated willingness to pay for trusted journalism. The future of newspapers may therefore depend less on the format and more on the credibility and relevance of the content they deliver.	لقرون طويلة، كانت الصحف المطبوعة تمثّل المصدر الرئيسي للمعلومات لدى المجتمعات حول العالم. غير أن الصعود المتسارع للإعلام الرقمي أحدث تحولًا جوهريًا في صناعة الأخبار، مما اضطر الناشرين التقليديين إلى إعادة النظر في نموذج عملهم بالكامل. وقد تراجعت أرقام توزيع الصحف الورقية بحدة في معظم الدول المتقدمة، فيما أغلقت عناوين راسخة أبوابها نهائيًا أو انتقلت كليًا إلى الفضاء الإلكتروني.\n\nوتحوّلت عائدات الإعلانات التي كانت تُموّل صناعة الصحف في يوم من الأيام بصورة لافتة نحو المنصات الرقمية كشبكات التواصل الاجتماعي ومحركات البحث. وقد أفضى هذا الضغط المالي إلى تقليص حاد في أعداد موظفي غرف الأخبار، مما يُثير مخاوف جدية بشأن جودة الصحافة الاستقصائية وعمقها. ويرى المنتقدون أنه مع حلول بدائل أرخص محل الصحفيين ذوي الخبرة، يتأثر التحقيق في الشؤون العامة تأثيرًا بالغًا.\n\nوعلى الرغم من هذه التحديات، نجح بعض الصحف في التكيف بتطوير نماذج اشتراك رقمية وإنتاج محتوى وسائطي متعدد عالي الجودة. وقد أبدى القراء الذين يُقدّرون التقارير الموثوقة والمعمّقة استعدادهم للدفع مقابل الصحافة الجديرة بالثقة. وربما يتوقف مستقبل الصحف بذلك على مصداقية المحتوى وأهميته أكثر مما يتوقف على الشكل الذي يُقدَّم به.	B2	48	2026-04-09 21:34:03.549596+00
154	Feeding the World's Most Vulnerable Populations	إطعام أكثر سكان العالم ضعفًا	Food security remains a pressing global challenge, particularly in developing nations across sub-Saharan Africa, South Asia, and parts of Latin America. Millions of people in these regions lack consistent access to sufficient, nutritious food, leaving them vulnerable to malnutrition and associated health complications. Poverty, political instability, and inadequate infrastructure are among the primary factors that perpetuate food insecurity across generations.\n\nClimate change is increasingly disrupting agricultural production in regions already struggling to feed their populations. Unpredictable rainfall patterns, prolonged droughts, and extreme weather events destroy harvests and threaten the livelihoods of smallholder farmers who produce the majority of food in developing countries. These farmers often have limited access to modern technology, financial credit, or government support.\n\nInternational organisations and local governments are implementing various strategies to address this crisis, including investment in drought-resistant crops, improved irrigation systems, and rural education programmes. Experts emphasise that sustainable food security ultimately requires empowering local communities with the knowledge and resources to produce food independently, rather than relying on external aid indefinitely.	لا يزال الأمن الغذائي تحديًا عالميًا مُلحًّا، ولا سيما في الدول النامية في أفريقيا جنوب الصحراء الكبرى وجنوب آسيا وأجزاء من أمريكا اللاتينية. ويفتقر الملايين في هذه المناطق إلى إمكانية الوصول المنتظم إلى غذاء كافٍ ومغذٍّ، مما يجعلهم عرضة لسوء التغذية وما يترتب عليه من مضاعفات صحية. وتُعدّ الفقر والاضطراب السياسي وتردّي البنية التحتية من أبرز العوامل التي تُديم انعدام الأمن الغذائي عبر الأجيال.\n\nوبات تغير المناخ يُعطّل الإنتاج الزراعي بشكل متصاعد في المناطق التي تعاني أصلًا من صعوبة في إطعام سكانها. إذ تُدمّر أنماط الأمطار غير المتوقعة والجفاف المطوّل والظواهر الجوية المتطرفة المحاصيلَ، وتهدد سُبُل عيش صغار المزارعين الذين ينتجون الجزء الأكبر من الغذاء في الدول النامية. وغالبًا ما يفتقر هؤلاء المزارعون إلى إمكانية الوصول إلى التكنولوجيا الحديثة أو الائتمان المالي أو الدعم الحكومي.\n\nتعمل المنظمات الدولية والحكومات المحلية على تنفيذ استراتيجيات متنوعة لمعالجة هذه الأزمة، تشمل الاستثمار في محاصيل مقاومة للجفاف وأنظمة ري محسّنة وبرامج تعليمية ريفية. ويُشدّد الخبراء على أن تحقيق الأمن الغذائي المستدام يستلزم في نهاية المطاف تمكين المجتمعات المحلية بالمعرفة والموارد اللازمة لإنتاج غذائها باستقلالية، عوضًا عن الاعتماد على المساعدات الخارجية إلى أجل غير مسمى.	B2	49	2026-04-09 21:34:03.556431+00
155	Women and Men on Our Screens	المرأة والرجل على شاشاتنا	Gender representation in media has long been a subject of debate among researchers, activists, and the general public. Studies consistently show that women remain underrepresented in leading roles in film and television, and when they do appear, they are frequently portrayed through limiting stereotypes. Female characters are disproportionately defined by their relationships with male characters rather than by their own professional achievements or personal ambitions.\n\nThe situation extends beyond fictional content. News broadcasting, sports commentary, and documentary filmmaking also reflect significant gender imbalances. Research indicates that male voices dominate political coverage, economic analysis, and expert commentary across most mainstream media outlets. This pattern shapes public perception of which voices are considered authoritative and worthy of being heard.\n\nEncouragingly, recent years have witnessed genuine progress in some areas of the entertainment industry. Several critically acclaimed films and television series have featured complex, multidimensional female protagonists. Diverse storytelling is increasingly being recognised as both a social responsibility and a commercial opportunity, suggesting that meaningful change, while slow, is genuinely underway.	طالما كان تمثيل المرأة في وسائل الإعلام موضع جدل بين الباحثين والناشطين وعامة الجمهور. وتُشير الدراسات باستمرار إلى أن المرأة لا تزال ممثَّلة تمثيلًا ناقصًا في الأدوار القيادية في السينما والتلفزيون، وحين تظهر فإنها كثيرًا ما تُصوَّر من خلال نمطيات مُقيِّدة. وكثيرًا ما تُعرَّف الشخصيات النسائية بعلاقاتها بالشخصيات الذكورية بدلًا من إنجازاتها المهنية أو طموحاتها الشخصية.\n\nويمتد هذا الواقع إلى ما هو أبعد من المحتوى التخيلي. إذ يعكس البث الإخباري والتعليق الرياضي وصناعة الأفلام الوثائقية أيضًا اختلالات جنسانية واضحة. وتُشير الأبحاث إلى أن الأصوات الذكورية تهيمن على التغطية السياسية والتحليل الاقتصادي والتعليق المتخصص في معظم وسائل الإعلام السائدة. ويُشكّل هذا النمط تصوّر الجمهور حول الأصوات التي يُعتدّ بها وتستحق الاستماع إليها.\n\nومن الجانب المُشجّع، شهدت السنوات الأخيرة تقدمًا حقيقيًا في بعض جوانب صناعة الترفيه. إذ قدّمت عدة أفلام ومسلسلات تلفزيونية حظيت بإشادة نقدية واسعة شخصيات نسائية رئيسية معقدة ومتعددة الأبعاد. كما يُعترف بصورة متزايدة بأن تنوع السرد القصصي يمثّل في آنٍ واحد مسؤولية اجتماعية وفرصة تجارية، مما يُشير إلى أن التغيير الجوهري، وإن كان بطيئًا، يسير فعلًا في الاتجاه الصحيح.	B2	50	2026-04-09 21:34:03.559948+00
156	When Knowledge Becomes a Privilege	حين يصبح المعرفة امتيازاً	Epistemic injustice occurs when individuals are wrongfully excluded from the production or transmission of knowledge, often due to their social identity. The philosopher Miranda Fricker identified two key forms: testimonial injustice, where a speaker receives less credibility than they deserve, and hermeneutical injustice, where gaps in collective understanding harm those whose experiences lack adequate interpretation.\n\nIn academic settings, these dynamics manifest in subtle yet damaging ways. Researchers from marginalized communities frequently find their methodologies questioned more aggressively than those of their peers, their theoretical frameworks dismissed as insufficiently rigorous, and their contributions overlooked in citation practices. This systemic undervaluation not only harms individual scholars but impoverishes the entire intellectual enterprise by silencing diverse perspectives.\n\nAddressing epistemic injustice requires institutional commitment beyond symbolic gestures. Universities must critically examine hiring practices, peer review processes, and curriculum design to ensure that knowledge production remains genuinely inclusive. Recognizing that who speaks, who is believed, and whose frameworks dominate academic discourse are profoundly political questions is the essential first step toward creating truly equitable intellectual communities.	يحدث الظلم المعرفي حين يُستبعد الأفراد بصورة غير مشروعة من إنتاج المعرفة أو نقلها، وغالباً ما يكون ذلك بسبب هويتهم الاجتماعية. حددت الفيلسوفة ميراندا فريكر شكلين رئيسيين لهذا الظلم: الظلم الشهادي، حيث يُمنح المتحدث مصداقية أقل مما يستحق، والظلم التأويلي، حيث تضر الفجوات في الفهم الجماعي بمن تفتقر تجاربهم إلى تفسير ملائم.\n\nفي البيئات الأكاديمية، تتجلى هذه الديناميكيات بطرق دقيقة لكنها مؤذية. كثيراً ما يجد الباحثون من المجتمعات المهمشة أن مناهجهم تُساءل بعدوانية أكبر مقارنةً بأقرانهم، وأن أطرهم النظرية تُرفض باعتبارها غير صارمة بما يكفي، وأن مساهماتهم تُغفل في ممارسات الاستشهاد العلمي. هذا التقليل الممنهج من القيمة لا يضر الباحثين الأفراد فحسب، بل يُفقر المشروع الفكري برمته بإسكات وجهات النظر المتنوعة.\n\nيتطلب معالجة الظلم المعرفي التزاماً مؤسسياً يتجاوز الإيماءات الرمزية. يجب على الجامعات أن تدرس بعين ناقدة ممارسات التوظيف وعمليات التحكيم العلمي وتصميم المناهج، لضمان أن إنتاج المعرفة يبقى شاملاً حقاً. إن إدراك أن السؤال عمّن يتكلم ومن يُصدَّق وأي الأطر تهيمن على الخطاب الأكاديمي هو سؤال سياسي بامتياز، يمثل الخطوة الأولى نحو بناء مجتمعات فكرية عادلة فعلاً.	C1	6	2026-04-09 21:35:54.637271+00
157	Are We Truly Free to Choose?	هل نحن أحرار في الاختيار حقاً؟	The debate between free will and determinism ranks among philosophy's most enduring controversies. Determinists argue that every event, including every human decision, is the inevitable consequence of prior causes governed by natural laws. If the universe operates like a vast mechanism, then our sense of choosing freely may be nothing more than a compelling illusion generated by neurological processes we neither control nor fully understand.\n\nCompatibilists attempt to reconcile these seemingly opposing positions by redefining freedom. Rather than requiring the absence of causation, they argue that freedom simply means acting in accordance with one's own desires and reasoning, free from external compulsion. On this view, a person who deliberates carefully and acts on their reflective judgment is genuinely free, even if their deliberation was itself causally determined.\n\nThe practical stakes of this debate extend far beyond philosophical seminars. Legal systems, moral frameworks, and social policies all presuppose some meaningful notion of personal responsibility. If determinism is correct, how we assign praise, blame, and punishment must fundamentally change. The question of free will is ultimately inseparable from the question of what kind of society we wish to construct.	يُعدّ الجدل بين الإرادة الحرة والحتمية من أكثر الخلافات رسوخاً في تاريخ الفلسفة. يرى الحتميون أن كل حدث، بما في ذلك كل قرار بشري، هو النتيجة الحتمية لأسباب سابقة تحكمها قوانين الطبيعة. فإذا كان الكون يعمل كآلة ضخمة، فقد يكون إحساسنا بحرية الاختيار مجرد وهم مقنع تولّده عمليات عصبية لا نسيطر عليها ولا نفهمها تماماً.\n\nيسعى التوافقيون إلى التوفيق بين هذين الموقفين المتعارضين ظاهرياً عبر إعادة تعريف الحرية. فبدلاً من اشتراط غياب السببية، يرون أن الحرية تعني ببساطة التصرف وفق رغبات المرء وتفكيره، بعيداً عن الإكراه الخارجي. ووفق هذا الرأي، فإن الشخص الذي يتداول أمره بعناية ويتصرف بناءً على حكمه التأملي يكون حراً فعلاً، حتى لو كانت عملية التداول ذاتها محكومة سببياً.\n\nتمتد التبعات العملية لهذا الجدل إلى ما هو أبعد من قاعات الفلسفة. فالأنظمة القانونية والأطر الأخلاقية والسياسات الاجتماعية تفترض جميعها مفهوماً ذا معنى للمسؤولية الشخصية. إذا كانت الحتمية صحيحة، فلا بد من إعادة النظر جذرياً في طريقة إسناد المديح واللوم والعقوبة. وفي نهاية المطاف، لا يمكن فصل سؤال الإرادة الحرة عن سؤال نوع المجتمع الذي نرغب في بنائه.	C1	7	2026-04-09 21:35:54.671861+00
158	Racism Embedded in Institutional Structures	العنصرية المتجذرة في البنى المؤسسية	Structural racism differs fundamentally from individual prejudice. While overt discrimination involves conscious hostility toward members of a racial group, structural racism refers to the cumulative ways in which historical policies, institutional practices, and cultural norms disadvantage certain groups even in the absence of deliberate discriminatory intent. The outcomes are unequal regardless of whether any individual actor harbors racist attitudes.\n\nConsider housing policy in the mid-twentieth century United States, where federally sanctioned redlining systematically denied Black families access to mortgages in desirable neighbourhoods. The wealth gap created by these exclusions persists across generations, shaping educational opportunities, health outcomes, and political representation in ways that continue to compound. Poverty inherited from discriminatory policy is structurally produced, not individually chosen.\n\nAddressing structural racism demands more than sensitivity training or anti-discrimination legislation targeting explicit bias. It requires auditing institutional outcomes, redistributing resources toward historically marginalized communities, and acknowledging that neutrality in an unequal system perpetuates inequality. Reform without structural analysis risks treating symptoms while leaving the underlying architecture of disadvantage entirely intact.	تختلف العنصرية البنيوية اختلافاً جوهرياً عن التحيز الفردي. فبينما ينطوي التمييز الصريح على عدائية واعية تجاه أفراد مجموعة عرقية، تشير العنصرية البنيوية إلى الأساليب التراكمية التي تضر بها السياسات التاريخية والممارسات المؤسسية والأعراف الثقافية بمجموعات بعينها، حتى في غياب نية تمييزية متعمدة. وتبقى النتائج متفاوتة بصرف النظر عما إذا كان أي فرد يحمل مواقف عنصرية.\n\nخذ مثلاً سياسة الإسكان في منتصف القرن العشرين في الولايات المتحدة، حين حرمت ممارسة "الخطوط الحمراء" المعتمدة فيدرالياً الأسر السوداء بصورة ممنهجة من الحصول على قروض عقارية في الأحياء المرغوبة. ولا يزال الفجوة في الثروة التي أفرزها هذا الإقصاء تتوارثها الأجيال، مما يؤثر في الفرص التعليمية والنتائج الصحية والتمثيل السياسي بأساليب تتفاقم باستمرار. فالفقر الموروث من سياسة تمييزية هو نتاج بنيوي لا اختيار فردي.\n\nتستلزم معالجة العنصرية البنيوية ما هو أكثر من تدريب على الحساسية أو تشريعات مناهضة للتمييز تستهدف التحيز الصريح. فهي تتطلب مراجعة النتائج المؤسسية وإعادة توزيع الموارد نحو المجتمعات المهمشة تاريخياً، والإقرار بأن الحياد في نظام غير متكافئ يكرّس اللامساواة. والإصلاح الخالي من التحليل البنيوي يخاطر بمعالجة الأعراض بينما يبقي الهندسة الأساسية للحرمان سليمة تماماً.	C1	8	2026-04-09 21:35:54.683728+00
159	Education Transformed Into a Marketable Commodity	التعليم يتحول إلى سلعة قابلة للتسويق	The commodification of education refers to the progressive transformation of learning from a public good into a market transaction. Under this paradigm, universities increasingly operate as commercial enterprises, students are repositioned as consumers, and knowledge is valued primarily for its economic utility rather than its capacity to foster critical citizenship or personal enrichment. Tuition fees, profit-driven research priorities, and corporate partnerships exemplify this shift.\n\nThe consequences extend beyond institutional culture. When education is framed as a private investment, access becomes contingent on financial capacity, deepening existing inequalities. Students accumulate substantial debt pursuing qualifications whose market value fluctuates unpredictably, while disciplines perceived as commercially unproductive — humanities, pure sciences, arts — face systematic underfunding and marginalisation within university structures.\n\nCritics argue that this transformation fundamentally betrays education's democratic purpose. A society of genuinely informed, analytically capable citizens cannot be manufactured by institutions optimised for revenue generation. Reclaiming education as a common good demands policy commitments to public funding, institutional autonomy from market pressures, and a renewed philosophical commitment to learning as intrinsically valuable, independent of its immediate economic returns.	تشير سلعنة التعليم إلى التحول التدريجي للتعلم من خير عام إلى معاملة سوقية. في ظل هذا النموذج، باتت الجامعات تعمل بصورة متزايدة كمؤسسات تجارية، ويُعاد تصوير الطلاب بوصفهم مستهلكين، وتُقدَّر المعرفة في المقام الأول بنفعها الاقتصادي لا بقدرتها على تنمية المواطنة النقدية أو الإثراء الشخصي. وتُجسّد الرسوم الدراسية وأولويات البحث الموجهة بالربح والشراكات مع الشركات هذا التحول.\n\nتمتد التبعات إلى ما هو أبعد من الثقافة المؤسسية. حين يُصاغ التعليم بوصفه استثماراً خاصاً، يصبح الوصول إليه مشروطاً بالقدرة المالية، مما يعمّق التفاوتات القائمة. يراكم الطلاب ديوناً ضخمة في سعيهم للحصول على مؤهلات تتذبذب قيمتها السوقية بصورة لا يمكن التنبؤ بها، في حين تواجه التخصصات التي تُعدّ غير منتجة تجارياً — كالإنسانيات والعلوم الأساسية والفنون — نقصاً ممنهجاً في التمويل وتهميشاً داخل البنى الجامعية.\n\nيرى المنتقدون أن هذا التحول يخون بشكل جوهري الغرض الديمقراطي للتعليم. لا يمكن إنتاج مجتمع من المواطنين المطّلعين والقادرين على التحليل الحقيقي عبر مؤسسات مُحسَّنة لتوليد الإيرادات. واسترداد التعليم باعتباره خيراً مشتركاً يستلزم التزامات سياساتية بالتمويل العام والاستقلالية المؤسسية عن ضغوط السوق، والتزاماً فلسفياً متجدداً بالتعلم بوصفه ذا قيمة جوهرية مستقلة عن عوائده الاقتصادية الآنية.	C1	9	2026-04-09 21:35:54.688102+00
160	Truth in Crisis, Democracy Under Threat	الحقيقة في أزمة والديمقراطية في خطر	Post-truth politics describes a political environment in which emotional appeals and partisan narratives consistently override factual evidence in shaping public opinion. The term gained prominence following the Brexit referendum and the 2016 US presidential election, where demonstrably false claims circulated widely without significant electoral consequence. When established facts become merely one competing perspective among many, the epistemic foundations of democratic deliberation begin to erode.\n\nDigital media ecosystems accelerate this erosion by creating algorithmically curated information bubbles that reinforce existing beliefs rather than challenging them. Disinformation spreads faster than corrections, and media literacy remains unevenly distributed across populations. Sophisticated actors exploit these vulnerabilities deliberately, manufacturing uncertainty around settled scientific consensus on issues from climate change to vaccine safety.\n\nThe implications for democratic governance are profound. Democracy presupposes citizens capable of evaluating competing claims and holding governments accountable through informed participation. When shared epistemic standards collapse, authoritarian figures can dismiss inconvenient evidence as fabrication, normalize contradictions, and exploit confusion strategically. Defending democracy in the post-truth era requires investing in public education, independent journalism, and institutional transparency as urgent political priorities.	تصف سياسة ما بعد الحقيقة بيئة سياسية تتغلب فيها النداءات العاطفية والروايات الحزبية باستمرار على الأدلة الواقعية في تشكيل الرأي العام. اكتسب هذا المصطلح شهرته في أعقاب استفتاء خروج بريطانيا من الاتحاد الأوروبي وانتخابات الرئاسة الأمريكية عام 2016، حين تداولت ادعاءات كاذبة بشكل موثّق على نطاق واسع دون أن تترتب عليها تبعات انتخابية تُذكر. وحين تصبح الحقائق الثابتة مجرد وجهة نظر منافِسة من بين كثيرات، تبدأ الأسس المعرفية للتداول الديمقراطي في الانهيار.\n\nتُسرّع النظم الإعلامية الرقمية هذا الانهيار بإنشاء فقاعات معلوماتية منتقاة خوارزمياً تعزز المعتقدات القائمة بدلاً من تحديها. تنتشر المعلومات المضللة أسرع من التصحيحات، وتبقى محو الأمية الإعلامية موزعة بصورة غير متكافئة بين الفئات السكانية. ويستغل الفاعلون المتمرسون هذه الثغرات عن سابق قصد، صانعين حالة من الشك حول الإجماع العلمي الراسخ في مسائل تمتد من تغير المناخ إلى سلامة اللقاحات.\n\nتبدو التبعات على الحوكمة الديمقراطية عميقة الأثر. فالديمقراطية تفترض مواطنين قادرين على تقييم الادعاءات المتنافسة ومحاسبة الحكومات عبر مشاركة مستنيرة. وحين تنهار المعايير المعرفية المشتركة، يستطيع الشخصيات الاستبدادية رفض الأدلة المزعجة بوصفها اختلاقاً وتطبيع التناقضات واستغلال الارتباك استراتيجياً. إن الدفاع عن الديمقراطية في عصر ما بعد الحقيقة يستلزم الاستثمار في التعليم العام والصحافة المستقلة والشفافية المؤسسية بوصفها أولويات سياسية مستعجلة.	C1	10	2026-04-09 21:35:54.692448+00
161	The Hidden Cost of Free Services	التكلفة الخفية للخدمات المجانية	Every time a user clicks, scrolls, or pauses on a piece of content online, that behaviour is recorded, analysed, and sold. This practice, known as surveillance capitalism, has become the dominant business model of the digital age. Companies harvest vast quantities of behavioural data to predict and influence consumer decisions, generating enormous profits while users remain largely unaware of the transaction taking place.\n\nProponents argue that targeted advertising simply makes commerce more efficient and that users willingly exchange their data for convenient, free services. However, critics contend that genuine informed consent is virtually impossible when privacy policies span dozens of pages of impenetrable legal language. The asymmetry of knowledge between corporations and individuals is staggering.\n\nPhilosophers and regulators are increasingly questioning whether this model is ethically defensible. When private behaviour becomes a commodity, fundamental questions arise about autonomy, dignity, and democratic governance. Legislation such as the European Union's General Data Protection Regulation represents an attempt to restore balance, yet enforcement remains inconsistent and corporations continue to innovate faster than lawmakers can respond. The debate is far from resolved.	في كل مرة ينقر فيها مستخدم على محتوى ما أو يتصفحه أو يتوقف عنده على الإنترنت، يُسجَّل هذا السلوك ويُحلَّل ويُباع. هذه الممارسة، المعروفة برأسمالية المراقبة، باتت النموذج التجاري السائد في العصر الرقمي. تجمع الشركات كميات هائلة من البيانات السلوكية للتنبؤ بقرارات المستهلكين والتأثير فيها، محققةً أرباحاً طائلة بينما يظل المستخدمون في الغالب غير مدركين للصفقة الجارية.\n\nيرى المؤيدون أن الإعلانات المستهدفة تجعل التجارة أكثر كفاءة، وأن المستخدمين يتبادلون بياناتهم طوعاً مقابل خدمات مجانية ومريحة. غير أن المنتقدين يؤكدون أن الموافقة المستنيرة الحقيقية تكاد تكون مستحيلة حين تمتد سياسات الخصوصية عبر عشرات الصفحات من اللغة القانونية المعقدة. والتفاوت في المعرفة بين الشركات والأفراد تفاوتٌ مذهل.\n\nيتساءل الفلاسفة والمشرعون بشكل متزايد عما إذا كان هذا النموذج مقبولاً أخلاقياً. حين يتحول السلوك الخاص إلى سلعة، تبرز تساؤلات جوهرية حول الاستقلالية والكرامة والحوكمة الديمقراطية. تمثل تشريعات مثل اللائحة الأوروبية العامة لحماية البيانات محاولةً لاستعادة التوازن، غير أن التطبيق يبقى متفاوتاً والشركات تواصل الابتكار بوتيرة أسرع مما يستطيع المشرعون مواكبته.	C1	11	2026-04-09 21:37:34.680747+00
163	Too Many Choices, Too Little Satisfaction	خيارات كثيرة جداً ورضا قليل جداً	Modern supermarkets routinely stock tens of thousands of distinct products. Streaming platforms offer libraries of millions of titles. Dating applications present users with a theoretically limitless pool of potential partners. Contemporary consumer society has elevated choice to the status of an unquestioned virtue, operating on the assumption that more options invariably lead to greater freedom and wellbeing.\n\nPsychologist Barry Schwartz famously challenged this assumption with his concept of the paradox of choice. His research demonstrated that an abundance of options frequently produces anxiety, decision paralysis, and post-decision regret rather than satisfaction. When consumers eventually make a selection, the awareness of numerous rejected alternatives fuels a persistent sense that a better choice might have been made, eroding contentment even when the chosen product is objectively adequate.\n\nThe implications extend beyond individual wellbeing. A society fixated on maximising personal choice may inadvertently undermine the collective compromises that sustain community and civic life. Furthermore, the illusion of meaningful choice can obscure structural inequalities, suggesting that life outcomes are purely the result of individual decisions rather than systemic constraints. Rethinking our relationship with choice may therefore be both a personal and political necessity.	تعرض محلات السوبرماركت الحديثة بانتظام عشرات الآلاف من المنتجات المختلفة. وتتيح منصات البث مكتبات تضم ملايين العناوين. وتقدم تطبيقات المواعدة للمستخدمين مجموعة لا حدود لها نظرياً من الشركاء المحتملين. رفع مجتمع المستهلكين المعاصر الاختيار إلى مرتبة الفضيلة المسلّم بها، انطلاقاً من افتراض أن المزيد من الخيارات يفضي دائماً إلى قدر أكبر من الحرية والرفاهية.\n\nتحدى عالم النفس باري شوارتز هذا الافتراض بشكل شهير من خلال مفهومه عن مفارقة الاختيار. أثبتت أبحاثه أن وفرة الخيارات كثيراً ما تُفرز القلق وشلل القرار والندم على القرار المتخذ، بدلاً من الرضا. وحين يختار المستهلكون في نهاية المطاف، يُغذّي الوعيُ بالبدائل العديدة المرفوضة إحساساً دائماً بأن ثمة خياراً أفضل كان يمكن اتخاذه، مما يقوّض القناعة حتى حين يكون المنتج المختار ملائماً بموضوعية.\n\nتمتد التداعيات إلى ما هو أبعد من الرفاهية الفردية. فالمجتمع المنهمك في تعظيم الاختيار الشخصي قد يُقوّض دون قصد التسويات الجماعية التي تُقيم الحياة المجتمعية والمدنية. علاوة على ذلك، يمكن أن يُخفي وهم الاختيار الحقيقي التفاوتات البنيوية، مُوحياً بأن نتائج الحياة هي محصلة قرارات فردية خالصة لا قيود منهجية. قد يكون إعادة التفكير في علاقتنا بالاختيار ضرورة شخصية وسياسية في آنٍ واحد.	C1	13	2026-04-09 21:37:34.718687+00
164	Citizens of the World or the Nation?	مواطنو العالم أم الوطن؟	The tension between cosmopolitanism and nationalism has intensified dramatically in recent decades. Cosmopolitanism holds that all human beings share a fundamental moral status that transcends national borders, and that our obligations to distant strangers are comparable in principle to those we hold towards compatriots. This vision underpins international human rights frameworks, global climate agreements, and the free movement of people across frontiers.\n\nNationalism, by contrast, insists that particular attachments to specific communities are not merely sentimental but morally significant. Theorists such as David Miller argue that nations constitute genuine communities of solidarity, and that preferring the welfare of one's fellow citizens is no more philosophically problematic than prioritising one's family. From this perspective, cosmopolitanism risks dismantling the thick bonds of trust and reciprocity that make redistributive welfare states possible.\n\nThe debate has become acutely practical in an era of mass migration, global pandemics, and transnational environmental crises. Neither pole offers a fully satisfactory answer. Pure nationalism struggles to address problems that inherently cross borders, while untempered cosmopolitanism may underestimate the enduring importance of place, culture, and communal identity in sustaining meaningful human lives.	تصاعد التوتر بين العالمية والقومية بشكل ملحوظ في العقود الأخيرة. ترى العالمية أن جميع البشر يتشاركون مكانةً أخلاقية جوهرية تتجاوز الحدود الوطنية، وأن التزاماتنا تجاه الغرباء البعيدين مماثلة من حيث المبدأ لتلك التي نحملها تجاه أبناء وطننا. هذه الرؤية تُشكّل الأطر الدولية لحقوق الإنسان، واتفاقيات المناخ العالمية، وحرية تنقل الناس عبر الحدود.\n\nفي المقابل، تؤكد القومية أن الارتباطات الخاصة بمجتمعات بعينها ليست مجرد مشاعر وجدانية بل لها أهمية أخلاقية. يرى مفكرون كديفيد ميلر أن الأمم تُشكّل مجتمعات حقيقية من التضامن، وأن تفضيل رفاهية المواطنين لا يُشكّل إشكالاً فلسفياً أكثر من تقديم مصلحة الأسرة. من هذا المنظور، تُخاطر العالمية بتفكيك روابط الثقة والمعاملة بالمثل التي تجعل دول الرعاية الاجتماعية التوزيعية ممكنة.\n\nبات النقاش عملياً بشكل حاد في عصر الهجرة الجماعية والأوبئة العالمية والأزمات البيئية العابرة للحدود. لا يقدم أيٌّ من الطرفين إجابة مُرضية تماماً. تعجز القومية المحضة عن معالجة المشكلات التي تتخطى الحدود بطبيعتها، فيما قد تُقلّل العالمية غير المُعتدلة من الأهمية الدائمة للمكان والثقافة والهوية الجماعية في صون حياة إنسانية ذات معنى.	C1	14	2026-04-09 21:37:34.733248+00
165	The Greatest Good and Its Limits	الخير الأعظم وحدوده	Utilitarianism, the ethical theory associated with Jeremy Bentham and John Stuart Mill, holds that the morally correct action is whichever produces the greatest happiness for the greatest number of people. Its appeal is intuitive and democratic: every person's suffering counts equally, and decisions should be evaluated by their measurable consequences rather than abstract rules or divine commands.\n\nYet the theory generates deeply troubling conclusions when applied rigorously. Classical thought experiments reveal that utilitarian logic could justify torturing an innocent person if doing so would prevent greater collective suffering, or harvesting the organs of a healthy individual to save multiple patients. Most people's moral intuitions recoil from such conclusions, suggesting that utilitarianism may capture something important about ethics without capturing everything.\n\nContemporary philosophers have proposed refinements, including rule utilitarianism, which evaluates social rules rather than individual acts, and preference utilitarianism, which incorporates subjective desires rather than objective measures of happiness. Nevertheless, critics argue that no version adequately accounts for the separateness of persons, individual rights, or the intrinsic value of justice. Utilitarianism remains indispensable as a tool of moral reasoning while remaining insufficient as a complete ethical framework.	تُقرّر النفعية، النظرية الأخلاقية المرتبطة بجيريمي بنثام وجون ستيوارت ميل، أن الفعل الأخلاقي الصحيح هو ذاك الذي يُنتج أكبر قدر من السعادة لأكبر عدد من الناس. تتمتع هذه النظرية بجاذبية بديهية وديمقراطية: معاناة كل شخص تُحتسب بالتساوي، ويجب تقييم القرارات بعواقبها القابلة للقياس لا بالقواعد المجردة أو الأوامر الإلهية.\n\nغير أن النظرية تُفضي إلى استنتاجات مقلقة للغاية حين تُطبَّق بصرامة. تكشف تجارب الفكر الكلاسيكية أن المنطق النفعي قد يُبرر تعذيب شخص بريء إذا كان ذلك سيمنع معاناة جماعية أكبر، أو استئصال أعضاء فرد سليم لإنقاذ مرضى متعددين. يرتد الحدس الأخلاقي لدى معظم الناس من مثل هذه الاستنتاجات، مما يوحي بأن النفعية قد تُمسك بشيء مهم في الأخلاق دون أن تُمسك بكل شيء.\n\nاقترح الفلاسفة المعاصرون صياغات أكثر دقة، منها النفعية القاعدية التي تُقيّم القواعد الاجتماعية لا الأفعال الفردية، والنفعية التفضيلية التي تأخذ بالرغبات الذاتية بدلاً من مقاييس السعادة الموضوعية. بيد أن المنتقدين يرون أن لا نسخة منها تُحاسب بشكل كافٍ على استقلالية الأشخاص أو الحقوق الفردية أو القيمة الذاتية للعدالة. تبقى النفعية أداةً لا غنى عنها في التفكير الأخلاقي مع قصورها عن بناء إطار أخلاقي متكامل.	C1	15	2026-04-09 21:37:34.736193+00
166	Machines, Power, and the Future of Work	الآلات والسلطة ومستقبل العمل	The rapid expansion of automation across manufacturing, logistics, and service industries has fundamentally altered the relationship between employers and workers. As intelligent machines replace routine tasks, corporations have gained considerable leverage over labour markets, frequently suppressing wages and undermining collective bargaining agreements that workers spent decades negotiating.\n\nLabour rights advocates argue that automation, without adequate regulatory oversight, functions as a mechanism of control rather than liberation. When a warehouse operative can be replaced overnight by a robotic system, their capacity to demand fair conditions diminishes dramatically. This power imbalance has prompted renewed calls for legislation mandating profit-sharing schemes and retraining programmes funded by the corporations that benefit most from technological adoption.\n\nSome economists, however, maintain that automation historically generates more employment than it eliminates, pointing to the industrial revolutions of previous centuries. Critics counter that the current technological transition is qualitatively different, operating at an unprecedented speed that leaves workers insufficient time to adapt. The debate ultimately centres on whether democratic societies will allow market forces alone to determine how the gains of automation are distributed.	أدى التوسع السريع للأتمتة في قطاعات التصنيع والخدمات اللوجستية وقطاعات الخدمات إلى تغيير جوهري في العلاقة بين أصحاب العمل والعمال. ومع حلول الآلات الذكية محل المهام الروتينية، اكتسبت الشركات نفوذاً واسعاً في أسواق العمل، مما أسهم في كبح الأجور وتقويض اتفاقيات المفاوضة الجماعية التي استغرق العمال عقوداً في انتزاعها.\n\nيرى المدافعون عن حقوق العمال أن الأتمتة، في غياب رقابة تنظيمية كافية، تعمل كآلية للسيطرة لا للتحرر. فحين يمكن الاستغناء عن عامل في مستودع بين عشية وضحاها واستبداله بنظام روبوتي، تتقلص قدرته على المطالبة بظروف عمل عادلة تقلصاً حاداً. وقد دفع هذا الاختلال في موازين القوى إلى تجدد المطالبات بتشريعات تُلزم بوضع برامج لتقاسم الأرباح وإعادة التدريب تموّلها الشركات المستفيدة من التحول التكنولوجي.\n\nغير أن بعض الاقتصاديين يرون أن الأتمتة تاريخياً تُولّد من فرص العمل أكثر مما تُلغي، مستشهدين بثورات صناعية سابقة. ويرد المنتقدون بأن التحول التكنولوجي الراهن مختلف نوعياً، إذ يسير بوتيرة غير مسبوقة لا تمنح العمال وقتاً كافياً للتكيف. ويتمحور الجدل في نهاية المطاف حول ما إذا كانت المجتمعات الديمقراطية ستسمح لقوى السوق وحدها بتحديد كيفية توزيع مكاسب الأتمتة.	C1	16	2026-04-09 21:39:26.548189+00
167	The State's Control Over Human Bodies	سيطرة الدولة على الأجساد البشرية	Biopolitics, a term developed by philosopher Michel Foucault, describes the way modern states exercise power not merely through law and punishment, but by regulating and managing the biological lives of their populations. Governments monitor birth rates, mandate vaccination programmes, classify mental illness, and define the boundaries of acceptable physical existence, all in the name of public health and national productivity.\n\nThis framework reveals how apparently neutral medical or scientific policies can serve deeply political functions. Quarantine measures, reproductive legislation, and immigration health screenings all involve the state making consequential decisions about whose bodies are considered normal, productive, or threatening. Marginalised communities have historically borne the greatest burden of such interventions, often experiencing surveillance and control disguised as care.\n\nThe COVID-19 pandemic brought biopolitical tensions into sharp relief. Governments around the world justified unprecedented restrictions on movement and assembly through the language of epidemiological necessity. While many citizens accepted these measures as legitimate public health responses, others perceived them as evidence of an expanding state apparatus willing to suspend civil liberties indefinitely. The pandemic demonstrated that managing biological risk and preserving individual freedom remain genuinely difficult to reconcile.	البيوسياسة مصطلح طوّره الفيلسوف ميشيل فوكو لوصف الطريقة التي تمارس بها الدول الحديثة سلطتها، ليس عبر القانون والعقوبة وحسب، بل من خلال تنظيم الحياة البيولوجية للسكان والإشراف عليها. تراقب الحكومات معدلات المواليد، وتفرض برامج التطعيم، وتُصنّف الأمراض النفسية، وترسم حدود الوجود الجسدي المقبول، كل ذلك باسم الصحة العامة والإنتاجية الوطنية.\n\nيكشف هذا الإطار كيف يمكن للسياسات الطبية أو العلمية التي تبدو محايدة أن تخدم وظائف سياسية عميقة. فإجراءات الحجر الصحي، والتشريعات المتعلقة بالإنجاب، والفحوصات الصحية عند الهجرة، كلها تنطوي على قرارات مصيرية تتخذها الدولة بشأن الأجساد التي تُعدّ طبيعية أو منتجة أو مهددة. وقد تحملت المجتمعات المهمشة تاريخياً العبء الأكبر من هذه التدخلات، إذ كثيراً ما تعرضت للمراقبة والسيطرة في قالب الرعاية والاهتمام.\n\nكشفت جائحة كوفيد-19 عن التوترات البيوسياسية بجلاء تام. فقد برّرت حكومات حول العالم قيوداً غير مسبوقة على التنقل والتجمع بلغة الضرورة الوبائية. وبينما تقبّل كثير من المواطنين هذه الإجراءات باعتبارها استجابات صحية مشروعة، رأى فيها آخرون دليلاً على توسع جهاز الدولة واستعداده لتعليق الحريات المدنية إلى أجل غير مسمى. وأثبتت الجائحة أن الموازنة بين إدارة المخاطر البيولوجية وصون الحرية الفردية تظل مسألة بالغة الصعوبة.	C1	17	2026-04-09 21:39:26.581256+00
168	Why Liberal Democracy Is Under Pressure	لماذا تتعرض الديمقراطية الليبرالية للضغط	Liberal democracy, once considered the inevitable endpoint of political development, is facing challenges of a severity unseen since the mid-twentieth century. Across Europe, the Americas, and Asia, populist movements have gained significant electoral traction by positioning themselves against what they describe as corrupt, self-serving elites who have failed ordinary citizens.\n\nScholars offer competing explanations for this erosion of confidence. Some emphasise economic grievances, noting that decades of globalisation generated prosperity for some while leaving manufacturing communities economically stranded. Others point to cultural anxieties triggered by rapid demographic change and the perceived erosion of traditional values. A third perspective highlights institutional failures: parliaments that feel performative, judiciaries perceived as politically compromised, and media environments that reward outrage over nuance.\n\nWhat makes the current crisis particularly complex is that the threats to democracy increasingly originate from within democratic systems themselves. Elected leaders in Hungary, Turkey, and elsewhere have used legitimate parliamentary majorities to dismantle judicial independence and curtail press freedom. Political scientists call this process democratic backsliding, and its gradual, incremental nature makes it exceptionally difficult to resist. Citizens often only recognise the damage once the institutional safeguards protecting their rights have already been significantly weakened.	باتت الديمقراطية الليبرالية، التي كانت تُعدّ يوماً ما المحطة الحتمية للتطور السياسي، تواجه تحديات لم تشهد لها مثيلاً منذ منتصف القرن العشرين. فعبر أوروبا والأمريكتين وآسيا، حققت الحركات الشعبوية مكاسب انتخابية ملموسة بتصويرها نفسها في مواجهة نخب فاسدة وانتهازية أخفقت في خدمة المواطنين العاديين.\n\nيقدم الباحثون تفسيرات متنافسة لهذا التآكل في الثقة. يُركّز بعضهم على المظالم الاقتصادية، مشيرين إلى أن عقوداً من العولمة أثمرت رخاءً لفئات بعينها بينما أوقعت مجتمعات صناعية في وهدة اقتصادية. ويلفت آخرون الانتباه إلى قلق ثقافي أثاره التغير الديموغرافي السريع والشعور بتآكل القيم التقليدية. أما المنظور الثالث فيُبرز إخفاقات مؤسسية: برلمانات تبدو شكلية، وقضاء يُنظر إليه على أنه محاصَص سياسياً، وبيئات إعلامية تكافئ الاستثارة على حساب الرصانة.\n\nما يجعل الأزمة الراهنة بالغة التعقيد هو أن التهديدات للديمقراطية باتت تنبع بصورة متزايدة من داخل الأنظمة الديمقراطية ذاتها. فقد وظّف زعماء منتخبون في المجر وتركيا وغيرهما أغلبياتهم البرلمانية المشروعة لتفكيك استقلالية القضاء وتقليص حرية الصحافة. يُسمي علماء السياسة هذه العملية التراجع الديمقراطي، وطابعها التدريجي التراكمي يجعل مقاومتها أمراً عسيراً للغاية. وكثيراً ما يدرك المواطنون حجم الضرر فقط بعد أن تكون الضمانات المؤسسية الحامية لحقوقهم قد تعرضت لإضعاف بالغ.	C1	18	2026-04-09 21:39:26.584973+00
169	Who Decides What Art Is Worth?	من يقرر قيمة الفن؟	Aesthetics, the philosophical study of beauty and artistic value, raises a question that has preoccupied thinkers for centuries: is cultural value objective, residing in the work itself, or is it constructed through social processes that inevitably reflect existing hierarchies of power and taste?\n\nThe institutional art world — comprising galleries, auction houses, academic critics, and prize committees — plays a decisive role in determining which works are celebrated and which are ignored. A painting by an unknown artist stored in a warehouse is, in commercial terms, worthless. The same canvas, once authenticated, exhibited in a prestigious institution, and reviewed in influential publications, may sell for millions. This suggests that aesthetic value is not discovered but manufactured through networks of cultural authority.\n\nThis insight carries significant implications. If value is socially constructed, then the dominance of certain aesthetic traditions — Western European painting, the literary novel, classical orchestral music — reflects not universal standards of excellence but the historical power of specific cultures to impose their preferences as universal. Contemporary debates about representation in arts funding, museum acquisitions, and literary prize shortlists are therefore not peripheral concerns but fundamental challenges to how societies decide whose creativity deserves recognition and resources.	تطرح الجماليات، وهي الدراسة الفلسفية للجمال والقيمة الفنية، سؤالاً شغل المفكرين لقرون: هل القيمة الثقافية موضوعية تكمن في العمل الفني ذاته، أم أنها مُصنَّعة عبر عمليات اجتماعية تعكس حتماً تسلسلات هرمية قائمة من السلطة والذوق؟\n\nيضطلع عالم الفن المؤسسي — الذي يضم الغاليريهات ودور المزادات والنقاد الأكاديميين ولجان الجوائز — بدور حاسم في تحديد الأعمال التي تُحتفى بها وتلك التي تُهمَّش. فلوحة رسمها فنان مجهول مخزونة في مستودع لا قيمة تجارية لها. غير أن الإطار ذاته، متى حُقِّق أصله وعُرض في مؤسسة مرموقة وتناولته بالنقد منشورات مؤثرة، قد يُباع بملايين الدولارات. يوحي ذلك بأن القيمة الجمالية لا تُكتشف بل تُصنَّع عبر شبكات السلطة الثقافية.\n\nلهذه الرؤية دلالات بالغة الأهمية. فإن كانت القيمة مُشكَّلة اجتماعياً، فإن هيمنة تقاليد جمالية بعينها — الرسم الأوروبي الغربي، والرواية الأدبية، والموسيقى الأوركسترالية الكلاسيكية — لا تعكس معايير كونية للتميز، بل تعكس القدرة التاريخية لثقافات محددة على فرض تفضيلاتها بوصفها معايير عالمية. ولذلك فإن النقاشات المعاصرة حول التمثيل في تمويل الفنون ومقتنيات المتاحف والقوائم القصيرة لجوائز الأدب ليست شواغل هامشية، بل تحديات جوهرية لكيفية قرار المجتمعات بشأن الإبداع الجدير بالاعتراف والموارد.	C1	19	2026-04-09 21:39:26.588441+00
170	Rethinking What Students Learn and Why	إعادة التفكير فيما يتعلمه الطلاب ولماذا	The movement to decolonise the curriculum has gained considerable momentum in universities and secondary schools across the English-speaking world. Its central argument is straightforward: the content of formal education overwhelmingly reflects the perspectives, histories, and intellectual traditions of former colonial powers, while systematically marginalising the knowledge produced by colonised peoples.\n\nProponents point to philosophy syllabuses that begin with ancient Greece and leap to European Enlightenment thinkers, history courses that treat colonial expansion as a story of progress, and literature modules dominated by canonical British and American authors. They argue that this selective framing shapes how students understand authority, civilisation, and intellectual legitimacy in ways that disadvantage students from non-Western backgrounds and impoverish the learning of everyone.\n\nCritics of decolonisation efforts contend that the movement risks imposing contemporary political frameworks onto the past and potentially sacrificing academic standards in pursuit of representation. Advocates respond that what critics defend as neutral academic standards already embeds particular cultural assumptions that were never subjected to scrutiny. The debate is not simply about which books appear on reading lists, but about what counts as knowledge, whose experiences are considered universal, and how education either reinforces or challenges inherited inequalities.	اكتسبت حركة إزالة الاستعمار من المناهج زخماً ملحوظاً في الجامعات والمدارس الثانوية في العالم الناطق بالإنجليزية. وحجتها الجوهرية واضحة: يعكس محتوى التعليم الرسمي في معظمه وجهات نظر القوى الاستعمارية السابقة وتاريخها وتقاليدها الفكرية، بينما يُهمّش بصورة ممنهجة المعارف التي أنتجتها الشعوب المستعمَرة.\n\nيُشير المؤيدون إلى مناهج الفلسفة التي تبدأ باليونان القديمة لتقفز إلى مفكري عصر التنوير الأوروبي، ومقررات التاريخ التي تصوّر التوسع الاستعماري باعتباره مسيرة تقدم، ووحدات الأدب التي يهيمن عليها الكتّاب البريطانيون والأمريكيون الكلاسيكيون. ويؤكدون أن هذا الإطار الانتقائي يُشكّل فهم الطلاب للسلطة والحضارة والشرعية الفكرية بأساليب تُضرّ بالطلاب من خلفيات غير غربية وتُفقر تجربة التعلم للجميع.\n\nفي المقابل، يرى منتقدو جهود إزالة الاستعمار أن الحركة تُخاطر بفرض أطر سياسية معاصرة على الماضي وبالتضحية المحتملة بالمعايير الأكاديمية سعياً للتمثيل. يردّ المؤيدون بأن ما يدافع عنه المنتقدون بوصفه معايير أكاديمية محايدة ينطوي بالفعل على افتراضات ثقافية بعينها لم تخضع قط للتدقيق والمساءلة. فالنقاش لا يتعلق فحسب بالكتب المدرجة في قوائم القراءة، بل بما يُعدّ معرفة، وتجارب من تُعامَل على أنها كونية، وكيف يُرسّخ التعليم أو يتحدى عدم المساواة الموروثة.	C1	20	2026-04-09 21:39:26.591216+00
171	When Knowledge Becomes a Privilege	حين يصبح المعرفة امتيازاً	Epistemic injustice occurs when individuals are wrongfully dismissed as credible sources of knowledge, often due to their social identity. The philosopher Miranda Fricker identified two key forms: testimonial injustice, where a speaker's credibility is deflated because of prejudice, and hermeneutical injustice, where a lack of shared conceptual tools prevents people from articulating their own experiences meaningfully.\n\nIn academic settings, this phenomenon manifests in subtle yet damaging ways. Scholars from marginalized communities frequently find their research methodologies questioned more rigorously than those of their peers, their theoretical frameworks dismissed as ideologically driven, and their contributions overlooked in citation practices. This systematic undervaluation not only harms individual careers but also impoverishes collective intellectual discourse by excluding diverse perspectives.\n\nAddressing epistemic injustice requires institutional commitment rather than individual goodwill alone. Universities must critically examine their hiring practices, peer review processes, and curriculum design to identify embedded biases. Cultivating what Fricker calls 'epistemic justice virtues' — the capacity to recognize and correct one's own prejudicial judgments — is essential for building genuinely inclusive scholarly communities where all voices carry appropriate intellectual weight.	يحدث الظلم المعرفي حين يُستبعد الأفراد بغير وجه حق من دورهم بوصفهم مصادر موثوقة للمعرفة، وغالباً ما يكون ذلك بسبب هويتهم الاجتماعية. حددت الفيلسوفة ميراندا فريكر شكلين رئيسيين لهذه الظاهرة: الظلم الشهادي، حيث تُقلَّل مصداقية المتحدث بفعل التحيز، والظلم التأويلي، حيث يحول غياب الأدوات المفاهيمية المشتركة دون قدرة الناس على التعبير عن تجاربهم بصورة واضحة.\n\nفي البيئات الأكاديمية، تتجلى هذه الظاهرة بطرق دقيقة لكنها مؤذية. إذ كثيراً ما يجد الباحثون المنتمون إلى مجتمعات مهمشة أن مناهجهم البحثية تخضع لتدقيق أشد مقارنةً بأقرانهم، وأن أطرهم النظرية تُرفض بوصفها أيديولوجية، وأن إسهاماتهم تُغفل في ممارسات الاستشهاد العلمي. هذا التقليل الممنهج لا يضر المسيرة الفردية وحسب، بل يُفقر الخطاب الفكري الجماعي باستبعاد وجهات النظر المتنوعة.\n\nتعزيز العدالة المعرفية يستلزم التزاماً مؤسسياً لا يكتفي بحسن النية الفردية. يتعين على الجامعات مراجعة ممارسات التوظيف والتحكيم العلمي وتصميم المناهج للكشف عن التحيزات الكامنة. إن تنمية ما تسميه فريكر 'فضائل العدالة المعرفية' — القدرة على إدراك أحكامنا المتحيزة وتصحيحها — أمر جوهري لبناء مجتمعات علمية شاملة حقاً تحمل فيها كل الأصوات ثقلها الفكري اللائق.	C1	21	2026-04-09 21:43:09.169747+00
172	Are Our Choices Truly Our Own?	هل خياراتنا حقاً ملكنا؟	The debate between free will and determinism stands among philosophy's most enduring controversies. Determinists argue that every event, including human thought and action, is the inevitable consequence of prior causes governed by natural laws. If the universe operates as a closed causal system, then what we experience as 'choosing' is merely the unfolding of a chain of events set in motion long before our birth.\n\nCompatibilists, however, challenge the assumption that determinism eliminates meaningful freedom. Philosophers such as Daniel Dennett contend that free will, properly understood, does not require the ability to have acted otherwise in an absolute sense. Rather, freedom consists in acting according to one's own desires and reasoning without external coercion. On this view, a person who deliberates carefully and acts on their considered judgment exercises genuine agency, regardless of the underlying causal structure.\n\nThe stakes of this debate extend well beyond academic philosophy. Our legal systems, moral frameworks, and social institutions are built upon assumptions about human responsibility and accountability. If determinism is true in a hard sense, the foundations of punishment, praise, and blame require fundamental reconsideration — a prospect that unsettles both law and everyday moral life.	يُعدّ الجدل بين الإرادة الحرة والحتمية من أعرق الإشكاليات الفلسفية وأكثرها استمراراً. يرى الحتميون أن كل حدث، بما في ذلك الفكر الإنساني والفعل البشري، هو نتيجة حتمية لأسباب سابقة تحكمها قوانين الطبيعة. فإن كان الكون يعمل بوصفه نظاماً سببياً مغلقاً، فإن ما نختبره على أنه 'اختيار' ليس سوى تكشّف لسلسلة من الأحداث انطلقت قبل ولادتنا بزمن بعيد.\n\nغير أن أنصار التوافقية يطعنون في الافتراض القائل بأن الحتمية تلغي الحرية الحقيقية. يؤكد فلاسفة كدانيال دينيت أن الإرادة الحرة، حين تُفهم فهماً صحيحاً، لا تستلزم القدرة المطلقة على التصرف بصورة مغايرة. بل إن الحرية تكمن في التصرف وفق رغباتنا وتفكيرنا دون إكراه خارجي. ومن هذا المنظور، فإن من يتأمل ويتصرف بناءً على حكمه المدروس يمارس فاعلية حقيقية، بصرف النظر عن البنية السببية الكامنة.\n\nتمتد رهانات هذا الجدل إلى ما هو أبعد من الفلسفة الأكاديمية بكثير. إذ تُبنى أنظمتنا القانونية وأطرنا الأخلاقية ومؤسساتنا الاجتماعية على افتراضات تتعلق بالمسؤولية الإنسانية والمساءلة. فإن صحت الحتمية بمعناها الصارم، فإن أسس العقوبة والمديح واللوم تحتاج إلى إعادة نظر جذرية — وهو أمر يُربك القانون والحياة الأخلاقية اليومية على حد سواء.	C1	22	2026-04-09 21:43:09.203642+00
173	Racism Embedded in System Design	العنصرية المضمّنة في تصميم الأنظمة	Structural racism refers to the way in which historical inequalities become embedded within the policies, practices, and norms of social institutions, perpetuating racial disparities even in the absence of deliberate discriminatory intent. Unlike interpersonal racism, which involves explicit prejudice between individuals, structural racism operates through systems that appear neutral on the surface but produce racially unequal outcomes in practice.\n\nThe criminal justice system offers a compelling illustration. Research consistently demonstrates that individuals from racial minority backgrounds face higher rates of arrest, prosecution, and incarceration relative to the majority population, even when controlling for socioeconomic variables. These disparities arise partly from policing patterns that concentrate resources in historically marginalized neighborhoods, creating a self-reinforcing cycle of surveillance and criminalization that statistics alone cannot capture.\n\nCritics of the structural racism framework argue that emphasizing systemic factors risks diminishing individual agency and obscuring genuine progress. Nevertheless, scholars such as Ibram X. Kendi contend that identifying racist policies is a prerequisite for dismantling them. Meaningful reform demands that institutions examine not merely their stated intentions but the measurable racial consequences of their decisions — a standard that challenges comfortable assumptions about meritocracy and institutional neutrality.	يشير العنصرية البنيوية إلى الكيفية التي تترسخ بها التفاوتات التاريخية داخل سياسات المؤسسات الاجتماعية وممارساتها وأعرافها، فتديم التفاوتات العرقية حتى في غياب نية تمييزية واعية. وعلى خلاف العنصرية الشخصية القائمة على تحيزات صريحة بين الأفراد، تعمل العنصرية البنيوية عبر أنظمة تبدو محايدة في ظاهرها لكنها تُنتج في الواقع نتائج غير متكافئة عرقياً.\n\nيقدم نظام العدالة الجنائية مثلاً بليغاً على ذلك. تُظهر الأبحاث باستمرار أن الأفراد من الأقليات العرقية يواجهون معدلات أعلى من الاعتقال والملاحقة القضائية والسجن مقارنةً بالأغلبية، حتى حين تُضبط المتغيرات الاجتماعية والاقتصادية. تنشأ هذه التفاوتات جزئياً من أنماط الشرطة التي تركز مواردها في الأحياء المهمشة تاريخياً، مما يخلق دوامة مستدامة من المراقبة والتجريم لا تستطيع الإحصاءات وحدها استيعابها.\n\nيرى منتقدو إطار العنصرية البنيوية أن التركيز على العوامل المنظومية قد يُقلل من الفاعلية الفردية ويُعتم على التقدم الحقيقي. بيد أن باحثين كإبرام كندي يؤكدون أن تحديد السياسات العنصرية شرط لازم لتفكيكها. يستوجب الإصلاح الفعلي أن تُخضع المؤسسات للفحص ليس نواياها المُعلنة وحسب، بل التبعات العرقية القابلة للقياس لقراراتها — وهو معيار يتحدى الافتراضات المريحة عن الجدارة وحياد المؤسسات.	C1	23	2026-04-09 21:43:09.215576+00
174	Education for Sale: A Crisis	التعليم للبيع: أزمة متفاقمة	The commodification of education describes the process by which learning becomes increasingly subordinated to market logic, transforming students into consumers, knowledge into a tradeable product, and universities into profit-driven enterprises. This shift has accelerated dramatically since the late twentieth century as governments across the world reduced public funding for higher education and encouraged institutions to generate revenue through tuition fees, corporate partnerships, and international student recruitment.\n\nProponents of market-oriented education argue that competition drives quality, that student choice acts as a regulatory mechanism, and that employability-focused curricula serve both individual and societal interests. Critics, however, contend that this framework fundamentally distorts the purpose of education. When universities must compete for students and rankings, they face pressures to prioritize popular, lucrative disciplines over humanities and pure sciences, to inflate grades, and to market credentials rather than cultivate critical thinking.\n\nThe consequences extend beyond institutional culture. Students who incur substantial debt to finance their education face rational pressure to maximize financial returns, choosing careers based on salary rather than vocation or civic contribution. This economic calculus subtly reshapes social values, narrowing the conception of a worthwhile human life to one defined primarily by productive output and market participation.	تصف سلعنة التعليم العملية التي يتحول بها التعلم تدريجياً إلى خاضع لمنطق السوق، فيتحول الطلاب إلى مستهلكين، والمعرفة إلى سلعة قابلة للتبادل، والجامعات إلى مؤسسات تسعى إلى الربح. تسارعت هذه التحولات بشكل لافت منذ أواخر القرن العشرين حين خفضت حكومات حول العالم تمويلها العام للتعليم العالي وشجعت المؤسسات على توليد الإيرادات عبر الرسوم الدراسية والشراكات مع الشركات واستقطاب الطلاب الدوليين.\n\nيرى المؤيدون للتعليم الموجه نحو السوق أن المنافسة تدفع الجودة إلى الأمام، وأن حرية اختيار الطالب آلية تنظيمية فاعلة، وأن المناهج المُركِّزة على التوظيف تخدم مصالح الفرد والمجتمع معاً. غير أن المنتقدين يؤكدون أن هذا الإطار يُشوّه غاية التعليم في جوهرها. حين تتنافس الجامعات على الطلاب والتصنيفات، تتعرض لضغوط تدفعها إلى تقديم التخصصات الشعبية والمربحة على حساب العلوم الإنسانية والبحثية، وإلى التساهل في التقييم، وتسويق الشهادات بدلاً من تنمية التفكير النقدي.\n\nتتجاوز التبعات حدود الثقافة المؤسسية. فالطلاب الذين يتكبدون ديوناً ضخمة لتمويل تعليمهم يواجهون ضغطاً عقلانياً لتعظيم العوائد المالية، فيختارون مساراتهم المهنية بناءً على الراتب لا على الدعوة أو المساهمة المدنية. يُعيد هذا الحساب الاقتصادي تشكيل القيم الاجتماعية بصمت، مُضيّقاً تصور الحياة الإنسانية الجديرة لتختزل في الإنتاجية والمشاركة في السوق.	C1	24	2026-04-09 21:43:09.218817+00
175	Truth in Crisis: Democracy Under Threat	الحقيقة في أزمة: الديمقراطية في مواجهة التهديد	Post-truth politics describes a political environment in which appeals to emotion and personal belief consistently outweigh objective evidence in shaping public opinion. The term gained widespread currency following the 2016 Brexit referendum and United States presidential election, during which demonstrably false claims circulated at scale with minimal electoral consequence. While political manipulation is hardly novel, the digital information ecosystem has dramatically amplified its reach and normalized its practice.\n\nThe erosion of shared epistemic foundations poses a profound threat to democratic governance. Functioning democracies depend on citizens being able to engage in reasoned deliberation based on commonly accepted facts. When political actors delegitimize expert consensus, portray mainstream media as inherently corrupt, and treat empirical questions as matters of tribal loyalty, the communicative preconditions for democratic debate collapse. Disinformation campaigns exploit this vulnerability deliberately, sowing confusion rather than advocating particular positions.\n\nRestoring democratic resilience requires more than fact-checking initiatives, though these remain valuable. Structural reforms — including platform regulation, media literacy education, and the rebuilding of trusted public institutions — are essential. Equally important is addressing the underlying social conditions, such as economic insecurity and institutional distrust, that render populations susceptible to post-truth narratives in the first place.	تصف سياسات ما بعد الحقيقة بيئةً سياسية تتغلب فيها النداءات العاطفية والمعتقدات الشخصية باستمرار على الأدلة الموضوعية في تشكيل الرأي العام. اكتسب المصطلح رواجاً واسعاً في أعقاب استفتاء بريكسيت عام 2016 والانتخابات الرئاسية الأمريكية، حين تداولت ادعاءات كاذبة بصورة موثقة على نطاق واسع دون أن يُفضي ذلك إلى تبعات انتخابية تُذكر. وإن كان التلاعب السياسي ليس جديداً، فإن البيئة المعلوماتية الرقمية ضاعفت مداه بشكل هائل وجعلته ممارسةً مألوفة.\n\nيُمثّل تآكل الأسس المعرفية المشتركة تهديداً عميقاً للحكم الديمقراطي. تعتمد الديمقراطيات الفاعلة على قدرة المواطنين على المشاركة في التداول العقلاني استناداً إلى وقائع مقبولة بصورة مشتركة. حين يسعى الفاعلون السياسيون إلى تقويض الإجماع الخبراتي وتصوير وسائل الإعلام السائدة على أنها فاسدة جوهرياً، ويُعامَل التحقق التجريبي باعتباره مسألة ولاء قبلي، تنهار الشروط التواصلية الضرورية للنقاش الديمقراطي. وتستغل حملات التضليل هذا الضعف بتعمد، ساعيةً إلى زرع الفوضى لا إلى الدعوة لمواقف بعينها.\n\nاستعادة الصمود الديمقراطي تستلزم ما هو أعمق من مبادرات التحقق من الوقائع، وإن ظلت هذه الأخيرة ذات قيمة. إن الإصلاحات الهيكلية — كتنظيم المنصات الرقمية، وتعليم محو الأمية الإعلامية، وإعادة بناء المؤسسات العامة الموثوقة — ضرورة لا غنى عنها. ولا يقل أهمية عن ذلك معالجة الأوضاع الاجتماعية الجذرية، كانعدام الأمن الاقتصادي وفقدان الثقة المؤسسية، التي تجعل الشعوب في المقام الأول عرضةً لروايات ما بعد الحقيقة.	C1	25	2026-04-09 21:43:09.222573+00
176	When Data Becomes a Commodity	عندما تصبح البيانات سلعة	Every time a user scrolls through a social media feed, clicks on an advertisement, or searches for a product online, vast quantities of behavioural data are harvested without explicit consent. This practice, known as surveillance capitalism, has transformed personal information into one of the most lucrative commodities of the twenty-first century. Technology corporations deploy sophisticated algorithms to predict and manipulate consumer behaviour, generating enormous profits while users remain largely unaware of the extent to which their lives are being monitored and monetised.\n\nCritics argue that this arrangement represents a fundamental violation of individual autonomy and democratic values. When corporations possess detailed psychological profiles of millions of citizens, they acquire unprecedented influence over political discourse, purchasing decisions, and even emotional states. The asymmetry of power between data collectors and ordinary individuals raises profound ethical questions that existing legislation has struggled to address adequately.\n\nProponents counter that personalised services and free digital platforms justify data collection as a fair exchange. Nevertheless, meaningful consent is rarely obtained, and the long-term societal consequences of normalising pervasive surveillance remain deeply troubling to researchers, ethicists, and policymakers alike.	في كل مرة يتصفح فيها مستخدم شبكة التواصل الاجتماعي، أو ينقر على إعلان، أو يبحث عن منتج عبر الإنترنت، تُجمَع كميات هائلة من بيانات السلوك دون موافقة صريحة. هذه الممارسة، المعروفة برأسمالية المراقبة، حوّلت المعلومات الشخصية إلى إحدى أكثر السلع ربحيةً في القرن الحادي والعشرين. تستخدم شركات التكنولوجيا خوارزميات متطورة للتنبؤ بسلوك المستهلك والتأثير فيه، محققةً أرباحًا طائلة بينما يظل المستخدمون في الغالب غير مدركين لمدى مراقبة حياتهم وتحقيق الربح منها.\n\nيرى المنتقدون أن هذا الترتيب يمثل انتهاكًا جوهريًا للاستقلالية الفردية والقيم الديمقراطية. فحين تمتلك الشركات ملفات نفسية تفصيلية عن ملايين المواطنين، فإنها تكتسب تأثيرًا غير مسبوق على الخطاب السياسي وقرارات الشراء، بل والحالات العاطفية أيضًا. ويُثير هذا الاختلال في موازين القوى بين جامعي البيانات والأفراد العاديين تساؤلات أخلاقية عميقة عجزت التشريعات القائمة عن معالجتها بصورة كافية.\n\nفي المقابل، يحتج المؤيدون بأن الخدمات الشخصية والمنصات الرقمية المجانية تُبرر جمع البيانات باعتباره تبادلًا عادلًا. غير أن الموافقة الحقيقية نادرًا ما تُستحصل، وتبقى التداعيات المجتمعية بعيدة المدى لتطبيع المراقبة الشاملة مصدر قلق بالغ للباحثين والأخلاقيين وصانعي السياسات على حد سواء.	C1	26	2026-04-09 21:44:59.141316+00
177	Trauma Echoes Across Generations	صدى الصدمة عبر الأجيال	Research in epigenetics and psychology has revealed a disturbing phenomenon: the psychological wounds sustained by one generation can manifest in the health and behaviour of subsequent generations. Intergenerational trauma, once considered a metaphorical concept, is now increasingly recognised as a measurable biological and psychological reality. Studies of Holocaust survivors, famine victims, and communities subjected to prolonged violence consistently demonstrate elevated rates of anxiety, depression, and stress-related illness among their descendants.\n\nThe mechanisms underlying this transmission are complex. Traumatic experiences can alter gene expression through epigenetic modifications, affecting how stress hormones are regulated long after the original trauma has passed. Additionally, parenting behaviours shaped by unresolved trauma — including emotional unavailability, hypervigilance, and inconsistent attachment — create psychological vulnerabilities in children that persist throughout adulthood.\n\nPublic health professionals increasingly argue that addressing intergenerational trauma must become a central pillar of mental health policy. Targeted interventions, culturally sensitive therapy, and community-based healing programmes have demonstrated promising results in disrupting cycles of inherited suffering. Without acknowledging these deep historical wounds, health systems risk treating symptoms whilst leaving root causes entirely unaddressed.	كشفت الأبحاث في علم التخلق وعلم النفس عن ظاهرة مقلقة: إذ يمكن للجراح النفسية التي يعانيها جيل ما أن تتجلى في صحة وسلوك الأجيال اللاحقة. فالصدمة بين الأجيال، التي كانت تُعدّ مفهومًا مجازيًا في السابق، باتت تحظى باعتراف متزايد بوصفها حقيقة بيولوجية ونفسية قابلة للقياس. وتُظهر دراسات الناجين من المحرقة النازية وضحايا المجاعات والمجتمعات التي تعرضت للعنف المطوّل معدلات مرتفعة من القلق والاكتئاب والأمراض المرتبطة بالضغط النفسي بين أحفادهم.\n\nالآليات الكامنة وراء هذا الانتقال بالغة التعقيد. إذ يمكن للتجارب الصادمة أن تُغيّر التعبير الجيني من خلال تعديلات إبيجينية، مما يؤثر على كيفية تنظيم هرمونات التوتر بعد مرور الصدمة الأصلية. فضلًا عن ذلك، فإن أنماط التربية التي تشكّلها صدمات لم تُعالَج — كالانسحاب العاطفي والتيقظ المفرط والتعلق غير المتسق — تخلق هشاشة نفسية لدى الأطفال تستمر طوال مرحلة البلوغ.\n\nيرى متخصصو الصحة العامة بشكل متزايد أن معالجة الصدمة بين الأجيال يجب أن تُصبح ركيزة محورية في سياسات الصحة النفسية. وقد أثبتت التدخلات الموجّهة والعلاج المراعي للثقافة وبرامج الشفاء المجتمعية نتائج واعدة في كسر دوامات المعاناة الموروثة. وبدون الاعتراف بهذه الجراح التاريخية العميقة، تخاطر أنظمة الصحة بمعالجة الأعراض مع إغفال الأسباب الجذرية كليًا.	C1	27	2026-04-09 21:44:59.14566+00
178	Too Many Choices, Too Little Satisfaction	خيارات كثيرة ورضا قليل	Contemporary consumer society prides itself on offering unprecedented variety: dozens of breakfast cereals, hundreds of streaming channels, thousands of smartphone models. Yet psychologist Barry Schwartz has compellingly argued that this abundance of choice, far from liberating individuals, frequently produces anxiety, paralysis, and diminished satisfaction. The paradox of choice suggests that beyond a certain threshold, additional options actively undermine wellbeing rather than enhancing it.\n\nThe psychological mechanisms behind this paradox are well-documented. When faced with numerous alternatives, consumers experience heightened anticipation of regret — the nagging suspicion that whichever option they select, a superior alternative has been overlooked. This phenomenon, combined with the mental exhaustion of extensive deliberation, often results in either impulsive decisions or complete avoidance of choice altogether. Furthermore, greater variety elevates expectations; when a chosen product fails to match an idealised version assembled from the best features of all alternatives, disappointment inevitably follows.\n\nSome researchers advocate for what they term 'choice architecture' — the deliberate reduction of options to cognitively manageable quantities. Evidence from retail environments, healthcare settings, and financial planning suggests that fewer, curated choices consistently lead to higher satisfaction and more confident decision-making among consumers.	يفتخر مجتمع المستهلكين المعاصر بتقديم تنوع غير مسبوق: عشرات من أنواع حبوب الإفطار، ومئات من قنوات البث، وآلاف من طرازات الهواتف الذكية. غير أن عالم النفس باري شوارتز جادل بشكل مقنع بأن هذا الوفر من الخيارات، بدلًا من تحرير الأفراد، كثيرًا ما يُنتج القلق والشلل وتراجع الرضا. ويشير مفارقة الاختيار إلى أنه بعد حد معين، تُضعف الخيارات الإضافية الرفاهية بدلًا من تعزيزها.\n\nالآليات النفسية الكامنة وراء هذه المفارقة موثقة توثيقًا جيدًا. فحين يواجه المستهلكون بدائل كثيرة، يشعرون بتوقع متصاعد للندم — ذلك الشك المزعج بأن الخيار الأفضل قد أُغفل أيًا كان ما اختاروه. هذه الظاهرة، إلى جانب الإرهاق الذهني الناجم عن التداول المطوّل، كثيرًا ما تُفضي إلى قرارات متسرعة أو تجنّب الاختيار كليًا. علاوةً على ذلك، ترفع الخيارات الكثيرة التوقعات؛ وحين يُخفق المنتج المختار في مجاراة النسخة المثالية المُركّبة من أفضل سمات جميع البدائل، يأتي الإحباط حتمًا.\n\nيدعو بعض الباحثين إلى ما يسمونه 'هندسة الاختيار' — أي التقليص المتعمد للخيارات إلى قدر يمكن للعقل استيعابه. وتشير الأدلة من بيئات البيع بالتجزئة والرعاية الصحية والتخطيط المالي إلى أن الخيارات الأقل والمنتقاة تُفضي باستمرار إلى رضا أعلى واتخاذ قرارات أكثر ثقة لدى المستهلكين.	C1	28	2026-04-09 21:44:59.148943+00
179	Global Citizens or Loyal Nationals?	مواطنون عالميون أم مواطنون وطنيون مخلصون؟	The tension between cosmopolitanism and nationalism represents one of the defining political and philosophical debates of our era. Cosmopolitanism, rooted in Enlightenment thought, holds that human beings share a common moral worth transcending national boundaries, and that our primary obligations extend to all of humanity rather than exclusively to compatriots. Proponents envision a world in which international cooperation, open borders, and shared institutions address global challenges that no single nation can resolve independently.\n\nNationalism, by contrast, maintains that cultural identity, shared history, and democratic self-determination are inseparable from the bounded community of the nation-state. Advocates argue that meaningful solidarity — the kind that sustains welfare systems, military sacrifice, and civic participation — requires the emotional bonds that only a shared national identity can reliably provide. Attempting to extend such bonds to all of humanity, they contend, inevitably dilutes them to meaninglessness.\n\nRather than treating these positions as mutually exclusive, many contemporary philosophers advocate for a nuanced middle ground. A person can honour obligations to their immediate community whilst simultaneously recognising duties toward distant strangers. Genuine cosmopolitanism need not erase local attachments but instead challenge the moral arbitrariness of privileging birth-place above all other human connections.	يمثل التوتر بين الكوزموبوليتانية والقومية أحد أبرز النقاشات السياسية والفلسفية في عصرنا. فالكوزموبوليتانية، التي تجد جذورها في فكر عصر التنوير، تؤكد أن البشر يتشاركون قيمة أخلاقية مشتركة تتجاوز الحدود الوطنية، وأن التزاماتنا الأساسية تمتد إلى البشرية جمعاء لا إلى أبناء الوطن فحسب. ويتخيل المؤيدون عالمًا تتصدى فيه التعاون الدولي والحدود المفتوحة والمؤسسات المشتركة للتحديات العالمية التي لا تستطيع أي دولة منفردة معالجتها.\n\nالقومية، في المقابل، ترى أن الهوية الثقافية والتاريخ المشترك وتقرير المصير الديمقراطي لا تنفصل عن مجتمع الدولة القومية المحدود. ويجادل المؤيدون بأن التضامن الحقيقي — النوع الذي يُديم أنظمة الرفاه والتضحية العسكرية والمشاركة المدنية — يستلزم الروابط العاطفية التي لا تستطيع توفيرها سوى الهوية الوطنية المشتركة. ويقول هؤلاء إن محاولة تمديد هذه الروابط لتشمل البشرية جمعاء تُخفف حتمًا من معناها حتى تفقده.\n\nبدلًا من معاملة هذين الموقفين كخيارين متنافيين، يدعو كثير من الفلاسفة المعاصرين إلى أرضية وسطى دقيقة. إذ يستطيع الشخص الوفاء بالتزاماته تجاه مجتمعه المباشر مع إدراك واجباته نحو الغرباء في آنٍ واحد. فالكوزموبوليتانية الحقيقية لا تحتاج إلى محو الارتباطات المحلية، بل تتحدى التعسف الأخلاقي في تقديم مكان الميلاد على سائر الروابط الإنسانية.	C1	29	2026-04-09 21:44:59.152673+00
180	When the Greatest Good Falls Short	حين يخفق السعي للصالح الأعظم	Utilitarianism, the moral theory associated with Jeremy Bentham and John Stuart Mill, holds that the correct action is whichever produces the greatest happiness for the greatest number of people. Its intuitive appeal is considerable: a framework that treats all individuals' wellbeing equally and demands measurable outcomes seems admirably rational and impartial. Utilitarian thinking has influenced public health policy, economic welfare assessments, and cost-benefit analyses across governments worldwide.\n\nYet critics have long identified profound limitations within this seemingly elegant framework. The most troubling objection concerns the potential justification of serious injustice. If enslaving a small minority genuinely maximised overall societal happiness, utilitarianism appears to endorse the arrangement. Similarly, violating an individual's fundamental rights might be sanctioned whenever the aggregate benefit to others is deemed sufficiently large. These implications strike most people as morally monstrous, suggesting the framework is missing something essential.\n\nDeontological alternatives, championed by philosophers such as Immanuel Kant, insist that certain rights and duties must remain inviolable regardless of consequences. Contemporary moral philosophy increasingly recognises that a sophisticated ethical framework must balance aggregate welfare against the irreducible dignity of each individual — a reconciliation that pure utilitarianism, by its very structure, cannot achieve.	تؤكد النفعية، النظرية الأخلاقية المرتبطة بجيريمي بينتام وجون ستيوارت ميل، أن الفعل الصحيح هو الذي يُنتج أكبر قدر من السعادة لأكبر عدد من الناس. وجاذبيتها البديهية كبيرة: إذ يبدو الإطار الذي يعامل رفاهية جميع الأفراد بالتساوي ويطالب بنتائج قابلة للقياس عقلانيًا ونزيهًا بشكل يدعو للإعجاب. وقد أثّر الفكر النفعي في سياسات الصحة العامة وتقييمات الرفاه الاقتصادي وتحليلات التكلفة والعائد في حكومات شتى حول العالم.\n\nغير أن المنتقدين حددوا منذ أمد بعيد قيودًا عميقة في هذا الإطار الذي يبدو أنيقًا. وتتعلق أشد الاعتراضات إثارةً للقلق بالتبرير المحتمل لظلم صارخ. فإذا كان استعباد أقلية صغيرة يُعظّم السعادة المجتمعية الإجمالية فعلًا، يبدو أن النفعية تُجيز هذا الترتيب. وبالمثل، قد يُجاز انتهاك الحقوق الأساسية للفرد متى رُئي أن الفائدة الإجمالية للآخرين كبيرة بما يكفي. وتبدو هذه التداعيات وحشيةً أخلاقيًا في نظر معظم الناس، مما يُشير إلى افتقار الإطار لشيء جوهري.\n\nتصرّ البدائل الواجبية، التي دافع عنها فلاسفة كإيمانويل كانط، على أن حقوقًا وواجبات معينة يجب أن تظل لا تُمسّ بصرف النظر عن العواقب. وتُقرّ الفلسفة الأخلاقية المعاصرة بشكل متزايد بأن الإطار الأخلاقي الرصين يجب أن يوازن الرفاهية الإجمالية مع الكرامة التي لا يمكن اختزالها لكل فرد — وهو توفيق لا تستطيع النفعية المحضة، في بنيتها الجوهرية، تحقيقه.	C1	30	2026-04-09 21:44:59.156428+00
181	Machines, Power, and the Working Class	الآلات والسلطة والطبقة العاملة	The rapid expansion of automation across manufacturing, logistics, and service industries has fundamentally altered the relationship between employers and workers. As algorithms and robotics assume tasks once performed by humans, millions find themselves either displaced or forced into precarious, low-wage employment with minimal job security. Proponents of automation argue that technological progress inevitably creates new industries and opportunities, yet critics contend that this transition disproportionately burdens those least equipped to adapt.\n\nLabour rights organisations have responded with increasing urgency, advocating for stronger legal protections, retraining programmes, and universal basic income as potential remedies. Some jurisdictions have introduced legislation requiring companies to consult workers before implementing significant automation, acknowledging the profound social consequences of unchecked technological adoption.\n\nNevertheless, corporate lobbying continues to dilute regulatory efforts, and the power imbalance between capital and labour remains stark. Without robust institutional frameworks and genuine political will, automation risks deepening existing inequalities rather than distributing its considerable benefits equitably. The challenge for contemporary democracies is ensuring that technological progress serves collective prosperity rather than consolidating wealth among a privileged few.	أحدث التوسع السريع في الأتمتة عبر قطاعات التصنيع والخدمات اللوجستية والخدمات تحولاً جوهرياً في العلاقة بين أصحاب العمل والعمال. إذ باتت الخوارزميات والروبوتات تضطلع بمهام كان يؤديها البشر سابقاً، مما أفضى إلى تهميش الملايين أو إجبارهم على قبول وظائف هشة بأجور متدنية وأمان وظيفي محدود. يرى المؤيدون للأتمتة أن التقدم التكنولوجي يخلق حتماً صناعات وفرصاً جديدة، غير أن المنتقدين يؤكدون أن هذا التحول يلقي عبئاً غير متناسب على كاهل الفئات الأقل قدرة على التكيف.\n\nاستجابت منظمات حقوق العمال بإلحاح متصاعد، مطالبةً بحمايات قانونية أكثر صرامة وبرامج إعادة تأهيل ودخل أساسي شامل بوصفها حلولاً محتملة. وقد سنّت بعض الدول تشريعات تُلزم الشركات باستشارة العمال قبل تطبيق أي أتمتة واسعة، إقراراً بالتداعيات الاجتماعية الجسيمة لاعتماد التكنولوجيا دون رقابة.\n\nبيد أن الضغوط الشركاتية تواصل إضعاف الجهود التنظيمية، ويظل اختلال موازين القوى بين رأس المال والعمل واضحاً. فبدون أطر مؤسسية متينة وإرادة سياسية حقيقية، تخاطر الأتمتة بتعميق التفاوتات القائمة بدلاً من توزيع عوائدها الجمّة بصورة عادلة.	C1	31	2026-04-09 21:46:46.711799+00
182	The State's Grip on Human Life	قبضة الدولة على الحياة الإنسانية	The philosopher Michel Foucault introduced the concept of biopolitics to describe how modern states exercise power not merely through laws and punishment, but through the systematic management of populations. Governments monitor birth rates, regulate health behaviours, control migration, and deploy surveillance technologies to shape and discipline the bodies and lives of their citizens. This subtle yet pervasive form of control operates through institutions such as hospitals, schools, and bureaucracies rather than through overt coercion.\n\nThe COVID-19 pandemic offered a stark illustration of biopolitical power in action. Governments worldwide mandated lockdowns, enforced quarantine measures, and determined who received life-saving vaccines first. These decisions were framed as purely scientific and humanitarian, yet they inevitably reflected existing hierarchies of race, class, and nationality. Critics observed that marginalised communities consistently bore the greatest burdens while receiving the least institutional support.\n\nContemporary digital surveillance extends biopolitical reach even further, enabling states to track movements, monitor communications, and predict behaviours with unprecedented precision. As these capabilities expand, fundamental questions arise about consent, privacy, and the ethical limits of governmental authority over human existence.	قدّم الفيلسوف ميشيل فوكو مفهوم السياسة الحيوية ليصف كيف تمارس الدول الحديثة سلطتها لا من خلال القوانين والعقوبات وحسب، بل عبر الإدارة المنهجية للسكان. تراقب الحكومات معدلات المواليد وتنظّم السلوكيات الصحية وتتحكم في الهجرة وتوظّف تقنيات المراقبة لتشكيل حياة مواطنيها وضبطها. ويعمل هذا الشكل الخفي والمتغلغل من السيطرة عبر مؤسسات كالمستشفيات والمدارس والبيروقراطيات، لا من خلال الإكراه الصريح.\n\nكشفت جائحة كوفيد-19 عن السياسة الحيوية في أجلى صورها؛ إذ فرضت حكومات العالم الإغلاقات وأجراءات الحجر الصحي وحددت الأولويات في توزيع اللقاحات المنقذة للأرواح. صُوِّرت هذه القرارات باعتبارها علمية وإنسانية بحتة، غير أنها عكست في جوهرها التراتبيات القائمة على العرق والطبقة والجنسية. ولاحظ المنتقدون أن المجتمعات المهمّشة تحملت الأعباء الأثقل مع الحصول على أدنى دعم مؤسسي.\n\nتمتد المراقبة الرقمية المعاصرة لتوسّع نطاق السياسة الحيوية أبعد من ذلك، مما يُمكّن الدول من تتبع التنقلات ورصد الاتصالات والتنبؤ بالسلوكيات بدقة غير مسبوقة. ومع تنامي هذه القدرات، تبرز تساؤلات جوهرية حول الموافقة والخصوصية والحدود الأخلاقية لسلطة الدولة على الوجود الإنساني.	C1	32	2026-04-09 21:46:46.716791+00
183	Is Liberal Democracy Facing Collapse?	هل تواجه الديمقراطية الليبرالية الانهيار؟	Liberal democracy, once celebrated as the definitive endpoint of political history, faces mounting challenges from multiple directions simultaneously. The rise of populist movements across Europe, the Americas, and beyond has exposed profound tensions between majoritarian impulses and the protection of minority rights, judicial independence, and press freedom. Leaders who win elections through democratic means increasingly employ those mandates to erode the very institutions that made their victory possible.\n\nEconomic grievances play a central role in this crisis. Decades of widening inequality, wage stagnation, and the perceived failures of globalisation have generated deep resentment toward political establishments. Many citizens feel that liberal institutions serve elite interests rather than the common good, making them receptive to authoritarian alternatives that promise decisive action and national renewal.\n\nScholars debate whether contemporary democracies are experiencing temporary turbulence or a more fundamental structural decline. Some argue that democratic resilience has historically proven robust, capable of absorbing and adapting to internal pressures. Others contend that the convergence of disinformation, institutional erosion, and polarisation represents an unprecedented threat requiring urgent reimagination of democratic governance itself.	تواجه الديمقراطية الليبرالية، التي كانت تُحتفى بها ذات يوم بوصفها المحطة النهائية للتاريخ السياسي، تحديات متصاعدة من اتجاهات متعددة في آنٍ واحد. كشف صعود الحركات الشعبوية في أوروبا والأمريكتين وما وراءها عن توترات عميقة بين الدوافع الأغلبية وحماية حقوق الأقليات واستقلال القضاء وحرية الصحافة. إذ يلجأ القادة الذين يصلون إلى السلطة عبر الانتخابات إلى توظيف تفويضاتهم لتقويض المؤسسات ذاتها التي أتاحت لهم الفوز.\n\nتؤدي المظالم الاقتصادية دوراً محورياً في هذه الأزمة؛ فعقود من تفاقم التفاوت وركود الأجور والإخفاقات المُتصوَّرة للعولمة أفرزت استياءً عميقاً تجاه المؤسسات السياسية. ويشعر كثير من المواطنين بأن المؤسسات الليبرالية تخدم مصالح النخب لا الصالح العام، مما يجعلهم أكثر انفتاحاً على البدائل الاستبدادية التي تعد بالحسم وبالتجديد الوطني.\n\nيتجادل الباحثون حول ما إذا كانت الديمقراطيات المعاصرة تمر باضطراب مؤقت أم بتراجع هيكلي أعمق. يرى فريق أن الديمقراطية أثبتت تاريخياً متانتها وقدرتها على استيعاب الضغوط الداخلية والتكيف معها، في حين يؤكد آخرون أن تقاطع التضليل المعلوماتي وتآكل المؤسسات والاستقطاب يمثل تهديداً غير مسبوق يستلزم إعادة تصور عاجلة للحوكمة الديمقراطية ذاتها.	C1	33	2026-04-09 21:46:46.719872+00
184	Who Decides What Art Is Worth?	من يقرر قيمة الفن؟	Aesthetic judgement has long been entangled with social power. Throughout Western history, cultural institutions such as museums, academies, and critical establishments have determined which artworks merit preservation, celebration, and scholarly attention. These gatekeeping functions were rarely neutral; they consistently privileged work produced by male artists from dominant social classes and European traditions, while marginalising or dismissing contributions from women, colonised peoples, and non-Western cultures.\n\nContemporary debates challenge the notion that aesthetic value is universal or objective. Theorists argue that what societies deem beautiful, significant, or worthy of cultural investment reflects prevailing ideologies and power structures rather than intrinsic qualities of the artwork itself. The market further complicates this picture, as commercial success can elevate mediocre work while genuine artistic innovation struggles to find institutional support or financial recognition.\n\nDigital platforms have partially democratised cultural production and consumption, enabling artists to bypass traditional gatekeepers and reach global audiences directly. Yet algorithmic curation introduces new distortions, often prioritising engagement and virality over depth or originality. The fundamental question persists: can aesthetic value ever be separated from the social conditions that produce and evaluate it?	طالما تشابك الحكم الجمالي مع السلطة الاجتماعية. فعبر تاريخ الغرب، حددت مؤسسات ثقافية كالمتاحف والأكاديميات والمؤسسات النقدية الأعمال الفنية الجديرة بالحفظ والاحتفاء والدراسة الأكاديمية. ولم تكن هذه الوظيفة الحراسية محايدة قط؛ إذ منحت امتيازاً منهجياً للأعمال المنبثقة عن فنانين ذكور من الطبقات الاجتماعية السائدة والتقاليد الأوروبية، في حين هُمِّشت إسهامات النساء والشعوب المستعمَرة والثقافات غير الغربية أو جرى تجاهلها.\n\nتطعن النقاشات المعاصرة في فكرة أن القيمة الجمالية كونية أو موضوعية. يؤكد المنظّرون أن ما تراه المجتمعات جميلاً أو ذا أهمية أو جديراً بالاستثمار الثقافي يعكس الأيديولوجيات وبنى السلطة السائدة لا الخصائص الجوهرية للعمل الفني في ذاته. ويزيد السوق المشهدَ تعقيداً، إذ يمكن للنجاح التجاري أن يرفع أعمالاً متوسطة بينما يكافح الابتكار الفني الحقيقي للحصول على دعم مؤسسي أو اعتراف مالي.\n\nأسهمت المنصات الرقمية جزئياً في دمقرطة الإنتاج والاستهلاك الثقافيين، مما أتاح للفنانين تجاوز الحرّاس التقليديين والوصول مباشرة إلى جماهير عالمية. غير أن التنظيم الخوارزمي يُفرز تشويهات جديدة، كثيراً ما تُقدّم التفاعل والانتشار على حساب العمق والأصالة. ويبقى السؤال الجوهري قائماً: هل يمكن فصل القيمة الجمالية عن الشروط الاجتماعية التي تُنتجها وتُقيّمها؟	C1	34	2026-04-09 21:46:46.72447+00
185	Rethinking Education Beyond Colonial Legacies	إعادة التفكير في التعليم خارج الإرث الاستعماري	The movement to decolonise the curriculum has gained substantial momentum in universities and schools across the world. Advocates argue that dominant educational frameworks overwhelmingly reflect Western European knowledge traditions, systematically excluding or trivialising intellectual contributions from African, Asian, Indigenous, and Latin American thinkers. This exclusion does not merely constitute an academic oversight; it perpetuates hierarchies that position Western thought as universal and rational while framing other knowledge systems as peripheral or supplementary.\n\nCritics of decolonisation initiatives sometimes characterise them as politically motivated attempts to undermine academic standards or replace rigorous scholarship with ideological agendas. Proponents counter that genuine intellectual rigour demands expanding the canon to include perspectives that have been historically suppressed. Incorporating diverse epistemological traditions enriches understanding and better prepares students to engage with an interconnected, pluralistic global society.\n\nImplementing meaningful curricular change, however, presents considerable practical challenges. Institutions must confront entrenched faculty resistance, resource constraints, and the difficulty of sourcing appropriately translated and contextualised materials. Furthermore, decolonisation must extend beyond simply adding non-Western texts to existing syllabi; it requires fundamentally reconsidering the questions asked, the methods employed, and whose experiences are treated as worthy of serious scholarly inquiry.	اكتسبت حركة إلغاء الاستعمار من المناهج الدراسية زخماً ملحوظاً في جامعات ومدارس حول العالم. يؤكد المناصرون أن الأطر التعليمية السائدة تعكس في معظمها التقاليد المعرفية لأوروبا الغربية، وتستبعد بصورة منهجية أو تُهوّن من الإسهامات الفكرية للمفكرين الأفارقة والآسيويين والسكان الأصليين وأبناء أمريكا اللاتينية. ولا يمثل هذا الاستبعاد مجرد إغفال أكاديمي؛ بل إنه يُديم التراتبيات التي تُقدّم الفكر الغربي بوصفه كونياً وعقلانياً، فيما تُصوّر منظومات المعرفة الأخرى باعتبارها هامشية أو تكميلية.\n\nيُصوِّر بعض منتقدي مبادرات إلغاء الاستعمار هذه أحياناً باعتبارها محاولات ذات دوافع سياسية لتقويض المعايير الأكاديمية أو إحلال أجندات أيديولوجية محل البحث الرصين. ويرد المؤيدون بأن الصرامة الفكرية الحقيقية تستلزم توسيع الإرث الأدبي ليشمل وجهات النظر التي قُمعت تاريخياً، إذ يُثري دمج التقاليد المعرفية المتنوعة الفهم ويُهيئ الطلاب للتعامل مع مجتمع عالمي مترابط وتعددي.\n\nغير أن تحقيق تغيير منهجي حقيقي ينطوي على تحديات عملية جسيمة. إذ يتعين على المؤسسات مواجهة مقاومة هيئة التدريس الراسخة وقيود الموارد وصعوبة الحصول على مواد مترجمة ومُسيّقة بصورة ملائمة. فضلاً عن ذلك، يجب أن يتجاوز إلغاء الاستعمار مجرد إضافة نصوص غير غربية إلى المقررات القائمة؛ فهو يستلزم إعادة النظر جذرياً في الأسئلة المطروحة والمناهج المعتمدة وتحديد التجارب الجديرة بالبحث الأكاديمي الجاد.	C1	35	2026-04-09 21:46:46.728885+00
186	Who Owns the Past's Burden?	من يتحمل عبء الماضي؟	Societies across the world are increasingly confronted with uncomfortable questions about historical accountability. Whether it concerns colonial atrocities, wartime collaborations, or systematic injustices, the question of who bears moral responsibility for past wrongdoings remains deeply contentious. Some argue that contemporary citizens cannot be held accountable for actions committed before their birth, while others contend that benefiting from historical injustice creates an implicit obligation to acknowledge and redress it.\n\nThe ethics of collective memory complicates this debate further. Institutions, governments, and even corporations that trace their origins to morally compromised histories face pressure to issue formal apologies or provide reparations. Critics warn that such gestures risk becoming performative, substituting symbolic action for substantive change. Proponents, however, maintain that public acknowledgment is itself a form of justice, restoring dignity to those whose suffering was deliberately erased.\n\nUltimately, navigating historical accountability requires a nuanced balance between preserving truthful memory and avoiding inherited guilt that paralyses present action. Memory, it seems, is never purely personal; it is always entangled with power, politics, and the ongoing construction of collective identity.	تواجه المجتمعات حول العالم بشكل متزايد تساؤلات مزعجة حول المساءلة التاريخية. سواء تعلّق الأمر بفظائع الاستعمار أو التعاون في زمن الحرب أو الظلم الممنهج، تظل مسألة من يتحمل المسؤولية الأخلاقية عن الأخطاء الماضية موضع جدل عميق. يرى بعضهم أنه لا يمكن تحميل المواطنين المعاصرين مسؤولية أفعال ارتُكبت قبل ولادتهم، في حين يرى آخرون أن الاستفادة من الظلم التاريخي تُفضي إلى التزام ضمني بالاعتراف به وتصحيحه.\n\nتُعقّد أخلاقيات الذاكرة الجماعية هذا النقاش أكثر. تواجه المؤسسات والحكومات والشركات التي تمتد جذورها إلى ماضٍ أخلاقي مثير للجدل ضغوطًا لتقديم اعتذارات رسمية أو دفع تعويضات. يحذّر المنتقدون من أن مثل هذه الإيماءات قد تغدو مجرد مسرحية تحل فيها الرمزية محل التغيير الحقيقي. غير أن المؤيدين يؤكدون أن الاعتراف العلني هو في حد ذاته شكل من أشكال العدالة يُعيد الكرامة لمن جرى محو معاناتهم عن قصد.\n\nفي نهاية المطاف، يستلزم التعامل مع المساءلة التاريخية توازنًا دقيقًا بين الحفاظ على الذاكرة الصادقة وتجنب الذنب الموروث الذي يشلّ الحاضر. يبدو أن الذاكرة ليست شخصية بحتة أبدًا؛ فهي دائمًا متشابكة مع السلطة والسياسة وبناء الهوية الجماعية المستمر.	C1	36	2026-04-09 21:48:38.097994+00
187	Enhancing Humans or Erasing Them?	تعزيز الإنسان أم محوه؟	Transhumanism, the intellectual movement advocating for the enhancement of human capacities through technology, has moved from the fringes of philosophical debate into mainstream scientific and ethical discourse. Proponents envision a future in which genetic editing, neural interfaces, and cognitive augmentation allow individuals to transcend the biological limitations that have defined human experience throughout history. For supporters, this represents not a threat to humanity but its logical evolution.\n\nCritics, however, raise profound concerns about human dignity and equality. If enhancements are expensive and accessible only to the wealthy, they argue, transhumanist technologies could entrench existing social hierarchies rather than dismantle them. More philosophically, some bioethicists question whether a radically augmented being still qualifies as meaningfully human, suggesting that vulnerability, finitude, and embodied experience are not deficiencies to be corrected but constitutive features of human identity.\n\nThe debate ultimately forces a confrontation with fundamental questions: What is the relationship between human nature and human worth? Can dignity survive radical transformation? These are not merely speculative concerns; as technologies advance rapidly, societies must develop ethical frameworks before enhancement becomes irreversible and ungovernable.	انتقلت حركة ما بعد الإنسانية، وهي الحركة الفكرية الداعية إلى تعزيز القدرات البشرية عبر التكنولوجيا، من هوامش النقاش الفلسفي إلى قلب الخطاب العلمي والأخلاقي السائد. يتخيل المؤيدون مستقبلًا تتيح فيه الهندسة الجينية والواجهات العصبية والتعزيز المعرفي للأفراد تجاوز القيود البيولوجية التي حددت التجربة الإنسانية عبر التاريخ. بالنسبة للمؤيدين، لا يُشكّل هذا تهديدًا للإنسانية بل تطورها المنطقي.\n\nبيد أن المنتقدين يُثيرون مخاوف عميقة تتعلق بالكرامة الإنسانية والمساواة. يرون أنه إذا كانت التحسينات باهظة التكلفة ولا يستطيع الوصول إليها إلا الأثرياء، فإن تقنيات ما بعد الإنسانية قد تُرسّخ التراتبيات الاجتماعية القائمة بدلًا من تفكيكها. وعلى الصعيد الفلسفي، يتساءل بعض علماء الأخلاقيات الحيوية عما إذا كان الكائن المُعزَّز جذريًا لا يزال يُعدّ إنسانًا بالمعنى الحقيقي، مقترحين أن الهشاشة والمحدودية والتجربة الجسدية ليست قصورًا يستدعي التصحيح بل سمات أساسية للهوية الإنسانية.\n\nيفرض هذا النقاش في نهاية المطاف مواجهة أسئلة جوهرية: ما العلاقة بين الطبيعة الإنسانية والقيمة الإنسانية؟ هل يمكن للكرامة أن تصمد أمام التحول الجذري؟ هذه ليست مخاوف نظرية مجردة؛ فمع التقدم السريع للتكنولوجيا، يتعين على المجتمعات صياغة أطر أخلاقية قبل أن يصبح التعزيز أمرًا لا رجعة فيه ويعجز عن الحوكمة.	C1	37	2026-04-09 21:48:38.103192+00
188	Living Dangerously in Modern Society	العيش بخطورة في المجتمع الحديث	The sociology of risk examines how societies identify, interpret, and distribute danger among their members. Ulrich Beck's influential concept of the 'risk society' proposed that late modernity is characterised not by the pursuit of goods but by the avoidance of hazards that are largely invisible, global, and manufactured by human activity itself. Unlike traditional dangers such as floods or famine, contemporary risks like climate change or financial instability defy straightforward perception and resist conventional political responses.\n\nCrucially, risk is not experienced equally across social groups. Poorer communities, ethnic minorities, and geographically marginalised populations tend to bear disproportionate exposure to environmental toxins, unsafe working conditions, and inadequate healthcare. This unequal distribution reveals that risk is not merely a technical phenomenon but a profoundly political one, shaped by power relations and policy choices rather than natural inevitability.\n\nFurthermore, individual responses to risk are mediated by cultural frameworks that determine what counts as acceptable danger. In some societies, collective insurance mechanisms are favoured; in others, individual responsibility is emphasised. Understanding how risk is socially constructed is essential for designing policies that are both effective and equitable in addressing the hazards of contemporary life.	تدرس سوسيولوجيا المخاطر كيفية تعرّف المجتمعات على الخطر وتفسيره وتوزيعه بين أفرادها. اقترح مفهوم 'مجتمع المخاطر' المؤثر الذي صاغه أولريش بيك أن الحداثة المتأخرة لا تتسم بالسعي وراء الخيرات بل بتجنب المخاطر التي هي في معظمها غير مرئية وعالمية ومن صنع النشاط البشري ذاته. وعلى خلاف الأخطار التقليدية كالفيضانات والمجاعة، فإن المخاطر المعاصرة كتغير المناخ أو الاضطراب المالي تأبى الإدراك المباشر وتقاوم الاستجابات السياسية التقليدية.\n\nوالأهم من ذلك أن المخاطر لا تُختبر بالتساوي عبر الفئات الاجتماعية. تميل المجتمعات الأكثر فقرًا والأقليات العرقية والسكان المهمشون جغرافيًا إلى تحمّل تعرّض غير متناسب للسموم البيئية وظروف العمل غير الآمنة والرعاية الصحية غير الكافية. يكشف هذا التوزيع غير المتكافئ أن المخاطر ليست مجرد ظاهرة تقنية بل ظاهرة سياسية عميقة، تشكّلها علاقات السلطة والخيارات السياسية لا الحتمية الطبيعية.\n\nعلاوة على ذلك، تتوسط الأطر الثقافية في ردود الفعل الفردية تجاه الخطر، إذ تحدد ما يُعدّ خطرًا مقبولًا. في بعض المجتمعات تُفضَّل آليات التأمين الجماعي؛ وفي مجتمعات أخرى يُشدَّد على المسؤولية الفردية. يُعدّ فهم الطريقة التي يُبنى بها الخطر اجتماعيًا أمرًا جوهريًا لتصميم سياسات فعّالة وعادلة في التعامل مع مخاطر الحياة المعاصرة.	C1	38	2026-04-09 21:48:38.114936+00
189	When Headlines Amplify Our Fears	حين تُضخّم العناوين مخاوفنا	Catastrophising, the cognitive tendency to interpret events as far more disastrous than evidence warrants, has found a powerful amplifier in contemporary media ecosystems. News organisations, competing fiercely for audience attention in a saturated digital landscape, have strong commercial incentives to frame events in the most alarming terms possible. A localised industrial accident becomes an existential environmental crisis; a minor diplomatic dispute is portrayed as the precursor to armed conflict. This systematic distortion shapes public perception in ways that are difficult to subsequently correct.\n\nMedia framing theory suggests that it is not merely what is reported but how it is reported that determines audience response. When journalists consistently employ metaphors of catastrophe, contagion, or collapse, they prime readers to experience anxiety disproportionate to actual risk levels. Research in cognitive psychology confirms that emotionally charged language activates fear responses that override rational assessment, making audiences more susceptible to further alarming content.\n\nThe consequences extend beyond individual psychology. Persistently catastrophist framing erodes public trust in institutions, fuels political polarisation, and undermines the collective capacity for measured deliberation in genuine crises. Developing media literacy therefore becomes not merely an educational priority but a civic necessity in societies where democracy depends on informed, rather than frightened, participation.	وجد التهويل، وهو الميل المعرفي لتفسير الأحداث على أنها أكثر كارثية مما تشير إليه الأدلة، مُضخِّمًا قويًا في منظومات الإعلام المعاصرة. تمتلك المؤسسات الإخبارية، التي تتنافس بشراسة على استقطاب انتباه الجمهور في مشهد رقمي مشبع، حوافز تجارية قوية لصياغة الأحداث بأكثر الأساليب إثارة للقلق. يتحول حادث صناعي محلي إلى أزمة بيئية وجودية؛ وتُصوَّر خلاف دبلوماسي بسيط باعتباره مقدمة لصراع مسلح. يُشكّل هذا التشويه الممنهج إدراك الجمهور بطرق يصعب تصحيحها لاحقًا.\n\nتشير نظرية التأطير الإعلامي إلى أنه ليس ما يُبلَّغ عنه فحسب بل كيفية الإبلاغ عنه هي ما يحدد استجابة الجمهور. حين يوظف الصحفيون باستمرار استعارات الكارثة والعدوى والانهيار، فإنهم يهيئون القراء لاختبار قلق يفوق مستويات المخاطر الفعلية. يؤكد البحث في علم النفس المعرفي أن اللغة المشحونة عاطفيًا تُفعّل استجابات الخوف التي تتغلب على التقييم العقلاني، مما يجعل الجماهير أكثر عرضة للمحتوى المثير للقلق.\n\nتمتد التبعات إلى ما هو أبعد من علم النفس الفردي. يُآكل التأطير الكارثي المستمر الثقة العامة في المؤسسات، ويُذكي الاستقطاب السياسي، ويُقوّض القدرة الجماعية على التداول الرصين في الأزمات الحقيقية. لذا يغدو تطوير الوعي الإعلامي ليس مجرد أولوية تعليمية بل ضرورة مدنية في المجتمعات التي تعتمد ديمقراطيتها على المشاركة المستنيرة لا الخائفة.	C1	39	2026-04-09 21:48:38.118873+00
190	Language as a Tool of Dominance	اللغة أداةً للهيمنة	Language is rarely a neutral medium of communication. Linguists and critical theorists have long argued that the relationship between language and power is both pervasive and largely invisible to those who benefit from it. Dominant groups shape discourse by naturalising their own perspectives, embedding assumptions within everyday vocabulary that render alternative viewpoints difficult to articulate or even conceive. The language of institutions, law, and commerce frequently privileges certain speakers while systematically marginalising others.\n\nPower asymmetry in language operates at multiple levels. At the lexical level, terms carry ideological freight that reflects historical hierarchies: the vocabulary of race, gender, and class is never politically innocent. At the discursive level, those with institutional authority determine which speech acts are considered legitimate, credible, or worthy of serious response. A patient's account of their own symptoms, for instance, is routinely subordinated to medical expertise, regardless of its experiential validity.\n\nAwareness of this dynamic has prompted significant scholarly and activist effort to reclaim linguistic agency for marginalised communities. Debates around inclusive language, the decolonisation of academic curricula, and the politics of translation all reflect a growing recognition that challenging power requires, among other things, challenging the language through which power perpetuates itself.	نادرًا ما تكون اللغة وسيطًا محايدًا للتواصل. يرى اللغويون والمنظّرون النقديون منذ أمد بعيد أن العلاقة بين اللغة والسلطة علاقة منتشرة وغير مرئية إلى حد بعيد لمن يستفيد منها. تُشكّل الجماعات المهيمنة الخطاب عبر تطبيع منظوراتها الخاصة وترسيخ افتراضاتها داخل المفردات اليومية بما يجعل وجهات النظر البديلة عسيرة التعبير أو حتى التصور. كثيرًا ما تُفضّل لغة المؤسسات والقانون والتجارة متحدثين بعينهم بينما تُهمّش آخرين بصورة ممنهجة.\n\nيعمل عدم التماثل في القوة اللغوية على مستويات متعددة. على المستوى المعجمي، تحمل المصطلحات شحنات أيديولوجية تعكس تراتبيات تاريخية: إذ إن مفردات العرق والنوع الاجتماعي والطبقة ليست محايدة سياسيًا أبدًا. وعلى المستوى الخطابي، يقرر أصحاب السلطة المؤسسية أي أفعال كلامية تُعدّ مشروعة وموثوقة ومستحقة للاستجابة الجادة. فرواية المريض لأعراضه الخاصة، على سبيل المثال، تُخضَع روتينيًا للخبرة الطبية بصرف النظر عن صحتها التجريبية.\n\nدفع الوعي بهذه الديناميكية إلى جهود أكاديمية وناشطة مهمة لاستعادة الفاعلية اللغوية للمجتمعات المهمشة. تعكس النقاشات حول اللغة الشاملة وإلغاء استعمار المناهج الأكاديمية وسياسات الترجمة إدراكًا متناميًا بأن تحدي السلطة يستلزم، من بين أمور أخرى، تحدي اللغة التي تُكرّس السلطة نفسها من خلالها.	C1	40	2026-04-09 21:48:38.122442+00
191	Climate Governance and the Collective Trap	حوكمة المناخ وفخ العمل الجماعي	Climate change represents one of the most complex collective action problems humanity has ever confronted. Every nation acknowledges the necessity of reducing carbon emissions, yet each government faces powerful domestic incentives to prioritise economic growth over environmental responsibility. This fundamental tension between individual national interest and collective global welfare lies at the heart of why international climate agreements so frequently fall short of their ambitious targets.\n\nThe tragedy of the commons illustrates this dilemma vividly. When a shared resource—in this case, the atmosphere—is freely accessible, rational actors will inevitably exploit it beyond sustainable limits, even when they recognise the long-term consequences. Nations behave similarly, calculating that their unilateral sacrifice will be negligible unless matched by equivalent commitments from competitors.\n\nInstitutional economists argue that binding multilateral frameworks, combined with credible enforcement mechanisms, offer the most viable pathway out of this impasse. Carbon pricing schemes, technology transfer agreements, and climate finance commitments attempt to restructure incentives so that cooperation becomes the rational choice. Nevertheless, achieving genuine political will across deeply asymmetrical economies remains an enduring challenge that no framework has yet fully resolved.	يمثّل تغيّر المناخ أحد أكثر مشكلات العمل الجماعي تعقيدًا التي واجهتها البشرية على الإطلاق. تُقرّ كل دولة بضرورة خفض انبعاثات الكربون، غير أن كل حكومة تواجه حوافز داخلية قوية تدفعها إلى تقديم النمو الاقتصادي على حساب المسؤولية البيئية. يكمن هذا التوتر الجوهري بين المصلحة الوطنية الفردية والرفاه العالمي الجماعي في صميم السبب الذي يجعل الاتفاقيات المناخية الدولية تخفق كثيرًا في بلوغ أهدافها الطموحة.\n\nتوضّح مأساة المشاع هذه المعضلة توضيحًا جليًّا؛ فحين تكون موارد مشتركة—كالغلاف الجوي في هذه الحالة—متاحةً دون قيود، فإن الفاعلين العقلانيين سيستنزفونها حتمًا إلى ما يتجاوز حدود الاستدامة، حتى حين يدركون العواقب بعيدة المدى. وتتصرف الدول بالمنطق ذاته، إذ تحسب أن تضحيتها المنفردة ستكون ضئيلة الأثر ما لم تُقابَل بالتزامات مكافئة من المنافسين.\n\nيرى الاقتصاديون المؤسسيون أن الأطر المتعددة الأطراف الملزِمة، مقرونةً بآليات إنفاذ ذات مصداقية، تمثّل المسار الأكثر جدوى للخروج من هذا المأزق. وتسعى مخططات تسعير الكربون واتفاقيات نقل التكنولوجيا والتعهدات بتمويل المناخ إلى إعادة هيكلة الحوافز كي يغدو التعاون خيارًا عقلانيًّا. بيد أن تحقيق إرادة سياسية حقيقية عبر اقتصادات بالغة التفاوت لا يزال تحديًا مستعصيًا لم يُفلح أي إطار حتى الآن في حلّه بالكامل.	C1	41	2026-04-09 21:50:38.980656+00
192	How the Brain Manufactures Bias	كيف يصنع الدماغ التحيّز	Neuroscientific research has fundamentally reshaped our understanding of human bias, revealing that prejudice is not simply a moral failing but a product of deeply embedded cognitive architecture. The brain's tendency to categorise information rapidly—a process rooted in evolutionary survival mechanisms—generates unconscious associations that can distort perception, judgement, and behaviour long before conscious reasoning has any opportunity to intervene.\n\nFunctional neuroimaging studies demonstrate that the amygdala, a structure primarily associated with threat detection and emotional processing, activates differentially when individuals encounter faces belonging to unfamiliar social groups. This automatic response precedes deliberate thought by several hundred milliseconds, suggesting that implicit bias operates below the threshold of conscious awareness. Critically, these patterns appear across individuals who explicitly endorse egalitarian values, indicating a significant dissociation between stated beliefs and neurological reality.\n\nHowever, contemporary neuroscientists caution against interpreting these findings as evidence that bias is immutable. Neuroplasticity—the brain's remarkable capacity to reorganise itself through experience—offers genuine grounds for optimism. Targeted interventions, including perspective-taking exercises, counter-stereotypical exposure, and mindfulness training, have demonstrated measurable effects on implicit association patterns, suggesting that deliberate practice can gradually recalibrate ingrained neural responses.	أعادت الأبحاث العلمية في مجال الأعصاب تشكيل فهمنا للتحيّز البشري تشكيلًا جذريًّا، كاشفةً أن التعصب ليس مجرد إخفاق أخلاقي، بل هو نتاج بنية معرفية راسخة في أعماق الدماغ. إن ميل الدماغ إلى تصنيف المعلومات بسرعة—وهو ميل متجذّر في آليات البقاء التطورية—يُفرز ارتباطات لا شعورية قادرة على تشويه الإدراك والحكم والسلوك قبل أن تتاح أي فرصة للتفكير الواعي للتدخّل.\n\nتُثبت دراسات التصوير العصبي الوظيفي أن اللوزة الدماغية، وهي بنية ترتبط أساسًا برصد التهديدات والمعالجة الانفعالية، تنشط بصورة تفاضلية حين يُصادف الأفراد وجوهًا تنتمي إلى مجموعات اجتماعية غير مألوفة. يسبق هذا الاستجابة الآلية التفكيرَ المتأنيَّ بعدة مئات من الميلي ثانية، مما يوحي بأن التحيّز الضمني يعمل دون عتبة الوعي. والأهم من ذلك أن هذه الأنماط تظهر لدى أفراد يُجاهرون بتبنّي القيم المساواتية، مما يكشف عن انفصال واضح بين المعتقدات المُعلنة والواقع العصبي.\n\nغير أن علماء الأعصاب المعاصرين يُحذّرون من تفسير هذه النتائج دليلًا على أن التحيّز لا يتغيّر. فاللدونة العصبية—قدرة الدماغ الرائعة على إعادة تنظيم نفسه عبر التجربة—تمنح أسبابًا حقيقية للتفاؤل. وقد أثبتت تدخّلات موجَّهة، تشمل تمارين استحضار المنظور والتعرّض لنماذج مضادة للقوالب النمطية والتدريب على اليقظة الذهنية، تأثيرات قابلة للقياس في أنماط الارتباط الضمني، مما يُشير إلى أن الممارسة المقصودة قادرة على معايرة الاستجابات العصبية الراسخة تدريجيًّا.	C1	42	2026-04-09 21:50:39.018358+00
193	Financial Globalisation Versus National Sovereignty	العولمة المالية في مواجهة السيادة الوطنية	The accelerating integration of global financial markets has created a profound and often uncomfortable tension with the principle of national sovereignty. As capital flows across borders with unprecedented speed and volume, governments find their capacity to pursue independent macroeconomic policies increasingly constrained by the expectations and reactions of international investors, credit rating agencies, and supranational institutions.\n\nThis dynamic became strikingly apparent during the European sovereign debt crisis of the early 2010s, when market pressure compelled several democratically elected governments to implement austerity programmes that their own populations had explicitly rejected at the ballot box. Critics argued that financial markets had effectively assumed a governing function traditionally reserved for elected legislatures, subordinating social welfare priorities to the demands of creditor confidence. The phenomenon raises fundamental questions about democratic legitimacy in an era of deeply interconnected capital markets.\n\nProponents of financial globalisation counter that open capital markets discipline irresponsible fiscal behaviour, allocate resources more efficiently than state planning, and ultimately expand prosperity for participating economies. The debate remains unresolved, reflecting a deeper philosophical disagreement about whether economic efficiency and democratic self-determination can be genuinely reconciled within existing international financial architecture.	أفرز التكامل المتسارع للأسواق المالية العالمية توترًا عميقًا وغير مريح في أغلب الأحيان مع مبدأ السيادة الوطنية. إذ تجد الحكومات، مع تدفّق رأس المال عبر الحدود بسرعة وحجم غير مسبوقَين، أن قدرتها على انتهاج سياسات اقتصادية كلية مستقلة باتت مقيّدة بصورة متزايدة بتوقعات المستثمرين الدوليين ووكالات التصنيف الائتماني والمؤسسات فوق الوطنية وردود أفعالهم.\n\nتجلّت هذه الديناميكية بوضوح لافت خلال أزمة الديون السيادية الأوروبية في مطلع العقد الثاني من الألفية الثالثة، حين أرغم ضغط الأسواق حكومات منتخبة ديمقراطيًّا على تطبيق برامج تقشف رفضها الناخبون صراحةً في صناديق الاقتراع. ورأى المنتقدون أن الأسواق المالية قد اضطلعت فعليًّا بوظيفة حُكمية كانت تقليديًّا حكرًا على الهيئات التشريعية المنتخبة، مُخضِعةً أولويات الرفاه الاجتماعي لمتطلبات ثقة الدائنين. وتطرح هذه الظاهرة تساؤلات جوهرية حول الشرعية الديمقراطية في عصر الأسواق الرأسمالية البالغة الترابط.\n\nفي المقابل، يحتج المؤيدون للعولمة المالية بأن الأسواق الرأسمالية المفتوحة تُرسّخ الانضباط المالي وتُعاقب على السلوك المالي المتهوّر، وتُخصّص الموارد بكفاءة تفوق التخطيط الحكومي، وتُوسّع الرخاء في نهاية المطاف للاقتصادات المندمجة فيها. ولا يزال هذا الجدل معلّقًا دون حسم، عاكسًا خلافًا فلسفيًّا أعمق حول إمكانية التوفيق الحقيقي بين الكفاءة الاقتصادية وتقرير المصير الديمقراطي في إطار البنية المالية الدولية القائمة.	C1	43	2026-04-09 21:50:39.032566+00
194	Trusting Experts in an Age of Doubt	الثقة بالخبراء في زمن الشك	The epistemology of expertise—the philosophical inquiry into how and why we should defer to specialist knowledge—has acquired urgent contemporary relevance. Democratic societies depend on a functional division of epistemic labour, where non-experts reasonably trust qualified specialists in fields such as medicine, climate science, and economics. Yet this trust is neither unconditional nor philosophically straightforward, and its erosion carries serious consequences for collective decision-making.\n\nPhilosophers of science distinguish between primary expertise, grounded in direct technical mastery, and meta-expertise, the capacity to evaluate competing claims without possessing first-order knowledge. Most citizens necessarily operate at the level of meta-expertise, relying on indicators such as peer review, institutional affiliation, and consensus formation to identify credible authorities. The vulnerability of this process became dramatically apparent during the COVID-19 pandemic, when genuine scientific uncertainty was frequently exploited to manufacture doubt and undermine public health compliance.\n\nA sophisticated epistemological position acknowledges that expert consensus deserves significant evidential weight without being treated as infallible. Experts can exhibit systematic biases, be captured by institutional interests, or simply be wrong. Healthy epistemic communities cultivate habits of calibrated trust—neither reflexive deference nor blanket scepticism—and maintain robust mechanisms for identifying and correcting error over time.	اكتسبت معرفيّات الخبرة—وهي التحقيق الفلسفي في كيفية تفويض المعرفة المتخصصة والمسوّغات التي تُوجب ذلك—أهمية راهنة ملحّة. تعتمد المجتمعات الديمقراطية على تقسيم وظيفي للعمل المعرفي، يثق بموجبه غير المتخصصين بصورة معقولة في المختصين المؤهلين في مجالات كالطب وعلوم المناخ والاقتصاد. بيد أن هذه الثقة ليست مطلقة ولا بسيطة فلسفيًّا، وتحمل استنزافُها تبعات جسيمة على صعيد صنع القرار الجماعي.\n\nيُميّز فلاسفة العلم بين الخبرة الأوّلية المُستندة إلى إتقان تقني مباشر، والخبرة التأمّلية التي تمثّل القدرة على تقييم الادعاءات المتنافسة دون امتلاك معرفة من الدرجة الأولى. يعمل معظم المواطنين حتمًا على مستوى الخبرة التأمّلية، متكئين على مؤشرات كالمراجعة العلمية والانتماء المؤسسي وتشكّل الإجماع لتحديد السلطات ذات المصداقية. وقد تجلّت هشاشة هذه العملية بصورة درامية خلال جائحة كوفيد-19، حين وُظّف الغموض العلمي الحقيقي كثيرًا لإنتاج الشك وتقويض الامتثال للصحة العامة.\n\nتُسلّم الموقف المعرفي الرصين بأن الإجماع الخبراتي يستحق ثقلًا استدلاليًّا كبيرًا دون أن يُعامَل معاملة المعصوم من الخطأ؛ إذ يمكن للخبراء أن يُبدوا تحيّزات ممنهجة، أو يخضعوا لمصالح مؤسسية، أو يقعوا ببساطة في الخطأ. تُنمّي المجتمعات المعرفية السليمة عادات الثقة المعايَرة—لا التفويض الانعكاسي الأعمى ولا الشك الشامل—وتُحافظ على آليات متينة لرصد الأخطاء وتصحيحها بمرور الوقت.	C1	44	2026-04-09 21:50:39.039433+00
195	Posthumanism and the Ethics of Care	ما بعد الإنسانية وأخلاقيات الرعاية	Posthumanist philosophy challenges the longstanding assumption that human beings occupy a uniquely privileged position at the centre of moral consideration. By questioning the rigid boundaries traditionally drawn between human and non-human—whether animal, technological, or ecological—posthumanist thinkers invite a fundamental reconfiguration of ethical frameworks that have dominated Western moral philosophy for centuries.\n\nThe ethics of care, originally developed within feminist philosophy to foreground relationships, vulnerability, and interdependence rather than abstract universal principles, has proven particularly generative within posthumanist discourse. Scholars such as Donna Haraway have extended care ethics beyond the human to encompass multi-species communities and human-technological assemblages, arguing that genuine moral responsibility requires attending to the needs and experiences of beings who cannot advocate for themselves within conventional political frameworks.\n\nThis reconceptualisation carries significant practical implications. It challenges industries that rely on animal exploitation, raises pressing questions about the moral status of increasingly sophisticated artificial intelligence, and foregrounds ecological relationships as morally significant rather than merely instrumentally valuable. Critics argue that expanding moral consideration so broadly risks diluting its practical force, while proponents insist that the climate and biodiversity crises make such expansion not merely intellectually compelling but existentially necessary.	تتحدّى الفلسفة ما بعد الإنسانية الافتراض الراسخ القائل بأن البشر يحتلّون موقعًا ذا امتياز فريد في قلب الاعتبار الأخلاقي. وبتشكيكها في الحدود الصارمة التي رُسمت تاريخيًّا بين الإنسان وما عداه—سواء أكان حيوانًا أم تكنولوجيًّا أم بيئيًّا—تدعو الفلسفة ما بعد الإنسانية إلى إعادة تشكيل جذرية للأطر الأخلاقية التي هيمنت على الفلسفة الأخلاقية الغربية لقرون.\n\nأثبتت أخلاقيات الرعاية، التي طوّرتها الفلسفة النسوية أصلًا لإبراز العلاقات والهشاشة والترابط المتبادل بدلًا من المبادئ الكونية المجردة، غنىً استثنائيًّا في صميم الخطاب ما بعد الإنساني. وقد مدّ باحثون من أمثال دونا هاراواي أخلاقيات الرعاية لتتخطّى الإنسان وتشمل مجتمعات متعددة الأنواع ومجمّعات إنسانية-تكنولوجية، مُحتجّين بأن المسؤولية الأخلاقية الحقيقية تستلزم الانتباه إلى احتياجات وتجارب الكائنات التي لا تملك التعبير عن نفسها داخل الأطر السياسية التقليدية.\n\nيحمل هذا التصوّر الجديد تداعيات عملية بالغة الأهمية؛ إذ يتحدّى الصناعات المعتمِدة على استغلال الحيوان، ويطرح تساؤلات ملحّة حول الوضع الأخلاقي للذكاء الاصطناعي المتطور بصورة متصاعدة، ويُبرز العلاقات البيئية بوصفها ذات دلالة أخلاقية لا مجرد قيمة أداتية. ويرى المنتقدون أن توسيع دائرة الاعتبار الأخلاقي إلى هذا الحد يُخاطر بتخفيف قوّتها العملية، بينما يصرّ المؤيدون على أن أزمتَي المناخ والتنوع البيولوجي تجعل هذا التوسيع ليس مقنعًا فكريًّا فحسب، بل ضرورة وجودية لا مناص منها.	C1	45	2026-04-09 21:50:39.042675+00
196	When Knowledge Itself Becomes Unjust	حين يصبح المعرفة نفسها ظلمًا	Epistemic injustice occurs when someone is wronged specifically in their capacity as a knower — that is, as someone who acquires, shares, or contributes to knowledge. Philosopher Miranda Fricker identified two primary forms: testimonial injustice, where a speaker's credibility is unfairly deflated due to prejudice, and hermeneutical injustice, where gaps in collective understanding prevent individuals from making sense of their own experiences.\n\nIn academic settings, these forms of injustice are particularly insidious. A researcher from a marginalized background may present groundbreaking findings, only to have colleagues unconsciously discount their authority. Meanwhile, phenomena experienced by underrepresented groups — such as subtle workplace discrimination — may lack the conceptual vocabulary needed to articulate them fully, leaving those who suffer unable to name or communicate their reality.\n\nAddressing epistemic injustice requires more than policy reform. It demands a fundamental restructuring of who is considered a legitimate contributor to knowledge. Universities must actively amplify marginalized voices, diversify citation practices, and create environments where varied epistemologies are treated not as exotic alternatives but as essential perspectives. Without such transformation, academia risks perpetuating the very inequalities it claims to study.	يحدث الظلم المعرفي حين يُضار شخص ما تحديدًا بوصفه عارفًا — أي بوصفه شخصًا يكتسب المعرفة أو يشاركها أو يُسهم فيها. حددت الفيلسوفة ميراندا فريكر شكلين رئيسيين لهذا الظلم: الظلم الشهادي، حيث تُقلَّل مصداقية المتحدث بصورة غير عادلة بسبب التحيز، والظلم التأويلي، حيث تحول ثغرات في الفهم الجماعي دون قدرة الأفراد على استيعاب تجاربهم الخاصة.\n\nفي البيئات الأكاديمية، تكون هذه الأشكال من الظلم خادعةً بشكل خاص. قد يقدم باحث من خلفية مهمشة اكتشافات رائدة، ليجد أن زملاءه يُقللون من سلطته المعرفية بصورة لا واعية. في الوقت ذاته، قد تفتقر الظواهر التي تعانيها الفئات الممثلة تمثيلًا ناقصًا — كالتمييز الخفي في بيئة العمل — إلى المفردات المفاهيمية اللازمة للتعبير عنها بالكامل.\n\nيتطلب معالجة الظلم المعرفي أكثر من مجرد إصلاح سياسي؛ بل يستلزم إعادة هيكلة جذرية لمفهوم من يُعدّ مساهمًا شرعيًا في المعرفة. يجب على الجامعات تعزيز الأصوات المهمشة وتنويع ممارسات الاستشهاد المرجعي وخلق بيئات تُعامَل فيها المعارف المتنوعة باعتبارها منظورات جوهرية لا بدائل غريبة.	C1	41	2026-04-09 21:51:10.208029+00
197	Are We Truly Free to Choose?	هل نحن أحرار في الاختيار حقًا؟	The debate between free will and determinism stands among philosophy's most enduring controversies. Determinists argue that every event — including every human decision — is the inevitable consequence of prior causes, governed by physical laws. If the state of the universe at any given moment is fixed, then every subsequent thought and action is already predetermined. This view appears deeply unsettling, suggesting that personal responsibility may be an elaborate illusion.\n\nCompatibilists, however, reject this stark conclusion. Thinkers like Daniel Dennett argue that free will and determinism are not mutually exclusive. A decision made freely is not one that escapes causation, but one that originates from within the individual's own reasoning processes, rather than external coercion. On this account, freedom is not about breaking the causal chain but about being the right kind of cause.\n\nThe stakes of this debate extend well beyond abstract philosophy. Legal systems, moral frameworks, and social institutions all rest on assumptions about human agency. If determinism is true in its strongest form, our entire practice of praise, blame, and punishment requires urgent reconsideration. The question of free will is ultimately a question about what it means to be human.	يُعدّ الجدل بين الإرادة الحرة والحتمية من أكثر النقاشات الفلسفية ديمومةً واستمرارًا. يرى الحتميون أن كل حدث — بما في ذلك كل قرار بشري — هو النتيجة الحتمية لأسباب سابقة تحكمها قوانين فيزيائية. إذا كانت حالة الكون في أي لحظة معينة ثابتة، فإن كل فكرة وفعل لاحق قد تقرر مسبقًا. يبدو هذا الطرح مقلقًا للغاية، إذ يوحي بأن المسؤولية الشخصية ربما تكون وهمًا متقنًا.\n\nبيد أن التوافقيين يرفضون هذا الاستنتاج القاطع. يرى مفكرون كدانيال دينيت أن الإرادة الحرة والحتمية ليستا متناقضتين بالضرورة. فالقرار الحر ليس ذاك الذي يفلت من السببية، بل ذاك الذي ينبع من داخل عمليات التفكير الخاصة بالفرد، لا من إكراه خارجي.\n\nتمتد تداعيات هذا الجدل إلى ما هو أبعد من الفلسفة المجردة. تستند الأنظمة القانونية والأطر الأخلاقية والمؤسسات الاجتماعية كلها إلى افتراضات حول الفاعلية الإنسانية. فإذا كانت الحتمية صحيحة في صورتها الأشد، فإن ممارساتنا المتعلقة بالمديح واللوم والعقاب تستوجب إعادة نظر عاجلة. إن سؤال الإرادة الحرة هو في نهاية المطاف سؤال حول ما يعنيه أن يكون المرء إنسانًا.	C1	42	2026-04-09 21:51:10.213559+00
198	Racism Hidden in Plain Sight	العنصرية المختبئة في وضح النهار	Structural racism refers to the ways in which historical, cultural, and institutional patterns systematically disadvantage racial minorities, even in the absence of overt discriminatory intent. Unlike interpersonal racism — which involves explicit prejudice between individuals — structural racism operates through policies, norms, and resource allocation mechanisms that appear neutral on the surface but produce racially disparate outcomes.\n\nConsider housing policy in many Western nations. Decades of redlining — the practice of denying mortgages and financial services to residents of predominantly minority neighborhoods — created wealth gaps that persist across generations. Although such practices have been formally abolished, their legacy endures in segregated communities, underfunded schools, and diminished access to capital. The system continues to disadvantage minorities not because of anyone's deliberate malice, but because inequitable structures have been left unreformed.\n\nCritiques of structural racism are sometimes dismissed as politically motivated or exaggerated. Yet empirical evidence consistently demonstrates that disparities in health outcomes, educational attainment, incarceration rates, and economic mobility cannot be fully explained without accounting for systemic factors. Meaningful reform requires acknowledging that fairness cannot be achieved simply by removing explicit discrimination — the underlying structures themselves must be dismantled and rebuilt.	تشير العنصرية الهيكلية إلى الطرق التي تُضرّ بها الأنماط التاريخية والثقافية والمؤسسية بالأقليات العرقية بصورة منهجية، حتى في غياب أي نية تمييزية صريحة. فعلى خلاف العنصرية الشخصية — التي تنطوي على تحيز صريح بين الأفراد — تعمل العنصرية الهيكلية عبر السياسات والأعراف وآليات توزيع الموارد التي تبدو محايدة في ظاهرها لكنها تُفضي إلى نتائج ذات تفاوت عرقي.\n\nخذ مثلًا سياسات الإسكان في كثير من الدول الغربية. أفرزت عقود من ممارسة رفض الرهن العقاري والخدمات المالية لسكان الأحياء ذات الأغلبية الأقلية فجوات في الثروة تتوارثها الأجيال. وعلى الرغم من إلغاء هذه الممارسات رسميًا، يظل إرثها حيًا في المجتمعات المنفصلة والمدارس المحرومة من التمويل.\n\nكثيرًا ما تُرفض انتقادات العنصرية الهيكلية باعتبارها مدفوعة بدوافع سياسية أو مبالغًا فيها. غير أن الأدلة التجريبية تُثبت باستمرار أن التفاوتات في النتائج الصحية والتحصيل التعليمي ومعدلات السجن والحراك الاقتصادي لا يمكن تفسيرها بالكامل دون مراعاة العوامل المنهجية. يستلزم الإصلاح الحقيقي الاعتراف بأن العدالة لا تتحقق بمجرد إزالة التمييز الصريح — بل يجب هدم الهياكل الأساسية وإعادة بناؤها.	C1	43	2026-04-09 21:51:10.216955+00
199	Education as a Market Commodity	التعليم بوصفه سلعة في السوق	The commodification of education refers to the process by which learning is increasingly treated as a product to be bought and sold rather than a public good with inherent social value. This shift has been accelerated by neoliberal reforms that prioritize market efficiency, institutional competition, and consumer choice as organizing principles for educational systems worldwide.\n\nIn practice, commodification manifests in rising tuition fees, the corporatization of university governance, and the growing emphasis on credentials as economic investments rather than intellectual development. Students are repositioned as consumers seeking a return on investment, while universities compete for rankings, research funding, and fee-paying international students. Academic disciplines that cannot demonstrate immediate market relevance — the humanities, pure sciences, and the arts — face systematic defunding and marginalization.\n\nCritics argue that this transformation fundamentally distorts education's purpose. When learning becomes primarily a transaction, critical thinking, civic engagement, and the pursuit of knowledge for its own sake are gradually eroded. Universities risk becoming sophisticated vocational training centers rather than spaces of intellectual inquiry. Reversing this trend requires reconceptualizing education as a collective investment in democratic citizenship rather than a private commodity serving individual economic ambition.	تشير تسليع التعليم إلى العملية التي يُعامَل فيها التعلم بصورة متزايدة باعتباره منتجًا يُباع ويُشترى بدلًا من كونه سلعة عامة ذات قيمة اجتماعية جوهرية. تسارعت هذه التحولات بفعل الإصلاحات الليبرالية الجديدة التي تُعلي من شأن كفاءة السوق والتنافس المؤسسي وخيار المستهلك بوصفها مبادئ منظِّمة للأنظمة التعليمية حول العالم.\n\nفي الواقع العملي، يتجلى التسليع في ارتفاع رسوم التعليم، وتحوّل إدارة الجامعات نحو النمط المؤسسي، والتركيز المتنامي على الشهادات باعتبارها استثمارات اقتصادية لا تطورًا فكريًا. يُعاد تأطير الطلاب بوصفهم مستهلكين يسعون لتحقيق عائد على استثمارهم، فيما تتنافس الجامعات على التصنيفات والتمويل البحثي والطلاب الدوليين.\n\nيرى المنتقدون أن هذا التحول يُشوه الغاية الجوهرية للتعليم. حين يصبح التعلم معاملةً تجارية في المقام الأول، يتآكل التفكير النقدي والانخراط المدني والسعي إلى المعرفة لذاتها تدريجيًا. تخاطر الجامعات بأن تتحول إلى مراكز تدريب مهني متطورة بدلًا من أن تكون فضاءات للبحث الفكري. يستلزم عكس هذا الاتجاه إعادة تصور التعليم بوصفه استثمارًا جماعيًا في المواطنة الديمقراطية لا سلعة خاصة تخدم الطموح الاقتصادي الفردي.	C1	44	2026-04-09 21:51:10.22102+00
200	Truth in Crisis, Democracy Under Threat	الحقيقة في أزمة والديمقراطية في خطر	Post-truth politics describes a political culture in which emotional appeals and tribal loyalties consistently override factual evidence in shaping public discourse and electoral behavior. The term gained widespread currency following the Brexit referendum and the 2016 US presidential election, both of which were characterized by the strategic deployment of misinformation and the systematic undermining of expert authority.\n\nThe erosion of shared epistemic standards poses a profound challenge to democratic governance. Democracy presupposes an informed citizenry capable of evaluating competing claims rationally. When politicians deliberately blur the line between fact and opinion, and when media ecosystems fragment into ideologically homogeneous echo chambers, the common informational foundation required for meaningful democratic deliberation begins to collapse. Disinformation spreads not merely because people lack critical literacy, but because partisan identity increasingly determines what individuals are willing to accept as true.\n\nAddressing democratic erosion in a post-truth environment demands more than fact-checking initiatives. It requires rebuilding institutional trust, reforming platform incentive structures that reward outrage over accuracy, and cultivating a civic culture that values intellectual honesty. Without these foundations, elections risk becoming contests of narrative manipulation rather than genuine expressions of informed popular will.	تصف سياسة ما بعد الحقيقة ثقافةً سياسية تتغلب فيها النداءات العاطفية والولاءات القبلية باستمرار على الأدلة الواقعية في تشكيل الخطاب العام والسلوك الانتخابي. اكتسب هذا المصطلح انتشارًا واسعًا في أعقاب استفتاء بريكست والانتخابات الرئاسية الأمريكية عام 2016، اللذين اتسما بالتوظيف الاستراتيجي للمعلومات المضللة والتقويض المنهجي لسلطة الخبراء.\n\nيُشكل تآكل المعايير المعرفية المشتركة تحديًا عميقًا للحوكمة الديمقراطية. تفترض الديمقراطية وجود مواطنين مطّلعين قادرين على تقييم الادعاءات المتنافسة بصورة عقلانية. حين يعمد السياسيون عمدًا إلى طمس الحدود بين الحقيقة والرأي، وحين تتشرذم بيئات الإعلام إلى غرف صدى أيديولوجية متجانسة، يبدأ الأساس المعلوماتي المشترك اللازم للتداول الديمقراطي الحقيقي في الانهيار.\n\nيتطلب التصدي للتآكل الديمقراطي في بيئة ما بعد الحقيقة أكثر من مجرد مبادرات للتحقق من الحقائق. بل يستوجب إعادة بناء الثقة المؤسسية، وإصلاح هياكل حوافز المنصات الرقمية التي تكافئ الاستفزاز على حساب الدقة، وتنمية ثقافة مدنية تُقدّر النزاهة الفكرية. بدون هذه الأسس، تخاطر الانتخابات بأن تصبح مسابقات في التلاعب بالروايات لا تعبيرات حقيقية عن الإرادة الشعبية الواعية.	C1	45	2026-04-09 21:51:10.224671+00
\.


--
-- Data for Name: story_quizzes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."story_quizzes" ("id", "story_id", "questions", "created_at") FROM stdin;
\.


--
-- Data for Name: user_data; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."user_data" ("id", "email", "key", "value", "updated_at") FROM stdin;
58	push-a-lsvqwb@test.com	tour_completed	1	2026-04-24 19:36:43.514+00
59	e2e-plan-tgulxo2k@test.com	persistent_session	35e11ffa4d09e3616c3019c51dbb22c649ebf9c3585926ea3c0ddaf9aacfee41	2026-04-26 15:49:27.017+00
60	e2e-plan-npxuywmv@test.com	persistent_session	cdafff3274e321149c10447522551bd8922cf739cb368e2347c3e2e78c63e721	2026-04-26 15:52:57.159+00
61	e2e-plan-npxuywmv@test.com	current_level	B1	2026-04-26 15:54:15.917+00
62	e2e-plan-npxuywmv@test.com	plan_duration_days	120	2026-04-26 15:54:15.919+00
63	e2e-plan-npxuywmv@test.com	exam_date	not_set	2026-04-26 15:54:15.935+00
64	e2e-plan-npxuywmv@test.com	plan_start_date	2026-04-26	2026-04-26 15:54:15.937+00
65	e2e-plan-npxuywmv@test.com	target_band	7	2026-04-26 15:54:15.941+00
10	mocktest@test.com	persistent_session	9c574409d096532deccc65e4f5611295ae837440848d61836712c0d8e27b4ba2	2026-04-16 06:25:01.98+00
13	onboard@test.com	target_band	7	2026-04-16 06:35:02.041+00
14	onboard@test.com	exam_date	2026-05-16	2026-04-16 06:35:02.039+00
66	e2e-plan-npxuywmv@test.com	tour_completed	1	2026-04-26 15:54:58.133+00
12	onboard@test.com	persistent_session	7bc873c102c54c01bcab55f7aa936e773ed4d683d7f14d507893c2c3ae8ef355	2026-04-16 06:36:06.325+00
19	nodate@test.com	target_band	7.5	2026-04-16 06:41:00.797+00
20	nodate@test.com	exam_date	not_set	2026-04-16 06:41:00.799+00
18	nodate@test.com	persistent_session	c3fe66637569e8b5c6923f931a7ae6d9a919d907c8b450149841a6d9e90c5606	2026-04-16 06:41:09.993+00
24	teacher@example.com	persistent_session	d5eb8249d0564f474e7ded508d4dc73310f78ceaad3b305e2c9813e971e16722	2026-04-16 19:40:54.031+00
42	test@example.com	ielts_speaking_used_topics	["Reading"]	2026-04-20 16:51:57.822+00
1	test@example.com	persistent_session	2215a5bf88442eda8fecd62cba4899ddd783e2adc9becb51335ca4a84d0ca9fa	2026-04-20 17:11:24.083+00
47	smoke3@example.com	persistent_session	45626b6405ff16f22e05bae2d0d7fefb978527fca2cbfa819f8e41d8f5539333	2026-04-21 09:35:15.533+00
50	test-student@example.com	current_level	B1	2026-04-24 19:06:43.391+00
51	stud-a-rrhv9x@test.com	current_level	B1	2026-04-24 19:11:04.517+00
53	stud-a-rrhv9x@test.com	persistent_session	a007051e7ebe0479fbd3c78d8c10404b510986933c019f923bc566690773bdef	2026-04-24 19:12:11.012+00
54	push-a-lsvqwb@test.com	persistent_session	32b2d77cd166922e6593e2cb196622122f2e41534d605d12a5520936a72dbd4a	2026-04-24 19:34:31.042+00
55	push-a-lsvqwb@test.com	current_level	B2	2026-04-24 19:36:26.13+00
56	push-a-lsvqwb@test.com	exam_date	not_set	2026-04-24 19:36:26.143+00
57	push-a-lsvqwb@test.com	target_band	7	2026-04-24 19:36:26.144+00
\.


--
-- Data for Name: weak_words; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."weak_words" ("id", "email", "flashcard_id", "wrong_count", "last_wrong_at") FROM stdin;
\.


--
-- Data for Name: xp_events; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."xp_events" ("id", "email", "activity", "xp", "created_at") FROM stdin;
1	test@example.com	quiz_correct	50	2026-04-16 05:11:39.64729+00
2	test@example.com	flashcard_review	2	2026-04-16 05:11:57.577403+00
3	test@example.com	essay_check	10	2026-04-20 16:47:03.139533+00
4	test@example.com	essay_check	10	2026-04-20 16:51:06.286805+00
\.


--
-- Name: access_codes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."access_codes_id_seq"', 8, true);


--
-- Name: access_requests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."access_requests_id_seq"', 22, true);


--
-- Name: activity_positions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."activity_positions_id_seq"', 2, true);


--
-- Name: admin_alerts_sent_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."admin_alerts_sent_id_seq"', 2, true);


--
-- Name: ai_usage_events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."ai_usage_events_id_seq"', 4, true);


--
-- Name: bookmarks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."bookmarks_id_seq"', 1, false);


--
-- Name: card_srs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."card_srs_id_seq"', 1, false);


--
-- Name: flashcards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."flashcards_id_seq"', 3000, true);


--
-- Name: lesson_completions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."lesson_completions_id_seq"', 1, false);


--
-- Name: lessons_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."lessons_id_seq"', 2, true);


--
-- Name: notification_reads_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."notification_reads_id_seq"', 2, true);


--
-- Name: notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."notifications_id_seq"', 11, true);


--
-- Name: orwell_coach_summaries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."orwell_coach_summaries_id_seq"', 1, false);


--
-- Name: orwell_submissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."orwell_submissions_id_seq"', 3, true);


--
-- Name: progress_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."progress_id_seq"', 3, true);


--
-- Name: push_subscriptions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."push_subscriptions_id_seq"', 2, true);


--
-- Name: quiz_scores_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."quiz_scores_id_seq"', 1, true);


--
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."reviews_id_seq"', 1, true);


--
-- Name: sentence_sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."sentence_sessions_id_seq"', 1, false);


--
-- Name: stories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."stories_id_seq"', 200, true);


--
-- Name: story_quizzes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."story_quizzes_id_seq"', 1, false);


--
-- Name: user_data_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."user_data_id_seq"', 86, true);


--
-- Name: weak_words_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."weak_words_id_seq"', 1, true);


--
-- Name: xp_events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."xp_events_id_seq"', 4, true);


--
-- Name: access_codes access_codes_code_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."access_codes"
    ADD CONSTRAINT "access_codes_code_unique" UNIQUE ("code");


--
-- Name: access_codes access_codes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."access_codes"
    ADD CONSTRAINT "access_codes_pkey" PRIMARY KEY ("id");


--
-- Name: access_requests access_requests_email_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."access_requests"
    ADD CONSTRAINT "access_requests_email_unique" UNIQUE ("email");


--
-- Name: access_requests access_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."access_requests"
    ADD CONSTRAINT "access_requests_pkey" PRIMARY KEY ("id");


--
-- Name: activity_positions activity_positions_email_activity_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."activity_positions"
    ADD CONSTRAINT "activity_positions_email_activity_unique" UNIQUE ("email", "activity");


--
-- Name: activity_positions activity_positions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."activity_positions"
    ADD CONSTRAINT "activity_positions_pkey" PRIMARY KEY ("id");


--
-- Name: admin_alerts_sent admin_alerts_sent_alert_key_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."admin_alerts_sent"
    ADD CONSTRAINT "admin_alerts_sent_alert_key_unique" UNIQUE ("alert_key");


--
-- Name: admin_alerts_sent admin_alerts_sent_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."admin_alerts_sent"
    ADD CONSTRAINT "admin_alerts_sent_pkey" PRIMARY KEY ("id");


--
-- Name: ai_usage_events ai_usage_events_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."ai_usage_events"
    ADD CONSTRAINT "ai_usage_events_pkey" PRIMARY KEY ("id");


--
-- Name: bookmarks bookmarks_flashcard_id_email_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."bookmarks"
    ADD CONSTRAINT "bookmarks_flashcard_id_email_unique" UNIQUE ("flashcard_id", "email");


--
-- Name: bookmarks bookmarks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."bookmarks"
    ADD CONSTRAINT "bookmarks_pkey" PRIMARY KEY ("id");


--
-- Name: card_srs card_srs_flashcard_id_email_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."card_srs"
    ADD CONSTRAINT "card_srs_flashcard_id_email_unique" UNIQUE ("flashcard_id", "email");


--
-- Name: card_srs card_srs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."card_srs"
    ADD CONSTRAINT "card_srs_pkey" PRIMARY KEY ("id");


--
-- Name: flashcards flashcards_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."flashcards"
    ADD CONSTRAINT "flashcards_pkey" PRIMARY KEY ("id");


--
-- Name: lesson_completions lesson_completions_email_lesson_id_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."lesson_completions"
    ADD CONSTRAINT "lesson_completions_email_lesson_id_unique" UNIQUE ("email", "lesson_id");


--
-- Name: lesson_completions lesson_completions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."lesson_completions"
    ADD CONSTRAINT "lesson_completions_pkey" PRIMARY KEY ("id");


--
-- Name: lessons lessons_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."lessons"
    ADD CONSTRAINT "lessons_pkey" PRIMARY KEY ("id");


--
-- Name: notification_reads notification_reads_notification_id_email_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."notification_reads"
    ADD CONSTRAINT "notification_reads_notification_id_email_unique" UNIQUE ("notification_id", "email");


--
-- Name: notification_reads notification_reads_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."notification_reads"
    ADD CONSTRAINT "notification_reads_pkey" PRIMARY KEY ("id");


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."notifications"
    ADD CONSTRAINT "notifications_pkey" PRIMARY KEY ("id");


--
-- Name: orwell_coach_summaries orwell_coach_summaries_email_at_submission_count_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."orwell_coach_summaries"
    ADD CONSTRAINT "orwell_coach_summaries_email_at_submission_count_unique" UNIQUE ("email", "at_submission_count");


--
-- Name: orwell_coach_summaries orwell_coach_summaries_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."orwell_coach_summaries"
    ADD CONSTRAINT "orwell_coach_summaries_pkey" PRIMARY KEY ("id");


--
-- Name: orwell_submissions orwell_submissions_email_assignment_id_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."orwell_submissions"
    ADD CONSTRAINT "orwell_submissions_email_assignment_id_unique" UNIQUE ("email", "assignment_id");


--
-- Name: orwell_submissions orwell_submissions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."orwell_submissions"
    ADD CONSTRAINT "orwell_submissions_pkey" PRIMARY KEY ("id");


--
-- Name: progress progress_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."progress"
    ADD CONSTRAINT "progress_pkey" PRIMARY KEY ("id");


--
-- Name: push_subscriptions push_subscriptions_email_endpoint_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."push_subscriptions"
    ADD CONSTRAINT "push_subscriptions_email_endpoint_unique" UNIQUE ("email", "endpoint");


--
-- Name: push_subscriptions push_subscriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."push_subscriptions"
    ADD CONSTRAINT "push_subscriptions_pkey" PRIMARY KEY ("id");


--
-- Name: quiz_scores quiz_scores_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."quiz_scores"
    ADD CONSTRAINT "quiz_scores_pkey" PRIMARY KEY ("id");


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."reviews"
    ADD CONSTRAINT "reviews_pkey" PRIMARY KEY ("id");


--
-- Name: sentence_sessions sentence_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."sentence_sessions"
    ADD CONSTRAINT "sentence_sessions_pkey" PRIMARY KEY ("id");


--
-- Name: settings settings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."settings"
    ADD CONSTRAINT "settings_pkey" PRIMARY KEY ("key");


--
-- Name: stories stories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."stories"
    ADD CONSTRAINT "stories_pkey" PRIMARY KEY ("id");


--
-- Name: story_quizzes story_quizzes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."story_quizzes"
    ADD CONSTRAINT "story_quizzes_pkey" PRIMARY KEY ("id");


--
-- Name: story_quizzes story_quizzes_story_id_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."story_quizzes"
    ADD CONSTRAINT "story_quizzes_story_id_unique" UNIQUE ("story_id");


--
-- Name: user_data user_data_email_key_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."user_data"
    ADD CONSTRAINT "user_data_email_key_unique" UNIQUE ("email", "key");


--
-- Name: user_data user_data_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."user_data"
    ADD CONSTRAINT "user_data_pkey" PRIMARY KEY ("id");


--
-- Name: weak_words weak_words_email_flashcard_id_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."weak_words"
    ADD CONSTRAINT "weak_words_email_flashcard_id_unique" UNIQUE ("email", "flashcard_id");


--
-- Name: weak_words weak_words_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."weak_words"
    ADD CONSTRAINT "weak_words_pkey" PRIMARY KEY ("id");


--
-- Name: xp_events xp_events_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."xp_events"
    ADD CONSTRAINT "xp_events_pkey" PRIMARY KEY ("id");


--
-- Name: notification_reads_email_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "notification_reads_email_idx" ON "public"."notification_reads" USING "btree" ("email");


--
-- Name: notifications_scheduled_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "notifications_scheduled_at_idx" ON "public"."notifications" USING "btree" ("scheduled_at") WHERE ("sent_at" IS NULL);


--
-- Name: notifications_sent_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "notifications_sent_at_idx" ON "public"."notifications" USING "btree" ("sent_at");


--
-- Name: xp_events_email_activity_created_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "xp_events_email_activity_created_idx" ON "public"."xp_events" USING "btree" ("email", "activity", "created_at");


--
-- Name: xp_events_email_created_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "xp_events_email_created_idx" ON "public"."xp_events" USING "btree" ("email", "created_at");


--
-- Name: bookmarks bookmarks_flashcard_id_flashcards_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."bookmarks"
    ADD CONSTRAINT "bookmarks_flashcard_id_flashcards_id_fk" FOREIGN KEY ("flashcard_id") REFERENCES "public"."flashcards"("id") ON DELETE CASCADE;


--
-- Name: card_srs card_srs_flashcard_id_flashcards_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."card_srs"
    ADD CONSTRAINT "card_srs_flashcard_id_flashcards_id_fk" FOREIGN KEY ("flashcard_id") REFERENCES "public"."flashcards"("id") ON DELETE CASCADE;


--
-- Name: lesson_completions lesson_completions_lesson_id_lessons_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."lesson_completions"
    ADD CONSTRAINT "lesson_completions_lesson_id_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE CASCADE;


--
-- Name: notification_reads notification_reads_notification_id_notifications_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."notification_reads"
    ADD CONSTRAINT "notification_reads_notification_id_notifications_id_fk" FOREIGN KEY ("notification_id") REFERENCES "public"."notifications"("id") ON DELETE CASCADE;


--
-- Name: progress progress_flashcard_id_flashcards_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."progress"
    ADD CONSTRAINT "progress_flashcard_id_flashcards_id_fk" FOREIGN KEY ("flashcard_id") REFERENCES "public"."flashcards"("id") ON DELETE CASCADE;


--
-- Name: story_quizzes story_quizzes_story_id_stories_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."story_quizzes"
    ADD CONSTRAINT "story_quizzes_story_id_stories_id_fk" FOREIGN KEY ("story_id") REFERENCES "public"."stories"("id") ON DELETE CASCADE;


--
-- Name: weak_words weak_words_flashcard_id_flashcards_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."weak_words"
    ADD CONSTRAINT "weak_words_flashcard_id_flashcards_id_fk" FOREIGN KEY ("flashcard_id") REFERENCES "public"."flashcards"("id") ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict bXiFQc2afINAldANjUdR18kaHL6hHpZCuUM3V02tanvHhp7qp9OWkIk3rb1kPP5

