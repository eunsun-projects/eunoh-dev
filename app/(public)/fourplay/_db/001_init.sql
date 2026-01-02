-- 001_init.sql
-- Fourplay core tables

create extension if not exists "pgcrypto";

-- threads: 대화(회의) 단위
create table if not exists public.fourplay_threads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid null, -- auth.uid()를 쓰면 FK 걸어도 됨(옵션)
  title text null,
  status text not null default 'active', -- active | completed | abandoned
  final_decision jsonb null, -- FinalSummaryPayload
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- turns: 턴(메시지) 단위
create table if not exists public.fourplay_turns (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.fourplay_threads(id) on delete cascade,

  turn_index int not null, -- 1부터 증가 (정렬 안정)
  role text not null, -- user | assistant | system | tool
  kind text null, -- opener | mid | final_summary | tool_result ...
  model text null, -- assistant일 때만 (ex: openai:gpt-5.2-pro)
  selected_by text null, -- auto | user

  -- UI에서 자주 쓰는 필드만 정형 칼럼으로
  next_model text null,
  next_model_reason text null,

  -- 강제 JSON 결과물
  payload jsonb null,

  -- 사용자에게 보여줄 마크다운 원문(코드블럭 포함)
  raw_text text null,

  -- 메타(나중에 비용/품질 관측용)
  latency_ms int null,
  token_usage jsonb null,

  created_at timestamptz not null default now()
);

-- thread_id + turn_index 유니크 (턴 정렬 안정성)
create unique index if not exists fourplay_turns_thread_turn_index_uq
  on public.fourplay_turns(thread_id, turn_index);

-- 조회 최적화
create index if not exists fourplay_turns_thread_created_idx
  on public.fourplay_turns(thread_id, created_at);

-- updated_at 자동 갱신 트리거(threads)
create or replace function public.fourplay_touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists fourplay_threads_touch on public.fourplay_threads;
create trigger fourplay_threads_touch
before update on public.fourplay_threads
for each row execute function public.fourplay_touch_updated_at();

-- 002_rls.sql
-- Optional: enable RLS and restrict by auth.uid()

alter table public.fourplay_threads enable row level security;
alter table public.fourplay_turns enable row level security;

-- threads: 본인 것만
drop policy if exists "fourplay_threads_select_own" on public.fourplay_threads;
create policy "fourplay_threads_select_own"
on public.fourplay_threads for select
using (user_id = auth.uid());

drop policy if exists "fourplay_threads_insert_own" on public.fourplay_threads;
create policy "fourplay_threads_insert_own"
on public.fourplay_threads for insert
with check (user_id = auth.uid());

drop policy if exists "fourplay_threads_update_own" on public.fourplay_threads;
create policy "fourplay_threads_update_own"
on public.fourplay_threads for update
using (user_id = auth.uid());

-- turns: thread의 user_id가 본인인 것만
drop policy if exists "fourplay_turns_select_own" on public.fourplay_turns;
create policy "fourplay_turns_select_own"
on public.fourplay_turns for select
using (
  exists (
    select 1
    from public.fourplay_threads t
    where t.id = fourplay_turns.thread_id
      and t.user_id = auth.uid()
  )
);

drop policy if exists "fourplay_turns_insert_own" on public.fourplay_turns;
create policy "fourplay_turns_insert_own"
on public.fourplay_turns for insert
with check (
  exists (
    select 1
    from public.fourplay_threads t
    where t.id = fourplay_turns.thread_id
      and t.user_id = auth.uid()
  )
);