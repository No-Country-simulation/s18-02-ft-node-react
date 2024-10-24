import { cn } from '@/lib/utils'
import { Badge } from '../ui/badge'

export default function ClassModeBadge ({ classMode }: { classMode: TeacherUser['classMode'] }) {
  return (
    <Badge
      variant='outline'
      className={cn('rounded-md py-1', classMode === 'presencial' ? 'border-yellow-500 text-yellow-500' : 'border-green-500 text-green-500')}
    >{classMode.toUpperCase()}</Badge>
  )
}
