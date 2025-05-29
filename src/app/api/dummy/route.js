// https://nextjs.org/docs/app/building-your-application/routing/route-handlers#request-body
// https://supabase.com/docs/reference/javascript/introduction

import { createClient } from '@/utils/supabase/server'

export async function GET(request) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    return Response.json({ error: 'Error fetching dummy data' }, { status: 500 });
  }
  const user = data.user;

  const { data: dummyData, error: dummyError } = await supabase.from('dummy').select('*').eq('user_id', user.id);
  if (dummyError) {
    return Response.json({ error: 'Error fetching dummy data' }, { status: 500 });
  }

  return Response.json(dummyData);
}

export async function POST(request) {
  const res = await request.json();

  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    return Response.json({ error: 'Error fetching dummy data' }, { status: 500 });
  }
  const user = data.user;

  const { data: dummyData, error: dummyError } = await supabase.from('dummy').insert({
    user_id: user.id,
    text: res.text,
  });

  if (dummyError) {
    return Response.json({ error: 'Error creating dummy data' }, { status: 500 });
  }

  return Response.json(dummyData);
}

// export async function PUT(request) {

// }

// export async function DELETE(request) {

// }
