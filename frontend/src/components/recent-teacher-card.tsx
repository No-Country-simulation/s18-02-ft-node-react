import { TEACHERS } from '@/lib/constants'
import UserAvatar from './shared/user-avatar'
import { Card } from './ui/card'

const teacher = TEACHERS[0]

export default function RecentTeacherCard () {
  return (
    <Card className='flex gap-x-2 items-center p-4'>
      <UserAvatar user={teacher} />
      <div className='flex flex-col'>
        <strong>{teacher.name}</strong>
        <span className='text-muted-foreground text-sm'>Ingles</span>
      </div>
    </Card>
  )
}
