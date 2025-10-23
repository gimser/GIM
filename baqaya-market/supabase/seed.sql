insert into public.users (id, name, email, role, eco_points) values
  ('00000000-0000-0000-0000-000000000001', 'Youssef', 'youssef@example.com', 'user', 50),
  ('00000000-0000-0000-0000-000000000002', 'Fatima', 'fatima@example.com', 'vendor', 120),
  ('00000000-0000-0000-0000-000000000003', 'Admin', 'admin@example.com', 'admin', 0)
  on conflict do nothing;

insert into public.vendors (id, user_id, name, address, lat, lng, verified) values
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', 'Boulangerie Al Amal', 'Maarif, Casablanca', 33.5899, -7.6039, true),
  ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', 'Save & Go', 'Bourgogne, Casablanca', 33.5980, -7.6464, true),
  ('10000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002', 'Café Rif', 'Gauthier, Casablanca', 33.5903, -7.6320, true),
  ('10000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000002', 'Pâtisserie Nour', 'Oasis, Casablanca', 33.5596, -7.6329, true),
  ('10000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000002', 'Superette Atlas', 'Anfa, Casablanca', 33.5826, -7.6465, true)
  on conflict do nothing;

insert into public.offers (id, vendor_id, title, description, images, original_price, discounted_price, qty, expires_at, status) values
  ('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'Panier surprise pâtisserie', 'Assortiment du jour anti-gaspi', '{"https://picsum.photos/seed/1/400/300"}', 80, 40, 5, now() + interval '6 hours', 'active'),
  ('20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000002', 'Pack sandwichs', 'Restes frais', '{"https://picsum.photos/seed/2/400/300"}', 60, 30, 8, now() + interval '4 hours', 'active'),
  ('20000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000003', 'Café + Viennoiserie', 'Offre du matin', '{"https://picsum.photos/seed/3/400/300"}', 30, 15, 12, now() + interval '2 hours', 'active'),
  ('20000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000004', 'Gâteaux variés', 'Fin de journée', '{"https://picsum.photos/seed/4/400/300"}', 120, 60, 3, now() + interval '8 hours', 'active'),
  ('20000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000005', 'Pack produits laitiers', 'DLC proche', '{"https://picsum.photos/seed/5/400/300"}', 100, 50, 10, now() + interval '10 hours', 'active')
  on conflict do nothing;
