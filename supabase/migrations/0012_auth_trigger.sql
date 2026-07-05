begin;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
    insert into public.users (
        id,
        email,
        full_name,
        created_at,
        updated_at
    )
    values (
        new.id,
        new.email,
        coalesce(new.raw_user_meta_data->>'full_name', 'New User'),
        now(),
        now()
    )
    on conflict (id) do nothing;

    insert into public.health_profiles (
        id,
        user_id,
        gender,
        birth_date,
        height_cm,
        weight_kg,
        diabetes_type,
        activity_level,
        daily_calorie_target,
        created_at,
        updated_at
    )
    values (
        gen_random_uuid(),
        new.id,
        'male',
        null,
        null,
        null,
        null,
        'sedentary',
        null,
        now(),
        now()
    )
    on conflict (user_id) do nothing;

    return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert
on auth.users
for each row
execute function public.handle_new_user();

commit;
