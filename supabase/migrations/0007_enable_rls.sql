-- ============================================================
-- HealthGuard v2.0
-- Enable Row Level Security
-- PostgreSQL / Supabase
-- ============================================================

begin;

alter table users enable row level security;

alter table health_profiles enable row level security;

alter table goals enable row level security;

alter table favorite_foods enable row level security;

alter table meal_plans enable row level security;

alter table meal_items enable row level security;

alter table food_alternatives enable row level security;

alter table food_logs enable row level security;

alter table activity_logs enable row level security;

alter table blood_sugar_logs enable row level security;

alter table weight_logs enable row level security;

alter table reminders enable row level security;

alter table ai_insights enable row level security;

alter table weekly_reports enable row level security;

alter table achievements enable row level security;

alter table streaks enable row level security;

alter table notifications enable row level security;

alter table devices enable row level security;

commit;