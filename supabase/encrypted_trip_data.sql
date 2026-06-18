-- Supabase SQL：建立可存放加密旅遊資料的後台資料表
-- 使用方式：到 Supabase Dashboard → SQL Editor → 貼上執行。
-- 注意：ciphertext 是已加密內容；不要把未加密行程資料放在 public bucket 或前端程式碼裡。

create table if not exists public.encrypted_trip_data (
  id uuid primary key default gen_random_uuid(),
  trip_id text not null,
  data_key text not null,
  salt text not null,
  iv text not null,
  ciphertext text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (trip_id, data_key)
);

alter table public.encrypted_trip_data enable row level security;

-- 前端需要讀取「加密後」的資料包，但真正內容必須靠密碼在瀏覽器端解密。
-- 如果不想讓任何未登入者讀到 ciphertext，請改成 authenticated policy，並加上登入流程。
drop policy if exists "encrypted trip data can be read by anon" on public.encrypted_trip_data;
create policy "encrypted trip data can be read by anon"
on public.encrypted_trip_data
for select
to anon
using (is_active = true);

-- 不開放前端直接新增、修改、刪除。
-- 資料更新請從 Supabase Dashboard / SQL Editor / 私人管理工具處理。

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_encrypted_trip_data_updated_at on public.encrypted_trip_data;
create trigger set_encrypted_trip_data_updated_at
before update on public.encrypted_trip_data
for each row
execute function public.set_updated_at();

-- 匯入加密資料範例：
-- insert into public.encrypted_trip_data (trip_id, data_key, salt, iv, ciphertext)
-- values ('kansai-2026', 'day_plans', '<base64 salt>', '<base64 iv>', '<base64 ciphertext>')
-- on conflict (trip_id, data_key)
-- do update set
--   salt = excluded.salt,
--   iv = excluded.iv,
--   ciphertext = excluded.ciphertext,
--   is_active = true;
