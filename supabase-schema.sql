-- Run this entire file in the Supabase SQL Editor (supabase.com → your project → SQL Editor)

create table if not exists classes (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  type text not null default 'CrossFit',
  day text not null,
  day_index integer not null default 0,
  time text not null,
  time_sort integer not null default 0,
  duration integer not null default 60,
  instructor text not null default 'Coach Liz',
  capacity integer not null default 20,
  spots_remaining integer not null default 20,
  price numeric(10,2) not null default 22.00,
  description text default '',
  active boolean not null default true,
  created_at timestamp with time zone default now()
);

create table if not exists bookings (
  id uuid default gen_random_uuid() primary key,
  class_id uuid references classes(id),
  member_name text not null,
  member_email text not null,
  member_phone text default '',
  stripe_session_id text,
  amount_paid numeric(10,2),
  status text not null default 'confirmed',
  created_at timestamp with time zone default now()
);

-- Disable row-level security (functions use service key)
alter table classes disable row level security;
alter table bookings disable row level security;

-- Sample classes to get started (Liz can edit these in the admin panel)
insert into classes (name, type, day, day_index, time, time_sort, duration, instructor, capacity, spots_remaining, price, description) values
  ('CrossFit', 'CrossFit', 'Monday', 0, '5:30 AM', 330, 60, 'Coach Liz', 20, 20, 22.00, 'High-intensity functional training.'),
  ('CrossFit', 'CrossFit', 'Monday', 0, '9:00 AM', 540, 60, 'Coach Liz', 20, 20, 22.00, 'High-intensity functional training.'),
  ('Strength', 'Strength', 'Monday', 0, '6:00 PM', 1080, 60, 'Coach Liz', 15, 15, 22.00, 'Progressive strength programming.'),
  ('CrossFit', 'CrossFit', 'Tuesday', 1, '5:30 AM', 330, 60, 'Coach Liz', 20, 20, 22.00, 'High-intensity functional training.'),
  ('Boxing', 'Boxing', 'Tuesday', 1, '6:00 PM', 1080, 60, 'Coach Liz', 15, 15, 22.00, 'Real striking skills and conditioning.'),
  ('CrossFit', 'CrossFit', 'Wednesday', 2, '5:30 AM', 330, 60, 'Coach Liz', 20, 20, 22.00, 'High-intensity functional training.'),
  ('Olympic Lifting', 'Olympic Lifting', 'Wednesday', 2, '9:00 AM', 540, 60, 'Coach Liz', 12, 12, 22.00, 'Snatch and clean & jerk coaching.'),
  ('CrossFit', 'CrossFit', 'Thursday', 3, '5:30 AM', 330, 60, 'Coach Liz', 20, 20, 22.00, 'High-intensity functional training.'),
  ('Boxing', 'Boxing', 'Thursday', 3, '6:00 PM', 1080, 60, 'Coach Liz', 15, 15, 22.00, 'Real striking skills and conditioning.'),
  ('CrossFit', 'CrossFit', 'Friday', 4, '5:30 AM', 330, 60, 'Coach Liz', 20, 20, 22.00, 'High-intensity functional training.'),
  ('Strength', 'Strength', 'Friday', 4, '9:00 AM', 540, 60, 'Coach Liz', 15, 15, 22.00, 'Progressive strength programming.'),
  ('CrossFit', 'CrossFit', 'Saturday', 5, '8:00 AM', 480, 60, 'Coach Liz', 25, 25, 22.00, 'Community Saturday WOD.'),
  ('Yoga & Recovery', 'Yoga', 'Saturday', 5, '9:30 AM', 570, 60, 'Coach Liz', 15, 15, 22.00, 'Mobility and recovery.');
