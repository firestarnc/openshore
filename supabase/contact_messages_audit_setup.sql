-- Adds contact message audit timestamps for admin reply tracking.
alter table public.contact_messages
  add column if not exists sent_at timestamptz,
  add column if not exists replied_at timestamptz;

-- Backfill sent_at for historical records.
update public.contact_messages
set sent_at = coalesce(sent_at, created_at, now())
where sent_at is null;

-- Apply defaults for new rows.
alter table public.contact_messages
  alter column sent_at set default now();
