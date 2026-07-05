begin;

alter table public.health_profiles
alter column height_cm drop not null;

alter table public.health_profiles
alter column weight_kg drop not null;

commit;
