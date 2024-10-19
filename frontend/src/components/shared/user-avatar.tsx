import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { getNameInitials } from '@/lib/utils'

export default function UserAvatar ({ user }: { user: User }) {
  return (
    <Avatar>
      <AvatarImage src={user.avatar} alt={`Avatar of ${user.username}`} />
      <AvatarFallback className='bg-background'>{getNameInitials(user.name)}</AvatarFallback>
    </Avatar>
  )
}
