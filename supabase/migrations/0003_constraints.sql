-- ============================================================
-- HealthGuard v2.0
-- Foreign Key Constraints
-- PostgreSQL / Supabase
-- ============================================================

begin;

-- ============================================================
-- HEALTH PROFILES
-- ============================================================

alter table health_profiles

add constraint fk_health_profile_user
foreign key (user_id)
references users(id)
on delete cascade;

-- ============================================================
-- GOALS
-- ============================================================

alter table goals

add constraint fk_goal_user
foreign key (user_id)
references users(id)
on delete cascade;

-- ============================================================
-- FAVORITE FOODS
-- ============================================================

alter table favorite_foods

add constraint fk_favorite_food_user
foreign key (user_id)
references users(id)
on delete cascade;

-- ============================================================
-- MEAL PLANS
-- ============================================================

alter table meal_plans

add constraint fk_meal_plan_user
foreign key (user_id)
references users(id)
on delete cascade;

-- ============================================================
-- MEAL ITEMS
-- ============================================================

alter table meal_items

add constraint fk_meal_item_meal_plan
foreign key (meal_plan_id)
references meal_plans(id)
on delete cascade;

-- ============================================================
-- FOOD ALTERNATIVES
-- ============================================================

alter table food_alternatives

add constraint fk_food_alternative_user
foreign key (user_id)
references users(id)
on delete cascade;

alter table food_alternatives

add constraint fk_food_alternative_meal_item
foreign key (meal_item_id)
references meal_items(id)
on delete set null;

-- ============================================================
-- FOOD LOGS
-- ============================================================

alter table food_logs

add constraint fk_food_log_user
foreign key (user_id)
references users(id)
on delete cascade;

alter table food_logs

add constraint fk_food_log_meal_item
foreign key (meal_item_id)
references meal_items(id)
on delete set null;

-- ============================================================
-- ACTIVITY LOGS
-- ============================================================

alter table activity_logs

add constraint fk_activity_log_user
foreign key (user_id)
references users(id)
on delete cascade;

-- ============================================================
-- BLOOD SUGAR LOGS
-- ============================================================

alter table blood_sugar_logs

add constraint fk_blood_sugar_log_user
foreign key (user_id)
references users(id)
on delete cascade;

-- ============================================================
-- WEIGHT LOGS
-- ============================================================

alter table weight_logs

add constraint fk_weight_log_user
foreign key (user_id)
references users(id)
on delete cascade;
commit;