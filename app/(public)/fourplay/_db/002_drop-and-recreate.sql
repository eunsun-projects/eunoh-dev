drop policy if exists "fourplay_turns_update_own" on public.fourplay_turns;
create policy "fourplay_turns_update_own"
on public.fourplay_turns for update
using (
  exists (
    select 1
    from public.fourplay_threads t
    where t.id = fourplay_turns.thread_id
      and t.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.fourplay_threads t
    where t.id = fourplay_turns.thread_id
      and t.user_id = auth.uid()
  )
);
