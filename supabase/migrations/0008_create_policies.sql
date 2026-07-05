-- ============================================================
-- HealthGuard v2.0
-- Row Level Security Policies
-- PostgreSQL / Supabase
-- ============================================================

begin;

-- ============================================================
-- USERS
-- ============================================================

create policy "Users can view own profile"

on users

for select

using (

    auth.uid() = id

);

create policy "Users can update own profile"

on users

for update

using (

    auth.uid() = id

);

create policy "Users can insert own profile"

on users

for insert

with check (

    auth.uid() = id

);

-- ============================================================
-- HEALTH PROFILES
-- ============================================================

create policy "Users manage own health profile"

on health_profiles

for all

using (

    auth.uid() = user_id

)

with check (

    auth.uid() = user_id

);

-- ============================================================
-- GOALS
-- ============================================================

create policy "Users manage own goals"

on goals

for all

using (

    auth.uid() = user_id

)

with check (

    auth.uid() = user_id

);

create policy "Users manage own favorite foods"

on favorite_foods

for all

using (

    auth.uid() = user_id

)

with check (

    auth.uid() = user_id

);

create policy "Users manage own meal plans"

on meal_plans

for all

using (

    auth.uid() = user_id

)

with check (

    auth.uid() = user_id

);

create policy "Users manage own food alternatives"

on food_alternatives

for all

using (

    auth.uid() = user_id

)

with check (

    auth.uid() = user_id

);

create policy "Users manage own food logs"

on food_logs

for all

using (

    auth.uid() = user_id

)

with check (

    auth.uid() = user_id

);

create policy "Users manage own activity logs"

on activity_logs

for all

using (

    auth.uid() = user_id

)

with check (

    auth.uid() = user_id

);

create policy "Users manage own blood sugar logs"

on blood_sugar_logs

for all

using (

    auth.uid() = user_id

)

with check (

    auth.uid() = user_id

);

create policy "Users manage own weight logs"

on weight_logs

for all

using (

    auth.uid() = user_id

)

with check (

    auth.uid() = user_id

);

create policy "Users manage own reminders"

on reminders

for all

using (

    auth.uid() = user_id

)

with check (

    auth.uid() = user_id

);

create policy "Users view own ai insights"

on ai_insights

for select

using (

    auth.uid() = user_id

);

create policy "Users view own weekly reports"

on weekly_reports

for select

using (

    auth.uid() = user_id

);

create policy "Users view own achievements"

on achievements

for select

using (

    auth.uid() = user_id

);

create policy "Users view own streaks"

on streaks

for select

using (

    auth.uid() = user_id

);

create policy "Users view own notifications"

on notifications

for select

using (

    auth.uid() = user_id

);

create policy "Users update own notifications"

on notifications

for update

using (

    auth.uid() = user_id

);

create policy "Users manage own devices"

on devices

for all

using (

    auth.uid() = user_id

)

with check (

    auth.uid() = user_id

);

create policy "Users manage own meal items"

on meal_items

for all

using (

    exists (

        select 1

        from meal_plans

        where meal_plans.id = meal_items.meal_plan_id

        and meal_plans.user_id = auth.uid()

    )

)

with check (

    exists (

        select 1

        from meal_plans

        where meal_plans.id = meal_items.meal_plan_id

        and meal_plans.user_id = auth.uid()

    )

);

commit;