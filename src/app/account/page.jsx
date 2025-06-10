import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import AccountForm from './account-form'
import DummyEntries from './dummy-entries'

export default async function Account() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div>
      <AccountForm user={user} />
      <DummyEntries />
    </div>
  )
}