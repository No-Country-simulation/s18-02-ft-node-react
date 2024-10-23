import type { TeacherClass } from '@/types'
import { Card, CardHeader } from './ui/card'
import { Button } from './ui/button'
import UserAvatar from './shared/user-avatar'
import { Badge } from './ui/badge'
import ClockIcon from '@/icons/clock'
import CheckCircleIcon from '@/icons/check-circle'

export default function ClassCard ({ nextClass, sessionUser }: {
  nextClass: TeacherClass
  sessionUser: SessionUser
}) {
  return (
    <Card>
      <CardHeader className='flex-row justify-between items-start p-4'>
        <div className='flex items-center gap-x-3'>
          <UserAvatar user={nextClass.user} />
          <div className='flex flex-col'>
            <strong className='text-lg font-semibold'>{nextClass.user.name}</strong>
            <span
              className='text-xs flex text-muted-foreground gap-x-1'
            ><ClockIcon /> Lunes 27/11 a las 14hs</span>
          </div>
        </div>
        {sessionUser.role === 'student'
          ? <Badge
            variant='outline'
            className='rounded-sm py-1'
          >{nextClass.subject}</Badge>
          : <Badge className='p-2 rounded-md text-green-500 border-green-500 bg-card'>
            <CheckCircleIcon />
          </Badge>
        }
      </CardHeader>
      <CardFooter className='px-4 pb-4'>
        <Button className='w-full' variant='outline'>Cancelar</Button>
      </CardFooter>
    </Card>
  )
}
