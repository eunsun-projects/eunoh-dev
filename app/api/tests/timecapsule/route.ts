import { TimeCapsule } from '@/types/tests.type';
import { createClient } from '@/utils/supabase/server';
import { PostgrestError } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = await createClient();

  const {
    data: timeCapsules,
    error,
  }: { data: TimeCapsule[] | null; error: PostgrestError | null } = await supabase
    .from('timecapsules')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(timeCapsules, { status: 200 });
}

export async function POST(request: Request) {
  const timeCapsule: TimeCapsule = await request.json();
  const supabase = await createClient();

  const { data, error }: { data: TimeCapsule | null; error: PostgrestError | null } = await supabase
    .from('timecapsules')
    .upsert(timeCapsule, { onConflict: 'id' })
    .select()
    .single();

  if (error) {
    return NextResponse.json(error.message, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}

export async function PUT(request: Request) {
  const timeCapsule: TimeCapsule = await request.json();
  const supabase = await createClient();

  const { data, error }: { data: TimeCapsule | null; error: PostgrestError | null } = await supabase
    .from('timecapsules')
    .update(timeCapsule)
    .eq('id', timeCapsule.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json(error.message, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}

export async function DELETE(request: Request) {
  const timeCapsule: TimeCapsule = await request.json();
  const supabase = await createClient();

  const { data, error }: { data: TimeCapsule | null; error: PostgrestError | null } = await supabase
    .from('timecapsules')
    .delete()
    .eq('id', timeCapsule.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json(error.message, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}
