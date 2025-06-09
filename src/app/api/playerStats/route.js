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

  const { data: playerStats, error: fetchError } = await supabase.from('player_stats').select('*').eq('user_id', user.id);
  if (fetchError) {
    return Response.json({ fetchError: 'Error fetching player stats data' }, { status: 500 });
  }
  return Response.json(playerStats);
}

export async function POST(request) {
  const res = await request.json();

  const supabase = await createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    return Response.json({ error: 'User not logged in' }, { status: 500 });
  }
  const user = userData.user;

  const { data: result, error: entryError } = await supabase.from('player_stats').select('*').eq('user_id', user.id)
  if (!result || result.length === 0) {
    const { data: postingResult, error: savingError } = await supabase.from('player_stats').insert({
        user_id: user.id,
        username: res.username,
        total_games: res.total_games,
        wins: res.wins,
        losses: res.losses,
        draws: res.draws,
        score: res.score,
        current_win_streak: res.current_win_streak,
        best_win_streak: res.best_win_streak,
      })
      if (savingError) {
        return Response.json({ error: 'Error creating player stats data' }, { status: 500 });
      }
      return Response.json({msg: "inserted player stats", postingResult});
  } else {
    const { data: updatedResult, error: updateError } = await supabase.from('player_stats').update({
      username: res.username,
      total_games: res.total_games,
      wins: res.wins,
      losses: res.losses,
      draws: res.draws,
      score: res.score,
      current_win_streak: res.current_win_streak,
      best_win_streak: res.best_win_streak,
    }).eq('user_id', user.id);

    if (updateError) {
      return Response.json({ error: 'Error updating player stats data' }, { status: 500 });
    }
    return Response.json({msg: "updated player stats", updatedResult});
  }
}

export async function DELETE(request) {
    const res = await request.json();
    
    const supabase = await createClient();

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
      return Response.json({ error: 'User not logged in' }, { status: 500 });
    }
    const user = userData.user;
    
    const { data: result, error: deleteError } = await supabase.from('player_stats').delete().eq('user_id', user.id);
    if (deleteError) {
        return Response.json({ error: 'Error deleting player stats data' }, { status: 500 });
    }
    return Response.json(result);
}
