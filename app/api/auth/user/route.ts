import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    if (error.message === 'Auth session missing!')
      return NextResponse.json(
        { user: null, error: 'Auth session missing!' },
        { status: 200 }, // 여기가 문제 200을 리턴해야 에러가 안나긴 하는데...
      );

    if (error.message === 'Unauthorized')
      return NextResponse.json(
        { user: null, error: '인증되지 않은 사용자입니다.' },
        { status: 401 },
      );
    return NextResponse.json({ user: null, error: error?.message }, { status: 401 });
  }
  if (!user) {
    return NextResponse.json({ error: 'Logged in user not found' }, { status: 404 });
  }

  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  if (userError) {
    console.error(userError);
    return NextResponse.json({ error: userError?.message }, { status: 401 });
  }

  console.log('userData', userData);

  return NextResponse.json(userData, { status: 200 });
}

// 서버에서 요청할 때
export async function POST(req: NextRequest) {
  const { userId } = await req.json();
  const supabase = await createClient();
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (userError) {
    console.error(userError);
    return NextResponse.json({ error: userError?.message }, { status: 401 });
  }

  return NextResponse.json(user, { status: 200 });
}
