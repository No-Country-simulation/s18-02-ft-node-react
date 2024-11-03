import { ClassScheduleManager } from '@/components/shared/class-schedule-manager'
import { getSessionUser } from '@/lib/server'
import api from '@/lib/server/api'
import { notFound } from 'next/navigation'

const schedules = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00']

export default async function Page () {
  const { payload: sessionUser } = await getSessionUser()

  if (sessionUser.role === 'student') {
    notFound()
  }

  const userRes = await api.getMyProfile()
  const user = userRes.payload as TeacherUser

  return (
    <main className='flex-1 flex flex-col gap-y-6 py-6 px-4'>
      <ClassScheduleManager availability={user.schedulePreferences} schedules={schedules}/>
    </main>
  )
}
