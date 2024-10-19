import type { TeacherClass } from '@/types'
import { Card, CardFooter, CardHeader } from './ui/card'
import { Button } from './ui/button'
import UserAvatar from './shared/user-avatar'
import { Badge } from './ui/badge'
import ClockIcon from '@/icons/clock'

export default function ClassCard ({ nextClass }: { nextClass: TeacherClass }) {
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
        <Badge
          variant='outline'
          className='rounded-sm py-1'
        >{nextClass.subject}</Badge>
      </CardHeader>
      <CardFooter
        className='flex gap-x-4 p-4 pt-0'
      >
        <Button variant='outline' className='w-full'>Editar</Button>
        <Button className='w-full'>Cancelar</Button>
      </CardFooter>
    </Card>
  )
}
