import CalenderLine from '@/components/classes/calender-line'
import ListClass from '@/components/classes/list-class'
import { getSessionUser } from '@/lib/server'

export default async function ClassesPage () {
  const { payload: sessionUser } = await getSessionUser()

  return (
    <main className='flex-1 py-6 px-5 space-y-6'>
     {sessionUser.role === 'teacher' && <CalenderLine />}

      <ListClass userRole={sessionUser.role} />
    </main>
  )
}
