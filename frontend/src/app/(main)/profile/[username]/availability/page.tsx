import AvailabilityManager from '@/components/profile/availability-manager'
import api from '@/lib/server/api'

export default async function AvailabilityPage ({ params: { username } }: { params: { username: string } }) {
  console.log(username)

  const userRes = await api.getMyProfile()
  const user = userRes.payload
  console.log(user)

  return (
    <main className='flex-1 flex flex-col gap-y-6 py-6 px-4 bg-secondary'>
      <h1 className='text-2xl font-bold'>Disponibilidad del mes</h1>

      <AvailabilityManager user={user as TeacherUser} />
    </main>
  )
}
