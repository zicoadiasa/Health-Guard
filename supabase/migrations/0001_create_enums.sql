-- ============================================================
-- HealthGuard v2.0
-- Initial Database Schema
-- PostgreSQL / Supabase
-- ============================================================

begin;
create type gender_enum as enum (
    'male',
    'female'
);

create type diabetes_type_enum as enum (
    'type_1',
    'type_2',
    'prediabetes',
    'gestational'
);

create type activity_level_enum as enum (
    'sedentary',
    'light',
    'moderate',
    'active',
    'very_active'
);

create type goal_type_enum as enum (
    'lose_weight',
    'gain_weight',
    'maintain_weight',
    'reduce_blood_sugar',
    'increase_activity',
    'healthy_eating'
);

create type goal_status_enum as enum (
    'active',
    'completed',
    'cancelled'
);

create type meal_type_enum as enum (
    'breakfast',
    'lunch',
    'dinner',
    'snack'
);

create type meal_plan_status_enum as enum (
    'active',
    'completed',
    'cancelled'
);

create type food_category_enum as enum (
    'carbohydrate',
    'protein',
    'vegetable',
    'fruit',
    'dairy',
    'beverage',
    'snack',
    'other'
);

create type activity_type_enum as enum (
    'walking',
    'running',
    'cycling',
    'swimming',
    'workout',
    'yoga',
    'other'
);

create type reminder_type_enum as enum (
    'meal',
    'exercise',
    'blood_sugar',
    'medication',
    'weight',
    'custom'
);

create type reminder_status_enum as enum (
    'active',
    'inactive'
);

create type insight_type_enum as enum (
    'nutrition',
    'activity',
    'blood_sugar',
    'weight',
    'goal',
    'weekly_summary'
);

create type achievement_type_enum as enum (
    'goal_completed',
    'logging_streak',
    'healthy_eating',
    'activity_milestone',
    'blood_sugar_control'
);

create type notification_type_enum as enum (
    'reminder',
    'ai_insight',
    'weekly_report',
    'achievement',
    'system'
);

create type notification_status_enum as enum (
    'unread',
    'read'
);

create type device_platform_enum as enum (
    'android',
    'ios',
    'web'
);
commit;