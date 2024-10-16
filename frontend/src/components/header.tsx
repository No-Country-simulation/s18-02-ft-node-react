'use client'

import LeftArroowIcon from '@/icons/left-arrow'
import { Button } from './ui/button'
import BellIcon from '@/icons/bell'
import { Badge } from './ui/badge'
import { useUserStore } from '@/stores/user'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { getNameInitials } from '@/lib/utils'
import { usePathname } from 'next/navigation'

export default function Header () {
  const pathname = usePathname()
  const user = useUserStore(store => store.user)

  const onBack = () => {
    if (typeof window !== 'undefined') window.history.back()
  }

  return (
    <header className='sticky z-50 top-0 flex justify-between items-center p-4 bg-[#F3F3F3]'>
      <div
        className='flex items-center gap-x-2 cursor-pointer'
        onClick={onBack}
      >
        {pathname === '/'
          ? <>
          <div className='size-10 rounded-full bg-muted-foreground'></div>
          <h2 className='font-semibold'>Logo</h2>
        </>
          : <>
          <LeftArroowIcon className='size-8' />
          <h2 className='font-semibold'>Mi perfil</h2>
        </>}
      </div>

      <div className='flex gap-x-4'>
        <Button
          variant='outline'
          size='icon'
          className='relative'
        >
          <BellIcon />
          <Badge
            variant='destructive'
            className='absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 px-[7px] py-0.5'
          >
            5
          </Badge>
        </Button>

        {user !== undefined && <Avatar>
            <AvatarImage src={user.avatar} alt={`Avatar of ${user.username}`} />
            <AvatarFallback className='w-full flex justify-center items-center bg-background'>{getNameInitials(user.name)}</AvatarFallback>
          </Avatar>
        }
      </div>
    </header>
  )
}
