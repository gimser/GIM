-- Seed data: 5 vendors, 10 offers (Casablanca focus)
-- NOTE: Replace UUIDs with actual user ids in a real setup

-- Users (placeholder UUIDs)
insert into public.users (id, name, email, phone, role, eco_points)
values
  ('00000000-0000-0000-0000-000000000001','Ali','ali@example.com','+212600000001','vendor',10),
  ('00000000-0000-0000-0000-000000000002','Sara','sara@example.com','+212600000002','vendor',20),
  ('00000000-0000-0000-0000-000000000003','Youssef','youssef@example.com','+212600000003','user',0),
  ('00000000-0000-0000-0000-000000000004','Fatima','fatima@example.com','+212600000004','user',0),
  ('00000000-0000-0000-0000-000000000005','Admin','admin@example.com','+212600000005','admin',0)
  on conflict (id) do nothing;

-- Vendors
insert into public.vendors (id, user_id, name, address, lat, lng, verified) values
  (uuid_generate_v4(),'00000000-0000-0000-0000-000000000001','Boulangerie Casa','Maarif, Casablanca',33.584, -7.642,true),
  (uuid_generate_v4(),'00000000-0000-0000-0000-000000000001','Patisserie Anfa','Anfa, Casablanca',33.601, -7.655,true),
  (uuid_generate_v4(),'00000000-0000-0000-0000-000000000002','Green Veggie','Gauthier, Casablanca',33.589, -7.632,true),
  (uuid_generate_v4(),'00000000-0000-0000-0000-000000000002','Dar Sushi','Ain Diab, Casablanca',33.595, -7.688,true),
  (uuid_generate_v4(),'00000000-0000-0000-0000-000000000002','SuperMarket Oasis','Oasis, Casablanca',33.567, -7.632,true);

-- Offers (use last inserted vendors)
with v as (
  select id from public.vendors order by created_at nulls last
)
insert into public.offers (id, vendor_id, title, description, images, original_price, discounted_price, qty, expires_at, status)
select
  uuid_generate_v4(), id,
  'Surprise Bag','Bakery leftovers', '[]'::jsonb, 80, 40, 5, now() + interval '6 hours','active'
from v limit 10;
