create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  bio text not null,
  image_path text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists team_members_sort_order_idx
  on public.team_members (sort_order, name);

-- Keep team member names unique so rerunning this script updates records
-- instead of creating duplicates.
delete from public.team_members a
using public.team_members b
where a.id < b.id
  and lower(trim(a.name)) = lower(trim(b.name));

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'team_members_name_key'
  ) then
    alter table public.team_members
      add constraint team_members_name_key unique (name);
  end if;
end $$;

create or replace function public.set_team_members_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_team_members_updated_at on public.team_members;

create trigger set_team_members_updated_at
before update on public.team_members
for each row
execute function public.set_team_members_updated_at();

alter table public.team_members enable row level security;

drop policy if exists "Public can read active team members" on public.team_members;
create policy "Public can read active team members"
on public.team_members
for select
to anon, authenticated
using (is_active = true);

insert into public.team_members (name, role, bio, image_path, sort_order)
values
  (
    'Freda Erhunmwonsere',
    'Operations & Studio Management Lead',
    'With over 2 years of experience in studio coordination and operational management, Freda Erhunmwonsere plays a key role in ensuring the smooth and efficient running of Open Shore Studios. Skilled in workflow supervision, team coordination, and administrative management, she oversees the daily operations of the studio with professionalism and attention to detail. Her ability to manage schedules, coordinate internal processes, and maintain strong communication across departments helps create a productive and organized working environment. Freda is recognized for her leadership, reliability, and commitment to maintaining operational excellence while supporting the creative vision of the studio.',
    'freda.jpg',
    10
  ),
  (
    'Ophori Tejiri',
    'Receptionist & Client Relations Executive',
    'Ophori Tejiri serves as the welcoming face of Open Shore Studios, bringing professionalism, warmth, and excellent communication skills to every client and visitor interaction. With experience in customer service and front desk administration, she manages appointments, inquiries, and studio communications efficiently and professionally. Her strong interpersonal skills and organized approach help create a positive and seamless experience for guests, collaborators, and team members alike. Ophori''s dedication to hospitality and professionalism contributes greatly to the studio''s friendly and creative atmosphere.',
    'tejiri.jpg',
    20
  ),
  (
    'Winner Robert',
    'Content Operations Lead',
    'Winner Robert oversees the coordination and execution of content operations at Open Shore Studios. With experience in content planning, workflow management, and production coordination, he ensures that projects are properly organized and delivered efficiently. His ability to manage timelines, streamline production processes, and coordinate communication between creative teams helps maintain consistency and quality across all studio projects. Winner is passionate about operational efficiency and plays a major role in transforming creative ideas into successful productions.',
    'winner.jpg',
    30
  ),
  (
    'Solomon Kendrick',
    'Creative Content Lead',
    'Solomon Kendrick leads the creative direction and storytelling vision of Open Shore Studios. With a strong passion for visual storytelling, creative strategy, and digital content development, he is responsible for conceptualizing and overseeing engaging creative projects. Known for innovation and originality, Solomon brings fresh ideas and artistic excellence into every production. His creative leadership helps shape the studio''s identity while ensuring that content remains impactful, audience-focused, and aligned with modern creative standards.',
    'kendrick.jpg',
    40
  ),
  (
    'Paulina Akwe John',
    'Facility Maintenance Officer',
    'Paulina Akwe John is responsible for maintaining the cleanliness, organization, and overall comfort of the studio environment. Through dedication, consistency, and attention to detail, she helps ensure that both staff and visitors experience a clean, safe, and welcoming workspace. Her contributions play an important role in supporting the smooth daily operations of the studio and maintaining the professional atmosphere that reflects the standards of Open Shore Studios.',
    'paulina.jpg',
    50
  )
on conflict (name)
do update set
  role = excluded.role,
  bio = excluded.bio,
  image_path = excluded.image_path,
  sort_order = excluded.sort_order,
  is_active = true,
  updated_at = now();

-- Storage setup to run in the Supabase SQL editor after creating the bucket manually.
-- 1. Create a public bucket named team-images.
-- 2. Upload each profile image using the file names above or update image_path values to match.

insert into storage.buckets (id, name, public)
values ('team-images', 'team-images', true)
on conflict (id) do nothing;

drop policy if exists "Public can read team images" on storage.objects;
create policy "Public can read team images"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'team-images');