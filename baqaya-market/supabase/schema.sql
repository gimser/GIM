-- Baqaya Market Supabase schema
-- UUID extension
create extension if not exists "uuid-ossp";

-- Users (profiles linked to auth.users)
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  email text,
  phone text,
  role text not null check (role in ('user','vendor','admin')) default 'user',
  eco_points integer not null default 0,
  created_at timestamp with time zone not null default now()
);

-- Vendors
create table if not exists public.vendors (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id) on delete cascade,
  name text not null,
  address text not null,
  lat double precision not null,
  lng double precision not null,
  verified boolean not null default false
);

-- Offers
create table if not exists public.offers (
  id uuid primary key default uuid_generate_v4(),
  vendor_id uuid not null references public.vendors(id) on delete cascade,
  title text not null,
  description text,
  images jsonb not null default '[]'::jsonb,
  original_price numeric(10,2) not null,
  discounted_price numeric(10,2) not null,
  qty integer not null check (qty >= 0),
  expires_at timestamp with time zone not null,
  status text not null check (status in ('active','expired','sold_out','draft')) default 'active'
);

-- Orders
create table if not exists public.orders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id) on delete cascade,
  offer_id uuid not null references public.offers(id) on delete restrict,
  qty integer not null check (qty > 0),
  total_amount numeric(10,2) not null,
  status text not null check (status in ('created','paid','cancelled','picked_up')) default 'created',
  pickup_code text not null,
  created_at timestamp with time zone not null default now()
);

-- Reviews
create table if not exists public.reviews (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid not null references public.orders(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  comment text,
  created_at timestamp with time zone not null default now()
);

-- Basic indexes
create index if not exists idx_vendors_user on public.vendors(user_id);
create index if not exists idx_offers_vendor on public.offers(vendor_id);
create index if not exists idx_offers_status on public.offers(status);
create index if not exists idx_orders_user on public.orders(user_id);
create index if not exists idx_orders_offer on public.orders(offer_id);

-- RLS
alter table public.users enable row level security;
alter table public.vendors enable row level security;
alter table public.offers enable row level security;
alter table public.orders enable row level security;
alter table public.reviews enable row level security;

-- Users: user can read own profile; admin can read all
create policy if not exists users_select_self on public.users
  for select using (auth.uid() = id or exists(select 1 from public.users u where u.id = auth.uid() and u.role = 'admin'));
create policy if not exists users_update_self on public.users
  for update using (auth.uid() = id);

-- Vendors: owner or admin can manage, everyone can read basic
create policy if not exists vendors_select_all on public.vendors for select using (true);
create policy if not exists vendors_modify_owner on public.vendors
  for all using (user_id = auth.uid());

-- Offers: readable by all; modifiable by vendor owner or admin
create policy if not exists offers_select_all on public.offers for select using (true);
create policy if not exists offers_modify_owner on public.offers
  for all using (exists (select 1 from public.vendors v where v.id = vendor_id and v.user_id = auth.uid()));

-- Orders: user can read own; create own
create policy if not exists orders_select_own on public.orders for select using (user_id = auth.uid());
create policy if not exists orders_insert_own on public.orders for insert with check (user_id = auth.uid());

-- Reviews: user can read/write own
create policy if not exists reviews_select_all on public.reviews for select using (true);
create policy if not exists reviews_insert_own on public.reviews for insert with check (user_id = auth.uid());
