-- Altalaya: spots schema and row-level security

-- Public profile data linked to the Supabase Auth user.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  username text unique,
  avatar_url text,
  bio text
);

alter table public.profiles enable row level security;

drop policy if exists "Anyone can read profiles" on public.profiles;
create policy "Anyone can read profiles"
  on public.profiles
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles
  for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

grant select on table public.profiles to anon, authenticated;
grant update on table public.profiles to authenticated;

-- The function is security definer so it can insert the profile during signup,
-- before the new user's authenticated session exists.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id)
  values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create table if not exists public.spots (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  latitude double precision not null check (latitude between -90 and 90),
  longitude double precision not null check (longitude between -180 and 180),
  image_urls text[] not null default '{}'::text[],
  tags text[] not null default '{}'::text[],
  rating real not null default 5.0 check (rating between 0 and 5),
  is_hidden_gem boolean not null default false
);

alter table public.spots enable row level security;

-- Anyone, including anonymous visitors, can display spots on the map.
create policy "Anyone can read spots"
  on public.spots
  for select
  to anon, authenticated
  using (true);

-- The authenticated user's identity must match the owner stored in the row.
create policy "Authenticated users can create their own spots"
  on public.spots
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users can update their own spots"
  on public.spots
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Users can delete their own spots"
  on public.spots
  for delete
  to authenticated
  using ((select auth.uid()) = user_id);

grant select on table public.spots to anon, authenticated;
grant insert, update, delete on table public.spots to authenticated;

create index if not exists spots_created_at_idx on public.spots (created_at desc);
create index if not exists spots_user_id_idx on public.spots (user_id);
