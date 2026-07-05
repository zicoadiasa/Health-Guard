-- ============================================================
-- HealthGuard v2.0
-- Remaining Tables
-- PostgreSQL / Supabase
-- ============================================================

begin;

-- ============================================================
-- REMINDERS
-- ============================================================

create table reminders (

    id uuid primary key,

    user_id uuid not null,

    title varchar(150) not null,

    description text,

    reminder_type reminder_type_enum not null,

    reminder_time timestamp not null,

    status reminder_status_enum not null,

    created_at timestamp not null default now(),

    updated_at timestamp not null default now(),

    deleted_at timestamp

);

-- ============================================================
-- AI INSIGHTS
-- ============================================================

create table ai_insights (

    id uuid primary key,

    user_id uuid not null,

    goal_id uuid,

    insight_type insight_type_enum not null,

    title varchar(150) not null,

    content text not null,

    generated_at timestamp not null,

    created_at timestamp not null default now(),

    updated_at timestamp not null default now(),

    deleted_at timestamp

);

-- ============================================================
-- WEEKLY REPORTS
-- ============================================================

create table weekly_reports (

    id uuid primary key,

    user_id uuid not null,

    goal_id uuid,

    week_start date not null,

    week_end date not null,

    summary text,

    generated_at timestamp not null,

    created_at timestamp not null default now(),

    updated_at timestamp not null default now(),

    deleted_at timestamp

);

-- ============================================================
-- ACHIEVEMENTS
-- ============================================================

create table achievements (

    id uuid primary key,

    user_id uuid not null,

    achievement_type achievement_type_enum not null,

    title varchar(150) not null,

    description text,

    achieved_at timestamp not null,

    created_at timestamp not null default now(),

    updated_at timestamp not null default now(),

    deleted_at timestamp

);

-- ============================================================
-- STREAKS
-- ============================================================

create table streaks (

    id uuid primary key,

    user_id uuid not null,

    streak_name varchar(100) not null,

    current_count integer not null,

    best_count integer,

    last_recorded_at timestamp,

    created_at timestamp not null default now(),

    updated_at timestamp not null default now(),

    deleted_at timestamp

);

-- ============================================================
-- NOTIFICATIONS
-- ============================================================

create table notifications (

    id uuid primary key,

    user_id uuid not null,

    reminder_id uuid,

    notification_type notification_type_enum not null,

    title varchar(150) not null,

    message text not null,

    status notification_status_enum not null,

    sent_at timestamp,

    read_at timestamp,

    created_at timestamp not null default now(),

    updated_at timestamp not null default now(),

    deleted_at timestamp

);

-- ============================================================
-- DEVICES
-- ============================================================

create table devices (

    id uuid primary key,

    user_id uuid not null,

    device_name varchar(150),

    platform device_platform_enum not null,

    device_token text not null,

    last_active_at timestamp,

    created_at timestamp not null default now(),

    updated_at timestamp not null default now(),

    deleted_at timestamp

);

commit;