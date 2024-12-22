import { PartialPost } from '@/types/post.types';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('posts').select('*');
  // .order('created_at', { ascending: false });

  if (error) {
    revalidatePath('/', 'layout');
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}

export async function POST(req: Request) {
  const supabase = await createClient();

  const body: PartialPost = await req.json();

  const { data, error } = await supabase
    .from('posts')
    .upsert({
      ...body,
    })
    .select()
    .single();

  if (error) {
    revalidatePath('/', 'layout');
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
