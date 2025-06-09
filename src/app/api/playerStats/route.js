// https://nextjs.org/docs/app/building-your-application/routing/route-handlers#request-body
// https://supabase.com/docs/reference/javascript/introduction

import { createClient } from '@/utils/supabase/server'

export async function GET() {
  const supabase = await createClient();

  const { data: data, error: gameError } = await supabase.auth.getUser();
  if (error || !data?.user) {
    return Response.json({ error: 'User not logged in' }, { status: 500 });
  }
  const user = data.user;

  const { data: playerStats, error: fetchError } = await supabase.from('player_stats').select('*').eq('user_id', user.id);
  if (fetchError) {
    return Response.json({ fetchError: 'Error fetching player stats data' }, { status: 500 });
  }
  return Response.json(playerStats);
}

export async function POST(request) {
  const res = await request.json();

  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    return Response.json({ error: 'User not logged in' }, { status: 500 });
  }
  const user = data.user;

  const { data: result, error: entryError } = await supabase.from('player_stats').eq('user_id', user.id)
  if (entryError) {
    const { data: result, error: savingError } = await supabase.from('player_stats').insert({
        user_id: user.id,
        username: res.username,
        total_games: res.total_games,
        wins: res.wins,
        losses: res.losses,
        draws: res.draws,
        score: res.score,
        current_win_streak: res.current_win_streak,
        best_wind_streak: res.best_wind_streak,
      })
      if (savingError) {
        return Response.json({ error: 'Error creating player stats data' }, { status: 500 });
      }
      return Response.json(result);
  } else {
    const { data: updatedResult, error: updateError } = await supabase.from('player_stats').update({
      username: res.username,
      total_games: res.total_games,
      wins: res.wins,
      losses: res.losses,
      draws: res.draws,
      score: res.score,
      current_win_streak: res.current_win_streak,
      best_wind_streak: res.best_wind_streak,
    }).eq('user_id', user.id);

    if (updateError) {
      return Response.json({ error: 'Error updating player stats data' }, { status: 500 });
    }
    return Response.json(updatedResult);
  }
}

// export async function PUT(request) {

// }

// export async function DELETE(request) {

// }
