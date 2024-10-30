import CalenderLine from '@/components/classes/calender-line'
import ListClass from '@/components/classes/list-class'
import api from '@/lib/server/api'

export default async function ClassesPage () {
  const currentRes = await api.current()
  const sessionUser = currentRes.payload

  return (
    <main className='flex-1 py-6 px-5 space-y-6'>
     {sessionUser.role === 'teacher' && <CalenderLine />}

      <ListClass userRole={sessionUser.role} />
    </main>
  )
}
