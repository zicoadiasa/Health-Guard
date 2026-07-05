-- ============================================================
-- HealthGuard v2.0
-- Database Indexes
-- PostgreSQL / Supabase
-- ============================================================

begin;
create index idx_health_profiles_user
on health_profiles(user_id);

create index idx_goals_user
on goals(user_id);

create index idx_goals_status
on goals(status);

create index idx_favorite_foods_user
on favorite_foods(user_id);

create index idx_meal_plans_user
on meal_plans(user_id);

create index idx_meal_plans_date
on meal_plans(plan_date);

create index idx_meal_items_plan
on meal_items(meal_plan_id);

create index idx_food_alternatives_user
on food_alternatives(user_id);

create index idx_food_alternatives_meal_item
on food_alternatives(meal_item_id);

create index idx_food_logs_user
on food_logs(user_id);

create index idx_food_logs_consumed_at
on food_logs(consumed_at);

create index idx_activity_logs_user
on activity_logs(user_id);

create index idx_activity_logs_date
on activity_logs(activity_date);

create index idx_blood_sugar_logs_user
on blood_sugar_logs(user_id);

create index idx_blood_sugar_logs_measured_at
on blood_sugar_logs(measured_at);

create index idx_weight_logs_user
on weight_logs(user_id);

create index idx_weight_logs_recorded_at
on weight_logs(recorded_at);

create index idx_reminders_user
on reminders(user_id);

create index idx_reminders_time
on reminders(reminder_time);

create index idx_ai_insights_user
on ai_insights(user_id);

create index idx_ai_insights_goal
on ai_insights(goal_id);

create index idx_weekly_reports_user
on weekly_reports(user_id);

create index idx_weekly_reports_goal
on weekly_reports(goal_id);

create index idx_achievements_user
on achievements(user_id);

create index idx_streaks_user
on streaks(user_id);

create index idx_notifications_user
on notifications(user_id);

create index idx_notifications_status
on notifications(status);

create index idx_notifications_reminder
on notifications(reminder_id);

create index idx_devices_user
on devices(user_id);

commit;