-- ============================================================
-- HealthGuard v2.0
-- Create Tables
-- PostgreSQL / Supabase
-- ============================================================

begin;

-- ============================================================
-- USERS
-- ============================================================

create table users (

    id uuid primary key,

    full_name varchar(150) not null,

    email varchar(255) not null unique,

    avatar_url text,

    created_at timestamp not null default now(),

    updated_at timestamp not null default now(),

    deleted_at timestamp

);

-- ============================================================
-- HEALTH PROFILES
-- ============================================================

create table health_profiles (

    id uuid primary key,

    user_id uuid not null unique,

    gender gender_enum not null,

    birth_date date,

    height_cm decimal(5,2) not null,

    weight_kg decimal(5,2) not null,

    diabetes_type diabetes_type_enum,

    activity_level activity_level_enum,

    daily_calorie_target integer,

    created_at timestamp not null default now(),

    updated_at timestamp not null default now(),

    deleted_at timestamp

);

-- ============================================================
-- GOALS
-- ============================================================

create table goals (

    id uuid primary key,

    user_id uuid not null,

    goal_type goal_type_enum not null,

    target_value decimal(10,2),

    current_value decimal(10,2),

    unit varchar(30),

    start_date date,

    target_date date,

    status goal_status_enum not null,

    notes text,

    created_at timestamp not null default now(),

    updated_at timestamp not null default now(),

    deleted_at timestamp

);

-- ============================================================
-- FAVORITE FOODS
-- ============================================================

create table favorite_foods (

    id uuid primary key,

    user_id uuid not null,

    food_name varchar(150) not null,

    category food_category_enum,

    calories integer,

    created_at timestamp not null default now(),

    updated_at timestamp not null default now(),

    deleted_at timestamp

);

-- ============================================================
-- MEAL PLANS
-- ============================================================

create table meal_plans (

    id uuid primary key,

    user_id uuid not null,

    title varchar(150) not null,

    plan_date date not null,

    total_calories integer,

    status meal_plan_status_enum not null default 'active',

    created_at timestamp not null default now(),

    updated_at timestamp not null default now(),

    deleted_at timestamp

);

-- ============================================================
-- MEAL ITEMS
-- ============================================================

create table meal_items (

    id uuid primary key,

    meal_plan_id uuid not null,

    food_name varchar(150) not null,

    meal_type meal_type_enum not null,

    serving_size decimal(6,2),

    calories integer,

    protein decimal(6,2),

    carbohydrates decimal(6,2),

    fat decimal(6,2),

    fiber decimal(6,2),

    sugar decimal(6,2),

    created_at timestamp not null default now(),

    updated_at timestamp not null default now(),

    deleted_at timestamp

);

-- ============================================================
-- FOOD ALTERNATIVES
-- ============================================================

create table food_alternatives (

    id uuid primary key,

    user_id uuid not null,

    meal_item_id uuid,

    original_food varchar(150) not null,

    alternative_food varchar(150) not null,

    reason text,

    created_at timestamp not null default now(),

    updated_at timestamp not null default now(),

    deleted_at timestamp

);

-- ============================================================
-- FOOD LOGS
-- ============================================================

create table food_logs (

    id uuid primary key,

    user_id uuid not null,

    meal_item_id uuid,

    food_name varchar(150) not null,

    meal_type meal_type_enum,

    serving_size decimal(6,2),

    calories integer,

    protein decimal(6,2),

    carbohydrates decimal(6,2),

    fat decimal(6,2),

    fiber decimal(6,2),

    sugar decimal(6,2),

    consumed_at timestamp not null,

    notes text,

    created_at timestamp not null default now(),

    updated_at timestamp not null default now(),

    deleted_at timestamp

);

-- ============================================================
-- ACTIVITY LOGS
-- ============================================================

create table activity_logs (

    id uuid primary key,

    user_id uuid not null,

    activity_type activity_type_enum not null,

    duration_minutes integer,

    calories_burned integer,

    activity_date date,

    notes text,

    created_at timestamp not null default now(),

    updated_at timestamp not null default now(),

    deleted_at timestamp

);

-- ============================================================
-- BLOOD SUGAR LOGS
-- ============================================================

create table blood_sugar_logs (

    id uuid primary key,

    user_id uuid not null,

    blood_sugar_level decimal(5,2) not null,

    measured_at timestamp not null,

    notes text,

    created_at timestamp not null default now(),

    updated_at timestamp not null default now(),

    deleted_at timestamp

);

-- ============================================================
-- WEIGHT LOGS
-- ============================================================

create table weight_logs (

    id uuid primary key,

    user_id uuid not null,

    weight_kg decimal(5,2) not null,

    recorded_at timestamp not null,

    notes text,

    created_at timestamp not null default now(),

    updated_at timestamp not null default now(),

    deleted_at timestamp

);

commit;