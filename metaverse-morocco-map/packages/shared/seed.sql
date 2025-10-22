insert into public.cities (id, name_en, name_fr, name_ar, lng, lat) values
  ('casablanca','Casablanca','Casablanca','الدار البيضاء', -7.617, 33.573),
  ('rabat','Rabat','Rabat','الرباط', -6.842, 34.020),
  ('marrakech','Marrakech','Marrakech','مراكش', -7.981, 31.629),
  ('fes','Fes','Fès','فاس', -5.003, 34.033),
  ('tangier','Tangier','Tanger','طنجة', -5.803, 35.759),
  ('agadir','Agadir','Agadir','أكادير', -9.597, 30.427)
on conflict (id) do nothing;

-- Example store and products
insert into public.stores (city_id, name, description)
values ('marrakech','Souk Artisans','Handmade crafts from the medina')
returning id\gset

insert into public.products (store_id, name, description, price_cents, image_url) values
  (:'id','Berber Rug','Wool rug woven in Atlas', 120000, null),
  (:'id','Argan Oil','Organic cosmetic oil', 2500, null);

-- Eco projects
insert into public.eco_projects (city_id, title, summary, category, website) values
  ('agadir','Noor Solar Extensions','Solar energy capacity increases','solar','https://masen.ma'),
  ('rabat','Urban Recycling Initiative','Neighborhood recycling drop points','recycling','https://example.org');

-- Attractions
insert into public.attractions (city_id, title, summary, image_url) values
  ('marrakech','Jemaa el-Fnaa','Historic square and market', null),
  ('fes','Al Quaraouiyine','Oldest university in the world', null);
