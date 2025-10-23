-- Users
create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text unique,
  phone text,
  role text check (role in ('user','vendor','admin')) not null default 'user',
  eco_points integer not null default 0,
  created_at timestamptz not null default now()
);

-- Vendors
create table if not exists public.vendors (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  name text not null,
  address text,
  lat double precision,
  lng double precision,
  verified boolean not null default false
);

-- Offers
create table if not exists public.offers (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid not null references public.vendors(id) on delete cascade,
  title text not null,
  description text,
  images text[] not null default '{}',
  original_price numeric(10,2) not null,
  discounted_price numeric(10,2) not null,
  qty integer not null default 1,
  expires_at timestamptz not null,
  status text not null check (status in ('active','expired','sold_out')) default 'active'
);

-- Orders
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  offer_id uuid not null references public.offers(id) on delete cascade,
  qty integer not null default 1,
  total_amount numeric(10,2) not null,
  status text not null check (status in ('pending','paid','picked_up','cancelled')) default 'pending',
  pickup_code text not null,
  created_at timestamptz not null default now()
);

-- Reviews
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz not null default now()
);

-- Indexes for geo lookups
create index if not exists vendors_lat_lng_idx on public.vendors using btree (lat, lng);
create index if not exists offers_expires_at_idx on public.offers (expires_at);
