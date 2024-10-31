import UserCard from '@/components/user-card'
import { TEACHERS } from '@/lib/constants'

export default function StudentsPage () {
  return (
    <main className='flex-1 flex flex-col gap-y-6 py-6 px-4'>
      <h1 className='text-3xl font-bold'>Mis alumnos</h1>
      <ul className='space-y-4'>
        {TEACHERS.map(teacher => <UserCard key={teacher.id} user={teacher} classes={3}/>)}
      </ul>
    </main>
  )
}
