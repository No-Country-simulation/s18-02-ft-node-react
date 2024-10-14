import { Badge } from '../ui/badge'

export default function ClassModeBadge ({ classMode }: { classMode: string }) {
  return (
    <Badge
      variant='outline'
      className='border-green-500 text-green-500 rounded-md py-1'
    >{classMode.toUpperCase()}</Badge>
  )
}
