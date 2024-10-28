import PencilAltIcon from '@/icons/pencil-alt'
import UserAvatar from './shared/user-avatar'
import { Card, CardFooter, CardHeader } from './ui/card'

export default function UserCard ({ user, classes }: {
  user: User
  classes: number
}) {
  return (
    <Card className='flex items-center justify-between'>
      <CardHeader className='p-4 flex-row gap-x-2 items-center'>
        <UserAvatar user={user} />
        <div className='flex flex-col'>
          <strong>{user.name}</strong>
          <span className='text-muted-foreground text-sm'>Ingles</span>
        </div>
      </CardHeader>
      <CardFooter className='p-0 pr-4 text-muted gap-x-1 items-center justify-center'>
        <PencilAltIcon className='size-4' />
        <div>{classes}</div>
      </CardFooter>
    </Card>
  )
}
