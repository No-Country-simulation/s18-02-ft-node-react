import { AgendaManager } from '@/components/agenda/agenda-manager'
import api from '@/lib/server/api'
import { notFound } from 'next/navigation'

export default async function Page () {
  const currentRes = await api.current()
  const sessionUser = currentRes.payload

  if (sessionUser.role === 'student') {
    notFound()
  }

  const userRes = await api.getMyProfile()
  const user = userRes.payload as TeacherUser

  return (
    <main className='flex-1 flex flex-col gap-y-6 py-6 px-4'>
      <AgendaManager availability={user.schedulePreferences}/>
    </main>
  )
}
