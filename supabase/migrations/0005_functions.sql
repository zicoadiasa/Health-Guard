-- ============================================================
-- HealthGuard v2.0
-- Database Functions
-- PostgreSQL / Supabase
-- ============================================================

begin;

-- ============================================================
-- UPDATE UPDATED_AT
-- ============================================================

create or replace function update_updated_at()

returns trigger

language plpgsql

as $$

begin

    new.updated_at = now();

    return new;

end;

$$;

-- ============================================================
-- CALCULATE BMR
-- ============================================================

create or replace function calculate_bmr(

    p_user_id uuid

)

returns decimal

language plpgsql

as $$

declare

    v_gender gender_enum;

    v_birth_date date;

    v_height decimal;

    v_weight decimal;

    v_activity activity_level_enum;

    v_age integer;

    v_bmr decimal;

    v_multiplier decimal;

begin

    select

        gender,

        birth_date,

        height_cm,

        weight_kg,

        activity_level

    into

        v_gender,

        v_birth_date,

        v_height,

        v_weight,

        v_activity

    from health_profiles

    where user_id = p_user_id

    limit 1;

    if not found then

        return null;

    end if;

    if v_birth_date is null then

        return null;

    end if;

    v_age := extract(year from age(current_date, v_birth_date))::integer;

    if v_gender = 'male' then

        v_bmr :=

            (10 * v_weight)

            + (6.25 * v_height)

            - (5 * v_age)

            + 5;

    else

        v_bmr :=

            (10 * v_weight)

            + (6.25 * v_height)

            - (5 * v_age)

            - 161;

    end if;

    v_multiplier :=

        case v_activity

            when 'sedentary' then 1.20

            when 'light' then 1.375

            when 'moderate' then 1.55

            when 'active' then 1.725

            when 'very_active' then 1.90

            else 1.20

        end;

    return round(v_bmr * v_multiplier, 2);

end;

$$;

create or replace function calculate_bmi(

    weight_kg decimal,

    height_cm decimal

)

returns decimal

language plpgsql

as $$

declare

    bmi decimal;

begin

    if height_cm is null
        or height_cm = 0 then

        return null;

    end if;

    bmi := weight_kg /
        power(height_cm / 100.0, 2);

    return round(bmi, 2);

end;

$$;

-- ============================================================
-- GENERATE WEEKLY REPORT
-- ============================================================

create or replace function generate_weekly_report(

    p_user_id uuid

)

returns uuid

language plpgsql

as $$

declare

    v_report_id uuid;

    v_week_start date;

    v_week_end date;

    v_summary text;

begin

    v_week_start := date_trunc('week', current_date)::date;

    v_week_end := v_week_start + interval '6 days';

    v_report_id := gen_random_uuid();

    v_summary := 'Weekly report generated automatically.';

    insert into weekly_reports (

        id,

        user_id,

        week_start,

        week_end,

        summary,

        generated_at,

        created_at,

        updated_at

    )

    values (

        v_report_id,

        p_user_id,

        v_week_start,

        v_week_end,

        v_summary,

        now(),

        now(),

        now()

    );

    return v_report_id;

end;

$$;

-- ============================================================
-- CREATE NOTIFICATION
-- ============================================================

create or replace function create_notification(

    p_user_id uuid,

    p_notification_type notification_type_enum,

    p_title varchar,

    p_message text,

    p_reminder_id uuid default null

)

returns uuid

language plpgsql

as $$

declare

    v_notification_id uuid;

begin

    v_notification_id := gen_random_uuid();

    insert into notifications (

        id,

        user_id,

        reminder_id,

        notification_type,

        title,

        message,

        status,

        sent_at,

        created_at,

        updated_at

    )

    values (

        v_notification_id,

        p_user_id,

        p_reminder_id,

        p_notification_type,

        p_title,

        p_message,

        'unread',

        now(),

        now(),

        now()

    );

    return v_notification_id;

end;

$$;

commit;