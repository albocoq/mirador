-- Altalaya: spots schema and row-level security

-- Public profile data linked to the Supabase Auth user.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  "user" text,
  username text unique,
  avatar_url text,
  bio text,
  email text
);

alter table public.profiles add column if not exists "user" text;
alter table public.profiles add column if not exists email text;
alter table public.profiles alter column username drop not null;
alter table public.profiles alter column avatar_url drop not null;
alter table public.profiles alter column bio drop not null;
alter table public.profiles alter column "user" drop not null;
alter table public.profiles alter column email drop not null;

-- Fill usernames for profiles created before the username became mandatory.
do $$
declare
  profile_record record;
  username_base text;
  username_candidate text;
begin
  for profile_record in
    select p.id, coalesce(nullif(p.email, ''), u.email) as email
    from public.profiles p
    left join auth.users u on u.id = p.id
    where p.username is null
  loop
    username_base := left(
      regexp_replace(
        split_part(coalesce(profile_record.email, ''), '@', 1),
        '[^a-zA-Z0-9_]+',
        '_',
        'g'
      ),
      42
    );
    if username_base = '' then
      username_base := 'user';
    end if;

    username_candidate := username_base;
    loop
      begin
        update public.profiles
        set username = username_candidate
        where id = profile_record.id;
        exit;
      exception when unique_violation then
        username_candidate := username_base || floor(random() * 900000 + 100000)::text;
      end;
    end loop;
  end loop;
end;
$$;

alter table public.profiles alter column username set not null;

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
declare
  username_base text;
  username_candidate text;
begin
  username_base := left(
    regexp_replace(
      split_part(coalesce(new.email, ''), '@', 1),
      '[^a-zA-Z0-9_]+',
      '_',
      'g'
    ),
    42
  );
  if username_base = '' then
    username_base := 'user';
  end if;

  username_candidate := username_base;

  loop
    insert into public.profiles (id, username, email)
    values (new.id, username_candidate, new.email)
    on conflict (username) do nothing;

    if found then
      exit;
    end if;

    username_candidate := username_base || floor(random() * 900000 + 100000)::text;
  end loop;

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
