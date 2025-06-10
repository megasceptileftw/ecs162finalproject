import { NextResponse } from 'next/server'

import { createClient } from '@/utils/supabase/server'

// Creating a handler to a GET request to route /auth/confirm
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type')

  // Create redirect link without the secret token
  const redirectTo = request.nextUrl.clone()
  redirectTo.searchParams.delete('token_hash')
  redirectTo.searchParams.delete('type')

  if (token_hash && type) {
    const supabase = await createClient()

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })
    if (!error) {
      // Redirect to login with success message
      redirectTo.pathname = '/login'
      redirectTo.searchParams.set('message', 'Email confirmed! You can now log in.')
      return NextResponse.redirect(redirectTo)
    }
  }

  // return the user to login with an error message
  redirectTo.pathname = '/login'
  redirectTo.searchParams.set('error', 'Email confirmation failed.')
  return NextResponse.redirect(redirectTo)
}