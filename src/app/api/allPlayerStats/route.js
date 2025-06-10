
import { createClient } from '@/utils/supabase/server'

export async function GET() {
  const supabase = await createClient();

  const { data: playerStats, error: fetchError } = await supabase
  .from('player_stats')
  .select('*')
  // sort by the score using supabase function .order
  // https://supabase.com/docs/reference/javascript/order
  .order('score', { ascending: false });
  if (fetchError) {
    return Response.json({ fetchError: 'Error fetching player stats data' }, { status: 500 });
  }
  return Response.json(playerStats);
}