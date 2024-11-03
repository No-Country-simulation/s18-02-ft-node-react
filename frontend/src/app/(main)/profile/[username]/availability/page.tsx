import AvailabilityManager from '@/components/profile/availability-manager'
import { getSessionUser } from '@/lib/server'
import api from '@/lib/server/api'
import { notFound } from 'next/navigation'

export default async function AvailabilityPage ({ params: { username } }: { params: { username: string } }) {
  const { payload: sessionUser } = await getSessionUser()

  if (sessionUser.username !== username) {
    notFound()
  }

  const userRes = await api.getMyProfile()
  const user = userRes.payload

  return (
    <main className='flex-1 flex flex-col gap-y-6 py-6 px-4'>
      <h1 className='text-2xl font-bold'>Disponibilidad del mes</h1>

      <AvailabilityManager user={user as TeacherUser} />
    </main>
  )
}
