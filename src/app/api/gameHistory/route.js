// https://nextjs.org/docs/app/building-your-application/routing/route-handlers#request-body
// https://supabase.com/docs/reference/javascript/introduction

import { createClient } from '@/utils/supabase/server'

export async function GET() {
  const supabase = await createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    return Response.json({ error: 'User not logged in' }, { status: 500 });
  }
  const user = userData.user;

  const { data: gameHistory, error: fetchError } = await supabase.from('game_history').select('*').eq('user_id', user.id);
  if (fetchError) {
    return Response.json({ fetchError: 'Error fetching game history data' }, { status: 500 });
  }
  return Response.json(gameHistory);
}

export async function POST(request) {
  const res = await request.json();

  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    return Response.json({ error: 'User not logged in' }, { status: 500 });
  }
  const user = data.user;

  const { data: result, error: savingError } = await supabase.from('game_history').insert({
    user_id: user.id,
    player_choice: res.player_choice,
    bot_choice: res.bot_choice,
    result: res.result,
  });
  if (savingError) {
    return Response.json({ error: 'Error creating game history data' }, { status: 500 });
  }
  return Response.json({msg: "play inserted successfully", result});
}


export async function DELETE(request) {
    const res = await request.json();
    
    const supabase = await createClient();
    
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        return Response.json({ error: 'User not logged in' }, { status: 500 });
    }
    const user = data.user;
    
    const { data: result, error: deleteError } = await supabase.from('game_history').delete().eq('user_id', user.id);
    if (deleteError) {
        return Response.json({ error: 'Error deleting game history data' }, { status: 500 });
    }
    return Response.json({msg: "play deleted successfully", result});
}
