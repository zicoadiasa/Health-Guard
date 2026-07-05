-- ============================================================
-- HealthGuard v2.0
-- Database Triggers
-- PostgreSQL / Supabase
-- ============================================================

begin;

-- ============================================================
-- USERS
-- ============================================================

create trigger trg_users_updated_at
before update on users
for each row
execute function update_updated_at();

-- ============================================================
-- HEALTH PROFILES
-- ============================================================

create trigger trg_health_profiles_updated_at
before update on health_profiles
for each row
execute function update_updated_at();

-- ============================================================
-- GOALS
-- ============================================================

create trigger trg_goals_updated_at
before update on goals
for each row
execute function update_updated_at();

-- ============================================================
-- FAVORITE FOODS
-- ============================================================

create trigger trg_favorite_foods_updated_at
before update on favorite_foods
for each row
execute function update_updated_at();

-- ============================================================
-- MEAL PLANS
-- ============================================================

create trigger trg_meal_plans_updated_at
before update on meal_plans
for each row
execute function update_updated_at();

-- ============================================================
-- MEAL ITEMS
-- ============================================================

create trigger trg_meal_items_updated_at
before update on meal_items
for each row
execute function update_updated_at();

-- ============================================================
-- FOOD ALTERNATIVES
-- ============================================================

create trigger trg_food_alternatives_updated_at
before update on food_alternatives
for each row
execute function update_updated_at();

-- ============================================================
-- FOOD LOGS
-- ============================================================

create trigger trg_food_logs_updated_at
before update on food_logs
for each row
execute function update_updated_at();

-- ============================================================
-- ACTIVITY LOGS
-- ============================================================

create trigger trg_activity_logs_updated_at
before update on activity_logs
for each row
execute function update_updated_at();

-- ============================================================
-- BLOOD SUGAR LOGS
-- ============================================================

create trigger trg_blood_sugar_logs_updated_at
before update on blood_sugar_logs
for each row
execute function update_updated_at();

-- ============================================================
-- WEIGHT LOGS
-- ============================================================

create trigger trg_weight_logs_updated_at
before update on weight_logs
for each row
execute function update_updated_at();

-- ============================================================
-- REMINDERS
-- ============================================================

create trigger trg_reminders_updated_at
before update on reminders
for each row
execute function update_updated_at();

-- ============================================================
-- AI INSIGHTS
-- ============================================================

create trigger trg_ai_insights_updated_at
before update on ai_insights
for each row
execute function update_updated_at();

-- ============================================================
-- WEEKLY REPORTS
-- ============================================================

create trigger trg_weekly_reports_updated_at
before update on weekly_reports
for each row
execute function update_updated_at();

-- ============================================================
-- ACHIEVEMENTS
-- ============================================================

create trigger trg_achievements_updated_at
before update on achievements
for each row
execute function update_updated_at();

-- ============================================================
-- STREAKS
-- ============================================================

create trigger trg_streaks_updated_at
before update on streaks
for each row
execute function update_updated_at();

-- ============================================================
-- NOTIFICATIONS
-- ============================================================

create trigger trg_notifications_updated_at
before update on notifications
for each row
execute function update_updated_at();

-- ============================================================
-- DEVICES
-- ============================================================

create trigger trg_devices_updated_at
before update on devices
for each row
execute function update_updated_at();

commit;